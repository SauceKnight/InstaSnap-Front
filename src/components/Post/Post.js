import React from 'react';
import './Post.css';
import { connect } from 'react-redux';
import { getPosts } from '../../store/allposts';

class Post extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPosts();
    }

    handleCreated = (posts) => {
        this.props.handleCreated(posts)
    }

    render() {
        if (!this.props.posts) {
            return null;
        }

        return (
            <div>
                {this.props.posts.map(post => {
                    return (
                        <div className='Post'>
                            <header className='UserPost'>
                                <div className='UserPostProfileImg'>
                                    <img src='https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_960_720.jpg' width='30px' height='30px' />
                                </div>
                                <div className='UserPostName'> {post.User.userName}</div>
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