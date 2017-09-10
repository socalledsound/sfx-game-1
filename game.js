
var Game = function(options) {	
	this.clickSound = new Howl({src:options.mainClickSoundPath,html5: false,volume:0.5});
	this.magicSolvedSound = new Howl({src:options.magicSolvedSoundPath})
	this.background_color = options.background_color;
	
	this.cellBorderColor=options.cellBorderColor;
	this.cellMeridianColor = options.cellMeridianColor;
	this.glowingColor= options.glowingColor;
	this.solvedTextColor = options.solvedTextColor;
	this.highlightColor = options.highlightColor;
	this.solvedColor = options.solvedColor;
	this.interfaceColor = options.interfaceColor;
	this.interfaceStrokeColor = options.interfaceStrokeColor;
	this.vertColor = options.vertColor;
	this.playHeadColor = options.playHeadColor;
	this.numContainers = options.numContainers;
	this.width=options.width;
	this.height=options.height;
	this.xStart=options.xStart;
	this.yStart=options.yStart;
	this.meridian=options.meridian;
	this.boxHeight=options.boxHeight;
	this.spacer=options.spacer;
	this.playHead_x=options.playHead_x;
	this.playMeridian = this.height/2-100;
	this.containers = [];
	this.upperTriangles=[];
	this.lowerTriangles=[];
	this.containerWidth=options.containerWidth;
	this.containerHeight=options.containerHeight;
	this.container1sounds=[];
	this.container2sounds=[]; 
	this.container3sounds=[];
	this.container4sounds=[]; 
	this.container5sounds=[];
	
	this.containerSounds = [this.container1sounds,this.container2sounds, this.container3sounds, this.container4sounds, this.container5sounds];
	this.playbackArray = [];
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
	
	this.cellStartColor = [200,200,200];
	this.cellHiddenColors=[[6, 62, 229],[196, 17, 44],[229, 99, 6],[200,20,200],[11, 221, 25]];


	this.initGame = function() {
		
		 background(this.background_color);
		this.loadPuzzleSounds();
		
		this.initContainers();
		// this.initInterface();
		
	},


	this.loadPuzzleSounds = function() {

			puzzleData.sounds.forEach(function(sound){
				 this.container1sounds.push(sound.clips[0]);
				 this.container2sounds.push(sound.clips[1]);
				 this.container3sounds.push(sound.clips[2]);
				 this.container4sounds.push(sound.clips[3]);
				 this.container5sounds.push(sound.clips[4]);
			}, this);
	}

	this.drawRules = function () {
		if(this.showRules) {
		stroke(30,100,100);

		this.drawInterface();
		this.rules = new Rules(options.rulesX,options.rulesY,options.rulesHeight,options.rulesWidth,options.background_color,options.rulesTextColor);
		this.rules.initRules();
		};
	}





	this.initUpperTriangle = function(x,y) {
			
		var a = x + 20;
		var b = y - 20;
		var c = x + 50;
		var d = y - 40;
		var e = x + 80;
		var f = y  -20;
		var fill = this.interfaceColor;
		var stroke = this.interfaceStrokeColor;		

		this.upperTriangles.push(new Triangle(a,b,c,d,e,f,fill,stroke,"upper"));			
	}, 

	this.initLowerTriangle = function(x,y) {
			
		var a = x + 20;
		var b = y + this.containerHeight+40;
		var c = x + 50;
		var d = y + this.containerHeight+40+20;
		var e = x + 80;
		var f = y + this.containerHeight+40;
		var fill = this.interfaceColor;
		var stroke = this.interfaceStrokeColor;	

		this.lowerTriangles.push(new Triangle(a,b,c,d,e,f,fill,stroke,"lower"));
						
	},

	this.initContainers = function() {
		for (var i = 0; i < this.numContainers; i++) {
			this.containers[i] = new Container(this.xStart+(i*100),this.yStart,100,400,this.meridian,[30,100,100],5,this.containerSounds[i]);
		}

		this.containers.forEach(function(container,index){
			this.initUpperTriangle(container._x,container._y);
			this.initLowerTriangle(container._x,container._y);
			container.initCells();
			container.checkMeridian();
			container.display();

		},this);
		console.log(this.lowerTriangles);
	}


	this.drawInterface = function() {

		// stroke(this.interfaceStrokeColor);
		 

		this.upperTriangles.forEach(function(triangle) {
			triangle.display();
			});	
		this.lowerTriangles.forEach(function(triangle) {
			triangle.display();
			});	

		this.drawMeridianBox();
		

	},

	this.drawPlayMarker = function() {
		fill(this.highlightColor);
		rect(50,360,100,35);
	},

	this.drawMeridianMarker = function() {
		stroke(this.interfaceColor);
		strokeWeight(3);
		fill(this.highlightColor);
		rect(20,395,40,10);
	},

	this.drawMeridianBox = function() {
		stroke(this.highlightColor);
		strokeWeight(10);
		// fill(this.highlightColor);
		noFill();
		rect(70,368,520,85,10);
		stroke(this.interfaceColor);
	},


	this.drawContainers = function () {
			this.containers.forEach(function(container){
				container.display();
						
			})
	},

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
				setTimeout(container.displayGlowing.bind(container),100*index);
						
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


	this.moveColumnUpOneRow = function (index) {
		this.upperTriangles[index].moveBy_y((this.spacer + this.boxHeight) * -1);
		this.lowerTriangles[index].moveBy_y((this.spacer + this.boxHeight) * -1);
		this.containers[index].moveBy_y((this.spacer + this.boxHeight) * -1);
	},

	this.moveColumnDownOneRow = function (index) {
		this.upperTriangles[index].moveBy_y(this.boxHeight + this.spacer);
		this.lowerTriangles[index].moveBy_y(this.boxHeight  + this.spacer);
		this.containers[index].moveBy_y(this.boxHeight  + this.spacer);
	},





	this.playClick = function () {
		this.clickSound.play();
	},


	this.moveUpperTriangle =  function(triangle,container_x,container_y) {
		triangle.a = container_x + 20;
		triangle.b = container_y - 20;
		triangle.c = container_x + 50;
		triangle.d = container_y - 40;
		triangle.e = container_x + 80;
		triangle.f = container_y  -20;

	},
	
	this.moveLowerTriangle = function(triangle,container_x,container_y) {
		triangle.a = container_x + 20;
		triangle.b = container_y + this.containerHeight+40;
		triangle.c = container_x + 50;
		triangle.d = container_y + this.containerHeight+40+20;
		triangle.e = container_x + 80;
		triangle.f = container_y + this.containerHeight+40;

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
	
		clearInterval(this.animateText);
		this.resetInterface();
		
	}

	this.cleanup = this.cleanup.bind(this);	
	this.textAnimation = this.textAnimation.bind(this);

}