let flippedCards = [];
let matchedCount = 0;
let score = 0;
let matchStartTime = 0;
let timerInterval;

const scoreDisplay = document.getElementById('scoreBox');


const gameBoard = document.querySelector('.gameBoard');
let cardCount = 16;     // => we could add more cards for a more challenging game.

if (!gameBoard) {
    console.error("Couldn't find the .gameBoard element! Check your HTML class name.");
}

let backOfCards = [
    "assets/card1.jpg",
    "assets/card2.jpg",
    "assets/card3.jpg",
    "assets/card4.jpg",
    "assets/card5.jpg",
    "assets/card6.jpg",
    "assets/card7.jpg",
    "assets/card8.jpg",
]

let allGameCards = [...backOfCards, ...backOfCards];
allGameCards.sort(() => Math.random() - 0.5);


for (let i = 0; i < cardCount; i++) {

    const card = document.createElement('div');
    const currentImage = allGameCards[i];

    card.classList.add('cards');

    card.innerHTML = `
    <div class="cardPosition">
        <div class="cardFront"></div>
        <div class="cardBack">
        <img style="object-fit:cover; "src="${currentImage}" alt="card-icon" ></div>
    </div>`;



    card.addEventListener('click', function () {

        if (!timerRunning) {
            startTimer();
            timerRunning = true;
            matchStartTime = time;
        }

        if (this.classList.contains('flipped') || flippedCards.length === 2) {
            return;
        }

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkIfCardsMatch()
        }
    });
    gameBoard.appendChild(card);
}


// timer

let time = 0;
let timerRunning = false;
const timerDisplay = document.getElementById('seconds');

function startTimer() {

    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
        time++;
        timerDisplay.innerText = time;
    }, 1000);

}


function checkIfCardsMatch() {

    const [card1, card2] = flippedCards;

    let img1 = card1.querySelector('img').src;
    let img2 = card2.querySelector('img').src;

    if (img1 === img2) {
        matchedCount += 2;

        let secondsTaken = time - matchStartTime;
        score += calculatePoints(secondsTaken);
        scoreDisplay.innerText = score;

        matchStartTime = time;
        flippedCards = [];

        if (matchedCount === cardCount) {
            clearInterval(timerInterval);
            setTimeout(() => alert(`You WON! Final Score: ${score}`), 600);
        }
    } else {
        score = Math.max(0, score - 15);
        scoreDisplay.innerText = score;

        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];

        }, 1000);
    }

}

function calculatePoints(seconds) {
    switch (true) {
        case (seconds <= 3):
            return 200;
        case (seconds <= 7):
            return 100;
        case (seconds <= 11):
            return 70;
        case (seconds <= 15):
            return 50;
        default:
            return 25;
    }
}






