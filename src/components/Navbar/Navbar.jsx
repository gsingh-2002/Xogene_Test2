import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ pageName }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(prev => !prev);
    };

    return (
        <div className='nav-wrapper'>
            <div className='navbar'>
                <p className='logo'>Xogene</p>
                <p className='pgName'>{pageName}</p>
                <button className='hamburger' onClick={toggleMenu}>
                    &#9776;
                </button>
                <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
                    <Link to="/" className='nav-link'>Home</Link>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
