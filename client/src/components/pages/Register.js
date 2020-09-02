import React, { Component } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import profilePic from "../../imgs/user.png";

class Register extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   email: null,
    //   password: null,
    //   confirmPassword: null,
    //   nickname: null,
    //   profileImg: null,
    // };
    this.state = {
      email: "123@q.com",
      password: "sasa",
      confirmPassword: "sasa",
      nickname: "null",
      profileImg: null,
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    // console.log(this.state.email);

    if (!this.state.email) alert("Please enter email.");
    else if (!this.state.password) alert("Please enter password.");
    else if (this.state.confirmPassword == "")
      alert("Please enter confirm password.");
    else if (this.state.password != this.state.confirmPassword)
      alert("Password did not match: Please try again.");
    else if (!this.state.nickname) alert("Please enter nickname.");
    else {
      // console.log("4");
      const user = {
        email: this.state.email,
        password: this.state.password,
        nickname: this.state.nickname,
        img: this.state.profileImg,
      };

      //   fetch("http://localhost:9000/register")
      //   .then((res) => res.text())
      //   .then((res) => console.log(res));
    }
  };

  componentWillMount() {}

  render() {
    return (
      <Container className="register-container">
        <h2>Register</h2>
        <Row className="login-title"></Row>

        <Row>
          <Col sm={3} className="reg-profile">
            <Image src={profilePic} rounded fluid />
            <Form>
              <Form.Group>
                <Form.File
                  id="exampleFormControlFile1"
                  label="Example file input"
                />
              </Form.Group>
            </Form>
          </Col>

          <Col>
            <Form onSubmit={this.handleSubmit}>
              <Form.Group as={Row} controlId="formBasicEmail">
                <Form.Label column sm="5">
                  Email address
                </Form.Label>
                <Col>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    onChange={(event) => {
                      this.setState({ email: event.target.value });
                      // console.log(event.target.value);
                      // console.log(this.state.email);
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="5">
                  Password
                </Form.Label>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(event) => {
                      this.setState({ password: event.target.value });
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} controlId="formBasicPassword">
                <Form.Label column sm="5">
                  Confirm password
                </Form.Label>
                <Col>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(event) => {
                      this.setState({ confirmPassword: event.target.value });
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row}>
                <Form.Label column sm="5">
                  Nickname
                </Form.Label>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Nickname"
                    onChange={(event) => {
                      this.setState({ nickname: event.target.value });
                    }}
                  />
                </Col>
              </Form.Group>

              <Form.Group controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Register;
