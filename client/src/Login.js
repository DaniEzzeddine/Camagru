import React, {useState} from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react';
import { Redirect, Link } from 'react-router-dom';
import axios from 'axios';
import AuthService from './service/auth-service';
function LoginForm(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [success, setSuccess] = useState(false);
  return(
    success ? <Redirect to='/' /> : 
  <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
    <Grid.Column style={{ maxWidth: 450 }}>
      <Header as='h2' color='teal' textAlign='center'>
      Log-in to your account
      </Header>
      <Form size='large'>
        <Segment stacked>
        <Form.Input
          onChange={(event) => setUsername(event.target.value)}
          value={username} 
          fluid
          icon='user'
          iconPosition='left'
          placeholder='Username' />
          <Form.Input
          onChange={(event) => setEmail(event.target.value)}
          value={email} 
          fluid
          icon='user'
          iconPosition='left'
          placeholder='E-mail address' />
          <Form.Input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            fluid
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
          />

          <Button
          onClick={
            () => {
              axios.post('http://127.0.0.1:5000/api/login/', {
                email: email,
                password: password,
              })
              .then(function (response) {
                AuthService.saveToken(response.data.jwt_token);
                props.changeAuthState(true)
                setSuccess(true);
              })
              .catch(function (error) {
                console.log(error);
              });
            }
          }
          color='teal'
          fluid
          size='large'
          >
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/register'>Sign Up</a>
        <br />
        <Link to="/password_reset">Forgot Password ?</Link>
      </Message>
    </Grid.Column>
  </Grid>
)
  }
export default LoginForm