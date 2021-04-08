import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import {
  Form,
  Input,
  Button,
  DatePicker,
  Space,
  Card,
  Select,
  Tag,
} from "antd";
import { CloseOutlined } from "@ant-design/icons";
import RecommendationModal from "components/meeting/recommendationModal";

function CreateModify(props) {
  // 모달 관련 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  // 정보 관리 상태
  // 회원 정보
  const user = useSelector((state) => state.userData);
  const userToken = localStorage.getItem("Kakao_token")
    ? localStorage.getItem("Kakao_token")
    : "";
  // 나의 위치정보
  const [myLatitude, setMyLatitude] = useState(37.571075);
  const [myLongitude, setMyLongitude] = useState(127.013588);
  // 페이지 정보 (생성, 수정)
  const [pageTitle, setPageTitle] = useState("약속 만들기");
  const [meetingButtonText, setMeetingButtonText] = useState("약속 생성하기");
  const [pageChange, setPageChange] = useState(false)
  // 서버에 보낼 정보
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState([]);
  const [selectedFriends, setSelectedFriends] = useState([]);
  const [selectedReviewIds, setSelectedReviewIds] = useState([]);
  // 지도 검색 키워드
  const [locationKeyword, setLocationKeyword] = useState("");
  // 지도 검색해서 가져올 정보들
  const [location, setLocation] = useState("");
  const [meetingArea, setMeetingArea] = useState([]);
  // 업데이트 페이지일 경우 약속의 16진수 id
  const { meetingId } = props.match.params;
  // 리액트에서 폼 세팅
  const [form] = Form.useForm();
  // 친구 폼에서 값을 담을 정보
  const [selectedList, setSelectedList] = useState([])
  const friends = user.friendList.map((friend) => {
    return { label: friend.userName, value: `${friend.id}|${friend.reviewId.toString()}` };
  })
  console.log(user.friendList)
  // 페이지 렌더 이후 1번 실행 => 기본 정보 세팅
  useEffect(() => {
    // 로그인 확인
    if (userToken === "") {
      window.location.href = "/login";
    }
    // 현재 위치 세팅
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setMyLatitude(position.coords.latitude);
        setMyLongitude(position.coords.longitude);
      },
      () => {
        setMyLatitude(37.571075);
        setMyLongitude(127.013588);
      }
    );
    // Create 할때 => 추후 URL 조건으로 분리
    if (meetingId === undefined) {
      setPageTitle("약속 만들기");
      setMeetingButtonText("약속 생성하기");
    }
    // Update 할때
    else {
      // meetingId가 있으므로 수정
      setPageTitle("약속 수정하기");
      setMeetingButtonText("약속 수정하기");
      // 통신하여 약속정보 가져오기
      fetch(`${process.env.REACT_APP_API_URL}/meeting/${meetingId}`)
        .then((res) => {
          res
            .json()
            .then((response) => {
              // 약속 이름
              setMeetingTitle(response.title);
              // 약속 날짜
              let meetDate = new Date(response.meetDate);
              meetDate.setHours(meetDate.getHours() - 9)
              setMeetingDate(moment(meetDate));
              setMeetingTime(moment(meetDate));
              // 약속 장소
              setMeetingLocation(response.stores);
              console.log(response.participants)
              // 친구 IDs
              let newSelectedList = response.participants
                .filter((part) => {
                  return part.id !== user.userId;
                })
                .map((part) => {
                    return `${part.id}|${part.reviewId.toString()}`
                });
              // 친구 세팅
            //   setSelectedFriends(newFriendsList);
            //   // ReviewIds 세팅
            //   let newReviewIdList = response.reviewIds.filter((review)=>{
            //       return review !== user.reviewId
            //   })
            //   setSelectedReviewIds(newReviewIdList);
            // 폼에 값 세팅
            // let newSelectedList = []

            setSelectedList(newSelectedList)
            // 선택 가능한 친구 세팅
              // 폼에 값 세팅
              form.setFieldsValue({
                meetingName: response.title,
                meetingDate: moment(meetDate),
                meetingTime: moment(meetDate),
                meetingFindFriend: newSelectedList,
              });
            })
            .catch(() => {
              window.location.href = "/";
            });
        })
        .catch(() => {
          window.location.href = "/";
        });
    }
  }, []);

  useEffect(() => {
    setModalVisible(false);
  }, [meetingLocation]);

  let [tempValue, setTempValue] = useState('')

  // 장소 모달
  function locationModalItem() {
    return (
      <div className="meetingLocationContent">
        <Form layout="inline">
          <Form.Item
            name="meetingLocationForm"
            className="meetingLocationForm"
            label="장소 검색하기"
          >
            <Input         
              placeholder="식당 이름을 검색해주세요"
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
    );
  }

  // 추천 모달
  function recommendationModalItem() {
    // console.info("모달을 열어볼게요")
    return (
      <div className="recommModal">
        <RecommendationModal
          setLocationKeyword={setLocationKeyword}
          meetingArea={meetingArea}
          setMeetingLocation={setMeetingLocation}
          meetingLocation={meetingLocation}
          selectedFriends={selectedFriends}
          showModal={showModal}
          setModalContent={setModalContent}
          locationModalItem={locationModalItem}
        />
      </div>
    );
  }

  

  function tagRender(props) {
    const { label, value, closable, onClose } = props;

    return (
      <Tag closable={closable} onClose={onClose} style={{ marginRight: 3 }} value={value}>
        {label}
      </Tag>
    );
  }

  // 모달의 ON/OFF에 따라 작동할 것
  useEffect(() => {
    // 지도 로딩
    const { kakao } = window;
    if (document.querySelector(".meetingLocationMap") !== null) {
      let map = new kakao.maps.Map(
        document.querySelector(".meetingLocationMap"),
        {
          center: new kakao.maps.LatLng(myLatitude, myLongitude), //지도의 중심좌표.
          level: 5, //지도의 레벨(확대, 축소 정도)
        }
      );
      let currentLocationMarker = new kakao.maps.Marker({
        position: new kakao.maps.LatLng(myLatitude, myLongitude),
      });
      currentLocationMarker.setMap(map);

      // 마커를 클릭하면 장소명을 표출할 인포윈도우 입니다
      let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });

      let ps = new kakao.maps.services.Places();
      ps.keywordSearch(locationKeyword, (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          let bounds = new kakao.maps.LatLngBounds();

          for (let i = 0; i < data.length; i++) {
            let marker = new kakao.maps.Marker({
              map: map,
              position: new kakao.maps.LatLng(data[i].y, data[i].x),
            });

            // 마커에 이벤트 등록
            kakao.maps.event.addListener(marker, "click", function () {
              infowindow.setContent(
                `<div style="display:flex; width:max-content; padding:10px;"><a href=${data[i].place_url} target="_blank" style="margin-right:10px">${data[i].place_name}</a><Button class="locationAddButton" data-store-name="${data[i].place_name}" data-store-address="${data[i].road_address_name}" data-store-latitude=${data[i].y} data-store-longitude=${data[i].x}>추가</Button></div>`
              );
              infowindow.open(map, marker);
              document
                .querySelectorAll(".locationAddButton")
                .forEach((element) => {
                  element.addEventListener("click", function () {
                    const temp = [
                      {
                        locationName: element.dataset.storeName,
                        locationAddress: element.dataset.storeAddress,
                        locationLatitude: element.dataset.storeLatitude,
                        locationLongitude: element.dataset.storeLongitude,
                      },
                    ];
                    console.info("선택된 장소", temp);
                    setLocation(temp);
                  });
                });
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      });
    }
    // 지도 끝
  }, [modalVisible, locationKeyword, modalContent]);

  console.log("추가추가__________________")
  console.log(selectedList)
  console.log("추가추가__________________")

  // Location이 변화했을 때, 이걸 Area로 (가게 추천받을 지역으로) 보내줄지 아니면 storeLocation으로 보내줄지 결정
  useEffect(() => {
    if (meetingArea.length === 0) {
      setMeetingArea(location);
    } else {
      setMeetingLocation(
        meetingLocation.concat([
          {
            storeId: "0",
            storeName: location[0].locationName,
            storeAddress: location[0].locationAddress,
            storeLatitude: location[0].locationLatitude,
            storeLongitude: location[0].locationLongitude,
          },
        ])
      );
    }
  }, [location]);

  useEffect(() => {
    setModalContent(recommendationModalItem);
  }, [meetingArea]);

  useEffect(()=>{
      console.log("USEEFFECT")
    console.log(selectedList)
    selectedList.forEach((item)=>{
        let tempoList = item.split("|")
        selectedFriends.push(tempoList[0])
    })
    let newSelectedFriends = [...new Set(selectedFriends)]
    setSelectedFriends(newSelectedFriends)
  }, [selectedList])

  function showModal(e, modalType) {
    e.preventDefault();
    if (modalType === "location") {
      setModalTitle("어디서 먹을까?");
      setModalContent(locationModalItem);
      // 친구 모달
    } else if (modalType === "recommendation") {
      setModalTitle("추천받자!");
      setModalContent(recommendationModalItem);
    } else if (modalType === "location") {
      setModalTitle("가게 검색하기");
      setModalContent(locationModalItem);
    } else if (modalType === "friend") {
      setModalTitle("누구랑 먹을까?");
      // setModalContent(friendModalItem);
    }
    // 모달 보여주기
    setModalVisible(true);
  }

  function createMeeting(e) {
    e.preventDefault();
    if (meetingTitle === "") {
      alert("약속 이름을 입력해주세요.");
      return;
    } else if (meetingDate === "") {
      alert("약속 날짜를 입력해주세요.");
      return;
    } else if (meetingTime === "") {
      alert("약속 시간을 입력해주세요.");
      return;
    } else if (meetingLocation.length < 1) {
      alert("약속 장소를 입력해주세요.");
      return;
    }
    let date_text = meetingDate.format("YYYY-MM-DD");
    let time_text = meetingTime.format("HH:mm:ss");
    let newDate = date_text + "T" + time_text;
    setMeetingLocation(meetingLocation);
    // 본인 설정
    let tempSelectedFriends = [user.userId];
    let tempSelectedReviewIds= [user.reviewId];

    selectedList.forEach((item)=>{
        const tempList = item.split('|')
        tempSelectedFriends.push(tempList[0])
        tempSelectedReviewIds.push(parseInt(tempList[1]))
    })

    let newSelectedFriends = [...new Set(tempSelectedFriends)]
    let newSelectedReviewIds = [...new Set(tempSelectedReviewIds)]
    let newSelectedList = [...new Set(selectedList)]
    setSelectedFriends(newSelectedFriends)
    setSelectedReviewIds(newSelectedReviewIds)
    setSelectedList(newSelectedList)

    let dataset = {
      title: meetingTitle,
      meetDate: newDate,
      stores: meetingLocation,
      participants: newSelectedFriends,
      reviewIds: newSelectedReviewIds,
      tags: [],
      scores: [],
      comments: [],
      imgs: [],
      completed: 0,
    };
    let dataMethod = "POST";
    // 수정일때
    if (meetingId !== undefined) {
      dataset.id = meetingId;
      dataMethod = "PUT";
    }

    // 데이터 보내기
    fetch(`${process.env.REACT_APP_API_URL}/meeting`, {
      method: dataMethod,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(dataset),
    })
      .then((res) => res.json())
      .then((response) => {
        window.location.href = `/meeting/${response.id}`;
      });
  }

  function deleteStore(store) {
    setMeetingLocation(
      meetingLocation.filter((item) => {
        return item !== store;
      })
    );
  }

  return (
    <div className="contentWrapper">
      <div className="contentTitle">{pageTitle}</div>
      <div className="contentBody meetingCreateBody">
        <Form name="meetingCreateForm" form={form}>
          {/* 약속 이름 창 */}
          <Form.Item
            name="meetingName"
            label="약속 이름"
            rules={[{ required: true, message: "약속 이름을 정해주세요" }]}
          >
            <Input
              placeholder="약속 이름을 지어주세요"
              onChange={(e) => {
                setMeetingTitle(e.target.value);
              }}
            />
          </Form.Item>
          {/* 날짜 선택 창 */}
          <Space direction="horizontal">
            <Form.Item
              name="meetingDate"
              label="언제"
              rules={[{ required: true, message: "약속 날짜를 정해주세요" }]}
            >
              <DatePicker
                placeholder="약속 날짜"
                format="YYYY년 MM월 DD일"
                onChange={(e) => {
                  setMeetingDate(e);
                }}
              />
            </Form.Item>
            <Form.Item
              name="meetingTime"
              label="몇시"
              rules={[{ required: true, message: "약속 시간을 정해주세요" }]}
            >
              <DatePicker
                picker="time"
                placeholder="약속 시간"
                format="HH시 mm분"
                onChange={(e) => {
                  setMeetingTime(e);
                }}
              />
            </Form.Item>
          </Space>

          <Form.Item
            name="meetingFindFriend"
            label="누구랑"
            className="meetingFindFriend"
          >
            <Select
              mode="multiple"
              showArrow
              tagRender={tagRender}
              style={{ width: "100%" }}
              options={friends}
              value={selectedList}
              onChange={setSelectedList}
            />
          </Form.Item>

          {/* 장소 선택 창 */}
          <Form.Item
            name="meetingLocation"
            label="어디서"
            rules={[{ required: true, message: "약속 장소를 정해주세요" }]}
          >
            <Button className="recommendationBtn" onClick={(e) => showModal(e, "recommendation")}>
              추천받기
            </Button>
          </Form.Item>
          {/* 장소 목록   */}
          {meetingLocation.length > 0 ? 
          <Form.Item className="meetingLocationsListBox">
            <div className="meetingLocationsList">
              {meetingLocation.map((store, index) => {
                    return (
                      <div className="meetingLocationsItem" key={index}>
                        <p>{store.storeName}</p>
                        <CloseOutlined onClick={(e) => deleteStore(store)} />
                      </div>
                    );
                  })}
            </div>
          </Form.Item>
          : null
          }
        </Form>
        <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => createMeeting(e)}
              className="meetingCreateButton"
            >
              {meetingButtonText}
            </Button>
      </div>
      
      {/* 모달 */}
      {modalVisible ? (
        <div className="modalWrapper">
          <div className="modalMain">
            <div className="modalTitle">
              <p>{modalTitle}</p>
              <p className="modalCloseButton">
                <CloseOutlined
                  onClick={() => {
                    setMeetingArea([]);
                    setModalVisible(false);
                  }}
                />
              </p>
            </div>
            <div className="modalContent">{modalContent}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CreateModify;
