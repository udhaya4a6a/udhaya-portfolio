// ===== FLOATING ICONS RANDOMIZATION =====
const floatingIcons = document.querySelectorAll('.floating-icon');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Randomize positions and add staggered animation delays
floatingIcons.forEach((icon, index) => {
    if (prefersReducedMotion) {
        // Disable animations for reduced motion preference
        icon.style.animation = 'none';
        icon.style.opacity = '0.05';
        return;
    }

    // Random position in hero section
    const randomX = Math.random() * 80 + 10; // 10% to 90%
    const randomY = Math.random() * 80 + 10; // 10% to 90%
    const randomDelay = Math.random() * 5; // 0-5s delay

    icon.style.left = randomX + '%';
    icon.style.top = randomY + '%';
    icon.style.animationDelay = randomDelay + 's';

    // Hover effect
    icon.addEventListener('mouseenter', function() {
        this.style.opacity = '0.4';
        this.style.filter = 'blur(0px) drop-shadow(0 0 15px rgba(59, 130, 246, 0.5))';
    });

    icon.addEventListener('mouseleave', function() {
        this.style.opacity = '0.15';
        this.style.filter = 'blur(1px)';
    });
});

// Disable floating icons on mobile for better performance
if (window.innerWidth < 768) {
    floatingIcons.forEach(icon => {
        icon.style.display = 'none';
    });
}
const scrollProgress = document.createElement('div');
scrollProgress.className = 'scroll-progress';
document.body.prepend(scrollProgress);

window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (scrollTop / docHeight) * 100;
    scrollProgress.style.width = scrolled + '%';
});

// ===== NAVBAR ENHANCEMENTS =====
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    // Blur effect on scroll
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Update active nav link
    const sections = document.querySelectorAll('section[id]');
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ===== SMOOTH SCROLL & NAVIGATION =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Close mobile menu
            const navMenu = document.getElementById('navMenu');
            const hamburger = document.getElementById('hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        }
    });
});

// ===== MOBILE MENU TOGGLE =====
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.navbar-container')) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== SECTION VISIBILITY & ANIMATIONS =====
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Animate section title
            const title = entry.target.querySelector('.section-title');
            if (title) {
                title.classList.add('animated');
            }
            
            // Add in-view class for separator animation
            entry.target.classList.add('in-view');
            
            sectionObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('section').forEach(section => {
    sectionObserver.observe(section);
});

// ===== SKILL CARDS 3D TILT EFFECT =====
const skillCards = document.querySelectorAll('.skill-category');

skillCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        if (prefersReducedMotion) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) * 0.03;
        const rotateY = (centerX - x) * 0.03;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});

// ===== TIMELINE ANIMATION =====
const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting && entry.target.classList.contains('timeline-item')) {
            entry.target.style.animationDelay = `${index * 0.1}s`;
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.timeline-item').forEach(item => {
    timelineObserver.observe(item);
});

// ===== PARALLAX EFFECT FOR HERO =====
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    if (prefersReducedMotion) return;
    
    const scrollY = window.scrollY;
    if (hero && scrollY < window.innerHeight) {
        const parallaxElements = hero.querySelectorAll('[style*="animation"]');
        parallaxElements.forEach(el => {
            el.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }
});

// ===== BUTTON MICRO-INTERACTIONS =====
const primaryButtons = document.querySelectorAll('.btn-primary');

primaryButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (prefersReducedMotion) return;
        
        // Ripple effect on click
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
    });
});

// ===== CONTACT RIPPLE EFFECT =====
const socialLinks = document.querySelectorAll('.social-links a');

socialLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if (prefersReducedMotion) return;
        
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'contactRipple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
    });
});

// ===== PROJECT CARD ANIMATIONS =====
const projectCards = document.querySelectorAll('.project-card');

const projectObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            entry.target.style.animation = `fadeInUp 0.6s ease-out ${index * 0.1}s forwards`;
            entry.target.style.opacity = '0';
            projectObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

projectCards.forEach(card => {
    projectObserver.observe(card);
});

// ===== KEYBOARD NAVIGATION ENHANCEMENT =====
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ===== PERFORMANCE LOGGING =====
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.log('✓ Reduced motion preference detected - animations disabled');
} else {
    console.log('✓ Premium Portfolio Enhancements Active:');
    console.log('  ✨ Glassmorphism cards with backdrop blur');
    console.log('  ✨ Scroll progress indicator');
    console.log('  ✨ Animated gradient separators');
    console.log('  ✨ 3D tilt effect on skill cards');
    console.log('  ✨ Timeline animations');
    console.log('  ✨ Micro-interactions on buttons');
    console.log('  ✨ Smooth scroll behavior');
    console.log('  ✨ Active nav link highlighting');
}

    // ===== ABOUT SECTION: keyword highlights + scroll reveal =====
    (function() {
        const aboutSection = document.querySelector('#about');
        const aboutHeading = document.querySelector('#about .section-title');
        const aboutPara = document.querySelector('#about .section-description');
        const eduCard = document.querySelector('#about .education-card');

        // Utility to escape regex
        function escapeRegExp(string) {
            return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        }

        // Wrap keywords in spans for gradient styling (doesn't change original source file)
        if (aboutPara) {
            const original = aboutPara.textContent;
            const keywords = [
                'Python Full Stack Developer',
                'frontend',
                'backend',
                'clean code',
                'Soursys Technology'
            ];

            let transformed = original;
            keywords.forEach(k => {
                const re = new RegExp('\\b' + escapeRegExp(k) + '\\b', 'g');
                transformed = transformed.replace(re, `<span class="highlight-gradient">${k}</span>`);
            });

            // Only set innerHTML when a replacement actually happened
            if (transformed !== original) aboutPara.innerHTML = transformed;
        }

        // Reveal on scroll (fade + slide up)
        if (!aboutSection || !aboutHeading || !aboutPara || !eduCard) return;

        if (prefersReducedMotion) {
            // Immediately reveal if user prefers reduced motion
            aboutSection.classList.add('in-view');
            return;
        }

        const aboutObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    aboutSection.classList.add('in-view');
                    aboutObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.18 });

        aboutObserver.observe(aboutSection);
    })();

