import React, { useEffect } from 'react';
import './UserProfile.css';
import { connect } from 'react-redux';
import { getProfilePosts } from '../../store/userProfile';
import { getUser } from '../../store/user';
import { Link } from 'react-router-dom';
import Header from '../Header/Header.js'

const UserProfile = (props) => {

    useEffect(() => {
        props.getProfilePosts(props.match.params.userName);
        props.getUser(props.match.params.userName);

    }, [props.match.params.userName])


    const handleCreated = (posts) => {
        props.handleCreated(posts)
    }

    if (!props.userProfile) {
        return null;
    }
    if (!props.user) {
        return null;
    }
    return (
        <div>
            <Header props={props} />
            <div className='user_profile'>
                {console.log(props)}
                <img src={props.user.profilePic} className='profile_pic' />
            </div>
            {props.userProfile.map(post => {
                return (
                    <div className='Post' key={post.id}>
                        <header className='UserPost'>
                            <div className='UserPostProfileImg'>
                                <img src='https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_960_720.jpg' width='30px' height='30px' />
                            </div>
                            <div className='UserPostName'>
                                <Link to={`/profile/${props.match.params.userName}`}> {props.match.params.userName}</Link>
                            </div>
                        </header>
                        <div className='PostImg'>
                            <img src={post.image} />
                        </div>
                        <div className='PostComments'>
                            <p> {post.caption}</p>
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