// Space Explorer Portfolio JavaScript
class SpaceExplorer {
    constructor() {
        this.currentScreen = 'welcome';
        this.missionStartTime = Date.now();
        this.stars = [];
        this.planets = [];
        this.init();
    }

    init() {
        this.setupStarfield();
        this.setupPlanetNavigation();
        this.setupMissionTimer();
        this.setupFormSubmission();
        this.setupSkillAnimations();
        this.animate();
    }

    // Starfield Background
    setupStarfield() {
        const canvas = document.getElementById('starfield');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create stars
        for (let i = 0; i < 200; i++) {
            this.stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 1000,
                size: Math.random() * 2 + 0.5,
                brightness: Math.random(),
                twinkle: Math.random() * 0.02
            });
        }

        this.starCanvas = canvas;
        this.starCtx = ctx;
    }

    // Planet Navigation
    setupPlanetNavigation() {
        const planets = document.querySelectorAll('.planet');

        planets.forEach(planet => {
            planet.addEventListener('click', () => {
                const section = planet.dataset.section;
                this.navigateToSection(section);
                this.highlightPlanet(planet);
            });

            // Add hover effects
            planet.addEventListener('mouseenter', () => {
                this.showPlanetTooltip(planet);
            });

            planet.addEventListener('mouseleave', () => {
                this.hidePlanetTooltip(planet);
            });
        });
    }

    navigateToSection(section) {
        // Hide all screens
        document.querySelectorAll('.screen-content').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(`${section}-screen`);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = section;
        }

        // Update control buttons
        document.querySelectorAll('.control-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.dataset.section === section) {
                btn.classList.add('active');
            }
        });

        // Add navigation sound effect (visual feedback)
        this.createNavigationEffect();
    }

    highlightPlanet(planet) {
        // Remove highlight from all planets
        document.querySelectorAll('.planet').forEach(p => {
            p.classList.remove('active');
        });

        // Add highlight to clicked planet
        planet.classList.add('active');

        // Add glow effect
        planet.style.boxShadow = '0 0 40px rgba(0, 212, 255, 0.8)';
        setTimeout(() => {
            planet.style.boxShadow = '';
        }, 1000);
    }

    showPlanetTooltip(planet) {
        const tooltip = planet.querySelector('.planet-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
        }
    }

    hidePlanetTooltip(planet) {
        const tooltip = planet.querySelector('.planet-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        }
    }

    createNavigationEffect() {
        // Create particle burst effect
        const burst = document.createElement('div');
        burst.className = 'navigation-burst';
        burst.style.position = 'fixed';
        burst.style.top = '50%';
        burst.style.left = '50%';
        burst.style.width = '0px';
        burst.style.height = '0px';
        burst.style.borderRadius = '50%';
        burst.style.background = 'radial-gradient(circle, rgba(0, 212, 255, 0.6) 0%, transparent 70%)';
        burst.style.transform = 'translate(-50%, -50%)';
        burst.style.zIndex = '1000';
        burst.style.pointerEvents = 'none';

        document.body.appendChild(burst);

        // Animate burst
        setTimeout(() => {
            burst.style.width = '200px';
            burst.style.height = '200px';
            burst.style.opacity = '0';
            burst.style.transition = 'all 0.8s ease-out';
        }, 10);

        // Remove burst
        setTimeout(() => {
            if (burst.parentNode) {
                burst.remove();
            }
        }, 800);
    }

    // Mission Timer
    setupMissionTimer() {
        const updateTimer = () => {
            const elapsed = Date.now() - this.missionStartTime;
            const hours = Math.floor(elapsed / 3600000);
            const minutes = Math.floor((elapsed % 3600000) / 60000);
            const seconds = Math.floor((elapsed % 60000) / 1000);

            const timerElement = document.getElementById('mission-time');
            if (timerElement) {
                timerElement.textContent = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
            }
        };

        setInterval(updateTimer, 1000);
        updateTimer();
    }

    // Form Submission
    setupFormSubmission() {
        const form = document.querySelector('.space-form');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(form);
            const data = Object.fromEntries(formData);

            // Simulate transmission
            this.simulateTransmission(data);

            // Reset form
            form.reset();
        });
    }

    simulateTransmission(data) {
        // Show transmission in progress
        const btn = document.querySelector('.transmission-btn');
        const originalText = btn.innerHTML;
        btn.innerHTML = '<i class="fas fa-satellite"></i> TRANSMITTING...';
        btn.disabled = true;

        // Simulate delay
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> TRANSMISSION COMPLETE';
            btn.style.background = 'linear-gradient(135deg, #00ff00, #00cc00)';

            // Show success message
            this.showTransmissionMessage('Transmission received! Commander will respond shortly.', 'success');

            // Reset button
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
                btn.style.background = '';
            }, 3000);
        }, 2000);
    }

    showTransmissionMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `transmission-message ${type}`;
        messageDiv.textContent = message;
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? 'rgba(0, 255, 0, 0.9)' : 'rgba(255, 0, 0, 0.9)'};
            color: #000;
            padding: 15px 20px;
            border-radius: 8px;
            font-family: 'Orbitron', monospace;
            font-weight: 600;
            z-index: 1000;
            box-shadow: 0 0 20px rgba(0, 212, 255, 0.5);
            animation: slideIn 0.5s ease-out;
        `;

        document.body.appendChild(messageDiv);

        // Auto remove
        setTimeout(() => {
            messageDiv.style.animation = 'slideOut 0.5s ease-in';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.remove();
                }
            }, 500);
        }, 4000);
    }

    // Skill Animations
    setupSkillAnimations() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateSkills();
                }
            });
        });

        const skillsScreen = document.getElementById('skills-screen');
        if (skillsScreen) {
            observer.observe(skillsScreen);
        }
    }

    animateSkills() {
        const skillFills = document.querySelectorAll('.skill-fill');
        skillFills.forEach((fill, index) => {
            setTimeout(() => {
                fill.style.width = fill.style.width || '0%';
                fill.style.animation = 'none'; // Reset animation
                setTimeout(() => {
                    fill.style.width = fill.getAttribute('style').match(/width:\s*(\d+)%/)?.[1] + '%' || '85%';
                }, 100);
            }, index * 200);
        });
    }

    // Animation Loop
    animate() {
        this.updateStars();
        this.renderStars();
        this.updateSpaceDebris();

        requestAnimationFrame(() => this.animate());
    }

    updateStars() {
        this.stars.forEach(star => {
            // Twinkle effect
            star.brightness += star.twinkle;
            if (star.brightness > 1 || star.brightness < 0) {
                star.twinkle *= -1;
            }

            // Subtle movement
            star.x += Math.sin(Date.now() * 0.001 + star.z) * 0.1;
            star.y += Math.cos(Date.now() * 0.001 + star.z) * 0.1;
        });
    }

    renderStars() {
        if (!this.starCtx) return;

        // Clear canvas
        this.starCtx.clearRect(0, 0, this.starCanvas.width, this.starCanvas.height);

        // Draw stars
        this.stars.forEach(star => {
            const alpha = star.brightness * (star.z / 1000 + 0.3);
            const size = star.size * (star.z / 1000 + 0.5);

            this.starCtx.save();
            this.starCtx.globalAlpha = alpha;
            this.starCtx.fillStyle = '#ffffff';
            this.starCtx.beginPath();
            this.starCtx.arc(star.x, star.y, size, 0, Math.PI * 2);
            this.starCtx.fill();

            // Add glow
            this.starCtx.shadowBlur = size * 3;
            this.starCtx.shadowColor = '#00d4ff';
            this.starCtx.fill();

            this.starCtx.restore();
        });
    }

    updateSpaceDebris() {
        // Animate space debris
        const debris = document.querySelectorAll('.debris');
        debris.forEach((piece, index) => {
            const time = Date.now() * 0.001;
            const offset = index * 0.5;

            piece.style.transform = `
                translateX(${Math.sin(time + offset) * 20}px)
                translateY(${Math.cos(time + offset) * 15}px)
                rotate(${time * 10 + offset * 45}deg)
            `;
        });
    }

    // Control Panel Interactions
    setupControlPanel() {
        const controlBtns = document.querySelectorAll('.control-btn');

        controlBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const section = btn.dataset.section;
                this.navigateToSection(section);

                // Find corresponding planet and highlight it
                const planet = document.querySelector(`.planet[data-section="${section}"]`);
                if (planet) {
                    this.highlightPlanet(planet);
                }
            });
        });
    }

    // Keyboard Shortcuts
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Number keys for navigation
            const keyMap = {
                '49': 'about',     // 1
                '50': 'skills',    // 2
                '51': 'projects',  // 3
                '52': 'contact'    // 4
            };

            if (keyMap[e.keyCode]) {
                e.preventDefault();
                this.navigateToSection(keyMap[e.keyCode]);

                const planet = document.querySelector(`.planet[data-section="${keyMap[e.keyCode]}"]`);
                if (planet) {
                    this.highlightPlanet(planet);
                }
            }

            // Escape to return to welcome
            if (e.keyCode === 27) {
                this.navigateToSection('welcome');
                document.querySelectorAll('.planet').forEach(p => p.classList.remove('active'));
            }
        });
    }

    // Performance optimizations
    optimizePerformance() {
        // Reduce star count on mobile
        if (window.innerWidth < 768) {
            this.stars = this.stars.slice(0, 50);
        }

        // Throttle animations on low-performance devices
        let lastTime = 0;
        const animate = (currentTime) => {
            if (currentTime - lastTime >= 16) { // ~60fps
                this.updateStars();
                this.renderStars();
                this.updateSpaceDebris();
                lastTime = currentTime;
            }
            requestAnimationFrame(animate);
        };
        requestAnimationFrame(animate);
    }
}

// Enhanced Space Features
class EnhancedSpaceFeatures {
    constructor() {
        this.particles = [];
        this.init();
    }

    init() {
        this.setupParticleSystem();
        this.setupInteractiveElements();
        this.setupSoundEffects();
    }

    setupParticleSystem() {
        // Create floating particles in space
        for (let i = 0; i < 30; i++) {
            this.particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
                life: Math.random() * 100 + 50
            });
        }
    }

    setupInteractiveElements() {
        // Add hover effects to planets
        document.querySelectorAll('.planet').forEach(planet => {
            planet.addEventListener('mouseenter', () => {
                planet.style.animationDuration = '10s'; // Speed up rotation
            });

            planet.addEventListener('mouseleave', () => {
                planet.style.animationDuration = '20s'; // Normal speed
            });
        });

        // Add click effects
        document.addEventListener('click', (e) => {
            if (e.target.closest('.planet')) {
                this.createClickEffect(e.clientX, e.clientY);
            }
        });
    }

    createClickEffect(x, y) {
        const effect = document.createElement('div');
        effect.style.cssText = `
            position: fixed;
            left: ${x - 25}px;
            top: ${y - 25}px;
            width: 50px;
            height: 50px;
            border: 2px solid #00d4ff;
            border-radius: 50%;
            animation: clickEffect 0.6s ease-out;
            pointer-events: none;
            z-index: 1000;
        `;

        document.body.appendChild(effect);

        setTimeout(() => {
            if (effect.parentNode) {
                effect.remove();
            }
        }, 600);
    }

    setupSoundEffects() {
        // Add visual "sound" effects for interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.planet') || e.target.closest('.control-btn')) {
                this.createSoundWave(e.clientX, e.clientY);
            }
        });
    }

    createSoundWave(x, y) {
        const wave = document.createElement('div');
        wave.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 0px;
            height: 0px;
            border: 2px solid rgba(0, 212, 255, 0.6);
            border-radius: 50%;
            animation: soundWave 1s ease-out;
            pointer-events: none;
            z-index: 999;
            transform: translate(-50%, -50%);
        `;

        document.body.appendChild(wave);

        setTimeout(() => {
            if (wave.parentNode) {
                wave.remove();
            }
        }, 1000);
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes clickEffect {
        0% {
            transform: scale(0);
            opacity: 1;
        }
        100% {
            transform: scale(2);
            opacity: 0;
        }
    }

    @keyframes soundWave {
        0% {
            width: 0px;
            height: 0px;
            opacity: 1;
        }
        100% {
            width: 100px;
            height: 100px;
            opacity: 0;
        }
    }

    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }

    .navigation-burst {
        animation: navigationBurst 0.8s ease-out;
    }

    @keyframes navigationBurst {
        0% {
            width: 0px;
            height: 0px;
            opacity: 1;
        }
        50% {
            width: 200px;
            height: 200px;
            opacity: 0.8;
        }
        100% {
            width: 300px;
            height: 300px;
            opacity: 0;
        }
    }

    .control-btn.active {
        background: rgba(0, 212, 255, 0.3);
        border-color: #00d4ff;
        box-shadow: 0 0 15px rgba(0, 212, 255, 0.5);
    }

    .planet.active {
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.8);
    }

    .transmission-message {
        font-family: 'Orbitron', monospace;
        font-size: 14px;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// Initialize Space Explorer
document.addEventListener('DOMContentLoaded', () => {
    const spaceExplorer = new SpaceExplorer();
    const enhancedFeatures = new EnhancedSpaceFeatures();

    // Setup additional features
    spaceExplorer.setupControlPanel();
    spaceExplorer.setupKeyboardShortcuts();
    spaceExplorer.optimizePerformance();

    // Add loading animation
    setTimeout(() => {
        document.querySelectorAll('.planet, .astronaut-avatar, .mission-display').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        });
    }, 500);

    // Add initial styles
    const initStyle = document.createElement('style');
    initStyle.textContent = `
        .planet, .astronaut-avatar, .mission-display {
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.8s ease;
        }
    `;
    document.head.appendChild(initStyle);

    console.log('🚀 Space Explorer Portfolio initialized successfully!');
});
