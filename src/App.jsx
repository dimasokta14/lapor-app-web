import { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './components/Login';
import ReportFormModal from './components/ReportFormModal';
import HomePage from './pages/Home';
import BrowsePage from './pages/Browse/BrowsePage';
import DetailPage from './pages/Detail/DetailPage';
import ProfilePage from './pages/Profile/ProfilePage';

function AppContent() {
  const { showLoginPage } = useContext(AuthContext);

  useEffect(() => {
    if (showLoginPage) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [showLoginPage]);

  if (showLoginPage) {
    return <Login />;
  }

  return (
    <Router>
      <div className="app">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jelajah" element={<BrowsePage />} />
          <Route path="/detail/:id" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Routes>
        <Footer />
        <ReportFormModal />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
