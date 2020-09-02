import React, { useEffect, useState } from "react";
import VideoInfoBlock from "./VideoInfoBlock";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function Subscriptions(params) {
  const [vids, setVids] = useState([]);
  const { user } = useAuth0();

  useEffect(() => {
    if (user) {
      // console.log(user.email);
      const userInfo = {
        from: user.email,
      };
      axios
        .post("http://localhost:8000/getvids/getSubVids", userInfo)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.videos);
            setVids(res.data.videos);
          } else {
            alert("Failed to retrieve videos.");
          }
        });
    }
  }, [user]);

  const renderVidInfo = vids.map((vid, index) => {
    return (
      <Col xs={6} md={3} key={index}>
        <VideoInfoBlock
          data={vid}
          thumbnail={`http://localhost:8000/${vid.thumbnail}`}
        />
      </Col>
    );
  });

  return (
    <div className="main">
      <Container>
        <Row>
          <h3>Subscriptions</h3>
        </Row>
        <Row>{renderVidInfo}</Row>
      </Container>
    </div>
  );
}

export default Subscriptions;
