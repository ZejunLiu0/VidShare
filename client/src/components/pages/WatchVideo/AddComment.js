import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/Image";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import profile from "../../../imgs/thumbnail.png";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";


class AddComment extends Component {
  constructor(props) {
    super(props);
    this.submitComment = this.submitComment.bind(this);
    this.comment = React.createRef();
  }

  submitComment() {
    const text = this.comment.current.value;
    // console.log("submit",this.props.user);
    if (text == "") alert("Please write something in the comment.");
    else {
      const comment = {
        vidId: this.props.vidId,
        parentComment: this.props.parentComment,
        author: this.props.user.email,
        date: Date.now(),
        likes: 0,
        dislikes: 0,
        text: text,
      };

      axios.post("http://localhost:8000/comments", comment).then((res) => {
        if (res.data.success) {
        //   console.log("commented", res.data);
          this.comment.current.value = "";
        } else {
          alert("Failed to comment");
        }
      });
    }
  }

  render() {
    return (
      <Container style={{marginBottom: "30px"}}>
        <Row>
          <Image
            src={profile}
            roundedCircle
            fluid
            style={{ height: "55px", width: "55px" }}
          />

          <Col style={{ display: "flex", alignItems: "center" }}>
            <InputGroup>
              <FormControl
                placeholder="Add a comment (No more than 1000 characters)"
                type="text"
                aria-label="addComment"
                aria-describedby="basic-addon2"
                ref={this.comment}
              />
              <InputGroup.Append>
                <Button
                  variant="outline-secondary"
                  onClick={this.submitComment}
                >
                  Submit
                </Button>
              </InputGroup.Append>
            </InputGroup>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth0(AddComment);
