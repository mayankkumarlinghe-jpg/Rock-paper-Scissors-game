// Game state
let userScore = 0;
let computerScore = 0;
let totalRounds = 0;
let bestScore = parseInt(localStorage.getItem('rpsBestScore')) || 0;

const MIN_ROUNDS_FOR_WINNER = 3;

// DOM Elements
const choices = document.querySelectorAll('.choice');
const msgElement = document.getElementById('msg');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const bestScoreElement = document.getElementById('best-score');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('comp-choice');
const finalWinnerBtn = document.getElementById('final-winner-btn');
const resetBtn = document.getElementById('reset-btn');

// Initialize High Score UI
if (bestScoreElement) bestScoreElement.textContent = bestScore;

const OPTIONS = ['rock', 'paper', 'scissors'];

// Computer choice
const getComputerChoice = () => {
    const randomIndex = Math.floor(Math.random() * OPTIONS.length);
    return OPTIONS[randomIndex];
};

// Determine winner
const determineWinner = (user, computer) => {
    if (user === computer) return 'tie';
    if (
        (user === 'rock' && computer === 'scissors') ||
        (user === 'paper' && computer === 'rock') ||
        (user === 'scissors' && computer === 'paper')
    ) {
        return 'user';
    }
    return 'computer';
};

// Format choice name
const formatChoice = (choice) => {
    return choice.charAt(0).toUpperCase() + choice.slice(1);
};

// Show result
const showResult = (userChoice, computerChoice, winner) => {
    // Update choice displays
    userChoiceDisplay.textContent = formatChoice(userChoice);
    computerChoiceDisplay.textContent = formatChoice(computerChoice);

    // Update message
    let message = '';
    let messageClass = '';

    switch (winner) {
        case 'tie':
            message = `It's a Tie! Both chose ${formatChoice(userChoice)}.`;
            messageClass = 'tie';
            break;
        case 'user':
            message = `You Win! ${formatChoice(userChoice)} beats ${formatChoice(computerChoice)}.`;
            userScore++;
            userScoreElement.textContent = userScore;
            
            // Check High Score
            if (userScore > bestScore) {
                bestScore = userScore;
                localStorage.setItem('rpsBestScore', bestScore);
                if (bestScoreElement) bestScoreElement.textContent = bestScore;
            }
            
            messageClass = 'win';
            break;
        case 'computer':
            message = `Computer Wins! ${formatChoice(computerChoice)} beats ${formatChoice(userChoice)}.`;
            computerScore++;
            computerScoreElement.textContent = computerScore;
            messageClass = 'lose';
            break;
    }

    msgElement.textContent = message;
    msgElement.className = messageClass;
};

// Main game
const playGame = (userChoice) => {
    // Prevent playing while computer is already thinking or game has ended
    if (msgElement.textContent === 'Computer is thinking...' || finalWinnerBtn.textContent === "Winner Declared!") return;

    // Micro-animation: Computer thinking state
    msgElement.textContent = 'Computer is thinking...';
    msgElement.className = '';
    userChoiceDisplay.textContent = formatChoice(userChoice);
    computerChoiceDisplay.textContent = '...';

    // Highlight user selection immediately
    document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
    document.getElementById(userChoice).classList.add('selected');

    // Artificial delay for premium game feel (600ms)
    setTimeout(() => {
        const computerChoice = getComputerChoice();
        const winner = determineWinner(userChoice, computerChoice);

        totalRounds++;

        // Enable final winner button after minimum rounds
        if (totalRounds >= MIN_ROUNDS_FOR_WINNER) {
            finalWinnerBtn.disabled = false;
        }

        showResult(userChoice, computerChoice, winner);
    }, 600);
};

// Handle choice trigger (Mouse or Keyboard)
const handleChoice = (choiceElement) => {
    const choiceID = choiceElement.getAttribute('id');

    // Click micro-animation
    choiceElement.classList.add('clicked');
    setTimeout(() => choiceElement.classList.remove('clicked'), 300);

    playGame(choiceID);
};

// Event Listeners for choices
choices.forEach(choice => {
    // Mouse Interaction
    choice.addEventListener('click', () => handleChoice(choice));

    // Keyboard Accessibility Support (Enter & Space)
    choice.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault(); // Prevent page scroll on Space
            handleChoice(choice);
        }
    });
});

// Final Winner Button
finalWinnerBtn.addEventListener('click', () => {
    let finalMessage = '';
    const crown = '👑';

    if (userScore > computerScore) {
        finalMessage = `${crown} YOU ARE THE CHAMPION! ${crown}<br>Final Score: ${userScore} - ${computerScore}`;
    } else if (computerScore > userScore) {
        finalMessage = `Computer is the Champion... ${crown}<br>Final Score: ${userScore} - ${computerScore}`;
    } else {
        finalMessage = `It's a Perfect Tie! 🤝<br>Final Score: ${userScore} - ${computerScore}`;
    }

    msgElement.innerHTML = finalMessage;
    msgElement.classList.add('final-winner');

    finalWinnerBtn.disabled = true;
    finalWinnerBtn.textContent = "Winner Declared!";
});

// Reset Game
resetBtn.addEventListener('click', () => {
    userScore = 0;
    computerScore = 0;
    totalRounds = 0;

    userScoreElement.textContent = '0';
    computerScoreElement.textContent = '0';
    userChoiceDisplay.textContent = '-';
    computerChoiceDisplay.textContent = '-';

    msgElement.textContent = 'Play Your Move!';
    msgElement.className = '';

    finalWinnerBtn.disabled = true;
    finalWinnerBtn.textContent = 'Show Final Winner';

    document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
});
