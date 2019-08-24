class Letter {
    constructor(theLetter) {
        if (theLetter.length > 1 || theLetter.length < 1) {
            throw ("Initial value for Letter object must be a single letter.");
        }
        this.value = theLetter.toLowerCase();
        this.wasGuessed = false;
    }

    display() {
        if (this.wasGuessed) {
            return this.value;
        } else {
            return '_';
        };
    };
    check(guess) {
        if (guess.toLowerCase() === this.value) {
            this.wasGuessed = true;
            return true;
        } else {
            return false;
        }
    }
}

module.exports = {
    Letter: Letter
};