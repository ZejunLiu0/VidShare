import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import profile from "../../../imgs/thumbnail.png";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";
import Button from "react-bootstrap/esm/Button";
import Image from "react-bootstrap/Image";
import AddComment from "./AddComment";
import { withAuth0 } from "@auth0/auth0-react";

class Comment extends Component {
  constructor(props) {
    super(props);
    // console.log("in comment:", props);
    this.state = {
      showReply: false,
    };
    this.replyClicked = this.replyClicked.bind(this);
  }

  replyClicked() {
    this.setState({ showReply: !this.state.showReply });
    // console.log("in comment:", this.props);
  }

  render() {
    return (
      <Container>
        <Row>
          <Image
            src={profile}
            roundedCircle
            fluid
            style={{ height: "55px", width: "55px", marginRight: "20px" }}
          />
          <Col>
            <Row>
              <div style={{ marginRight: "10px" }}>
                {this.props.cmt.author.email}
              </div>
              <div>{this.props.cmt.date}</div>
            </Row>
            <Row>{this.props.cmt.text}</Row>
            <Row>
              <div
                style={{
                  marginTop: "auto",
                  marginBottom: "auto",
                  marginRight: "10px",
                }}
              >
                <HandThumbsUp size={20} /> {this.props.cmt.likes}
              </div>
              <div style={{ marginTop: "auto", marginBottom: "auto" }}>
                <HandThumbsDown size={20} /> {this.props.cmt.dislikes}
              </div>
              <Button variant="link" onClick={this.replyClicked}>
                Reply
              </Button>
            </Row>
            {this.state.showReply ? (
              <div style={{ marginTop: "20px" }}>
                <AddComment
                  user={this.props.auth0.user}
                  vidId={this.props.vidId}
                  parentComment={this.props.cmt._id}
                />
              </div>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth0(Comment);
