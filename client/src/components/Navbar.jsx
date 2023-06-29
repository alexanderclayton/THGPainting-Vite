import React from 'react';
import { Link } from 'react-router-dom';
import authServiceInstance from '../utils/auth';

const Navbar = () => {
    const handleLogout = () => {
        userLogout();
        window.location.href = '/';
    };

    const userLogout = () => {
        authServiceInstance.logout();
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <li><Link className="navbar-link" to="/">Home</Link></li>
            <li><Link className="navbar-link" to="/about">About Us</Link></li>
            <li><Link className="navbar-link" to="/why-thg">Why THG?</Link></li>
            <li><Link className="navbar-link" to="/gallery">Gallery</Link></li>
            <li><Link className="navbar-link" to="/contact">Contact Us</Link></li>
            {authServiceInstance.loggedIn() || <li><Link className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" to="/login">Login</Link></li>}
            
            {authServiceInstance.loggedIn() && (
                <li><button className="h-10 px-5 m-2 text-red-100 transition-colors duration-150 bg-red-700 rounded-lg focus:shadow-outline hover:bg-red-800" onClick={handleLogout}>Logout</button></li>
            )}
        </nav>
    )
};

export default Navbar;
