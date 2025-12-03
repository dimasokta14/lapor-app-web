import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, openLoginPage, logout, user } = useContext(AuthContext);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLoginClick = () => {
    openLoginPage();
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <h1>LaporGaruda!</h1>
          </div>

          <nav className={`nav ${menuOpen ? 'open' : ''}`}>
            <a href="#home">Beranda</a>
            <a href="#about">Tentang Kami</a>
            <a href="#tutorial">Tutorial Video</a>
            <a href="#contact">Hubungi Kami</a>
          </nav>

          <div className="header-actions">
            {isLoggedIn ? (
              <>
                <span className="user-name">{user?.name || 'Pengguna'}</span>
                <button className="btn btn-secondary" onClick={handleLogoutClick}>
                  Logout
                </button>
              </>
            ) : (
              <button className="btn btn-primary" onClick={handleLoginClick}>
                Login
              </button>
            )}
          </div>

          <button
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
