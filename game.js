
var Game = function(options) {	

	this.options = options;


	this.meridianKey="Z";
	this.currentKey = "Z";
	this.playHeadPaused = false;

	this.solvedArray = [0,0,0,0,0];
	this.solvedText;
	this.solvedTextArray=[];
	this.solvedTextSize=60;
	// this.solvedTextFont='Arial';
	this.solvedText_x=options.xStart+5;
	this.solvedText_y=100;
	this.solvedText_width=600;
	this.solvedText_height=800;
	this.solved = false;
	this.antiSolveSpell = false;
	this.disablePlayback = false;
	this.noInterface = false;
	this.showRules = true;
	// this.disableInterface = false;
	this.paused=false;
	this.curIndex=0;



	this.initGame = function() {
		
		 background(this.background_color);
		this.loadPuzzleSounds();
		
		this.initContainers();
		// this.initInterface();
		
	},




	this.drawRules = function () {
		if(this.showRules) {
		stroke(30,100,100);

		this.drawInterface();
		this.rules = new Rules(options.rulesX,options.rulesY,options.rulesHeight,options.rulesWidth,options.background_color,options.rulesTextColor);
		this.rules.initRules();
		};
	}







	this.drawGame = function() {
		background(this.background_color);
		this.drawRules();
		this.drawContainers();
		this.drawInterface();
		this.checkSolution();
	},

	this.drawGlowing = function() {
		background(this.background_color);
		this.containers.forEach(function(container,index){
				// setTimeout(container.displayGlowing.bind(container),100*index);
				container.displayGlowing();
						
			})
	},

	this.drawSolved = function() {
		background(this.background_color);
		this.containers.forEach(function(container,index){
				container.displaySolved();
						
			})
	},

	this.checkSolution = function () {
		this.containers.forEach(function(container,index){
			this.meridianKey = container.checkMeridian();
				if (index<1) {
						this.currentKey = this.meridianKey;						
					};
			container.checkSolution(this.currentKey);
			if(container.containerSolved) {
					this.solvedArray[index] = 1;					
				}
			else {
					this.solvedArray[index]=0;
				}
		},this);
		this.checkEvery();
	},


	this.clicked = function() {
		if(!this.paused) {


		this.upperTriangles.forEach(function(triangle,index) {
			this.checkTriangleClick(triangle,index);
			},this);

		this.lowerTriangles.forEach(function(triangle,index) {
			this.checkTriangleClick(triangle,index);
			},this);
		
			this.containers.forEach(function(container){
				container.checkClick();	
				container.display();
			},this)
			this.drawInterface();
		};
		
	},


		this.checkTriangleClick = function(triangle, index) {
		var v0 = [triangle.e-triangle.a,triangle.f-triangle.b];
		var v1 = [triangle.c-triangle.a,triangle.d-triangle.b];
		var v2 = [mouseX-triangle.a,mouseY-triangle.b];

		var dot00 = (v0[0]*v0[0]) + (v0[1]*v0[1]);
		var dot01 = (v0[0]*v1[0]) + (v0[1]*v1[1]);
		var dot02 = (v0[0]*v2[0]) + (v0[1]*v2[1]);	
		var dot11 = (v1[0]*v1[0]) + (v1[1]*v1[1]);
		var dot12 = (v1[0]*v2[0]) + (v1[1]*v2[1]);

		var invDenom = 1/ (dot00 * dot11 - dot01 * dot01);

		var u = (dot11 * dot02 - dot01 * dot12) * invDenom;
		var v = (dot00 * dot12 - dot01 * dot02) * invDenom;

		if ((u >= 0) && (v >= 0) && (u + v < 1) && triangle.type === "upper" && this.containers[index]._y > 90) {
			this.moveColumnUpOneRow(index);
		}
		else if ((u >= 0) && (v >= 0) && (u + v < 1) && triangle.type === "lower" && this.containers[index]._y < 350) {
			this.moveColumnDownOneRow(index);
		};

	},






	this.dragged = function() {
		background(this.background_color);
		this.antiSolveSpell=false;
		this.showRules=false;
		if(!this.noInterface) {
			this.containers.forEach(function(container,index) {
				container.checkDraggable();
				if(container.draggable) {

					container.move();
					container.moveCells();
					this.moveUpperTriangle(this.upperTriangles[index],container._x,container._y);
					this.moveLowerTriangle(this.lowerTriangles[index],container._x,container._y);
					container.checkMeridian();					
				};	
			},this);
		
		};
	},

	this.onSolved = function () {
		
		 var solvedObject = puzzleData.sounds.filter(function(sound,i,array) {
				if(sound.solutionKey === this.currentKey) {
					return sound.title;
				};
			},this)
			
			if(!solvedObject[0].alreadySolved) {
				solvedObject[0].alreadySolved = true;
			this.fullSolvedSound = new Howl({ src: solvedObject[0].fullSound });
			solvedObject=JSON.stringify(solvedObject[0].title);
			this.solvedText=solvedObject;
			this.solvedAnimationGlowing()
			};
	},


	this.checkEvery = function() {
		if(this.solvedArray.every(function(el) {
				return el > 0;
			}) && !this.antiSolveSpell) { 
			setTimeout(this.onSolved.bind(this),500);
		};
	},


	this.resetInterface = function() {

		if(!this.textIsShowing) {
			this.paused=false;
			this.disablePlayback=false;		
			};
		this.resetSolution();
	},

	this.resetSolution = function() {
		this.solved = false;
		this.solvedObject = "";
		this.antiSolveSpell=false;
		this.currentKey = "Z";
		this.solvedArray=[0,0,0,0,0];

		this.containers.forEach(function(container){
			container.containerSolved=false;
		}, this)
	},


	this.solvedAnimationGlowing = function() {
		this.paused = true;
		this.containers.forEach(function(container){
				container.markGlowing(this.currentKey);			
			}, this)

		this.magicSolvedSound.play();
		this.drawGlowing();
		// this.drawGameNoBox();
		setTimeout(this.solvedAnimationGrey.bind(this),2000);	
	}


	this.solvedAnimationGrey = function() {
		this.containers.forEach(function(container){			
			container.markSolved(this.currentKey);		
		}, this)
		this.drawSolved();
		setTimeout(this.showText.bind(this),2000);
	},


	this.showText = function () {
 		
 		background(this.background_color);
		 
		 if(!this.disablePlayback) {
				this.fullSolvedSound.play();
				this.disablePlayback = true;
				// setTimeout(reEnablePlayback, 30000);
				};

		//this.animateText = setInterval(this.textAnimation,300);

		textSize(this.solvedTextSize);
		 textFont(rulesFont);
		 // textBounds();
		 //textFont('Serif');
		strokeWeight(3);
		textAlign(CENTER);
		fill(this.solvedTextColor);

		this.solvedText = this.solvedText.split(" ");
		console.log(this.solvedText);
		for (var i=0; i<this.solvedText.length; i++) {
			this.solvedTextArray.push(this.solvedText[i]);
			};
			console.log(this.solvedTextArray);
		this.solvedTextArray.forEach(function(item,index) {
			console.log(item);
			console.log(index);
			text(item,this.solvedText_x,this.solvedText_y+60*index,this.solvedText_width,this.solvedText_height);
		},this)
			
		

		setTimeout(this.cleanup,14000);
		this.fullSolvedSound.fade(1.0,0.0,12000);

	}

	

	this.textAnimation = function () {
		
		 background(this.background_color);
		textSize(this.solvedTextSize);
		// textFont(solvedFont);
		textFont('Sans');
		fill(this.solvedTextColor);

		text(this.solvedText.substring(0,this.curIndex+1),this.solvedText_x,this.solvedText_y,this.solvedText_width,this.solvedText_height);
		this.curIndex++;
		if (this.curIndex > this.solvedText.length) {

			setTimeout(this.cleanup,5000);
			this.fullSolvedSound.fade(1.0,0.0,6000);
			this.curIndex=0;
		}
	}


	this.cleanup = function() {
		this.solvedTextArray=[];
		clearInterval(this.animateText);
		this.resetInterface();
		
	}

	this.cleanup = this.cleanup.bind(this);	
	this.textAnimation = this.textAnimation.bind(this);

}