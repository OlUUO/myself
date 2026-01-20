// Mobile menu toggle
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const sidebar = document.querySelector('.sidebar');
const navLinks = document.querySelectorAll('.nav-link');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        sidebar.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        if (window.innerWidth <= 768) {
            mobileMenuToggle.classList.remove('active');
            sidebar.classList.remove('active');
        }
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 768 && 
        sidebar.classList.contains('active') &&
        !sidebar.contains(e.target) &&
        !mobileMenuToggle.contains(e.target)) {
        mobileMenuToggle.classList.remove('active');
        sidebar.classList.remove('active');
    }
});

// Active navigation link on scroll
const sections = document.querySelectorAll('.section, .hero');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '-100px 0px -50% 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}` || 
                    (id === 'home' && link.getAttribute('href') === '#about')) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Set initial active link
window.addEventListener('load', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const aboutLink = document.querySelector('a[href="#about"]');
        if (aboutLink && window.scrollY < 100) {
            aboutLink.classList.add('active');
        }
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const target = document.querySelector(targetId);
        if (target) {
            const offsetTop = target.offsetTop - 20;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Fade in animation on scroll
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Apply fade in to elements
const fadeElements = document.querySelectorAll(
    '.timeline-item, .strength-item, .future-item, .about-text, .about-philosophy'
);

fadeElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});

// Typing effect for hero section (optional)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Add hover effect to cards
document.querySelectorAll('.timeline-item, .future-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.borderLeftColor = 'var(--green)';
        this.style.transition = 'border-color 0.3s ease';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.borderLeftColor = 'var(--lightest-navy)';
    });
});

// Add parallax effect to hero (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

// Prevent scroll when mobile menu is open
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    if (window.innerWidth <= 768 && sidebar.classList.contains('active')) {
        window.scrollTo(0, lastScrollTop);
    } else {
        lastScrollTop = window.pageYOffset;
    }
}, { passive: false });

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Add number counter animation for future section
const futureNumbers = document.querySelectorAll('.future-number');
const numberObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const target = entry.target.textContent;
            let current = 0;
            const increment = target / 20;
            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    entry.target.textContent = target.padStart(2, '0');
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current).toString().padStart(2, '0');
                }
            }, 30);
        }
    });
}, { threshold: 0.5 });

futureNumbers.forEach(num => {
    numberObserver.observe(num);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && sidebar.classList.contains('active')) {
        mobileMenuToggle.classList.remove('active');
        sidebar.classList.remove('active');
    }
});

// Add smooth reveal animation for section numbers
const sectionNumbers = document.querySelectorAll('.section-number');
const numberFadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
        }
    });
}, { threshold: 0.5 });

sectionNumbers.forEach(num => {
    num.style.opacity = '0';
    num.style.transform = 'translateX(-20px)';
    num.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    numberFadeObserver.observe(num);
});
