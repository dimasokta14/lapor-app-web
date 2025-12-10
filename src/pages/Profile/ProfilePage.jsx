import { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProfilePage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showLaporanSubmenu, setShowLaporanSubmenu] = useState(false);

  // Pagination & Filter states for Daftar Laporan
  const [currentPageReports, setCurrentPageReports] = useState(1);
  const [searchQueryReports, setSearchQueryReports] = useState('');
  const [dateFilterReports, setDateFilterReports] = useState('all');
  const reportsPerPage = 5;

  // Pagination & Filter states for Favorit
  const [currentPageFavorit, setCurrentPageFavorit] = useState(1);
  const [searchQueryFavorit, setSearchQueryFavorit] = useState('');
  const [dateFilterFavorit, setDateFilterFavorit] = useState('all');
  const favoritPerPage = 6;

  // Mock data - replace with actual data from context/API
  const userProfile = {
    name: user?.name || 'Pengguna',
    email: user?.email || 'user@example.com',
    avatar: user?.photoURL || null,
    role: 'Masyarakat',
    joinDate: '15 Januari 2025',
    location: 'Jakarta, Indonesia',
    totalReports: 12,
    resolvedReports: 8,
    pendingReports: 4
  };

  const recentReports = [
    {
      id: 'LAPGER001',
      title: 'Jalan Rusak di Desa Sukamaju',
      category: 'Infrastruktur',
      status: 'Dalam Proses',
      date: '2025-01-15T10:30:00',
      listenings: 1250,
      image: 'https://images.unsplash.com/photo-1584103924598-8e8c2f1fc8e7?w=300'
    },
    {
      id: 'LAPGER002',
      title: 'Lampu Jalan Mati di Perumahan',
      category: 'Infrastruktur',
      status: 'Selesai',
      date: '2025-01-10T14:20:00',
      listenings: 890,
      image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=300'
    },
    {
      id: 'LAPGER003',
      title: 'Sampah Menumpuk di Pasar',
      category: 'Lingkungan',
      status: 'Dalam Proses',
      date: '2025-01-08T09:15:00',
      listenings: 2100,
      image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=300'
    },
    {
      id: 'LAPGER004',
      title: 'Air Bersih Tidak Mengalir',
      category: 'Infrastruktur',
      status: 'Menunggu Verifikasi',
      date: '2025-01-05T08:45:00',
      listenings: 450,
      image: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=300'
    },
    {
      id: 'LAPGER005',
      title: 'Fasilitas Sekolah Rusak',
      category: 'Pendidikan',
      status: 'Dalam Proses',
      date: '2025-01-03T13:20:00',
      listenings: 780,
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300'
    },
    {
      id: 'LAPGER006',
      title: 'Jembatan Ambruk',
      category: 'Infrastruktur',
      status: 'Selesai',
      date: '2024-12-28T16:00:00',
      listenings: 3200,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300'
    },
    {
      id: 'LAPGER007',
      title: 'Puskesmas Kekurangan Obat',
      category: 'Kesehatan',
      status: 'Dalam Proses',
      date: '2024-12-25T11:30:00',
      listenings: 1560,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300'
    },
    {
      id: 'LAPGER008',
      title: 'Taman Kota Tidak Terawat',
      category: 'Lingkungan',
      status: 'Menunggu Verifikasi',
      date: '2024-12-20T09:00:00',
      listenings: 620,
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300'
    },
    {
      id: 'LAPGER009',
      title: 'Pencemaran Sungai',
      category: 'Lingkungan',
      status: 'Ditolak',
      date: '2024-12-15T14:45:00',
      listenings: 980,
      image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=300'
    },
    {
      id: 'LAPGER010',
      title: 'Jaringan Listrik Sering Padam',
      category: 'Infrastruktur',
      status: 'Selesai',
      date: '2024-12-10T10:15:00',
      listenings: 2340,
      image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=300'
    },
    {
      id: 'LAPGER011',
      title: 'Gorong-gorong Tersumbat',
      category: 'Infrastruktur',
      status: 'Dalam Proses',
      date: '2024-12-05T15:30:00',
      listenings: 540,
      image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=300'
    },
    {
      id: 'LAPGER012',
      title: 'Bantuan Sosial Tidak Merata',
      category: 'Sosial',
      status: 'Selesai',
      date: '2024-11-28T12:00:00',
      listenings: 1890,
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=300'
    }
  ];

  const savedReports = [
    {
      id: 'LAPGER020',
      title: 'Bantuan untuk Korban Banjir',
      category: 'Sosial',
      author: 'Budi Santoso',
      date: '2025-01-12T08:30:00',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=300'
    },
    {
      id: 'LAPGER021',
      title: 'Perbaikan Sekolah Dasar',
      category: 'Pendidikan',
      author: 'Siti Nurhaliza',
      date: '2025-01-09T14:20:00',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?w=300'
    },
    {
      id: 'LAPGER022',
      title: 'Program Vaksinasi Gratis',
      category: 'Kesehatan',
      author: 'Dr. Ahmad',
      date: '2025-01-06T10:00:00',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=300'
    },
    {
      id: 'LAPGER023',
      title: 'Pembangunan Taman Kota',
      category: 'Lingkungan',
      author: 'Dinas Tata Kota',
      date: '2025-01-04T16:45:00',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?w=300'
    },
    {
      id: 'LAPGER024',
      title: 'Renovasi Fasilitas Umum',
      category: 'Infrastruktur',
      author: 'Pemerintah Daerah',
      date: '2024-12-30T11:30:00',
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=300'
    },
    {
      id: 'LAPGER025',
      title: 'Pelatihan UMKM',
      category: 'Sosial',
      author: 'Koperasi Maju',
      date: '2024-12-27T09:15:00',
      image: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?w=300'
    },
    {
      id: 'LAPGER026',
      title: 'Perbaikan Jalan Tol',
      category: 'Infrastruktur',
      author: 'PT Jasa Marga',
      date: '2024-12-22T13:00:00',
      image: 'https://images.unsplash.com/photo-1584103924598-8e8c2f1fc8e7?w=300'
    },
    {
      id: 'LAPGER027',
      title: 'Bantuan Alat Kesehatan',
      category: 'Kesehatan',
      author: 'Dinas Kesehatan',
      date: '2024-12-18T15:30:00',
      image: 'https://images.unsplash.com/photo-1631217872420-cb03c4b2c6ca?w=300'
    },
    {
      id: 'LAPGER028',
      title: 'Penanaman Pohon Massal',
      category: 'Lingkungan',
      author: 'Komunitas Hijau',
      date: '2024-12-12T07:45:00',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=300'
    },
    {
      id: 'LAPGER029',
      title: 'Beasiswa Pendidikan',
      category: 'Pendidikan',
      author: 'Yayasan Pendidikan',
      date: '2024-12-08T12:20:00',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=300'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('id-ID', options);
  };

  const formatNumber = (num) => {
    return num.toLocaleString('id-ID');
  };

  const getStatusColor = (status) => {
    const colors = {
      'Menunggu Verifikasi': 'status-pending',
      'Dalam Proses': 'status-progress',
      'Selesai': 'status-completed',
      'Ditolak': 'status-rejected'
    };
    return colors[status] || 'status-pending';
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Filter function for date ranges
  const filterByDate = (items, dateFilter) => {
    if (dateFilter === 'all') return items;

    const now = new Date();
    const filtered = items.filter(item => {
      const itemDate = new Date(item.date);

      switch(dateFilter) {
        case '7days':
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          return itemDate >= sevenDaysAgo;
        case '30days':
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          return itemDate >= thirtyDaysAgo;
        case '90days':
          const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
          return itemDate >= ninetyDaysAgo;
        default:
          return true;
      }
    });

    return filtered;
  };

  // Filter and paginate reports
  const getFilteredReports = () => {
    let filtered = recentReports;

    // Search filter
    if (searchQueryReports) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchQueryReports.toLowerCase())
      );
    }

    // Date filter
    filtered = filterByDate(filtered, dateFilterReports);

    return filtered;
  };

  const getPaginatedReports = () => {
    const filtered = getFilteredReports();
    const indexOfLastReport = currentPageReports * reportsPerPage;
    const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    return filtered.slice(indexOfFirstReport, indexOfLastReport);
  };

  const totalPagesReports = Math.ceil(getFilteredReports().length / reportsPerPage);

  // Filter and paginate favorit
  const getFilteredFavorit = () => {
    let filtered = savedReports;

    // Search filter
    if (searchQueryFavorit) {
      filtered = filtered.filter(report =>
        report.title.toLowerCase().includes(searchQueryFavorit.toLowerCase())
      );
    }

    // Date filter
    filtered = filterByDate(filtered, dateFilterFavorit);

    return filtered;
  };

  const getPaginatedFavorit = () => {
    const filtered = getFilteredFavorit();
    const indexOfLastFavorit = currentPageFavorit * favoritPerPage;
    const indexOfFirstFavorit = indexOfLastFavorit - favoritPerPage;
    return filtered.slice(indexOfFirstFavorit, indexOfLastFavorit);
  };

  const totalPagesFavorit = Math.ceil(getFilteredFavorit().length / favoritPerPage);

  // Pagination handlers
  const handlePageChangeReports = (pageNumber) => {
    setCurrentPageReports(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePageChangeFavorit = (pageNumber) => {
    setCurrentPageFavorit(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Reset pagination when filters change
  const handleSearchReports = (query) => {
    setSearchQueryReports(query);
    setCurrentPageReports(1);
  };

  const handleDateFilterReports = (filter) => {
    setDateFilterReports(filter);
    setCurrentPageReports(1);
  };

  const handleSearchFavorit = (query) => {
    setSearchQueryFavorit(query);
    setCurrentPageFavorit(1);
  };

  const handleDateFilterFavorit = (filter) => {
    setDateFilterFavorit(filter);
    setCurrentPageFavorit(1);
  };

  if (!isLoggedIn) {
    return (
      <div className="profile-page">
        <div className="profile-container">
          <div className="profile-error">
            <h2>Akses Ditolak</h2>
            <p>Anda harus login untuk melihat halaman profil.</p>
            <Link to="/" className="btn-back-home">Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        {/* Main Content */}
        <div className="profile-content">
          {/* Sidebar Navigation */}
          <aside className="profile-sidebar">
            {/* User Info */}
            <div className="sidebar-user">
              <div className="sidebar-avatar">
                {userProfile.avatar ? (
                  <img src={userProfile.avatar} alt={userProfile.name} />
                ) : (
                  <div className="avatar-placeholder">
                    {getInitials(userProfile.name)}
                  </div>
                )}
              </div>
              <h3 className="sidebar-username">{userProfile.name}</h3>
              <p className="sidebar-email">{userProfile.email}</p>
            </div>

            {/* Navigation Menu */}
            <nav className="sidebar-nav">
              <button
                className={`nav-item ${activeMenu === 'dashboard' ? 'active' : ''}`}
                onClick={() => setActiveMenu('dashboard')}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
                <span>Dashboard</span>
              </button>

              <div className="nav-item-group">
                <button
                  className={`nav-item ${activeMenu === 'laporan' || activeMenu === 'daftar-laporan' || activeMenu === 'favorit' ? 'active' : ''}`}
                  onClick={() => setShowLaporanSubmenu(!showLaporanSubmenu)}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                  <span>Laporan</span>
                  <svg className={`submenu-arrow ${showLaporanSubmenu ? 'open' : ''}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </button>

                {showLaporanSubmenu && (
                  <div className="nav-submenu">
                    <button
                      className={`nav-subitem ${activeMenu === 'daftar-laporan' ? 'active' : ''}`}
                      onClick={() => setActiveMenu('daftar-laporan')}
                    >
                      Daftar Laporan
                    </button>
                    <button
                      className={`nav-subitem ${activeMenu === 'favorit' ? 'active' : ''}`}
                      onClick={() => setActiveMenu('favorit')}
                    >
                      Favorit
                    </button>
                  </div>
                )}
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="profile-main">
            {/* Dashboard View */}
            {activeMenu === 'dashboard' && (
              <>
                <div className="page-header">
                  <h1>Dashboard</h1>
                  <p>Selamat datang kembali, {userProfile.name}!</p>
                </div>

                {/* Stats Cards */}
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon" style={{background: 'rgba(59, 130, 246, 0.1)'}}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                        <polyline points="14 2 14 8 20 8"></polyline>
                      </svg>
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Total Laporan</span>
                      <span className="stat-number">{userProfile.totalReports}</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{background: 'rgba(16, 185, 129, 0.1)'}}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Selesai</span>
                      <span className="stat-number">{userProfile.resolvedReports}</span>
                    </div>
                  </div>

                  <div className="stat-card">
                    <div className="stat-icon" style={{background: 'rgba(251, 191, 36, 0.1)'}}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                    </div>
                    <div className="stat-info">
                      <span className="stat-label">Dalam Proses</span>
                      <span className="stat-number">{userProfile.pendingReports}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <section className="content-section">
                  <div className="section-header">
                    <h2>Aktivitas Terbaru</h2>
                  </div>
                  <div className="activity-list">
                    {recentReports.slice(0, 5).map((report) => (
                      <div key={report.id} className="activity-item">
                        <div className="activity-thumbnail">
                          <img src={report.image} alt={report.title} />
                        </div>
                        <div className="activity-content">
                          <Link to={`/detail/${report.id}`} className="activity-title">
                            {report.title}
                          </Link>
                          <div className="activity-meta">
                            <span className={`status-badge ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                            <span className="activity-date">{formatDate(report.date)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              </>
            )}

            {/* Daftar Laporan View */}
            {activeMenu === 'daftar-laporan' && (
              <>
                <div className="page-header">
                  <h1>Daftar Laporan</h1>
                  <p>Semua laporan yang telah Anda buat</p>
                </div>

                <section className="content-section">
                  <div className="section-header">
                    <h2>Laporan Saya</h2>
                  </div>

                  {/* Filters */}
                  <div className="filters-bar">
                    <div className="search-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                      <input
                        type="text"
                        placeholder="Cari laporan..."
                        value={searchQueryReports}
                        onChange={(e) => handleSearchReports(e.target.value)}
                      />
                    </div>

                    <select
                      className="date-filter"
                      value={dateFilterReports}
                      onChange={(e) => handleDateFilterReports(e.target.value)}
                    >
                      <option value="all">Semua Waktu</option>
                      <option value="7days">7 Hari Terakhir</option>
                      <option value="30days">30 Hari Terakhir</option>
                      <option value="90days">90 Hari Terakhir</option>
                    </select>
                  </div>

                  <div className="reports-table">
                    <div className="table-header">
                      <span className="col-title">Judul</span>
                      <span className="col-time">Status</span>
                      <span className="col-listenings">Dilihat</span>
                      <span className="col-actions">Aksi</span>
                    </div>

                    {getPaginatedReports().length > 0 ? (
                      getPaginatedReports().map((report) => (
                        <div key={report.id} className="table-row">
                          <div className="col-title">
                            <div className="report-thumbnail">
                              <img src={report.image} alt={report.title} />
                            </div>
                            <div className="report-info">
                              <Link to={`/detail/${report.id}`} className="report-title">
                                {report.title}
                              </Link>
                              <span className="report-author">{userProfile.name}</span>
                            </div>
                          </div>
                          <div className="col-time">
                            <span className={`status-badge ${getStatusColor(report.status)}`}>
                              {report.status}
                            </span>
                          </div>
                          <div className="col-listenings">
                            {formatNumber(report.listenings)}
                          </div>
                          <div className="col-actions">
                            <Link to={`/detail/${report.id}`} className="action-btn" title="Lihat">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                <circle cx="12" cy="12" r="3"></circle>
                              </svg>
                            </Link>
                            <button className="action-btn" title="Bagikan">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="18" cy="5" r="3"></circle>
                                <circle cx="6" cy="12" r="3"></circle>
                                <circle cx="18" cy="19" r="3"></circle>
                                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line>
                                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line>
                              </svg>
                            </button>
                            <button className="action-btn" title="Komentar">
                              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                              </svg>
                            </button>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="empty-state">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="10"></circle>
                          <line x1="12" y1="8" x2="12" y2="12"></line>
                          <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        <p>Tidak ada laporan yang ditemukan</p>
                      </div>
                    )}
                  </div>

                  {/* Pagination */}
                  {totalPagesReports > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChangeReports(currentPageReports - 1)}
                        disabled={currentPageReports === 1}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      {[...Array(totalPagesReports)].map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPagesReports ||
                          (pageNumber >= currentPageReports - 1 && pageNumber <= currentPageReports + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              className={`pagination-number ${currentPageReports === pageNumber ? 'active' : ''}`}
                              onClick={() => handlePageChangeReports(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPageReports - 2 ||
                          pageNumber === currentPageReports + 2
                        ) {
                          return <span key={pageNumber} className="pagination-dots">...</span>;
                        }
                        return null;
                      })}

                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChangeReports(currentPageReports + 1)}
                        disabled={currentPageReports === totalPagesReports}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  )}
                </section>
              </>
            )}

            {/* Favorit View */}
            {activeMenu === 'favorit' && (
              <>
                <div className="page-header">
                  <h1>Laporan Favorit</h1>
                  <p>Laporan yang telah Anda simpan</p>
                </div>

                <section className="content-section">
                  <div className="section-header">
                    <h2>Laporan Disimpan</h2>
                  </div>

                  {/* Filters */}
                  <div className="filters-bar">
                    <div className="search-box">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                      </svg>
                      <input
                        type="text"
                        placeholder="Cari laporan favorit..."
                        value={searchQueryFavorit}
                        onChange={(e) => handleSearchFavorit(e.target.value)}
                      />
                    </div>

                    <select
                      className="date-filter"
                      value={dateFilterFavorit}
                      onChange={(e) => handleDateFilterFavorit(e.target.value)}
                    >
                      <option value="all">Semua Waktu</option>
                      <option value="7days">7 Hari Terakhir</option>
                      <option value="30days">30 Hari Terakhir</option>
                      <option value="90days">90 Hari Terakhir</option>
                    </select>
                  </div>

                  {getPaginatedFavorit().length > 0 ? (
                    <div className="collection-grid">
                      {getPaginatedFavorit().map((report) => (
                        <Link
                          key={report.id}
                          to={`/detail/${report.id}`}
                          className="collection-card"
                        >
                          <div className="card-image">
                            <img src={report.image} alt={report.title} />
                            <div className="card-overlay">
                              <button className="play-btn">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                                  <circle cx="12" cy="12" r="3"></circle>
                                </svg>
                              </button>
                            </div>
                            <button className="bookmark-btn">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2">
                                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                              </svg>
                            </button>
                          </div>
                          <div className="card-content">
                            <h3 className="card-title">{report.title}</h3>
                            <p className="card-author">{report.author}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="empty-state">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                      </svg>
                      <p>Tidak ada laporan favorit yang ditemukan</p>
                    </div>
                  )}

                  {/* Pagination */}
                  {totalPagesFavorit > 1 && (
                    <div className="pagination">
                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChangeFavorit(currentPageFavorit - 1)}
                        disabled={currentPageFavorit === 1}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                      </button>

                      {[...Array(totalPagesFavorit)].map((_, index) => {
                        const pageNumber = index + 1;
                        if (
                          pageNumber === 1 ||
                          pageNumber === totalPagesFavorit ||
                          (pageNumber >= currentPageFavorit - 1 && pageNumber <= currentPageFavorit + 1)
                        ) {
                          return (
                            <button
                              key={pageNumber}
                              className={`pagination-number ${currentPageFavorit === pageNumber ? 'active' : ''}`}
                              onClick={() => handlePageChangeFavorit(pageNumber)}
                            >
                              {pageNumber}
                            </button>
                          );
                        } else if (
                          pageNumber === currentPageFavorit - 2 ||
                          pageNumber === currentPageFavorit + 2
                        ) {
                          return <span key={pageNumber} className="pagination-dots">...</span>;
                        }
                        return null;
                      })}

                      <button
                        className="pagination-btn"
                        onClick={() => handlePageChangeFavorit(currentPageFavorit + 1)}
                        disabled={currentPageFavorit === totalPagesFavorit}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </div>
                  )}
                </section>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
