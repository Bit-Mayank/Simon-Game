var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var firstTime = true;
var level = 1, check = 0, clickCount = 0, restart = 0;
function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("." + randomChosenColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    $("#level-title").text("Level " + level);

    check = 0;
    clickCount = 0;
}

function startover() {
    gamePattern = [];
    userClickedPattern = [];
    level = 1;
    nextSequence();
}

$(document).keydown(function (event) {
    if ((event.key == 'a' || event.key == 'A') && firstTime == true) {
        nextSequence();
        firstTime = false;
    }

    if (restart > 0 && firstTime == false) {
        startover();
    }
});

$(document).click(function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    animatePress(userChosenColor);
    playSound(userChosenColor);
    if (userClickedPattern[clickCount] == gamePattern[clickCount]) {
        check++;
    }
    else {
        checkAnswer(level);

    }

    clickCount++;
    if (check == level) {

        checkAnswer(level);
    }
});

function playSound(name) {
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function animatePress(currentColour) {
    document.querySelector("." + currentColour).classList.toggle("pressed");
    setTimeout(function () {
        document.querySelector("." + currentColour).classList.toggle("pressed");
    }, 100);
}

function animateWrongAnswer() {
    document.querySelector("body").classList.toggle("game-over");
    setTimeout(function () {
        document.querySelector("body").classList.toggle("game-over");
    }, 200);
}

function checkAnswer(currentLevel) {

    if (check == level) {
        console.log("success");
        setTimeout(function () {
            level++;
            nextSequence();
            userClickedPattern = [];
        }, 1000);
    }
    else {
        console.log("Wrong");
        playSound("wrong");
        animateWrongAnswer();
        $("#level-title").text("Game Over, Press Any Key to Restart");
        restart++;
    }

}