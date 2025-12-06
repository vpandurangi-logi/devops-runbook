// Runbook Application JavaScript
class RunbookApp {
    constructor() {
        this.entries = [];
        this.currentEditId = null;
        this.init();
    }

    init() {
        this.loadEntries();
        this.bindEvents();
        this.displayEntries();
    }

    // Load entries from localStorage
    loadEntries() {
        const stored = localStorage.getItem('runbookEntries');
        if (stored) {
            this.entries = JSON.parse(stored);
        }
    }

    // Save entries to localStorage
    saveEntries() {
        localStorage.setItem('runbookEntries', JSON.stringify(this.entries));
    }

    // Bind event listeners
    bindEvents() {
        // Form submission
        document.getElementById('entryForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleFormSubmit();
        });

        // Clear form button
        document.getElementById('clearForm').addEventListener('click', () => {
            this.clearForm();
        });

        // Search functionality
        document.getElementById('searchInput').addEventListener('input', () => {
            this.performSearch();
        });

        document.getElementById('searchBtn').addEventListener('click', () => {
            this.performSearch();
        });

        // Filter functionality
        document.getElementById('categoryFilter').addEventListener('change', () => {
            this.performSearch();
        });

        document.getElementById('componentFilter').addEventListener('change', () => {
            this.performSearch();
        });

        // Clear filters
        document.getElementById('clearFilters').addEventListener('click', () => {
            this.clearFilters();
        });

        // Export functionality
        document.getElementById('exportBtn').addEventListener('click', () => {
            this.exportData();
        });

        // Modal functionality
        document.querySelector('.close').addEventListener('click', () => {
            this.closeModal();
        });

        document.getElementById('entryModal').addEventListener('click', (e) => {
            if (e.target === document.getElementById('entryModal')) {
                this.closeModal();
            }
        });

        // Modal buttons
        document.getElementById('editEntryBtn').addEventListener('click', () => {
            this.editEntry();
        });

        document.getElementById('deleteEntryBtn').addEventListener('click', () => {
            this.deleteEntry();
        });

        // Enter key for search
        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.performSearch();
            }
        });
    }

    // Handle form submission
    handleFormSubmit() {
        const formData = new FormData(document.getElementById('entryForm'));
        const entry = {
            id: this.currentEditId || Date.now().toString(),
            title: formData.get('title').trim(),
            category: formData.get('category'),
            component: formData.get('component'),
            tags: formData.get('tags').split(',').map(tag => tag.trim()).filter(tag => tag),
            description: formData.get('description').trim(),
            notes: formData.get('notes').trim(),
            createdAt: this.currentEditId ? this.getEntryById(this.currentEditId).createdAt : new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        if (this.currentEditId) {
            // Update existing entry
            const index = this.entries.findIndex(e => e.id === this.currentEditId);
            if (index !== -1) {
                this.entries[index] = entry;
                this.showMessage('Entry updated successfully!', 'success');
            }
            this.currentEditId = null;
        } else {
            // Add new entry
            this.entries.unshift(entry);
            this.showMessage('Entry added successfully!', 'success');
        }

        this.saveEntries();
        this.clearForm();
        this.displayEntries();
        this.closeModal();
    }

    // Clear the form
    clearForm() {
        document.getElementById('entryForm').reset();
        document.getElementById('component').value = 'others';
        this.currentEditId = null;
        
        // Update form title
        const formTitle = document.querySelector('.add-entry-section h2');
        formTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add New Entry';
        
        // Update button text
        const submitBtn = document.querySelector('#entryForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Entry';
    }

    // Get entry by ID
    getEntryById(id) {
        return this.entries.find(entry => entry.id === id);
    }

    // Display entries
    displayEntries(filteredEntries = null) {
        const entriesToShow = filteredEntries || this.entries;
        const entriesList = document.getElementById('entriesList');
        const resultsCount = document.getElementById('resultsCount');

        resultsCount.textContent = `${entriesToShow.length} entries found`;

        if (entriesToShow.length === 0) {
            entriesList.innerHTML = '<div class="no-entries">No entries found. Add your first entry using the form on the left.</div>';
            return;
        }

        entriesList.innerHTML = entriesToShow.map(entry => this.createEntryCard(entry)).join('');

        // Add click listeners to entry cards
        entriesList.querySelectorAll('.entry-card').forEach(card => {
            card.addEventListener('click', () => {
                const entryId = card.dataset.entryId;
                this.showEntryDetails(entryId);
            });
        });
    }

    // Create entry card HTML
    createEntryCard(entry) {
        const formattedDate = new Date(entry.createdAt).toLocaleDateString();
        
        return `
            <div class="entry-card" data-entry-id="${entry.id}">
                <div class="entry-title">${this.escapeHtml(entry.title)}</div>
                <div class="entry-meta">
                    <div class="entry-category">
                        <i class="fas fa-folder"></i>
                        ${this.capitalizeFirst(entry.category)}
                    </div>
                    <div class="entry-component">
                        <i class="fas fa-cog"></i>
                        ${this.capitalizeFirst(entry.component)}
                    </div>
                    <div class="entry-date">
                        <i class="fas fa-calendar"></i>
                        ${formattedDate}
                    </div>
                </div>
                <div class="entry-description">${this.escapeHtml(entry.description)}</div>
                ${entry.tags.length > 0 ? `
                    <div class="entry-tags">
                        ${entry.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join('')}
                    </div>
                ` : ''}
            </div>
        `;
    }

    // Show entry details in modal
    showEntryDetails(entryId) {
        const entry = this.getEntryById(entryId);
        if (!entry) return;

        const modal = document.getElementById('entryModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalContent = document.getElementById('modalContent');

        modalTitle.textContent = entry.title;
        
        const createdDate = new Date(entry.createdAt).toLocaleString();
        const updatedDate = new Date(entry.updatedAt).toLocaleString();
        
        modalContent.innerHTML = `
            <div class="detail-section">
                <div class="detail-label">Category</div>
                <div class="detail-content">${this.capitalizeFirst(entry.category)}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Component</div>
                <div class="detail-content">${this.capitalizeFirst(entry.component)}</div>
            </div>
            ${entry.tags.length > 0 ? `
                <div class="detail-section">
                    <div class="detail-label">Tags</div>
                    <div class="detail-content">
                        ${entry.tags.map(tag => `<span class="tag">${this.escapeHtml(tag)}</span>`).join(' ')}
                    </div>
                </div>
            ` : ''}
            <div class="detail-section">
                <div class="detail-label">Description/Procedure</div>
                <div class="detail-content">${this.escapeHtml(entry.description)}</div>
            </div>
            ${entry.notes ? `
                <div class="detail-section">
                    <div class="detail-label">Additional Notes</div>
                    <div class="detail-content">${this.escapeHtml(entry.notes)}</div>
                </div>
            ` : ''}
            <div class="detail-section">
                <div class="detail-label">Created</div>
                <div class="detail-content">${createdDate}</div>
            </div>
            <div class="detail-section">
                <div class="detail-label">Last Updated</div>
                <div class="detail-content">${updatedDate}</div>
            </div>
        `;

        // Store current entry ID for edit/delete operations
        modal.dataset.currentEntryId = entryId;
        modal.style.display = 'block';
    }

    // Close modal
    closeModal() {
        document.getElementById('entryModal').style.display = 'none';
    }

    // Edit entry
    editEntry() {
        const entryId = document.getElementById('entryModal').dataset.currentEntryId;
        const entry = this.getEntryById(entryId);
        if (!entry) return;

        // Populate form with entry data
        document.getElementById('title').value = entry.title;
        document.getElementById('category').value = entry.category;
        document.getElementById('component').value = entry.component;
        document.getElementById('tags').value = entry.tags.join(', ');
        document.getElementById('description').value = entry.description;
        document.getElementById('notes').value = entry.notes;

        // Set edit mode
        this.currentEditId = entryId;
        
        // Update form title
        const formTitle = document.querySelector('.add-entry-section h2');
        formTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Entry';
        
        // Update button text
        const submitBtn = document.querySelector('#entryForm button[type="submit"]');
        submitBtn.innerHTML = '<i class="fas fa-save"></i> Update Entry';

        this.closeModal();
        
        // Scroll to form
        document.querySelector('.add-entry-section').scrollIntoView({ behavior: 'smooth' });
    }

    // Delete entry
    deleteEntry() {
        const entryId = document.getElementById('entryModal').dataset.currentEntryId;
        
        if (confirm('Are you sure you want to delete this entry? This action cannot be undone.')) {
            this.entries = this.entries.filter(entry => entry.id !== entryId);
            this.saveEntries();
            this.displayEntries();
            this.closeModal();
            this.showMessage('Entry deleted successfully!', 'success');
        }
    }

    // Perform search and filtering
    performSearch() {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
        const categoryFilter = document.getElementById('categoryFilter').value;
        const componentFilter = document.getElementById('componentFilter').value;

        let filteredEntries = this.entries;

        // Apply text search
        if (searchTerm) {
            filteredEntries = filteredEntries.filter(entry => {
                return entry.title.toLowerCase().includes(searchTerm) ||
                       entry.description.toLowerCase().includes(searchTerm) ||
                       entry.notes.toLowerCase().includes(searchTerm) ||
                       entry.tags.some(tag => tag.toLowerCase().includes(searchTerm));
            });
        }

        // Apply category filter
        if (categoryFilter) {
            filteredEntries = filteredEntries.filter(entry => entry.category === categoryFilter);
        }

        // Apply component filter
        if (componentFilter) {
            filteredEntries = filteredEntries.filter(entry => entry.component === componentFilter);
        }

        this.displayEntries(filteredEntries);
    }

    // Clear all filters
    clearFilters() {
        document.getElementById('searchInput').value = '';
        document.getElementById('categoryFilter').value = '';
        document.getElementById('componentFilter').value = '';
        this.displayEntries();
    }

    // Export data to JSON
    exportData() {
        if (this.entries.length === 0) {
            this.showMessage('No entries to export!', 'error');
            return;
        }

        const dataStr = JSON.stringify(this.entries, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        
        const link = document.createElement('a');
        link.href = url;
        link.download = `runbook-entries-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);

        this.showMessage('Data exported successfully!', 'success');
    }

    // Show message to user
    showMessage(message, type = 'success') {
        // Remove existing messages
        const existingMessages = document.querySelectorAll('.success-message, .error-message');
        existingMessages.forEach(msg => msg.remove());

        const messageDiv = document.createElement('div');
        messageDiv.className = type === 'success' ? 'success-message' : 'error-message';
        messageDiv.textContent = message;

        const container = document.querySelector('.container');
        container.insertBefore(messageDiv, container.firstChild.nextSibling);

        // Auto-remove message after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.remove();
            }
        }, 5000);
    }

    // Utility functions
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RunbookApp();
});

// Add some sample data if no entries exist (for demonstration)
document.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('runbookEntries');
    if (!stored || JSON.parse(stored).length === 0) {
        const sampleEntries = [
            {
                id: 'sample-1',
                title: 'GitLab Runner Configuration',
                category: 'configuration',
                component: 'gitlab',
                tags: ['gitlab', 'runner', 'ci-cd'],
                description: `1. Install GitLab Runner on the target machine
2. Register the runner with GitLab instance
3. Configure runner tags and executor type
4. Set up shared volumes if needed
5. Test runner with a simple pipeline
6. Monitor runner status in GitLab UI`,
                notes: 'Ensure proper network connectivity and sufficient disk space.',
                createdAt: new Date(Date.now() - 86400000).toISOString(),
                updatedAt: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 'sample-2',
                title: 'Jenkins Pipeline Troubleshooting',
                category: 'troubleshooting',
                component: 'jenkins',
                tags: ['jenkins', 'pipeline', 'troubleshooting'],
                description: `1. Check Jenkins logs for error messages
2. Verify pipeline syntax in Jenkinsfile
3. Check agent/node availability
4. Validate credentials and permissions
5. Review plugin compatibility
6. Test pipeline steps individually
7. Check workspace cleanup`,
                notes: 'Common issues: syntax errors, missing plugins, credential problems.',
                createdAt: new Date(Date.now() - 172800000).toISOString(),
                updatedAt: new Date(Date.now() - 172800000).toISOString()
            }
        ];
        
        localStorage.setItem('runbookEntries', JSON.stringify(sampleEntries));
    }
});