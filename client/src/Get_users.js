import React from 'react';
import axios from 'axios'
import AuthService from './service/auth-service';

export default function Get_Users() {
    axios.post('http://127.0.0.1:5000/api/post_image/', {}, {headers: {
        Authorization: `Bearer ${AuthService.getToken()}`
    }}
    ).then((res) => {
        console.log(res)
    })
    return (<div></div>)
}