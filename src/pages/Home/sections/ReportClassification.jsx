import React from 'react';

const ReportClassification = () => {
  const classifications = [
    {
      title: "Pengaduan",
      description: "Laporkan masalah dan keluhan yang perlu ditangani Partai Gerindra",
      icon: "📢",
      count: "8,250"
    },
    {
      title: "Aspirasi",
      description: "Sampaikan ide dan usulan untuk kemajuan Indonesia bersama Gerindra",
      icon: "💡",
      count: "3,150"
    },
    {
      title: "Permintaan Informasi",
      description: "Dapatkan informasi publik dan program-program Gerindra",
      icon: "ℹ️",
      count: "1,050"
    }
  ];

  return (
    <section className="report-classification section">
      <div className="container">
        <h2 className="section-title">Kategori Layanan Aspirasi</h2>
        <p className="section-subtitle">
          Partai Gerindra menyediakan tiga kategori layanan untuk mendengar aspirasi rakyat.
          Pilih kategori yang sesuai dengan kebutuhan Anda.
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