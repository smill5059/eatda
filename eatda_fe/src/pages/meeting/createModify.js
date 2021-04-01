import React, { useState, useEffect } from "react";
import moment from "moment";
import { Form, Input, Button, DatePicker, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

// const layout = {
//     labelCol: { span: 8 },
//     wrapperCol: { span: 16 },
//   };

function CreateModify(props) {
  // 모달 관련 상태
  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState(null);
  const [modalContent, setModalContent] = useState(null);
  // 정보 관리 상태
  // 페이지 정보 (생성, 수정)
  const [pageTitle, setPageTitle] = useState("약속 만들기");
  const [meetingButtonText, setMeetingButtonText] = useState("약속 생성하기");
  // 서버에 보낼 정보
  const [meetingTitle, setMeetingTitle] = useState("");
  const [meetingDate, setMeetingDate] = useState("");
  const [meetingTime, setMeetingTime] = useState("");
  const [meetingLocation, setMeetingLocation] = useState([]);
  const [meetingFriends, setMeetingFriends] = useState([]);
  // 나의 위치정보
  const [myLatitude, setMyLatitude] = useState(37.571075);
  const [myLongitude, setMyLongitude] = useState(127.013588);
  // 지도 검색 키워드
  const [locationKeyword, setLocationKeyword] = useState("");

  const { meetingId } = props.match.params;
  // 리액트에서 폼 세팅
  const [form] = Form.useForm();

  // 페이지 렌더 이후 1번 실행 => 기본 정보 세팅
  useEffect(() => {
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
    } else {
      // meetingId가 있으므로 수정
      setPageTitle("약속 수정하기");
      setMeetingButtonText("약속 수정하기");
      // 통신하여 약속정보 가져오기
      fetch(
        `${process.env.REACT_APP_API_URL}/meeting/${meetingId}`
      ).then((res) => {
        res.json().then((response) => {
          console.log(response);
          console.log(response.id);
          setMeetingTitle(response.title);
          console.log(new Date());
          console.log(response.meetDate);
          let meetDate = new Date(response.meetDate);
          setMeetingDate(moment(meetDate));
          setMeetingTime(moment(meetDate));
          setMeetingLocation(response.stores);
          setMeetingFriends(response.participants);
          form.setFieldsValue({
            meetingName: response.title,
            meetingDate: moment(meetDate),
            meetingTime: moment(meetDate),
          });
        });
      });
    }
  }, []);

  // 장소 모달
  function locationModalItem() {
    return (
      <div className="meetingLocationContent">
        <Form layout="vertical">
          <Form.Item
            name="meetingLocationForm"
            className="meetingLocationForm"
            label="장소 검색하기"
          >
            <Input
              placeholder="식당 이름을 검색해주세요"
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  setLocationKeyword(e.target.value);
                }
              }}
            />
          </Form.Item>
        </Form>
        <div className="meetingLocationMap"></div>
      </div>
    );
  }

  function friendModalItem() {
    return (
      <div className="meetingFriendContent">
        <Form>
          <Form.Item
            name="meetingFriendForm"
            className="meetingFriendForm"
            label="친구 검색하기"
          >
            <Input placeholder="친구 이름을 검색해주세요" />
          </Form.Item>
        </Form>
        <ul className="meetingFriendModalList"></ul>
        <Button
          type="primary"
          htmlType="button"
          className="meetingFriendConfirmButton"
        >
          확인
        </Button>
      </div>
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

      // 장소 검색 객체
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
              document
                .querySelectorAll(".locationAddButton")
                .forEach((element) => {
                  console.log(element);
                  element.addEventListener("click", function (event) {
                    console.log(element.dataset.storeName);
                    console.log(element.dataset.storeAddress);
                    console.log(element.dataset.storeLatitude);
                    console.log(element.dataset.storeLongitude);
                    meetingLocation.push({
                      storeName: element.dataset.storeName,
                      storeAddress: element.dataset.storeAddress,
                      storeLatitude: element.dataset.storeLatitude,
                      storeLongitude: element.dataset.storeLongitude,
                    });
                    setMeetingLocation(meetingLocation)
                  });
                });
              console.log(data[i]);
              infowindow.open(map, marker);
            });

            //   console.log(data[i])
            //   console.log(meetingLocation)
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          map.setBounds(bounds);
        }
      });
    }
  }, [modalVisible, locationKeyword]);

  function showModal(e, modalType) {
    e.preventDefault();
    if (modalType === "location") {
      setModalTitle("어디서 먹을까?");
      setModalContent(locationModalItem);
      // 친구 모달
    } else if (modalType === "friend") {
      setModalTitle("누구랑 먹을까?");
      setModalContent(friendModalItem);
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
    // meetingLocation.push({
    //   storeId: "1",
    //   storeName: "Agal",
    //   storeAddress: "서울특별시 마포구 동교동 170-13",
    //   storeLatitude: "37.556862",
    //   storeLongitude: "126.926666",
    // });
    setMeetingLocation(meetingLocation);
    meetingFriends.push("605af3f78463422771e08028");
    setMeetingFriends(meetingFriends);

    let dataset = {
      title: meetingTitle,
      meetDate: newDate,
      stores: meetingLocation,
      participants: meetingFriends,
      tags: [],
      scores: [],
      comments: [],
      imgs: [],
      completed: false,
    };
    let dataMethod = "POST";
    // 수정일때
    if (meetingId !== undefined) {
      // dataset["id"] = meetingId
      dataset.id = meetingId;
      dataMethod = "PUT";
    }

    console.log(dataset);
    console.log(JSON.stringify(dataset));
    console.log(dataMethod);

    // 데이터 보내기
    fetch(`${process.env.REACT_APP_API_URL}/meeting`, {
      method: dataMethod,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      credentials: "same-origin",
      body: JSON.stringify(dataset),
    })
      .then((res) => res.json())
      .then((response) => console.log(response));

    // console.log("CREATE!");
  }

  function deleteStore(store){
      console.log(store)
      
      setMeetingLocation(meetingLocation.filter((item)=>{
        return item !== store
      }))
  }

  return (
    <div className="contentWrapper">
      <div className="contentTitle">{pageTitle}</div>
      <div className="contentBody">
        <Form name="meetingCreateForm" form={form}>
          {/* 약속 이름 창 */}
          <Form.Item
            name="meetingName"
            rules={[{ required: true, message: "약속 이름을 정해주세요" }]}
          >
            {/* <Input
              placeholder="약속 이름을 지어주세요"
              onChange={(e) => {
                setMeetingTitle(e.target.value);
              }}
            /> */}
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
              {/* <Input
                span={8}
                placeholder="약속 날짜"
                onClick={(e) => showModal(e, "date")}
              /> */}
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

          {/* 장소 선택 창 */}
          <Form.Item
            name="meetingLocation"
            label="어디서"
            rules={[{ required: true, message: "약속 장소를 정해주세요" }]}
          >
            <Input
              placeholder="약속 장소를 정해주세요"
              onClick={(e) => showModal(e, "location")}
            />
          </Form.Item>
          {/* 장소 목록   */}
          <Form.Item className="meetingLocationsListBox">
            <div className="meetingLocationsList">
              {meetingLocation.length > 0
                ? meetingLocation.map((store, index) => {
                    return (
                      <div className="meetingLocationsItem" key={index}>
                        <p>{store.storeName}</p>
                        <CloseOutlined onClick={(e)=>deleteStore(store)}/>
                      </div>
                    );
                  })
                : "장소를 정해주세요"}
            </div>
          </Form.Item>
          {/* 친구 부르기 버튼 */}
          <Form.Item name="meetingFindFriend" label="누구랑" className="meetingFindFriend" rules={[{ required: true}]}>
            <Input
            //   className="meetingFindFriendButton"
            placeholder="친구를 검색해주세요"
              onClick={(e) => showModal(e, "friend")}
            />
          </Form.Item>
          {/* 친구 목록   */}
          <Form.Item className="meetingFriendsListBox">
            <div className="meetingFriendsList">
              {meetingFriends.length > 0
                ? meetingFriends.map((item, index) => {
                    let imgUrl =
                      process.env.REACT_APP_API_URL +
                      "/files/" +
                      item.userProfileUrl;
                    return (
                      <div className="meetingFriendsItem" key={index}>
                        <div className="meetingFriendsProfile">
                          <img src={imgUrl} />
                        </div>

                        <p>{item.userName}</p>
                        <CloseOutlined/>
                      </div>
                    );
                  })
                : "친구를 추가해주세요."}
            </div>
          </Form.Item>
          <Form.Item name="meetingCreate" className="meetingCreate">
            <Button
              type="primary"
              htmlType="submit"
              onClick={(e) => createMeeting(e)}
              className="meetingCreateButton"
            >
              {meetingButtonText}
            </Button>
          </Form.Item>
        </Form>
      </div>
      {/* 모달 */}
      {modalVisible ? (
        <div className="modalWrapper">
          <div className="modalMain">
            <div className="modalTitle">
              <p>{modalTitle}</p>
              <p className="modalCloseButton">
                <CloseOutlined onClick={() => setModalVisible(false)} />
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
