import React, { useState, useEffect, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { isLoggedIn, openLoginPage, logout, user } = useContext(AuthContext);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [menuOpen]);

  const handleLoginClick = () => {
    openLoginPage();
    setMenuOpen(false);
  };

  const handleLogoutClick = () => {
    logout();
    setMenuOpen(false);
  };

  return (
    <>
      <header className={`header ${scrolled ? 'scrolled' : ''}`}>
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <Link to="/" onClick={() => setMenuOpen(false)}>
                <h1>Lapor Gerindra</h1>
              </Link>
            </div>

            <nav className={`nav ${menuOpen ? 'open' : ''}`}>
              <Link
                to="/"
                className={location.pathname === '/' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Beranda
              </Link>
              <Link
                to="/jelajah"
                className={location.pathname === '/jelajah' ? 'active' : ''}
                onClick={() => setMenuOpen(false)}
              >
                Jelajah Aduan
              </Link>

              {/* Mobile only auth actions */}
              <div className="nav-mobile-actions">
                {isLoggedIn ? (
                  <>
                    <div className="nav-user-info">
                      <span className="nav-user-name">{user?.name || 'Pengguna'}</span>
                    </div>
                    <Link to="/profile" className="nav-btn nav-btn-profile" onClick={() => setMenuOpen(false)}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                      Profil Saya
                    </Link>
                    <button className="nav-btn nav-btn-logout" onClick={handleLogoutClick}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      Logout
                    </button>
                  </>
                ) : (
                  <button className="nav-btn nav-btn-login" onClick={handleLoginClick}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
                      <polyline points="10 17 15 12 10 7"></polyline>
                      <line x1="15" y1="12" x2="3" y2="12"></line>
                    </svg>
                    Login
                  </button>
                )}
              </div>
            </nav>

            <div className="header-actions">
              {isLoggedIn ? (
                <>
                  <Link to="/profile" className="user-profile-btn">
                    <div className="user-avatar-small">
                      {user?.photoURL ? (
                        <img src={user.photoURL} alt={user?.name || 'User'} />
                      ) : (
                        <span>{(user?.name || 'U')[0].toUpperCase()}</span>
                      )}
                    </div>
                    <span className="user-name">{user?.name || 'Pengguna'}</span>
                  </Link>
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
              aria-label="Toggle menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`menu-overlay ${menuOpen ? 'open' : ''}`}
        onClick={() => setMenuOpen(false)}
      ></div>
    </>
  );
};

export default Header;
