import React, { useState, useMemo, useEffect, useRef } from 'react';
import { mockComplaints } from '../../data/mockComplaints';

const BrowsePage = () => {
  // Filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('Semua');
  const [sortBy, setSortBy] = useState('Terbaru');

  // Dropdown states
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);

  // Refs for dropdown
  const categoryDropdownRef = useRef(null);
  const statusDropdownRef = useRef(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Categories for filter
  const categories = ['Pengaduan', 'Aspirasi', 'Permintaan Informasi'];
  const statuses = ['Selesai', 'Proses', 'Verifikasi', 'Menunggu'];
  const locations = [
    'Semua',
    'Jakarta', 'Surabaya', 'Bandung', 'Semarang', 'Yogyakarta',
    'Malang', 'Solo', 'Bogor', 'Bekasi', 'Tangerang', 'Depok', 'Lampung'
  ];

  // Filter and sort logic
  const filteredComplaints = useMemo(() => {
    let filtered = [...mockComplaints];

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(complaint =>
        complaint.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        complaint.location.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategories.length > 0) {
      filtered = filtered.filter(complaint => selectedCategories.includes(complaint.category));
    }

    // Status filter
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter(complaint => selectedStatuses.includes(complaint.status));
    }

    // Location filter
    if (selectedLocation !== 'Semua') {
      filtered = filtered.filter(complaint =>
        complaint.location.includes(selectedLocation)
      );
    }

    // Sort
    if (sortBy === 'Terbaru') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return filtered;
  }, [searchQuery, selectedCategories, selectedStatuses, selectedLocation, sortBy]);

  // Pagination logic
  const totalPages = Math.ceil(filteredComplaints.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentComplaints = filteredComplaints.slice(startIndex, endIndex);

  // Helper functions
  const getStatusClass = (status) => {
    const classes = {
      'Selesai': 'status-completed',
      'Proses': 'status-progress',
      'Verifikasi': 'status-verification',
      'Menunggu': 'status-pending'
    };
    return classes[status] || '';
  };

  const getCategoryClass = (category) => {
    const classes = {
      'Pengaduan': 'category-complaint',
      'Aspirasi': 'category-aspiration',
      'Permintaan Informasi': 'category-info'
    };
    return classes[category] || '';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('id-ID', options);
  };

  const truncateText = (text, maxLength = 120) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryToggle = (category) => {
    setSelectedCategories(prev => {
      if (prev.includes(category)) {
        return prev.filter(c => c !== category);
      } else {
        return [...prev, category];
      }
    });
    setCurrentPage(1);
  };

  const handleStatusToggle = (status) => {
    setSelectedStatuses(prev => {
      if (prev.includes(status)) {
        return prev.filter(s => s !== status);
      } else {
        return [...prev, status];
      }
    });
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategories([]);
    setSelectedStatuses([]);
    setSelectedLocation('Semua');
    setSortBy('Terbaru');
    setCurrentPage(1);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
      if (statusDropdownRef.current && !statusDropdownRef.current.contains(event.target)) {
        setStatusDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="browse-page">
      {/* Hero Section */}
      <section className="browse-hero">
        <div className="container">
          <h1 className="browse-title">Jelajah Aduan & Aspirasi</h1>
          <p className="browse-subtitle">
            Telusuri aduan dan aspirasi yang telah disampaikan masyarakat kepada Partai Gerindra
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="browse-filters">
        <div className="container">
          {/* Search Bar */}
          <div className="search-wrapper">
            <input
              type="text"
              className="search-input"
              placeholder="Cari aduan berdasarkan judul, deskripsi, atau lokasi..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
            />
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
          </div>

          {/* Inline Filter Group */}
          <div className="filters-inline-group">
            {/* Category Filter Dropdown */}
            <div className="filter-dropdown" ref={categoryDropdownRef}>
              <button
                className="filter-dropdown-btn"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                <span>
                  Kategori
                  {selectedCategories.length > 0 && (
                    <span className="filter-badge">{selectedCategories.length}</span>
                  )}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {categoryDropdownOpen && (
                <div className="filter-dropdown-menu">
                  {categories.map(cat => (
                    <label key={cat} className="filter-dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryToggle(cat)}
                      />
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Status Filter Dropdown */}
            <div className="filter-dropdown" ref={statusDropdownRef}>
              <button
                className="filter-dropdown-btn"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                <span>
                  Status
                  {selectedStatuses.length > 0 && (
                    <span className="filter-badge">{selectedStatuses.length}</span>
                  )}
                </span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {statusDropdownOpen && (
                <div className="filter-dropdown-menu">
                  {statuses.map(status => (
                    <label key={status} className="filter-dropdown-item">
                      <input
                        type="checkbox"
                        checked={selectedStatuses.includes(status)}
                        onChange={() => handleStatusToggle(status)}
                      />
                      <span>{status}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Location Filter */}
            <select
              className="filter-select"
              value={selectedLocation}
              onChange={(e) => {
                setSelectedLocation(e.target.value);
                setCurrentPage(1);
              }}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>Lokasi: {loc}</option>
              ))}
            </select>

            {/* Sort Filter */}
            <select
              className="filter-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="Terbaru">Urutkan: Terbaru</option>
              <option value="Terlama">Urutkan: Terlama</option>
            </select>

            {/* Reset Button */}
            <button className="btn-reset" onClick={resetFilters}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              Reset
            </button>
          </div>

          {/* Results Count */}
          <div className="results-info">
            <p>
              Menampilkan <strong>{startIndex + 1} - {Math.min(endIndex, filteredComplaints.length)}</strong> dari{' '}
              <strong>{filteredComplaints.length}</strong> hasil
            </p>
          </div>
        </div>
      </section>

      {/* Complaints Grid */}
      <section className="browse-results">
        <div className="container">
          {currentComplaints.length > 0 ? (
            <div className="complaints-grid">
              {currentComplaints.map((complaint) => (
                <div key={complaint.id} className="browse-card">
                  <div className="card-header">
                    <span className={`category-badge ${getCategoryClass(complaint.category)}`}>
                      {complaint.category}
                    </span>
                    <span className={`status-badge ${getStatusClass(complaint.status)}`}>
                      {complaint.status}
                    </span>
                  </div>

                  <h3 className="card-title">{complaint.title}</h3>

                  <div className="card-meta">
                    <div className="meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                        <circle cx="12" cy="10" r="3"></circle>
                      </svg>
                      <span>{complaint.location}</span>
                    </div>
                    <div className="meta-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>{formatDate(complaint.date)}</span>
                    </div>
                  </div>

                  <p className="card-description">
                    {truncateText(complaint.description)}
                  </p>

                  <div className="card-footer">
                    <span className="complaint-id">Kode: {complaint.id}</span>
                    <button className="btn-detail">Lihat Detail</button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="no-results">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>Tidak ada hasil ditemukan</h3>
              <p>Coba ubah filter atau kata kunci pencarian Anda</p>
              <button className="btn btn-secondary" onClick={resetFilters}>
                Reset Semua Filter
              </button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                &laquo; Sebelumnya
              </button>

              {[...Array(Math.min(5, totalPages))].map((_, index) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = index + 1;
                } else if (currentPage <= 3) {
                  pageNum = index + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + index;
                } else {
                  pageNum = currentPage - 2 + index;
                }

                return (
                  <button
                    key={pageNum}
                    className={`pagination-btn ${currentPage === pageNum ? 'active' : ''}`}
                    onClick={() => handlePageChange(pageNum)}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="pagination-dots">...</span>
                  <button
                    className="pagination-btn"
                    onClick={() => handlePageChange(totalPages)}
                  >
                    {totalPages}
                  </button>
                </>
              )}

              <button
                className="pagination-btn"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Selanjutnya &raquo;
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default BrowsePage;
