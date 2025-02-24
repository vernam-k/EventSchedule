<?php include 'version.php'; ?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>April Event Schedule</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css?v=<?php echo SITE_VERSION; ?>">
    <link rel="stylesheet" href="css/mobile.css?v=<?php echo SITE_VERSION; ?>">
</head>
<body>
    <header>
        <h1>April Event Schedule</h1>
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
    </main>

    <script src="js/utils.js?v=<?php echo SITE_VERSION; ?>"></script>
    <script src="js/activities.js?v=<?php echo SITE_VERSION; ?>"></script>
    <script src="js/notes.js?v=<?php echo SITE_VERSION; ?>"></script>
    <script src="js/main.js?v=<?php echo SITE_VERSION; ?>"></script>
</body>
</html>