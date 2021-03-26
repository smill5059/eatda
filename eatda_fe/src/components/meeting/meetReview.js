import React from "react";
import {Row, Col} from 'antd';

function MeetingReview() {
  return (
    <div className="contentBody meetingReadAfterContent">
        <Row justify="end" className="meetingReadTitle">
          <p>수림이와 홍대 나들이</p>
        </Row>
        <Col className="meetingReadImage">
          <div className="meetingReadImageItem">
            <img alt="img" />
          </div>
          <div className="meetingReadImageItem">
            <img alt="img" />
          </div>
          <div className="meetingReadImageItem">
            <img alt="img" />
          </div>
        </Col>
        <Col className="meetingReadAfterFriend">
          <Row className="meetingReadAfterFriendItem">
            <Col span={8} className="meetingReadAfterFriendImage">
              <img src="https://via.placeholder.com/30" />
            </Col>
            <Col span={16} className="meetingReadAfterFriendName">
              왕왕왕asdasdasdasdasdasdasd
            </Col>
          </Row>
          <Row className="meetingReadAfterFriendItem">
            <Col span={8} className="meetingReadAfterFriendImage">
              <img src="https://via.placeholder.com/30" />
            </Col>
            <Col span={16} className="meetingReadAfterFriendName">
              왕왕왕asdasdasdasdasdasdasd
            </Col>
          </Row>
          <Row className="meetingReadAfterFriendItem">
            <Col span={8} className="meetingReadAfterFriendImage">
              <img src="https://via.placeholder.com/30" />
            </Col>
            <Col span={16} className="meetingReadAfterFriendName">
              왕왕왕asdasdasdasdasdasdasd
            </Col>
          </Row>
        </Col>
        <Col className="meetingReadAfterComment">
            <Row className="meetingReadAfterCommentItem">
                <Col span={24} className="meetingReadAfterCommentName">
                    이름
                </Col>
                <Col span={24} className="meetingReadAfterCommentContent">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc elementum turpis ut augue feugiat, ultricies iaculis augue interdum. Sed et commodo nisl. Vivamus finibus massa eu porttitor maximus. Suspendisse tincidunt lorem nec tortor volutpat vestibulum. Phasellus posuere venenatis ornare. Etiam mollis tincidunt purus, at fermentum nulla maximus at. Phasellus faucibus, felis eu maximus vestibulum, elit odio elementum metus, at bibendum turpis enim id nunc. Integer at hendrerit quam, vel interdum est. Ut sem leo, efficitur in consectetur quis, sagittis ac mi. Nunc eu nisi arcu.
                </Col>
            </Row>
            <Row className="meetingReadAfterCommentItem">
                <Col span={24} className="meetingReadAfterCommentName">
                    이름
                </Col>
                <Col span={24} className="meetingReadAfterCommentContent">
                Pellentesque facilisis sapien vel quam maximus, ut aliquam erat porttitor. Etiam suscipit dolor bibendum diam aliquam, non sollicitudin sem iaculis. In at consequat libero. Aenean vulputate tincidunt lacus ac elementum. Phasellus quis dignissim purus, non finibus nisl. Praesent non enim dictum sapien dapibus laoreet. Morbi ullamcorper varius aliquam. Vivamus pretium porta dui, et rutrum dolor cursus vel. Cras interdum eu odio et feugiat. Morbi vitae quam hendrerit, egestas lorem vitae, auctor leo.
                </Col>
            </Row>
        </Col>
      </div>
  );
}

export default MeetingReview;
