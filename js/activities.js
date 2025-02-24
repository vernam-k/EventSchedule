// Activities management class
class ActivitiesManager {
    constructor() {
        this.activities = [];
        this.currentDay = '2024-04-16';
        this.modal = document.getElementById('activityModal');
        this.form = document.getElementById('activityForm');
        this.deleteButton = document.getElementById('deleteButton');
        this.cancelButton = document.getElementById('cancelButton');
        this.addActivityBtn = document.getElementById('addActivityBtn');
        this.secretError = document.getElementById('secretError');
        this.toggleDaysBtn = document.getElementById('toggleDays');
        this.daysContainer = document.querySelector('.days-container');
        this.currentDayDisplay = document.getElementById('currentDayDisplay');
        
        this.setupEventListeners();
        this.loadActivities();
    }

    setupEventListeners() {
        // Day navigation
        document.getElementById('dayNav').addEventListener('click', (e) => {
            if (e.target.classList.contains('day-tab')) {
                this.switchDay(e.target.dataset.date, e.target.dataset.label);
            }
        });

        // Toggle days dropdown
        this.toggleDaysBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevent document click from immediately closing
            this.daysContainer.classList.toggle('expanded');
            this.toggleDaysBtn.classList.toggle('expanded');
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('#dayNav')) {
                this.daysContainer.classList.remove('expanded');
                this.toggleDaysBtn.classList.remove('expanded');
            }
        });

        // Add activity button
        this.addActivityBtn.addEventListener('click', () => this.showModal());

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateAndSave();
        });

        // Cancel button
        this.cancelButton.addEventListener('click', () => this.hideModal());

        // Delete button
        this.deleteButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent form submission
            this.validateAndDelete();
        });

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });

        // Activity card click
        document.getElementById('activitiesList').addEventListener('click', (e) => {
            const card = e.target.closest('.activity-card');
            if (card) {
                this.editActivity(card.dataset.id);
            }
        });

        // Poll for updates every 30 seconds
        setInterval(() => this.loadActivities(), 30000);
    }

    validateSecretPhrase() {
        const secretPhrase = document.getElementById('secretPhrase').value;
        const isValid = secretPhrase.toLowerCase() === 'community';
        
        if (!isValid) {
            this.secretError.textContent = 'Incorrect secret phrase';
            this.secretError.classList.add('show');
            setTimeout(() => {
                this.secretError.classList.remove('show');
            }, 2000);
        }
        
        return isValid;
    }

    async validateAndSave() {
        if (!this.validateSecretPhrase()) {
            return;
        }
        await this.saveActivity();
    }

    async validateAndDelete() {
        if (!this.validateSecretPhrase()) {
            return;
        }
        await this.deleteActivity();
    }

    switchDay(date, label) {
        this.currentDay = date;
        document.querySelectorAll('.day-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.date === date);
        });
        
        // Update current day display and close dropdown
        if (label) {
            this.currentDayDisplay.textContent = label;
            this.daysContainer.classList.remove('expanded');
            this.toggleDaysBtn.classList.remove('expanded');
        }
        
        this.renderActivities();
    }

    showModal(activity = null) {
        this.form.reset();
        document.getElementById('modalTitle').textContent = activity ? 'Edit Activity' : 'Add Activity';
        
        if (activity) {
            document.getElementById('activityId').value = activity.id;
            document.getElementById('organizer').value = activity.organizer;
            document.getElementById('activityName').value = activity.name;
            document.getElementById('description').value = activity.description;
            document.getElementById('startTime').value = activity.startTime;
            document.getElementById('duration').value = activity.duration;
            document.getElementById('color').value = activity.color;
            this.deleteButton.style.display = 'block';
        } else {
            document.getElementById('activityId').value = '';
            document.getElementById('color').value = Utils.getRandomColor();
            this.deleteButton.style.display = 'none';
        }

        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
        this.secretError.classList.remove('show');
    }

    async loadActivities() {
        try {
            const response = await fetch('data/activities.json');
            const data = await response.json();
            this.activities = data.activities;
            this.renderActivities();
        } catch (error) {
            console.error('Error loading activities:', error);
        }
    }

    async saveActivities() {
        try {
            const response = await fetch('save_activities.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ activities: this.activities })
            });
            
            if (!response.ok) {
                throw new Error('Failed to save activities');
            }
        } catch (error) {
            console.error('Error saving activities:', error);
            alert('Failed to save activity. Please try again.');
        }
    }

    async saveActivity() {
        const activityId = document.getElementById('activityId').value;
        const activity = {
            id: activityId || Utils.generateId(),
            organizer: document.getElementById('organizer').value,
            name: document.getElementById('activityName').value,
            description: document.getElementById('description').value,
            startTime: document.getElementById('startTime').value,
            duration: document.getElementById('duration').value,
            color: document.getElementById('color').value,
            day: this.currentDay
        };

        if (activityId) {
            const index = this.activities.findIndex(a => a.id === activityId);
            if (index !== -1) {
                this.activities[index] = activity;
            }
        } else {
            this.activities.push(activity);
        }

        await this.saveActivities();
        this.hideModal();
        this.renderActivities();
    }

    async deleteActivity() {
        const activityId = document.getElementById('activityId').value;
        this.activities = this.activities.filter(a => a.id !== activityId);
        await this.saveActivities();
        this.hideModal();
        this.renderActivities();
    }

    editActivity(activityId) {
        const activity = this.activities.find(a => a.id === activityId);
        if (activity) {
            this.showModal(activity);
        }
    }

    renderActivities() {
        const container = document.getElementById('activitiesList');
        container.innerHTML = '';

        const dayActivities = Utils.sortActivities(
            this.activities.filter(a => a.day === this.currentDay)
        );

        dayActivities.forEach(activity => {
            const endTime = Utils.calculateEndTime(activity.startTime, activity.duration);
            const card = document.createElement('div');
            card.className = 'activity-card';
            card.dataset.id = activity.id;
            card.style.borderLeftColor = activity.color;
            
            card.innerHTML = `
                <div class="activity-header">
                    <div class="activity-title">${activity.name}</div>
                    <div class="activity-time">
                        ${Utils.formatTime(activity.startTime)} - ${Utils.formatTime(endTime)}
                        (${Utils.formatDuration(activity.duration)})
                    </div>
                </div>
                <div class="activity-organizer">Organized by: ${activity.organizer}</div>
                <div class="activity-description">${activity.description}</div>
            `;

            container.appendChild(card);
        });
    }
}

// Initialize activities manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.activitiesManager = new ActivitiesManager();
});