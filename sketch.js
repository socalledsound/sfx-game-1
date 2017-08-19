var game;
var solvedFont;


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


