import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import authServiceInstance from '../utils/auth';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import logo from '../assets/react.svg';

const Header = () => {
  const navRef = useRef();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const handleLogout = () => {
    userLogout();
    window.location.href = '/';
  };

  const userLogout = () => {
    authServiceInstance.logout();
    window.location.reload();
  };

  return (
    <header className="header">
      <img src={logo} alt="thg logo filler" />
      <nav ref={navRef} className={`navbar ${isNavbarOpen ? 'display-navbar' : ''}`}>
        <ul className="navbar-list">
          <li><Link className="navbar-link" to="/" onClick={closeNavbar}>Home</Link></li>
          <li><Link className="navbar-link" to="/about" onClick={closeNavbar}>About Us</Link></li>
          <li><Link className="navbar-link" to="/why-thg" onClick={closeNavbar}>Why THG?</Link></li>
          <li><Link className="navbar-link" to="/gallery" onClick={closeNavbar}>Gallery</Link></li>
          <li><Link className="navbar-link" to="/contact" onClick={closeNavbar}>Contact Us</Link></li>

          {!authServiceInstance.loggedIn() && (
            <li><Link className="btn login-btn" to="/login" onClick={closeNavbar}>Login</Link></li>
          )}

          {authServiceInstance.loggedIn() && (
            <li><button className="btn login-btn" onClick={handleLogout}>Logout</button></li>
          )}
        </ul>
      </nav>
      <button className="btn menu-btn" onClick={toggleNavbar}>
        {isNavbarOpen ? <AiOutlineClose style={{ color: 'var(--gold)' }}/> : <AiOutlineMenu style={{ color: 'var(--gold)' }}/>}
      </button>
    </header>
  );
};

export default Header;