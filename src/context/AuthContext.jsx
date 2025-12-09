import { createContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        });
        setIsLoggedIn(true);
      } else {
        setUser(null);
        setIsLoggedIn(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const openLoginPage = () => {
    setShowLoginPage(true);
  };

  const closeLoginPage = () => {
    setShowLoginPage(false);
  };

  const openReportForm = () => {
    setShowReportForm(true);
  };

  const closeReportForm = () => {
    setShowReportForm(false);
  };

  const login = async (email, password) => {
    const result = await authService.signIn(email, password);
    if (result.success) {
      setShowLoginPage(false);
    }
    return result;
  };

  const signUp = async (email, password, displayName) => {
    const result = await authService.signUp(email, password, displayName);
    return result;
  };

  const loginWithGoogle = async () => {
    const result = await authService.signInWithGoogle();
    if (result.success) {
      setShowLoginPage(false);
    }
    return result;
  };

  const logout = async () => {
    const result = await authService.logout();
    if (result.success) {
      setUser(null);
      setIsLoggedIn(false);
    }
    return result;
  };

  const resetPassword = async (email) => {
    return await authService.resetPassword(email);
  };

  const value = {
    isLoggedIn,
    showLoginPage,
    showReportForm,
    user,
    loading,
    openLoginPage,
    closeLoginPage,
    openReportForm,
    closeReportForm,
    login,
    signUp,
    loginWithGoogle,
    logout,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
