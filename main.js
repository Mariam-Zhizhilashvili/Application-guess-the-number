// შემთხვევითი რიცხვის გენერირების ფუნქცია
function generateRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ცვლადები მომხმარებლის შეტყობინებების შესანახად
let minNumber;
let maxNumber;

const messages = [
  "You canceled the game. Please enter a valid number.",
  "Please enter a valid number for the starting number.",
  "Please ensure the starting number is less than the ending number."
];

// ვალიდაციები პირველი ციფრის
do {
  minNumber = prompt("Enter the starting number of the range:");
  if (minNumber === null){
    alert(messages[0]);
  } else if (isNaN(minNumber) || minNumber.trim() === "") {
    alert(messages[1]);
  } else {
    minNumber = parseInt(minNumber);
  }
} while (isNaN(minNumber) || minNumber % 1 !== 0 || minNumber === null);

// ვალიდაციები მეორე ციფრის
do {
  maxNumber = prompt("Enter the ending number of the range:");
  if (maxNumber === null){
    alert(messages[0]);
  } else if (isNaN(maxNumber) || maxNumber.trim() === "") {
    alert("Please enter valid numbers, and ensure the starting number is less than the ending number.");
  } else if (minNumber >= maxNumber) {
    alert(messages[2]);
  } else {
    maxNumber = parseInt(maxNumber);
  }
} while (isNaN(maxNumber) || maxNumber % 1 !== 0 || maxNumber === null || minNumber >= maxNumber);

// რიცხვის გენერირება მომხმარებლის მიერ განსაზღვრულ დიაპაზონში
const secretNumber = generateRandomNumber(minNumber, maxNumber);
let attempts = 0;
const maxAttempts = 5; // მცდელობების მაქსიმალური რაოდენობა

// ფუნქცია, რომელიც სთხოვს მომხმარებელს სწორი რიცხვის გამოცნობას მითითებულ დიაპაზონში
function getUserGuess() {
  let userInput;
  do {
    userInput = prompt(`Guess a number between ${minNumber} and ${maxNumber}:`);
    
    if (userInput === null) {
      alert(messages[0]);
    } else if (userInput.trim() === "") {
      alert("Please enter a number.");
    } else if (isNaN(userInput)) {
      alert("Please enter a valid number.");
    } else if (userInput.includes('.')) {
      alert("Please enter a valid whole number.");
    } else {
      const userGuess = parseInt(userInput);
      if (userGuess < minNumber || userGuess > maxNumber) {
        alert(`Please choose a number between ${minNumber} and ${maxNumber}.`);
      } else {
        return userGuess;
      }
    }
  } while (true);
}

// ფუნქცია ამოწმებს მომხმარებლის ვარაუდი თუ არის სწორი
function isGuessCorrect(guess) {
  return guess === secretNumber;
}

// ფუნქცია, რომელიც მომხმარებელს მინიშნებებს აწვდის
function provideHint(guess) {
  return guess < secretNumber ? "Higher" : "Lower";
}

// თამაშის მთავარი ფუნქცია
function playGuessTheNumber() {
  let guessedCorrectly = false;

  while (!guessedCorrectly && attempts < maxAttempts) {
    const userGuess = getUserGuess();
    attempts++;

    if (isGuessCorrect(userGuess)) {
      guessedCorrectly = true;
      alert(`Congratulations! You guessed the correct number ${secretNumber} in ${attempts} attempts.`);
    } else {
      const hint = provideHint(userGuess);
      if (attempts < maxAttempts) {
        alert(`Incorrect! Try guessing ${hint}. You have ${maxAttempts - attempts} attempts remaining.`);
      } else {
        alert(`Game Over! You have reached the maximum number of attempts. The correct number was ${secretNumber}.`);
      }
    }
  }
}

playGuessTheNumber();