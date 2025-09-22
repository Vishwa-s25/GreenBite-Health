// Contact Page JavaScript

// DOM elements
const contactForm = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    contactForm.addEventListener('submit', handleFormSubmission);
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = new FormData(contactForm);
        const data = Object.fromEntries(formData);
        
        // Store feedback in localStorage
        storeFeedback(data);
        
        // Show success message
        showSuccessMessage();
        
        // Reset form
        contactForm.reset();
    }
}

// Form validation
function validateForm() {
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name').value.trim();
    if (!name || name.length < 2) {
        showFieldError('name', 'Please enter a valid name (at least 2 characters).');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email').value.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        showFieldError('email', 'Please enter a valid email address.');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message').value.trim();
    if (!message || message.length < 10) {
        showFieldError('message', 'Please enter a message (at least 10 characters).');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const fieldName = field.name;
    const value = field.value.trim();
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'name':
            if (value && value.length < 2) {
                showFieldError(fieldName, 'Name must be at least 2 characters long.');
            }
            break;
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value && !emailRegex.test(value)) {
                showFieldError(fieldName, 'Please enter a valid email address.');
            }
            break;
        case 'message':
            if (value && value.length < 10) {
                showFieldError(fieldName, 'Message must be at least 10 characters long.');
            }
            break;
    }
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    field.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Clear field error
function clearFieldError(e) {
    const field = e.target;
    const fieldName = field.name;
    const errorElement = document.getElementById(`${fieldName}-error`);
    
    field.classList.remove('error');
    errorElement.style.display = 'none';
}

// Store feedback in localStorage
function storeFeedback(data) {
    const feedbackHistory = JSON.parse(localStorage.getItem('feedbackHistory') || '[]');
    
    const feedback = {
        id: Date.now(),
        name: data.name,
        email: data.email,
        message: data.message,
        date: new Date().toISOString()
    };
    
    feedbackHistory.unshift(feedback);
    
    // Keep only last 50 feedback entries
    if (feedbackHistory.length > 50) {
        feedbackHistory.splice(50);
    }
    
    localStorage.setItem('feedbackHistory', JSON.stringify(feedbackHistory));
}

// Show success message
function showSuccessMessage() {
    contactForm.style.display = 'none';
    successMessage.style.display = 'block';
    
    // Auto-hide after 5 seconds
    setTimeout(() => {
        successMessage.style.display = 'none';
        contactForm.style.display = 'block';
    }, 5000);
}

// FAQ accordion functionality
function toggleFAQ(questionElement) {
    const faqItem = questionElement.closest('.faq-item');
    const answer = faqItem.querySelector('.faq-answer');
    const icon = questionElement.querySelector('i');
    
    // Close all other FAQ items
    const allFaqItems = document.querySelectorAll('.faq-item');
    allFaqItems.forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
            item.querySelector('.faq-answer').style.maxHeight = '0';
            item.querySelector('i').style.transform = 'rotate(0deg)';
        }
    });
    
    // Toggle current FAQ item
    if (faqItem.classList.contains('active')) {
        faqItem.classList.remove('active');
        answer.style.maxHeight = '0';
        icon.style.transform = 'rotate(0deg)';
    } else {
        faqItem.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        icon.style.transform = 'rotate(180deg)';
    }
}


// Reusable function for formatting numbers (used across multiple pages)
function formatNumber(num) {
    return num.toLocaleString();
}

// Reusable function for smooth scrolling (used across multiple pages)
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}