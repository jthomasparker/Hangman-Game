
var winDiv = $("<div>");
var lossesDiv = $("<div>");
var remainingDiv = $("<div>");
var correctDiv = $("<div>");
var incorrectDiv = $("<div>");
var waiting = true;
var imgOpacity = 0;

$(document).ready(function () {
 
    var word;
var space;
var wordHolder = document.getElementById("wordHolder");
var scoreBoard = document.getElementById("scoreboard");
var hint = document.getElementById("hint");
var incorrectLetters = document.getElementById("incorrectLetters");

wordHolder.innerHTML = "Press Any Key to Begin"
    
});


var wordDict = {
    words: ["TITANIC", "MATRIX"],
    hints: ["assets/images/titanic.jpg", "assets/images/matrix.jpg"]
}

var game = {
    answers: [],
    wins: 0,
    losses: 0,
    incorrect: [],
    allLetters:[],
    lives: 6,
    correctCount: 0,
    incorrectCount: 0,
    
    
newGame: function(){
    
    wordHolder.innerHTML = ""
   word = wordDict.words[Math.floor(Math.random() * wordDict.words.length)];
   var idx = wordDict.words.indexOf(word);
   
   $("#hintimg").attr('src', wordDict.hints[idx])
   $("#hintimg").css("opacity", imgOpacity);
    for(var i = 0; i < word.length; i++){
        //need to figure out spaces
      /*  if(word[i] === " "){
            this.answers[i] = " "
        } else {  */
        this.answers[i] = "_";
        }
    
    wordHolder.innerHTML = this.answers.join(" ");
    this.incorrect = [];
    this.allLetters = [];
    this.lives = 6;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.updateScoreboard();
    
       
},

processGuess: function(userGuess){
    if(this.allLetters.indexOf(userGuess) === -1){
        this.allLetters.push(userGuess);
        if(word.indexOf(userGuess) > -1){
            this.correctCount++
                for(var i = 0; i < word.length; i++){
                    if(word[i] === userGuess){
                        this.answers[i] = userGuess;
                    }
                }
                
        } else {
            this.incorrect.push(userGuess);
            this.lives--
            this.incorrectCount++
            incorrectLetters.append(userGuess + " ");
            
            imgOpacity += .01
            $("#hintimg").css("opacity", imgOpacity);

        }
    wordHolder.innerHTML = this.answers.join(" ")
} else {
    return;
}
},

updateScoreboard: function(){
    
    winDiv.text("Total Wins: " + this.wins)
    lossesDiv.text("Total Losses: " + this.losses);
    remainingDiv.text("Lives Remaining: " + this.lives);
    correctDiv.text("Correct Guess: " + this.correctCount);
    incorrectDiv.text("Incorrect Guesses: " + this.incorrectCount);

    $("#scoreboard").append(winDiv);
    $("#scoreboard").append(lossesDiv);
    $("#scoreboard").append(remainingDiv);
    $("#scoreboard").append(correctDiv);
    $("#scoreboard").append(incorrectDiv);
},

gameStatus: function(){
    if(this.lives === 0){
        this.losses++
        $("#hintimg").fadeTo("slow", 1);
        this.newGame();
    }
    if(this.answers.indexOf("_") === -1){
        this.wins++
        $("#hintimg").fadeTo("slow", 1);
        this.newGame();
    }
}


};



document.onkeyup = function(event) {
    if(waiting){
        waiting = false;
        game.newGame()
    } else {
    var userGuess = String.fromCharCode(event.which).toUpperCase();
    game.processGuess(userGuess);
    game.gameStatus();
    game.updateScoreboard();
    }
    
    

}


