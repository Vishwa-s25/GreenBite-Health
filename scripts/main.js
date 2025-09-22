// Main JavaScript for GreenBite Website

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initRotatingQuotes();
    initDailyHealthTips();
    initNewsletterSubscription();
    initFloatingElements();
});

// Navigation Functionality
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });
}

// Rotating Health Quotes
function initRotatingQuotes() {
    const quoteElement = document.getElementById('rotating-quote');
    if (!quoteElement) return;
    
    const healthQuotes = [
        "Health is not about the weight you lose, but the life you gain.",
        "The greatest wealth is health.",
        "Take care of your body. It's the only place you have to live.",
        "Health is a state of complete physical, mental and social well-being.",
        "Your body hears everything your mind says.",
        "The only bad workout is the one that didn't happen.",
        "Wellness is the complete integration of body, mind, and spirit.",
        "Every day is a new beginning. Take a deep breath and start again.",
        "Small progress is still progress.",
        "Your health is an investment, not an expense."
    ];
    
    let currentQuoteIndex = 0;
    
    function rotateQuote() {
        quoteElement.style.opacity = '0';
        quoteElement.style.transform = 'translateY(10px)';
        
        setTimeout(() => {
            currentQuoteIndex = (currentQuoteIndex + 1) % healthQuotes.length;
            quoteElement.textContent = healthQuotes[currentQuoteIndex];
            quoteElement.style.opacity = '1';
            quoteElement.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Set initial quote
    quoteElement.textContent = healthQuotes[0];
    
    // Rotate quotes every 5 seconds
    setInterval(rotateQuote, 5000);
}

// Daily Health Tips
function initDailyHealthTips() {
    const tipTitle = document.getElementById('tip-title');
    const tipDescription = document.getElementById('tip-description');
    const tipDate = document.getElementById('tip-date');
    const tipCategory = document.getElementById('tip-category');
    
    if (!tipTitle || !tipDescription || !tipDate || !tipCategory) return;
    
    const healthTips = [
        {
            title: "Stay Hydrated",
            description: "Drinking enough water is crucial for maintaining energy levels and supporting your body's natural detoxification processes.",
            category: "Hydration"
        },
        {
            title: "Get Enough Sleep",
            description: "Quality sleep is essential for recovery, mental clarity, and overall health. Aim for 7-9 hours per night.",
            category: "Sleep"
        },
        {
            title: "Move Your Body",
            description: "Regular physical activity improves mood, energy levels, and overall health. Even 30 minutes of walking daily makes a difference.",
            category: "Exercise"
        },
        {
            title: "Eat Mindfully",
            description: "Pay attention to what and how you eat. Chew slowly, savor flavors, and listen to your body's hunger cues.",
            category: "Nutrition"
        },
        {
            title: "Practice Gratitude",
            description: "Taking time to appreciate the good things in life can improve mental health and overall well-being.",
            category: "Mindfulness"
        },
        {
            title: "Limit Processed Foods",
            description: "Focus on whole, unprocessed foods that provide essential nutrients without added sugars and preservatives.",
            category: "Nutrition"
        },
        {
            title: "Take Deep Breaths",
            description: "Deep breathing exercises can reduce stress, lower blood pressure, and improve focus throughout the day.",
            category: "Mindfulness"
        },
        {
            title: "Maintain Good Posture",
            description: "Proper posture supports spine health, reduces back pain, and improves breathing and digestion.",
            category: "Wellness"
        },
        {
            title: "Connect with Others",
            description: "Social connections are vital for mental health. Make time for meaningful relationships and community involvement.",
            category: "Social"
        },
        {
            title: "Limit Screen Time",
            description: "Reduce exposure to screens, especially before bedtime, to improve sleep quality and reduce eye strain.",
            category: "Wellness"
        }
    ];
    
    // Get today's date
    const today = new Date();
    const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24));
    
    // Use day of year to select tip (ensures same tip for entire day)
    const tipIndex = dayOfYear % healthTips.length;
    const todayTip = healthTips[tipIndex];
    
    // Update tip content
    tipTitle.textContent = todayTip.title;
    tipDescription.textContent = todayTip.description;
    tipCategory.textContent = todayTip.category;
    
    // Format and display date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    tipDate.textContent = today.toLocaleDateString('en-US', options);
}

// Newsletter Subscription
function initNewsletterSubscription() {
    const newsletterForm = document.getElementById('newsletter-form');
    if (!newsletterForm) return;
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        const email = emailInput.value.trim();
        
        if (validateEmail(email)) {
            // Store email in localStorage
            const subscribers = JSON.parse(localStorage.getItem('newsletterSubscribers') || '[]');
            if (!subscribers.includes(email)) {
                subscribers.push(email);
                localStorage.setItem('newsletterSubscribers', JSON.stringify(subscribers));
            }
            
            // Show success message
            console.log('Thank you for subscribing!');
            emailInput.value = '';
        } else {
            console.log('Please enter a valid email address.');
        }
    });
}

// Floating Elements Animation
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-speed')) || 1;
        
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5 * speed;
            element.style.transform = `translateY(${rate}px)`;
        });
    });
}

// Utility Functions
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}


// Smooth scrolling for anchor links
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

// Add loading animation for page transitions
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add scroll reveal animations
function revealOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .tip-card, .feature-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('revealed');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Initialize scroll reveal on page load
revealOnScroll();
