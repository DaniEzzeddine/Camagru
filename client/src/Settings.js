import React, { useState, useEffect } from 'react'
import { Form, Button, Segment, Modal, Header, Message, Radio } from 'semantic-ui-react'
import axios from 'axios'
import AuthService from './service/auth-service'
const ResetPasswordModal = () => {

  const [password1, setPassword1] = useState('')
  const [err, setErr] = useState('')
  const [password2, setPassword2] = useState('')
  const [modalOpen, handleOpen] = useState(false)
  return (
    <div>
      <Modal
        closeIcon
        open={modalOpen}
        onClose={() => handleOpen(false)}
        closeOnDimmerClick={true}
        basic
        size="small"
        trigger={<Button onClick={() => handleOpen(true)}>Change Password</Button>}>
        <Modal.Header>Password change</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            <Header>Default Profile Image</Header>
            {err.length !== 0 ? <Message negative> <Message.Header>{err}</Message.Header></Message> : ''}
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
                      else
                        axios.post(`http://127.0.0.1:5000/api/setting_password_reset/`, {
                          password1: password1,
                          password2: password2,
                        },
                          {
                            headers: {
                              Authorization: `Bearer ${AuthService.getToken()}`
                            }
                          }).then(res => {
                            handleOpen(false)
                          }).catch(err => {
                            setErr(err.response.data)
                          })
                    }
                  }
                >
                  Send
                        </Button>
              </Segment>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}

const ResetEmailModal = () => {
  const [err, setErr] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [openModal, changeModalState] = useState(false)
  return (
    <div>
      <Modal
        closeIcon
        open={openModal}
        onClose={() => changeModalState(false)}
        closeOnDimmerClick={true}
        basic
        size="small"
        trigger={<Button onClick={() => changeModalState(true)}>Change Email</Button>}
      >
        <Modal.Header>Email change</Modal.Header>
        <Modal.Content image>
          <Modal.Description>
            {err.length !== 0 ? <Message negative> <Message.Header>{err}</Message.Header></Message> : ''}
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Email' type="email"
                  value={newEmail}
                  onChange={
                    (event) => {
                      setNewEmail(event.target.value)
                    }
                  }
                />
                <Button color='teal' fluid size='large'
                  onClick={
                    () => {
                      if (newEmail.length === 0)
                        setErr('email is empty')
                      else
                        axios.post(`http://127.0.0.1:5000/api/setting_email_change/`, {
                          new_email: newEmail
                        },
                          {
                            headers: {
                              Authorization: `Bearer ${AuthService.getToken()}`
                            }
                          }).then(res => {
                            changeModalState(false)
                            AuthService.saveToken(res.data.jwt_token);
                          }).catch(err => {
                            setErr(err.response.data)
                          })
                    }
                  }
                >
                  Send
                        </Button>
              </Segment>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}


const ResetUsernameModal = () => {
  const [err, setErr] = useState('')
  const [newUsername, setnewUsername] = useState('')
  const [openModal, changeModalState] = useState(false)
  return (
    <div>
      <Modal
        closeIcon
        open={openModal}
        onClose={() => changeModalState(false)}
        closeOnDimmerClick={true}
        basic
        size="small"
        trigger={<Button onClick={() => changeModalState(true)}>Change Username</Button>}
      >
        <Modal.Header>Username change</Modal.Header>
        <Modal.Content >
          <Modal.Description>
            {err.length !== 0 ? <Message negative> <Message.Header>{err}</Message.Header></Message> : ''}
            <Form size='large'>
              <Segment stacked>
                <Form.Input fluid icon='user' iconPosition='left' placeholder='Username' type="text"
                  value={newUsername}
                  onChange={
                    (event) => {
                      setnewUsername(event.target.value)
                    }
                  }
                />
                <Button color='teal' fluid size='large'
                  onClick={
                    () => {
                      if (newUsername.length === 0)
                        setErr('email is empty')
                      else
                        axios.post(`http://127.0.0.1:5000/api/setting_username_change/`, {
                          new_username: newUsername
                        },
                          {
                            headers: {
                              Authorization: `Bearer ${AuthService.getToken()}`
                            }
                          }).then(res => {
                            changeModalState(false)
                          }).catch(err => {
                            setErr(err.response.data)
                          })
                    }
                  }
                >
                  Send
                        </Button>
              </Segment>
            </Form>
          </Modal.Description>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default function Settings() {
  const [notify, setNotify] = useState(false)

  const changeNotifyStatus = () => {
    axios.get('http://127.0.0.1:5000/api/control_comment_notify', {
      headers: {
        Authorization: `Bearer ${AuthService.getToken()}`
      }
    }).then(res => {
      setNotify(!notify)
    }
    ).catch(err => console.log(err))
  }
  useEffect(() => {
    axios.get('http://127.0.0.1:5000/api/notify_status',{
      headers: {
        Authorization: `Bearer ${AuthService.getToken()}`
      }
    }
    ).then(res => {
      setNotify(res.data.notify)
    }).catch(err=> {
      console.log(err)
    })
  }, [])
  return (
    <div>
      <Segment vertical>
        <ResetPasswordModal />
      </Segment>
      <Segment vertical>
        <ResetEmailModal />
      </Segment>
      <Segment vertical>
        <ResetUsernameModal />
      </Segment>
      <Segment vertical>
      <Radio toggle
      checked={notify}
      onChange={changeNotifyStatus}
      /> Notification about new comments under photos
      </Segment>
    </div>
  )
}