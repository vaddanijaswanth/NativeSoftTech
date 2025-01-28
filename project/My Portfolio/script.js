// Mobile Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-item');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a nav item
navItems.forEach(item => {
    item.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for scroll-based animations
const sections = document.querySelectorAll('.section');
const navLinksArray = Array.from(navItems);

const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class
            entry.target.classList.add('animate-text');
            
            // Update active nav item
            const currentSection = entry.target.id;
            navLinksArray.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSection}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => {
    observer.observe(section);
});

// Form validation and submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = this.querySelector('input[name="name"]');
        const email = this.querySelector('input[name="email"]');
        const message = this.querySelector('textarea[name="message"]');
        
        let isValid = true;
        
        if (!name.value.trim()) {
            isValid = false;
            showError(name, 'Name is required');
        }
        
        if (!email.value.trim()) {
            isValid = false;
            showError(email, 'Email is required');
        } else if (!isValidEmail(email.value)) {
            isValid = false;
            showError(email, 'Please enter a valid email');
        }
        
        if (!message.value.trim()) {
            isValid = false;
            showError(message, 'Message is required');
        }
        
        if (isValid) {
            // Here you would typically send the form data to a server
            alert('Thank you for your message! I will get back to you soon.');
            this.reset();
        }
    });
}

// Helper functions
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    const error = formGroup.querySelector('.error-message') || document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    if (!formGroup.querySelector('.error-message')) {
        formGroup.appendChild(error);
    }
    
    input.classList.add('error');
    
    // Remove error after 3 seconds
    setTimeout(() => {
        error.remove();
        input.classList.remove('error');
    }, 3000);
}

function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .error-message {
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 5px;
    }
    
    .form-group input.error,
    .form-group textarea.error {
        border-color: #ff4444;
    }
`;
document.head.appendChild(style);