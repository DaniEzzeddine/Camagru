
import { Image, Card, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from './service/auth-service'
import Comment from "./Comment";
export default function Home() {
    const [posts, setPosts] = useState([])
    useEffect(() => {
        axios.get('http://127.0.0.1:5000/api/get_posts/',
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`
                }
            }).then(res => {
                setPosts(res.data.data)
                console.log(res.data.data)
            }).catch(err => console.log(err))
    }, [])
    return (
        <div>
            <center>
            {posts.map((post) => (
                <Card style={{width: "60%"}}>
                    <Image style={{ width: "100%" }} src={'http://127.0.0.1:5000/images/' + post.photo} ui={false} />
                    <Card.Content>
                        <Card.Header>{post.username}</Card.Header>
                        <Card.Meta>
                            <span className='date'>Posted in {post.date}</span>
                        </Card.Meta>
                    </Card.Content>
                    <Card.Content extra>
                        <div>
                            <Icon name='like' />
                            {post.likes}
                        </div>
                    </Card.Content>
                    <Card.Content extra>
                        <Comment comments={post.comments} post_id={post.id}></Comment>
                        </Card.Content>
                </Card>
            ))}
            </center>
        </div>
    )
}