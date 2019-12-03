import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import authService from './service/auth-service';
import LoginForm from './Login'
export function ProtectedRoute(props){
    const { component: Component, ...rest } = props;

    return (
        <Route { ...rest } render={(props) => authService.isAuthenticated() ? <Component {...props} {...rest}/> : <Redirect to={{pathname: '/login'}}/>}/>
    )
}

export function LoginRoute(props){
    const { component: Component, ...rest } = props;

    return (
        <Route { ...rest } render={(props) => authService.isAuthenticated() ? <Redirect to={{pathname: '/home'}}/> : <LoginForm {...props} {...rest}/> }/>
    )
}