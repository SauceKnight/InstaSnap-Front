import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { register } from '../../store/authentication';
import './Register.css';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(e) {
        e.preventDefault();
        this.props.register(this.state.username, this.state.password, this.state.email);
    }

    updateUsername = e => {
        this.setState({ username: e.target.value });
    }

    updateEmail = e => {
        this.setState({ email: e.target.value });
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
                        <input className="info" type="text" placeholder='Email' value={this.state.email} onChange={this.updateEmail} /><br />
                        <input className="info" type="text" placeholder='Username' value={this.state.username} onChange={this.updateUsername} /><br />
                        <input className="info" type="password" autoComplete="off" placeholder='Password' required value={this.state.password} onChange={this.updatePassword} /><br />
                        <input className="submit" type="submit" value="Register" autoComplete="off" /><br />
                        <div>
                            <p>Already have an account?
                              <a className='sign-up-connector' href="/">Login</a>
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
        register: (email, password, username) => dispatch(register(email, password, username))
    };
};

// Yes, this looks funny, but you will often
// see this kind of indentation in others'
// code when using React and Redux.
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(
    Register
);