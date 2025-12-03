import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginPage, setShowLoginPage] = useState(false);
  const [showReportForm, setShowReportForm] = useState(false);
  const [user, setUser] = useState(null);

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

  const login = (userData) => {
    setUser(userData);
    setIsLoggedIn(true);
    setShowLoginPage(false);
  };

  const logout = () => {
    setUser(null);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        showLoginPage,
        showReportForm,
        user,
        openLoginPage,
        closeLoginPage,
        openReportForm,
        closeReportForm,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
