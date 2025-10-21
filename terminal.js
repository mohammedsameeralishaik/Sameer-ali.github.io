// Terminal Portfolio JavaScript
class TerminalPortfolio {
    constructor() {
        this.currentSection = null;
        this.init();
    }

    init() {
        this.setupMatrixRain();
        this.setupTypingEffects();
        this.setupCommandNavigation();
        this.setupTerminalInput();
        this.setupBootSequence();
    }

    // Matrix Rain Background Effect
    setupMatrixRain() {
        const canvas = document.getElementById('matrix-bg');
        const ctx = canvas.getContext('2d');

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const matrix = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const matrixArray = matrix.split("");

        const fontSize = 14;
        const columns = canvas.width / fontSize;
        const drops = [];

        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }

        function draw() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = '#00ff41';
            ctx.font = fontSize + 'px JetBrains Mono';

            for (let i = 0; i < drops.length; i++) {
                const text = matrixArray[Math.floor(Math.random() * matrixArray.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        }

        setInterval(draw, 35);

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    // Boot Sequence Animation
    setupBootSequence() {
        const bootLines = document.querySelectorAll('.boot-line');
        bootLines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
            }, index * 500);
        });
    }

    // Typing Effects
    setupTypingEffects() {
        this.typeText('hero-text', 'whoami', 100, () => {
            setTimeout(() => {
                this.showHeroOutput();
            }, 500);
        });
    }

    typeText(elementId, text, speed, callback) {
        const element = document.getElementById(elementId);
        let i = 0;

        const timer = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(timer);
                if (callback) callback();
            }
        }, speed);
    }

    showHeroOutput() {
        const output = document.getElementById('hero-output');
        output.style.display = 'block';

        // Animate typing effect for status
        setTimeout(() => {
            const statusElement = output.querySelector('.output-value.typing');
            statusElement.style.width = '100%';
        }, 1000);
    }

    // Command Navigation
    setupCommandNavigation() {
        const commandOptions = document.querySelectorAll('.command-option');

        commandOptions.forEach(option => {
            option.addEventListener('click', () => {
                const section = option.dataset.section;
                this.navigateToSection(section);
            });
        });
    }

    navigateToSection(sectionName) {
        // Hide all sections
        const sections = document.querySelectorAll('.content-section');
        sections.forEach(section => {
            section.classList.remove('active');
        });

        // Show target section
        const targetSection = document.getElementById(`${sectionName}-section`);
        if (targetSection) {
            targetSection.classList.add('active');
            this.currentSection = sectionName;

            // Scroll to dynamic content
            const dynamicContent = document.getElementById('dynamic-content');
            dynamicContent.scrollIntoView({ behavior: 'smooth' });
        }
    }

    // Terminal Input Handling
    setupTerminalInput() {
        const terminalInput = document.getElementById('terminal-input');

        terminalInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const command = terminalInput.value.trim().toLowerCase();
                this.processCommand(command);
                terminalInput.value = '';
            }
        });
    }

    processCommand(command) {
        const commands = {
            'help': this.showHelp,
            'clear': this.clearTerminal,
            'ls': () => this.navigateToSection('skills'),
            'cat about.txt': () => this.navigateToSection('about'),
            'cd projects': () => this.navigateToSection('projects'),
            'ping contact': () => this.navigateToSection('contact'),
            'whoami': () => this.showHeroOutput(),
            'pwd': this.showCurrentPath,
            'date': this.showDate,
            'echo': (args) => this.echo(args)
        };

        const [cmd, ...args] = command.split(' ');
        const commandFunction = commands[cmd] || commands[command];

        if (commandFunction) {
            commandFunction.call(this, args.join(' '));
        } else {
            this.showError(`Command not found: ${cmd}`);
        }
    }

    showHelp() {
        const helpText = `
Available commands:
  help          - Show this help message
  whoami        - Display current user information
  cat about.txt - Read about me
  ls            - List skills directory
  cd projects   - Navigate to projects
  ping contact  - Show contact information
  clear         - Clear terminal
  pwd           - Show current path
  date          - Show current date
  echo [text]   - Echo text to terminal

Navigation shortcuts:
  1. cat about.txt
  2. ls skills/
  3. cd projects && ls -la
  4. ping contact
        `;

        this.addTerminalOutput(helpText, 'help');
    }

    clearTerminal() {
        const dynamicContent = document.getElementById('dynamic-content');
        dynamicContent.innerHTML = '';
        this.currentSection = null;
    }

    showCurrentPath() {
        const path = this.currentSection ? `~/portfolio/${this.currentSection}` : '~/portfolio';
        this.addTerminalOutput(path, 'path');
    }

    showDate() {
        const date = new Date().toString();
        this.addTerminalOutput(date, 'date');
    }

    echo(text) {
        this.addTerminalOutput(text || '', 'echo');
    }

    showError(message) {
        this.addTerminalOutput(`Error: ${message}`, 'error');
    }

    addTerminalOutput(content, type = 'output') {
        const outputDiv = document.createElement('div');
        outputDiv.className = 'terminal-output-line';
        outputDiv.innerHTML = `<span class="output-prefix">${type}:</span><span class="output-value">${content}</span>`;

        const dynamicContent = document.getElementById('dynamic-content');
        dynamicContent.appendChild(outputDiv);
        dynamicContent.scrollTop = dynamicContent.scrollHeight;
    }

    // Progress Bar Animation
    animateProgressBars() {
        const progressBars = document.querySelectorAll('.progress-fill');
        progressBars.forEach((bar, index) => {
            setTimeout(() => {
                bar.style.width = bar.parentElement.previousElementSibling.textContent;
            }, index * 200);
        });
    }

    // Form Handling
    setupFormHandling() {
        const form = document.querySelector('.terminal-form');
        if (form) {
            form.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleFormSubmission(form);
            });
        }
    }

    handleFormSubmission(form) {
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simulate form submission
        this.addTerminalOutput('Sending message...', 'status');

        setTimeout(() => {
            this.addTerminalOutput('Message sent successfully! ✓', 'success');
            form.reset();
        }, 2000);
    }
}

// Initialize Terminal Portfolio
document.addEventListener('DOMContentLoaded', () => {
    const terminal = new TerminalPortfolio();

    // Animate progress bars when skills section is shown
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const target = mutation.target;
                if (target.id === 'skills-section' && target.classList.contains('active')) {
                    terminal.animateProgressBars();
                }
            }
        });
    });

    const skillsSection = document.getElementById('skills-section');
    if (skillsSection) {
        observer.observe(skillsSection, { attributes: true });
    }

    // Setup form handling
    terminal.setupFormHandling();
});

// Typing animation for code snippets
function typeCode(element, code, speed = 50) {
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

// Add some interactive terminal effects
document.addEventListener('click', (e) => {
    if (e.target.closest('.command-option')) {
        // Add click effect
        const option = e.target.closest('.command-option');
        option.style.transform = 'scale(0.98)';

        setTimeout(() => {
            option.style.transform = '';
        }, 150);
    }
});

// Terminal window controls (visual only)
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('control')) {
        if (e.target.classList.contains('close')) {
            // Visual close effect
            document.querySelector('.terminal-window').style.transform = 'scale(0.8) rotateX(90deg)';
            setTimeout(() => {
                alert('Terminal closed! Refresh to restart.');
            }, 500);
        }
    }
});
