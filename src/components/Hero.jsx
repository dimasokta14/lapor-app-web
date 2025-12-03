import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const Hero = () => {
  const { openReportForm } = useContext(AuthContext)
  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>
      
      <div className="container">
        <div className="hero-content fade-in">
          <h1 className="hero-title">Layanan Aspirasi dan Pengaduan Online Rakyat</h1>
          <p className="hero-subtitle">Sampaikan laporan Anda langsung kepada instansi pemerintah berwenang</p>
          <div className="hero-actions">
            <button className="btn btn-primary btn-large" onClick={openReportForm}>Sampaikan Laporan Anda</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
