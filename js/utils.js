// Utility functions for the event schedule application

const Utils = {
    // Format time from 24h to 12h format
    formatTime: (time) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const formattedHour = hour % 12 || 12;
        return `${formattedHour}:${minutes} ${ampm}`;
    },

    // Generate a random ID
    generateId: () => {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    },

    // Sort activities by start time
    sortActivities: (activities) => {
        return activities.sort((a, b) => {
            const timeA = a.startTime.replace(':', '');
            const timeB = b.startTime.replace(':', '');
            return parseInt(timeA) - parseInt(timeB);
        });
    },

    // Format duration for display
    formatDuration: (minutes) => {
        if (minutes >= 60) {
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
        }
        return `${minutes}m`;
    },

    // Calculate end time based on start time and duration
    calculateEndTime: (startTime, durationMinutes) => {
        const [hours, minutes] = startTime.split(':').map(Number);
        const totalMinutes = hours * 60 + minutes + parseInt(durationMinutes);
        const endHours = Math.floor(totalMinutes / 60);
        const endMinutes = totalMinutes % 60;
        return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
    },

    // Save activities to localStorage
    saveActivities: (activities) => {
        localStorage.setItem('eventActivities', JSON.stringify(activities));
    },

    // Load activities from localStorage
    loadActivities: () => {
        const saved = localStorage.getItem('eventActivities');
        return saved ? JSON.parse(saved) : [];
    },

    // Get random color from predefined list
    getRandomColor: () => {
        const colors = [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4',
            '#FFEEAD', '#D4A5A5', '#9B59B6', '#E67E22'
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }
};

// Make Utils available globally
window.Utils = Utils;