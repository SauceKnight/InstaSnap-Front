import React from 'react';
import Header from './components/Header.js';
import Post from './components/Post/Post.js';
import Login from './components/Login/Login';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Upload from './components/Upload/Upload.js';


// const PrivateRoute = ({ component: Component, ...rest }) => (
//   <Route {...rest} render={(props) => (
//     rest.needLogin === true
//       ? <Redirect to='/login' />
//       : <Component {...props} />
//   )} />
// )

function App() {
  return (
    <Switch>
      {/* <Route exact path='/login' component={Login} />
      <Route exact path='/' component={Header} />
      <Route exact path='/upload' component={Upload} /> */}
      {/* <Post /> */}
      <h1> Test</h1>
    </Switch>
  );
}

export default App;
