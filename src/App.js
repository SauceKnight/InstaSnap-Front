import React from 'react';
import Main from './components/Main/Main.js';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
// import User from './components/User/User.js';
import UserProfile from './components/UserProfile/UserProfile.js';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Upload from './components/Upload/Upload.js';
import { loadToken } from './store/authentication';


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/profile/:userName" component={UserProfile} />
          <Route exact path="/home" component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
