/**
 * Enhanced Features for April Event Schedule
 * This file adds additional functionality to improve the user experience
 */

class EnhancedFeatures {
    constructor() {
        this.setupDarkMode();
        this.setupSearchFunctionality();
        // Modal enhancements removed due to compatibility issues
        this.setupKeyboardShortcuts();
        this.loadUserPreferences();
    }

    /**
     * Dark Mode Toggle
     */
    setupDarkMode() {
        // Create dark mode toggle button
        const header = document.querySelector('header');
        const darkModeToggle = document.createElement('button');
        darkModeToggle.id = 'darkModeToggle';
        darkModeToggle.className = 'dark-mode-toggle';
        darkModeToggle.innerHTML = `
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="moon-icon">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" class="sun-icon" style="display:none;">
                <path d="M10 2v1m0 14v1m-7-8H2m16 0h-1m-2.293-4.293l-.707.707M5.707 14.293l-.707.707m10.586 0l-.707-.707M5.707 5.707l-.707-.707M17 10a7 7 0 11-14 0 7 7 0 0114 0z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
        `;
        header.appendChild(darkModeToggle);

        // Add dark mode styles
        const darkModeStyles = document.createElement('style');
        darkModeStyles.textContent = `
            .dark-mode-toggle {
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: rgba(255, 255, 255, 0.2);
                border: none;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                color: white;
                transition: all 0.3s ease;
            }
            
            .dark-mode-toggle:hover {
                background: rgba(255, 255, 255, 0.3);
                transform: translateY(-2px);
            }
            
            body.dark-mode {
                --background-color: #0f172a;
                --card-bg: #1e293b;
                --text-color: #f1f5f9;
                --text-muted: #94a3b8;
                --border-color: #334155;
                --shadow-color: rgba(0, 0, 0, 0.3);
                --header-bg: linear-gradient(135deg, #3730a3 0%, #312e81 100%);
                --nav-bg: rgba(30, 41, 59, 0.9);
            }
            
            body.dark-mode .activity-time {
                background-color: rgba(148, 163, 184, 0.1);
            }
            
            body.dark-mode input,
            body.dark-mode textarea,
            body.dark-mode select {
                background-color: #1e293b;
                border-color: #334155;
                color: #f1f5f9;
            }
            
            body.dark-mode .day-tab {
                background-color: #1e293b;
                border-color: #334155;
                color: #f1f5f9;
            }
            
            body.dark-mode .modal {
                background-color: rgba(15, 23, 42, 0.8);
            }
        `;
        document.head.appendChild(darkModeStyles);

        // Toggle dark mode
        darkModeToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDarkMode = document.body.classList.contains('dark-mode');
            
            // Toggle icons
            darkModeToggle.querySelector('.moon-icon').style.display = isDarkMode ? 'none' : 'block';
            darkModeToggle.querySelector('.sun-icon').style.display = isDarkMode ? 'block' : 'none';
            
            // Save preference
            localStorage.setItem('darkMode', isDarkMode ? 'true' : 'false');
        });
    }

    /**
     * Search Functionality
     */
    setupSearchFunctionality() {
        // Create search container
        const main = document.querySelector('main');
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="search-input-container">
                <input type="text" id="searchInput" placeholder="Search activities and notes...">
                <button id="clearSearch">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                </button>
            </div>
            <div id="searchResults" class="search-results"></div>
        `;
        
        // Insert after navigation
        const dayNav = document.getElementById('dayNav');
        main.insertBefore(searchContainer, main.firstChild);

        // Add search styles
        const searchStyles = document.createElement('style');
        searchStyles.textContent = `
            .search-container {
                margin: 0 0 2rem 0;
                position: relative;
            }
            
            .search-input-container {
                position: relative;
                display: flex;
                align-items: center;
            }
            
            #searchInput {
                width: 100%;
                padding: 0.875rem 3rem 0.875rem 1rem;
                border: 1px solid var(--border-color);
                border-radius: 10px;
                font-size: 1rem;
                transition: all 0.3s ease;
                background-color: var(--card-bg);
                box-shadow: 0 2px 4px var(--shadow-color);
            }
            
            #searchInput:focus {
                outline: none;
                border-color: var(--primary-color);
                box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
            }
            
            #clearSearch {
                position: absolute;
                right: 1rem;
                background: none;
                border: none;
                cursor: pointer;
                color: var(--text-muted);
                display: none;
                padding: 0.25rem;
                border-radius: 50%;
            }
            
            #clearSearch:hover {
                color: var(--text-color);
                background-color: rgba(100, 116, 139, 0.1);
            }
            
            .search-results {
                margin-top: 1rem;
                display: none;
            }
            
            .search-results.active {
                display: block;
            }
            
            .search-result-item {
                background-color: var(--card-bg);
                border-radius: 10px;
                padding: 1rem;
                margin-bottom: 0.5rem;
                box-shadow: 0 2px 4px var(--shadow-color);
                cursor: pointer;
                transition: all 0.3s ease;
                border-left: 4px solid var(--primary-color);
            }
            
            .search-result-item:hover {
                transform: translateY(-2px);
                box-shadow: 0 4px 6px -1px var(--shadow-color);
            }
            
            .search-result-title {
                font-weight: 600;
                margin-bottom: 0.25rem;
            }
            
            .search-result-type {
                font-size: 0.875rem;
                color: var(--text-muted);
                margin-bottom: 0.25rem;
            }
            
            .search-result-match {
                font-size: 0.875rem;
                color: var(--text-color);
                background-color: rgba(79, 70, 229, 0.1);
                padding: 0.25rem;
                border-radius: 4px;
                margin-top: 0.5rem;
            }
            
            .highlight {
                background-color: rgba(249, 115, 22, 0.2);
                padding: 0 0.25rem;
                border-radius: 2px;
            }
        `;
        document.head.appendChild(searchStyles);

        // Search functionality
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        const searchResults = document.getElementById('searchResults');

        searchInput.addEventListener('input', () => {
            const query = searchInput.value.trim().toLowerCase();
            clearSearch.style.display = query ? 'block' : 'none';
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
                return;
            }
            
            searchResults.classList.add('active');
            this.performSearch(query);
        });

        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            clearSearch.style.display = 'none';
            searchResults.classList.remove('active');
            searchResults.innerHTML = '';
        });
    }

    /**
     * Perform search across activities and notes
     */
    performSearch(query) {
        const searchResults = document.getElementById('searchResults');
        searchResults.innerHTML = '';
        let results = [];

        // Search activities
        if (window.activitiesManager && window.activitiesManager.activities) {
            window.activitiesManager.activities.forEach(activity => {
                const nameMatch = activity.name.toLowerCase().includes(query);
                const descMatch = activity.description.toLowerCase().includes(query);
                const organizerMatch = activity.organizer.toLowerCase().includes(query);
                
                if (nameMatch || descMatch || organizerMatch) {
                    results.push({
                        id: activity.id,
                        title: activity.name,
                        type: 'Activity',
                        day: activity.day,
                        match: this.getMatchContext(
                            nameMatch ? activity.name : (descMatch ? activity.description : activity.organizer),
                            query
                        ),
                        item: activity
                    });
                }
            });
        }

        // Search notes
        if (window.notesManager && window.notesManager.notes) {
            window.notesManager.notes.forEach(note => {
                if (note.text.toLowerCase().includes(query)) {
                    results.push({
                        id: note.id,
                        title: note.text.substring(0, 50) + (note.text.length > 50 ? '...' : ''),
                        type: 'Note',
                        match: this.getMatchContext(note.text, query),
                        item: note
                    });
                }
            });
        }

        // Display results
        if (results.length === 0) {
            searchResults.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                <div class="search-result-title">${result.title}</div>
                <div class="search-result-type">${result.type}${result.day ? ` - ${this.formatDate(result.day)}` : ''}</div>
                <div class="search-result-match">${result.match}</div>
            `;
            
            resultItem.addEventListener('click', () => {
                if (result.type === 'Activity') {
                    // Switch to the correct day
                    if (window.activitiesManager) {
                        const dayTab = document.querySelector(`.day-tab[data-date="${result.day}"]`);
                        if (dayTab) {
                            dayTab.click();
                        }
                        
                        // Open the activity modal
                        setTimeout(() => {
                            window.activitiesManager.editActivity(result.id);
                        }, 100);
                    }
                } else if (result.type === 'Note') {
                    // Open the note modal
                    if (window.notesManager) {
                        window.notesManager.editNote(result.id);
                    }
                }
                
                // Clear search
                document.getElementById('searchInput').value = '';
                document.getElementById('clearSearch').style.display = 'none';
                searchResults.classList.remove('active');
                searchResults.innerHTML = '';
            });
            
            searchResults.appendChild(resultItem);
        });
    }

    /**
     * Get context around the matched text
     */
    getMatchContext(text, query) {
        const lowerText = text.toLowerCase();
        const index = lowerText.indexOf(query);
        if (index === -1) return text.substring(0, 100);
        
        const start = Math.max(0, index - 20);
        const end = Math.min(text.length, index + query.length + 20);
        let context = text.substring(start, end);
        
        if (start > 0) context = '...' + context;
        if (end < text.length) context = context + '...';
        
        // Highlight the query
        const highlightedContext = context.replace(
            new RegExp(query, 'gi'),
            match => `<span class="highlight">${match}</span>`
        );
        
        return highlightedContext;
    }

    /**
     * Format date for display
     */
    formatDate(dateString) {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric'
        });
    }

    /**
     * Enhance modals with animations - DISABLED due to compatibility issues
     */
    enhanceModals() {
        // This method is intentionally empty to avoid interfering with the original modal functionality
        console.log("Modal enhancements disabled to maintain compatibility");
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // ESC to close modals
            if (e.key === 'Escape') {
                const visibleModals = document.querySelectorAll('.modal[style*="display: block"]');
                visibleModals.forEach(modal => {
                    modal.style.display = 'none';
                });
            }
            
            // Ctrl+F or / to focus search
            if ((e.ctrlKey && e.key === 'f') || e.key === '/') {
                const searchInput = document.getElementById('searchInput');
                if (searchInput && document.activeElement !== searchInput) {
                    e.preventDefault();
                    searchInput.focus();
                }
            }
            
            // Alt+N to add new activity
            if (e.altKey && e.key === 'n') {
                e.preventDefault();
                const addActivityBtn = document.getElementById('addActivityBtn');
                if (addActivityBtn) {
                    addActivityBtn.click();
                }
            }
            
            // Alt+M to add new note
            if (e.altKey && e.key === 'm') {
                e.preventDefault();
                const addNoteBtn = document.getElementById('addNoteBtn');
                if (addNoteBtn) {
                    addNoteBtn.click();
                }
            }
            
            // Number keys 1-7 to switch days
            if (!e.ctrlKey && !e.altKey && !e.metaKey && /^[1-7]$/.test(e.key)) {
                const dayTabs = document.querySelectorAll('.day-tab');
                const index = parseInt(e.key) - 1;
                if (dayTabs[index]) {
                    dayTabs[index].click();
                }
            }
        });
    }

    /**
     * Load user preferences from localStorage
     */
    loadUserPreferences() {
        // Load dark mode preference
        const darkMode = localStorage.getItem('darkMode');
        if (darkMode === 'true') {
            document.body.classList.add('dark-mode');
            const darkModeToggle = document.getElementById('darkModeToggle');
            if (darkModeToggle) {
                darkModeToggle.querySelector('.moon-icon').style.display = 'none';
                darkModeToggle.querySelector('.sun-icon').style.display = 'block';
            }
        }
        
        // Load last viewed day
        const lastDay = localStorage.getItem('lastViewedDay');
        if (lastDay) {
            const dayTab = document.querySelector(`.day-tab[data-date="${lastDay}"]`);
            if (dayTab) {
                setTimeout(() => {
                    dayTab.click();
                }, 100);
            }
        }
        
        // Save day selection
        document.querySelectorAll('.day-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                localStorage.setItem('lastViewedDay', tab.dataset.date);
            });
        });
    }
}

// Initialize enhanced features when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.enhancedFeatures = new EnhancedFeatures();
});