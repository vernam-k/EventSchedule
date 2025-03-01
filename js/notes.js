class NotesManager {
    constructor() {
        this.notes = [];
        this.modal = document.getElementById('notesModal');
        this.form = document.getElementById('notesForm');
        this.notesList = document.getElementById('notesList');
        this.addNoteBtn = document.getElementById('addNoteBtn');
        this.secretError = document.getElementById('noteSecretError');
        
        this.setupEventListeners();
        this.loadNotes();
    }

    setupEventListeners() {
        // Add note button
        this.addNoteBtn.addEventListener('click', () => this.showModal());

        // Form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.validateAndSave();
        });

        // Cancel button
        document.getElementById('noteCancelButton').addEventListener('click', () => this.hideModal());

        // Delete button
        document.getElementById('noteDeleteButton').addEventListener('click', () => this.validateAndDelete());

        // Click outside modal to close
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hideModal();
            }
        });

        // Note item click
        this.notesList.addEventListener('click', (e) => {
            const item = e.target.closest('.note-item');
            if (item) {
                this.editNote(item.dataset.id);
            }
        });

        // Poll for updates every 30 seconds
        setInterval(() => this.loadNotes(), 30000);
    }

    validateSecretPhrase() {
        const secretPhrase = document.getElementById('noteSecretPhrase').value;
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
        await this.saveNote();
    }

    async validateAndDelete() {
        if (!this.validateSecretPhrase()) {
            return;
        }
        await this.deleteNote();
    }

    showModal(note = null) {
        this.form.reset();
        document.getElementById('noteModalTitle').textContent = note ? 'Edit Note' : 'Add Note';
        
        if (note) {
            document.getElementById('noteId').value = note.id;
            document.getElementById('noteText').value = note.text;
            document.getElementById('noteDeleteButton').style.display = 'block';
        } else {
            document.getElementById('noteId').value = '';
            document.getElementById('noteDeleteButton').style.display = 'none';
        }

        this.modal.style.display = 'block';
    }

    hideModal() {
        this.modal.style.display = 'none';
        this.secretError.classList.remove('show');
    }

    async loadNotes() {
        try {
            // Use the PHP endpoint instead of directly accessing the JSON file
            // The PHP endpoint already has cache control headers
            const response = await fetch('get_notes.php');
            const data = await response.json();
            this.notes = data.notes;
            this.renderNotes();
        } catch (error) {
            console.error('Error loading notes:', error);
        }
    }

    async saveNotes() {
        try {
            const response = await fetch('save_notes.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ notes: this.notes })
            });
            
            if (!response.ok) {
                throw new Error('Failed to save notes');
            }
        } catch (error) {
            console.error('Error saving notes:', error);
            alert('Failed to save note. Please try again.');
        }
    }

    async saveNote() {
        const noteId = document.getElementById('noteId').value;
        const note = {
            id: noteId || Utils.generateId(),
            text: document.getElementById('noteText').value
        };

        if (noteId) {
            const index = this.notes.findIndex(n => n.id === noteId);
            if (index !== -1) {
                this.notes[index] = note;
            }
        } else {
            this.notes.push(note);
        }

        await this.saveNotes();
        this.hideModal();
        
        // Immediately load the latest notes to ensure UI is up-to-date
        await this.loadNotes();
    }

    async deleteNote() {
        const noteId = document.getElementById('noteId').value;
        this.notes = this.notes.filter(n => n.id !== noteId);
        await this.saveNotes();
        this.hideModal();
        
        // Immediately load the latest notes to ensure UI is up-to-date
        await this.loadNotes();
    }

    editNote(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            this.showModal(note);
        }
    }

    renderNotes() {
        this.notesList.innerHTML = '';
        
        this.notes.forEach(note => {
            const item = document.createElement('div');
            item.className = 'note-item';
            item.dataset.id = note.id;
            
            item.innerHTML = `
                <div class="note-text">${note.text}</div>
            `;

            this.notesList.appendChild(item);
        });
    }
}

// Initialize notes manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.notesManager = new NotesManager();
});