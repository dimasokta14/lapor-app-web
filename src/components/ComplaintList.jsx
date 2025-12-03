import React from 'react';

const ComplaintList = () => {
  const complaints = [
    {
      id: 'LGMB68632186',
      title: 'Genangan air di depan Hotel Grand HD',
      description: 'Genangan air di depan Hotel Grand HD besole, ceper, kabupaten klaten, dulu pernah banjir dan menyebabkan macet, menurut...',
      location: 'Klaten',
      date: '2 hari yang lalu',
      status: 'Dalam Proses',
      image: 'https://images.unsplash.com/photo-1547683905-f686c993aae5?w=400&h=300&fit=crop'
    },
    {
      id: 'LGWP21426501',
      title: 'Permohonan lampu lalu lintas',
      description: 'Assalamualaikum yth kepada dishub jalan ruwas provinsi wonotunggal aduan lgwp21426501 permohonan lampu lalu lintas...',
      location: 'Wonotunggal',
      date: '3 hari yang lalu',
      status: 'Menunggu Review',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop'
    },
    {
      id: 'LGIG97533293',
      title: 'Jalan rusak parah dan licin',
      description: 'Izin melapor min, jalan gunungwungkal-ngablak (kabupaten pati) rusak parah dan licin ketika hujan, jalan tersebut adalah...',
      location: 'Pati',
      date: '5 hari yang lalu',
      status: 'Selesai',
      image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&h=300&fit=crop'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Selesai':
        return '#48BB78';
      case 'Dalam Proses':
        return '#667eea';
      case 'Menunggu Review':
        return '#ED8936';
      default:
        return '#718096';
    }
  };

  return (
    <section className="complaint-list section">
      <div className="container">
        <h2 className="section-title">Aduan - Aduan Masyarakat</h2>
        <p className="list-subtitle">
          Lihat aduan terbaru dari masyarakat
        </p>

        <div className="complaints-grid">
          {complaints.map((complaint, index) => (
            <div key={index} className="complaint-card fade-in">
              <div className="complaint-image">
                <img src={complaint.image} alt={complaint.title} />
                <div 
                  className="complaint-status"
                  style={{ background: getStatusColor(complaint.status) }}
                >
                  {complaint.status}
                </div>
              </div>

              <div className="complaint-content">
                <div className="complaint-meta">
                  <span className="complaint-id">{complaint.id}</span>
                  <span className="complaint-date">{complaint.date}</span>
                </div>

                <h3 className="complaint-title">{complaint.title}</h3>
                <p className="complaint-description">{complaint.description}</p>

                <div className="complaint-footer">
                  <div className="complaint-location">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    {complaint.location}
                  </div>
                  <button className="btn-detail">
                    Lihat Detail
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="view-all">
          <button className="btn btn-primary">Lihat Semua Aduan</button>
        </div>
      </div>
    </section>
  );
};

export default ComplaintList;
