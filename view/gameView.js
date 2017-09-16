var gameView = function(options) {

	this.options = options;

	this.clickSound = new Howl({src:options.mainClickSoundPath,html5: false,volume:0.5});
	this.magicSolvedSound = new Howl({src:options.magicSolvedSoundPath})
	this.background_color = options.background_color;	
	this.cellBorderColor=options.cellBorderColor;
	this.cellMeridianColor = options.cellMeridianColor;

	
	this.cellStartColor = [200,200,200];
	this.cellHiddenColors=[[6, 62, 229],[196, 17, 44],[229, 99, 6],[200,20,200],[11, 221, 25]];


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



	this.loadPuzzleSounds = function() {

			puzzleData.sounds.forEach(function(sound){
				 this.container1sounds.push(sound.clips[0]);
				 this.container2sounds.push(sound.clips[1]);
				 this.container3sounds.push(sound.clips[2]);
				 this.container4sounds.push(sound.clips[3]);
				 this.container5sounds.push(sound.clips[4]);
			}, this);
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
	
}



//  just thinking this thru a bit.

// so there will be a gameview component that will have the interface elements, several containers and several cells in each container

//the game will manage the state; gameview will respond to state



// skecth setup -> game.init -> gameView.init


// sketch -- MousePresssed - > game.clicked - > gameView.checkClick


