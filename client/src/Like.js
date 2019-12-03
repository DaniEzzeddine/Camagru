import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Icon, Button } from 'semantic-ui-react';
import AuthService from './service/auth-service'

export default function Like(props) {
    const [likes, setLikes] = useState(0)
    const [liked, setLiked] = useState(0)
    useEffect(() => {
        setLikes(props.likes)
    }, [props.likes])
    useEffect(() => {
        setLiked(props.liked)
    }, [props.liked])
    const likePost = (post_id) => {
        axios.get(`http://127.0.0.1:5000/api/like_post/${post_id}`, 
        {
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`
            }
        }).then(res => {
            setLikes(liked ? likes - 1 : likes + 1)
            setLiked(!liked)
        }).catch(err => console.log(err))
    }
    return (
        <div>
            {liked ?
                <Button onClick={() => likePost(props.id)} ><Icon color='red' name='like' />{likes}</Button> :
                <Button onClick={() => likePost(props.id)} ><Icon name='like' />{likes}</Button>
            }
        </div>
    )
}
