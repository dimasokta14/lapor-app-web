import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ReportFormModal = () => {
  const { showReportForm, closeReportForm, isLoggedIn, openLoginPage } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    reportType: 'PENGADUAN',
    reportTitle: '',
    reportContent: '',
    eventDate: '',
    location: '',
    targetInstitution: '',
    reportCategory: '',
    attachments: [],
    isAnonymous: false,
    isPublic: false,
  });

  if (!showReportForm) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      attachments: files,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      closeReportForm();
      openLoginPage();
      return;
    }
    console.log('Report submitted:', formData);
    // Here you would typically send the data to a backend
    closeReportForm();
  };

  const handleClose = () => {
    closeReportForm();
  };

  const reportTypes = [
    { value: 'PENGADUAN', label: 'Pengaduan' },
    { value: 'ASPIRASI', label: 'Aspirasi' },
    { value: 'PERMINTAAN_INFO', label: 'Permintaan Informasi' },
  ];

  const reportCategories = [
    'Infrastruktur',
    'Kesehatan',
    'Pendidikan',
    'Keamanan',
    'Lingkungan',
    'Pelayanan Publik',
    'Lainnya',
  ];

  const institutions = [
    'Pemerintah Provinsi',
    'Pemerintah Kabupaten',
    'Pemerintah Kota',
    'Dinas Pendidikan',
    'Dinas Kesehatan',
    'Polda',
    'Lainnya',
  ];

  return (
    <div className="report-form-modal">
      <div className="report-modal-background" onClick={handleClose}>
        <div className="report-modal-overlay"></div>
      </div>

      <div className="report-modal-container">
        <button className="report-modal-close" onClick={handleClose} aria-label="Close form">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <div className="report-modal-content">
          <h1 className="report-modal-title">Sampaikan Laporan Anda</h1>
          <p className="report-modal-subtitle">
            Berikan informasi lengkap dan jelas tentang keluhan atau aspirasi Anda
          </p>

          <form onSubmit={handleSubmit} className="report-form">
            {/* Report Type Selection */}
            <div className="form-section">
              <label className="section-label">Pilih Jenis Laporan</label>
              <div className="report-type-buttons">
                {reportTypes.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    className={`report-type-btn ${formData.reportType === type.value ? 'active' : ''}`}
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        reportType: type.value,
                      }))
                    }
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Report Title */}
            <div className="form-group">
              <label htmlFor="reportTitle" className="form-label">
                Ketik Judul Laporan Anda <span className="required">*</span>
              </label>
              <input
                type="text"
                id="reportTitle"
                name="reportTitle"
                className="form-input"
                placeholder="Judul singkat dan jelas"
                value={formData.reportTitle}
                onChange={handleChange}
                required
              />
            </div>

            {/* Report Content */}
            <div className="form-group">
              <label htmlFor="reportContent" className="form-label">
                Ketik Isi Laporan Anda <span className="required">*</span>
              </label>
              <textarea
                id="reportContent"
                name="reportContent"
                className="form-textarea"
                placeholder="Jelaskan secara detail masalah atau keluhan Anda..."
                value={formData.reportContent}
                onChange={handleChange}
                rows="6"
                required
              ></textarea>
            </div>

            {/* Event Date */}
            <div className="form-group">
              <label htmlFor="eventDate" className="form-label">
                Pilih Tanggal Kejadian <span className="required">*</span>
              </label>
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                className="form-input"
                value={formData.eventDate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Location */}
            <div className="form-group">
              <label htmlFor="location" className="form-label">
                Ketik Lokasi Kejadian <span className="required">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-input"
                placeholder="Lokasi terjadinya kejadian"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            {/* Target Institution */}
            <div className="form-group">
              <label htmlFor="targetInstitution" className="form-label">
                Instansi Tujuan <span className="required">*</span>
              </label>
              <select
                id="targetInstitution"
                name="targetInstitution"
                className="form-select"
                value={formData.targetInstitution}
                onChange={handleChange}
                required
              >
                <option value="">Pilih instansi tujuan</option>
                {institutions.map((inst) => (
                  <option key={inst} value={inst}>
                    {inst}
                  </option>
                ))}
              </select>
            </div>

            {/* Report Category */}
            <div className="form-group">
              <label htmlFor="reportCategory" className="form-label">
                Pilih Kategori Laporan Anda <span className="required">*</span>
              </label>
              <select
                id="reportCategory"
                name="reportCategory"
                className="form-select"
                value={formData.reportCategory}
                onChange={handleChange}
                required
              >
                <option value="">Pilih kategori</option>
                {reportCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* File Upload */}
            <div className="form-group">
              <label htmlFor="attachments" className="form-label">
                Upload Lampiran (Opsional)
              </label>
              <div className="file-upload-wrapper">
                <input
                  type="file"
                  id="attachments"
                  name="attachments"
                  className="file-input"
                  multiple
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.png,.gif"
                />
                <div className="file-upload-area">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="12" y1="19" x2="12" y2="5"></line>
                    <line x1="9" y1="8" x2="15" y2="8"></line>
                  </svg>
                  <p>Klik atau seret file ke sini</p>
                  <span className="file-help-text">PDF, DOC, DOCX, JPG, PNG, GIF (max 5MB per file)</span>
                </div>
                {formData.attachments.length > 0 && (
                  <div className="file-list">
                    {formData.attachments.map((file, index) => (
                      <div key={index} className="file-item">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                        </svg>
                        <span>{file.name}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Checkboxes */}
            <div className="form-group form-checkboxes">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isAnonymous"
                  checked={formData.isAnonymous}
                  onChange={handleChange}
                />
                <span>Laporkan secara anonim</span>
              </label>
              {/* <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="isPublic"
                  checked={formData.isPublic}
                  onChange={handleChange}
                />
                <span>Buat laporan ini publik</span>
              </label> */}
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn-submit">
              LAPOR!
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReportFormModal;
