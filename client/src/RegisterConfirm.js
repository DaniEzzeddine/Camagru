import React, { useState, useEffect } from 'react'
import { Button, Form, Grid, Header, Segment, Card } from 'semantic-ui-react'
import axios from 'axios';
import { Redirect, withRouter } from 'react-router-dom';
axios.defaults.xsrfCookieName = 'csrftoken'
axios.defaults.xsrfHeaderName = 'X-CSRFToken'




function RegisterConfirm(props) {
    const token = props.match.params.token;
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState("")
    useEffect(() => {
        function confirm(){
            axios.get(`http://127.0.0.1:5000/api/confirm_register/${token}`)
        .then((res) => setSuccess(true))
        .catch((err) => setErr(err.response.data))
    }
    confirm()
}, [])

return (
    success ? <Redirect to='/login' /> :
    <Grid textAlign='center' style={{ height: '100vh' }} verticalAlign='middle'>
        <Card><Card.Content>{err}</Card.Content></Card>
        <Grid.Column style={{ maxWidth: 450 }}>
        </Grid.Column>
    </Grid >
)
}
export default withRouter(RegisterConfirm)