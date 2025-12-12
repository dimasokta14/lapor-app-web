import React, { useState, useContext } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const AdminPage = () => {
  const { user, isLoggedIn } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Mock admin check - replace with actual admin role check
  const isAdmin = user?.email === 'admin@gerindra.com' || user?.email === 'demo@gerindra.com';

  // Mock data for admin dashboard
  const stats = {
    totalReports: 247,
    pendingReports: 45,
    inProgressReports: 82,
    completedReports: 98,
    rejectedReports: 22,
    totalUsers: 1523,
    newUsersThisMonth: 87,
    avgResponseTime: '2.5 hari'
  };

  const recentReports = [
    {
      id: 'LAPGER001',
      title: 'Jalan Rusak di Kelurahan Menteng',
      category: 'Infrastruktur',
      status: 'Menunggu Verifikasi',
      reporter: 'Ahmad Sutanto',
      date: '2025-01-15T10:30:00',
      priority: 'high'
    },
    {
      id: 'LAPGER002',
      title: 'Lampu Jalan Mati',
      category: 'Infrastruktur',
      status: 'Dalam Proses',
      reporter: 'Siti Rahayu',
      date: '2025-01-14T15:20:00',
      priority: 'medium'
    },
    {
      id: 'LAPGER003',
      title: 'Sampah Menumpuk di Pasar',
      category: 'Lingkungan',
      status: 'Menunggu Verifikasi',
      reporter: 'Budi Santoso',
      date: '2025-01-14T09:15:00',
      priority: 'high'
    },
    {
      id: 'LAPGER004',
      title: 'Air Bersih Tidak Mengalir',
      category: 'Infrastruktur',
      status: 'Selesai',
      reporter: 'Diana Putri',
      date: '2025-01-13T08:45:00',
      priority: 'high'
    },
    {
      id: 'LAPGER005',
      title: 'Fasilitas Sekolah Rusak',
      category: 'Pendidikan',
      status: 'Dalam Proses',
      reporter: 'Eko Prasetyo',
      date: '2025-01-12T13:20:00',
      priority: 'medium'
    }
  ];

  const users = [
    {
      id: 1,
      name: 'Ahmad Sutanto',
      email: 'ahmad@email.com',
      reportsCount: 12,
      joinDate: '2024-06-15',
      status: 'active'
    },
    {
      id: 2,
      name: 'Siti Rahayu',
      email: 'siti@email.com',
      reportsCount: 8,
      joinDate: '2024-08-20',
      status: 'active'
    },
    {
      id: 3,
      name: 'Budi Santoso',
      email: 'budi@email.com',
      reportsCount: 15,
      joinDate: '2024-05-10',
      status: 'active'
    }
  ];

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('id-ID', options);
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

  const getPriorityColor = (priority) => {
    const colors = {
      'high': 'priority-high',
      'medium': 'priority-medium',
      'low': 'priority-low'
    };
    return colors[priority] || 'priority-low';
  };

  const filteredReports = recentReports.filter(report => {
    const matchesStatus = selectedStatus === 'all' || report.status === selectedStatus;
    const matchesSearch = report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         report.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  if (!isAdmin) {
    return (
      <div className="admin-page">
        <div className="admin-container">
          <div className="admin-error">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <h2>Akses Ditolak</h2>
            <p>Anda tidak memiliki akses ke halaman admin.</p>
            <Link to="/" className="btn-back-home">Kembali ke Beranda</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-container">
        {/* Header */}
        <div className="admin-header">
          <div>
            <h1>Admin Dashboard</h1>
            <p>Kelola laporan dan pengguna sistem</p>
          </div>
          <div className="admin-user-info">
            <span>Selamat datang, <strong>{user?.name}</strong></span>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card stat-primary">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
                <line x1="16" y1="13" x2="8" y2="13"></line>
                <line x1="16" y1="17" x2="8" y2="17"></line>
                <polyline points="10 9 9 9 8 9"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Total Laporan</h3>
              <p className="stat-number">{stats.totalReports}</p>
            </div>
          </div>

          <div className="stat-card stat-warning">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Menunggu Verifikasi</h3>
              <p className="stat-number">{stats.pendingReports}</p>
            </div>
          </div>

          <div className="stat-card stat-info">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Dalam Proses</h3>
              <p className="stat-number">{stats.inProgressReports}</p>
            </div>
          </div>

          <div className="stat-card stat-success">
            <div className="stat-icon">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            </div>
            <div className="stat-content">
              <h3>Selesai</h3>
              <p className="stat-number">{stats.completedReports}</p>
            </div>
          </div>
        </div>

        {/* Tabs Navigation */}
        <div className="admin-tabs">
          <button
            className={`tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"></rect>
              <rect x="14" y="3" width="7" height="7"></rect>
              <rect x="14" y="14" width="7" height="7"></rect>
              <rect x="3" y="14" width="7" height="7"></rect>
            </svg>
            Dashboard
          </button>
          <button
            className={`tab-btn ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
              <polyline points="14 2 14 8 20 8"></polyline>
            </svg>
            Kelola Laporan
          </button>
          <button
            className={`tab-btn ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
              <circle cx="9" cy="7" r="4"></circle>
              <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
              <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
            </svg>
            Pengguna
          </button>
        </div>

        {/* Tab Content */}
        <div className="admin-content">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && (
            <div className="dashboard-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>Laporan Terbaru</h2>
                  <Link to="/admin" className="btn-link">Lihat Semua</Link>
                </div>

                <div className="reports-list">
                  {recentReports.slice(0, 5).map((report) => (
                    <div key={report.id} className="report-item">
                      <div className="report-main">
                        <div className="report-header">
                          <span className="report-id">{report.id}</span>
                          <span className={`priority-badge ${getPriorityColor(report.priority)}`}>
                            {report.priority === 'high' ? 'Prioritas Tinggi' : report.priority === 'medium' ? 'Prioritas Sedang' : 'Prioritas Rendah'}
                          </span>
                        </div>
                        <h3>{report.title}</h3>
                        <div className="report-meta">
                          <span className="report-category">{report.category}</span>
                          <span className="report-reporter">Dilaporkan oleh: {report.reporter}</span>
                          <span className="report-date">{formatDate(report.date)}</span>
                        </div>
                      </div>
                      <div className="report-actions">
                        <span className={`status-badge ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <Link to={`/detail/${report.id}`} className="btn-view">
                          Lihat Detail
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="content-section">
                <div className="section-header">
                  <h2>Statistik Sistem</h2>
                </div>

                <div className="info-grid">
                  <div className="info-card">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="9" cy="7" r="4"></circle>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                    </svg>
                    <div>
                      <h4>Total Pengguna</h4>
                      <p>{stats.totalUsers}</p>
                    </div>
                  </div>
                  <div className="info-card">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                      <circle cx="8.5" cy="7" r="4"></circle>
                      <line x1="20" y1="8" x2="20" y2="14"></line>
                      <line x1="23" y1="11" x2="17" y2="11"></line>
                    </svg>
                    <div>
                      <h4>Pengguna Baru Bulan Ini</h4>
                      <p>{stats.newUsersThisMonth}</p>
                    </div>
                  </div>
                  <div className="info-card">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <div>
                      <h4>Rata-rata Waktu Respons</h4>
                      <p>{stats.avgResponseTime}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Reports Management Tab */}
          {activeTab === 'reports' && (
            <div className="reports-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>Kelola Laporan</h2>
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
                      placeholder="Cari laporan berdasarkan judul atau ID..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  <select
                    className="status-filter"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">Semua Status</option>
                    <option value="Menunggu Verifikasi">Menunggu Verifikasi</option>
                    <option value="Dalam Proses">Dalam Proses</option>
                    <option value="Selesai">Selesai</option>
                    <option value="Ditolak">Ditolak</option>
                  </select>
                </div>

                {/* Reports Table */}
                <div className="admin-table">
                  <div className="table-header">
                    <span className="col-id">ID</span>
                    <span className="col-title">Judul Laporan</span>
                    <span className="col-reporter">Pelapor</span>
                    <span className="col-date">Tanggal</span>
                    <span className="col-status">Status</span>
                    <span className="col-actions">Aksi</span>
                  </div>

                  {filteredReports.map((report) => (
                    <div key={report.id} className="table-row">
                      <div className="col-id">
                        <span className="report-id-badge">{report.id}</span>
                      </div>
                      <div className="col-title">
                        <span className="report-title-text">{report.title}</span>
                        <span className="report-category-text">{report.category}</span>
                      </div>
                      <div className="col-reporter">{report.reporter}</div>
                      <div className="col-date">{formatDate(report.date)}</div>
                      <div className="col-status">
                        <span className={`status-badge ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                      </div>
                      <div className="col-actions">
                        <button className="action-btn" title="Lihat Detail">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button className="action-btn" title="Edit Status">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                        <button className="action-btn danger" title="Hapus">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Users Management Tab */}
          {activeTab === 'users' && (
            <div className="users-content">
              <div className="content-section">
                <div className="section-header">
                  <h2>Kelola Pengguna</h2>
                </div>

                <div className="admin-table">
                  <div className="table-header">
                    <span className="col-name">Nama</span>
                    <span className="col-email">Email</span>
                    <span className="col-reports">Jumlah Laporan</span>
                    <span className="col-join">Tanggal Bergabung</span>
                    <span className="col-status">Status</span>
                    <span className="col-actions">Aksi</span>
                  </div>

                  {users.map((user) => (
                    <div key={user.id} className="table-row">
                      <div className="col-name">
                        <div className="user-avatar-small">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <span>{user.name}</span>
                      </div>
                      <div className="col-email">{user.email}</div>
                      <div className="col-reports">
                        <span className="badge-count">{user.reportsCount}</span>
                      </div>
                      <div className="col-join">{formatDate(user.joinDate)}</div>
                      <div className="col-status">
                        <span className="status-badge status-active">
                          {user.status === 'active' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </div>
                      <div className="col-actions">
                        <button className="action-btn" title="Lihat Detail">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                            <circle cx="12" cy="12" r="3"></circle>
                          </svg>
                        </button>
                        <button className="action-btn" title="Edit">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
