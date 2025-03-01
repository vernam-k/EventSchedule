# April Event Schedule

A beautiful, mobile-friendly event scheduling website for managing activities and notes during a multi-day event in April.

## Features

### Core Features

- **Event Management**
  - Add, edit, and delete activities
  - Color-coded activities
  - Flexible duration options (10min to 2 hours)
  - Automatic time-based sorting
  - Support for concurrent events

- **Day Navigation**
  - Easy switching between event days
  - Collapsible navigation on mobile
  - Clear day labels and descriptions

- **Notes Section**
  - Event requirements and notes
  - Shared notes visible to all users
  - Easy editing and management

- **Security**
  - Simple secret phrase protection
  - No login required
  - Shared access with "community" phrase

- **Mobile-First Design**
  - Responsive layout
  - Touch-friendly interface
  - Space-efficient navigation
  - Optimized for all screen sizes

- **Real-Time Updates**
  - 30-second automatic polling
  - No refresh needed to see changes
  - Proper cache control
  - Immediate feedback

### Enhanced Features

- **Dark Mode**
  - Toggle between light and dark themes
  - Preference saved in localStorage
  - Optimized color scheme for both modes

- **Search Functionality**
  - Search across all activities and notes
  - Highlighted search results
  - Quick navigation to search results

- **Keyboard Shortcuts**
  - `/` or `Ctrl+F` to focus search
  - `Alt+N` to add new activity
  - `Alt+M` to add new note
  - `Esc` to close modals
  - Number keys `1-7` to switch between days
  - Shortcut help accessible from footer

- **User Experience Improvements**
  - Enhanced typography and readability
  - Improved card and button designs
  - Subtle animations and transitions
  - Better form field interactions
  - Accessibility enhancements

- **User Preferences**
  - Remembers last viewed day
  - Saves dark mode preference
  - Persistent between sessions

## Event Days

- April 16th: Arrival Day
- April 17th: Arrival Day
- April 18th: Main Events
- April 19th: Main Events
- April 20th: Main Events
- April 21st: Lesser Events
- April 22nd: Lesser Events

## Technical Details

- **Frontend**
  - HTML5
  - CSS3 with Flexbox/Grid
  - Vanilla JavaScript
  - Inter & Montserrat font families
  - SVG icons
  - Modern color scheme with dark mode support

- **Backend**
  - PHP for data handling
  - JSON file storage
  - Cache control headers
  - Version-based caching

## File Structure

```
EventSchedule/
├── index.php           # Main entry point
├── version.php         # Version management
├── get_activities.php  # Activities endpoint
├── get_notes.php       # Notes endpoint
├── save_activities.php # Save activities
├── save_notes.php      # Save notes
├── ENHANCEMENTS.md     # Documentation of enhancements
├── css/
│   ├── styles.css      # Main styles
│   ├── mobile.css      # Mobile-specific styles
│   ├── enhanced-styles.css # Enhanced visual styles
│   └── footer.css      # Footer styles
├── js/
│   ├── utils.js        # Utility functions
│   ├── activities.js   # Activities management
│   ├── notes.js        # Notes management
│   ├── main.js         # Main initialization
│   └── enhanced-features.js # Enhanced functionality
└── data/
    ├── activities.json # Activities storage
    └── notes.json      # Notes storage
```

## Usage

1. Upload files to a PHP-enabled web server
2. Ensure proper permissions:
   - data directory: chmod 755
   - JSON files: chmod 644
3. Access through web browser
4. Use "community" (not case sensitive) to make changes
5. Enjoy enhanced features:
   - Toggle dark mode with the icon in the header
   - Use search bar to find activities and notes
   - Use keyboard shortcuts (see help in footer)

## Editing Content

1. Click "+ Add Activity" or "+ Add Note"
2. Enter the secret phrase "community"
3. Fill in the details
4. Save changes

Changes are visible to all users within 30 seconds without requiring a page refresh.