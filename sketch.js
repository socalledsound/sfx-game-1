var game;
var solvedFont;


// function preload() {

// }

function setup() {
	solvedFont = loadFont("fonts/Lato-Black.ttf");
	createCanvas(1200,850);
	game = new Game(gameOptions);
	game.initGame();
};

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


