import React, { Component } from "react";
import RecommendedVideos from "./RecommendedVids";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/esm/Col";
import profile from "../../../imgs/thumbnail.png";
import Image from "react-bootstrap/Image";
import Button from "react-bootstrap/Button";
import AddComment from "./AddComment";
import RenderComment from "./RenderComment";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { HandThumbsDown, HandThumbsUp } from "react-bootstrap-icons";

// function WatchVideo(props) {
class WatchVideo extends Component {
  constructor(props) {
    super(props);
    // console.log("props:", this.props);
    this.state = {
      vidPath: "",
      title: "",
      views: "",
      date: "",
      author: "",
      desc: "",
      category: "",
      relatedVids: [],
      subscribed: false,
      subNum: 0,
      from: "",
      liked: false,
      disliked: false,
      likeNum: 0,
      dislikeNum: 0,
      userEmail: "",
    };
    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
    this.dislikeClicked = this.dislikeClicked.bind(this);
    this.likeClicked = this.likeClicked.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.user != prevProps.user) {
      this.setState({ userEmail: this.props.user.email });
      console.log("updated");
      console.log(this.props.user.email);

      // Get subscription info

      const subInfo = {
        to: this.state.author,
        from: this.props.user.email,
      };

      axios
        .post("http://localhost:8000/subs/isSubscribed", subInfo)
        .then((res) => {
          if (res.data.success) {
            // console.log(res.data.subscribed);
            this.setState({ subscribed: res.data.subscribed });
          } else {
            alert("Failed to check if is subscribed.");
          }
        });

      const usrInfo = {
        vidId: this.props.match.params.vidId,
        userBrowsing: this.props.user.email,
      };
      axios
        .post("http://localhost:8000/likes/getUserLikedVid", usrInfo)
        .then((res) => {
          if (res.data.success) {
            console.log("getUserLikedVid", res.data);
            this.setState({ liked: res.data.liked });
            if (!res.data.liked) {
              axios
                .post("http://localhost:8000/likes/getUserDisikedVid", usrInfo)
                .then((res) => {
                  if (res.data.success) {
                    console.log("getUserLikedVid", res.data);
                    this.setState({ disliked: res.data.disliked });
                  } else {
                    alert("Failed to get dislike info.");
                  }
                });
            }
          } else {
            alert("Failed to get like info.");
          }
        });
    }

    if (this.state.subscribed != prevState.subscribed) {
      const subInfo = { to: this.state.author };
      axios.post("http://localhost:8000/subs/numSub", subInfo).then((res) => {
        if (res.data.success) {
          console.log(res.data.numSubs);
          this.setState({ subNum: res.data.numSubs });
        } else {
          alert("Failed to get number od subs.");
        }
      });
    }
  }

  componentDidMount() {
    // fetch video info
    const vidInfo = {
      vidId: this.props.match.params.vidId,
    };
    axios.post("http://localhost:8000/getvids", vidInfo).then((res) => {
      if (res.data.success) {
        // console.log(res.data);
        const vidData = res.data.vid;
        let times = vidData.uploadDate.split("T");
        let timestamp = times[0] + " " + times[1].split(".")[0];
        this.setState({
          vidPath: vidData.vidPath,
          title: vidData.title,
          views: vidData.view,
          date: timestamp,
          author: vidData.author.email,
          desc: vidData.description,
          category: vidData.category,
        });

        // fetch related videos
        const categoryRequest = {
          category: vidData.category,
        };
        axios
          .post("http://localhost:8000/getvids/relatedVids", categoryRequest)
          .then((res) => {
            if (res.data.success) {
              this.setState({ relatedVids: res.data.videos });
            } else {
              alert("Failed to retrieve related videos.");
            }
          });

        // get number of subscribers
        console.log("this.state.author:", this.state.author);
        const subInfo = { to: this.state.author };
        axios.post("http://localhost:8000/subs/numSub", subInfo).then((res) => {
          if (res.data.success) {
            console.log(res.data.numSubs);
            this.setState({ subNum: res.data.numSubs });
          } else {
            alert("Failed to get number of subs.");
          }
        });

        console.log(this.props.auth0);
        // get like info
        const likeInfo = {
          vidId: this.props.match.params.vidId,
          uploader: this.state.author,
          // userBrowsing:
        };
        axios
          .post("http://localhost:8000/likes/getLikeNum", likeInfo)
          .then((res) => {
            if (res.data.success) {
              console.log("Amharic", res.data);
              this.setState({
                likeNum: res.data.likes,
                dislikeNum: res.data.dislikes,
              });
            } else {
              alert("Failed to get like info.");
            }
          });
      } else {
        alert("Failed to fetch video!");
      }
    });
  }

  unsubscribe() {
    const info = {
      to: this.state.author,
      from: this.props.user.email,
    };
    axios.post("http://localhost:8000/subs/unsubscribe", info).then((res) => {
      if (res.data.success) {
        console.log("unsbscribed", res.data);
        this.setState({ subscribed: false });
      } else {
        alert("Unable to unsubscribe.");
      }
    });
  }

  subscribe() {
    const info = {
      to: this.state.author,
      from: this.props.user.email,
    };
    axios.post("http://localhost:8000/subs/subscribe", info).then((res) => {
      if (res.data.success) {
        console.log("subscribed", res.data);
        this.setState({ subscribed: true });
      } else {
        alert(res.data.msg);
      }
    });
  }

  likeClicked() {
    const info = {
      type: 1,
      vidId: this.props.match.params.vidId,
      userEmail: this.props.user.email,
      commentId: null,
    };
    if (this.state.disliked) {
      // hit like when disliked, delete record from dislike, add to like
      this.setState({
        liked: true,
        disliked: false,
        likeNum: this.state.likeNum + 1,
        dislikeNum: this.state.dislikeNum - 1,
      });
      info.type = 1;
    } else if (this.state.liked) {
      // hit like when liked, delete record from like
      info.type = 2;
      this.setState({ liked: false, likeNum: this.state.likeNum - 1 });
    } else {
      // add record to like
      info.type = 3;
      this.setState({ liked: true, likeNum: this.state.likeNum + 1 });
    }

    axios.post("http://localhost:8000/likes/liked", info).then((res) => {
      if (res.data.success) {
        console.log("state:", res.data);
      } else {
        alert("Failed!");
      }
    });
  }

  dislikeClicked() {
    const info = {
      type: 1,
      vidId: this.props.match.params.vidId,
      userEmail: this.props.user.email,
      commentId: null,
    };

    if (this.state.liked) {
      // hit dislike when liked
      this.setState({
        liked: false,
        disliked: true,
        likeNum: this.state.likeNum - 1,
        dislikeNum: this.state.dislikeNum + 1,
      });
      info.type = 1;
    } else if (this.state.disliked) {
      // hit dislike when disliked
      this.setState({
        disliked: false,
        dislikeNum: this.state.dislikeNum - 1,
      });
      info.type = 2;
    } else {
      // hit dislike
      this.setState({
        disliked: true,
        dislikeNum: this.state.dislikeNum + 1,
      });
      info.type = 3;
    }

    axios.post("http://localhost:8000/likes/disliked", info).then((res) => {
      if (res.data.success) {
        console.log("state:", res.data);
      } else {
        alert("Failed!");
      }
    });
  }

  render() {
    // this.setState({user: user});
    const renderVidInfo = this.state.relatedVids.map((vid, index) => {
      return (
        <Row key={index}>
          <RecommendedVideos data={vid} />
        </Row>
      );
    });

    const showSubButton = this.state.userEmail != this.state.author;

    return (
      <Container style={{ marginTop: "2rem" }}>
        <Row style={{ paddingBottom: "50px" }}>
          {/* Video Player */}
          <Col sm={7} md={7} lg={9}>
            <Row style={{ height: "500px", backgroundColor: "black" }}>
              <video
                style={{ width: "100%", maxHeight: "100%" }}
                src={`http://localhost:8000/${this.state.vidPath}`}
                controls
              ></video>
            </Row>
            <br />
            <Row className="split-line">
              <Col sm={9} md={9} lg={9}>
                <Row>
                  <h4>{this.state.title}</h4>
                </Row>
                <Row>
                  {/* Todo: views */}
                  {/* {this.state.views} views,  */}
                  {this.state.date}
                </Row>
              </Col>
              <Col>
                {this.state.liked ? (
                  <Button
                    variant="primary"
                    style={{ height: "100%", width: "100%" }}
                    onClick={this.likeClicked}
                  >
                    <HandThumbsUp color="white" />
                    <br />
                    {this.state.likeNum}
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    style={{ height: "100%", width: "100%" }}
                    onClick={this.likeClicked}
                  >
                    <HandThumbsUp color="grey" />
                    <br />
                    {this.state.likeNum}
                  </Button>
                )}
              </Col>
              <Col>
                {this.state.disliked ? (
                  <Button
                    variant="primary"
                    style={{ height: "100%", width: "100%" }}
                    onClick={this.dislikeClicked}
                  >
                    <HandThumbsDown color="white" />
                    <br />
                    {this.state.dislikeNum}
                  </Button>
                ) : (
                  <Button
                    variant="light"
                    style={{ height: "100%", width: "100%" }}
                    onClick={this.dislikeClicked}
                  >
                    <HandThumbsDown color="grey" />
                    <br />
                    {this.state.dislikeNum}
                  </Button>
                )}
              </Col>
            </Row>
            <br />

            {/* Author */}
            <Row style={{ height: "160px" }} className="split-line">
              <Col sm={2} md={2} lg={2}>
                <Image
                  src={profile}
                  roundedCircle
                  fluid
                  style={{
                    height: "60px",
                    width: "60px",
                    marginBottom: "10px",
                  }}
                />

                {this.state.subscribed ? (
                  showSubButton && <Button
                    variant="secondary"
                    size="sm"
                    onClick={this.unsubscribe}
                  >
                    Subscribed
                  </Button>
                ) : (
                  showSubButton && <Button variant="danger" size="sm" onClick={this.subscribe}>
                    {this.state.subNum} Subscribe
                  </Button>
                )}

              </Col>
              <Col style={{ textAlign: "left" }}>
                <Row style={{ height: "32%", fontSize: "14px" }}>
                  <div style={{ fontWeight: "bold", width: "100%" }}>
                    {this.state.author}
                  </div>
                  <div style={{ color: "#606060" }}>
                    {this.state.subNum} subscribers
                  </div>
                </Row>
                <Row>
                  <p>
                    {this.state.desc == ""
                      ? "No description."
                      : this.state.desc}
                  </p>
                </Row>
                <Row style={{ position: "absolute", bottom: "10px" }}>
                  <b>Category:</b>
                  <div style={{ paddingLeft: "10px" }}>
                    {this.state.category}
                  </div>
                </Row>
              </Col>
            </Row>
            <br />

            {/* Add Comments */}
            <Row>
              <h5 style={{ textAlign: "left" }}>Comments</h5>
            </Row>

            <AddComment
              user={this.props.auth0.user}
              vidId={this.props.match.params.vidId}
            />

            {/* Video comments */}
            <RenderComment vidId={this.props.match.params.vidId} />
          </Col>

          {/* Recommended Videos */}
          <Col>
            <h5 style={{ textAlign: "left" }}>Related Videos</h5>
            <div className="split-line"></div>
            {renderVidInfo}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default withAuth0(WatchVideo);
