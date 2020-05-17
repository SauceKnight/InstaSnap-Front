import React, { useEffect } from 'react';
import './Header.css';
import { connect } from 'react-redux';
import { getUser } from '../../store/user';

const Header = () => {

    return (

        <nav className="InstaNavBar">
            <p className='logo_font'> InstaSnap </p>
            <div className='SearchBar'>
                <input type='text' placeholder='Search for User...' />
            </div>
            <div className='InstaText'>
                <a href='/upload'>
                    <img className='upload_img' src='./images/upload-img.png' />
                </a>
                <a href='/upload'>
                </a>
            </div>
        </nav>
    );
}


export default Header;