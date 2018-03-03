
var winDiv = $("<p>");
var lossesDiv = $("<p>");
var remainingDiv = $("<p>");
var correctDiv = $("<p>");
var incorrectDiv = $("<p>");
var waiting = true;
var word;

$(document).ready(function () {

var wordHolder = document.getElementById("wordHolder");
var scoreBoard = document.getElementById("scoreboard");
var hint = document.getElementById("hint");
var incorrectLetters = document.getElementById("incorrectLetters");

wordHolder.innerHTML = "Press Any Key to Begin"
    
});


var wordDict = {
    words: ["Titanic", "The Matrix", "A Few Good Men", "Aladdin", "American Beauty", "The Big Lebowski", "Braveheart", "Dances with Wolves",
"Fargo", "Fight Club", "Forest Gump", "Ghost", "Goodfellas", "Good Will Hunting", "Home Alone", "Independence Day", "Jerry Macguire", "Jurassic Park", 
"The Lion King", "Men In Black", "Pretty Woman", "Pulp Fiction", "Saving Private Ryan", "Schindlers List", "Seven", "The Shawshank Redemption", "The Silence of the Lambs", 
"The Sandlot", "The Sixth Sense", "Tombstone", "Toy Story", "Trainspotting", "The Truman Show", "The Usual Suspects"],
    hints: ["assets/images/titanic.jpg", "assets/images/matrix.jpg", "assets/images/afewgoodmen.jpg", "assets/images/aladdin.jpg", "assets/images/americanbeauty.jpg", "assets/images/biglebowski.jpg", "assets/images/braveheart.jpg", "assets/images/danceswithwolves.jpg",
    "assets/images/fargo.jpg", "assets/images/fightclub.jpg", "assets/images/forestgump.jpg", "assets/images/ghost.jpg", "assets/images/goodfellas.jpg", "assets/images/goodwillhunting.jpg", "assets/images/homealone.jpg", "assets/images/independenceday.jpg", "assets/images/jerrymacguire.jpg","assets/images/jurassicpark.jpg", 
    "assets/images/lionking.jpg", "assets/images/mib.jpg", "assets/images/prettywoman.jpg", "assets/images/pulpfiction.jpg", "assets/images/savingprivateryan.jpg", "assets/images/schindlerslist.jpg", "assets/images/seven.jpg","assets/images/shawshank.jpg","assets/images/silenceofthelambs.jpg",
    "assets/images/thesandlot.jpg","assets/images/thesixthsense.jpg", "assets/images/tombstone.jpg", "assets/images/toystory.jpg", "assets/images/trainspotting.jpg", "assets/images/trumanshow.jpg", "assets/images/usualsuspects.jpg"]
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
    imgOpacity: 0,
    
    
newGame: function(){
    
    wordHolder.innerHTML = ""
    this.answers = [];
    this.incorrect = [];
    this.allLetters = [];
    this.lives = 6;
    this.correctCount = 0;
    this.incorrectCount = 0;
    this.updateScoreboard();
    incorrectLetters.innerHTML = ""
   word = wordDict.words[Math.floor(Math.random() * wordDict.words.length)];
   var idx = wordDict.words.indexOf(word);
   word = word.replace(/\s/g, "-").toUpperCase();
   this.imgOpacity = 0;
   $("#hintimg").attr('src', wordDict.hints[idx])
   $("#hintimg").css("opacity", this.imgOpacity);
    for(var i = 0; i < word.length; i++){
        //need to figure out spaces
     if(word[i] === "-"){
            this.answers[i] = "-"
                } else {  
        this.answers[i] = "_";
        }
    }
    
    wordHolder.innerHTML = this.answers.join(" ");
    
    
       
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
            
            this.imgOpacity += .01
            $("#hintimg").css("opacity", this.imgOpacity);

        }
    wordHolder.innerHTML = this.answers.join(" ")
} else {
    return;
}
},

updateScoreboard: function(){
    winDiv.text("Overall Record: " + this.wins + "-" + this.losses);
  //  lossesDiv.text("Total Losses: " + this.losses);
    remainingDiv.text("Lives Remaining: " + this.lives);
    correctDiv.text("Correct Guesses: " + this.correctCount);
    incorrectDiv.text("Incorrect Guesses: " + this.incorrectCount);

    $("#scoreboard").append(winDiv);
  //  $("#scoreboard").append(lossesDiv);
    $("#scoreboard").append(remainingDiv);
    $("#scoreboard").append(correctDiv);
    $("#scoreboard").append(incorrectDiv);
},

gameStatus: function(){
    if(this.lives < 1){
        this.losses++
        this.imgOpacity = 1;
        $("#hintimg").css("opacity", this.imgOpacity);
        word = word.replace(/-/g, ' ')
        wordHolder.innerHTML = word + '<br>';
        wordHolder.append("Loser! Press any key to try again!");
        waiting = true; 
    }
    if(this.answers.indexOf("_") === -1){
        this.wins++
        this.imgOpacity = 1;
        $("#hintimg").css("opacity", this.imgOpacity);
        word = word.replace(/-/g, ' ')
        wordHolder.innerHTML = word + '<br>';
        wordHolder.append("You win! Press any key to play again!");
        waiting = true;  
     
    }
}


};



document.onkeyup = function(event) {
    // window.scrollTo(0, document.body.scrollHeight);
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


