import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";

import { Form, Input, Button, DatePicker, Space, Rate } from "antd";

import LOADING from "assets/product/loading.gif"


function RecommendationModal(props) {
  const {setLocationKeyword, meetingArea, setMeetingLocation, meetingLocation, selectedFriends, showModal, setModalContent, locationModalItem } = props;
  const user = useSelector(state => state.userData)

  console.info("props", props)
  console.info("모달 렌더링 됐어요")
  
  const meetingAreaSettled = Boolean(meetingArea.length !== 0)
  
  const [ recommStores, setRecommStores ] = useState([]);
  // const [ recommStores, setRecommStores ] = useState([
  //   {
  //     "storeId": "20954",
  //     "storeName": "개성편수",
  //     "storeAddress": "서울특별시 강남구 개포동 1257-7",
  //     "storeLatitude": 37.479263,
  //     "storeLongitude": 127.0479,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "322320",
  //     "storeName": "이가네면옥",
  //     "storeAddress": "서울특별시 강남구 개포동 1260-8",
  //     "storeLatitude": 37.479454,
  //     "storeLongitude": 127.04964,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "163039",
  //     "storeName": "밀케이커피",
  //     "storeAddress": "서울특별시 서초구 양재동 2-44",
  //     "storeLatitude": 37.48477,
  //     "storeLongitude": 127.04141,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "45473",
  //     "storeName": "그집갈비탕",
  //     "storeAddress": "서울특별시 강남구 개포동 1217-1",
  //     "storeLatitude": 37.478672,
  //     "storeLongitude": 127.047905,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "162471",
  //     "storeName": "밀란",
  //     "storeAddress": "서울특별시 강남구 개포동 1215-1",
  //     "storeLatitude": 37.478447,
  //     "storeLongitude": 127.04917,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "194390",
  //     "storeName": "브라운브레드",
  //     "storeAddress": "서울시 강남구 도곡동 424-8",
  //     "storeLatitude": 37.483173,
  //     "storeLongitude": 127.04464,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "19857",
  //     "storeName": "강중범초밥집",
  //     "storeAddress": "서울특별시 강남구 도곡동 414-6",
  //     "storeLatitude": 37.48455,
  //     "storeLongitude": 127.04363,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "194456",
  //     "storeName": "브라이언스커피",
  //     "storeAddress": "서울특별시 강남구 도곡동 457",
  //     "storeLatitude": 37.483925,
  //     "storeLongitude": 127.04583,
  //     "avgRate": 5,
  //     "reviewCount": 3
  //   },
  //   {
  //     "storeId": "124902",
  //     "storeName": "리거양꼬치",
  //     "storeAddress": "서울특별시 강남구 도곡동 412-13",
  //     "storeLatitude": 37.484955,
  //     "storeLongitude": 127.04252,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "116487",
  //     "storeName": "뚝뗀",
  //     "storeAddress": "서울특별시 강남구 도곡동 467-24",
  //     "storeLatitude": 37.486515,
  //     "storeLongitude": 127.05188,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "125239",
  //     "storeName": "리스토랑",
  //     "storeAddress": "서울특별시 강남구 도곡동 412-9",
  //     "storeLatitude": 37.48506,
  //     "storeLongitude": 127.0432,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "223889",
  //     "storeName": "성천동치미막국수",
  //     "storeAddress": "서울특별시 서초구 양재2동 275-1",
  //     "storeLatitude": 37.47721,
  //     "storeLongitude": 127.04444,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "51116",
  //     "storeName": "김밥대학",
  //     "storeAddress": "서울특별시 강남구 개포4동 1230-9",
  //     "storeLatitude": 37.4768,
  //     "storeLongitude": 127.048,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "221667",
  //     "storeName": "설마중",
  //     "storeAddress": "서울특별시 서초구 양재1동 2-3",
  //     "storeLatitude": 37.484985,
  //     "storeLongitude": 127.04035,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   },
  //   {
  //     "storeId": "93604",
  //     "storeName": "데니스 타코",
  //     "storeAddress": "서울특별시 서초구 양재동 2-28 오성빌딩 101호",
  //     "storeLatitude": 37.484413,
  //     "storeLongitude": 127.040825,
  //     "avgRate": 5,
  //     "reviewCount": 1
  //   }
  // ]);

  let [tempValue, setTempValue] = useState('')
  const meetingAreaPage = () => {
    console.info("미팅페이지 렌더링 됐어요")
    return (
      <div className="meetingLocationContent">
        <Form layout="vertical">
          <Form.Item
            name="meetingLocationForm"
            className="meetingLocationForm"
            label="추천받을 위치 검색하기"
            >
            <Input
              placeholder="만날 장소를 검색해주세요"
              onChange={(e)=> {setTempValue(e.target.value); tempValue=e.target.value}}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setLocationKeyword(e.target.value);
                }
              }}
              style={{width:'100%'}}
              addonAfter={<Form.Item noStyle >
                <Button htmlType="button" className="meetingFindLocationButton" onClick={(e)=>{
                    e.preventDefault();
                    setLocationKeyword(tempValue)
                    setTempValue('')
                }}>검색</Button>
                    </Form.Item>}
              />
          </Form.Item>
        </Form>
        <div className="meetingLocationMap"></div>
      </div>
    )
  };
  
  
  const [ loading, setLoading ] = useState(false);
  const [ currentPage, setCurrentPage ] = useState(1);
  const [ postsPerPage, setPostsPerPage ] = useState(5);

  const indexOfLast = currentPage * postsPerPage;
  const indexOfFirst = indexOfLast - postsPerPage;

  function currentPosts(tmp) {
    let currentPosts = 0;
    currentPosts = tmp.slice(indexOfFirst, indexOfLast);
    return currentPosts;
  }
  

  useEffect(() => {
    const reviewIds = [];
    for (let i = 0; i < selectedFriends.length; i++) {
      for (let j = 0; j < user.friendList.length; j++) {
        if (user.friendList[j].id === selectedFriends[i]) {
          reviewIds.push(user.friendList[j].reviewId)
        }
      }
    }
    console.info("내 정보", user)
    reviewIds.push(user.reviewId)
    if (meetingArea.length !== 0) {
      console.info("recomm으로 통신을 보내겠습니다", reviewIds)
      setLoading(true)
      // fetch(`${process.env.REACT_APP_API_URL}/meeting/recomm?reviewIds=4506&reviewIds=1345&latitude=${parseFloat(meetingArea[0].locationLatitude)}&longitude=${parseFloat(meetingArea[0].locationLongitude)}`, {
        fetch(`${process.env.REACT_APP_API_URL}/meeting/recomm`, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            reviewIds: reviewIds,
            // reviewIds: selectedFriends,
            latitude: parseFloat(meetingArea[0].locationLatitude),
            longitude: parseFloat(meetingArea[0].locationLongitude),
          })
        })
      .then((res) => res.json())
      .then((response) => {
        console.log("받아온 가게목록~!~!!~!~!~!~!~", response)
        setLoading(false)
        setRecommStores(response)
      })
    }
  }, [meetingArea])

  const recommendationPage = () => {
    
    const Posts = (recommStores, loading) => {
      console.info("표기할 recommStores", recommStores)
      return (
        <div className="recommModalStoreWrapper">
          { loading && <div className="recommModalLoading"> 
              <div style={{
                fontSize: 'larger',
                fontWeight: 600,
              }}>{ meetingArea[0].locationName }</div>
              <div>가까운 맛집을 찾고 있어요~! </div>
              <img src={LOADING} width={100} height={100} />
            </div>}
          <div className="recommModalStore">
            { recommStores.map((item) =>
              <div 
                key={item.storeId}
                className="recommModalStoreContent"
                onClick={() => setMeetingLocation(meetingLocation.concat(item))}
              >
                <div className="rMStoreName">
                  { item.storeName }
                </div>
                <div className="rMStoreAddress">
                  { item.storeAddress }
                </div>
                <Rate 
                  className="rMStoreRate"
                  disabled defaultValue={item.avgRate}
                />
              </div>
            ) }
          </div>
        </div>
      )
    }

    const nextButton = () => {
      if (currentPage === 3) {
        return (
          <div className="rMBtnWrapper">
            <Button
              onClick={(e) => showModal(e, "location")}
            >
              직접 고를게요!
            </Button>
          </div>
        )
      } else if (loading === false) {
        return(
          <div className="rMBtnWrapper">
            <Button
              onClick={() => {setCurrentPage(currentPage + 1)}}
            >
              다른 추천을 볼게요!
            </Button>
          </div>
        )
      }
    }

    return (
      <div className="recommPageContent">
        { Posts(currentPosts(recommStores), loading) }
        { nextButton() }
      </div>
    );
  };
  
  return (
    <div className="recommModalContent">
      { (meetingAreaSettled) ? (recommendationPage()) : (meetingAreaPage()) }
    </div>
  );
}

export default RecommendationModal;