// Game state
let userScore = 0;
let computerScore = 0;
let totalRounds = 0;

const MIN_ROUNDS_FOR_WINNER = 3;

// DOM Elements
const choices = document.querySelectorAll('.choice');
const msgElement = document.getElementById('msg');
const userScoreElement = document.getElementById('user-score');
const computerScoreElement = document.getElementById('computer-score');
const userChoiceDisplay = document.getElementById('user-choice');
const computerChoiceDisplay = document.getElementById('comp-choice');
const finalWinnerBtn = document.getElementById('final-winner-btn');
const resetBtn = document.getElementById('reset-btn');

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

    // Highlight selected choice
    document.querySelectorAll('.choice').forEach(c => c.classList.remove('selected'));
    document.getElementById(userChoice).classList.add('selected');

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
    const computerChoice = getComputerChoice();
    const winner = determineWinner(userChoice, computerChoice);

    totalRounds++;

    // Enable final winner button after minimum rounds
    if (totalRounds >= MIN_ROUNDS_FOR_WINNER) {
        finalWinnerBtn.disabled = false;
    }

    showResult(userChoice, computerChoice, winner);
};

// Event Listeners
choices.forEach(choice => {
    choice.addEventListener('click', () => {
        const choiceID = choice.getAttribute('id');

        // Click animation
        choice.classList.add('clicked');
        setTimeout(() => choice.classList.remove('clicked'), 300);

        playGame(choiceID);
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
