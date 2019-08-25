# Word Guess CLI

### About

Word Guess CLI is a simple hang man game, written with JavaScript and Node to run in the command line interface.

The purpose of this app is both to practice and to demonstrate mastery over, Node, NPM, and JavaScript modulization. Because this app was written specifically to be run in the command line, there is no 'deployed' version of the app. However, you can view an alternate version of the app, written for the web, [here](https://landgod.github.io/Word-Guess-Game). (Ironically, the web version was actually written first, and shares no code with the CLI version, despite having been built to mimic a command line interface in appearance.)

Check out more from Daniel Gold at [dangold.me](https://dangold.me/portfolio) and feel free to connect with me on [LinkedIn](https://www.linkedin.com/in/danjasongold/). 

### How to Play

Note: For the game to run, you must have [Node](https://nodejs.org/en/) installed on your machine. 

In order to start a new game, open your favorite terminal and `cd` to the directory into which you have downloaded the game files. Then run `index.js` with node, like so:

```bash
node index.js
```

You will then be shown the word you are to guess with all letters having been swapped out for underscore characters. The console will the repeatedly prompt you to enter a single letter. If you are able to guess every letter of the word you win. However, if you make 5 incorrect guesses, you will lose. Guessing the same letter twice does not count as an incorrect guess.

After winning or losing a game, you will be told what the correct answer was and then prompted to play again or quit. You will also be shown the total number of wins and losses accumulated over the course of the current session. 

Finally, if at any time you wish to guess the entire word, instead of just a single letter, you may. However, if you are incorrect it will count against your number of attempts, and an incorrect guess will not reveal any new letters, even if some of the letters in the word you guessed were correct. 

Any guess of more (or less) than 1 letter which does not have the same number of letters as the answer will simply be rejected as invalid input and will not be counted against your number of attempts. 



## Demo

![demo1](https://github.com/LandGod/word-guess-cli/demos/demo1.gif?raw=true)