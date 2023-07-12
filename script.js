// Function to get the computer's choice
function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
  
  // Function to play a single round
  function playRound(playerSelection, computerSelection) {
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();
  
    if (playerSelection === computerSelection) {
      return "It's a tie!";
    } else if (
      (playerSelection === 'rock' && computerSelection === 'scissors') ||
      (playerSelection === 'paper' && computerSelection === 'rock') ||
      (playerSelection === 'scissors' && computerSelection === 'paper')
    ) {
      return `You win! ${playerSelection} beats ${computerSelection}.`;
    } else {
      return `You lose! ${computerSelection} beats ${playerSelection}.`;
    }
  }
  
  // Function to update the score and round result
  function updateScore(playerScore, computerScore) {
    const playerScoreElement = document.getElementById('player-score');
    const computerScoreElement = document.getElementById('computer-score');
    playerScoreElement.textContent = `Player: ${playerScore}`;
    computerScoreElement.textContent = `Computer: ${computerScore}`;
  }
  
  // Function to update the round result
  function updateRoundResult(result) {
    const roundResultElement = document.getElementById('round-result');
    roundResultElement.textContent = result;
  }
  
  // Function to start the game
  function game() {
    const buttons = document.querySelectorAll('.choice');
    const startPage = document.getElementById('start-page');
    const choices = document.getElementById('choices');
    const score = document.getElementById('score');
    const resultsTable = document.getElementById('results-table');
    const resultsBody = document.querySelector('#results-table tbody');
    const winnerDiv = document.getElementById('winner');
    const roundResultElement = document.createElement('p');
    roundResultElement.setAttribute('id', 'round-result');
    score.insertBefore(roundResultElement, score.firstChild);
    let round = 1;
    let playerScore = 0;
    let computerScore = 0;
  
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        const playerSelection = button.id;
        const computerSelection = getComputerChoice();
        const result = playRound(playerSelection, computerSelection);
  
        // Update scores
        if (result.includes('win')) {
          playerScore++;
        } else if (result.includes('lose')) {
          computerScore++;
        }
  
        // Add round result to the table
        const row = document.createElement('tr');
        const roundCell = document.createElement('td');
        const playerCell = document.createElement('td');
        const computerCell = document.createElement('td');
        const resultCell = document.createElement('td');
        roundCell.textContent = round;
        playerCell.textContent = playerSelection;
        computerCell.textContent = computerSelection;
        resultCell.textContent = result;
        row.appendChild(roundCell);
        row.appendChild(playerCell);
        row.appendChild(computerCell);
        row.appendChild(resultCell);
        resultsBody.appendChild(row);
  
        round++;
  
        // Update score display
        updateScore(playerScore, computerScore);
  
        // Update round result display
        updateRoundResult(result);
  
        // Check if it's the last round
        if (round > 5) {
          buttons.forEach(button => button.disabled = true); // Disable buttons
          choices.style.display = 'none';
          score.style.display = 'none';
          resultsTable.style.display = 'table';
          if (playerScore > computerScore) {
            winnerDiv.textContent = 'Congratulations! You won the game.';
          } else if (playerScore < computerScore) {
            winnerDiv.textContent = 'You lost the game. Better luck next time!';
          } else {
            winnerDiv.textContent = "It's a tie game.";
          }
          winnerDiv.style.display = 'block';
        }
      });
    });
  
    document.getElementById('start-button').addEventListener('click', function() {
      startPage.style.display = 'none';
      choices.style.display = 'block';
      score.style.display = 'block';
    });
  }
  
  // Start the game when the page loads
  window.addEventListener('DOMContentLoaded', game);
  