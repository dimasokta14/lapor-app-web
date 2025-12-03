import React from 'react';

const CreateComplaint = () => {
  return (
    <section className="create-complaint section" id="create">
      <div className="container">
        <h2 className="section-title">Buat Aduan via Website</h2>
        <p className="create-subtitle">
          Laporkan keluhan atau masalah yang Anda temui melalui form aduan online.
        </p>

        <div className="create-card">
          <div className="create-icon">
            <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
              <line x1="16" y1="13" x2="8" y2="13"></line>
              <line x1="16" y1="17" x2="8" y2="17"></line>
              <polyline points="10 9 9 9 8 9"></polyline>
            </svg>
          </div>

          <h3 className="create-title">Silakan login terlebih dahulu untuk membuat aduan</h3>
          
          <div className="login-info">
            <div className="info-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
              <span>Data Anda aman dan terenkripsi</span>
            </div>
            <div className="info-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
              <span>Verifikasi identitas untuk transparansi</span>
            </div>
            <div className="info-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
              </svg>
              <span>Pantau status aduan secara real-time</span>
            </div>
          </div>

          <button className="btn btn-primary btn-large">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
              <polyline points="10 17 15 12 10 7"></polyline>
              <line x1="15" y1="12" x2="3" y2="12"></line>
            </svg>
            Login
          </button>

          <p className="register-text">
            Belum punya akun? <a href="#register">Daftar sekarang</a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default CreateComplaint;
