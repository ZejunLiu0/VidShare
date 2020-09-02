import React, { useState, useEffect } from "react";
import Comment from "./Comment";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Container";
import axios from "axios";

const RenderComment = (props) => {
  const [cmts, setComments] = useState([]);
  const [vidId, setVidId] = useState("");

  useEffect(() => {
    // console.log("in render comments", props);
    setVidId(props.vidId)
    const vidInfo = {
      vidId: props.vidId,
    };
    axios
      .post("http://localhost:8000/comments/getComments", vidInfo)
      .then((res) => {
        if (res.data.success) {
          // console.log("res comments:", res.data.comment);
          setComments(res.data.comment);
        } else {
          alert("Failed to retrieve comments.");
        }
      });
  }, []);

  const renderCmts = cmts.map((cmt, index) => {
    return (
      <Container
        style={{ paddingLeft: "20px", paddingBottom: "20px" }}
        key={index}
      >
        <Comment cmt={cmt} vidId={vidId}/>

        {/* Todo: Reply comments */}
        {/* Child comments */}
        {/* <Row
          style={{
            marginLeft: "60px",
            display: "flex",
            alignItems: "center",
            paddingTop: "20px",
          }}
        >
          <p>Show more comments</p>
        </Row>
        <Row style={{ marginLeft: "60px" }}>
          <Comment />
        </Row> */}
      </Container>
    );
  });

  return <div>{renderCmts}</div>;
};

export default RenderComment;
