// Enhanced VS Code 3D Portfolio JavaScript
class VSCode3DPortfolio {
    constructor() {
        this.floatingSnippets = [];
        this.interactiveModels = [];
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.init();
    }

    init() {
        this.setupFloatingCodeSnippets();
        this.setupInteractiveModels();
        this.setup3DParticles();
        this.setupMouseTracking();
        this.setupScrollEffects();
        this.animate();
    }

    // Floating Code Snippets
    setupFloatingCodeSnippets() {
        const snippets = document.querySelectorAll('.code-snippet-3d');

        snippets.forEach((snippet, index) => {
            const snippetData = {
                element: snippet,
                originalX: snippet.offsetLeft,
                originalY: snippet.offsetTop,
                rotationX: (Math.random() - 0.5) * 30,
                rotationY: (Math.random() - 0.5) * 30,
                rotationZ: (Math.random() - 0.5) * 10,
                floatOffset: index * 0.5,
                speed: 0.5 + Math.random() * 0.5
            };

            this.floatingSnippets.push(snippetData);
        });
    }

    // Interactive 3D Models
    setupInteractiveModels() {
        const models = document.querySelectorAll('.model-3d');

        models.forEach((model, index) => {
            const modelData = {
                element: model,
                originalRotation: 0,
                hoverRotation: 0,
                isHovered: false,
                type: index === 0 ? 'brain' : index === 1 ? 'database' : 'chart'
            };

            // Add click interaction
            model.addEventListener('click', () => {
                this.handleModelClick(modelData);
            });

            // Add hover effects
            model.addEventListener('mouseenter', () => {
                modelData.isHovered = true;
                this.showModelTooltip(modelData);
            });

            model.addEventListener('mouseleave', () => {
                modelData.isHovered = false;
                this.hideModelTooltip(modelData);
            });

            this.interactiveModels.push(modelData);
        });
    }

    handleModelClick(modelData) {
        // Create particle burst effect
        this.createParticleBurst(modelData.element.offsetLeft + 40, modelData.element.offsetTop + 40);

        // Show notification based on model type
        const messages = {
            brain: 'AI/ML algorithms activated! Neural networks processing...',
            database: 'Database connection established. Querying data streams...',
            chart: 'Data visualization rendered. Analytics dashboard loading...'
        };

        if (window.VSCodePortfolio) {
            window.VSCodePortfolio.displayNotification('System Update', messages[modelData.type]);
        }

        // Add temporary glow effect
        modelData.element.style.boxShadow = '0 0 50px rgba(0, 122, 204, 0.8)';
        setTimeout(() => {
            modelData.element.style.boxShadow = '';
        }, 1000);
    }

    showModelTooltip(modelData) {
        const tooltip = modelData.element.querySelector('.model-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '1';
            tooltip.style.transform = 'translateX(-50%) translateY(-10px)';
        }
    }

    hideModelTooltip(modelData) {
        const tooltip = modelData.element.querySelector('.model-tooltip');
        if (tooltip) {
            tooltip.style.opacity = '0';
            tooltip.style.transform = 'translateX(-50%) translateY(0)';
        }
    }

    // 3D Particle System
    setup3DParticles() {
        const canvas = document.getElementById('particles-3d');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        // Create particles
        for (let i = 0; i < 50; i++) {
            this.particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                z: Math.random() * 1000,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                vz: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                color: `hsl(${200 + Math.random() * 60}, 70%, 60%)`,
                life: Math.random() * 1000 + 500
            });
        }

        this.particleCanvas = canvas;
        this.particleCtx = ctx;
    }

    createParticleBurst(x, y) {
        for (let i = 0; i < 20; i++) {
            this.particles.push({
                x: x,
                y: y,
                z: 0,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
                vz: Math.random() * 5,
                size: Math.random() * 4 + 2,
                color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                life: 60
            });
        }
    }

    // Mouse Tracking
    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Add parallax effect to VS Code window
        document.addEventListener('mousemove', (e) => {
            const vscodeWindow = document.querySelector('.vscode-window');
            if (vscodeWindow) {
                const x = (e.clientX - window.innerWidth / 2) * 0.01;
                const y = (e.clientY - window.innerHeight / 2) * 0.01;
                vscodeWindow.style.transform = `translate(-50%, -50%) rotateX(${y}deg) rotateY(${x}deg)`;
            }
        });
    }

    // Scroll Effects
    setupScrollEffects() {
        let scrollY = 0;

        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;

            // Parallax effect on floating elements
            this.floatingSnippets.forEach((snippet, index) => {
                const element = snippet.element;
                const speed = 0.5 + index * 0.1;
                element.style.transform = `
                    translateY(${scrollY * speed}px)
                    rotateX(${snippet.rotationX}deg)
                    rotateY(${snippet.rotationY}deg)
                    rotateZ(${snippet.rotationZ}deg)
                `;
            });
        });
    }

    // Animation Loop
    animate() {
        this.updateFloatingSnippets();
        this.updateInteractiveModels();
        this.updateParticles();
        this.renderParticles();

        requestAnimationFrame(() => this.animate());
    }

    updateFloatingSnippets() {
        this.floatingSnippets.forEach((snippet, index) => {
            const time = Date.now() * 0.001;
            const element = snippet.element;

            // Floating motion
            const floatY = Math.sin(time * snippet.speed + snippet.floatOffset) * 10;
            const floatX = Math.cos(time * snippet.speed * 0.7 + snippet.floatOffset) * 5;

            // Mouse interaction
            const dx = this.mouse.x - (snippet.originalX + 100);
            const dy = this.mouse.y - (snippet.originalY + 50);
            const distance = Math.sqrt(dx * dx + dy * dy);
            const influence = Math.max(0, 1 - distance / 300);

            const mouseOffsetX = dx * influence * 0.1;
            const mouseOffsetY = dy * influence * 0.1;

            element.style.transform = `
                translate(${floatX + mouseOffsetX}px, ${floatY + mouseOffsetY}px)
                rotateX(${snippet.rotationX}deg)
                rotateY(${snippet.rotationY}deg)
                rotateZ(${snippet.rotationZ}deg)
                scale(${1 + influence * 0.1})
            `;
        });
    }

    updateInteractiveModels() {
        this.interactiveModels.forEach((model, index) => {
            const time = Date.now() * 0.001;
            const element = model.element;

            // Base floating animation
            const floatY = Math.sin(time * 0.5 + index) * 5;

            if (model.isHovered) {
                model.hoverRotation += 2;
            } else {
                model.hoverRotation *= 0.95; // Decay rotation
            }

            element.style.transform = `
                translateY(${floatY}px)
                rotateY(${model.hoverRotation}deg)
                scale(${model.isHovered ? 1.2 : 1})
            `;
        });
    }

    updateParticles() {
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.z += particle.vz;

            // Update velocity with some physics
            particle.vy += 0.1; // Gravity
            particle.vx *= 0.99; // Air resistance
            particle.vy *= 0.99;

            // Boundary checks
            if (particle.x < 0 || particle.x > this.particleCanvas.width) {
                particle.vx *= -0.8;
                particle.x = Math.max(0, Math.min(this.particleCanvas.width, particle.x));
            }

            if (particle.y < 0 || particle.y > this.particleCanvas.height) {
                particle.vy *= -0.8;
                particle.y = Math.max(0, Math.min(this.particleCanvas.height, particle.y));
            }

            // Update life
            particle.life--;

            // Remove dead particles
            if (particle.life <= 0) {
                this.particles.splice(index, 1);
            }
        });
    }

    renderParticles() {
        if (!this.particleCtx) return;

        // Clear canvas
        this.particleCtx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

        // Draw particles
        this.particles.forEach(particle => {
            const alpha = Math.min(1, particle.life / 100);
            const size = particle.size * (particle.z / 1000 + 0.5);

            this.particleCtx.save();
            this.particleCtx.globalAlpha = alpha;
            this.particleCtx.fillStyle = particle.color;
            this.particleCtx.beginPath();
            this.particleCtx.arc(particle.x, particle.y, size, 0, Math.PI * 2);
            this.particleCtx.fill();

            // Add glow effect
            this.particleCtx.shadowBlur = size * 2;
            this.particleCtx.shadowColor = particle.color;
            this.particleCtx.fill();

            this.particleCtx.restore();
        });
    }

    // Enhanced Interactions
    setupEnhancedInteractions() {
        // 3D hover effects on code lines
        document.addEventListener('mouseover', (e) => {
            if (e.target.closest('.code-line')) {
                const line = e.target.closest('.code-line');
                line.style.transform = 'translateZ(5px) scale(1.01)';
                line.style.background = 'rgba(0, 122, 204, 0.1)';
            }
        });

        document.addEventListener('mouseout', (e) => {
            if (e.target.closest('.code-line')) {
                const line = e.target.closest('.code-line');
                line.style.transform = '';
                line.style.background = '';
            }
        });

        // Enhanced tab interactions
        document.addEventListener('click', (e) => {
            if (e.target.closest('.tab')) {
                const tab = e.target.closest('.tab');
                // Add ripple effect
                const ripple = document.createElement('div');
                ripple.style.position = 'absolute';
                ripple.style.borderRadius = '50%';
                ripple.style.background = 'rgba(255, 255, 255, 0.3)';
                ripple.style.transform = 'scale(0)';
                ripple.style.animation = 'ripple 0.6s linear';
                ripple.style.left = '50%';
                ripple.style.top = '50%';
                ripple.style.width = '20px';
                ripple.style.height = '20px';
                ripple.style.marginLeft = '-10px';
                ripple.style.marginTop = '-10px';

                tab.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            }
        });

        // Add ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    // Performance optimizations
    optimizePerformance() {
        // Throttle mouse movements
        let mouseThrottle = false;
        document.addEventListener('mousemove', (e) => {
            if (!mouseThrottle) {
                this.mouse.x = e.clientX;
                this.mouse.y = e.clientY;
                mouseThrottle = true;
                setTimeout(() => mouseThrottle = false, 16); // ~60fps
            }
        });

        // Reduce particle count on mobile
        if (window.innerWidth < 768) {
            this.particles = this.particles.slice(0, 20);
        }
    }
}

// Enhanced VS Code Features
class EnhancedVSCodeFeatures {
    constructor() {
        this.codeSnippets = [];
        this.init();
    }

    init() {
        this.setupCodeAnimations();
        this.setupInteractiveCode();
        this.setupDynamicEffects();
    }

    setupCodeAnimations() {
        // Animate code typing on scroll
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animateCodeTyping(entry.target);
                }
            });
        });

        document.querySelectorAll('.code-editor').forEach(editor => {
            observer.observe(editor);
        });
    }

    animateCodeTyping(editor) {
        const lines = editor.querySelectorAll('.code-line');
        lines.forEach((line, index) => {
            setTimeout(() => {
                line.style.opacity = '1';
                line.style.transform = 'translateX(0)';
            }, index * 100);
        });
    }

    setupInteractiveCode() {
        // Make code clickable
        document.addEventListener('click', (e) => {
            if (e.target.closest('.code-content')) {
                const codeElement = e.target.closest('.code-content');
                this.showCodeTooltip(codeElement, e);
            }
        });
    }

    showCodeTooltip(codeElement, event) {
        // Remove existing tooltips
        document.querySelectorAll('.code-tooltip').forEach(t => t.remove());

        const tooltip = document.createElement('div');
        tooltip.className = 'code-tooltip';
        tooltip.textContent = 'Click to copy code snippet';
        tooltip.style.left = event.pageX + 'px';
        tooltip.style.top = (event.pageY - 30) + 'px';

        document.body.appendChild(tooltip);

        // Auto remove
        setTimeout(() => {
            if (tooltip.parentNode) {
                tooltip.remove();
            }
        }, 2000);

        // Copy functionality
        codeElement.addEventListener('click', function copyCode() {
            const text = codeElement.textContent;
            navigator.clipboard.writeText(text).then(() => {
                tooltip.textContent = 'Copied to clipboard!';
                setTimeout(() => tooltip.remove(), 1000);
            });
            codeElement.removeEventListener('click', copyCode);
        });
    }

    setupDynamicEffects() {
        // Dynamic background based on active file
        const observer = new MutationObserver(() => {
            const activeFile = document.querySelector('.editor-file.active');
            if (activeFile) {
                this.updateBackgroundTheme(activeFile.id);
            }
        });

        document.querySelector('.editor-content').addEventListener('DOMSubtreeModified', () => {
            const activeFile = document.querySelector('.editor-file.active');
            if (activeFile) {
                this.updateBackgroundTheme(activeFile.id);
            }
        });
    }

    updateBackgroundTheme(fileId) {
        const themes = {
            'readme-content': '#1e1e1e',
            'about-content': '#1a1a1a',
            'skills-content': '#252526',
            'projects-content': '#2d2d30',
            'contact-content': '#323233'
        };

        const vscodeEditor = document.querySelector('.vscode-editor');
        if (vscodeEditor && themes[fileId]) {
            vscodeEditor.style.background = themes[fileId];
        }
    }
}

// Initialize Enhanced 3D Features
document.addEventListener('DOMContentLoaded', () => {
    // Initialize 3D portfolio
    const vscode3D = new VSCode3DPortfolio();

    // Initialize enhanced features
    const enhancedFeatures = new EnhancedVSCodeFeatures();

    // Setup performance optimizations
    vscode3D.optimizePerformance();
    vscode3D.setupEnhancedInteractions();

    // Add loading animation for 3D elements
    setTimeout(() => {
        document.querySelectorAll('.code-snippet-3d, .model-3d').forEach(el => {
            el.style.opacity = '1';
            el.style.transform = 'scale(1)';
        });
    }, 1000);

    // Add 3D element styles
    const style = document.createElement('style');
    style.textContent = `
        .code-snippet-3d, .model-3d {
            opacity: 0;
            transform: scale(0.8);
            transition: all 0.5s ease;
        }

        .code-tooltip {
            position: absolute;
            background: #2d2d30;
            color: #cccccc;
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 12px;
            font-family: 'Fira Code', monospace;
            pointer-events: none;
            z-index: 1000;
            border: 1px solid #3e3e42;
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .code-line {
            transition: all 0.2s ease;
        }

        .tab {
            overflow: hidden;
            position: relative;
        }
    `;
    document.head.appendChild(style);

    // Add keyboard shortcuts for 3D effects
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + Shift + P for enhanced palette
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'P') {
            e.preventDefault();
            vscode3D.createParticleBurst(window.innerWidth / 2, window.innerHeight / 2);
        }
    });

    console.log('🚀 Enhanced 3D VS Code Portfolio loaded successfully!');
});
