# Login Carousel Guide

## Overview
The login page now features an interactive carousel on the right side that automatically cycles through 3 feature slides every 5 seconds. Users can manually navigate using arrow buttons or dot indicators.

## Features

### Automatic Rotation
- Carousel auto-rotates every **5 seconds**
- Smooth fade transition between slides
- Rotation pauses when user manually interacts (can be added)

### Navigation Controls
1. **Left/Right Arrow Buttons**
   - Manual navigation to previous/next slide
   - Positioned on the left and right of the carousel
   - Hover effect with color change and lift animation

2. **Dot Indicators**
   - 3 dots representing each slide
   - Click any dot to jump to that slide
   - Active dot is highlighted in red with stretched width
   - Inactive dots are gray

3. **Keyboard Support**
   - Arrows and dots are keyboard accessible
   - Proper ARIA labels for screen readers

## Carousel Slides

### Slide 1: "Lapor dengan Mudah"
**Title**: Lapor dengan Mudah
**Description**: Sampaikan keluhan dan masalah Anda dalam beberapa klik sederhana
**Icon**: Document file
**Features**:
- ⚡ Proses laporan yang sederhana dan cepat
- 💬 Antarmuka yang user-friendly dan mudah digunakan

### Slide 2: "Pantau Perkembangan"
**Title**: Pantau Perkembangan
**Description**: Lihat status laporan Anda secara real-time dan dapatkan notifikasi
**Icon**: Refresh/refresh arrows
**Features**:
- 🔔 Notifikasi real-time untuk setiap update
- 👁️ Dashboard untuk memantau semua laporan Anda

### Slide 3: "Data Aman & Terjamin"
**Title**: Data Aman & Terjaman
**Description**: Privasi dan keamanan data Anda adalah prioritas utama kami
**Icon**: Shield
**Features**:
- 🔒 Enkripsi tingkat enterprise untuk semua data
- ✓ Sistem keamanan berlapis untuk proteksi maksimal

## Component Structure

```jsx
<div className="login-right">
  <div className="carousel-container">
    {/* Carousel Slides */}
    <div className="carousel-wrapper">
      {slides.map((slide) => (
        <div className="carousel-slide active">
          <div className="slide-content">
            <div className="slide-icon">{icon}</div>
            <h2 className="slide-title">{title}</h2>
            <p className="slide-description">{description}</p>
            <div className="slide-features">
              {/* Feature rows */}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Navigation Controls */}
    <div className="carousel-controls">
      <button className="carousel-btn carousel-prev">←</button>
      <div className="carousel-dots">
        <button className="dot active"></button>
        <button className="dot"></button>
        <button className="dot"></button>
      </div>
      <button className="carousel-btn carousel-next">→</button>
    </div>

    {/* Tagline */}
    <p className="carousel-tagline">Wujudkan Perubahan Bersama LaporGaruda</p>
  </div>
</div>
```

## Styling Details

### Carousel Container
- **Width**: 100%, max-width 500px
- **Height**: 500px
- **Background**: White (#ffffff)
- **Border Radius**: 16px
- **Shadow**: 0 10px 40px rgba(0, 0, 0, 0.15)
- **Overflow**: Hidden (clips content)

### Slides
- **Position**: Absolute (stacked on top of each other)
- **Opacity**: 0 (hidden by default)
- **Transition**: Fade effect (0.3s ease)
- **Active Slide**: opacity: 1

### Slide Icon
- **Size**: 64px × 64px
- **Background**: Light red gradient with 10% opacity
- **Border Radius**: 12px
- **Color**: Primary light red (#990000)

### Controls
- **Prev/Next Buttons**: 40px square with 8px border-radius
- **Border**: 1.5px solid #e0e0e0
- **Hover**: Color changes to red, lifts up
- **Dots**: 10px circles, 28px wide when active
- **Dot Color**: Gray (#ddd) inactive, Red (#990000) active

## JavaScript Logic

### State Management
```javascript
const [currentSlide, setCurrentSlide] = useState(0);
```

### Auto-Rotation
```javascript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, 5000); // 5 seconds
  return () => clearInterval(interval);
}, [slides.length]);
```

### Navigation Functions
```javascript
const nextSlide = () => {
  setCurrentSlide((prev) => (prev + 1) % slides.length);
};

const prevSlide = () => {
  setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
};

const goToSlide = (index) => {
  setCurrentSlide(index);
};
```

## Customization

### Add New Slides
Edit the `slides` array in Login.jsx:

```javascript
const slides = [
  {
    title: "Your Title",
    description: "Your description",
    icon: "document", // or "refresh", "shield"
    features: [
      { icon: "lightning", text: "Feature 1" },
      { icon: "message", text: "Feature 2" }
    ]
  },
  // ... more slides
];
```

### Change Auto-Rotation Speed
Find this line and change the interval value (in milliseconds):
```javascript
}, 5000); // Change 5000 to your preferred milliseconds
```

### Add Icons
Add new icon SVGs in the `getIconSvg()` function:
```javascript
const icons = {
  "your-icon": (
    <svg>
      {/* SVG content */}
    </svg>
  ),
  // ... more icons
};
```

### Modify Styles
Edit `.carousel-wrapper`, `.carousel-slide`, `.slide-icon`, etc. in `_login.scss`

## Responsive Behavior

### Desktop (1024px+)
- Carousel visible on the right side
- Full 500px width
- 500px height

### Tablet & Mobile (< 1024px)
- Carousel hidden (display: none)
- Login form takes full width
- Mobile-optimized form layout

## Animations

### Slide Transition
- **Type**: Fade in/out
- **Duration**: 0.3s
- **Easing**: ease (default)
- **Effect**: Smooth opacity change

### Arrow Button Hover
- **Transform**: translateY(-2px) - lifts up
- **Color**: Changes to primary red
- **Duration**: 0.3s

### Dot Indicator Active
- **Width**: 10px → 28px
- **Border Radius**: 50% → 5px
- **Background**: #ddd → #990000

## Accessibility

- Arrow buttons have aria-labels
- Dot buttons have aria-labels with slide numbers
- Semantic button elements
- Keyboard navigation support
- Screen reader friendly

## Performance

- Carousel auto-rotates without blocking
- Smooth CSS transitions
- No heavy computations
- Cleanup interval on unmount
- Optimized re-renders

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Known Limitations

- Carousel is hidden on mobile/tablet (by design)
- Auto-rotation interval is fixed (can be made configurable)
- Touch swipe gestures not yet implemented (can be added)

## Future Enhancements

Possible improvements:
1. Touch/swipe gesture support
2. Pause on hover
3. Keyboard arrow key support
4. Infinite scroll animation option
5. Custom interval timing (configurable)
6. Slide transition effects (slide left/right option)
