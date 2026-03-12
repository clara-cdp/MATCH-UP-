let flippedCards = [];
let matchedCount = 0;


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

    setInterval(() => {
        time++;
        timerDisplay.innerText = time;
    }, 1000);

}


function checkIfCardsMatch() {

    const [card1, card2] = flippedCards;

    let img1 = card1.querySelector('img').src;
    let img2 = card1.querySelector('img').src;

    if (img1 === img2) {
        matchedCount += 2;
        flippedCards = [];

        if (matchedCount === cardCount) {
            alert("You WON!")
        }

    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
            flippedCards = [];

        }, 2000);
    }
}
