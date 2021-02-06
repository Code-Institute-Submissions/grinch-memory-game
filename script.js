const cards = document.querySelectorAll('.card-holding');

/*-------Define Variables-----*/

let cardAlreadyFlipped = false;
let freezeBoard = false;
let firstChosen, secondChosen;
let gameScore = 0;
let counter = document.querySelector(".moves");
var reset = document.getElementById("reset");
var flips = 0;
var flipCount;

/*-------Card Flip Function-----*/
function flipCard() {
    if (freezeBoard) return;
    if (this === firstChosen) return;

    this.classList.add('flip');
    if (!cardAlreadyFlipped) {
        updateFlip()
        cardAlreadyFlipped = true;
        firstChosen = this;
        return;
    }
    updateFlip()

    secondChosen = this;

    checkForMatch();
}

function updateFlip() {
    flips++;
    document.getElementById("flips").innerHTML = flips;
}

/*-------Card Match Check Function-----*/
function checkForMatch() {
    let isMatch = firstChosen.dataset.card === secondChosen.dataset.card;

    if (isMatch) {
        increaseScore()
        disableCards()
    } else unflipCards()
}

function disableCards() {
    firstChosen.removeEventListener('click', flipCard);
    secondChosen.removeEventListener('click', flipCard);
    resetBoard();
}
/*-------Game Scoreboard Function-----*/
function increaseScore() {
    gameScore++;
    document.getElementById("game-score").innerHTML = gameScore;
}

function unflipCards() {
    freezeBoard = true;
    reset.disabled = true;
    setTimeout(() => {
        if (firstChosen) firstChosen.classList.remove('flip');
        if (secondChosen) secondChosen.classList.remove('flip');
        reset
        reset.disabled = false;
        resetBoard();
    }, 1500);
}

function resetBoard() {
    [cardAlreadyFlipped, freezeBoard] = [false, false];
    [firstChosen, secondChosen] = [null, null];
}
/*-------Game Shuffle Function-----*/
function shuffle() {
    console.log("shuffled")
    cards.forEach(card => {
        let randomPos = Math.floor(Math.random() * 12);
        card.style.order = randomPos;
    });
};

/*-------Game Scoreboard Reset Function-----*/
function resetGame() {
    if (freezeBoard) return;
    gameScore = 0;
    document.getElementById("game-score").innerHTML = gameScore;
    cards.forEach(function(card) {
        card.classList.remove("flip")
    });
    freezeBoard = true;
    flips = 0;
    document.getElementById("flips").innerHTML = flips;
    setTimeout(function() {
        freezeBoard = false;
        shuffle();
        resetBoard()
    }, 1500)
}

reset.onclick = function() {
    resetGame()
}
cards.forEach(card => card.addEventListener('click', flipCard));

shuffle();


/*-------Based on free-code-camp Vanilla JS Memory Game -----*/