import React, { useState } from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import Axios from 'axios'
import AuthService from './service/auth-service'
const CommentExampleReplyFormOuter = (props) => {
    console.log(props.comments);
    
    const [comments, setComments] = useState(props.comments);
    console.log(comments);
    const [input, setInput] = useState('')
    const post = () => {
        Axios.post(`http://127.0.0.1:5000/api/post_comment/`, {
            content: input,
            post_id: props.post_id
        },
            {
                headers: {
                    Authorization: `Bearer ${AuthService.getToken()}`
                }
            }).then(res => {
                comments.push(res.data.data)
                setInput('')
            }
                )
    }
    return (
        <Comment.Group>
            {comments.map((com) => (
                <Comment>
                    <Comment.Content>
                        <Comment.Author>{com.name}</Comment.Author>
                        <Comment.Text>{com.content}</Comment.Text>
                    </Comment.Content>
                </Comment>
            ))}


            <Form reply>
                <Form.TextArea value={input} onChange={(e) => setInput(e.target.value)} />
                <Button onClick={() => post()} content='Add Comment' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    )
}
export default CommentExampleReplyFormOuter