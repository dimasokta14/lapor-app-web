# Login Page Setup Guide

## Overview
A fully styled login page component has been created that matches the LaporGaruda! theme with the Gerindra color palette (deep red theme).

## Files Created

1. **Component**: `src/components/Login.jsx`
   - Complete login form with email and password fields
   - Password visibility toggle
   - Remember me checkbox
   - Forgot password link
   - Social login buttons (Google & Facebook)
   - Info section with 3 feature boxes
   - Form validation and loading state

2. **Styles**: `src/styles/components/_login.scss`
   - Responsive design (mobile, tablet, desktop)
   - Gradient backgrounds matching theme
   - Smooth animations
   - Form input styling
   - Button hover effects
   - Backdrop blur effects

## How to Use

### Option 1: Add Login as a Route (Recommended)
If you're using React Router, add this to your routing configuration:

```jsx
import Login from './components/Login';

// In your router setup
<Route path="/login" element={<Login />} />
```

### Option 2: Import and Use in App
Simply import the Login component in your App.jsx:

```jsx
import Login from './components/Login';

function App() {
  // Show login page
  return <Login />;
}
```

### Option 3: Update Header Login Button
Connect the existing Login button in Header to navigate to the login page:

```jsx
// In Header.jsx
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();

  return (
    // ... header code ...
    <button className="btn btn-primary" onClick={() => navigate('/login')}>
      Login
    </button>
  );
};
```

## Features Included

### Form Fields
- ✅ Email input with validation
- ✅ Password input with show/hide toggle
- ✅ Remember me checkbox
- ✅ Forgot password link

### Functionality
- ✅ Form submission handling
- ✅ Loading state with spinner animation
- ✅ Smooth form interactions
- ✅ Responsive design for all devices
- ✅ Accessibility features (aria-labels, semantic HTML)

### Design Elements
- ✅ Gradient background matching theme
- ✅ Glassmorphic card design
- ✅ Social login buttons (Google & Facebook)
- ✅ Info section with feature highlights
- ✅ Smooth animations and transitions
- ✅ Mobile-optimized layout

## Customization

### Change Colors
Colors are defined in `src/styles/abstracts/_variables.scss`. The login page uses:
- Primary colors: Deep red palette (#990000, #730000, etc.)
- Text colors: White and light red accents
- Backgrounds: Transparent overlays with glass effect

### Update Form Submission
In `src/components/Login.jsx`, update the `handleSubmit` function:

```jsx
const handleSubmit = (e) => {
  e.preventDefault();
  setIsLoading(true);

  // Replace with your API call
  fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  .then(res => res.json())
  .then(data => {
    // Handle successful login
    setIsLoading(false);
  })
  .catch(err => {
    // Handle error
    setIsLoading(false);
  });
};
```

### Update Social Login
Replace social button links to handle OAuth:

```jsx
const handleGoogleLogin = () => {
  // Initialize Google OAuth flow
  window.location.href = `${process.env.VITE_GOOGLE_AUTH_URL}`;
};
```

## Responsive Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 1023px
- **Desktop**: ≥ 1024px

The layout automatically adapts:
- Two-column layout on desktop
- Single-column (stacked) on mobile/tablet
- Form takes priority and appears below on mobile

## Browser Compatibility
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies
- React (already installed)
- SCSS (already configured)
- No additional packages required

## Next Steps
1. Import the Login component into your routing setup
2. Update form submission to connect to your API
3. Customize colors if needed (optional)
4. Test on different screen sizes
5. Connect OAuth providers if needed
