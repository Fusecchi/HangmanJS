const keyboardDiv = document.querySelector(".keyboard")
const wordDisplay = document.querySelector(".word-display")
const guess = document.querySelector(".guess")
const hangmanImage = document.querySelector(".hangmanbox img")
const gameModal = document.querySelector(".game-modal")
const PlayAgainBtn = document.querySelector(".play-again")

var currentword, currentguess = 0;
var correctLetter = [];
const maxguess = 6;

function resetgame(){
    correctLetter = [];
    currentguess = 0;
    hangmanImage.src = `C:/Users/ASUS/Documents/Simple Project/images/hangman-${currentguess}.svg`;
    guess.innerText = `${currentguess} / ${maxguess}`;
    keyboardDiv.querySelectorAll("button").forEach(function(btn){
        btn.disabled = false;
    });
    wordDisplay.innerHTML = currentword.split("").map(() => `<li class="letter"></li>`).join("");
    gameModal.classList.remove("show");
}

const getRandomWord = () => {
    const {word , hint} = wordList[Math.floor(Math.random()*wordList.length)]
    // console.log(word , hint);
    currentword = word;
    resetgame();
    document.querySelector(".hint-text").innerText = hint;
    wordDisplay.innerHTML = word.split("").map(() => `<li class="letter"></li>`).join("");
}
function gameOver(isVictory){
        setTimeout(() => {
            const modalText = isVictory? `you found the word` : `The correct word was :`;
            gameModal.classList.add("show");
            gameModal.querySelector("img").src = `C:/Users/ASUS/Documents/Simple Project/images/${isVictory? 'victory' : 'lost'}.gif`;
            gameModal.querySelector("h4").innerText = `${isVictory? "Congrats!" : "Game Over!"}`;
            gameModal.querySelector("p").innerHTML = `${modalText} <b>${currentword}</b>`;
            gameModal.classList.add("show");
        }, 300);
}
function initGame(button, clickedLetter){
    // console.log(button, clickedLetter)
    if(currentword.includes(clickedLetter)){
        [...currentword].forEach(function(letter, index){
            if (letter === clickedLetter){
                correctLetter.push(letter);
                wordDisplay.querySelectorAll("li")[index].innerText = letter;
                wordDisplay.querySelectorAll("li")[index].classList.add("guessed");
            }
        })
    }else{
        currentguess ++;
        hangmanImage.src = `C:/Users/ASUS/Documents/Simple Project/images/hangman-${currentguess}.svg`;
    }
    button.disabled = true;
    guess.innerText = `${currentguess} / ${maxguess}`;
    if(currentguess == maxguess){
        return gameOver(false);
    }
    if(correctLetter.length === currentword.length ) return gameOver(true)
    // console.log(currentguess)
 
}
// const initGame = (button, clickedLetter) =>{
//     console.log(button, clickedLetter);
// }

for(let i = 97; i <= 122; i++){
    const button = document.createElement("button");
    button.innerText = String.fromCharCode(i);
    keyboardDiv.appendChild(button);
    button.addEventListener("click", e =>initGame(e.target, String.fromCharCode(i)));
}

getRandomWord();
PlayAgainBtn.addEventListener("click", getRandomWord)