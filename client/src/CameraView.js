import React, { useState, useRef } from 'react';
import Camera from './Camera';
import axios from 'axios';
import { Button, Segment, Image, Input } from 'semantic-ui-react';
import AuthService from './service/auth-service'
import './App.css';
import Draggable from 'react-draggable';

function CameraView() {
    const ref = useRef(null)
    const [stickersOnPhoto, addNewSticker] = useState([])
    const stickersName = [
        'battery.png',
        'gesture.png',
        'oops.png',
        'glitch_x.png'
    ]
    let camera = useRef(null);
    const handleDrag = (index, e, ui) => {
        let sticks = [...stickersOnPhoto];
        document.addEventListener("keydown", function(event) {
            if (event.keyCode === 8){
                sticks.splice(index, 1);
                addNewSticker(sticks);
                return ;
            }
        });
        addNewSticker(sticks);
    }
    const handleStop = (index, e, position) => {
        let sticks = [...stickersOnPhoto];
        sticks[index].x = Math.round(position.x);
        sticks[index].y = Math.round(position.y);
        addNewSticker(sticks);
    }
    const [file, setFile] = useState(null)
    const uploadPicture = (e) => {
        setFile(e.target.files[0])
    }
    const takePicture = () => {
        camera.current.capture()
            .then(blob => {
                setFile(blob)
            })
    }
    const postPhoto = () => {
        var data = new FormData();
        data.append('file', file, 'new_photo.png');
        data.append('sticker_data', JSON.stringify(stickersOnPhoto));
            axios.post('http://127.0.0.1:5000/api/post_image/', data,
                {
                    headers: {
                        'Content-Type': "multipart/form-data",
                        Authorization: `Bearer ${AuthService.getToken()}`
                    }
                }).then().catch(err => console.log(err))
            setFile(null)
            addNewSticker([]);
    }
    let url = file && URL.createObjectURL(file)
    return (
        <div className="row">
            <div className="col">
                <center>
                    {!url ?
                        <div><Camera
                            style={style.preview}
                            ref={camera}
                        >
                            <div style={style.captureContainer} onClick={() => takePicture()}>
                                <div style={style.captureButton} />
                            </div>
                        </Camera>
                        <Input type='file' accept="image/png, image/jpeg" onChange={(e)=> uploadPicture(e)}/>
                        </div>
                        :
                        <div style={style.takenPhoto}>
                            <div style={{position: 'relative' }} ref={ref}>
                                {stickersOnPhoto.length !== 0 ? stickersOnPhoto.map((sticker, index) => (
                                    <Draggable
                                        key={index}
                                        axis='both'
                                        bounds='parent'
                                        onDrag={(e, ui) => handleDrag(index, e, ui)}
                                        position={{ x: sticker.x, y: sticker.y }}
                                        onStop={(e, position) => handleStop(index, e, position)}
                                    >
                                        <Image style={{width: '30%', position: 'absolute' }} src={'http://127.0.0.1:5000/stickers/' + stickersName[sticker.index]} ui={false} />
                                    </Draggable>
                                )) : ''}
                                <Image style={{width:"100%"}} src={url} alt='new_photo_post' ui={false} />
                            </div>
                            <Segment>
                                {stickersName.map((stick, index) => (
                                    <Image key={index} style={{ width: "25%" }} onClick={() => {
                                        addNewSticker([...stickersOnPhoto, { index: index, x: 0, y: 0, name: stickersName[index]}])
                                    }} src={'http://127.0.0.1:5000/stickers/' + stick} ui={false} />
                                ))}
                            </Segment>
                            <Button onClick={() => setFile(null) || addNewSticker([])}>Retake</Button>
                            <Button onClick={() => postPhoto()}>Post</Button>
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

