import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import VideoInfoBlock from "../VideoInfoBlock";

class Library extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Container>
            <Row>
              <Col className="text-left"><h3>History</h3></Col>
              <Col xs={4}>See All</Col>
            </Row>
            <Row>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
            </Row>
            <div className="split-line"></div>

            <Row>
              <Col className="text-left"><h3>Watch later</h3></Col>
              <Col xs={4}>See All</Col>
            </Row>
            <Row>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
            </Row>
            <div className="split-line"></div>

            <Row>
              <Col className="text-left"><h3>Playlists</h3></Col>
              <Col xs={4}>See All</Col>
            </Row>
            <Row>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
            </Row>
            <div className="split-line"></div>

            <Row>
              <Col className="text-left"><h3>Liked videos</h3></Col>
              <Col xs={4}>See All</Col>
            </Row>
            <Row>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
              <Col>
                <VideoInfoBlock />
              </Col>
            </Row>
            <div className="split-line"></div>

        </Container>
      </>
    );
  }
}

export default Library;
