const startGameButton = document.getElementById("start-game");
const gameArea = document.getElementById("game-area");
const rockButton = document.getElementById("rock");
const paperButton = document.getElementById("paper");
const scissorsButton = document.getElementById("scissors");
const roundResult = document.getElementById("round-result");

let playerScore = 0;
let computerScore = 0;
let round = 1;

startGameButton.addEventListener("click", function () {
  startGameButton.style.display = "none";
  gameArea.style.display = "block";
});

rockButton.addEventListener("click", function () {
  playRound("rock");
});

paperButton.addEventListener("click", function () {
  playRound("paper");
});

scissorsButton.addEventListener("click", function () {
  playRound("scissors");
});

function playRound(playerSelection) {
  const computerSelection = getComputerChoice();

  const result = determineRoundResult(playerSelection, computerSelection);
  roundResult.textContent = "Round " + round + ": " + result;

  if (result.includes("win")) {
    playerScore++;
  } else if (result.includes("lose")) {
    computerScore++;
  }

  round++;

  console.log("Player Score: " + playerScore);
  console.log("Computer Score: " + computerScore);

  if (round > 5) {
    endGame();
  }
}

function determineRoundResult(playerSelection, computerSelection) {
  playerSelection = playerSelection.toLowerCase(); // Convert player's input to lowercase
  computerSelection = computerSelection.toLowerCase(); // Convert computer's choice to lowercase

  if (playerSelection === computerSelection) {
    return "It's a tie!";
  } else if (
    (playerSelection === "rock" && computerSelection === "scissors") ||
    (playerSelection === "paper" && computerSelection === "rock") ||
    (playerSelection === "scissors" && computerSelection === "paper")
  ) {
    return "You win! " + playerSelection + " beats " + computerSelection;
  } else {
    return "You lose! " + computerSelection + " beats " + playerSelection;
  }
}

function endGame() {
  const gameResult = document.getElementById("game-result");
  const choices = document.getElementsByClassName("btn");

  for (let i = 0; i < choices.length; i++) {
    choices[i].disabled = true;
  }

  gameResult.textContent = "Final Score: You: " + playerScore + " | Computer: " + computerScore;

  if (playerScore > computerScore) {
    gameResult.textContent += " Congratulations! You win the game!";
  } else if (playerScore < computerScore) {
    gameResult.textContent += " Sorry, you lose the game.";
  } else {
    gameResult.textContent += " It's a tie game!";
  }
}

function getComputerChoice() {
  const choices = ["Rock", "Paper", "Scissors"];
  const randomIndex = Math.floor(Math.random() * choices.length);
  return choices[randomIndex];
}
