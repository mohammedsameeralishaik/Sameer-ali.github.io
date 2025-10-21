// VS Code Portfolio JavaScript
class VSCodePortfolio {
    constructor() {
        this.currentFile = 'readme.md';
        this.init();
    }

    init() {
        this.setupActivityBar();
        this.setupFileNavigation();
        this.setupTabSystem();
        this.setupSyntaxHighlighting();
        this.setupStatusBar();
        this.showWelcomeMessage();
    }

    // Activity Bar Navigation
    setupActivityBar() {
        const activityItems = document.querySelectorAll('.activity-item');

        activityItems.forEach(item => {
            item.addEventListener('click', () => {
                // Remove active class from all items
                activityItems.forEach(i => i.classList.remove('active'));
                // Add active class to clicked item
                item.classList.add('active');

                // Show corresponding panel
                const view = item.dataset.view;
                this.showSidebarPanel(view);
            });
        });
    }

    showSidebarPanel(panelName) {
        // Hide all panels
        const panels = document.querySelectorAll('.sidebar-panel');
        panels.forEach(panel => panel.classList.remove('active'));

        // Show selected panel
        const targetPanel = document.getElementById(`${panelName}-panel`);
        if (targetPanel) {
            targetPanel.classList.add('active');
        }
    }

    // File Navigation
    setupFileNavigation() {
        const fileItems = document.querySelectorAll('.explorer-item[data-file]');

        fileItems.forEach(item => {
            item.addEventListener('click', () => {
                const fileName = item.dataset.file;
                this.openFile(fileName);

                // Update active state
                document.querySelectorAll('.explorer-item').forEach(i => i.classList.remove('active'));
                item.classList.add('active');
            });
        });

        // Folder expansion
        const folderItems = document.querySelectorAll('.explorer-item.folder');
        folderItems.forEach(item => {
            item.addEventListener('click', () => {
                item.classList.toggle('expanded');
                const submenu = item.nextElementSibling;
                if (submenu && submenu.classList.contains('explorer-submenu')) {
                    submenu.style.display = submenu.style.display === 'none' ? 'block' : 'none';
                }
            });
        });
    }

    openFile(fileName) {
        this.currentFile = fileName;

        // Update tab
        this.updateTab(fileName);

        // Show file content
        this.showFileContent(fileName);

        // Update status bar
        this.updateStatusBar(fileName);
    }

    // Tab System
    setupTabSystem() {
        // Tab close buttons
        document.addEventListener('click', (e) => {
            if (e.target.classList.contains('fa-times')) {
                e.stopPropagation();
                const tab = e.target.closest('.tab');
                if (tab) {
                    this.closeTab(tab);
                }
            }
        });

        // Tab clicking
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab')) {
                const tab = e.target.closest('.tab');
                const fileName = tab.dataset.file;
                this.switchToTab(fileName);
            }
        });
    }

    updateTab(fileName) {
        const tabsContainer = document.querySelector('.editor-tabs');

        // Check if tab already exists
        let existingTab = document.querySelector(`.tab[data-file="${fileName}"]`);

        if (!existingTab) {
            // Create new tab
            const tab = document.createElement('div');
            tab.className = 'tab';
            tab.dataset.file = fileName;
            tab.innerHTML = `
                <span>${this.getFileDisplayName(fileName)}</span>
                <i class="fas fa-times"></i>
            `;
            tabsContainer.appendChild(tab);
            existingTab = tab;
        }

        // Make tab active
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        existingTab.classList.add('active');
    }

    switchToTab(fileName) {
        this.currentFile = fileName;
        this.showFileContent(fileName);
        this.updateStatusBar(fileName);

        // Update active tab
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        const tab = document.querySelector(`.tab[data-file="${fileName}"]`);
        if (tab) {
            tab.classList.add('active');
        }

        // Update explorer active state
        document.querySelectorAll('.explorer-item').forEach(i => i.classList.remove('active'));
        const explorerItem = document.querySelector(`.explorer-item[data-file="${fileName}"]`);
        if (explorerItem) {
            explorerItem.classList.add('active');
        }
    }

    closeTab(tab) {
        const fileName = tab.dataset.file;
        const tabsContainer = document.querySelector('.editor-tabs');

        // Remove tab
        tab.remove();

        // If this was the active tab, switch to another tab or README
        if (tab.classList.contains('active')) {
            const remainingTabs = document.querySelectorAll('.tab');
            if (remainingTabs.length > 0) {
                const nextTab = remainingTabs[remainingTabs.length - 1];
                this.switchToTab(nextTab.dataset.file);
            } else {
                // No tabs left, open README
                this.openFile('readme.md');
            }
        }

        // Hide file content
        const fileContent = document.getElementById(`${fileName.replace('.', '-')}-content`);
        if (fileContent) {
            fileContent.classList.remove('active');
        }
    }

    getFileDisplayName(fileName) {
        const names = {
            'readme.md': 'README.md',
            'about.py': 'about.py',
            'skills.json': 'skills.json',
            'contact.js': 'contact.js'
        };
        return names[fileName] || fileName;
    }

    // File Content Display
    showFileContent(fileName) {
        // Hide all file contents
        document.querySelectorAll('.editor-file').forEach(f => f.classList.remove('active'));

        // Show selected file content
        const contentId = `${fileName.replace('.', '-')}-content`;
        const fileContent = document.getElementById(contentId);
        if (fileContent) {
            fileContent.classList.add('active');
        }
    }

    // Syntax Highlighting Animation
    setupSyntaxHighlighting() {
        // Animate code appearance
        const codeLines = document.querySelectorAll('.code-line');
        codeLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, index * 50);
        });
    }

    // Status Bar Updates
    setupStatusBar() {
        this.updateStatusBar(this.currentFile);
    }

    updateStatusBar(fileName) {
        const languageElement = document.querySelector('.status-right .language');
        const encodingElement = document.querySelector('.status-right .encoding');

        const languages = {
            'readme.md': 'Markdown',
            'about.py': 'Python',
            'skills.json': 'JSON',
            'contact.js': 'JavaScript'
        };

        if (languageElement) {
            languageElement.textContent = languages[fileName] || 'Plain Text';
        }

        if (encodingElement) {
            encodingElement.textContent = 'UTF-8';
        }
    }

    // Welcome Message
    showWelcomeMessage() {
        setTimeout(() => {
            this.displayNotification('Welcome to Sameer\'s Portfolio!', 'Check out the files in the explorer.');
        }, 2000);
    }

    displayNotification(title, message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'vscode-notification';
        notification.innerHTML = `
            <div class="notification-header">
                <span class="notification-title">${title}</span>
                <i class="fas fa-times notification-close"></i>
            </div>
            <div class="notification-body">${message}</div>
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        }, 100);

        // Auto remove after 5 seconds
        setTimeout(() => {
            this.removeNotification(notification);
        }, 5000);

        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            this.removeNotification(notification);
        });
    }

    removeNotification(notification) {
        notification.style.transform = 'translateX(100%)';
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }

    // Git Integration Simulation
    setupGitFeatures() {
        // Simulate git status updates
        setInterval(() => {
            const syncStatus = document.querySelector('.sync-status');
            if (syncStatus) {
                const random = Math.random();
                if (random > 0.95) {
                    syncStatus.innerHTML = '<i class="fas fa-sync"></i> 0 ↓ 1 ↑';
                    setTimeout(() => {
                        syncStatus.innerHTML = '<i class="fas fa-sync"></i> 0 ↓ 0 ↑';
                    }, 3000);
                }
            }
        }, 10000);
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + P for command palette
            if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
                e.preventDefault();
                this.showCommandPalette();
            }

            // Ctrl/Cmd + B for sidebar toggle
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                this.toggleSidebar();
            }
        });
    }

    showCommandPalette() {
        // Create command palette
        const palette = document.createElement('div');
        palette.className = 'command-palette';
        palette.innerHTML = `
            <input type="text" placeholder="Type a command..." class="palette-input">
            <div class="palette-results">
                <div class="palette-item" data-command="openFile">Open File...</div>
                <div class="palette-item" data-command="newFile">New File</div>
                <div class="palette-item" data-command="saveFile">Save File</div>
                <div class="palette-item" data-command="settings">Preferences: Open Settings</div>
            </div>
        `;

        document.body.appendChild(palette);

        const input = palette.querySelector('.palette-input');
        input.focus();

        // Handle input
        input.addEventListener('input', (e) => {
            this.filterCommands(e.target.value, palette);
        });

        // Handle clicks
        palette.addEventListener('click', (e) => {
            if (e.target.classList.contains('palette-item')) {
                const command = e.target.dataset.command;
                this.executeCommand(command);
                palette.remove();
            }
        });

        // Close on escape
        document.addEventListener('keydown', function closePalette(e) {
            if (e.key === 'Escape') {
                palette.remove();
                document.removeEventListener('keydown', closePalette);
            }
        });
    }

    filterCommands(query, palette) {
        const items = palette.querySelectorAll('.palette-item');
        items.forEach(item => {
            const text = item.textContent.toLowerCase();
            item.style.display = text.includes(query.toLowerCase()) ? 'block' : 'none';
        });
    }

    executeCommand(command) {
        switch (command) {
            case 'openFile':
                this.displayNotification('Open File', 'File explorer is in the sidebar!');
                break;
            case 'newFile':
                this.displayNotification('New File', 'Use the terminal for file creation!');
                break;
            case 'saveFile':
                this.displayNotification('File Saved', 'All changes have been saved.');
                break;
            case 'settings':
                this.displayNotification('Settings', 'Portfolio settings are optimized!');
                break;
        }
    }

    toggleSidebar() {
        const sidebar = document.querySelector('.vscode-sidebar');
        sidebar.style.display = sidebar.style.display === 'none' ? 'flex' : 'none';
    }
}

// Initialize VS Code Portfolio
document.addEventListener('DOMContentLoaded', () => {
    const vscode = new VSCodePortfolio();

    // Setup additional features
    vscode.setupGitFeatures();
    vscode.setupKeyboardShortcuts();

    // Add VS Code notification styles
    const style = document.createElement('style');
    style.textContent = `
        .vscode-notification {
            position: fixed;
            top: 50px;
            right: 20px;
            width: 300px;
            background: #2d2d30;
            border: 1px solid #3e3e42;
            border-radius: 4px;
            color: #cccccc;
            font-family: 'Fira Code', monospace;
            font-size: 13px;
            z-index: 1000;
            transform: translateX(100%);
            opacity: 0;
            transition: all 0.3s ease;
        }

        .notification-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 8px 12px;
            border-bottom: 1px solid #3e3e42;
        }

        .notification-title {
            font-weight: 600;
        }

        .notification-close {
            cursor: pointer;
            opacity: 0.6;
        }

        .notification-close:hover {
            opacity: 1;
        }

        .notification-body {
            padding: 12px;
        }

        .command-palette {
            position: fixed;
            top: 30%;
            left: 50%;
            transform: translateX(-50%);
            width: 400px;
            background: #2d2d30;
            border: 1px solid #3e3e42;
            border-radius: 4px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
            z-index: 1000;
        }

        .palette-input {
            width: 100%;
            padding: 12px;
            background: #1e1e1e;
            border: none;
            border-bottom: 1px solid #3e3e42;
            color: #cccccc;
            font-family: 'Fira Code', monospace;
            outline: none;
        }

        .palette-results {
            max-height: 200px;
            overflow-y: auto;
        }

        .palette-item {
            padding: 8px 12px;
            cursor: pointer;
            color: #cccccc;
            transition: background 0.2s ease;
        }

        .palette-item:hover {
            background: rgba(0, 122, 204, 0.2);
        }
    `;
    document.head.appendChild(style);
});

// Typing effect for code
function typeCode(element, code, speed = 30) {
    let i = 0;
    element.textContent = '';

    function typeWriter() {
        if (i < code.length) {
            element.textContent += code.charAt(i);
            i++;
            setTimeout(typeWriter, speed);
        }
    }

    typeWriter();
}

// Add some VS Code-like interactions
document.addEventListener('contextmenu', (e) => {
    e.preventDefault();

    // Create context menu
    const menu = document.createElement('div');
    menu.className = 'context-menu';
    menu.style.left = e.pageX + 'px';
    menu.style.top = e.pageY + 'px';
    menu.innerHTML = `
        <div class="context-item">Copy</div>
        <div class="context-item">Paste</div>
        <div class="context-item">Find</div>
        <div class="context-item">Replace</div>
    `;

    document.body.appendChild(menu);

    // Remove menu on click outside
    document.addEventListener('click', function removeMenu() {
        menu.remove();
        document.removeEventListener('click', removeMenu);
    });
});

// Add context menu styles
const contextStyle = document.createElement('style');
contextStyle.textContent = `
    .context-menu {
        position: absolute;
        background: #2d2d30;
        border: 1px solid #3e3e42;
        border-radius: 4px;
        padding: 4px 0;
        z-index: 1000;
        min-width: 120px;
    }

    .context-item {
        padding: 6px 12px;
        color: #cccccc;
        cursor: pointer;
        font-size: 13px;
        font-family: 'Fira Code', monospace;
    }

    .context-item:hover {
        background: rgba(0, 122, 204, 0.2);
    }
`;
document.head.appendChild(contextStyle);
