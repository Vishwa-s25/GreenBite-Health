// Moderate Mindfulness Page JavaScript

// DOM elements
const breathingCircle = document.getElementById('breathing-circle');
const breathingText = document.getElementById('breathing-text');
const breathingCountdown = document.getElementById('breathing-countdown');
const startBreathingBtn = document.getElementById('start-breathing');
const stopBreathingBtn = document.getElementById('stop-breathing');
const timeDisplay = document.getElementById('time-display');
const timerType = document.getElementById('timer-type');
const startTimerBtn = document.getElementById('start-timer');
const pauseTimerBtn = document.getElementById('pause-timer');
const resetTimerBtn = document.getElementById('reset-timer');
const stopAllSoundsBtn = document.getElementById('stop-all-sounds');

// State variables
let breathingInterval = null;
let breathingCountdownInterval = null;
let timerInterval = null;
let isBreathing = false;
let isTimerRunning = false;
let isPaused = false;
let currentTime = 0;
let totalTime = 0;
let currentTimerMode = 'meditation';
let playingSounds = new Set();

// Audio sources and cache
const soundSources = {
    'rain': 'Sounds/Rain(chosic.com).mp3',
    'ocean': 'Sounds/nervousneal__morning-surf-at-boracay-philippines(chosic.com).mp3',
    'forest': 'Sounds/smand__nightingale-song(chosic.com).mp3',
    'white-noise': 'Sounds/01-White-Noise-10min.mp3'
};
const soundAudios = new Map();

function getAudioFor(soundType) {
    const src = soundSources[soundType];
    if (!src) return null;
    if (!soundAudios.has(soundType)) {
        const audio = new Audio(src);
        audio.loop = true;
        audio.volume = 0.6;
        soundAudios.set(soundType, audio);
    }
    return soundAudios.get(soundType);
}

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    loadSessionHistory();
    updateStats();
});

// Setup event listeners
function setupEventListeners() {
    // Breathing controls
    startBreathingBtn.addEventListener('click', startBreathing);
    stopBreathingBtn.addEventListener('click', stopBreathing);
    
    // Timer controls
    startTimerBtn.addEventListener('click', startTimer);
    pauseTimerBtn.addEventListener('click', pauseTimer);
    resetTimerBtn.addEventListener('click', resetTimer);
    
    // Timer mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            switchTimerMode(this.dataset.mode);
        });
    });
    
    // Preset time buttons
    document.querySelectorAll('.time-preset').forEach(btn => {
        btn.addEventListener('click', function() {
            const time = parseInt(this.dataset.time);
            setTimer(time);
        });
    });
    
    // Sound controls
    setupSoundControls();
}

// Guided breathing functionality with animation
function startBreathing() {
    if (isBreathing) return;
    
    isBreathing = true;
    startBreathingBtn.style.display = 'none';
    stopBreathingBtn.style.display = 'inline-block';
    
    // Start guided breathing cycle
    startBreathingCycle();
}

function startBreathingCycle() {
    let phase = 'inhale';
    let countdown = 4;
    
    const cycle = () => {
        if (!isBreathing) return;
        
        if (phase === 'inhale') {
            breathingCircle.classList.add('inhale');
            breathingText.textContent = 'Breathe In';
            breathingCountdown.textContent = countdown;
            countdown--;
            
            if (countdown < 0) {
                phase = 'exhale';
                countdown = 4;
            }
        } else {
            breathingCircle.classList.remove('inhale');
            breathingText.textContent = 'Breathe Out';
            breathingCountdown.textContent = countdown;
            countdown--;
            
            if (countdown < 0) {
                phase = 'inhale';
                countdown = 4;
            }
        }
        
        if (isBreathing) {
            setTimeout(cycle, 1000);
        }
    };
    
    cycle();
}

function stopBreathing() {
    isBreathing = false;
    startBreathingBtn.style.display = 'inline-block';
    stopBreathingBtn.style.display = 'none';
    
    breathingCircle.classList.remove('inhale');
    breathingText.textContent = 'Breathe In';
    breathingCountdown.textContent = '4';
}

// Timer tool functionality
function switchTimerMode(mode) {
    currentTimerMode = mode;
    timerType.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    
    // Update active button
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-mode="${mode}"]`).classList.add('active');
    
    // Reset timer when switching modes
    resetTimer();
}

function setTimer(seconds) {
    totalTime = seconds;
    currentTime = seconds;
    updateTimerDisplay();
}

function startTimer() {
    if (isTimerRunning) return;
    
    if (totalTime === 0) {
        console.log('Please select a time first.');
        return;
    }
    
    isTimerRunning = true;
    isPaused = false;
    startTimerBtn.style.display = 'none';
    pauseTimerBtn.style.display = 'inline-block';
    
    timerInterval = setInterval(() => {
        if (!isPaused) {
            currentTime--;
            updateTimerDisplay();
            
            if (currentTime <= 0) {
                completeSession();
            }
        }
    }, 1000);
}

function pauseTimer() {
    isPaused = !isPaused;
    pauseTimerBtn.textContent = isPaused ? 'Resume' : 'Pause';
}

function resetTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    isTimerRunning = false;
    isPaused = false;
    currentTime = totalTime;
    startTimerBtn.style.display = 'inline-block';
    pauseTimerBtn.style.display = 'none';
    pauseTimerBtn.textContent = 'Pause';
    
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function completeSession() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    
    isTimerRunning = false;
    startTimerBtn.style.display = 'inline-block';
    pauseTimerBtn.style.display = 'none';
    
    // Save session
    saveSession(totalTime, currentTimerMode);
    
    // Update stats
    updateStats();
    
    // Show completion notification
    console.log(`${currentTimerMode.charAt(0).toUpperCase() + currentTimerMode.slice(1)} session completed!`);
}

// Ambient sounds functionality
function setupSoundControls() {
    const soundToggles = document.querySelectorAll('.sound-toggle');
    
    soundToggles.forEach(toggle => {
        toggle.addEventListener('click', function() {
            const soundCard = this.closest('.sound-card');
            const soundType = soundCard.dataset.sound;
            
            if (playingSounds.has(soundType)) {
                stopSound(soundCard, this, soundType);
            } else {
                playSound(soundCard, this, soundType);
            }
        });
    });
    
    stopAllSoundsBtn.addEventListener('click', stopAllSounds);
}

function playSound(soundCard, toggle, soundType) {
    // Stop all other sounds first
    stopAllSounds();
    
    // Mark as playing
    soundCard.classList.add('playing');
    toggle.innerHTML = '<i class="fas fa-stop"></i>';
    playingSounds.add(soundType);

    // Play actual audio
    const audio = getAudioFor(soundType);
    if (audio) {
        try {
            audio.currentTime = 0;
            audio.play();
        } catch (e) {
            console.warn('Audio blocked until user interacts with the page.');
        }
    }
}

function stopSound(soundCard, toggle, soundType) {
    soundCard.classList.remove('playing');
    toggle.innerHTML = '<i class="fas fa-play"></i>';
    playingSounds.delete(soundType);

    const audio = soundAudios.get(soundType);
    if (audio) {
        audio.pause();
    }
}

function stopAllSounds() {
    const playingCards = document.querySelectorAll('.sound-card.playing');
    const playingToggles = document.querySelectorAll('.sound-toggle');
    
    playingCards.forEach(card => card.classList.remove('playing'));
    playingToggles.forEach(toggle => {
        toggle.innerHTML = '<i class="fas fa-play"></i>';
    });
    
    playingSounds.clear();

    // Pause all audios
    soundAudios.forEach(audio => audio.pause());
}

// Session tracking functionality
function saveSession(duration, type) {
    const sessions = JSON.parse(localStorage.getItem('mindfulnessSessions') || '[]');
    
    const session = {
        date: new Date().toISOString(),
        duration: duration,
        type: type
    };
    
    sessions.unshift(session);
    
    // Keep only last 50 sessions
    if (sessions.length > 50) {
        sessions.splice(50);
    }
    
    localStorage.setItem('mindfulnessSessions', JSON.stringify(sessions));
}

function loadSessionHistory() {
    const sessions = JSON.parse(localStorage.getItem('mindfulnessSessions') || '[]');
    const sessionList = document.getElementById('session-list');
    
    if (sessions.length === 0) {
        sessionList.innerHTML = '<p class="no-sessions">No sessions yet. Start your mindfulness journey!</p>';
        return;
    }
    
    const recentSessions = sessions.slice(0, 5); // Show last 5 sessions
    
    sessionList.innerHTML = recentSessions.map(session => {
        const date = new Date(session.date);
        const formattedDate = date.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
        
        const minutes = Math.floor(session.duration / 60);
        const seconds = session.duration % 60;
        const durationText = minutes > 0 ? `${minutes}m ${seconds}s` : `${seconds}s`;
        
        return `
            <div class="session-item">
                <div class="session-info">
                    <span class="session-type">${session.type}</span>
                    <span class="session-duration">${durationText}</span>
                </div>
                <div class="session-date">${formattedDate}</div>
            </div>
        `;
    }).join('');
}

function updateStats() {
    const sessions = JSON.parse(localStorage.getItem('mindfulnessSessions') || '[]');
    
    // Calculate stats
    const totalSessions = sessions.length;
    const totalTime = sessions.reduce((sum, session) => sum + session.duration, 0);
    const totalMinutes = Math.floor(totalTime / 60);
    
    // Calculate weekly sessions
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
    const weeklySessions = sessions.filter(session => 
        new Date(session.date) >= oneWeekAgo
    ).length;
    
    // Update display
    document.getElementById('total-sessions').textContent = totalSessions;
    document.getElementById('total-time').textContent = `${totalMinutes} min`;
    document.getElementById('weekly-sessions').textContent = weeklySessions;
    
    // Update session list
    loadSessionHistory();
}


// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    if (e.key === ' ' && !isBreathing) {
        e.preventDefault();
        startBreathing();
    } else if (e.key === 'Escape' && isBreathing) {
        e.preventDefault();
        stopBreathing();
    }
    
    if (e.key === ' ' && !isTimerRunning && totalTime > 0) {
        e.preventDefault();
        startTimer();
    } else if (e.key === ' ' && isTimerRunning) {
        e.preventDefault();
        pauseTimer();
    }
});

// Reusable function for formatting numbers (used across multiple pages)
function formatNumber(num) {
    return num.toLocaleString();
}

// Reusable function for smooth scrolling (used across multiple pages)
function smoothScrollTo(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}