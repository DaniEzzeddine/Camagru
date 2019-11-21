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
import Get_users from './Get_users';
import RegisterConfirm from './RegisterConfirm'
import authService from './service/auth-service';
import Home from './Home';



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
          <Route path="/get_users">
            <Get_users />
          </Route>
          <ProtectedRoute path="/" component={Home} />
          <Route exact path='/temp' component={TempWindow}/>
        </Switch>
    </Router>
    </div>
  );
}

export default App;
