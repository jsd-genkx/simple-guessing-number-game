let randomNumber;
const maxAttempts = 20;
let attempts;
let guessAttempts;

function init() {
  randomNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  guessAttempts = [];
}

init()

function checkGuess() {
  const userGuess = parseInt(document.getElementById("userGuess").value);
  const resultDiv = document.getElementById("result");

  if (isNaN(userGuess) || userGuess < 1 || userGuess > 100) {
    resultDiv.textContent = "Please enter a valid number between 1 and 100.";
    return;
  }

  attempts++;
  if (attempts === maxAttempts - 1) {
    resultDiv.textContent = "This is your last attempt!";
  }

  guessAttempts.push(userGuess);
  let feedback = "";
  if (userGuess === randomNumber) {
    feedback = `Congratulations! You guessed the correct number ${randomNumber} in ${attempts} attempts.`;
    document.getElementById("userGuess").setAttribute("disabled", "disabled");
    document.getElementById("checkButton").setAttribute("disabled", "disabled");
  } else if (attempts >= maxAttempts) {
    feedback = `You have reached the maximum number of attempts. The correct number was ${randomNumber}.`;
    document.getElementById("userGuess").setAttribute("disabled", "disabled");
    document.getElementById("checkButton").setAttribute("disabled", "disabled");
  } else if (userGuess < randomNumber) {
    feedback = "Too low. Try again.";
  } else {
    feedback = "Too high. Try again.";
  }
  resultDiv.textContent = "";
  displayAttempts();
  resultDiv.textContent = feedback;
  document.getElementById("userGuess").focus();
}

function displayAttempts() {
  const attemptsDiv = document.getElementById("attempts");
  attemptsDiv.innerHTML = `<p>Attempts (${attempts}/${maxAttempts}):</p><div class="columns">${generateColumns()}</div>`;
}

function generateColumns() {
  let columnsHTML = "";
  let column1HTML = "";
  let column2HTML = "";
  for (let i = 0; i < guessAttempts.length; i++) {
    const attempt = `<li>Attempt ${i + 1}: ${guessAttempts[i]}</li>`;
    if (i < 10) {
      column1HTML += attempt;
    } else {
      column2HTML += attempt;
    }
  }
  columnsHTML += `<div class="column">${column1HTML}</div><div class="column">${column2HTML}</div>`;
  return columnsHTML;
}

displayAttempts();

function resetGame() {
  init()
  document.getElementById("userGuess").value = "";
  document.getElementById("userGuess").removeAttribute("disabled");
  document.getElementById("checkButton").removeAttribute("disabled");
  document.getElementById("result").textContent = "";
  document.getElementById("attempts").textContent = "";
  document.getElementById("userGuess").focus();
}


