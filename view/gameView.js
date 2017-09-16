var gameView = function(options) {

	this.options = options;

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

	
}



//  just thinking this thru a bit.

// so there will be a gameview component that will have the interface elements, several containers and several cells in each container

//the game will manage the state; gameview will respond to state



// skecth setup -> game.init -> gameView.init


// sketch -- MousePresssed - > game.clicked - > gameView.checkClick


