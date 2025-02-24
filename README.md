# April Event Schedule

A beautiful, mobile-friendly event scheduling website for managing activities and notes during a multi-day event in April.

## Features

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
  - Inter font family
  - SVG icons

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
├── get_notes.php      # Notes endpoint
├── save_activities.php # Save activities
├── save_notes.php     # Save notes
├── css/
│   ├── styles.css     # Main styles
│   └── mobile.css     # Mobile-specific styles
├── js/
│   ├── utils.js       # Utility functions
│   ├── activities.js  # Activities management
│   ├── notes.js      # Notes management
│   └── main.js       # Main initialization
└── data/
    ├── activities.json # Activities storage
    └── notes.json     # Notes storage
```

## Usage

1. Upload files to a PHP-enabled web server
2. Ensure proper permissions:
   - data directory: chmod 755
   - JSON files: chmod 644
3. Access through web browser
4. Use "community" (not case sensitive) to make changes

## Editing Content

1. Click "+ Add Activity" or "+ Add Note"
2. Enter the secret phrase "community"
3. Fill in the details
4. Save changes

Changes are visible to all users within 30 seconds without requiring a page refresh.