import React from 'react';
import { getComplaintStats, getRecentComplaints } from '../../../data/mockComplaints';

const ComplaintsOverview = () => {
  const stats = getComplaintStats();
  const recentComplaints = getRecentComplaints(4);

  const statsData = [
    {
      number: stats.total,
      label: "Total Laporan",
      description: "Laporan yang masuk"
    },
    {
      number: stats.selesai,
      label: "Selesai",
      description: "Laporan terselesaikan"
    },
    {
      number: stats.proses,
      label: "Proses",
      description: "Sedang ditindaklanjuti"
    },
    {
      number: stats.menunggu + stats.verifikasi,
      label: "Menunggu",
      description: "Menunggu verifikasi"
    }
  ];

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

  const truncateText = (text, maxLength = 80) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  return (
    <section className="complaints-overview">
      {/* Statistics Section */}
      <div className="statistics-section">
        <div className="container">
          <div className="stats-content">
            <div className="stats-text">
              <h2 className="stats-title">Pantau Aduan & Aspirasi</h2>
              <p className="stats-description">
                Data real-time mengenai perkembangan penanganan laporan masyarakat.
                Partai Gerindra berkomitmen untuk memberikan pelayanan yang transparan dan responsif.
              </p>
              <button className="btn btn-outline" style={{color: "#fff", border: "2px solid #fff"}}>
                Lihat Detail Statistik
              </button>
            </div>

            <div className="stats-grid">
              {statsData.map((stat, index) => (
                <div key={index} className="stat-item">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recent Complaints Preview */}
      <div className="complaints-preview">
        <div className="container">
          <div className="preview-header">
            <h3 className="preview-title">Aduan Terbaru dari Masyarakat</h3>
            <p className="preview-subtitle">
              Ikuti perkembangan aduan dan aspirasi dari berbagai daerah yang sedang kami tangani
            </p>
          </div>

          <div className="preview-grid">
            {recentComplaints.map((complaint) => (
              <div key={complaint.id} className="preview-card">
                <div className="preview-header-row">
                  <span className="preview-category">{complaint.category}</span>
                  <span className={`preview-status ${getStatusClass(complaint.status)}`}>
                    {complaint.status}
                  </span>
                </div>
                <h4 className="preview-card-title">{complaint.title}</h4>
                <p className="preview-location">{complaint.location}</p>
                <p className="preview-description">{truncateText(complaint.description)}</p>
              </div>
            ))}
          </div>

          <div className="preview-footer">
            <button className="btn btn-secondary">Lihat Semua Aduan</button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComplaintsOverview;
