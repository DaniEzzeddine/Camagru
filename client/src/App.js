import React, {useEffect, useState} from 'react';
import './App.css';
import LoginForm from './Login'
import TempWindow from './TempWindow'
import RegisterForm from './Register'
import CameraView from './CameraView'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import { ProtectedRoute, LoginRoute } from './ProtectedRoute';
import PasswordReset from './PasswordReset'
import Header from './Header';
import PasswordResetConfirm from './PasswordResetConfirm';
import RegisterConfirm from './RegisterConfirm'
import authService from './service/auth-service';
import Home from './Home';
import Settings from './Settings';
import Profile from './Profile'

function App() {
  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    setIsAuth(authService.isAuthenticated())
  }, [])
  return (
    <div className="App">
      <Router>
        {isAuth? <Header changeAuthState={setIsAuth} />: ''}
        <Switch>
        <Route path="/register">
            <RegisterForm />
        </Route>
        <Route path="/password_confirm/:token">
            <RegisterConfirm />
        </Route>
          <Route path="/password_reset">
            <PasswordReset />
          </Route>
        <Route path='/reset/:token'>
            <PasswordResetConfirm />
        </Route>
          <LoginRoute path="/login" component={LoginForm} changeAuthState={setIsAuth}/>
          <ProtectedRoute path="/camera" component={CameraView} />
          <ProtectedRoute path="/settings" component={Settings} />
          <ProtectedRoute path="/profile" component={Profile} />
          <Route exact path='/temp' component={TempWindow}/>
          <ProtectedRoute path="/" component={Home} />
        </Switch>
    </Router>
    </div>
  );
}

export default App;
