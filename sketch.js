var game;
var solvedFont;
   var canvas;
      var canvasWidth;
      var ctx;

document.addEventListener('touchstart', this.touchstart);
document.addEventListener('touchmove', this.touchmove);

function touchstart(e) {
    e.preventDefault()
}

function touchmove(e) {
    e.preventDefault()
}







// function preload() {

// }



      // function initCanvasListener() {
      //   canvas = document.getElementById('canvas');
      //   if (canvas.getContext) {
      //     ctx = canvas.getContext("2d");
 
      //     window.addEventListener('resize', resizeCanvas, false);
      //     window.addEventListener('orientationchange', resizeCanvas, false);
      //     resizeCanvas();
      //   }
      // }
 
      // function resizeCanvas() {
      //   canvas.width = window.innerWidth;
      //   canvas.height = window.innerHeight;
      // }


function setup() {
	solvedFont = loadFont("fonts/Lato-Black.ttf");
	createCanvas(windowWidth,windowHeight);
	game = new Game(gameOptions);
	game.initGame();
// initCanvasListener();
};


function draw() {
  if(!game.paused) {
    game.drawGame();
  }
  
}





 function mousePressed() {	
 	// console.log(game.textIsShowing);
 	if(!game.stopEverythingForText) {
 		game.clicked();
 	}
 	
 };

function mouseDragged() {
	if(!game.stopEverythingForText) {
	game.dragged();
	}
};

function mouseReleased() {
	if(!game.stopEverythingForText) {
	game.containers.forEach(function(container) {
		// container.checkMeridian();
		container.draggable = false;
		container.resetCellMoving();
	})
	}
}

function reEnablePlayback () {
	disablePlayback = false;
}


