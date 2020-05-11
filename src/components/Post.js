import React from 'react';
import './Post.css';
import Test from '../images/test.jpg';

class Post extends React.Component {

    render() {
        return (
            <div className='Post'>
                <header className='UserPost'>
                    <div className='UserPostProfileImg'>
                        <img src='https://cdn.pixabay.com/photo/2016/08/09/17/52/instagram-1581266_960_720.jpg' width='30px' height='30px' />
                    </div>
                    <div className='UserPostName'> Test</div>
                </header>
                <div className='PostImg'>
                    <img src='/images/test.jpg' />
                </div>
                <div className='PostComments'>
                    <p> Test Comments</p>
                </div>
            </div>
        );
    }
}

export default Post;