import React, { useEffect } from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';
import { getProfilePosts } from '../../store/userProfile';
import { getUser } from '../../store/user';
import { Link } from 'react-router-dom';
import Header from '../Header/Header.js'
import UpdateProfile from '../UpdateProfile/UpdateProfile'

const UserProfile = (props) => {

    useEffect(() => {
        props.getProfilePosts(props.match.params.userName);
        props.getUser(props.match.params.userName);

    }, [props.match.params.userName])


    const handleCreated = (posts) => {
        props.handleCreated(posts)
    }

    const updateProfile = (e) => {
        e.preventDefault();
        const form = document.querySelector('#profile_form');
        const userProf = document.querySelector('.user_profile');
        const posts = document.querySelectorAll('.Post');
        form.classList.toggle('profile_form');
        form.classList.toggle('form_display');
        userProf.classList.toggle('blur');
        posts.forEach(post => {
            return post.classList.toggle('blur');
        })
    }



    if (!props.userProfile) {
        return null;
    }
    if (!props.user) {
        return null;
    }

    let button;

    if (props.match.params.userName === window.localStorage.getItem('userName')) {
        button = <button className='profile_button' onClick={updateProfile}>Update Profile</button>;
    }

    return (
        <div>
            <UpdateProfile />
            <Header />
            <div className='user_profile'>
                <div className='user_info'>
                    <img src={props.user.profilePic} className='profile_pic' />
                    <p>{props.user.userName}</p>
                </div>
                {button}
            </div>
            {props.userProfile.map(post => {
                return (
                    <div className='Post' key={post.id}>
                        <header className='UserPost'>
                            <div className='UserPostProfileImg'>
                                <img src={props.user.profilePic} className='user_profile_postpic' />
                            </div>
                            <div className='UserPostName'>
                                <Link to={`/profile/${props.match.params.userName}`}> {props.match.params.userName}</Link>
                            </div>
                        </header>
                        <div className='PostImg'>
                            <img src={post.image} />
                        </div>
                        <div className='PostComments'>
                            <p> {props.user.userName}: {post.caption}</p>
                            <form className='comment_form'>
                                <input type='text' placeholder='Add a comment' />
                            </form>
                        </div>
                    </div>
                );
            })}
        </div>

    );
}


const mapStateToProps = state => {
    return {
        userProfile: state.userprofile.list,
        user: state.user.list

    };
}

const mapDispatchToProps = dispatch => {
    return {
        getProfilePosts: (user) => dispatch(getProfilePosts(user)),
        getUser: (user) => dispatch(getUser(user)),

    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    UserProfile
);