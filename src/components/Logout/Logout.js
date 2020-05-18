import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout } from '../../store/authentication';

const LogoutButton = props =>
    props.loggedOut ?
        <Redirect to="/" /> :
        <div id="logout-button-holder">
            <button onClick={props.logout}>Logout</button>
        </div>
    ;


const mapStateToProps = state => {
    return {
        loggedOut: !state.authentication.token,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout()),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    LogoutButton
);