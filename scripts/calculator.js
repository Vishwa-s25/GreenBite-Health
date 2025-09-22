// Nutrition Calculator JavaScript

// DOM elements
const calculatorForm = document.getElementById('calculator-form');
const calculatorResults = document.getElementById('calculator-results');

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadSavedData();
});

// Setup event listeners
function setupEventListeners() {
    calculatorForm.addEventListener('submit', handleFormSubmission);
    
    // Add real-time validation
    const inputs = calculatorForm.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    if (validateForm()) {
        const formData = new FormData(calculatorForm);
        const data = Object.fromEntries(formData);
        
        // Calculate results
        const results = calculateNutrition(data);
        
        // Display results
        displayResults(results);
        
        // Save data to localStorage
        saveData(data);
        
        // Show success state
        showSuccessState();
    }
}

// Validate form
function validateForm() {
    let isValid = true;
    const formData = new FormData(calculatorForm);
    const data = Object.fromEntries(formData);
    
    // Check required fields
    if (!data.age || !data.gender || !data.height || !data.weight || !data.activity) {
        console.log('Please fill in all required fields.');
        isValid = false;
    }
    
    // Validate age
    if (data.age && (data.age < 15 || data.age > 100)) {
        showFieldError('age', 'Age must be between 15 and 100 years.');
        isValid = false;
    }
    
    // Validate height
    if (data.height && (data.height < 100 || data.height > 250)) {
        showFieldError('height', 'Height must be between 100 and 250 cm.');
        isValid = false;
    }
    
    // Validate weight
    if (data.weight && (data.weight < 30 || data.weight > 300)) {
        showFieldError('weight', 'Weight must be between 30 and 300 kg.');
        isValid = false;
    }
    
    return isValid;
}

// Validate individual field
function validateField(e) {
    const field = e.target;
    const value = field.value;
    const fieldName = field.name;
    
    clearFieldError(field);
    
    switch (fieldName) {
        case 'age':
            if (value && (value < 15 || value > 100)) {
                showFieldError(fieldName, 'Age must be between 15 and 100 years.');
            }
            break;
        case 'height':
            if (value && (value < 100 || value > 250)) {
                showFieldError(fieldName, 'Height must be between 100 and 250 cm.');
            }
            break;
        case 'weight':
            if (value && (value < 30 || value > 300)) {
                showFieldError(fieldName, 'Weight must be between 30 and 300 kg.');
            }
            break;
    }
}

// Show field error
function showFieldError(fieldName, message) {
    const field = document.getElementById(fieldName);
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message') || createErrorElement(formGroup);
    
    formGroup.classList.add('error');
    errorElement.textContent = message;
    errorElement.style.display = 'block';
}

// Clear field error
function clearFieldError(e) {
    const field = e.target || e;
    const formGroup = field.closest('.form-group');
    const errorElement = formGroup.querySelector('.error-message');
    
    formGroup.classList.remove('error');
    if (errorElement) {
        errorElement.style.display = 'none';
    }
}

// Create error element if it doesn't exist
function createErrorElement(formGroup) {
    const errorElement = document.createElement('span');
    errorElement.className = 'error-message';
    errorElement.style.cssText = 'color: #f44336; font-size: 0.85rem; margin-top: 0.25rem; display: block;';
    formGroup.appendChild(errorElement);
    return errorElement;
}

// Calculate nutrition - This is the main calculation function
function calculateNutrition(data) {
    const age = parseInt(data.age);
    const gender = data.gender;
    const height = parseInt(data.height);
    const weight = parseFloat(data.weight);
    const activityLevel = parseFloat(data.activity);
    
    // Calculate BMR using Mifflin-St Jeor equation
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }
    
    // Calculate TDEE (Total Daily Energy Expenditure)
    const tdee = bmr * activityLevel;
    
    // Calculate macronutrients (50% carbs, 20% protein, 30% fat)
    const carbsGrams = Math.round((tdee * 0.50) / 4);  // 4 kcal per gram
    const proteinGrams = Math.round((tdee * 0.20) / 4); // 4 kcal per gram
    const fatGrams = Math.round((tdee * 0.30) / 9);     // 9 kcal per gram
    
    // Calculate calorie goals
    const weightLossCalories = Math.round(tdee - 500); // 500 calorie deficit
    const maintenanceCalories = Math.round(tdee);
    const weightGainCalories = Math.round(tdee + 300); // 300 calorie surplus
    
    return {
        bmr: Math.round(bmr),
        tdee: Math.round(tdee),
        macros: {
            carbs: carbsGrams,
            protein: proteinGrams,
            fat: fatGrams
        },
        goals: {
            weightLoss: weightLossCalories,
            maintenance: maintenanceCalories,
            weightGain: weightGainCalories
        }
    };
}

// Display results
function displayResults(results) {
    // Update BMR and TDEE
    document.getElementById('bmr-result').textContent = results.bmr;
    document.getElementById('tdee-result').textContent = results.tdee;
    
    // Update macronutrients
    document.getElementById('carbs-amount').textContent = `${results.macros.carbs}g`;
    document.getElementById('protein-amount').textContent = `${results.macros.protein}g`;
    document.getElementById('fat-amount').textContent = `${results.macros.fat}g`;
    
    // Update progress bars
    updateProgressBars(results.macros);
    
    // Update calorie goals
    document.getElementById('weight-loss-calories').textContent = results.goals.weightLoss;
    document.getElementById('maintenance-calories').textContent = results.goals.maintenance;
    document.getElementById('weight-gain-calories').textContent = results.goals.weightGain;
    
    // Show results section
    calculatorResults.style.display = 'block';
    
    // Scroll to results
    calculatorResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Animate results
    animateResults();
}

// Update progress bars
function updateProgressBars(macros) {
    const totalGrams = macros.carbs + macros.protein + macros.fat;
    
    // Calculate percentages for visual representation
    const carbsPercent = (macros.carbs / totalGrams) * 100;
    const proteinPercent = (macros.protein / totalGrams) * 100;
    const fatPercent = (macros.fat / totalGrams) * 100;
    
    // Update progress bars with animation
    setTimeout(() => {
        document.getElementById('carbs-progress').style.width = `${carbsPercent}%`;
    }, 100);
    
    setTimeout(() => {
        document.getElementById('protein-progress').style.width = `${proteinPercent}%`;
    }, 300);
    
    setTimeout(() => {
        document.getElementById('fat-progress').style.width = `${fatPercent}%`;
    }, 500);
}

// Animate results
function animateResults() {
    const resultCards = calculatorResults.querySelectorAll('.result-card');
    const macroCards = calculatorResults.querySelectorAll('.macro-card');
    const goalItems = calculatorResults.querySelectorAll('.goal-item');
    
    // Animate result cards
    resultCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
        }, index * 200);
    });
    
    // Animate macro cards
    macroCards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 600 + index * 200);
    });
    
    // Animate goal items
    goalItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 1200 + index * 200);
    });
}

// Show success state
function showSuccessState() {
    calculatorForm.classList.add('success');
    setTimeout(() => {
        calculatorForm.classList.remove('success');
    }, 3000);
}

// Save data to localStorage
function saveData(data) {
    const savedData = {
        ...data,
        timestamp: new Date().toISOString()
    };
    localStorage.setItem('nutritionCalculatorData', JSON.stringify(savedData));
}

// Load saved data
function loadSavedData() {
    const savedData = localStorage.getItem('nutritionCalculatorData');
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            
            // Check if data is less than 30 days old
            const dataAge = new Date() - new Date(data.timestamp);
            const daysOld = dataAge / (1000 * 60 * 60 * 24);
            
            if (daysOld < 30) {
                // Populate form with saved data
                Object.keys(data).forEach(key => {
                    if (key !== 'timestamp') {
                        const field = document.getElementById(key);
                        if (field) {
                            if (field.type === 'radio') {
                                const radioField = document.querySelector(`input[name="${key}"][value="${data[key]}"]`);
                                if (radioField) {
                                    radioField.checked = true;
                                }
                            } else {
                                field.value = data[key];
                            }
                        }
                    }
                });
                
                // Show notification
                console.log('Previous calculation data loaded. You can recalculate or modify the values.');
            }
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Reset calculator
function resetCalculator() {
    calculatorForm.reset();
    calculatorResults.style.display = 'none';
    
    // Clear any error states
    const formGroups = calculatorForm.querySelectorAll('.form-group');
    formGroups.forEach(group => {
        group.classList.remove('error', 'success');
        const errorElement = group.querySelector('.error-message');
        if (errorElement) {
            errorElement.style.display = 'none';
        }
    });
    
    // Reset progress bars
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName === 'INPUT') {
        const nextInput = e.target.parentNode.nextElementSibling?.querySelector('input, select');
        if (nextInput) {
            nextInput.focus();
        }
    }
});

// Add activity level descriptions
function addActivityTooltips() {
    const activitySelect = document.getElementById('activity');
    if (activitySelect) {
        const options = activitySelect.querySelectorAll('option');
        options.forEach(option => {
            if (option.value) {
                option.title = getActivityDescription(option.value);
            }
        });
    }
}

// Get activity description
function getActivityDescription(activityValue) {
    const descriptions = {
        '1.2': 'Little or no exercise, desk job',
        '1.375': 'Light exercise 1-3 days/week',
        '1.55': 'Moderate exercise 3-5 days/week',
        '1.725': 'Hard exercise 6-7 days/week',
        '1.9': 'Very hard exercise, physical job'
    };
    return descriptions[activityValue] || '';
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    addActivityTooltips();
});

// Reusable function for formatting numbers (used across multiple pages)
function formatNumber(num) {
    return num.toLocaleString();
}

// Reusable function for smooth scrolling (used across multiple pages)
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}