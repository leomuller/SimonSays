

loadEventHandlers();


var gameRunning = false;
var curLevel = 0;
var gameState = [];
var answerClicks = [];

function loadEventHandlers(){

    $("#green").on( "click", null , function() {
        if(gameRunning === true){
            showGreen();
            answerClickGreen();
        }
      });

      
    $("#red").on( "click", null , function() {
        if(gameRunning === true){
            showRed();
            answerClickRed();
        }
       
    });

    
    $("#yellow").on( "click", null , function() {
        if(gameRunning === true){
            showYellow();
            answerClickYellow();
        }
      
    });

    
    $("#blue").on( "click", null , function() {
        if(gameRunning === true){
            showBlue();
            answerClickBlue();
        }
       
    });



    $(document).keydown(function(){
        if(gameRunning === false){
            startGame();
        }
      });

}


function startGame(){
    console.log("starting new game");

    answerClicks = [];
    gameRunning = true;

    setTimeout(startNextLevel, 400);

}

function startNextLevel(){
    console.log("startNextLevel");

    curLevel++;
    $("h1#level-title").text("Level " + curLevel);

    var rnd = Math.floor(Math.random() * 4) + 1;

    gameState.push(rnd);
   
    //show the mission:
    for(var i = 0; i<gameState.length; i++){

        //console.log("gameState", gameState);
        //console.log(gameState);
        var waittime = 500 + (i * 300);

        setTimeout(function(butNum){
            //console.log("curgamestate", gameState[i]);

            if(gameState[butNum] === 1){
                showGreen();
            }
    
            if(gameState[butNum] === 2){
                showRed();
            }
    
            if(gameState[butNum] === 3){
                showYellow();
            }
    
            if(gameState[butNum] === 4){
                showBlue();
            }
        }, waittime, i);

        //await sleep(1000); // Pause for 1 second


      
    }

}


function answerClickGreen(){
    console.log("clicked green");
    answerClicks.push(1);
    checkAnswer();
}

function answerClickRed(){
    console.log("clicked red");
    answerClicks.push(2);
    checkAnswer();
}

function answerClickYellow(){
    console.log("clicked yellow");
    answerClicks.push(3);
    checkAnswer();
}

function answerClickBlue(){
    console.log("clicked blue");
    answerClicks.push(4);
    checkAnswer();
}

function checkAnswer(){

    console.log("checkAnswer");
    var gotMistake = false;

    if(answerClicks.length > gameState.length){
        endGame();
        return;
    }

    for(var i=0;i<answerClicks.length;i++){
        if(answerClicks[i] === gameState[i]){
            //good!
        }
        else{
            //not good.
            console.log("mistake!");
            gotMistake = true;
           
        }
    }

    //no mistakes:
    if(answerClicks.length === gameState.length && gotMistake === false){
        //add step
        //console.log("good job!!");

        $("h1#level-title").text("Awesome!");
        setTimeout(startNextLevel, 600);
        //startNextLevel();
        answerClicks = [];
    }

    if(gotMistake === true){
        endGame();
    }

}


function endGame(){
    console.log("ending game...");
    $("h1#level-title").text("Game Over, you got to level  " + curLevel);

    var audGameOver = new Audio();
    audGameOver.src = "sounds/wrong.mp3";
    audGameOver.play();

    curLevel = 0;
    gameRunning = false;
}


function showGreen(){

    $("#green").addClass("pressed");
    var audGreen = new Audio();
    audGreen.src = "sounds/green.mp3";
    audGreen.play();

    setTimeout(function(){
        $("#green").removeClass("pressed");
    }, 200);

}



function showRed(){

    $("#red").addClass("pressed");
    var aduRed = new Audio();
    aduRed.src = "sounds/red.mp3";
    aduRed.play();

    setTimeout(function(){
        $("#red").removeClass("pressed");
    }, 200);

}



function showYellow(){

    $("#yellow").addClass("pressed");
    var audYellow = new Audio();
    audYellow.src = "sounds/yellow.mp3";
    audYellow.play();

    setTimeout(function(){
        $("#yellow").removeClass("pressed");
    }, 200);

}



function showBlue(){

    $("#blue").addClass("pressed");
    var audBlue = new Audio();
    audBlue.src = "sounds/blue.mp3";
    audBlue.play();

    setTimeout(function(){
        $("#blue").removeClass("pressed");
    }, 200);

}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}