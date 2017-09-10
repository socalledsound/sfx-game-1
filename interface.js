var Interface = function() {
	this.playButton;
	this.playButtonClicked = false;
	this.playButtonPaused = true;
	

	this.initPlayButton = function() {
			console.log(height);
			this.playButton = new PlayButton( 360,700,80 ,80 );

	},

	// this.displayInterface = function() {

	// 			strokeWeight(1);
	// 		stroke(interfaceStrokeColor);
	// 		fill(background_color);
	// 		rect(this.playButton.x,this.playButton.y,this.playButton.width,this.playButton.height);
	// 		fill(255);
	// 		triangle(this.playButton.x+30,this.playButton.y+20,this.playButton.x+30,this.playButton.y+60,this.playButton.x+60,this.playButton.y+40);


	// },

	this.checkPlayButton = function() {
				if(checkRect(mouseX, mouseY,this.playButton.x,this.playButton.y,this.playButton.width,this.playButton.height)) {
				this.playButtonClicked = true;
				 console.log(this.playButtonClicked);
		}
	}



};



var PlayButton = function(x,y,width,height) {
	this.x 			= 	x;
	this.y 			= 	y;
	this.width 		=	width;
	this.height 	= 	height;
	this.paused 	= 	true;
}

var Triangle = function(a,b,c,d,e,f,fillColor,strokeColor,type) {
			this.a = a;
			this.b = b;
			this.c = c;
			this.d = d;
			this.e = e;
			this.f = f;
			this.fillColor=fillColor;
			this.strokeColor = strokeColor;
			this.type = type;

		this.display = function() {
			fill(this.fillColor);
			stroke(this.strokeColor);
			strokeWeight(3);
			triangle(this.a,this.b,this.c,this.d,this.e,this.f);
			triangle(this.a,this.b,this.c,this.d,this.e,this.f);
			// console.log(this.type);
			// stroke(this.interfaceStrokeColor);
		}		
				// stroke(this.strokeColor);
				// strokeWeight(3);
				// fill(this.fillColor);
				// triangle(this.a,this.b,this.c,this.d,this.e,this.f);

};

var CellRow = function(options) {
	this._x = options.x;
	this._y = options.y;
	this._containerWidth = options.width;
	this._containerHeight = options.height;
	this._color = options.color;
	this._numSquares = options.numSquares;



	this.display = function() {
		
		for (var i=0; i <this._numSquares; i++) {
			fill(this._color);
			rect(this._x+10, (this._y)*(i+1)-(20*i), this._containerWidth, this._containerHeight);


		}
		

	},

		this.move = function() {
		console.log(mouseY);
		this._startY = mouseY;
	}



}


