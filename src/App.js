import React from 'react';
import Main from './components/Main/Main.js';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import UserProfile from './components/UserProfile/UserProfile.js';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Upload from './components/Upload/Upload.js';
import { loadToken } from './store/authentication';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    rest.needLogin === true
      ? <Redirect to='/' />
      : <Component {...props} />
  )} />
)

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    };
  }

  async componentDidMount() {
    this.setState({ loaded: true });
    this.props.loadToken();
  }

  render() {

    if (!this.state.loaded) {
      return null;
    }
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route exact path='/register' component={Register} />
          {/* <PrivateRoute exact path="/upload" component={Upload} /> */}
          <Route exact path="/profile/:userName" component={UserProfile} />
          <PrivateRoute path="/home" exact={true} needLogin={this.props.needLogin} component={Main} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    needLogin: !state.authentication.token,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadToken: () => dispatch(loadToken()),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  App
);
