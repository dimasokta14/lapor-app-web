import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [mode, setMode] = useState('login');
  const [displayName, setDisplayName] = useState('');
  const { login, signUp, loginWithGoogle, closeLoginPage, resetPassword } = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      let result;

      if (mode === 'login') {
        result = await login(email, password);
      } else if (mode === 'signup') {
        result = await signUp(email, password, displayName);
      } else if (mode === 'forgot') {
        result = await resetPassword(email);
        if (result.success) {
          alert(result.message);
          setMode('login');
        }
      }

      if (!result.success) {
        setError(result.message);
      } else {
        setEmail('');
        setPassword('');
        setDisplayName('');
        if (mode === 'login' || mode === 'signup') {
          closeLoginPage();
        }
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError('');

    try {
      const result = await loginWithGoogle();
      if (!result.success) {
        setError(result.message);
      }
    } catch (err) {
      setError('Failed to login with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    closeLoginPage();
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const getIconSvg = (iconName) => {
    const icons = {
      document: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path>
          <polyline points="13 2 13 9 20 9"></polyline>
        </svg>
      ),
      refresh: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="23 4 23 10 17 10"></polyline>
          <polyline points="1 20 1 14 7 14"></polyline>
          <path d="M3.51 9a9 9 0 0 1 14.85-3.36M20.49 15a9 9 0 0 1-14.85 3.36"></path>
        </svg>
      ),
      shield: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        </svg>
      ),
      lightning: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
        </svg>
      ),
      message: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        </svg>
      ),
      bell: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg>
      ),
      eye: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
          <circle cx="12" cy="12" r="3"></circle>
        </svg>
      ),
      lock: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
          <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
        </svg>
      ),
      verified: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 10l-2-2 1.41-1.41L10 8.17l4.59-4.58L16 5l-6 6z"></path>
        </svg>
      )
    };
    return icons[iconName] || icons.document;
  };

  return (
    <div className="login-page">
      <div className="login-background" onClick={handleClose}>
        <div className="login-overlay"></div>
      </div>

      <div className="login-container">
        {/* Left Side - Form */}
        <div className="login-left">
          <button className="login-close" onClick={handleClose} aria-label="Close login">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          <div className="login-card">
            {/* Header */}
            <div className="login-header">
              <h1 className="login-title">
                {mode === 'login' && 'Selamat datang kembali!'}
                {mode === 'signup' && 'Buat Akun Baru'}
                {mode === 'forgot' && 'Reset Password'}
              </h1>
              <p className="login-subtitle">
                {mode === 'login' && 'Masuk ke akun Lapor Gerindra Anda untuk melanjutkan'}
                {mode === 'signup' && 'Daftar untuk mulai melaporkan masalah Anda'}
                {mode === 'forgot' && 'Masukkan email Anda untuk reset password'}
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="login-error">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form className="login-form" onSubmit={handleSubmit}>
              {/* Name Field (Sign Up only) */}
              {mode === 'signup' && (
                <div className="form-group">
                  <input
                    id="displayName"
                    type="text"
                    className="form-input"
                    placeholder="Nama lengkap"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                  />
                </div>
              )}

              {/* Email Field */}
              <div className="form-group">
                <input
                  id="email"
                  type="email"
                  className="form-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password Field (not for forgot password) */}
              {mode !== 'forgot' && (
                <div className="form-group">
                  <div className="form-input-wrapper">
                    <input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      className="form-input"
                      placeholder="Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      className="form-toggle-password"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      ) : (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Forgot Password */}
              {mode === 'login' && (
                <div className="forgot-password-wrapper">
                  <a href="#" onClick={(e) => { e.preventDefault(); setMode('forgot'); }} className="forgot-password">
                    Lupa password?
                  </a>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="btn btn-login"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Memproses...
                  </>
                ) : (
                  <>
                    {mode === 'login' && 'Masuk'}
                    {mode === 'signup' && 'Daftar'}
                    {mode === 'forgot' && 'Kirim Email Reset'}
                  </>
                )}
              </button>

              {/* Back to Login (for forgot password) */}
              {mode === 'forgot' && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setMode('login')}
                  style={{ marginTop: '10px' }}
                >
                  Kembali ke Login
                </button>
              )}
            </form>

            {/* Divider */}
            {mode === 'login' && (
              <>
                <div className="login-divider">
                  <span>atau lanjutkan dengan</span>
                </div>

                {/* Social Login */}
                <div className="social-login">
                  <button
                    type="button"
                    className="btn-social"
                    title="Login dengan Google"
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </button>
                </div>
              </>
            )}

            {/* Sign Up / Login Toggle */}
            {mode === 'login' && (
              <p className="login-signup">
                Belum punya akun? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signup'); }}>Daftar di sini</a>
              </p>
            )}
            {mode === 'signup' && (
              <p className="login-signup">
                Sudah punya akun? <a href="#" onClick={(e) => { e.preventDefault(); setMode('login'); }}>Masuk di sini</a>
              </p>
            )}
          </div>
        </div>

        {/* Right Side - Carousel */}
        <div className="login-right">
          <div className="carousel-wrapper">
            <div className="carousel-container">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <div className="slide-icon">
                    {getIconSvg(slide.icon)}
                  </div>
                  <h2 className="slide-title">{slide.title}</h2>
                  <p className="slide-description">{slide.description}</p>
                  <div className="slide-features">
                    {slide.features.map((feature, idx) => (
                      <div key={idx} className="feature-item">
                        <span className="feature-icon">{getIconSvg(feature.icon)}</span>
                        <span className="feature-text">{feature.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation */}
            <div className="carousel-nav">
              <button
                className="carousel-arrow carousel-prev"
                onClick={prevSlide}
                aria-label="Previous slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
              </button>

              <div className="carousel-indicators">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                    onClick={() => goToSlide(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <button
                className="carousel-arrow carousel-next"
                onClick={nextSlide}
                aria-label="Next slide"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
