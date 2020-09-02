import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Auth0Provider } from "@auth0/auth0-react";
import { Router } from "react-router-dom";
import { createBrowserHistory } from 'history';
let history = createBrowserHistory();

ReactDOM.render(
  // <React.StrictMode>

  <Auth0Provider
    domain="dev-12udt61k.us.auth0.com"
    clientId="veL66hotc7DYXDFVBdk5xFHfSsVsEVm9"
    redirectUri={window.location.origin}
  >
      <App />

  </Auth0Provider>,
  // </React.StrictMode>,

  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
