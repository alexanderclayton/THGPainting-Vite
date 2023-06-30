import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import authServiceInstance from '../utils/auth';
import { AiOutlineMenu } from 'react-icons/ai'
import logo from '../assets/react.svg';

const Navbar = () => {
    const navRef = useRef();

    const displayNavbar = () => {
        navRef.current.classList.toggle("display-navbar")
    }

    const handleLogout = () => {
        userLogout();
        window.location.href = '/';
    };

    const userLogout = () => {
        authServiceInstance.logout();
        window.location.reload();
    };

    return (
        <div className="header">
            <img src={logo} alt="thg logo filler" />
            <nav ref={navRef} className="navbar">
                <ul className="navbar-list">
                    <li><Link className="navbar-link" to="/">Home</Link></li>
                    <li><Link className="navbar-link" to="/about">About Us</Link></li>
                    <li><Link className="navbar-link" to="/why-thg">Why THG?</Link></li>
                    <li><Link className="navbar-link" to="/gallery">Gallery</Link></li>
                    <li><Link className="navbar-link" to="/contact">Contact Us</Link></li>

                    {authServiceInstance.loggedIn() || <li><Link className="btn login-btn" to="/login">Login</Link></li>}

                    {authServiceInstance.loggedIn() && (
                        <li><button className="btn login-btn" onClick={handleLogout}>Logout</button></li>
                    )}
                </ul>
            </nav>
            <button className="menu-btn" onClick={displayNavbar}>
                <AiOutlineMenu />
            </button>
        </div>
    )
};

export default Navbar;
