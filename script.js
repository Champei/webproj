// DOM Elements
const startScreen = document.getElementById('start-screen');
const endScreen = document.getElementById('end-screen');
const startBtn = document.getElementById('start-btn');
const balloonContainer = document.getElementById('balloon-container');
const scoreboard = document.getElementById('scoreboard');
const timeLeftSpan = document.getElementById('time-left');
const scoreSpan = document.getElementById('score');
const finalScoreSpan = document.getElementById('final-score');

// Game Variables
let balloonInterval;
let countdownInterval;
let timeLeft = 30;
let score = 0;
let gameRunning = false;

// Create Balloon Function
function createBalloon() {
    if (!gameRunning) return;

    const balloon = document.createElement('div');
    balloon.classList.add('balloon');
    balloon.innerText = '🎈';

    // Random horizontal position (offsetting slightly from edge)
    const randomX = Math.random() * (window.innerWidth - 80);
    balloon.style.left = `${randomX}px`;

    // Random float duration between 2s and 5s
    const randomDuration = Math.random() * 3 + 2;
    balloon.style.animationDuration = `${randomDuration}s`;

    // Click to Pop event
    balloon.addEventListener('click', () => {
        score++;
        scoreSpan.innerText = score;
        balloon.remove();
    });

    // Clean up from DOM when animation ends to prevent memory leaks
    balloon.addEventListener('animationend', () => {
        balloon.remove();
    });

    balloonContainer.appendChild(balloon);
}

// Start Game Function
function startGame() {
    startScreen.style.display = 'none';
    scoreboard.style.display = 'flex';
    gameRunning = true;

    // Spawn a balloon every 400 milliseconds
    balloonInterval = setInterval(createBalloon, 400);

    // Countdown Timer Interval
    countdownInterval = setInterval(() => {
        timeLeft--;
        timeLeftSpan.innerText = timeLeft;

        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

// End Game Function
function endGame() {
    gameRunning = false;
    clearInterval(balloonInterval);
    clearInterval(countdownInterval);

    // Clear any leftover floating balloons
    balloonContainer.innerHTML = '';

    scoreboard.style.display = 'none';
    finalScoreSpan.innerText = score;
    endScreen.style.display = 'flex';
}

// Event Listeners
startBtn.addEventListener('click', startGame);