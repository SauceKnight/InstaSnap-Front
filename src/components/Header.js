import React from 'react';
import './Header.css';

class Header extends React.Component {

    render() {
        return (
            <nav className="InstaNavBar">
                <img src='../images/instagram-logo.png' alt='logo' />
                <div className='SearchBar'>
                    <input type='text' placeholder='Search for User...' />
                </div>
                <div className='InstaText'>
                    <a href='/upload'>Upload a Pic</a>
                </div>
            </nav>
        );
    }
}

export default Header;