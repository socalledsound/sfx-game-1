
// var container1 = new Container({
// 	x : 100,
// 	y : 100,
// 	width : 100,
// 	height : 320,
// 	color : [30,100,100],
// 	numCells : 4

// });

// var cell1 = new CellRow({
// 	x : 100,
// 	y : 100,
// 	width : 80,
// 	height : 80,
// 	color : [200,200,200],
// 	numSquares : 4

// })
var sounds = {
	containers: [
	{
		sound_A1 : "sounds/zippers/canvas-suitcase-zipper/cszipper1.ogg",
		sound_A2 : "sounds/highFairy/highFairy1.ogg",
		sound_A3 : "sounds/eerieSpace/eerieSpace1.ogg",
		sound_A4 : "sounds/claps/2017clapOS-DG3__4.mp3"
	},
	{

		sound_B1 :  "sounds/zippers/canvas-suitcase-zipper/cszipper2.ogg",
		sound_B2 : "sounds/highFairy/highFairy1.ogg",
		sound_A3 : "sounds/eerieSpace/eerieSpace2.ogg",
		sound_B4 : "sounds/claps/2017clapOS-DG3__8.mp3"
	},
	{
		sound_C1 :  "sounds/zippers/canvas-suitcase-zipper/cszipper3.ogg",
		sound_C2 : "sounds/highFairy/highFairy1.ogg",
		sound_A3 : "sounds/eerieSpace/eerieSpace3.ogg",
		sound_C4 : "sounds/claps/2017clapOS-DG3__12.mp3"		
	},
	{
		sound_D1 :  "sounds/zippers/canvas-suitcase-zipper/cszipper4.ogg",
		sound_D2 : "sounds/highFairy/highFairy1.ogg",
		sound_A3 : "sounds/eerieSpace/eerieSpace4.ogg",
		sound_D4 : "sounds/claps/2017clapOS-DG3__16.mp3"
	},
	{
		sound_E1 :  "sounds/zippers/canvas-suitcase-zipper/cszipper5.ogg",
		sound_E2 : "sounds/highFairy/highFairy1.ogg",
		sound_A3 : "sounds/eerieSpace/eerieSpace5.ogg",
		sound_E4 : "sounds/claps/2017clapOS-DG3__16.mp3"
	}
	]

};





var containers = []
var width=800;
var height=800;
var playMeridian = height/2-100;
var xStart = 150;
var numContainers =5;
var boxHeight = 80;
var interface;

var background_color = [61,39,17];
var background_color = [51,52,58];
var interfaceColor = [200,200,200];
var vertColor = [200,200,200,80]
var playHead_x = 10;
var playHeadPaused = true;
var playHeadColor = [40,40,80,100];
var playHeadColor = [239,228,60,100];
var soundPath = "audio/2017clapOS-DG3__1.mp3";

function setup() {
	 
	//background(0);
	createCanvas(800,700);
	// background(30,100,100);
	background(background_color);
	strokeWeight(boxHeight);
	stroke(vertColor);
	line(0,playMeridian,width, playMeridian);

	strokeWeight(3);
	line(170,80,200,60);
	line(200,60,230,80);
	triangle(170,80,200,60,230,80);



	stroke(30,100,100);
	for (var i = 0; i < numContainers; i++) {
		containers[i] = new Container(xStart+(i*100),100,100,320,[30,100,100],4,sounds.containers[i]);
	}

	// container1 = new Container(100,100,100,500,);
	containers.forEach(function(container){
		container.initCells();
		container.initContainerTriangles();
		container.display();
	});

	interface = new Interface();
	interface.initPlayButton();
	interface.displayInterface();


//setInterval(movePlayhead,50);

}

function draw() {



}



 function mouseClicked() {
	
 	// interface.checkPlayButton();

// 	if(playHeadPaused && interface.playButtonClicked) {
// 		playHeadPaused = false;
// 		setInterval(movePlayhead,50);
// 	}

// 	// else if(playHeadPaused) {
// 	// 			containers.forEach(function(container){
// 	// 		container.checkCellsForClick();		
// 	// 		})

// 	// 	containers.forEach(function(container){
		
// 	// 		container.updateClick();		
		
// 	// 		})
// 	// }

// 	else if (!playHeadPaused && interface.playButtonClicked) {
// 		 playHeadPaused = true;	
// 	}


	if(playHeadPaused) {
				containers.forEach(function(container){
			container.checkCellsForClick();		
			})

		containers.forEach(function(container){
		
			container.updateClick();		
		
			})
	}


 }

function mouseDragged() {
// playHeadPaused = true;	
background(background_color);
	strokeWeight(boxHeight);
	stroke(vertColor);
	line(0,playMeridian,width,playMeridian);
	strokeWeight(3);
	stroke(30,100,100);

containers.forEach(function(container) {
		container.checkClick();
		if(container.draggable) {
			console.log("trig movecells");
			container.move();
			container.moveCells();
			container.moveTriangles();
		}
	})

	containers.forEach(function(container) {	
		container.display();

	})
		strokeWeight(20);
	stroke(200,30,30,100);
	stroke(playHeadColor);
	line(playHead_x,0,playHead_x,height);
}

function mouseReleased() {
	//playHeadPaused = false;
	containers.forEach(function(container) {
		container.draggable = false;
	})
	
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




// var sounds = {
// 	containers: [
// 	{
// 		sound_A1 : "sounds/freeway/freeway1.ogg",
// 		sound_A2 : "sounds/highFairy/highFairy1.ogg",
// 		sound_A3 : "sounds/eerieSpace/eerieSpace1.ogg",
// 		sound_A4 : "sounds/claps/2017clapOS-DG3__4.mp3"
// 	},
// 	{

// 		sound_B1 : "sounds/freeway/freeway2.ogg",
// 		sound_B2 : "sounds/highFairy/highFairy1.ogg",
// 		sound_A3 : "sounds/eerieSpace/eerieSpace2.ogg",
// 		sound_B4 : "sounds/claps/2017clapOS-DG3__8.mp3"
// 	},
// 	{
// 		sound_C1 : "sounds/freeway/freeway3.ogg",
// 		sound_C2 : "sounds/highFairy/highFairy1.ogg",
// 		sound_A3 : "sounds/eerieSpace/eerieSpace3.ogg",
// 		sound_C4 : "sounds/claps/2017clapOS-DG3__12.mp3"		
// 	},
// 	{
// 		sound_D1 : "sounds/freeway/freeway4.ogg",
// 		sound_D2 : "sounds/highFairy/highFairy1.ogg",
// 		sound_A3 : "sounds/eerieSpace/eerieSpace4.ogg",
// 		sound_D4 : "sounds/claps/2017clapOS-DG3__16.mp3"
// 	},
// 	{
// 		sound_E1 : "sounds/freeway/freeway5.ogg",
// 		sound_E2 : "sounds/highFairy/highFairy1.ogg",
// 		sound_A3 : "sounds/eerieSpace/eerieSpace5.ogg",
// 		sound_E4 : "sounds/claps/2017clapOS-DG3__16.mp3"
// 	}
// 	]

// };