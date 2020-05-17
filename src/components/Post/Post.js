import React from 'react';
import './Post.css';
import { connect } from 'react-redux';
import { getPosts } from '../../store/allposts';
import { Link } from 'react-router-dom';

class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        debugger;
        this.props.getPosts();
    }

    handleCreated = (posts) => {
        this.props.handleCreated(posts)
    }

    render() {

        if (!this.props.posts) {
            return null;
        }
        console.log(this.props.posts);
        return (
            <div>
                {this.props.posts.map(post => {
                    return (
                        <div className='Post' key={post.id}>
                            <header className='UserPost'>
                                <div className='UserPostProfileImg'>
                                    <img src={post.User.profilePic} width='30px' height='30px' />
                                </div>
                                <div className='UserPostName'>
                                    <Link to={`/profile/${post.User.userName}`}> {post.User.userName}</Link>
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
}

const mapStateToProps = state => {
    debugger;
    return {
        posts: state.posts.list,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        getPosts: () => dispatch(getPosts()),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(
    Post
);