import React from 'react';

const StatisticsSection = () => {
  const stats = [
    {
      number: "12,450",
      label: "Total Laporan",
      description: "Laporan yang masuk"
    },
    {
      number: "9,872",
      label: "Selesai",
      description: "Laporan terselesaikan"
    },
    {
      number: "2,108",
      label: "Proses",
      description: "Sedang ditindaklanjuti"
    },
    {
      number: "470",
      label: "Menunggu",
      description: "Menunggu verifikasi"
    }
  ];

  return (
    <section className="statistics-section">
      <div className="container">
        <div className="stats-content">
          <div className="stats-text">
            <h2 className="stats-title">Statistik Laporan</h2>
            <p className="stats-description">
              Data real-time mengenai perkembangan penanganan laporan masyarakat.
              Kami berkomitmen untuk memberikan pelayanan yang transparan dan responsif.
            </p>
            <button className="btn btn-outline" style={{color: "#fff", border: "2px solid #fff"}}>Lihat Detail</button>
          </div>

          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-description">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StatisticsSection;