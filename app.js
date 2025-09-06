// QuantLens Landing Page Application

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('Initializing QuantLens Landing Page...');
    initializeApp();
});

function initializeApp() {
    setupMobileMenu();
    setupSmoothScrolling();
    setupFAQAccordion();
    setupWaitlistForm();
    setupVideoPlaceholders();
    setupScrollAnimations();
    setupFeatureHovers();
    
    console.log('QuantLens Landing Page initialized successfully');
}

// Mobile Menu Functionality
function setupMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuToggle && nav) {
        mobileMenuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking nav links
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!nav.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                nav.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#' || !href) return;
            
            e.preventDefault();
            
            const targetSection = document.querySelector(href);
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Update URL without jumping
                history.pushState(null, null, href);
            }
        });
    });
}

// FAQ Accordion Functionality - Fixed Version
function setupFAQAccordion() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        if (question && answer) {
            // Set initial max-height to enable smooth transitions
            answer.style.maxHeight = '0px';
            answer.style.overflow = 'hidden';
            answer.style.transition = 'max-height 0.3s ease-out';
            
            question.addEventListener('click', function(e) {
                e.preventDefault();
                
                const isActive = item.classList.contains('active');
                
                // Close all other FAQ items first
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        const otherAnswer = otherItem.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0px';
                        }
                    }
                });
                
                // Toggle current item
                if (isActive) {
                    // Close current item
                    item.classList.remove('active');
                    answer.style.maxHeight = '0px';
                } else {
                    // Open current item
                    item.classList.add('active');
                    // Calculate the actual height needed
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                    
                    // After animation, set to auto for dynamic content
                    setTimeout(() => {
                        if (item.classList.contains('active')) {
                            answer.style.maxHeight = 'none';
                        }
                    }, 300);
                }
                
                console.log('FAQ item clicked:', question.textContent.trim());
            });
            
            // Keyboard support
            question.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    question.click();
                }
            });
            
            // Make questions focusable
            question.setAttribute('tabindex', '0');
        }
    });
    
    console.log('FAQ accordion setup completed for', faqItems.length, 'items');
}

// Waitlist Form Handling
function setupWaitlistForm() {
    const waitlistForm = document.querySelector('.waitlist-form');
    const joinWaitlistBtn = document.getElementById('joinWaitlistBtn');
    
    if (waitlistForm) {
        waitlistForm.addEventListener('submit', function(e) {
            const submitBtn = waitlistForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Show loading state
            submitBtn.disabled = true;"Trade Smarter with AI-Powered Strategy Design"
            submitBtn.textContent = 'Joining...';
            
            // Note: Form will be handled by Formspree, so we don't prevent default
            // Just show feedback to user
            
            setTimeout(() => {
                showNotification('Thank you for joining our waitlist! Check your email for confirmation.', 'success');
            }, 1000);
        });
    }
    
    // Join waitlist button in hero section
    if (joinWaitlistBtn) {
        joinWaitlistBtn.addEventListener('click', function() {
            const waitlistSection = document.querySelector('.waitlist');
            if (waitlistSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = waitlistSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Focus on first form field after scrolling
                setTimeout(() => {
                    const firstInput = waitlistSection.querySelector('input[type="email"]');
                    if (firstInput) {
                        firstInput.focus();
                    }
                }, 800);
            }
        });
    }
}

// Video Placeholder Interactions
function setupVideoPlaceholders() {
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const overlay = placeholder.querySelector('.video-overlay h3');
            const videoTitle = overlay ? overlay.textContent : 'Demo Video';
            
            // Show video modal or notification
            showNotification(`${videoTitle} - Coming soon! Join the waitlist for early access.`, 'info');
            
            // Add click animation
            placeholder.style.transform = 'scale(0.98)';
            setTimeout(() => {
                placeholder.style.transform = '';
            }, 150);
        });
        
        // Keyboard support
        placeholder.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                placeholder.click();
            }
        });
        
        // Make focusable
        placeholder.setAttribute('tabindex', '0');
    });
}

// Scroll Animations
function setupScrollAnimations() {
    // Only enable animations if user hasn't requested reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        return;
    }
    
    const animateElements = document.querySelectorAll('.feature-card, .testimonial-card');
    
    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        rootMargin: '0px 0px -100px 0px',
        threshold: 0.1
    });
    
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Stats counter animation
    animateCounters();
}

// Feature Card Hover Effects
function setupFeatureHovers() {
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Add subtle parallax effect to feature image
            const image = card.querySelector('.feature-image img');
            if (image) {
                image.style.transform = 'scale(1.05) translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const image = card.querySelector('.feature-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
            }
        });
        
        // Click handler for feature details
        card.addEventListener('click', function() {
            const featureType = card.getAttribute('data-feature');
            const featureTitle = card.querySelector('.feature-title').textContent;
            
            showNotification(`${featureTitle} - Full demo available after launch! Join the waitlist for early access.`, 'info');
        });
    });
}

// Animate Counter Numbers
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = counter.textContent;
                const isPercentage = target.includes('%');
                const isPlus = target.includes('+');
                const numericValue = parseInt(target.replace(/[^\d]/g, ''));
                
                let currentValue = 0;
                const increment = numericValue / 50; // Animate over 50 steps
                const duration = 2000; // 2 seconds
                const stepTime = duration / 50;
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    
                    if (currentValue >= numericValue) {
                        currentValue = numericValue;
                        clearInterval(timer);
                    }
                    
                    let displayValue = Math.floor(currentValue).toLocaleString();
                    if (isPercentage) displayValue += '%';
                    if (isPlus) displayValue += '+';
                    
                    counter.textContent = displayValue;
                }, stepTime);
                
                observer.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// Notification System
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => {
        notification.remove();
    });
    
    const notification = document.createElement('div');
    notification.className = 'notification';
    
    // Set styles based on type
    let backgroundColor;
    switch (type) {
        case 'success':
            backgroundColor = 'var(--color-success)';
            break;
        case 'error':
            backgroundColor = 'var(--color-error)';
            break;
        case 'warning':
            backgroundColor = 'var(--color-warning)';
            break;
        default:
            backgroundColor = 'var(--color-primary)';
    }
    
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${backgroundColor};
        color: var(--color-btn-primary-text);
        padding: 16px 20px;
        border-radius: var(--radius-base);
        box-shadow: var(--shadow-lg);
        z-index: 1001;
        font-weight: 500;
        max-width: 350px;
        transform: translateX(100%);
        transition: transform 0.3s ease-out;
        word-wrap: break-word;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Click to dismiss
    notification.addEventListener('click', function() {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Keyboard Navigation
document.addEventListener('keydown', function(e) {
    // Press 'J' to join waitlist
    if (e.key === 'j' || e.key === 'J') {
        if (!e.target.matches('input, textarea, select')) {
            e.preventDefault();
            const joinBtn = document.getElementById('joinWaitlistBtn');
            if (joinBtn) {
                joinBtn.click();
            }
        }
    }
    
    // Press 'D' to view demo
    if (e.key === 'd' || e.key === 'D') {
        if (!e.target.matches('input, textarea, select')) {
            e.preventDefault();
            window.open('https://quantlens.netlify.app/', '_blank');
        }
    }
    
    // Press 'F' to go to features
    if (e.key === 'f' || e.key === 'F') {
        if (!e.target.matches('input, textarea, select')) {
            e.preventDefault();
            const featuresSection = document.getElementById('features');
            if (featuresSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = featuresSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }
    }
});

// Header Scroll Effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(var(--color-surface), 0.98)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(var(--color-surface), 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        }
    }
});

// Form Validation Enhancement
function enhanceFormValidation() {
    const form = document.querySelector('.waitlist-form');
    if (!form) return;
    
    const emailInput = form.querySelector('input[type="email"]');
    const nameInput = form.querySelector('input[name="name"]');
    const experienceSelect = form.querySelector('select[name="trading_experience"]');
    
    // Real-time email validation
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const email = this.value;
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                this.style.borderColor = 'var(--color-error)';
                showNotification('Please enter a valid email address', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Name validation
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const name = this.value.trim();
            
            if (name && name.length < 2) {
                this.style.borderColor = 'var(--color-error)';
                showNotification('Please enter your full name', 'error');
            } else {
                this.style.borderColor = '';
            }
        });
    }
    
    // Experience selection feedback
    if (experienceSelect) {
        experienceSelect.addEventListener('change', function() {
            if (this.value) {
                this.style.borderColor = 'var(--color-success)';
                
                // Show personalized message based on experience
                const messages = {
                    'beginner': 'Perfect! QuantLens is designed to help beginners learn trading effectively.',
                    'intermediate': 'Great! QuantLens will help you refine your strategies and improve performance.',
                    'advanced': 'Excellent! You\'ll love our advanced analytics and backtesting features.',
                    'professional': 'Welcome! Our enterprise features are perfect for professional traders.'
                };
                
                if (messages[this.value]) {
                    setTimeout(() => {
                        showNotification(messages[this.value], 'success');
                    }, 500);
                }
            }
        });
    }
}

// Enhanced scroll-to-top functionality
function addScrollToTop() {
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--color-primary);
        color: var(--color-btn-primary-text);
        border: none;
        font-size: 20px;
        cursor: pointer;
        box-shadow: var(--shadow-lg);
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide based on scroll position
    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.transform = 'translateY(0)';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.transform = 'translateY(100px)';
        }
    });
    
    // Scroll to top when clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize additional features after DOM load
window.addEventListener('load', function() {
    enhanceFormValidation();
    addScrollToTop();
    
    // Log keyboard shortcuts for users
    console.log('🎯 Keyboard shortcuts:');
    console.log('  J - Join waitlist');
    console.log('  D - View demo');
    console.log('  F - Go to features');
    console.log('💡 Click video placeholders to learn more!');
});

// Performance monitoring (for development)
if (typeof performance !== 'undefined' && performance.mark) {
    performance.mark('app-start');
    
    window.addEventListener('load', function() {
        performance.mark('app-loaded');
        performance.measure('app-load-time', 'app-start', 'app-loaded');
        
        const measure = performance.getEntriesByName('app-load-time')[0];
        console.log(`QuantLens loaded in ${Math.round(measure.duration)}ms`);
    });
}

// Export functions for potential external use
window.QuantLens = {
    showNotification: showNotification,
    joinWaitlist: function() {
        const joinBtn = document.getElementById('joinWaitlistBtn');
        if (joinBtn) joinBtn.click();
    },
    viewDemo: function() {
        window.open('https://quantlens.netlify.app/', '_blank');
    }
};

console.log('QuantLens Landing Page Application Loaded');
console.log('🚀 Ready to revolutionize trading with AI!');