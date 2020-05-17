import React from 'react';
import Main from './components/Main/Main.js';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile.js';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Upload from './components/Upload/Upload.js';
import { loadToken } from './store/authentication';


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     rest.needLogin === true
//       ? <Redirect to='/login' />
//       : <Component {...props} />
//   )} />
// )

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  // async componentDidMount() {
  //   this.setState({ loaded: true });
  //   this.props.loadToken();
  // }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={Login} />
          <Route exact path='/register' component={Register} />
          <Route exact path="/upload" component={Upload} />
          <Route exact path="/profile/:userName" component={UserProfile} />
          <Route exact path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
