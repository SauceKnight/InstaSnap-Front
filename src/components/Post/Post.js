import React from 'react';
import './Post.css';
import { connect } from 'react-redux';
import { getPosts } from '../../store/allposts';
import { Link } from 'react-router-dom';

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        }
    }

    componentDidMount() {
        this.props.getPosts();
    }

    handleCreated = (posts) => {
        this.props.handleCreated(posts)
    }

    updateComment = e => {
        this.setState({ comment: e.target.value });

    }

    addComment = e => {
        e.preventDefault();

    }

    render() {

        if (!this.props.posts) {
            return null;
        }
        console.log(this.props.posts);
        return (
            <div className='all_posts'>
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
                                <p> {`${post.User.userName}: ${post.caption}`}</p>
                                <form className='comment_form'>
                                    <input type='text' placeholder='Add a comment' onChange={this.updateComment} onSubmit={this.addComment} />
                                </form>
                            </div>
                        </div>
                    );
                })}
            </div>

        );
    }
}

const mapStateToProps = state => {
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