//  Variables used in the page.
var level = 0;
var started = false;
var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue", "green", "yellow"];

// Jquery to check the keypress and start the game.
$(document).keypress(function(event){
    if (!started)
    {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


// Jquery to check whick button is clicked and play sound.
$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
});

//Function to check the answer
function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length)
        {
            setTimeout(function(){ 
                nextSequence();
            }, 1000);
        }        
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){ 
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

//Function to play random button with sound.
function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);

}

//Function to play sound on button click.
function playSound(name){
    var audio = new Audio("sounds/" + name + ".mp3" );
    audio.play();
}


// Function to add animation to the button.
function animatePress(currentColour){
    $("#" + currentColour).addClass("pressed");

    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

//Function to reset the value if answer is wrong.
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}