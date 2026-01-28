
const gameBoard = document.querySelector('.gameBoard');
let cardCount = 16;     // => we could add more cards for a more challenging game.

if (!gameBoard) {
    console.error("Couldn't find the .gameBoard element! Check your HTML class name.");
}


for (let i = 0; i < cardCount; i++) {

    const card= document.createElement('div');

    card.classList.add('cards');

card.innerHTML = `
    <div class="cardPosition">
        <div class="cardFront"></div>
        <div class="cardBack"></div>
    </div>
`;
    card.addEventListener('click', function () {
          
        if (!timerRunning) {
        startTimer();
        timerRunning = true; 
    }
        this.classList.toggle('flipped');
    });

    gameBoard.appendChild(card);
}

// timer

let time = 0;
let timerRunning = false;
const timerDisplay = document.getElementById('seconds');

function startTimer() {
    
    setInterval(() => {
        time++;
        timerDisplay.innerText = time;
    }, 1000);
}

