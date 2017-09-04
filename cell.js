var Cell = function(x, y, width, height,color,borderColor,sound) {
	this.x 			= 	x;
	this.y 			= 	y;
	this.width 		=	width;
	this.height 	= 	height;
	this.reset_x 	= x;
	this.reset_y 	= y;
	this.reset_height = height;
	this.reset_width = width;
	this.cellColor = color;
	this.cellBorderColor = borderColor;
	this.cellStartColor = color;
	this.highlightColor = game.highlightColor;
	this.cellMeridianColor = game.cellMeridianColor;
	this.soundPlayingColor =  [180,180,120];
	this.glowingColor=game.glowingColor;
	this.solvedColor =	game.solvedColor; 		

	
	this.oldColor = color;
	
	this.key 		= 	Object.keys(sound);
	this.sound		=	new Howl({src:[sound[this.key]],html5: false});


	this.key 		= 	Object.keys(sound)[0].charAt(0);

	this.moving 	= 	false;
	this.playing	=	false;
	this.clickPlaying = false;
	this.clicked 	=	false;
	this.highlight  = 	false;
	this.onMeridian = 	false;
	this.solved 	= 	false;
	this.visible    = 	true;
	this.trig 		= 	1;

	  console.log(this.key);
	// this.display = function() {
	// 	fill(this._color);
	// 	rect(this._x, this._y, this._width, this._height);
	// }
	this.cellPlayingFalse = function() {
		this.playing =false;
		this.clicked = false;
	},



	this.checkClick = function(){
		if( mouseX > this.x && mouseX < this.x +80 && mouseY > this.y && mouseY < this.y +80) {
				this.clicked = true;
				if(this.clicked && !this.playing && !game.disablePlayback && !this.solved && !this.moving) {

				 this.trigSoundAnimation();						
				}
		}	
	},

	this.checkBoundary = function() {

			if (this.y >350 && this.y <370 && !this.clickPlaying) {
				game.playClick();
				this.clickPlaying=true;
				setTimeout(this.resetClickPlaying.bind(this),300);
			}

	},

	this.resetClickPlaying = function() {

		this.clickPlaying = false;
	},

	this.resetMoving = function() {
			this.moving=false;
	}

	// this.updateColor = function() {		

	// 	// this.cellColor=this.cellColor;
	// 	// if(!this.solved) {
	// 	// 	if(!this.clicked) {	

	// 	// 		if (this.highlight&& !this.solved) {
	// 	// 			this.cellColor = this.highlightColor;
	// 	// 		}
	// 	// 		// else if (this.onMeridian) {
	// 	// 		// 	this.cellColor = this.cellMeridianColor;
	// 	// 		// }
	// 	// 		else if (this.solved) {
	// 	// 			this.cellColor = this.solvedColor;
	// 	// 		}
	// 	// 		else {
	// 	// 			this.cellColor = this.cellStartColor;
	// 	// 		}
	// 	// 	}
	// 	// 	else {
	// 	// 		 this.cellColor = this.soundPlayingColor;
	// 	// 	}
	// 	// }	
	// },


	this.display = function() {

		this.visible === true ? strokeWeight(0.5) : strokeWeight(0.0);	
		// stroke(this.cellBorderColor);
		// strokeWeight(20);
		fill(this.cellBorderColor);
		rect(this.x-5,this.y,this.width,this.height);
		fill(this.cellColor);		
		rect(this.x+5,this.y+10,this.width-20,this.height-20);
	},

	this.markAsMeridian = function() {
		this.onMeridian = true;
		if(!this.solved) {
		this.cellColor= this.cellMeridianColor;
	}
	},

	this.markUnMeridian = function() {
		this.onMeridian = false;
		if(!this.solved) {
			this.cellColor= this.cellStartColor;
		}
		
	},

	this.markHighlighted = function() {
		if(!this.solved) {
		this.highlight = true;
		this.cellColor=this.highlightColor;
		}
	},

	this.unHighlight = function() {
		this.highlight = false;
		this.cellColor=this.cellStartColor;
	},	

	this.markSolved = function() {
		this.solved = true;
		this.visible=false;
		this.cellBorderColor = this.solvedColor;
		this.cellColor = this.solvedColor;
	},

	this.markGlowing = function() {
		this.glowing = true;
		this.cellColor = this.glowingColor;
	},

	this.markUnGlowing = function() {
		this.glowing = false;
		if(this.solved) {
			this.cellColor=this.solvedColor
		}
		else {
			this.cellColor=this.cellStartColor;
		}

	},


	this.markUnSolved = function() {
		this.solved = false;
	},

	this.resetCellPlaying = function() {
		  this.height=this.reset_height;
		  this.width=this.reset_width;
		  this.x = this.reset_x;
		  this.y = this.reset_y;
		this.clicked = false;
		this.cellColor = this.oldColor;
		this.display();

	},

		this.resetCell = function() {
		this.clicked = false;
		this.cellColor = this.oldColor;
		this.display();

	},


	this.playSound = function(){
		this.playing = true;
		this.sound.play();
		setTimeout(this.cellPlayingFalse.bind(this),2000);
	},


	this.startBlink = function() {
	
		// var blinkTrig = setInterval(this.blinkCellColor.bind(this),100);
		// clearInterval(blinkTrig,2000)
	},

	this.blinkCellColor = function(trig) {
			
			this.cellColor=this.cellStartColor;
			// this.trig===1 ? this.cellColor = this.soundPlayingColor : this.cellColor = this.cellStartColor;
			// this.display();
			// this.trig=this.trig+1;
			// this.trig > 2 ? this.trig=1 : this.trig=this.trig;
			// console.log(this.trig);
		
	},

	this.trigSoundAnimation = function(){
		this.oldColor = this.cellColor;
		
		this.cellColor = this.soundPlayingColor;
			this.reset_x = this.x;
			this.reset_y = this.y;
			this.reset_height = this.height;
			this.reset_width = this.width;
			this.x = this.x+5;
			this.y = this.y+5;
			this.height = this.height-10;
			this.width = this.width-10;
		  // this.height = this.init_height-10;
		  // this.width = this.init_width-10;
		  // this.x = this.init_x + 5;
		  // this.y = this.init_y + 5;
		// this.startBlink();	
		// this.playing=true;
		 this.playSound();
		setTimeout(this.resetCellPlaying.bind(this),300);
	}	


}