import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3 className="footer-brand">LaporGaruda!</h3>
            <p className="footer-description">
              Layanan Aspirasi dan Pengaduan Online Rakyat - Portal resmi untuk menerima aspirasi dan pengaduan masyarakat.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Tautan</h4>
            <ul className="footer-links">
              <li><a href="#home">Beranda</a></li>
              <li><a href="#about">Tentang Kami</a></li>
              <li><a href="#tutorial">Tutorial Video</a></li>
              <li><a href="#contact">Hubungi Kami</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Kebijakan</h4>
            <ul className="footer-links">
              <li><a href="#">Syarat & Ketentuan</a></li>
              <li><a href="#">Kebijakan Privasi</a></li>
              <li><a href="#">Panduan Penggunaan</a></li>
              <li><a href="#">FAQ</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-institutions">
          <h4>Instansi Terhubung</h4>
          <div className="institutions-logos">
            <div className="institution-logo">🏛️</div>
            <div className="institution-logo">🚔</div>
            <div className="institution-logo">⚖️</div>
            <div className="institution-logo">🏢</div>
            <div className="institution-logo">🏥</div>
            <div className="institution-logo">🎓</div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Layanan Aspirasi dan Pengaduan Online Rakyat (LAPOR!)</p>
          <p className="footer-credit">Developed by Tim Teknologi Informasi</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
