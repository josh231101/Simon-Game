var level = 0;
var started = false;
var userClickedPattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
//START EVENT
$(document).keypress(function(event) {
  if(event.key === "A" || event.key === "a"){
  if (started == false) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  } else {}
}
});
$("#level-title").click(function(event) {
  if (started == false) {
    $("#level-title").text("Level 0");
    nextSequence();
    started = true;
  } else {}
});
//BUTTON CONTROL
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer((userClickedPattern.length - 1));
});
//NEW SEQUENCE UPDATING THE LEVEL & THE ARRAY
function nextSequence() {
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}
function playSound(name) {
  var chosenColor = new Audio("sounds/" + name + ".mp3");
  chosenColor.play();
}
//BTN ANIMATION
function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}
//EVERY CLICK CHECKING IF ANSWERS IN EVERY POSITION ARE THE SAME
function checkAnswer(currentLevel){
  if(userClickedPattern[currentLevel] === gamePattern[currentLevel]  ){
    //Check if the sequence it's done
    if(userClickedPattern.length === gamePattern.length){
      setTimeout(function(){nextSequence()},1000);
      userClickedPattern = [];
    }else{}
  }else{
    startOver();
  }
}
//RESTARTING EVERYTHING AND DISPLAYING GAME OVER SCREEN
function startOver(){
  playSound("wrong");
  $("body").addClass("game-over");
  $("#level-title").text("GAME OVER!");
  setTimeout(function(){
    $("#level-title").text("PRESS A TO START!");
    $("body").toggleClass("game-over");
  },2000);
  //SETTING EVERYTHING TO 0 & NULL
  gamePattern = [];
  userClickedPattern = [];
  started = false;
  level = 0;
}
