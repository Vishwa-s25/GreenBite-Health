// Moderate Workout Generator JavaScript

// Simplified exercise database
const exercises = {
    'full-body': {
        'none': [
            {
                name: 'Push-ups',
                sets: 3,
                reps: 10,
                instructions: 'Start in plank position, lower body until chest nearly touches ground, then push back up.'
            },
            {
                name: 'Squats',
                sets: 3,
                reps: 15,
                instructions: 'Stand with feet shoulder-width apart, lower body as if sitting back, then return to standing.'
            },
            {
                name: 'Plank',
                sets: 3,
                reps: 1,
                duration: '30 seconds',
                instructions: 'Hold plank position with body in straight line from head to heels.'
            },
            {
                name: 'Mountain Climbers',
                sets: 3,
                reps: 20,
                instructions: 'From plank position, alternate bringing knees toward chest in running motion.'
            },
            {
                name: 'Jumping Jacks',
                sets: 3,
                reps: 30,
                instructions: 'Jump while moving arms and legs in and out simultaneously.'
            }
        ],
        'dumbbells': [
            {
                name: 'Dumbbell Squats',
                sets: 3,
                reps: 12,
                instructions: 'Hold dumbbells at shoulders, perform squat with proper form.'
            },
            {
                name: 'Dumbbell Rows',
                sets: 3,
                reps: 10,
                instructions: 'Bend forward, pull dumbbell toward hip, keeping elbow close to body.'
            },
            {
                name: 'Dumbbell Press',
                sets: 3,
                reps: 10,
                instructions: 'Press dumbbells overhead while maintaining core stability.'
            },
            {
                name: 'Dumbbell Lunges',
                sets: 3,
                reps: 10,
                instructions: 'Step forward into lunge, alternating legs each rep.'
            },
            {
                name: 'Dumbbell Deadlifts',
                sets: 3,
                reps: 10,
                instructions: 'Hinge at hips, lower dumbbells along legs, then return to standing.'
            }
        ],
        'resistance-bands': [
            {
                name: 'Band Squats',
                sets: 3,
                reps: 15,
                instructions: 'Stand on band, hold handles at shoulders, perform squat.'
            },
            {
                name: 'Band Rows',
                sets: 3,
                reps: 12,
                instructions: 'Anchor band, pull handles toward chest while squeezing shoulder blades.'
            },
            {
                name: 'Band Press',
                sets: 3,
                reps: 12,
                instructions: 'Press band handles overhead while maintaining tension.'
            },
            {
                name: 'Band Lateral Raises',
                sets: 3,
                reps: 12,
                instructions: 'Hold band handles, raise arms out to sides to shoulder height.'
            },
            {
                name: 'Band Deadlifts',
                sets: 3,
                reps: 12,
                instructions: 'Stand on band, hinge at hips, pull handles up along legs.'
            }
        ]
    },
    'upper-body': {
        'none': [
            {
                name: 'Push-ups',
                sets: 4,
                reps: 12,
                instructions: 'Standard push-ups with full range of motion.'
            },
            {
                name: 'Diamond Push-ups',
                sets: 3,
                reps: 8,
                instructions: 'Form diamond with hands, perform push-ups for tricep focus.'
            },
            {
                name: 'Pike Push-ups',
                sets: 3,
                reps: 8,
                instructions: 'Elevate hips, perform push-ups in inverted position.'
            },
            {
                name: 'Plank Hold',
                sets: 3,
                reps: 1,
                duration: '45 seconds',
                instructions: 'Hold plank position with perfect form.'
            },
            {
                name: 'Superman Hold',
                sets: 3,
                reps: 1,
                duration: '30 seconds',
                instructions: 'Lie face down, lift chest and legs off ground, hold position.'
            }
        ],
        'dumbbells': [
            {
                name: 'Dumbbell Bench Press',
                sets: 4,
                reps: 10,
                instructions: 'Lie on bench, press dumbbells up and down with control.'
            },
            {
                name: 'Dumbbell Rows',
                sets: 4,
                reps: 10,
                instructions: 'Bend forward, row dumbbells toward hips.'
            },
            {
                name: 'Dumbbell Shoulder Press',
                sets: 3,
                reps: 10,
                instructions: 'Press dumbbells overhead while seated or standing.'
            },
            {
                name: 'Dumbbell Bicep Curls',
                sets: 3,
                reps: 12,
                instructions: 'Curl dumbbells up and down with controlled movement.'
            },
            {
                name: 'Dumbbell Tricep Extensions',
                sets: 3,
                reps: 12,
                instructions: 'Extend arms overhead, lower dumbbell behind head.'
            }
        ],
        'resistance-bands': [
            {
                name: 'Band Chest Press',
                sets: 3,
                reps: 12,
                instructions: 'Anchor band behind you, press handles forward at chest level.'
            },
            {
                name: 'Band Rows',
                sets: 3,
                reps: 12,
                instructions: 'Anchor band, pull handles toward chest while squeezing shoulder blades.'
            },
            {
                name: 'Band Shoulder Press',
                sets: 3,
                reps: 12,
                instructions: 'Press band handles overhead while maintaining tension.'
            },
            {
                name: 'Band Bicep Curls',
                sets: 3,
                reps: 12,
                instructions: 'Stand on band, curl handles up with controlled movement.'
            },
            {
                name: 'Band Tricep Extensions',
                sets: 3,
                reps: 12,
                instructions: 'Anchor band overhead, extend arms down behind head.'
            }
        ]
    },
    'lower-body': {
        'none': [
            {
                name: 'Bodyweight Squats',
                sets: 4,
                reps: 20,
                instructions: 'Perform deep squats with proper form.'
            },
            {
                name: 'Lunges',
                sets: 3,
                reps: 15,
                instructions: 'Alternate forward lunges with each leg.'
            },
            {
                name: 'Calf Raises',
                sets: 3,
                reps: 20,
                instructions: 'Stand on edge of step, raise and lower heels.'
            },
            {
                name: 'Glute Bridges',
                sets: 3,
                reps: 15,
                instructions: 'Lie on back, lift hips up, squeeze glutes.'
            },
            {
                name: 'Wall Sit',
                sets: 3,
                reps: 1,
                duration: '45 seconds',
                instructions: 'Slide down wall until thighs are parallel to ground, hold.'
            }
        ],
        'dumbbells': [
            {
                name: 'Goblet Squats',
                sets: 4,
                reps: 12,
                instructions: 'Hold dumbbell at chest, perform deep squats.'
            },
            {
                name: 'Dumbbell Deadlifts',
                sets: 4,
                reps: 10,
                instructions: 'Hinge at hips, lower dumbbells along legs.'
            },
            {
                name: 'Dumbbell Step-ups',
                sets: 3,
                reps: 10,
                instructions: 'Step up onto elevated surface with dumbbells.'
            },
            {
                name: 'Dumbbell Lunges',
                sets: 3,
                reps: 12,
                instructions: 'Perform walking lunges with dumbbells.'
            },
            {
                name: 'Dumbbell Calf Raises',
                sets: 3,
                reps: 20,
                instructions: 'Hold dumbbells while performing calf raises.'
            }
        ],
        'resistance-bands': [
            {
                name: 'Band Squats',
                sets: 3,
                reps: 15,
                instructions: 'Stand on band, hold handles at shoulders, perform squat.'
            },
            {
                name: 'Band Deadlifts',
                sets: 3,
                reps: 12,
                instructions: 'Stand on band, hinge at hips, pull handles up along legs.'
            },
            {
                name: 'Band Lunges',
                sets: 3,
                reps: 12,
                instructions: 'Step into lunge position with band resistance.'
            },
            {
                name: 'Band Glute Bridges',
                sets: 3,
                reps: 15,
                instructions: 'Place band above knees, perform glute bridges with resistance.'
            },
            {
                name: 'Band Calf Raises',
                sets: 3,
                reps: 20,
                instructions: 'Stand on band, perform calf raises with resistance.'
            }
        ]
    },
    'core': {
        'none': [
            {
                name: 'Plank',
                sets: 3,
                reps: 1,
                duration: '60 seconds',
                instructions: 'Hold plank position with perfect form.'
            },
            {
                name: 'Crunches',
                sets: 3,
                reps: 20,
                instructions: 'Perform controlled crunches with feet on ground.'
            },
            {
                name: 'Russian Twists',
                sets: 3,
                reps: 20,
                instructions: 'Sit with feet elevated, twist torso side to side.'
            },
            {
                name: 'Bicycle Crunches',
                sets: 3,
                reps: 20,
                instructions: 'Alternate bringing opposite elbow to opposite knee.'
            },
            {
                name: 'Leg Raises',
                sets: 3,
                reps: 15,
                instructions: 'Lie on back, raise and lower legs with control.'
            }
        ],
        'dumbbells': [
            {
                name: 'Weighted Crunches',
                sets: 3,
                reps: 15,
                instructions: 'Hold dumbbell at chest while performing crunches.'
            },
            {
                name: 'Russian Twists with Weight',
                sets: 3,
                reps: 15,
                instructions: 'Hold dumbbell while performing Russian twists.'
            },
            {
                name: 'Weighted Plank',
                sets: 3,
                reps: 1,
                duration: '45 seconds',
                instructions: 'Hold plank with dumbbell on back for added resistance.'
            },
            {
                name: 'Dumbbell Side Bends',
                sets: 3,
                reps: 15,
                instructions: 'Hold dumbbell, bend to side, return to center.'
            },
            {
                name: 'Weighted Leg Raises',
                sets: 3,
                reps: 12,
                instructions: 'Hold dumbbell between feet while performing leg raises.'
            }
        ],
        'resistance-bands': [
            {
                name: 'Band Crunches',
                sets: 3,
                reps: 15,
                instructions: 'Anchor band behind you, perform crunches with resistance.'
            },
            {
                name: 'Band Russian Twists',
                sets: 3,
                reps: 15,
                instructions: 'Use band for added resistance during Russian twists.'
            },
            {
                name: 'Band Side Bends',
                sets: 3,
                reps: 15,
                instructions: 'Stand on band, perform side bends with resistance.'
            },
            {
                name: 'Band Plank Pulls',
                sets: 3,
                reps: 10,
                instructions: 'In plank position, pull band handles toward hips.'
            },
            {
                name: 'Band Wood Chops',
                sets: 3,
                reps: 12,
                instructions: 'Anchor band high, pull diagonally across body.'
            }
        ]
    }
};

// DOM elements
const workoutForm = document.getElementById('workout-form');
const workoutResults = document.getElementById('workout-results');
const generateNewBtn = document.getElementById('generate-new');

// Workout state
let currentWorkout = null;

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
});

// Setup event listeners
function setupEventListeners() {
    workoutForm.addEventListener('submit', handleFormSubmission);
    generateNewBtn.addEventListener('click', generateNewWorkout);
}

// Handle form submission
function handleFormSubmission(e) {
    e.preventDefault();
    
    const formData = new FormData(workoutForm);
    const data = Object.fromEntries(formData);
    
    if (validateForm(data)) {
        generateWorkout(data);
    }
}

// Validate form
function validateForm(data) {
    if (!data['body-part'] || !data.equipment) {
        console.log('Please select both body part and equipment.');
        return false;
    }
    return true;
}

// Generate workout
function generateWorkout(data) {
    const bodyPart = data['body-part'];
    const equipment = data.equipment;
    
    // Get available exercises for the selected body part and equipment
    const availableExercises = exercises[bodyPart]?.[equipment] || exercises[bodyPart]?.['none'] || [];
    
    if (availableExercises.length === 0) {
        console.log('No exercises available for the selected combination.');
        return;
    }
    
    // Select 4-5 exercises randomly
    const selectedExercises = shuffleArray([...availableExercises]).slice(0, 5);
    
    // Create workout object
    currentWorkout = {
        bodyPart: bodyPart,
        equipment: equipment,
        exercises: selectedExercises,
        totalCalories: selectedExercises.length * 8 // Simple calorie estimation
    };
    
    // Display workout
    displayWorkout(currentWorkout);
    
    // Show results section
    workoutResults.style.display = 'block';
    
    // Scroll to results
    workoutResults.scrollIntoView({ behavior: 'smooth', block: 'start' });
    
    // Save workout to localStorage
    saveWorkoutToHistory(currentWorkout);
}

// Display workout
function displayWorkout(workout) {
    // Update summary
    document.getElementById('workout-equipment-display').textContent = workout.equipment;
    document.getElementById('workout-calories').textContent = workout.totalCalories;
    
    // Display exercises
    const exercisesContainer = document.getElementById('workout-exercises');
    exercisesContainer.innerHTML = workout.exercises.map((exercise, index) => `
        <div class="exercise-item">
            <div class="exercise-header">
                <span class="exercise-name">${exercise.name}</span>
                <span class="exercise-number">${index + 1}</span>
            </div>
            <div class="exercise-details">
                <div class="detail-item">
                    <span class="detail-label">Sets</span>
                    <span class="detail-value">${exercise.sets}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Reps</span>
                    <span class="detail-value">${exercise.reps || exercise.duration}</span>
                </div>
            </div>
            <div class="exercise-instructions">
                ${exercise.instructions}
            </div>
        </div>
    `).join('');
}

// Generate new workout
function generateNewWorkout() {
    workoutResults.style.display = 'none';
    workoutForm.reset();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Utility functions
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Save workout to history
function saveWorkoutToHistory(workout) {
    const workoutHistory = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
    
    const workoutRecord = {
        date: new Date().toISOString(),
        bodyPart: workout.bodyPart,
        equipment: workout.equipment,
        exercises: workout.exercises.length,
        calories: workout.totalCalories
    };
    
    workoutHistory.unshift(workoutRecord);
    
    // Keep only last 20 workouts
    if (workoutHistory.length > 20) {
        workoutHistory.splice(20);
    }
    
    localStorage.setItem('workoutHistory', JSON.stringify(workoutHistory));
}


// Reusable function for formatting numbers (used across multiple pages)
function formatNumber(num) {
    return num.toLocaleString();
}

// Reusable function for smooth scrolling (used across multiple pages)
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}