import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when navigating
  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">Credit Bureau</span>
          <span className="logo-accent">Aggregator</span>
        </Link>
        
        <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
          <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </div>
        </button>

        <ul className={`navbar-menu ${menuOpen ? 'show' : ''}`}>
          <li className="navbar-item">
            <Link to="/" className={`navbar-link ${location.pathname === '/' ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          
          {user ? (
            <>
              <li className="navbar-item">
                <Link to="/dashboard" className={`navbar-link ${location.pathname === '/dashboard' ? 'active' : ''}`}>
                  Dashboard
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/profile" className={`navbar-link ${location.pathname === '/profile' ? 'active' : ''}`}>
                  Profile
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/admin" className={`navbar-link ${location.pathname === '/admin' ? 'active' : ''}`}>
                  Admin
                </Link>
              </li>
              <li className="navbar-item">
                <button onClick={logout} className="btn btn-outline-light btn-sm">
                  Logout
                </button>
              </li>
              <li className="navbar-item user-greeting">
                <span className="user-icon">👤</span>
                <span className="user-name">Hi, {user?.name ? user.name.split(' ')[0] : 'User'}</span>
              </li>
            </>
          ) : (
            <>
              <li className="navbar-item">
                <Link to="/login" className="btn btn-outline-light btn-sm">
                  Login
                </Link>
              </li>
              <li className="navbar-item">
                <Link to="/register" className="btn btn-primary btn-sm">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar; 