import React, { useState } from 'react'
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import axios from 'axios';
import {Redirect} from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'

function PaswordReset() {
  const [email, setEmail] = useState("")
  const [emailSent, setEmailSent] = useState(false);
  return (
      !emailSent ?
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as='h2' color='teal' textAlign='center'>
          Registration
      </Header>
        <Form size='large'>
          <Segment stacked>
            <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' type="email"
              value={email}
              onChange={
                (event) => {
                  setEmail(event.target.value)
                }
              }
            />
            <Button
              onClick={
                () => {
                  axios.post('http://127.0.0.1:5000/api/password_reset/', {
                    email: email,
                  })
                    .then(function (response) {
                      setEmailSent(true)
                      console.log(response)
                    })
                    .catch(function (error) {
                      setEmailSent(false)
                      console.log(error)
                    });
                }
              }
              color='teal' fluid size='large'>
              Send Email
          </Button>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid> :
    <Redirect to={{
        pathname: '/temp',
        state: { desc: 'Password reset instructions has been sent to your email' }
    }} />
  )
}
export default PaswordReset