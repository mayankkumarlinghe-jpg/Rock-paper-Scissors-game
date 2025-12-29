* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #1e3c72, #2a5298);
    min-height: 100vh;
    color: white;
}

h1#heading {
    background-color: #081b31;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    font-size: 2.5rem;
    letter-spacing: 1px;
}

.choices {
    display: flex;
    justify-content: center;
    gap: 3rem;
    margin-top: 5rem;
}

.choice {
    height: 260px;
    width: 260px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.choice:hover {
    transform: scale(1.15);
    background: rgba(255, 255, 255, 0.2);
}

.choice.clicked {
    transform: scale(0.95);
}

.choice.selected {
    box-shadow: 0 0 30px 8px gold;
    border: 5px solid gold;
    background: rgba(255, 215, 0, 0.2);
}

.choice img {
    height: 180px;
    width: 180px;
    object-fit: contain;
    border-radius: 1rem;
}

.choices-display {
    text-align: center;
    margin: 2rem 0;
    font-size: 1.4rem;
    opacity: 0.9;
}

.score-board {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 5rem;
    margin-top: 1rem;
    font-size: 1.8rem;
}

.score {
    text-align: center;
}

.score-number {
    font-size: 4.5rem;
    font-weight: bold;
    color: #ffeb3b;
}

.vs {
    font-size: 3rem;
    font-weight: bold;
    color: #fff;
}

.msg-container {
    text-align: center;
    margin: 3rem auto;
    max-width: 800px;
}

#msg {
    background-color: #081b31;
    display: inline-block;
    padding: 1.2rem 2.5rem;
    border-radius: 50px;
    font-size: 1.8rem;
    font-weight: bold;
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.4);
    transition: all 0.4s ease;
}

#msg.win {
    background: linear-gradient(45deg, #4caf50, #8bc34a);
    color: white;
}

#msg.lose {
    background: linear-gradient(45deg, #f44336, #e91e63);
    color: white;
}

#msg.tie {
    background: linear-gradient(45deg, #ff9800, #ffc107);
    color: #081b31;
}

#msg.final-winner {
    font-size: 2.5rem;
    padding: 2rem 4rem;
    background: linear-gradient(135deg, #667eea, #764ba2);
    border: 4px solid gold;
    box-shadow: 0 0 40px rgba(255, 215, 0, 0.6);
}

.winner-button-container {
    text-align: center;
    margin: 2.5rem 0;
}

.final-winner-btn {
    padding: 14px 40px;
    font-size: 1.4rem;
    font-weight: bold;
    background: linear-gradient(45deg, #ff6b6b, #ee5a24);
    color: white;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    transition: all 0.3s;
}

.final-winner-btn:hover:not(:disabled) {
    transform: translateY(-5px);
    box-shadow: 0 12px 25px rgba(0, 0, 0, 0.4);
}

.final-winner-btn:disabled {
    background: #666;
    cursor: not-allowed;
    transform: none;
}

.reset-container {
    text-align: center;
    margin: 1.5rem 0;
}

.reset-btn {
    padding: 12px 30px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 1.2rem;
    cursor: pointer;
    transition: background 0.3s;
}

.reset-btn:hover {
    background: #2980b9;
}
