import React, {forwardRef, useState, useEffect, useRef, useImperativeHandle} from 'react';

const styles = {
    base: {
      width: '100%',
      height: '100%'
    }
  };
const Camera = forwardRef((props, ref)=> {
    let video = useRef(null)
    const [mainMediaStream, setMediaStream] = useState(null)
    useEffect(() => {
        if (video) {
            if (navigator.mediaDevices) {
                navigator.mediaDevices.getUserMedia({video: true, audio: false})
                .then((mediaStream) => {
                    setMediaStream(mediaStream)
                    video.current.srcObject = mediaStream;
                    video.current.play()
                }).catch(err => console.log(err))
            }
        }
    }, [video])
    useImperativeHandle(ref, () => ({
        capture(){
            const mediaStreamTrack = mainMediaStream.getVideoTracks()[0];
            const imageCapture = new window.ImageCapture(mediaStreamTrack);
        
            return imageCapture.takePhoto();
          }
    }))
      return (
        <div style={props.style}>
          { props.children }
          <video style={styles.base} ref={video} />
        </div>
      );
}
)

export default Camera;