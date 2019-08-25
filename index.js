const Word = require("./Word.js").Word;
const inquirer = require('inquirer');
const chalk = require('chalk');

const wordBank = ['illuminate', 'cloud', 'hang', 'expression', 'jaundice', 'courtesan', 'flower', 'traipse', 'wanton'];

let gameOver = false;
let userWon = false;
let wins = 0;
let losses = 0;
let lives = 5;

function pickWord() {
    return wordBank[Math.round(Math.random() * (wordBank.length - 1))]
}

function playGame() {
    let currentWord = new Word(pickWord());
    let guessBank = [];
    console.log(`${currentWord}`);
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
                guessBank.push(answers.userGuess)
                if (currentWord.guess(answers.userGuess)) {
                    console.log(chalk`{greenBright Correct!}`)
                } else {
                    console.log(chalk`{red Sorry, guess again.}`)
                    lives--;
                }

                console.log(`\n${currentWord}`);

                let solved = currentWord.isSolved();

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