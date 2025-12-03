import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

const ReportingProcess = () => {
  const { openReportForm } = useContext(AuthContext);
  const steps = [
    {
      number: "1",
      title: "Tulis Laporan",
      description: "Sampaikan aspirasi dan pengaduan Anda dengan jelas dan lengkap"
    },
    {
      number: "2",
      title: "Proses Verifikasi",
      description: "Tim verifikasi akan menelaah dan memvalidasi laporan Anda"
    },
    {
      number: "3",
      title: "Tindak Lanjut",
      description: "Instansi terkait akan menindaklanjuti laporan sesuai kewenangan"
    },
    {
      number: "4",
      title: "Beri Rating",
      description: "Berikan penilaian terhadap penanganan laporan Anda"
    }
  ];

  return (
    <section className="reporting-process section">
      <div className="container">
        <h2 className="section-title">Cara Melaporkan</h2>
        <p className="section-subtitle">
          Ikuti langkah-langkah mudah untuk menyampaikan laporan Anda
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
            Mulai Melaporkan
          </button>
        </div>
      </div>
    </section>
  );
};

export default ReportingProcess;