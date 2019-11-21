import React from 'react'
import { Message } from 'semantic-ui-react'

const MessageError = (props) => (
  <Message negative style={{height:'auto'}}>
    <Message.Header>{props.desc}</Message.Header>
    <p>{props.reason}</p>
  </Message>
)

export default MessageError