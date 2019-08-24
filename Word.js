const LetterFile = require("./Letter.js");
const Letter = LetterFile.Letter

class BadGuessLength extends Error {
    constructor(...args) {
        super(...args)
        Error.captureStackTrace(this, BadGuessLength)
    }
}

class Word {
    constructor(newWord) {
        this.answer = newWord.trim().toLowerCase()
        this.__rawWrod = newWord.trim().split('')
        this.word = []
        for (let i = 0; i < this.__rawWrod.length; i++) {
            this.word[i] = new Letter(this.__rawWrod[i]);
        }
    }

    guess(userGuess) {
        userGuess = userGuess.trim().toLowerCase()

        // Single Letter Guess
        // Perform check on each letter, return true if any number of letters returned true for the guess
        if (userGuess.length === 1) {
            let success = false;
            for (let singleLetter in this.word) {
                if (this.word[singleLetter].check(userGuess)) {
                    success = true;
                }
            }

            return success;

        }
        // Whole word guess
        // Check user guess against answer, if true, set all letters to true then return true
        else if (userGuess.length === this.answer.length) {
            userGuess = userGuess.trim().toLowerCase();
            if (userGuess === this.answer) {
                for (let i in this.word) {
                    this.word[i].wasGuessed = true;
                }
                return true;
            }
            return false;
        }
        // Junk guess
        else {
            throw(BadGuessLength('You may only guess either a single letter or the entire word at one time.'))
        }
    }

    toString() {
        let output = [];
        for (let i = 0; i < this.word.length; i++) {
            output.push(this.word[i].toString())
        }
        return output.join(' ');
    }

}

module.exports = {
    Word : Word
};