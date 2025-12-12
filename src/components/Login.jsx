import { useState, useContext } from 'react';
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

  return (
    <div className="login-page">
      <div className="login-background" onClick={handleClose}></div>

      <div className="login-container">
        <button className="login-close" onClick={handleClose} aria-label="Close login">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="login-card">
          {/* Logo */}
          <div className="login-logo">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
              <path d="M2 17l10 5 10-5"></path>
              <path d="M2 12l10 5 10-5"></path>
            </svg>
          </div>

          {/* Header */}
          <div className="login-header">
            <h1 className="login-title">
              {mode === 'login' && 'Masuk'}
              {mode === 'signup' && 'Daftar'}
              {mode === 'forgot' && 'Reset Password'}
            </h1>
            <p className="login-subtitle">
              {mode === 'login' && 'Sistem Pengaduan Masyarakat Partai Gerindra'}
              {mode === 'signup' && 'Buat akun untuk mulai melaporkan'}
              {mode === 'forgot' && 'Masukkan email untuk reset password'}
            </p>
          </div>

          {/* Demo Account Info */}
          {mode === 'login' && (
            <div className="demo-account-info">
              <div className="demo-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="16" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
              </div>
              <div className="demo-content">
                <strong>Akun Demo:</strong>
                <div className="demo-credentials">
                  <div className="demo-account">
                    <span className="demo-label">Admin:</span>
                    <span>Email: <code>admin@gerindra.com</code></span>
                    <span>Password: <code>admin123</code></span>
                  </div>
                  <div className="demo-account">
                    <span className="demo-label">User:</span>
                    <span>Email: <code>user@gerindra.com</code></span>
                    <span>Password: <code>user123</code></span>
                  </div>
                </div>
              </div>
            </div>
          )}

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
                <label htmlFor="displayName" className="form-label">Nama Lengkap</label>
                <input
                  id="displayName"
                  type="text"
                  className="form-input"
                  placeholder="Masukkan nama lengkap"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  required
                />
              </div>
            )}

            {/* Email Field */}
            <div className="form-group">
              <label htmlFor="email" className="form-label">
                {mode === 'forgot' ? 'Email' : 'No. Telepon / Email'}
              </label>
              <input
                id="email"
                type="email"
                className="form-input"
                placeholder={mode === 'forgot' ? 'Masukkan email' : 'Masukkan no. telepon atau email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* Password Field (not for forgot password) */}
            {mode !== 'forgot' && (
              <div className="form-group">
                <label htmlFor="password" className="form-label">Password</label>
                <div className="form-input-wrapper">
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    className="form-input"
                    placeholder="Masukkan password"
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
                  {mode === 'forgot' && 'Kirim Link Reset'}
                </>
              )}
            </button>

            {/* Back to Login (for forgot password) */}
            {mode === 'forgot' && (
              <button
                type="button"
                className="btn btn-back"
                onClick={() => setMode('login')}
              >
                Kembali ke Login
              </button>
            )}
          </form>

          {/* Divider */}
          {mode === 'login' && (
            <>
              <div className="login-divider">
                <span>atau masuk dengan</span>
              </div>

              {/* Social Login */}
              <div className="social-login">
                <button
                  type="button"
                  className="btn-social btn-google"
                  onClick={handleGoogleLogin}
                  disabled={isLoading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Google</span>
                </button>

                <button
                  type="button"
                  className="btn-social btn-facebook"
                  disabled={isLoading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path fill="#1877F2" d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </button>
              </div>
            </>
          )}

          {/* Sign Up / Login Toggle */}
          {mode === 'login' && (
            <p className="login-footer">
              Belum punya akun? <a href="#" onClick={(e) => { e.preventDefault(); setMode('signup'); }}>Daftar</a>
            </p>
          )}
          {mode === 'signup' && (
            <p className="login-footer">
              Sudah punya akun? <a href="#" onClick={(e) => { e.preventDefault(); setMode('login'); }}>Masuk</a>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
