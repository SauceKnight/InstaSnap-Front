import React from 'react';
import './Header.css';

class Header extends React.Component {

    render() {
        return (
            <nav className="InstaNavBar">
                <img src='../images/instagram-logo.png' alt='logo' />
                <div className='InstaText'>
                    <a href='/'>Instagram</a>
                </div>
                <div className='SearchBar'>
                    <input type='text' placeholder='Search for User...' />
                </div>
            </nav>
        );
    }
}

export default Header;