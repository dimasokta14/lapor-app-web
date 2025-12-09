import React from 'react';
import { getRecentComplaints } from '../../../data/mockComplaints';

const RecentComplaints = () => {
  const recentComplaints = getRecentComplaints(9);

  const getStatusClass = (status) => {
    switch (status) {
      case 'Selesai':
        return 'status-completed';
      case 'Proses':
        return 'status-progress';
      case 'Verifikasi':
        return 'status-verification';
      case 'Menunggu':
        return 'status-pending';
      default:
        return '';
    }
  };

  const getCategoryClass = (category) => {
    switch (category) {
      case 'Pengaduan':
        return 'category-complaint';
      case 'Aspirasi':
        return 'category-aspiration';
      case 'Permintaan Informasi':
        return 'category-info';
      default:
        return '';
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const truncateText = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="recent-complaints section" id="recent">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Aduan & Aspirasi Terbaru</h2>
          <p className="section-subtitle">
            Pantau aduan dan aspirasi terbaru dari masyarakat yang sedang kami proses
          </p>
        </div>

        <div className="complaints-grid">
          {recentComplaints.map((complaint) => (
            <div key={complaint.id} className="complaint-card">
              <div className="card-header">
                <span className={`category-badge ${getCategoryClass(complaint.category)}`}>
                  {complaint.category}
                </span>
                <span className={`status-badge ${getStatusClass(complaint.status)}`}>
                  {complaint.status}
                </span>
              </div>

              <h3 className="complaint-title">{complaint.title}</h3>

              <div className="complaint-meta">
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{complaint.location}</span>
                </div>
                <div className="meta-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{formatDate(complaint.date)}</span>
                </div>
              </div>

              <p className="complaint-description">
                {truncateText(complaint.description)}
              </p>

              <div className="complaint-footer">
                <span className="complaint-code">Kode: {complaint.id}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all-section">
          <button className="btn btn-secondary">
            Lihat Semua Aduan
          </button>
        </div>
      </div>
    </section>
  );
};

export default RecentComplaints;
