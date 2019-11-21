import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function RegisterForm() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  return (
    !emailSent ?
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Registration
      </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='Your name' type="text"
              value={username}
              onChange={
                (event) => {
                  setUsername(event.target.value)
                }
              } />
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' type="email"
              value={email}
              onChange={
                (event) => {
                  setEmail(event.target.value)
                }
              }
            />
            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
              value={password}
              onChange={
                (event) => {
                  setPassword(event.target.value)
                }
              }

            />
            <Form.Input fluid icon='lock' iconPosition='left' placeholder='Password' type='password'
              value={password2}
              onChange={
                (event) => {
                  setPassword2(event.target.value)
                }
              }
            />
            <Button
              onClick={
                () => {
                  axios.post('http://127.0.0.1:5000/api/auth/register', {
                    username: username,
                    password1: password,
                    password2: password2,
                    email: email,
                  })
                    .then(function (response) {
                      setEmailSent(true)
                    })
                    .catch(function (error) {
                      setEmailSent(false)
                    });
                }
              }
              color='teal' fluid size='large'>
              Login
          </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid> :
    <Redirect to={{
      pathname: '/temp',
      state: { desc: 'Confiration letter has been sent on your email' }
  }} />
  )
}
export default RegisterForm