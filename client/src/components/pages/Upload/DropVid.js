import React, { Component } from "react";
import Dropzone from "react-dropzone";
import { Plus, Upload } from "react-bootstrap-icons";
import Container from "react-bootstrap/Container";
import "../../../css/UploadVideos.css";

class DropVid extends Component {
  constructor(props) {
    super(props);
    this.state = {
      file: "",
    };
  }
  render() {
    return (
      <>
        <Dropzone
          onDrop={(acceptedFiles) => this.setState({ file: acceptedFiles })}
          multiple={false}
          maxSize={800000000}
        >
          {({ getRootProps, getInputProps }) => (
            <section>
              <Container>
                <div className="thumbnail" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <div className="h-center">
                    <Plus color="#ababab" size={90} />
                    <p style={{ color: "#ababab" }}>
                      Drop your video here, or click to select files
                    </p>
                  </div>
                </div>
                <aside style={{ width: "400px", margin: "auto!important" }}>
                  <p style={{ textAlign: "left" }}>
                    File name:{" "}
                    {this.state.file != "" && this.state.file[0].name}
                  </p>
                </aside>
              </Container>
            </section>
          )}
        </Dropzone>
      </>
    );
  }
}

export default DropVid;
