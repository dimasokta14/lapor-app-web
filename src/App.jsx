import { useContext, useEffect } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Header from './components/Header';
import Hero from './components/Hero';
import ReportClassification from './components/ReportClassification';
import ReportingProcess from './components/ReportingProcess';
import StatisticsSection from './components/StatisticsSection';
import ConnectedInstitutions from './components/ConnectedInstitutions';
import TrackComplaint from './components/TrackComplaint';
import Footer from './components/Footer';
import Login from './components/Login';
import ReportFormModal from './components/ReportFormModal';

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
    <div className="app">
      <Header />
      <Hero />
      <ReportClassification />
      <ReportingProcess />
      <StatisticsSection />
      <ConnectedInstitutions />
      <TrackComplaint />
      <Footer />
      <ReportFormModal />
    </div>
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
