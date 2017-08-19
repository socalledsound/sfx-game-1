
var Game = function(options) {	
	this.clickSound = new Howl({src:options.mainClickSoundPath});
	this.magicSolvedSound = new Howl({src:options.magicSolvedSoundPath})
	this.background_color = options.background_color;
	this.cellStartColor=options.cellStartColor;
	this.cellMeridianColor = options.cellMeridianColor;
	this.glowingColor= options.glowingColor;
	this.solvedTextColor = options.solvedTextColor;
	this.highlightColor = options.highlightColor;
	this.solvedColor = options.solvedColor;
	this.interfaceColor = options.interfaceColor;
	this.vertColor = options.vertColor;
	this.playHeadColor = options.playHeadColor;
	this.numContainers = options.numContainers;
	this.width=options.width;
	this.height=options.height;
	this.xStart=options.xStart;
	this.yStart=options.yStart;
	this.meridian=options.meridian;
	this.boxHeight=options.boxHeight;
	this.playHead_x=options.playHead_x;
	this.playMeridian = this.height/2-100;
	this.containers = [];
	this.container1sounds=[];
	this.container2sounds=[]; 
	this.container3sounds=[];
	this.container4sounds=[]; 
	this.container5sounds=[];
	
	this.containerSounds = [this.container1sounds,this.container2sounds, this.container3sounds, this.container4sounds, this.container5sounds];
	this.playbackArray = [];
	this.currentKey = "Z";
	this.playHeadPaused = false;

	this.solvedArray = [0,0,0,0,0];
	this.solvedText;
	this.solvedTextSize=20;
	// this.solvedTextFont='Arial';
	this.solvedText_x=150;
	this.solvedText_y=365
	;
	this.solvedText_width=500;
	this.solvedText_height=120;
	this.solved = false;
	this.antiSolveSpell = false;
	this.disablePlayback = false;
	this.noInterface = false;
	// this.disableInterface = false;
	this.stopEverythingForText=false;
	this.curIndex=0;
	

	this.initGame = function() {
		

		this.loadPuzzleSounds();
		this.initInterface();
		this.initContainers();

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

	this.initInterface = function () {
		stroke(30,100,100);
		background(this.background_color);
		this.drawMeridianMarker();
		this.rules = new Rules(options.rulesX,options.rulesY,options.rulesHeight,options.rulesWidth,options.rulesBGcolor,options.rulesTextColor);
		this.rules.initRules();
	}


	this.initContainers = function() {
		for (var i = 0; i < this.numContainers; i++) {
			this.containers[i] = new Container(this.xStart+(i*100),this.yStart,100,400,this.meridian,[30,100,100],5,this.containerSounds[i]);
		}

		this.containers.forEach(function(container,index){
			container.initCells();
			container.initContainerTriangles();
			meridianKey = container.checkMeridian();
			container.display();

			if (index<1) {
					this.currentKey = meridianKey;
				};
			container.checkSolution(this.currentKey);
			container.display();
		},this);
	}


	this.drawInterface = function() {

		stroke(30,100,100);
		background(this.background_color);
		this.drawMeridianMarker();

	}

	this.drawContainers = function () {

	}

	this.drawGame = function() {
		// this.drawPlayMarker();
		this.drawInterface();
		this.drawContainers();
	},


	this.clicked = function() {
		if(!this.stopEverythingForText) {
			
			this.containers.forEach(function(container){
				container.checkClick();	
				container.display();
						
			})
		};

	},




	this.drawPlayMarker = function() {
		fill(this.highlightColor);
		rect(50,360,100,35);
		// strokeWeight(3);
	 // 	line(0,400,100,400);
	},

	this.drawMeridianMarker = function() {
		stroke(this.interfaceColor);
		strokeWeight(3);
		fill(this.highlightColor);
		rect(60,395,60,10);
	},


	this.playClick = function () {
		this.clickSound.play();
	},

	this.dragged = function() {

		this.antiSolveSpell=false;
	
		var meridianKey="Z";
		if(!this.noInterface) {

			
			this.drawInterface();

			this.containers.forEach(function(container,index) {

				container.checkSolution(this.currentKey);

				container.checkDraggable();
				if(container.draggable) {
					container.move();
					container.moveCells();
					container.moveTriangles();


					meridianKey = container.checkMeridian();

					if (index<1) {
						this.currentKey = meridianKey;

					};

					
				};	
					container.checkSolution(this.currentKey);
					container.display();
					
					if(container.containerSolved) {
						this.solvedArray[index] = 1;
					}
					else {
						this.solvedArray[index]=0;
					}
				


			},this);
		this.checkEvery();
		};
		
	},

	this.onSolved = function () {



			 var solvedObject = puzzleData.sounds.filter(function(sound,i,array) {
				 // console.log("solved key" + currentKey)	
				 // console.log(sound.solutionKey);
				
					if(sound.solutionKey === this.currentKey) {
						// console.log("returning" + sound);
						//  console.log(sound.title);
						return sound.title;
					};
			},this)
			
			
			// containers.forEach(function(container){
			// 	container.playSolution();
			// })	
			// console.log(solvedObject);
			//  console.log(solvedObject[0].alreadySolved);

			if(!solvedObject[0].alreadySolved) {
				solvedObject[0].alreadySolved = true;
			this.fullSolvedSound = new Howl({ src: solvedObject[0].fullSound });
			

			solvedObject=JSON.stringify(solvedObject[0].title);
			this.solvedText=solvedObject;
			// var soundName = Object.keys(solvedObject);
			// console.log(soundName);
			// createP(solvedObject).addClass('text');
			console.log(this);
			// setTimeout(this.solvedAnimation.bind(this),500);
			this.solvedAnimationGlowing()
			};
	},


	this.checkEvery = function() {
		 // console.log(this.solvedArray);
		if(this.solvedArray.every(function(el) {
				return el > 0;
			}) && !this.antiSolveSpell) { 
			setTimeout(this.onSolved.bind(this),500);
		};
	},


	this.resetInterface = function() {
		background(this.background_color);
		this.drawMeridianMarker();
		this.stopEverythingForText=false;
		this.disablePlayback=false;
		if(!this.textIsShowing) {
		this.containers.forEach(function(container){
			// container.checkClick();	
			container.display();
			// setTimeout(container.display.bind(container),400);		
			})
		}
		this.resetSolution();
	}

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

		this.containers.forEach(function(container){
				container.markGlowing(this.currentKey);	
				container.display();
				 //setTimeout(container.display.bind(container),400);		
			}, this)

		this.magicSolvedSound.play();
		setTimeout(this.solvedAnimationGrey.bind(this),1000);	
	}


	this.solvedAnimationGrey = function() {
		this.containers.forEach(function(container){
			
			container.markSolved(this.currentKey);	
			container.display();
			 //setTimeout(container.display.bind(container),400);		
		}, this)
		setTimeout(this.showText.bind(this),1000);
	},


	this.showText = function () {

					if(!this.disablePlayback) {
				this.fullSolvedSound.play();
				this.disablePlayback = true;
				setTimeout(reEnablePlayback, 30000);
				};
		this.stopEverythingForText=true;

		this.animateText = setInterval(this.textAnimation,100);

		

	}

	

	this.textAnimation = function () {
		
		// background(this.background_color);
		textSize(this.solvedTextSize);
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