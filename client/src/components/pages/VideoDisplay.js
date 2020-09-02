import React, { useEffect, useState } from "react";
import VideoInfoBlock from "./VideoInfoBlock";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import axios from "axios";

function VideoDisplay(params) {
  const [vids, setVids] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8000/getvids").then((res) => {
      // console.log("requested");
      if (res.data.success) {
        console.log(res.data.videos);

        setVids(res.data.videos);
        console.log(vids);

      } else {
        alert("Failed to retrieve videos.");
      }
    });
  }, []);

  const renderVidInfo = vids.map((vid, index) => {
    console.log(vid)
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
        <Row>{renderVidInfo}</Row>
      </Container>
    </div>
  );
}

export default VideoDisplay;
