# Floating Contact Bubbles Documentation

## Overview
Two interactive floating contact bubbles have been added to all pages of the website:
1. **WhatsApp Bubble** - Opens a message box for direct WhatsApp communication
2. **Email Bubble** - Shows a menu with company email addresses

## Features

### WhatsApp Bubble (Green)
- **Location**: Bottom-right corner of every page
- **Functionality**: 
  - Click to open a message input modal
  - Type your message (up to 500 characters)
  - Click "Send Message" to open WhatsApp with pre-filled message
  - Message is sent to: +234 9067004758
- **Keyboard Shortcuts**:
  - Press Enter to send (Shift+Enter for new line)
  - Press ESC to close modal

### Email Bubble (Red)
- **Location**: Below WhatsApp bubble in bottom-right corner
- **Functionality**:
  - Hover (desktop) or click (mobile) to show email menu
  - Three company emails available:
    1. famoustechnq@gmail.com
    2. info@famoustech.com
    3. support@famoustech.com
  - Click any email to open default email client

## Design Features
- **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Animations**: 
  - Smooth fade-in on page load
  - Pulse animation to draw attention
  - Hover effects with scale transformation
  - Smooth modal transitions
- **Non-intrusive**: 
  - Fixed positioning doesn't interfere with page content
  - High z-index (9999) ensures visibility
  - Proper spacing from page edges
- **Accessibility**:
  - Tooltips on hover
  - Keyboard navigation support
  - Clear visual feedback

## Files Added/Modified

### New Files Created:
1. `css/floating-bubbles.css` - All styling for the bubbles
2. `js/floating-bubbles.js` - All functionality and interactions

### Modified Files:
All HTML pages updated with references to the new CSS and JS files:
- index.html
- about.html
- contact.html
- service.html
- certificates.html
- 404.html

## Configuration

### To Change WhatsApp Number:
Edit `js/floating-bubbles.js`, line 5:
```javascript
const WHATSAPP_NUMBER = '+2349067004758'; // Change this number
```

### To Change Email Addresses:
Edit `js/floating-bubbles.js`, lines 6-10:
```javascript
const COMPANY_EMAILS = [
    'famoustechnq@gmail.com',
    'info@famoustech.com',
    'support@famoustech.com'
];
```

### To Change Colors:
Edit `css/floating-bubbles.css`:
- WhatsApp bubble: Lines 18-19 (green gradient)
- Email bubble: Lines 38-39 (red gradient)

### To Change Position:
Edit `css/floating-bubbles.css`, lines 3-4:
```css
bottom: 30px; /* Distance from bottom */
right: 30px;  /* Distance from right */
```

## Browser Compatibility
- Chrome/Edge: ✓ Full support
- Firefox: ✓ Full support
- Safari: ✓ Full support
- Mobile browsers: ✓ Full support

## Technical Details
- Pure JavaScript (no jQuery dependency for bubbles)
- CSS3 animations and transitions
- Mobile-first responsive design
- Event delegation for optimal performance
- Prevents conflicts with existing page functionality

## Testing Checklist
- [x] Bubbles appear on all pages
- [x] WhatsApp modal opens and closes properly
- [x] WhatsApp message sends correctly
- [x] Email menu shows on hover/click
- [x] Email links open default email client
- [x] Responsive on mobile devices
- [x] No conflicts with existing content
- [x] Animations work smoothly
- [x] Keyboard shortcuts function properly

## Support
For any issues or customization requests, contact the development team.
