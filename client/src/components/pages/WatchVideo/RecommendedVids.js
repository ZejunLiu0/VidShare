import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import thumbnail from "../../../imgs/thumbnail.png";
import Col from "react-bootstrap/esm/Col";

class RecommendedVids extends Component {
  constructor(props) {
    super(props);
    console.log("props:", props);
  }

  render() {
    return (
      <Container style={{ marginTop: "20px" }}>
        <Row>
          <Col sm={7} lg={7}>
            <a href={`/watch/${this.props.data._id}`}>
              <Image
                src={`http://localhost:8000/${this.props.data.thumbnail}`}
                thumbnail
              />
            </a>
          </Col>
          <Col style={{ textAlign: "left" }}>
            <Row>
              <a href={`/watch/${this.props.data._id}`}>
                {this.props.data.title}
              </a>
            </Row>
            <Row style={{ fontSize: "13px" }}>
              {this.props.data.author.email}
            </Row>
            <Row style={{ fontSize: "13px" }}>
              {this.props.data.view} views
              <br /> {this.props.data.uploadDate.split("T")[0]}
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default RecommendedVids;
