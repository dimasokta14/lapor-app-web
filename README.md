# LaporGub! - Clone Website

Clone dari website LaporGub! (Portal Laporan Pengaduan Online Provinsi Jawa Tengah) menggunakan React + Vite.

## Fitur

- ✅ Hero section dengan statistik
- ✅ Form lacak aduan
- ✅ Section aplikasi JNN (Jateng Ngopeni Nglakoni)
- ✅ Form pembuatan aduan (dengan login)
- ✅ Kanal aduan media sosial
- ✅ Daftar aduan masyarakat
- ✅ Responsive design
- ✅ Animasi smooth
- ✅ Modern UI dengan gradient

## Tech Stack

- React 18
- Vite
- CSS3 (dengan animasi)
- SVG Icons

## Instalasi

1. Clone repository ini
2. Install dependencies:
```bash
npm install
```

3. Jalankan development server:
```bash
npm run dev
```

4. Buka browser di `http://localhost:5173`

## Build untuk Production

```bash
npm run build
```

File hasil build akan ada di folder `dist/`

## Preview Production Build

```bash
npm run preview
```

## Struktur Project

```
laporgub-clone/
├── src/
│   ├── components/
│   │   ├── Header.jsx & Header.css
│   │   ├── Hero.jsx & Hero.css
│   │   ├── TrackComplaint.jsx & TrackComplaint.css
│   │   ├── JNNSection.jsx & JNNSection.css
│   │   ├── CreateComplaint.jsx & CreateComplaint.css
│   │   ├── OtherChannels.jsx & OtherChannels.css
│   │   ├── ComplaintList.jsx & ComplaintList.css
│   │   └── Footer.jsx & Footer.css
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## Customization

Untuk mengubah warna gradient utama, edit variabel di file CSS masing-masing component:
- Primary gradient: `#667eea` → `#764ba2`

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License

## Credits

Design inspired by https://laporgub.jatengprov.go.id/
