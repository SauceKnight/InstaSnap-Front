import React, { useEffect } from 'react';
// import './Post.css';
import { connect } from 'react-redux';
import { getProfilePosts } from '../../store/userProfile';
import { Link } from 'react-router-dom';

const UserProfile = (props) => {

    // constructor(props) {
    //     super(props);
    //     // this.pathname = this.props.location.pathname.split('/');
    //     // this.user = this.pathname[this.pathname.length - 1];

    // }

    // componentDidMount() {
    //     debugger;
    //     this.props.getProfilePosts(this.props.match.params.userName);
    // }

    // async componentWillUnmount() {
    //     await this.props.clearPosts();
    //     debugger;
    // }

    useEffect(() => {
        props.getProfilePosts(props.match.params.userName);
        debugger;
        return () => {
            debugger;
            props.clearPosts()
        }
    }, [props.match.params.userName])

    useEffect(() => {
        return () => {
            debugger;
            props.clearPosts()
        }
    }, [])

    const handleCreated = (posts) => {
        props.handleCreated(posts)
    }

    if (!props.userProfile) {
        return null;
    }
    return (
        <div>
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
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getProfilePosts: (user) => dispatch(getProfilePosts(user)),
        clearPosts: async () => {

            const result = dispatch({ type: "CLEAR_POSTS" })
            console.log(result);
            debugger;
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    UserProfile
);