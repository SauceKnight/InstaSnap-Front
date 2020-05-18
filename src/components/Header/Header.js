import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Header.css';
import Upload from '../Upload/Upload'
import Logout from '../Logout/Logout';



const Header = () => {

    const displayForm = e => {
        e.preventDefault();
        const form = document.querySelector('#image_form');
        const back = document.querySelector('.all_posts');
        const userProf = document.querySelector('.user_profile');
        const posts = document.querySelectorAll('.Post');
        if (form && back) {
            form.classList.toggle('image_form');
            form.classList.toggle('form_display');
            back.classList.toggle('blur');
        }
        else {
            form.classList.toggle('image_form');
            form.classList.toggle('form_display');
            userProf.classList.toggle('blur');
            posts.forEach(post => {
                return post.classList.toggle('blur');
            })
        }

    }

    return (
        <>
            <nav className="InstaNavBar">
                <a href='/home'>
                    <p className='logo_font'> InstaSnap </p>
                </a>
                <div className='search_bar'>
                    <input type='text' placeholder='Search for User...' />
                </div>
                <div className='InstaText'>
                    <a onClick={displayForm}>
                        <img className='upload_img' src='/images/upload-img.png' />
                    </a>
                    <Logout />
                </div>
            </nav>
            <Upload />
        </>
    );
}


export default Header;