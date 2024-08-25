var buttonColors = ["green", "red", "blue", "yellow", "purple", "black"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

function startGame(){
    started = true;
    nextSequence();
};


function endGame(){
    started = false;
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
}


function checkAnswer(index){
    if (userClickedPattern[index] == gamePattern[index]){
        if (userClickedPattern.length == gamePattern.length){
            nextSequence();
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function () {
            $("body").removeClass("game-over");
        },1000)
        endGame();
    }
}


function nextSequence(){
    userClickedPattern = [];
    level++;
    
    var random_number = Math.floor(Math.random() * buttonColors.length);
    var randomColorPicked = buttonColors[random_number];
    gamePattern.push(randomColorPicked);

    $("#level-title").text("level " + level);
    setTimeout(function () {
        playSound(randomColorPicked);
        $("#" + randomColorPicked).fadeOut(100).fadeIn(100);
    }, 1000)
}


function playSound(btn_color){
    audio = new Audio("sounds/" + btn_color + ".mp3");
    audio.play();
}


function animatePress(btn_color){
    $("#" + btn_color).addClass("pressed")
    setTimeout(function () {
        $("#" + btn_color).removeClass("pressed")
    }, 50)
}


$(document).keydown(function () {
    if(!started){
        startGame();
    }
});


$(".btn").click(function () {
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})
