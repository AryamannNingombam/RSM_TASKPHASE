import React from 'react';
import './App.css';
import {Switch,Route,Redirect,BrowserRouter} from 'react-router-dom';
import { LandingPage } from './pages/landing/LandingPage';
import { LoginPage } from './pages/login/LoginPage';
import { SignUpPage } from './pages/signup/SignUpPage';
import { HomePage } from './pages/homepage/HomePage';
import {store} from './app/store';
import {useSelector} from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

function App()
{
  const isLoggedIn = useSelector(state=>state.auth.isLoggedIn);

  return (
      <BrowserRouter>
            <Switch>
                <Route exact path="/" component={LandingPage}/>
                <Route exact path="/log-in" component={LoginPage}/>
                <Route exact path="/sign-up" component={SignUpPage}/>
                <Route exact path="/home" component={HomePage}/>
                
                <Redirect to="/"/>


            </Switch>


      </BrowserRouter>
  );
}

export default App;
