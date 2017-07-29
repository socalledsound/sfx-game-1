

var puzzle1 = { 
	sounds: [
	{
		title: "CANVAS SUITCASE ZIPPER, LONG ZIP OPEN OR CLOSE, SIDE COMPARTMENT, GOOD, SEVERAL TAKES",
		fullSound: "sounds/zippers/canvas-suitcase-zipper/cszipper-full.ogg",
		solutionKey:"A",
		alreadySolved: false,
		clips: [
			{A1:"sounds/zippers/canvas-suitcase-zipper/cszipper1.ogg"},
			{A2:"sounds/zippers/canvas-suitcase-zipper/cszipper2.ogg"},
			{A3:"sounds/zippers/canvas-suitcase-zipper/cszipper3.ogg"},
			{A4:"sounds/zippers/canvas-suitcase-zipper/cszipper4.ogg"},
			{A5:"sounds/zippers/canvas-suitcase-zipper/cszipper5.ogg"}
		]
	},
	{
		title: "FOREST AMBIENCE, AFTERNOON, MULTIPLE WOODPECKERS JAM, WOODLAND AMBIENCE WITH STREAM AND SMALL BIRDS IN BG",
		fullSound: "sounds/woodpeckers/woodpeckers-full.ogg",
		solutionKey:"B",
		alreadySolved: false,
		clips: [
			{B1:"sounds/woodpeckers/woodpeckers1.ogg"},
			{B2:"sounds/woodpeckers/woodpeckers2.ogg"},
			{B3:"sounds/woodpeckers/woodpeckers3.ogg"},
			{B4:"sounds/woodpeckers/woodpeckers4.ogg"},
			{B5:"sounds/woodpeckers/woodpeckers5.ogg"},
		]
	},
	{
		title: "EERIE AMBIENCE LARGE, SCARY SPACE, SWEEPING TONES, ENERGY WAVE SWELL OR GIANT SPACESHIP BY, SCI FI",
		fullSound: "sounds/eerieSpace-new/eerieSpace-new-full.ogg",
		solutionKey:"C",
		alreadySolved: false,
		clips: [
			{C1:"sounds/eerieSpace-new/eerieSpace-new-1.ogg"},
			{C2:"sounds/eerieSpace-new/eerieSpace-new-2.ogg"},
			{C3:"sounds/eerieSpace-new/eerieSpace-new-3.ogg"},
			{C4:"sounds/eerieSpace-new/eerieSpace-new-4.ogg"},
			{C5:"sounds/eerieSpace-new/eerieSpace-new-5.ogg"},
		]
	},
	{
		title: "GIANT HUMMINGBIRD DARTING AROUND, WINGS BEATING VERY FAST, HOVERING -- VOCAL -- CARTOON",
		fullSound: "sounds/hummingbird-new/hummingbird-new-full.ogg",
		solutionKey:"D",
		alreadySolved: false,
		clips: [
			{D1:"sounds/hummingbird-new/hummingbird-new-1.ogg"},
			{D2:"sounds/hummingbird-new/hummingbird-new-2.ogg"},
			{D3:"sounds/hummingbird-new/hummingbird-new-3.ogg"},
			{D4:"sounds/hummingbird-new/hummingbird-new-4.ogg"},
			{D5:"sounds/hummingbird-new/hummingbird-new-5.ogg"},
		]
	},
	{
		title: "ANNOYING HIGH FAIRY VOCALIZATION",
		fullSound: "sounds/highFairy/highFairy-full.ogg",
		solutionKey:"E",
		alreadySolved: false,
		clips: [
			{E1:"sounds/highFairy/highFairy1.ogg"},
			{E2:"sounds/highFairy/highFairy2.ogg"},
			{E3:"sounds/highFairy/highFairy3.ogg"},
			{E4:"sounds/highFairy/highFairy4.ogg"},
			{E5:"sounds/highFairy/highFairy5.ogg"},
		]
	}	
]};


 var solutions = ["canvas suitcase zipper","woodpecker forest jam session","eerie space sound","giant hummingbird"];


var containers = []
var width=1000;
var height=1000;
var playMeridian = height/2-100;
var xStart = 150;
var yStart = 200;
var meridian = 400;
var numContainers =5;
var boxHeight = 80;
var interface;

var background_color = [61,39,17];
var background_color = [51,52,58];
var interfaceColor = [200,200,200];
var vertColor = [200,200,200,80]
var playHead_x = 10;
var playHeadPaused = false;
var playHeadColor = [40,40,80,100];
var playHeadColor = [239,228,60,100];
var soundPath = "audio/2017clapOS-DG3__1.mp3";
var currentKey = "Z";
var solvedArray = [0,0,0,0,0];
var solvedObject;
var solved = false;
var antiSolveSpell = false;
var disablePlayback = false;
var noInterface = false;

var container1sounds=[];
var container2sounds=[]; 
var container3sounds=[];
var container4sounds=[]; 
var container5sounds=[];


 puzzle1.sounds.forEach(function(sound){
	 container1sounds.push(sound.clips[0]);
	 container2sounds.push(sound.clips[1]);
	 container3sounds.push(sound.clips[2]);
	 container4sounds.push(sound.clips[3]);
	 container5sounds.push(sound.clips[4]);
})

var containerSounds = [container1sounds,container2sounds, container3sounds, container4sounds, container5sounds];
var playbackArray = [];

// console.log(container1sounds);

function setup() {
	 
	//background(0);
	createCanvas(1000,1000);
	// background(30,100,100);
	background(background_color);
	// strokeWeight(boxHeight);
	// stroke(vertColor);
	// line(0,playMeridian,width, playMeridian);

	// strokeWeight(3);
	// line(170,80,200,60);
	// line(200,60,230,80);
	// triangle(170,80,200,60,230,80);

	 strokeWeight(3);
	line(0,400,100,400);


	stroke(30,100,100);
	for (var i = 0; i < numContainers; i++) {
		containers[i] = new Container(xStart+(i*100),yStart,100,400,meridian,[30,100,100],5,containerSounds[i]);
	}

	// container1 = new Container(100,100,100,500,);
	containers.forEach(function(container,index){
		container.initCells();
		container.initContainerTriangles();
		// container.checkMeridian();
		meridianKey = container.checkMeridian();
			  // console.log(index);
		if (index<1) {
				currentKey = meridianKey;
				// container.containerSolved;
			};
			// console.log(currentKey);
			container.checkSolution(currentKey);
		
		// container.checkSolution(currentKey);
		container.display();
	});

	// interface = new Interface();
	// interface.initPlayButton();
	// interface.displayInterface();


 //setInterval(movePlayhead,50);

}

function draw() {

}



 function mouseClicked() {	
	if(!noInterface) {
		containers.forEach(function(container){
			container.checkClick();	
			container.display();
			// setTimeout(container.display.bind(container),400);		
		})
	};
		if(solved) {
				// textSize(90);
				// textFont('Georgia');
				// fill(255,165,0);


				// text(solvedObject,80,80,600,1000);
		}
 }

function mouseDragged() {
	antiSolveSpell=false;
// playHeadPaused = true;	
var meridianKey="Z";
if(!noInterface) {
background(background_color);
	strokeWeight(boxHeight);
	stroke(vertColor);
	// line(0,playMeridian,width,playMeridian);
	strokeWeight(3);
	stroke(30,100,100);

containers.forEach(function(container,index) {
	container.checkSolution(currentKey);
	
		container.checkDraggable();
		if(container.draggable) {
			 console.log("trig movecells");
			container.move();
			container.moveCells();
			container.moveTriangles();
			meridianKey = container.checkMeridian();
			  // console.log(index);
			if (index<1) {
				currentKey = meridianKey;
				// container.containerSolved;
			};
			// console.log(currentKey);
			container.checkSolution(currentKey);
		};	
			container.display();
			  // console.log("is container solved?" + container.containerSolved);
			// container.startColor();
			// console.log(container.containerSolved);
			if(container.containerSolved) {
				solvedArray[index] = 1;
			}
			else {
				solvedArray[index]=0;
			}
		


	})

	// containers.every
	// console.log(solvedArray);
		if(solvedArray.every(function(el) {
				return el > 0;
			}) && !antiSolveSpell) { 
				console.log("yay")
				solved=true;


				 solvedObject = puzzle1.sounds.filter(function(sound,i,array) {
					 console.log("solved key" + currentKey)	
					 console.log(sound.solutionKey);
					
						if(sound.solutionKey === currentKey) {
							// console.log("returning" + sound);
							//  console.log(sound.title);
							return sound.title;
						};
				})
				

				// containers.forEach(function(container){
				// 	container.playSolution();
				// })	
				
				console.log(solvedObject[0].alreadySolved);

				if(!solvedObject[0].alreadySolved) {
					solvedObject[0].alreadySolved = true;
				var fullSound = new Howl({ src: solvedObject[0].fullSound });
				
				if(!disablePlayback) {
					fullSound.play();
					disablePlayback = true;
					setTimeout(reEnablePlayback, 5000);
					};
				solvedObject=JSON.stringify(solvedObject[0].title);
				// var soundName = Object.keys(solvedObject);
				// console.log(soundName);
				// createP(solvedObject).addClass('text');
				

				textView();
				};


		};

	};			// solvedArray.every(function(el) {
			// 	console.log(el);
			// })

	//	// draw playhead
	// 	strokeWeight(20);
	// stroke(200,30,30,100);
	// stroke(playHeadColor);
	// line(playHead_x,0,playHead_x,height);
}

function mouseReleased() {
	//playHeadPaused = false;
	containers.forEach(function(container) {
		// container.checkMeridian();
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

function resetSolution() {
	solved = false;
	solvedObject = "";
	antiSolveSpell=true;
	// resetView();
}

function textView() {
	background(background_color);
	textSize(70);
	textFont('Arial');
	fill(200);
	// fill(255,165,0);	
	// strokeWeight(20);
	// stroke(120);
	text(solvedObject,200,100,500,1000);
	// setTimeout(resetSolution,5000);
	noInterface=true;
	setTimeout(blankView,4000);
}

function blankView() {
	background(background_color);
	setTimeout(resetSolution,3000);
	setTimeout(resetView,3000);
}


function resetView() {
	noInterface = false;
	background(background_color);
		containers.forEach(function(container) {

		container.display();
		
		})
}


function reEnablePlayback () {
	disablePlayback = false;
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