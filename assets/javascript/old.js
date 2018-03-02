
var winDiv = $("<div>");
var lossesDiv = $("<div>");
var remainingDiv = $("<div>");
var correctDiv = $("<div>");
var incorrectDiv = $("<div>");

var wordDict = {
    words: ["test", "anothertest", "3rd"]
}

var game = {
    active: true,
    wins: 0,
    losses: 0,
    wordToGuess: [],
    correctLetters: [],
    incorrectLetters:[],
    allLetters:[this.correctLetters, this.incorrectLetters],
    guessesRemaining: 6,
    indices: [],
    idx: '',
    word: "",


    newGame: function(){
        //reset values
        this.active = true;
        this.wins = 0;
        this.losses = 0;
        this.idx = '';
        this.guessesRemaining = 6;
        

        this.word = wordDict.words[Math.floor(Math.random() * wordDict.words.length)];
        wordholder = document.getElementById('wordHolder');
        correct = document.createElement('ul');
        for(var i = 0; i< this.word.length; i++){
            this.wordToGuess.push(word.charAt(i));
            correct.setAttribute('id', 'my-word');
            guess = document.createElement('li');
            guess.setAttribute('class', 'guess');
            if (this.word[i] === "-") {
                guess.innerHTML = "-";
                space = 1;
              } else {
                guess.innerHTML = "_";
              }
        
              geusses.push(guess);
              wordHolder.appendChild(correct);
              correctGuess.appendChild(guess);
            }
        
            
        },
       
     


  //  processGuess: function(userGuess){},

       
           

  //        for (var i = 0; i < this.word.length; i++) {
  //          if (this.word[i] === geuss) {
  //            geusses[i].innerHTML = geuss;
            //  counter += 1;
    //        } 
  //        }
  //      },



        // Check to see if the letter has been used
    /*    if(this.allLetters.indexOf(userGuess) == -1){
            this.allLetters.push(userGuess);
            // Check to see if the letter is in the word
            if(this.wordToGuess.indexOf(userGuess) > -1){
                // add a win, and then loop through to find each instance
                this.wins++;
                this.idx = this.wordToGuess.indexOf(userGuess);
                while (this.idx != -1){
                    this.correctLetters[this.idx] = userGuess;
                    this.idx = this.wordToGuess.indexOf(userGuess, this.idx + 1);
                }
            } else  {
                    this.incorrectLetters.push(userGuess);
                    this.losses++;
                    this.guessesRemaining--;            
                    }
        } else {
            return;
        }
    }, */

    viewStats: function(){
        console.log("Wins:", this.wins);
        console.log("Losses:", this.losses);
        console.log("Guesses Remaining:",this.guessesRemaining);
        console.log("Correct Letters:",this.correctLetters);
        console.log("Incorrect Letters:",this.incorrectLetters);

        
        
        winDiv.text(this.wins);
        lossesDiv.text(this.losses);
        remainingDiv.text(this.guessesRemaining);
        correctDiv.text(this.correctLetters);
        incorrectDiv.text(this.incorrectLetters);

        $("#scoreboard").append(winDiv);
        $("#scoreboard").append(lossesDiv);
        $("#scoreboard").append(remainingDiv);
        $("#scoreboard").append(correctDiv);
        $("#scoreboard").append(incorrectDiv);
        
   
         

     
    }
};




document.onkeyup = function(event) {
    var userGuess = String.fromCharCode(event.which).toLowerCase();
    if(userGuess === "1"){
    game.newGame();
    }else{
    game.processGuess(userGuess);
    }
    game.viewStats();
}

