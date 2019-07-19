import React, { Fragment, useEffect } from 'react';
// import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register.js';
import Login from './components/auth/Login.js';
import PrivateRoute from './components/routing/PrivateRoute.js';
//import CreateProfile from './components/profile-forms/CreateProfile.js';
import Navbar from './components/layout/Navbar';
//import EditProfil from './components/profile-forms/EditProfil';
//import AddExperience from './components/profile-forms/AddExperience';
//import AddEducation from './components/profile-forms/AddEducation';
//import Profiles from './components/profiles/Profiles';
import Alert from './components/layout/Alert.js';
import Dashboard from './components/dashboard/Dashboard';
//import Profile from './components/profile/Profile';
import Posts from './components/Posts/Posts';
import Post from './components/Post/Post';
import Feed from './components/Feed/Feed';

//redux
import {
  Provider
} from 'react-redux';
import store from './store/store';
import setAuthToken from './utils/setAuthToken';
import {
  loadUser
} from './store/actions/auth';

//check localstorage
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <PrivateRoute exact path='/dashboard' component={Dashboard} />
              <PrivateRoute exact path='/posts' component={Posts} />
              <PrivateRoute exact path='/posts/:id' component={Post} />
              <PrivateRoute exact path='/feed' component={Feed} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  )
}

export default App;
