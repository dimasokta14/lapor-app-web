import React, { useState } from 'react';

const TrackComplaint = () => {
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
    <section className="track-complaint section" id="track">
      <div className="container">
        <div className="track-card">
          <div className="track-icon">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>
          
          <h2 className="track-title">Lacak Aduan</h2>
          <p className="track-description">
            Sudah pernah melaporkan di kanal lain? Cek kode aduan di sini.
          </p>

          <form className="track-form" onSubmit={handleTrack}>
            <div className="form-group">
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
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? 'Mencari...' : 'Lacak Aduan'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default TrackComplaint;
