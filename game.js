var buttonColors = ["green", "red", "blue", "yellow"];

var colorSequence = [];

var userClickedPattern = [];

var started = false;
var level = 0;



$(document).keydown(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


// USER SELECTIONS
$(".btn").on("click", function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

// RANDOM PATTERN GENERATOR
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColors[randomNumber];
  colorSequence.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(90).fadeOut(90).fadeIn(90);
  playSound(randomChosenColour)
}


// BUTTON SOUNDS
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// BUTTON ANIMATIONS
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}


// SEQUENCE

function checkAnswer(currentLevel) {
  if (colorSequence[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");

    if (userClickedPattern.length === colorSequence.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }

  } else {
    console.log("wrong");

    playSound("wrong");

    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("Game Over, Press Any Key to Restart");

    startOver();

  }


}


// RESTART

function startOver(){
  level = 0;
  colorSequence = [];
  started = false;
}
