import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

const DetailPage = () => {
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data - replace with actual API call
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setReport({
        id: id || 'LAPGER001',
        title: 'Jalan Rusak di Desa Sukamaju',
        description: 'Jalan utama di Desa Sukamaju mengalami kerusakan parah dengan banyak lubang. Hal ini sangat mengganggu aktivitas warga dan berpotensi menyebabkan kecelakaan. Mohon segera diperbaiki.',
        category: 'Infrastruktur',
        categoryType: 'KERUSAKAN JALAN',
        status: 'Dalam Proses',
        visibility: 'Publik',
        reporter: {
          name: 'Ahmad Maulana',
          initials: 'AM'
        },
        location: 'Desa Sukamaju, Kecamatan Cianjur, Jawa Barat',
        createdAt: '2025-01-15T10:30:00',
        images: [
          'https://images.unsplash.com/photo-1584103924598-8e8c2f1fc8e7?w=800',
          'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800'
        ],
        timeline: [
          {
            status: 'Dilaporkan',
            date: '2025-01-15T10:30:00',
            description: 'Laporan berhasil dikirim dan sedang menunggu verifikasi',
            actor: 'Sistem'
          },
          {
            status: 'Disposisi',
            date: '2025-01-15T14:20:00',
            description: 'Laporan telah didisposisi ke Dinas Pekerjaan Umum',
            actor: 'Admin Partai Gerindra'
          },
          {
            status: 'Dalam Proses',
            date: '2025-01-16T09:15:00',
            description: 'Tim dari Dinas PU telah melakukan survey lokasi dan menyusun RAB perbaikan',
            actor: 'Dinas Pekerjaan Umum'
          }
        ],
        comments: [
          {
            id: 1,
            author: 'Budi Santoso',
            initials: 'BS',
            date: '2025-01-15T15:30:00',
            text: 'Terima kasih sudah melaporkan. Jalan ini memang sangat rusak dan membahayakan.'
          },
          {
            id: 2,
            author: 'Siti Nurhaliza',
            initials: 'SN',
            date: '2025-01-16T08:00:00',
            text: 'Semoga segera diperbaiki. Sudah banyak korban yang jatuh karena jalan berlubang ini.'
          }
        ]
      });
      setLoading(false);
    }, 500);
  }, [id]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('id-ID', options);
  };

  const getStatusColor = (status) => {
    const statusColors = {
      'Menunggu Verifikasi': 'status-pending',
      'Dalam Proses': 'status-progress',
      'Selesai': 'status-completed',
      'Ditolak': 'status-rejected'
    };
    return statusColors[status] || 'status-pending';
  };

  const getCategoryColor = (category) => {
    const categoryColors = {
      'Infrastruktur': 'category-infrastructure',
      'Kesehatan': 'category-health',
      'Pendidikan': 'category-education',
      'Keamanan': 'category-security',
      'Lingkungan': 'category-environment',
      'Sosial': 'category-social',
      'Lainnya': 'category-other'
    };
    return categoryColors[category] || 'category-other';
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: report.title,
        text: report.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link berhasil disalin!');
    }
  };

  if (loading) {
    return (
      <div className="detail-page">
        <div className="detail-loading">
          <div className="spinner-large"></div>
          <p>Memuat detail laporan...</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="detail-page">
        <div className="detail-error">
          <h2>Laporan tidak ditemukan</h2>
          <Link to="/jelajah" className="btn-back-browse">Kembali ke Jelajah</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="detail-container">
        {/* Breadcrumb */}
        <nav className="breadcrumb">
          <Link to="/">Beranda</Link>
          <span className="breadcrumb-separator">/</span>
          <Link to="/jelajah">Jelajah Aduan</Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{report.id}</span>
        </nav>

        {/* Main Content */}
        <div className="detail-content">
          {/* Left Column - Report Details */}
          <div className="detail-main">
            {/* Header */}
            <div className="detail-header">
              <div className="detail-meta">
                <span className="report-id">{report.id}</span>
                <span className={`status-badge ${getStatusColor(report.status)}`}>
                  {report.status}
                </span>
                <span className="visibility-badge">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3"></circle>
                  </svg>
                  {report.visibility}
                </span>
              </div>
              <h1 className="detail-title">{report.title}</h1>
              <div className="detail-info">
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                  <span>{formatDate(report.createdAt)}</span>
                </div>
                <div className="info-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                  <span>{report.location}</span>
                </div>
              </div>
            </div>

            {/* Category Badge */}
            <div className="detail-category">
              <span className={`category-badge ${getCategoryColor(report.category)}`}>
                {report.categoryType || report.category}
              </span>
            </div>

            {/* Description */}
            <div className="detail-description">
              <h2>Deskripsi Laporan</h2>
              <p>{report.description}</p>
            </div>

            {/* Images */}
            {report.images && report.images.length > 0 && (
              <div className="detail-images">
                <h2>Dokumentasi</h2>
                <div className="images-grid">
                  {report.images.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image} alt={`Dokumentasi ${index + 1}`} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Timeline */}
            <div className="detail-timeline">
              <h2>Riwayat Proses</h2>
              <div className="timeline-list">
                {report.timeline.map((item, index) => (
                  <div key={index} className="timeline-item">
                    <div className="timeline-marker"></div>
                    <div className="timeline-content">
                      <div className="timeline-header">
                        <span className="timeline-status">{item.status}</span>
                        <span className="timeline-date">{formatDate(item.date)}</span>
                      </div>
                      <p className="timeline-description">{item.description}</p>
                      <span className="timeline-actor">oleh {item.actor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Comments */}
            <div className="detail-comments">
              <h2>Komentar ({report.comments.length})</h2>
              <div className="comments-list">
                {report.comments.map((comment) => (
                  <div key={comment.id} className="comment-item">
                    <div className="comment-avatar">
                      {comment.initials}
                    </div>
                    <div className="comment-content">
                      <div className="comment-header">
                        <span className="comment-author">{comment.author}</span>
                        <span className="comment-date">{formatDate(comment.date)}</span>
                      </div>
                      <p className="comment-text">{comment.text}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Comment Form */}
              <div className="comment-form">
                <h3>Tambah Komentar</h3>
                <textarea
                  placeholder="Tulis komentar Anda..."
                  rows="4"
                  className="comment-input"
                ></textarea>
                <button className="btn-submit-comment">Kirim Komentar</button>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="detail-sidebar">
            {/* Action Buttons */}
            <div className="sidebar-actions">
              <button className="btn-action btn-share" onClick={handleShare}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3"></circle>
                  <circle cx="6" cy="12" r="3"></circle>
                  <circle cx="18" cy="19" r="3"></circle>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                </svg>
                Bagikan
              </button>
              <button className="btn-action btn-bookmark">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                </svg>
                Simpan
              </button>
            </div>

            {/* Reporter Info */}
            <div className="sidebar-card">
              <h3>Pelapor</h3>
              <div className="reporter-info">
                <div className="reporter-avatar">
                  {report.reporter.initials}
                </div>
                <div className="reporter-details">
                  <span className="reporter-name">{report.reporter.name}</span>
                  <span className="reporter-role">Masyarakat</span>
                </div>
              </div>
            </div>

            {/* Report Info */}
            <div className="sidebar-card">
              <h3>Informasi Laporan</h3>
              <div className="report-info-list">
                <div className="report-info-item">
                  <span className="info-label">Nomor Laporan</span>
                  <span className="info-value">{report.id}</span>
                </div>
                <div className="report-info-item">
                  <span className="info-label">Kategori</span>
                  <span className="info-value">{report.category}</span>
                </div>
                <div className="report-info-item">
                  <span className="info-label">Status</span>
                  <span className="info-value">{report.status}</span>
                </div>
                <div className="report-info-item">
                  <span className="info-label">Visibilitas</span>
                  <span className="info-value">{report.visibility}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
