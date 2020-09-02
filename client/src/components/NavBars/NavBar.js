import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import FormControl from "react-bootstrap/FormControl";
import Form from "react-bootstrap/Form";
import LoginButton from "./loginButton";
import LogoutButton from "./logoutButton";
import Image from "react-bootstrap/Image";
import { Upload } from "react-bootstrap-icons";

// const NavBar = () => {
class NavBar extends Component {
  // const { user, isAuthenticated } = useAuth0();
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar
          bg="light"
          variant="light"
          fixed="top"
          style={{ maxHeight: "56px" }}
        >
          <Navbar.Brand href="/">VidShare</Navbar.Brand>
          {this.props.isAuthenticated ? (
            <div
              style={{
                marginTop: "auto",
                marginBottom: "auto",
                marginRight: "10px",
              }}
            >
              Welcome! {this.props.user.name}
            </div>
          ) : null}

          {/* Todo: search */}
          {/* <Form inline className="mr-auto">
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-primary">Search</Button>
          </Form> */}

          <Nav style={{position:"absolute", right:"20px"}}>
            {this.props.isAuthenticated ? (
              <>
                <Button
                  href="/channel/upload"
                  variant="outline-secondary"
                  style={{
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginRight: "10px",
                  }}
                >
                  <Upload style={{ marginRight: "10px" }} /> Upload
                </Button>

                <Image
                  src={this.props.user.picture}
                  alt={this.props.user.name}
                  roundedCircle
                  style={{
                    height: "44px",
                    width: "44px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    marginRight: "10px",
                  }}
                />
                <LogoutButton />
              </>
            ) : (
              <LoginButton />
            )}
          </Nav>
        </Navbar>
      </>
    );
  }
}

export default NavBar;
