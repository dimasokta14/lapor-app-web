import React from 'react';

const ConnectedInstitutions = () => {
  const institutions = [
    {
      name: "Kementerian Dalam Negeri",
      logo: "🏛️",
      category: "Kementerian"
    },
    {
      name: "Kepolisian Negara RI",
      logo: "🚔",
      category: "Keamanan"
    },
    {
      name: "Komisi Pemberantasan Korupsi",
      logo: "⚖️",
      category: "Antikorupsi"
    },
    {
      name: "Ombudsman RI",
      logo: "🏢",
      category: "Pengawasan"
    },
    {
      name: "Kementerian Kesehatan",
      logo: "🏥",
      category: "Kesehatan"
    },
    {
      name: "Kementerian Pendidikan",
      logo: "🎓",
      category: "Pendidikan"
    },
    {
      name: "Badan Pertanahan Nasional",
      logo: "🗺️",
      category: "Pertanahan"
    },
    {
      name: "Kementerian Lingkungan Hidup",
      logo: "🌿",
      category: "Lingkungan"
    }
  ];

  return (
    <section className="connected-institutions section">
      <div className="container">
        <h2 className="section-title">Instansi Terhubung</h2>
        <p className="section-subtitle">
          Laporan Anda akan langsung diteruskan kepada instansi yang berwenang
        </p>

        <div className="institutions-grid">
          {institutions.map((institution, index) => (
            <div key={index} className="institution-card">
              <div className="institution-logo">{institution.logo}</div>
              <h3 className="institution-name">{institution.name}</h3>
              <span className="institution-category">{institution.category}</span>
            </div>
          ))}
        </div>

        <div className="institutions-footer">
          <p>Dan 50+ instansi lainnya yang siap melayani laporan Anda</p>
          <button className="btn btn-secondary">Lihat Semua Instansi</button>
        </div>
      </div>
    </section>
  );
};

export default ConnectedInstitutions;