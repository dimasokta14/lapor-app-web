# Login Page Layout Guide

## Layout Structure

The login page uses a fixed full-screen overlay with the following hierarchy:

```
.login-page (fixed, z-index: 999)
├── .login-background (fixed gradient background, z-index: -2)
├── .login-overlay (fixed dark overlay, z-index: -1)
├── .login-close (fixed button, z-index: 1001)
└── .login-container (relative, z-index: 1)
    ├── .login-card (white card with form)
    │   ├── .login-header
    │   ├── .login-form
    │   ├── .login-divider
    │   ├── .social-login
    │   └── .login-signup
    └── .login-info-section (info boxes)
        ├── .info-box
        ├── .info-box
        └── .info-box
```

## Key Layout Properties

### Login Page (`.login-page`)
- **Position**: `fixed` (covers entire viewport)
- **Size**: `100% width × 100vh height`
- **Display**: `flex` (centers content)
- **Z-index**: 999 (top layer)
- **Purpose**: Full-screen container

### Login Container (`.login-container`)
- **Display**: `grid` with 2 columns on desktop
- **Gap**: 80px between columns
- **Max-width**: 1400px
- **Responsive**:
  - **Tablet (< 1024px)**: Single column layout, max-width 600px
  - **Mobile (< 768px)**: Single column layout, full width with padding

### Login Card (`.login-card`)
- **Max-width**: 500px (desktop), 100% (mobile)
- **Background**: Semi-transparent white with blur effect
- **Padding**: 60px 50px (desktop), 40px 25px (mobile)
- **Animation**: Slides in from left

### Info Section (`.login-info-section`)
- **Max-width**: 400px (desktop), 100% (mobile)
- **Display**: Flex column
- **Animation**: Slides in from right
- **Responsive**: Stacks above form on tablet/mobile

## Responsive Breakpoints

### Desktop (>= 1024px)
- Two-column layout (form + info)
- Info boxes visible beside form
- Full padding and spacing

### Tablet (768px - 1023px)
- Single-column stacked layout
- Form below info section (`order: 2`)
- Info section on top (`order: 1`)
- Reduced gap between columns

### Mobile (< 768px)
- Single-column layout
- All elements stack vertically
- Reduced padding
- Simplified spacing
- User name and buttons hidden from header

## Z-Index Stack

```
1001  ← .login-close (close button)
999   ← .login-page (main container)
...
-1    ← .login-overlay (dark overlay)
-2    ← .login-background (gradient background)
```

## Common Issues & Fixes

### Issue: Elements Appear Broken on Mobile
**Solution**: Check that `@include mobile` media queries are applied to:
- `.login-container` - reduced gap and max-width
- `.login-card` - 100% max-width
- `.login-info-section` - 100% max-width
- `.login-page` - reduced padding

### Issue: Close Button Not Clickable
**Solution**: Ensure `.login-close` has:
- `position: fixed` (not absolute)
- `z-index: 1001` (above overlay)
- `cursor: pointer`

### Issue: Content Overflows on Small Screens
**Solution**: Add explicit width constraints:
- `.login-container` → `max-width` for each breakpoint
- `.login-card` → `max-width: 500px` with responsive 100%
- `.login-info-section` → `max-width: 400px` with responsive 100%

### Issue: Layout Not Centering
**Solution**: Verify `.login-page` has:
- `display: flex`
- `align-items: center`
- `justify-content: center`

## Testing Checklist

- [ ] Desktop (1440px+): Two columns side by side
- [ ] Tablet (768px-1023px): Single column, stacked
- [ ] Mobile (< 768px): Full width, stacked
- [ ] Close button visible and clickable
- [ ] Form fields display properly
- [ ] No horizontal scroll
- [ ] No overlapping elements
- [ ] Animations play smoothly
- [ ] Background blur effect visible
- [ ] Info boxes display correctly
