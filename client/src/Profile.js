
import { Image, Card, Icon } from 'semantic-ui-react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AuthService from './service/auth-service'
import Like from './Like'
export default function Profile() {
    const [posts, setPosts] = useState([])

    const deletePost = (index, id) => {
        axios.delete(`http://127.0.0.1:5000/api/delete_post/`,{
            params: {
                id: id,
            },
            headers: {
                Authorization: `Bearer ${AuthService.getToken()}`
            }
        }).then(()=> {
            let temp = [...posts];
            temp.splice(index, 1);
            setPosts(temp);
        })
    }
    useEffect(() => {
        axios.get(`http://127.0.0.1:5000/api/get_user_posts/`,
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`
                }
            }).then(res => {
                setPosts(res.data.data)
            }).catch(err => console.log(err))
    }, [])



    return (
        <div>
            <center>
                {posts.length === 0 ?<p>You dont have any posts yet</p> :posts.map((post, index) => (
                    <Card key={index} style={{ width: "60%" }}>
                        <Card.Content>
                            <Card.Header style={{ textAlign: 'left' }}>{post.username}</Card.Header>
                            <Card.Meta style={{ textAlign: 'left' }}>
                                <span className='date'>Posted in {post.date}</span>
                            </Card.Meta>
                        </Card.Content>
                        <Image style={{ width: "100%" }} src={'http://127.0.0.1:5000/images/' + post.photo} ui={false} />
                        <Card.Content extra>
                            <div style={{}}>
                                <Like id={post.id} liked={post.liked} likes={post.likes} />
                                <Icon onClick={() => deletePost(index, post.id)} name="trash"/>
                            </div>
                        </Card.Content>
                    </Card>
                ))}
            </center>
                
        </div>
    )
}