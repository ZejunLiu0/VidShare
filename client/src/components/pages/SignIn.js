import React, { Component } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
        <Container className="signin-container">
        <h2>Sign In</h2>
        <Row className="login-title">
        </Row>

        <Form>
          <Form.Group as={Row} controlId="formBasicEmail">
            <Form.Label column sm="5">
              Email address
            </Form.Label>
            <Col>
              <Form.Control type="email" placeholder="Enter email" />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formBasicPassword">
            <Form.Label column sm="5">
              Password
            </Form.Label>
            <Col>
              <Form.Control type="password" placeholder="Password" />
            </Col>
          </Form.Group>

          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Container>
    );
  }
}
export default SignIn;
