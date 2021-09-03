var userClickedPattern = [];
var gamePattern = [];

var buttonColours = ["red", "blue", "green", "yellow"];

var level = 0;
var started = false;

$(document).keydown(function()
{
if (!started) {
  $("#level-title").text("Level " + level);
  nextSequence();
  started = true;
}
});

$(".btn").click(function() 
{

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  
  playSound(userChosenColour);

  animatePress(userChosenColour);

  var len1 = userClickedPattern.length;
  checkAnswer(len1-1);

});

function nextSequence()
{
  userClickedPattern = [];

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  //1. Use jQuery to select the button with the same id as the randomChosenColour
  //2. Use Google/Stackoverflow to figure out how you can use jQuery to animate a flash to the button selected in step 1.
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

  //3. Use Google/Stackoverflow to figure out how you can use Javascript to play the sound for the button colour selected in step 1.
  playSound(randomChosenColour);

  level++;
  $("h1").text("Level " + level);
}


function playSound(name)
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor)
{
  $("#" + currentColor).addClass("pressed");

  setTimeout(function()
  {
    $("#" + currentColor).removeClass("pressed");
  },100);
}


function checkAnswer(currentLevel)
{
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) 
    {
     console.log("Success");
   
   if (userClickedPattern.length === gamePattern.length)
   {

    //5. Call nextSequence() after a 1000 millisecond delay.
    setTimeout(function () {
      nextSequence();
    }, 1000);
  }
  }
   else
   {
     var wrong = new Audio("sounds/" + "wrong" + ".mp3");
     wrong.play();
    console.log("F");

    $("body").addClass("game-over");

    setTimeout(function()
    {
      $("body").removeClass("game-over");
    },200);

    $("h1").text("Game Over, Press Any Key to Restart");

    startOver();
   }
}

function startOver()
{
  level = 0;
  gamePattern = [];
  started = false;
}