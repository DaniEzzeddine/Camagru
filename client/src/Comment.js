import React, { useState, useEffect } from 'react'
import { Button, Comment, Form } from 'semantic-ui-react'
import Axios from 'axios'
import AuthService from './service/auth-service'
const CommentExampleReplyFormOuter = (props) => {
    const [comments, setComments] = useState([]);
    const [input, setInput] = useState('')
    useEffect(() => {
        setComments(props.comments)
    }, [props.comments])
    const post = () => {
        if (input.length === 0)
            return;
        else
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
                }).catch(err => {

                })
    }
    return (
        <Comment.Group size='large'>
            {comments.map((com, index) => (
                <Comment key={index} style={{ textAlign: 'left' }}>
                    <Comment.Content>
                        <Comment.Author>{com.name}</Comment.Author>
                        <Comment.Text>{com.content}</Comment.Text>
                    </Comment.Content>
                </Comment>
            ))}


            <Form reply>
                <Form.TextArea value={input} onChange={(e) => setInput(e.target.value)} />
                <Button disabled={input.length === 0 ? true : false} onClick={() => post()} content='Add Comment' labelPosition='left' icon='edit' primary />
            </Form>
        </Comment.Group>
    )
}
export default CommentExampleReplyFormOuter