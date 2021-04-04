from django.shortcuts import render, redirect
from rest_framework.response import Response
from rest_framework.decorators import api_view

# 데이터 디렉토리 설정 및 필요한 모듈 임포트 
import pandas as pd
import numpy as np
import os
import shutil
import math
import random
from pymongo import MongoClient
import configparser

# 유사도 업데이트시 필요한 모듈
import schedule
import time

DATA_DIR = "./data"
STORE_REVIEW_FILE = os.path.join(DATA_DIR, "StoresAndReviews.pkl")

config = configparser.ConfigParser()
config.read("./config.conf")
db_id = config.get("DB_INFO", 'id')
db_pwd = config.get("DB_INFO", 'pwd')
db_name = config.get("DB_INFO", 'name')

eatda_client = MongoClient("mongodb://{}:{}@j4a103.p.ssafy.io:27017/{}".format(db_id, db_pwd, db_name))
eatda = eatda_client[db_name]

def haversine(lat1, lon1, lat2, lon2):
    MILES = 3959
    lat1, lon1, lat2, lon2 = map(np.deg2rad, [lat1, lon1, lat2, lon2])
    dlat = lat2 - lat1
    dlon = lon2 - lon1
    a = np.sin(dlat / 2) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2) ** 2
    c = 2 * np.arcsin(np.sqrt(a))
    total_miles = MILES * c
    # return lambda x: True if total_miles <= 0.62 else False
    return total_miles


def recommendationMulti(reviewId_list, latitude, longitude):
    data = pd.read_pickle(STORE_REVIEW_FILE)
    # total만큼의 가게를 반환
    total = 15
    # reviewId 한명당 뽑아올 추천 가게 개수
    limit = int(total / len(reviewId_list))
    if limit == 0:
        limit = 1

    # 반경 1km 이내 가게 뽑기
    df = data['stores']
    df["distance"] = haversine(latitude, longitude, df['storeLatitude'], df['storeLongitude'])
    stores_within = df[df['distance'] <= 0.62].set_index('storeId', drop=False).to_dict("index")

    # 추천가게 list
    recomm = []

    # reviewId별 추천가게 리스트를 recomm에 추가
    for idx in range(len(reviewId_list)):
        reviewId = reviewId_list[idx]

        # 유사도 상위 n명 뽑기
        n = 100
        sim_collection = eatda.get_collection('similarity')
        user = sim_collection.find_one({"reviewId": reviewId})

        # 유사한 사람이 없을 경우
        if user is None:
            continue

        # 유사한 사람이 존재할 경우
        user['sim'] = {key: value for key, value in user['sim'].items()}
        user['sim'][reviewId] = 1.0
        sim = sorted(user['sim'].items(), reverse=True, key=lambda item: item[1])[:n]

        # 반경 1km 가게 중 유사도 상위 N명이 한 번이라도 방문했던 가게 뽑기
        filtered_stores = []  # N명이 한 번이라도 방문했던 가게
        filtered_reviews = {}  # 각 사람이 쓴 리뷰 데이터
        for key, value in sim:
            review = data['reviews'][int(key)]
            scores = {key: value for key, value in review['scores'].items() if key in stores_within.keys()}
            filtered_stores += list(scores.keys())
            filtered_reviews[int(key)] = scores

        # 아이템기반 유사도 측정
        rating_table = pd.DataFrame.from_dict(filtered_reviews, orient='index')
        rating_table.fillna(0.0, inplace=True)
        pearsoncorr = rating_table.corr(method='pearson')

        # reviewId가 방문했던 가게들 기반으로 예상평점이 높은가게들을 뽑아냄
        store_by_reviewId = data['reviews'][reviewId]
        # stores_expect_rating = []
        top = []
        for storeId, value in store_by_reviewId['scores'].items():
            if storeId in stores_within.keys():
                tmp = (pearsoncorr[storeId] * value).sort_values(ascending=False)
                for i in range(len(tmp)):
                    if tmp[i] < 3:
                        break
                    top.append([tmp.index[idx], tmp[i]])
                # tmp = (pearsoncorr[storeId] * value)
                # if tmp.max() >= 3:
                #     top.append([tmp.idxmax(), tmp.max()])

        # 추천 가게가 1개 이상 있을 경우 리스트에 limit만큼 추가
        if len(top) > 0:
            result = pd.DataFrame(data=top, columns=("storeId", "rating")).set_index("storeId", drop=False).groupby(
                level=0).mean().sort_values(by=["rating"], ascending=False)
            recomm.extend(list(result.head(limit).index))

    # 중복 제거
    recomm = set(recomm)

    # 추천가게 개수가 total 이상이면 랜덤으로 total만큼 반환
    if len(recomm) >= total:
        return random.sample(recomm, total)
    # 추천가게 개수가 total 이하이면 근처 가게를 추가하여 반환
    else:
        store_list = list(df[df['distance'] <= 0.62].sort_values(by=["avgRate", "reviewCount", "distance"],
                                                                 ascending=[False, False, True])['storeId'])
        for i in range(len(store_list)):
            recomm.add(store_list[i])
            if len(recomm) >= total:
                break
        return list(recomm)


def update():
    # StoresAndReviews.pkl 업데이트
    store_collection = eatda.get_collection('store')
    stores = pd.DataFrame(store_collection.find())
    review_collection = eatda.get_collection('review')
    reviews = pd.DataFrame(review_collection.find()).set_index('reviewId', drop=False).to_dict("index")
    pd.to_pickle({"stores": stores, "reviews": reviews}, STORE_REVIEW_FILE)

    # 유사도 계산
    num_users = len(reviews)
    sim = np.zeros((num_users, num_users))

    for i in range(num_users):
        sim[i][i] = 1
        for j in range(i + 1, num_users):
            sim[j][i] = sim[i][j] = sim_pearson(reviews, i, j)

    # 유사도 업데이트
    sim_collection = eatda.get_collection('similarity')
    sim_collection.delete_many({})
    num_users = len(sim)
    for i in range(num_users):
        data = {}
        for j in range(num_users):
            if sim[i][j] != 0 and i != j:
                data[str(j)] = sim[i][j]
        if len(data) >= 1:
            sim_collection.insert_one({"reviewId": i, "sim": data})

    print("오늘의 유사도 업데이트 완료")


def sim_pearson(data, name1, name2):
    sumX = 0  # X의 합
    sumY = 0  # Y의 합
    sumPowX = 0  # X 제곱의 합
    sumPowY = 0  # Y 제곱의 합
    sumXY = 0  # X*Y의 합
    count = 0  # 영화 개수

    for i in data[name1]["scores"]:  # i = key
        if i in data[name2]["scores"]:  # 같은 영화를 평가했을때만
            sumX += data[name1]["scores"][i]
            sumY += data[name2]["scores"][i]
            sumPowX += pow(data[name1]["scores"][i], 2)
            sumPowY += pow(data[name2]["scores"][i], 2)
            sumXY += data[name1]["scores"][i] * data[name2]["scores"][i]
            count += 1
    if count <= 0:
        return 0

    a = math.sqrt((sumPowX - (pow(sumX, 2) / count)) * (sumPowY - (pow(sumY, 2) / count)))

    if a == 0:
        return 0
    else:
        return (sumXY - ((sumX * sumY) / count)) / a


# 함수 1 : 유사도 자동 업데이트 함수     
def Similarity():
    schedule.every().day.at("05:00").do(update)

    while True:
        schedule.run_pending()
        time.sleep(1)

    return "유사도 업데이트도 됩니다!"

# 함수 2 : user와 지역 정보를 입력받아서, 가게 유사도 돌린 후, 추천 값 반환하는 함수
@api_view(['POST'])
def Recommendation(request): 

  user = request.data.get('reviewId')
  latitude = request.data.get('latitude')
  longitude = request.data.get('longitude') 

  return Response(recommendationMulti(user, latitude, longitude))