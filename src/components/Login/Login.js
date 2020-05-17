import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { login } from '../../store/authentication';
import './Login.css';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: 'AppAcademy',
            password: 'password',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password);
    }

    updateUsername = e => {
        this.setState({ username: e.target.value });
    }

    updatePassword = e => {
        this.setState({ password: e.target.value });
    }

    render() {

        if (this.props.token) {
            return <Redirect to="/home" />;
        }

        return (
            <div className='sign-up-page'>
                <div className='phoneLogin'>
                    <img className='cover' src='/images/phone-test.jpg' />'
                </div>
                <div className='sign-up-form'>
                    <h1>Instagram</h1>
                    <form className='sign-up-info' onSubmit={this.handleSubmit} >
                        <input className="info" type="text" placeholder='Username' value={this.state.username} onChange={this.updateUsername} /><br />
                        <input className="info" type="password" autoComplete="off" placeholder='Password' required value={this.state.password} onChange={this.updatePassword} /><br />
                        <input className="submit" type="submit" value="Log-In" autoComplete="off" /><br />
                        <div>
                            <p>Need an account?
                              <a className='sign-up-connector' href="/register">SignUp</a>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        token: state.authentication.user,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password) => dispatch(login(username, password))
    };
};

// Yes, this looks funny, but you will often
// see this kind of indentation in others'
// code when using React and Redux.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Login
);