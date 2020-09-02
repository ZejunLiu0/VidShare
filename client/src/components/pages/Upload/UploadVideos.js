import React, { Component } from "react";
import Dropzone from "react-dropzone";
import Container from "react-bootstrap/esm/Container";
import "../../../css/UploadVideos.css";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/esm/Row";
import { Plus } from "react-bootstrap-icons";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";
import PleaseLogin from "../PleaseLogin";
import { createBrowserHistory } from 'history'

const history = createBrowserHistory()

const visability = [
  { value: 0, label: "Public" },
  { value: 1, label: "Private" },
];
const category = [
  { value: 0, label: "Film & Animation" },
  { value: 1, label: "Education" },
  { value: 2, label: "Music" },
  { value: 3, label: "Pets & Animals" },
  { value: 4, label: "Sports" },
];

class UploadVideos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      vis: 0,
      category: "Film & Animation",
      file: "",
      fileNmae: "",
      filePath: "",
      vidDuration: "",
      thumbnail: "",
      vidPath: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    if (this.state.title === "") {
      alert("Please enter title");
    } else if (this.state.vidPath === "") {
      alert("Please upload a video.");
    } else {
      const vidInfo = {
        author: this.props.user.sub.split("|")[1],
        title: this.state.title,
        description: this.state.description,
        visibility: this.state.vis,
        vidPath: this.state.vidPath,
        category: this.state.category,
        duration: this.state.vidDuration,
        thumbnail: this.state.thumbnail,
        uploadDate: Date.now(),
      };

      // console.log(vidInfo);
      axios
        .post("http://localhost:8000/upload/postvid", vidInfo)
        .then((res) => {
          if (res.data.success) {
            alert("Video uploaded successfully.");
            history.push('/');
            history.go();
          } else {
            alert("Failed to upload video. Please try again.");
          }
        });
    }
  }

  onDrop(files) {
    if (files[0].size > 10240000) {
      alert("File size cannot exceed 10Mb.");
    } else if (files[0].type != "video/mp4") {
      alert("Video must be a .mp4 file");
    } else {
      let formData = new FormData();
      const config = {
        header: { "content-type": "multipart/form-data" },
      };
      formData.append("file", files[0]);

      axios
        .post("http://localhost:8000/upload", formData, config)
        .then((res) => {
          if (res.data.success) {
            // console.log("Successfully uploaded video");
            // console.log(res);
            this.setState({
              fileNmae: res.data.fileNmae,
              filePath: res.data.filePath,
            });

            let vidInfo = {
              fileNmae: res.data.fileNmae,
              filePath: res.data.filePath,
            };

            axios
              .post("http://localhost:8000/upload/thumbnail", vidInfo)
              .then((res) => {
                if (res.data.success) {
                  // console.log("Successfully generated thumbnail");

                  this.setState({
                    vidDuration: res.data.duration,
                    thumbnail: res.data.thumbnailPath,
                    vidPath: res.data.vidPath,
                  });
                  // console.log(res.data.vidPath);
                } else {
                  alert("Failed to generate thumbnails!");
                }
              });
          } else {
            alert("Failed to save the video in server!");
          }
        });
    }
  }

  render() {
    // console.log(this.props.user);
    return (
      <>
        {this.props.isAuthenticated ? (
          <Container
            style={{ marginTop: "5%", marginLeft: "5%", marginRight: "5%" }}
          >
            <Row>
              <div style={{ marginLeft: "auto", marginRight: "auto" }}>
                <h2>Upload videos</h2>
              </div>
            </Row>
            <br />

            {/* Upload Video */}
            <Container className="content-center">
              <Row style={{ height: "250px" }}>
                <Col>
                  {this.state.vidPath == "" ? (
                    <div className="thumbnail">
                      <Dropzone
                        onDrop={(acceptedFiles) => this.onDrop(acceptedFiles)}
                        multiple={false}
                        maxSize={Infinity}
                      >
                        {({ getRootProps, getInputProps }) => (
                          <section>
                            <Container>
                              <div {...getRootProps()}>
                                {/* <div className="thumbnail" {...getRootProps()}> */}
                                <input {...getInputProps()} />

                                <div className="h-center">
                                  <Plus color="#ababab" size={90} />
                                  <p style={{ color: "#ababab" }}>
                                    Drop your video here, or click to select
                                    files
                                  </p>
                                  <p style={{ color: "#ababab" }}>
                                    File size cannot exceed 10Mb. Mp4 files
                                    only.
                                  </p>
                                </div>
                              </div>
                              <aside
                                style={{
                                  width: "400px",
                                  margin: "auto!important",
                                }}
                              ></aside>
                            </Container>
                          </section>
                        )}
                      </Dropzone>
                    </div>
                  ) : (
                    <div style={{ height: "250px", backgroundColor: "black" }}>
                      <video
                        style={{ width: "100%", maxHeight: "100%" }}
                        src={`http://localhost:8000/${this.state.vidPath}`}
                        controls
                      ></video>
                    </div>
                  )}
                </Col>
                <Col>
                  {this.state.thumbnail != "" ? (
                    <div style={{ height: "250px" }}>
                      <Image
                        src={`http://localhost:8000/${this.state.thumbnail}`}
                        alt="thumbnail"
                        thumbnail
                        fluid
                      />
                    </div>
                  ) : (
                    <div className="thumbnail h-center">
                      <p style={{ color: "#ababab", fontSize: "60px" }}>
                        Thumbnail <br /> Preview
                      </p>
                    </div>
                  )}
                </Col>
              </Row>
              <Row style={{ paddingTop: "15px", margin: "auto" }}>
                {/* <p style={{}}>File name:{this.state.fileNmae}</p> */}
              </Row>

              {/* Todo: Thumbnail */}
              <Row>
                <Col></Col>
                <Col></Col>
                <Col></Col>
                <Col></Col>
              </Row>

              {/* Video info */}
              <br />
              <div style={{ marginLeft: "10%", marginRight: "10%" }}>
                <Form onSubmit={this.handleSubmit}>
                  <Form.Group>
                    <Form.Row>
                      <Form.Label column lg={2}>
                        Title:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          type="text"
                          placeholder="Title"
                          onChange={(event) => {
                            this.setState({ title: event.target.value });
                          }}
                        />
                      </Col>
                    </Form.Row>
                    <br />

                    <Form.Row>
                      <Form.Label column lg={2}>
                        Description:
                      </Form.Label>
                      <Col>
                        <Form.Control
                          as="textarea"
                          rows="3"
                          onChange={(event) => {
                            this.setState({ description: event.target.value });
                          }}
                        />
                      </Col>
                    </Form.Row>
                    <br />

                    <Form.Row>
                      <Form.Label column lg={2}>
                        Visibility:
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          as="select"
                          onChange={(event) => {
                            // console.log(event.target );
                            this.setState({ vis: event.target.value });
                          }}
                        >
                          {visability.map((item, index) => (
                            <option key={index} value={index}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                      <Col></Col>
                    </Form.Row>
                    <br />
                    {/* <Form.Group controlId="exampleForm.ControlSelect1"> */}
                    <Form.Row>
                      <Form.Label column lg={2}>
                        Category:
                      </Form.Label>
                      <Col sm={4}>
                        <Form.Control
                          as="select"
                          onChange={(event) => {
                            // console.log(event.target)
                            this.setState({ category: event.target.value });
                          }}
                        >
                          {category.map((item, index) => (
                            <option key={index} value={item.label}>
                              {item.label}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Form.Row>
                    <br />
                    {/* <Form.Row> */}
                    <Button type="submit">Submit</Button>
                    {/* </Form.Row> */}

                    {/* </Form.Group> */}
                  </Form.Group>
                </Form>
              </div>
            </Container>
          </Container>
        ) : (
          <PleaseLogin />
        )}
      </>
    );
  }
}

export default UploadVideos;
