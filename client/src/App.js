import React from "react";
import { Router, Switch, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NavBar from "./components/NavBars/NavBar";
import SideNav from "./components/NavBars/SideNav";
import VideoDisplay from "./components/pages/VideoDisplay";
import Library from "./components/pages/Library/Library";
import UploadVideos from "./components/pages/Upload/UploadVideos";
import WatchVideo from "./components/pages/WatchVideo/WatchVideo";
import Subscriptions from "./components/pages/Subscriptions"
import { useAuth0 } from "@auth0/auth0-react";
import { createBrowserHistory } from "history";
let history = createBrowserHistory();

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  // console.log("in app", user);
  return (
    <Router history={history}>
      <div className="App">
        <NavBar isAuthenticated={isAuthenticated} user={user} />
        <div className="main-content">
          <div className="side-nav">
            <SideNav isAuthenticated={isAuthenticated} user={user} />
          </div>

          <div className="content">
            <Switch>
              <Route exact path="/" component={VideoDisplay} />
              {/* <VideoDisplay /> */}
              {/* </Route> */}

              <Route path="/subscriptions" component={Subscriptions} />
              {/* <VideoDisplay/> */}
              {/* </Route> */}

              <Route path="/library" component={Library} />
              {/* <Library /> */}
              {/* </Route> */}

              <Route path="/channel/upload">
                <UploadVideos isAuthenticated={isAuthenticated} user={user} />
              </Route>

              <Route
                exact
                path="/watch/:vidId"
                render={(props) => <WatchVideo {...props} user={user} />}
              />
              {/* <Route exact path="/watch/:vidId" component={WatchVideo} /> */}
              {/* <Route exact path="/watch/:vidId">
                <WatchVideo />
              </Route> */}
            </Switch>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
