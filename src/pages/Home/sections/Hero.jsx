import { useContext, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const Hero = () => {
  const { openReportForm } = useContext(AuthContext);
  const [complaintCode, setComplaintCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert(`Mencari aduan dengan kode: ${complaintCode}`);
    }, 1000);
  };

  return (
    <section className="hero" id="home">
      <div className="hero-background">
        <div className="hero-overlay"></div>
      </div>

      <div className="container">
        <div className="hero-wrapper">
          <div className="hero-content fade-in">
            <h1 className="hero-title">Aspirasi Anda, Suara Rakyat</h1>
            <p className="hero-subtitle">
              Gerindra Mendengar - Sampaikan aspirasi dan pengaduan Anda untuk Indonesia yang lebih baik
            </p>
            <p className="hero-tagline">"Kalau bukan kita, siapa lagi? Kalau bukan sekarang, kapan lagi?"</p>
            <div className="hero-actions">
              <button className="btn btn-primary btn-large" onClick={openReportForm}>
                Sampaikan Aspirasi Anda
              </button>
            </div>
          </div>

          <div className="hero-track-card fade-in">
            <div className="track-icon">
              <svg width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
            </div>

            <h3 className="track-title">Lacak Aduan</h3>
            <p className="track-description">
              Sudah pernah melaporkan di kanal lain? Cek status aduan di sini.
            </p>

            <form className="track-form" onSubmit={handleTrack}>
              <input
                type="text"
                placeholder="Masukkan Kode Aduan (contoh: LGMB12345678)"
                value={complaintCode}
                onChange={(e) => setComplaintCode(e.target.value)}
                className="track-input"
                required
              />
              <button
                type="submit"
                className="btn btn-primary track-button"
                disabled={loading}
              >
                {loading ? 'Mencari...' : 'Lacak Aduan'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
