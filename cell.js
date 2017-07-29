var Cell = function(x, y, width, height,sound) {
	this.x 			= 	x;
	this.y 			= 	y;
	this.width 		=	width;
	this.height 	= 	height;
	
	this.cellStartColor = [2,12,51];
	this.highlightColor = [23,225,239];
	this.cellMeridianColor = [10,10,80];
	this.cellClickedColor =  [180,180,120];

	this.cellColor = this.cellStartColor;
	
	
	this.key 		= 	Object.keys(sound);
	this.sound		=	new Howl({src:[sound[this.key]]});
	this.key 		= 	Object.keys(sound)[0].charAt(0);

	this.playing	=	false;
	this.clicked 	=	false;
	this.highlighted = false;
	this.onMeridian = 	false;
	this.solved 	= 	false;

	 // console.log(this.key);
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
						 this.playSoundAnimation();
						
						
				}	

	},

	this.updateColor = function() {
			
			if(!this.clicked) {

				if (this.solved) {
					this.cellColor = this.highlightColor;
				}
				else if (this.onMeridian) {
					this.cellColor = this.cellMeridianColor;
				}
				else {
					this.cellColor = this.cellStartColor;
				}
			}
			else {
				this.cellColor = this.cellClickedColor;
			}



			

	},


	this.display = function() {
		// console.log(this.cellColor);
				fill(this.cellColor);
				strokeWeight(0.5);
				rect(this.x-5,this.y,this.width,this.height);
	},

	this.markAsMeridian = function() {
		this.onMeridian = true;
	},


	this.markAsSolved = function() {
		this.solved = true;
	},

	this.markUnSolved = function() {
		this.solved = false;
	},

	this.resetCell = function() {
		// this.solved = false;
		this.playing =false;
		this.clicked = false;
		this.updateColor();
		this.display();

	},


	this.playSound = function(){
		console.log("playSound");
		if(this.clicked && !this.playing && !disablePlayback) {
			console.log("passed conditional")
			this.playing = true;
			this.sound.play();
			setTimeout(this.cellPlayingFalse.bind(this),1000);
		}

	},



	this.playSoundAnimation = function(){
		 console.log("play sound animation");
		this.cellColor = this.cellClickedColor;
		this.display();
		 this.playSound();
		// setTimeout(this.updateColor.bind(this),300);
		// setTimeout(this.display.bind(this),300);
		setTimeout(this.resetCell.bind(this),300);
	}	


}