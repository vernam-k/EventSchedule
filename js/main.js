// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Set default active day to first day
    const firstDayTab = document.querySelector('.day-tab');
    if (firstDayTab) {
        firstDayTab.classList.add('active');
    }

    // Initialize activities manager (already done in activities.js)
    // window.activitiesManager is now available globally

    // Set up initial data if none exists
    if (!localStorage.getItem('eventActivities')) {
        const initialActivities = [
            {
                id: Utils.generateId(),
                organizer: "Event Team",
                name: "Welcome Reception",
                description: "Join us for the welcome reception where you can meet other attendees and get your event materials.",
                startTime: "18:00",
                duration: "120",
                color: "#4ECDC4",
                day: "2024-04-16"
            },
            {
                id: Utils.generateId(),
                organizer: "Event Team",
                name: "Registration & Check-in",
                description: "Registration desk opens for attendees to check in and receive their materials.",
                startTime: "09:00",
                duration: "120",
                color: "#FF6B6B",
                day: "2024-04-17"
            }
        ];
        Utils.saveActivities(initialActivities);
        window.activitiesManager.activities = initialActivities;
        window.activitiesManager.renderActivities();
    }
});