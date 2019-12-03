import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function PasswordResetConfirm(props) {
    const token = props.match.params.token;
    const [password1, setPassword1] = useState("")
    const [password2, setPassword2] = useState("")
    const [err, setErr] = useState('')
    const [success, setSuccess] = useState(false)
    return (
        <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
            {success ? <Redirect to='/login' /> : ''}
            <Grid.Column style={{ maxWidth: 450 }}>
      {err.length !== 0 ? <Message negative> <Message.Header>{err}</Message.Header></Message>: ''}
                <Header as='h2' color='teal' textAlign='center'>
                    Set a new password
                </Header>
                <Form size='large'>
                    <Segment stacked>
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Password' type="password"
                            value={password1}
                            onChange={
                                (event) => {
                                    setPassword1(event.target.value)
                                }
                            }
                        />
                        <Form.Input fluid icon='user' iconPosition='left' placeholder='Confirm password' type="password"
                            value={password2}
                            onChange={
                                (event) => {
                                    setPassword2(event.target.value)
                                }
                            }
                        />
                        <Button color='teal' fluid size='large'
                            onClick={
                                () => {
                                    if (password1.length === 0)
                                        setErr('password1 is empty')
                                    else if (password2.length === 0)
                                        setErr('password2 is empty')
                                    else if (token.length === 0)
                                        setErr('token is invalid')
                                    else
                                        axios.post(`http://localhost:5000/api/reset_password_confirm`, {
                                            token: token,
                                            password1: password1,
                                            password2: password2
                                        })
                                            .then((res) => setSuccess(true))
                                            .catch((err) => setErr(err.response.data))
                                }
                            }
                            >
                            Send
                        </Button>
                    </Segment>
                </Form>
            </Grid.Column>
        </Grid >
    )
}
export default withRouter(PasswordResetConfirm)