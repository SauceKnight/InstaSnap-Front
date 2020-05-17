import React, { useEffect } from 'react';
import './Header.css';
import Upload from '../Upload/Upload'



const Header = () => {

    const displayForm = e => {
        e.preventDefault();
        const form = document.querySelector('.image_form');
        const back = document.querySelector('.all_posts');
        form.classList.remove('image_form');
        form.classList.add('form_display');
        back.classList.add('blur');

    }

    return (
        <>
            <nav className="InstaNavBar">
                <a href='/home'>
                    <p className='logo_font'> InstaSnap </p>
                </a>
                <div className='SearchBar'>
                    <input type='text' placeholder='Search for User...' />
                </div>
                <div className='InstaText'>
                    <a onClick={displayForm}>
                        <img className='upload_img' src='/images/upload-img.png' />
                    </a>
                </div>
            </nav>
            <Upload />
        </>
    );
}


export default Header;