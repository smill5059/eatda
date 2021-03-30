from django.shortcuts import render, redirect

# Create your views here.

# 함수 1 : 유사도 자동 업데이트 함수 
def Similarity(request):
  return 

# 함수 2 : user와 지역 정보를 입력받아서, 가게 유사도 돌린 후, 추천 값 반환하는 함수
def Recommendation(request): 
  user = request.data.get('reviewId')

  if len(user) == 1:
    return
  else:
    return 

def Recommendation(request):
  return 