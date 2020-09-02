import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import thumbnail from "../../imgs/thumbnail.png";
import { Link } from "react-router-dom";
// import { withAuth0 } from "@auth0/auth0-react";


class VideoInfoBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    // console.log(this.props.data);
  }

  render() {
    return (
      <div>
        <Container style={{ marginTop: "15px" }}>
          <div>
            <a href={`/watch/${this.props.data._id}`}>
              <Image
                src={this.props.thumbnail}
                thumbnail
                style={{ maxWidth: "95%" }}
              />
            </a>
          </div>
          <Container style={{ marginTop: "10px" }}>
            <Row>
              <Col sm={4}>
                <Image
                  src={thumbnail}
                  roundedCircle
                  style={{ height: "36px", width: "36px" }}
                />
              </Col>
              <Col>
                <Row style={{ maxWidth: "100%" }}>
                  {/* <Link to="/watch"> */}
                    <div style={{ fontSize: "15px" }}>
                      <a href={`/watch/${this.props.data._id}`} >
                        {this.props.data.title}
                        </a>
                    </div>
                  {/* </Link> */}
                </Row>
                <div style={{ fontSize: "12px" }}>
                  <Row>{this.props.data.author.email}</Row>
                  {/* <Row>{this.props.data.view} views </Row> */}
                  <Row>{this.props.data.uploadDate.split("T")[0]} </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </Container>
      </div>
    );
  }
}

export default VideoInfoBlock;
// export default withAuth0(VideoInfoBlock);
