var game;
var solvedFont;


// function preload() {

// }

function setup() {
	solvedFont = loadFont("fonts/Lato-Black.ttf");
	createCanvas(1000,1000);
	game = new Game(gameOptions);
	game.init();
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

function movePlayhead() {
var activeColumn;
	if(!playHeadPaused) {

	if( playHead_x < width) {playHead_x = playHead_x +10} else {playHead_x = 10};

	background(background_color);
	strokeWeight(boxHeight);
	stroke(vertColor);
	line(0,playMeridian,width,playMeridian);
	strokeWeight(3);
	 stroke(30,100,100);

		containers.forEach(function(container) {	
		 activeColumn = container.checkPlayhead(playHead_x);
		
		// container.display();
		
		})

	containers.forEach(function(container,index) {
	if(index === activeColumn ) {

		container.checkMeridian();
	}
	else {
		container.startColor();
	}
	})



	

	containers.forEach(function(container) {

		container.display();
		
		})



	strokeWeight(20);
	stroke(playHeadColor);
	line(playHead_x,0,playHead_x,height);	


	}
}



function reEnablePlayback () {
	disablePlayback = false;
}
