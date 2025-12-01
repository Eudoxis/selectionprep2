// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth scrolling for all CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', (e) => {
        // If button text contains "Enroll" or "Get Started" or "Start Learning"
        if (button.textContent.includes('Enroll') ||
            button.textContent.includes('Get Started') ||
            button.textContent.includes('Start Learning')) {
            e.preventDefault();

            // Scroll to pricing section
            const pricingSection = document.getElementById('pricing');
            pricingSection.scrollIntoView({ behavior: 'smooth' });

            // Add a highlight effect to pricing cards
            const pricingCards = document.querySelectorAll('.pricing-card');
            pricingCards.forEach(card => {
                card.style.animation = 'none';
                setTimeout(() => {
                    card.style.animation = 'fadeIn 0.6s ease forwards';
                }, 10);
            });
        }

        // If button text contains "Watch Preview"
        if (button.textContent.includes('Watch Preview')) {
            e.preventDefault();
            alert('🎬 Video preview coming soon! For now, check out the curriculum below.');
            document.getElementById('curriculum').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Module accordion functionality
document.querySelectorAll('.module-header').forEach(header => {
    header.addEventListener('click', () => {
        const module = header.parentElement;
        const isActive = module.classList.contains('active');

        // Close all modules
        document.querySelectorAll('.module').forEach(m => {
            m.classList.remove('active');
        });

        // Open clicked module if it wasn't active
        if (!isActive) {
            module.classList.add('active');
        }
    });
});

// FAQ accordion functionality
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });

        // Open clicked FAQ if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards
document.querySelectorAll('.benefit-card, .testimonial-card, .pricing-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Counter animation for stats
const animateCounter = (element, target, duration = 2000) => {
    let start = 0;
    const increment = target / (duration / 16); // 60 FPS

    const updateCounter = () => {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    };

    updateCounter();
};

// Animate stats when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');

            // Animate first stat (10,000+)
            if (statNumbers[0] && !statNumbers[0].classList.contains('animated')) {
                statNumbers[0].classList.add('animated');
                const text = statNumbers[0].textContent;
                statNumbers[0].textContent = '0';
                setTimeout(() => {
                    animateCounter(statNumbers[0], 10000, 1500);
                    setTimeout(() => {
                        statNumbers[0].textContent = '10,000+';
                    }, 1500);
                }, 100);
            }

            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';

    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Pricing card click handlers - Redirect to checkout
document.querySelectorAll('.pricing-card .cta-button').forEach((button) => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent triggering parent handlers
        const planCard = button.closest('.pricing-card');
        const planName = planCard.querySelector('.plan-name').textContent.toLowerCase();

        // Redirect to checkout page with plan parameter
        window.location.href = `checkout.html?plan=${planName}`;
    });
});

// Add parallax effect to hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);

    if (konamiCode.join(',') === konamiSequence.join(',')) {
        document.body.style.animation = 'rainbow 2s ease infinite';
        alert('🎮 Konami Code activated! You just unlocked a 50% discount code: KONAMI50');

        // Remove animation after 5 seconds
        setTimeout(() => {
            document.body.style.animation = '';
        }, 5000);
    }
});

// Add rainbow animation for easter egg
const style = document.createElement('style');
style.textContent = `
    @keyframes rainbow {
        0% { filter: hue-rotate(0deg); }
        100% { filter: hue-rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Track scroll depth for analytics (placeholder)
let maxScroll = 0;
window.addEventListener('scroll', () => {
    const scrollPercent = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;

    if (scrollPercent > maxScroll) {
        maxScroll = Math.floor(scrollPercent);

        // In production, send to analytics
        if (maxScroll % 25 === 0) {
            console.log(`User scrolled to ${maxScroll}%`);
        }
    }
});

// Add tooltip functionality for features
document.querySelectorAll('.plan-features li').forEach(feature => {
    feature.style.cursor = 'default';
    feature.title = feature.textContent;
});

// Prevent right-click on images (optional, for protecting course imagery)
document.querySelectorAll('img').forEach(img => {
    img.addEventListener('contextmenu', (e) => {
        e.preventDefault();
    });
});

// Add print styles warning
window.addEventListener('beforeprint', () => {
    console.log('User is printing the page');
});

// Console message for developers
console.log('%c🎓 Welcome to YourCourse!', 'font-size: 20px; color: #6366f1; font-weight: bold;');
console.log('%cInterested in how this page was built?', 'font-size: 14px; color: #6b7280;');
console.log('%cThis is a modern, responsive sales page built with vanilla HTML, CSS, and JavaScript.', 'font-size: 12px; color: #6b7280;');
console.log('%cNo frameworks required! 🚀', 'font-size: 12px; color: #10b981; font-weight: bold;');

// Populate dynamic content from config
if (typeof CONFIG !== 'undefined') {
    // Update copyright
    const copyrightText = document.getElementById('copyright-text');
    if (copyrightText) {
        copyrightText.textContent = `© ${CONFIG.site.year} ${CONFIG.site.name}. All rights reserved.`;
    }

    // Update page title and meta
    document.title = CONFIG.course.title + ' - ' + CONFIG.site.name;

    // Update logo
    const logos = document.querySelectorAll('.logo');
    logos.forEach(logo => {
        logo.textContent = CONFIG.site.name;
    });
}
