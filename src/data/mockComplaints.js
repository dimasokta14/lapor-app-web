// Mock data for recent complaints/aspirations
export const mockComplaints = [
  {
    id: 'LGMB00001234',
    category: 'Pengaduan',
    title: 'Perbaikan Jalan Rusak di Wilayah Kelurahan Mangga Dua',
    location: 'Jakarta Utara, DKI Jakarta',
    date: '2025-12-08',
    status: 'Selesai',
    description: 'Mohon perhatian untuk perbaikan jalan yang rusak parah di area Kelurahan Mangga Dua. Kondisi jalan berlubang dan membahayakan pengendara.'
  },
  {
    id: 'LGMB00001235',
    category: 'Aspirasi',
    title: 'Usulan Pembangunan Taman Kota untuk Warga',
    location: 'Surabaya, Jawa Timur',
    date: '2025-12-07',
    status: 'Proses',
    description: 'Kami mengusulkan pembangunan taman kota sebagai ruang publik untuk kegiatan warga dan area rekreasi keluarga.'
  },
  {
    id: 'LGMB00001236',
    category: 'Permintaan Informasi',
    title: 'Informasi Program Bantuan UMKM 2025',
    location: 'Bandung, Jawa Barat',
    date: '2025-12-07',
    status: 'Verifikasi',
    description: 'Mohon informasi lengkap mengenai program bantuan untuk UMKM yang diluncurkan tahun 2025, termasuk syarat dan cara pendaftaran.'
  },
  {
    id: 'LGMB00001237',
    category: 'Pengaduan',
    title: 'Keluhan Pelayanan Administrasi Kependudukan',
    location: 'Semarang, Jawa Tengah',
    date: '2025-12-06',
    status: 'Proses',
    description: 'Proses pengurusan KTP memakan waktu terlalu lama dan prosedurnya berbelit-belit. Mohon dipercepat dan dipermudah.'
  },
  {
    id: 'LGMB00001238',
    category: 'Aspirasi',
    title: 'Penambahan Fasilitas Kesehatan di Daerah Terpencil',
    location: 'Lampung, Sumatera',
    date: '2025-12-06',
    status: 'Menunggu',
    description: 'Usulan penambahan puskesmas atau klinik kesehatan di daerah terpencil yang masih minim akses layanan kesehatan.'
  },
  {
    id: 'LGMB00001239',
    category: 'Pengaduan',
    title: 'Masalah Drainase dan Banjir saat Musim Hujan',
    location: 'Bekasi, Jawa Barat',
    date: '2025-12-05',
    status: 'Selesai',
    description: 'Setiap musim hujan, area perumahan kami selalu kebanjiran karena sistem drainase yang buruk. Mohon segera diperbaiki.'
  },
  {
    id: 'LGMB00001240',
    category: 'Permintaan Informasi',
    title: 'Info Program Beasiswa untuk Pelajar Kurang Mampu',
    location: 'Yogyakarta, DI Yogyakarta',
    date: '2025-12-05',
    status: 'Selesai',
    description: 'Mohon informasi detail program beasiswa yang tersedia untuk pelajar dari keluarga kurang mampu tingkat SMA dan perguruan tinggi.'
  },
  {
    id: 'LGMB00001241',
    category: 'Aspirasi',
    title: 'Usulan Peningkatan Keamanan Lingkungan',
    location: 'Tangerang, Banten',
    date: '2025-12-04',
    status: 'Proses',
    description: 'Mengusulkan peningkatan sistem keamanan lingkungan dengan penambahan pos keamanan dan patroli rutin di malam hari.'
  },
  {
    id: 'LGMB00001242',
    category: 'Pengaduan',
    title: 'Keluhan Kualitas Air Bersih PDAM',
    location: 'Malang, Jawa Timur',
    date: '2025-12-04',
    status: 'Verifikasi',
    description: 'Kualitas air PDAM yang mengalir ke rumah warga keruh dan berbau. Mohon dilakukan pengecekan dan perbaikan sistem.'
  },
  {
    id: 'LGMB00001243',
    category: 'Aspirasi',
    title: 'Usulan Pelatihan Keterampilan untuk Warga',
    location: 'Depok, Jawa Barat',
    date: '2025-12-03',
    status: 'Menunggu',
    description: 'Mengusulkan program pelatihan keterampilan gratis untuk warga yang ingin meningkatkan kemampuan dan membuka usaha.'
  },
  {
    id: 'LGMB00001244',
    category: 'Permintaan Informasi',
    title: 'Informasi Jadwal Pemeriksaan Kesehatan Gratis',
    location: 'Solo, Jawa Tengah',
    date: '2025-12-03',
    status: 'Selesai',
    description: 'Mohon informasi jadwal dan lokasi pelaksanaan pemeriksaan kesehatan gratis yang diadakan oleh pemerintah.'
  },
  {
    id: 'LGMB00001245',
    category: 'Pengaduan',
    title: 'Keluhan Sampah Menumpuk di TPS',
    location: 'Bogor, Jawa Barat',
    date: '2025-12-02',
    status: 'Proses',
    description: 'Sampah di TPS lingkungan kami tidak diangkut secara rutin sehingga menumpuk dan menimbulkan bau tidak sedap.'
  }
];

// Helper function to get complaints by status
export const getComplaintsByStatus = (status) => {
  return mockComplaints.filter(complaint => complaint.status === status);
};

// Helper function to get recent complaints (limit)
export const getRecentComplaints = (limit = 6) => {
  return mockComplaints.slice(0, limit);
};

// Helper function to get complaint statistics
export const getComplaintStats = () => {
  return {
    total: mockComplaints.length,
    selesai: mockComplaints.filter(c => c.status === 'Selesai').length,
    proses: mockComplaints.filter(c => c.status === 'Proses').length,
    verifikasi: mockComplaints.filter(c => c.status === 'Verifikasi').length,
    menunggu: mockComplaints.filter(c => c.status === 'Menunggu').length
  };
};
