# Centralized Runbook Application

A simple, user-friendly web application for maintaining and searching through operational procedures and documentation. Perfect for teams who need to centralize their runbooks, troubleshooting guides, and operational procedures.

## Features

### ✨ Core Functionality
- **Simple Form Interface**: Easy-to-use form for adding new runbook entries
- **Comprehensive Search**: Search across titles, descriptions, tags, and notes
- **Category Organization**: Organize entries by categories (Troubleshooting, Deployment, Maintenance, etc.)
- **Priority Levels**: Set priority levels (Critical, High, Medium, Low) for entries
- **Tag System**: Add multiple tags for better organization and searchability
- **Detailed View**: Click on any entry to view full details in a modal
- **Data Export**: Export all entries to JSON format for backup or migration

### 🎨 User Experience
- **Clean, Professional Interface**: Modern gradient design with intuitive layout
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Real-time Search**: Search results update as you type
- **Visual Priority Indicators**: Color-coded priority levels for quick identification
- **Date Tracking**: Automatic creation and update timestamps

### 💾 Data Management
- **Local Storage**: All data is stored locally in your browser
- **Persistent Data**: Entries are saved automatically and persist between sessions
- **Edit & Delete**: Full CRUD operations - Create, Read, Update, Delete entries
- **Data Export**: Backup your data anytime with the export feature

## Getting Started

### Installation
1. Download all files to a folder on your computer:
   - `index.html`
   - `styles.css`
   - `script.js`

2. Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge)

### First Use
1. **Adding Your First Entry**:
   - Fill in the "Title" field with a descriptive name
   - Select a "Category" from the dropdown
   - Choose a "Priority" level
   - Add relevant "Tags" separated by commas
   - Write the detailed procedure in "Description/Procedure"
   - Add any additional notes if needed
   - Click "Save Entry"

2. **Searching Entries**:
   - Use the search box to find entries by title, description, tags, or notes
   - Use the category and priority filters for more specific searches
   - Click "Clear Filters" to reset all filters

3. **Viewing Entry Details**:
   - Click on any entry card to view full details
   - Use "Edit" to modify the entry
   - Use "Delete" to remove the entry (with confirmation)

## Usage Guide

### Adding Entries
Fill out the form with the following information:

- **Title** (Required): A clear, descriptive title for your procedure
- **Category** (Required): Choose from predefined categories:
  - Troubleshooting
  - Deployment
  - Maintenance
  - Configuration
  - Monitoring
  - Security
  - Backup & Recovery
  - Other
- **Priority**: Set the urgency level (Critical, High, Medium, Low)
- **Tags**: Add keywords separated by commas for better searchability
- **Description/Procedure** (Required): Detailed steps or information
- **Additional Notes**: Any extra information, warnings, or related details

### Searching and Filtering
- **Text Search**: Enter keywords in the search box to find matching entries
- **Category Filter**: Filter by specific categories
- **Priority Filter**: Filter by priority levels
- **Combined Filters**: Use multiple filters together for precise results

### Managing Entries
- **View Details**: Click any entry to see full information
- **Edit Entry**: Click "Edit" in the modal to modify an existing entry
- **Delete Entry**: Click "Delete" in the modal to remove an entry
- **Export Data**: Click "Export Data" to download all entries as JSON

## Sample Entry

Here's an example of a well-structured runbook entry:

**Title**: "Server Restart Procedure"
**Category**: Maintenance
**Priority**: High
**Tags**: server, restart, maintenance, downtime
**Description**: 
```
1. Check current server load and active connections
2. Notify users about planned maintenance
3. Stop application services gracefully
4. Restart the server
5. Verify all services are running
6. Check application functionality
7. Monitor for any issues
```
**Notes**: "Always perform during low-traffic hours. Keep backup server ready."

## Best Practices

### Writing Effective Runbook Entries
1. **Use Clear Titles**: Make titles descriptive and searchable
2. **Step-by-Step Procedures**: Break down complex tasks into numbered steps
3. **Include Prerequisites**: List what's needed before starting
4. **Add Context**: Explain why steps are necessary
5. **Use Consistent Tags**: Develop a tagging strategy for your team
6. **Regular Updates**: Keep procedures current and accurate

### Organization Tips
1. **Consistent Categories**: Use the same categories across your team
2. **Priority Guidelines**: Establish clear criteria for priority levels
3. **Tag Standards**: Create a list of standard tags for common topics
4. **Regular Reviews**: Periodically review and update entries
5. **Backup Data**: Export your data regularly for backup

## Technical Details

### Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Data Storage
- Uses browser's localStorage API
- Data persists until manually cleared
- No server required - fully client-side
- Maximum storage depends on browser (typically 5-10MB)

### File Structure
```
runbook/
├── index.html      # Main application file
├── styles.css      # Styling and layout
├── script.js       # Application logic
└── README.md       # This documentation
```

## Troubleshooting

### Common Issues

**Q: My entries disappeared**
A: Check if localStorage was cleared. Entries are stored locally in your browser.

**Q: Search isn't working**
A: Ensure JavaScript is enabled in your browser.

**Q: Can't add new entries**
A: Check that all required fields (Title, Category, Description) are filled.

**Q: Export button not working**
A: Ensure your browser allows file downloads and isn't blocking pop-ups.

### Data Recovery
If you lose data, check:
1. Browser history for cached versions
2. Any exported JSON files you may have created
3. Other browsers if you used the app elsewhere

## Support and Customization

### Adding New Categories
To add new categories, edit the `<select id="category">` options in `index.html` and the corresponding filter dropdown.

### Modifying Priority Levels
Priority levels can be customized by editing both the form dropdown and the CSS classes for color coding.

### Styling Changes
All visual customization can be done through `styles.css`. The application uses CSS custom properties for easy theme modifications.

## Security Notes

- All data is stored locally in your browser
- No data is transmitted to external servers
- Consider the sensitivity of information you store
- For sensitive data, ensure your device is properly secured
- Regular backups are recommended for important procedures

## Version History

### v1.0.0 (Current)
- Initial release
- Full CRUD functionality
- Search and filtering
- Export capabilities
- Responsive design
- Local storage persistence

---

**Need Help?** This application is designed to be simple and intuitive. If you encounter issues, check the troubleshooting section above or refer to the usage examples.