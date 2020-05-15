// import React from 'react';
// import { connect } from 'react-redux';
// import { Redirect } from 'react-router-dom';
// // import { login } from './store/authentication';
// import './Login.css';

// class Login extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             username: 'Alfredo',
//             password: 'password',
//         };
//         this.handleSubmit = this.handleSubmit.bind(this);
//     }

//     async handleSubmit(e) {
//         e.preventDefault();
//         this.props.login(this.state.email, this.state.password);
//     }

//     updateEmail = e => {
//         this.setState({ email: e.target.value });
//     }

//     updatePassword = e => {
//         this.setState({ password: e.target.value });
//     }

//     render() {
//         return (
//             <div className='sign-up-page'>
//                 <div className='phoneLogin'>
//                     <img className='cover' src='/images/phone-test.jpg' />'
//                 </div>
//                 <div className='sign-up-form'>
//                     <h1>Instagram</h1>
//                     <form className='sign-up-info'>
//                         <input className="info" type="text" name="email" placeholder='Email' /><br />
//                         <input className="info" type="text" name="username" placeholder='Username' /><br />
//                         <input className="info" type="password" name="password" autoComplete="off" placeholder='Password' required /><br />
//                         <input className="submit" type="submit" name="submit" value="Sign-Up" autoComplete="off" /><br />
//                         <div>
//                             <p>Already have an account?
//                               <a href="/Login">Login</a>
//                             </p>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         );
//     }
// }

// export default Login;