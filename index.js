const Word = require("./Word.js").Word;
const inquirer = require('inquirer');
const chalk = require('chalk');


const wordBank = ['illuminate', 'cloud', 'hang', 'expression', 'jaundice', 'courtesan', 'flower', 'traipse', 'wanton'];

// Persistent variables
let wins = 0;
let losses = 0;

// Chooses a word, at random, from wordBank
function pickWord() {
    return wordBank[Math.round(Math.random() * (wordBank.length - 1))]
}

// Handles all game functions
// Calls itself recursively in order to start a new game
function playGame() {

    // Initialization 
    let lives = 5;
    let currentWord = new Word(pickWord());
    let guessBank = [];
    console.log(`${currentWord}`);

    // Recursive function which promps the user to guess a letter (or the entire word)
    // No base case. Instead the loop is broken out of with a 'return' when either the user guesses the whole word
    // or runs out of lives
    // We have to use a recursive function, instead of just a for or while loop due to the asynchronous nature of inquirer
    let guessLoop = function () {

        console.log(' ')

        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Guess a letter!',
                    name: 'userGuess',
                    validate: function (userInput) {
                        userInput = userInput.trim();
                        if (userInput.length === 1 || userInput.length === currentWord.answer.length) {
                            if (guessBank.includes(userInput)) {
                                return chalk`{red You already guessed that letter.}`
                            }
                            return true;
                        }
                        return chalk`{red Your guess must be only a single letter (or an entire word of the same length as the answer).}`;
                    }
                }
            ])
            .then(answers => {
                // Update list of already guessed letters/words
                guessBank.push(answers.userGuess)

                // Set any letters matching the user's guess to 'wasGuessed = true'
                // If any letters matched, the .guess method returns 'true'
                if (currentWord.guess(answers.userGuess)) {
                    console.log(chalk`{greenBright Correct!}`)

                } else {
                    console.log(chalk`{red Sorry, guess again.}`)
                    lives--;
                }

                console.log(`\n${currentWord}`);

                // Check if user correctly guessed the entire word yet
                let solved = currentWord.isSolved();

                // If user has guessed entire word, or ran out of lives, see which it was and let them know
                if (solved || !lives) {
                    if (solved) {
                        console.log(chalk`\n{greenBright You Win!!}`)
                        wins++;

                    } else {
                        console.log(chalk`\n{red Sorry, you're out of lives. Game over!}`);
                        console.log(chalk`The word was {magenta ${currentWord.answer}}`)
                        losses++;
                    }

                    // Reset global progress trackers
                    lives = 5;
                    console.log(chalk`Current record: {green ${wins}} wins and {red ${losses}} losses.\n`)

                    // Then ask if they want to play a new game or exit the terminal
                    inquirer
                        .prompt([
                            {
                                type: 'confirm',
                                message: 'Play agian?',
                                name: 'playAgain',
                            }
                        ])
                        .then(answers => {
                            if (answers.playAgain) { playGame() }
                            else { process.exit(0) };
                        });
                } else {
                    guessLoop();
                }
            });
    }

    guessLoop();

}

playGame()