import { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const ReportingProcess = () => {
  const { openReportForm } = useContext(AuthContext);
  const steps = [
    {
      number: "1",
      title: "Tulis Aspirasi",
      description: "Sampaikan aspirasi dan pengaduan Anda dengan jelas dan lengkap kepada Gerindra"
    },
    {
      number: "2",
      title: "Proses Verifikasi",
      description: "Tim Gerindra akan menelaah dan memvalidasi aspirasi Anda"
    },
    {
      number: "3",
      title: "Tindak Lanjut",
      description: "Partai Gerindra atau instansi terkait akan menindaklanjuti sesuai kewenangan"
    },
    {
      number: "4",
      title: "Beri Rating",
      description: "Berikan penilaian terhadap penanganan aspirasi Anda"
    }
  ];

  return (
    <section className="reporting-process section">
      <div className="container">
        <h2 className="section-title">Cara Menyampaikan Aspirasi Anda</h2>
        <p className="section-subtitle">
          Ikuti langkah-langkah mudah untuk menyampaikan aspirasi dan pengaduan kepada Partai Gerindra
        </p>

        <div className="process-steps">
          {steps.map((step, index) => (
            <div key={index} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-content">
                <h3 className="step-title">{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              {index < steps.length - 1 && <div className="step-connector"></div>}
            </div>
          ))}
        </div>

        <div className="process-cta">
          <button className="btn btn-primary btn-large" onClick={openReportForm}>
            Mulai Sampaikan Aspirasi
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReportingProcess;