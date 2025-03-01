<?php include 'version.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>April Event Schedule</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Montserrat:wght@500;600;700;800&display=swap" rel="stylesheet">
    <!-- Original styles -->
    <link rel="stylesheet" href="css/styles.css?v=<?php echo SITE_VERSION; ?>">
    <link rel="stylesheet" href="css/mobile.css?v=<?php echo SITE_VERSION; ?>">
    <!-- Enhanced styles -->
    <link rel="stylesheet" href="css/enhanced-styles.css?v=<?php echo SITE_VERSION; ?>">
    <link rel="stylesheet" href="css/footer.css?v=<?php echo SITE_VERSION; ?>">
    <link rel="stylesheet" href="css/enhanced-mobile.css?v=<?php echo SITE_VERSION; ?>">
    <meta name="description" content="A beautiful, mobile-friendly event scheduling website for managing activities and notes during a multi-day event in April.">
    <meta name="theme-color" content="#4f46e5">
</head>
<body>
    <header>
        <h1>April Event Schedule</h1>
        <!-- Dark mode toggle will be added by JS -->
    </header>

    <nav id="dayNav">
        <div class="mobile-day-header">
            <span id="currentDayDisplay">April 16th: Arrival Day</span>
            <button id="toggleDays" class="toggle-days">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="chevron-icon">
                    <path d="M5 7L10 12L15 7" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
        </div>
        <div class="days-container">
            <button class="day-tab" data-date="2024-04-16" data-label="April 16th: Arrival Day">April 16th<br>Arrival Day</button>
            <button class="day-tab" data-date="2024-04-17" data-label="April 17th: Arrival Day">April 17th<br>Arrival Day</button>
            <button class="day-tab" data-date="2024-04-18" data-label="April 18th: Main Events">April 18th<br>Main Events</button>
            <button class="day-tab" data-date="2024-04-19" data-label="April 19th: Main Events">April 19th<br>Main Events</button>
            <button class="day-tab" data-date="2024-04-20" data-label="April 20th: Main Events">April 20th<br>Main Events</button>
            <button class="day-tab" data-date="2024-04-21" data-label="April 21st: Lesser Events">April 21st<br>Lesser Events</button>
            <button class="day-tab" data-date="2024-04-22" data-label="April 22nd: Lesser Events">April 22nd<br>Lesser Events</button>
        </div>
    </nav>

    <main>
        <!-- Search functionality will be added by JS -->
        
        <section id="timeline">
            <div class="add-activity">
                <button id="addActivityBtn" class="primary-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Add Activity
                </button>
            </div>
            <div id="activitiesList"></div>
        </section>

        <section id="notes-section">
            <h2>Event Notes & Requirements</h2>
            <div class="add-note">
                <button id="addNoteBtn" class="primary-button">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                        <path d="M10 4V16M4 10H16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    Add Note
                </button>
            </div>
            <div id="notesList"></div>
        </section>

        <div id="activityModal" class="modal">
            <div class="modal-content">
                <h2 id="modalTitle">Add Activity</h2>
                <form id="activityForm">
                    <input type="hidden" id="activityId">
                    <div class="form-group">
                        <label for="secretPhrase">Secret Phrase</label>
                        <input type="password" id="secretPhrase" placeholder="Enter the secret phrase" required>
                        <div id="secretError" class="error-message"></div>
                    </div>
                    <div class="form-group">
                        <label for="organizer">Your Name</label>
                        <input type="text" id="organizer" placeholder="Enter your name" required>
                    </div>
                    <div class="form-group">
                        <label for="activityName">Activity Title</label>
                        <input type="text" id="activityName" placeholder="Enter activity title" required>
                    </div>
                    <div class="form-group">
                        <label for="description">Description</label>
                        <textarea id="description" placeholder="Describe the activity" required></textarea>
                    </div>
                    <div class="form-group">
                        <label for="startTime">Start Time</label>
                        <input type="time" id="startTime" required>
                    </div>
                    <div class="form-group">
                        <label for="duration">Duration</label>
                        <select id="duration" required>
                            <option value="10">10 minutes</option>
                            <option value="20">20 minutes</option>
                            <option value="30">30 minutes</option>
                            <option value="45">45 minutes</option>
                            <option value="60">1 hour</option>
                            <option value="120">2 hours</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="color">Color Theme</label>
                        <select id="color" required>
                            <option value="#FF6B6B">Coral Red</option>
                            <option value="#4ECDC4">Turquoise</option>
                            <option value="#45B7D1">Ocean Blue</option>
                            <option value="#96CEB4">Sage Green</option>
                            <option value="#FFEEAD">Soft Yellow</option>
                            <option value="#D4A5A5">Dusty Rose</option>
                            <option value="#9B59B6">Royal Purple</option>
                            <option value="#E67E22">Warm Orange</option>
                        </select>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="primary-button">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                                <path d="M16 5L7 14L4 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Save Activity
                        </button>
                        <button type="button" class="secondary-button" id="cancelButton">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            Cancel
                        </button>
                        <button type="button" class="delete-button" id="deleteButton">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                                <path d="M3 6H17M7 6V4C7 3.44772 7.44772 3 8 3H12C12.5523 3 13 3.44772 13 4V6M5 6L6 17H14L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            Delete Activity
                        </button>
                    </div>
                </form>
            </div>
        </div>

        <div id="notesModal" class="modal">
            <div class="modal-content">
                <h2 id="noteModalTitle">Add Note</h2>
                <form id="notesForm">
                    <input type="hidden" id="noteId">
                    <div class="form-group">
                        <label for="noteSecretPhrase">Secret Phrase</label>
                        <input type="password" id="noteSecretPhrase" placeholder="Enter the secret phrase" required>
                        <div id="noteSecretError" class="error-message"></div>
                    </div>
                    <div class="form-group">
                        <label for="noteText">Note</label>
                        <textarea id="noteText" placeholder="Enter note or requirement" required></textarea>
                    </div>
                    <div class="button-group">
                        <button type="submit" class="primary-button">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                                <path d="M16 5L7 14L4 11" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            Save Note
                        </button>
                        <button type="button" class="secondary-button" id="noteCancelButton">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                                <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            Cancel
                        </button>
                        <button type="button" class="delete-button" id="noteDeleteButton">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" style="display: inline-block; vertical-align: middle; margin-right: 8px;">
                                <path d="M3 6H17M7 6V4C7 3.44772 7.44772 3 8 3H12C12.5523 3 13 3.44772 13 4V6M5 6L6 17H14L15 6" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            </svg>
                            Delete Note
                        </button>
                    </div>
                </form>
            </div>
        </div>
        
        <!-- Keyboard shortcuts help -->
        <div id="keyboardShortcutsModal" class="modal">
            <div class="modal-content">
                <h2>Keyboard Shortcuts</h2>
                <div class="shortcuts-list">
                    <div class="shortcut-item">
                        <div class="shortcut-keys"><kbd>/</kbd> or <kbd>Ctrl</kbd>+<kbd>F</kbd></div>
                        <div class="shortcut-description">Focus search</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys"><kbd>Alt</kbd>+<kbd>N</kbd></div>
                        <div class="shortcut-description">Add new activity</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys"><kbd>Alt</kbd>+<kbd>M</kbd></div>
                        <div class="shortcut-description">Add new note</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys"><kbd>Esc</kbd></div>
                        <div class="shortcut-description">Close modal</div>
                    </div>
                    <div class="shortcut-item">
                        <div class="shortcut-keys"><kbd>1</kbd> - <kbd>7</kbd></div>
                        <div class="shortcut-description">Switch between days</div>
                    </div>
                </div>
                <div class="button-group">
                    <button type="button" class="secondary-button" id="closeShortcutsButton">
                        Close
                    </button>
                </div>
            </div>
        </div>
    </main>

    <footer>
        <div class="footer-content">
            <div class="footer-left">
                <p>April Event Schedule &copy; 2025</p>
                <a href="https://github.com/vernam-k/EventSchedule" target="_blank" class="github-link">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" style="display: inline-block; vertical-align: middle; margin-right: 4px;">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    GitHub
                </a>
            </div>
            <button id="showKeyboardShortcuts" class="text-button">Keyboard Shortcuts</button>
        </div>
    </footer>

    <!-- Original scripts -->
    <script src="js/utils.js?v=<?php echo SITE_VERSION; ?>"></script>
    <script src="js/activities.js?v=<?php echo SITE_VERSION; ?>"></script>
    <script src="js/notes.js?v=<?php echo SITE_VERSION; ?>"></script>
    <script src="js/main.js?v=<?php echo SITE_VERSION; ?>"></script>
    
    <!-- Enhanced features -->
    <script src="js/enhanced-features.js?v=<?php echo SITE_VERSION; ?>"></script>
    
    <script>
        // Initialize keyboard shortcuts modal
        document.addEventListener('DOMContentLoaded', () => {
            const shortcutsModal = document.getElementById('keyboardShortcutsModal');
            const showShortcutsBtn = document.getElementById('showKeyboardShortcuts');
            const closeShortcutsBtn = document.getElementById('closeShortcutsButton');
            
            if (showShortcutsBtn && shortcutsModal) {
                showShortcutsBtn.addEventListener('click', () => {
                    shortcutsModal.style.display = 'block';
                });
            }
            
            if (closeShortcutsBtn && shortcutsModal) {
                closeShortcutsBtn.addEventListener('click', () => {
                    shortcutsModal.style.display = 'none';
                });
            }
        });
    </script>
</body>
</html>