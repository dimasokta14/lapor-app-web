import React from 'react';

const ReportClassification = () => {
  const classifications = [
    {
      title: "Pengaduan",
      description: "Sampaikan keluhan dan masalah yang Anda alami",
      icon: "📢",
      count: "8,250"
    },
    {
      title: "Aspirasi",
      description: "Berikan saran dan usulan untuk kemajuan daerah",
      icon: "💡",
      count: "3,150"
    },
    {
      title: "Permintaan Informasi",
      description: "Akses informasi publik yang Anda butuhkan",
      icon: "ℹ️",
      count: "1,050"
    }
  ];

  return (
    <section className="report-classification section">
      <div className="container">
        <h2 className="section-title">Jenis Laporan</h2>
        <p className="section-subtitle">
          Pilih kategori laporan yang sesuai dengan kebutuhan Anda
        </p>

        <div className="classification-grid">
          {classifications.map((item, index) => (
            <div key={index} className="classification-card">
              <div className="card-icon">{item.icon}</div>
              <h3 className="card-title">{item.title}</h3>
              <p className="card-description">{item.description}</p>
              <div className="card-count">{item.count} laporan</div>
              {/* <button className="btn btn-outline">Pilih Kategori</button> */}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportClassification;