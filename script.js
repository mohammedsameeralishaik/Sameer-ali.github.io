// 📱 Toggle Mobile Navbar
const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

if (menuIcon && navbar) {
    menuIcon.addEventListener('click', () => {
        menuIcon.classList.toggle('fa-times'); // Toggle icon class (Font Awesome)
        navbar.classList.toggle('active');     // Show/hide navbar
    });
}

// 🔗 Scroll Sections Active Link
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('header nav a');

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    sections.forEach((sec) => {
        const offsetTop = sec.offsetTop - 150;
        const height = sec.offsetHeight;
        const id = sec.getAttribute('id');

        if (scrollY >= offsetTop && scrollY < offsetTop + height) {
            navLinks.forEach((link) => {
                link.classList.remove('active');
                const activeLink = document.querySelector(`header nav a[href*="${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            });
        }
    });

    // 🔒 Sticky Navbar on Scroll
    const header = document.querySelector('header');
    header.classList.toggle('sticky', scrollY > 100);

    // ✖️ Hide navbar when nav link is clicked (mobile behavior)
    menuIcon?.classList.remove('fa-times');
    navbar?.classList.remove('active');
});

// ✨ Close navbar on mobile when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        menuIcon?.classList.remove('fa-times');
        navbar?.classList.remove('active');
    });
});

// ✨ Scroll Reveal Animations (requires ScrollReveal.js)
if (typeof ScrollReveal !== 'undefined') {
    ScrollReveal({
        distance: '80px',
        duration: 2000,
        delay: 200,
        reset: false
    });

    ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
    ScrollReveal().reveal('.home-img, .skills-container, .portfolio-box, .certification-container, .contact form', { origin: 'bottom' });
    ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
    ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });
}

// 🧠 Typed.js Typing Effect
if (typeof Typed !== 'undefined') {
    const typed = new Typed('.multiple-text', {
        strings: ['Data Analyst', 'SQL Developer', 'Data Visualizer', 'Python Programmer', 'Business Intelligence Expert'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}
