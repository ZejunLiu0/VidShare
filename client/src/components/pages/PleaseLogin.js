import React, { Component } from "react";
import LoginButton from "../NavBars/loginButton";
class PleaseLogin extends Component {
  render() {
    return (
      <div>
        Please log in for more:
        <LoginButton />
      </div>
    );
  }
}

export default PleaseLogin;
