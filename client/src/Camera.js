import React, { setState } from 'react';
import Camera from 'react-camera';
import axios from 'axios';
import { Button } from 'semantic-ui-react';
import './App.css';

function CameraView() {
  const [file, setFile] = setState(null)
  const takePicture = () => {
    this.camera.capture()
      .then(blob => {
        var data = new FormData();
        setFile(blob)
        data.set('file', blob, "test_image1.png");
        // .then(res => {
        //   console.log(res);
        //   console.log(res.data);
        // })
      })
  }
  let url = file && URL.createObjectURL(file)
  return (
    <div className="row">
      <div className="col">
        <center>
          {!url ?
            <Camera
              style={style.preview}
              ref={(cam) => {
                this.camera = cam;
              }}
            >
              <div style={style.captureContainer} onClick={() => takePicture()}>
                <div style={style.captureButton} />
              </div>
            </Camera> :
            <div style={style.takenPhoto}>
              <img src={url} />
              <Button onClick={() => setFile(null)}>qweqewqwe</Button>
            </div>
          }
        </center>
      </div>
    </div>
  );
}
const style = {
  takenPhoto: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: "100%",
    height: "100%"
  },
  preview: {
    position: 'relative',
    width: "75%"
  },
  captureContainer: {
    display: 'flex',
    position: 'absolute',
    justifyContent: 'center',
    margin: 'auto',
    zIndex: 1,
    bottom: 0,
    width: '100%'
  },
  captureButton: {
    backgroundColor: '#fff',
    borderRadius: '50%',
    height: 56,
    width: 56,
    color: '#000',
    margin: 20
  },
  captureImage: {
    width: '100%',
  }
}

export default CameraView;

