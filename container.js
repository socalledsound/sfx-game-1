var Container = function(x,y,width,height,meridian,color,numCells,sounds) {
	this._x = x;
	this._y = y;
	this._width = width;
	this._height = height;
	this.meridian = meridian;
	this._color = color;
	this.numCells = numCells;
	this.draggable = false;
	this.cells=[];
	this.cellColor = [2,12,51];
	this.interfaceColor = [200,200,200];
	this.currentColumn = 0;
	this.sounds = sounds;
	this.upperTriangles;
	this.lowerTriangles;
	this.meridianKey = "Z";
	this.containerSolved = false;

	// this.scrambledKeys = ["A","A","A","A"];
	// this.sound = new Howl({src:['audio/2017clapOS-DG3__1.mp3']});

	this.initCells = function() {
				 this.initKeys = Object.keys(this.sounds);
				// this.scrambledKeys = this.initKeys.sort(function(){return Math.random() * 2 -1;});
				// console.log(this.sounds);
				//  console.log(this.scrambledKeys);
				// console.log(this.scrambledKeys[0].charAt(0));

			var scrambledOrder = this.initKeys.sort(function(){return Math.random() * 2 -1;});
			
			// console.log(scrambledOrder);
			

			for ( var i=0; i<this.numCells; i++) {
				var x= this._x + (this._width/20);
				var y= this._y + ((this._height/this.numCells)*i);
				var width = this._width * 1.0;
				var height = this._height/this.numCells;
				
				
				// this.scrambledSounds=this.scrambleSounds(this.sounds,keys);
				// var cellSounds = this.sounds;
				var cellSound = this.sounds[scrambledOrder[i]];
				// var cellKey = this.scrambledKeys[i].charAt(0);
				 // console.log(cellSound);
				// var sound = new Howl({src:[this.sound] });
				this.cells[i] = new Cell(x, y, width, height, this.cellColor, cellSound);
				 // console.log(this.cells[i]);
			}
	},

	this.checkMeridian = function() {
		// var that = this;
		// console.log(this.meridian);
		this.cells.forEach(function(cell,index){
				// console.log(this.meridian);
				// console.log(cell.y);
			if((cell.y > (this.meridian-50)) && (cell.y < (this.meridian+40)) && !cell.playing) {
				// cell.cellColor = [200,0,0];
				cell.markAsMeridian();
				// console.log(cell.key);
				// console.log(this);
				this.meridianKey = cell.key;
				// console.log(this.meridianKey);
				// return this.meridianKey
				// return true
				// cell.playing = true;
				//   cell.sound.play();
				// setTimeout(cell.cellPlayingFalse.bind(cell),1000);
				// this.meridianKey =  this.scrambledKeys[0].charAt(0);
			}
			else {
				cell.onMeridian =false;
				cell.resetCell();
				
				// return false
			}
			// console.log(this.meridianKey);
			 
		}, this)	
		return this.meridianKey
		

	},

	this.checkSolution = function(key) {
 //console.log(key);
		this.cells.forEach(function(cell,index){

			if(cell.key === key && cell.onMeridian) {

				cell.markAsSolved();
				 
				 this.containerSolved = true;
				 // console.log(this);
				 // console.log(this.containerSolved);
			}
			else if (cell.key === key && !cell.onMeridian){
				this.containerSolved = false;
			}
			else
				{
				 // console.log(cell.key);
				 // console.log(key);
				 cell.resetCell();
				 // this.containerSolved = false;
				 // console.log(this.containerSolved);
			}
			
			// console.log(cell.solved);

		}, this)


	if(this.cells.indexOf(
		function(cell){
			cell.solved
		}) != -1) {
		console.log("whew")
		};


		 // if(this.cells.includes(function(cell) {
		 // 	cell.solved=true;
		 // }) ) 
		 // 	{
		 // 		this.containerSolved = true; 
		 // 	}	
		 // 	else {
		 // 		this.containerSolved = false;
		 // 	}
	
		 // console.log("inside func outside foreach" + this.containerSolved);

	},




	this.scrambleSounds = function(sounds,keys) {
		
			var scrambled  = sounds;

			return scrambled;
		
	},

	this.initContainerTriangles = function() {
			this.initUpperTriangles();
			this.initLowerTriangles();
			
	},


	this.initUpperTriangles = function() {
			
				var a = this._x + 20;
				var b = this._y - 20;
				var c = this._x + 50;
				var d = this._y - 40;
				var e = this._x + 80;
				var f = this._y  -20;
				var fill = this.interfaceColor;
				var stroke = this.interfaceColor;	

				this.upperTriangles =  new Triangle(a,b,c,d,e,f,fill,stroke);
				// console.log(this.upperTriangles.a);


			
	},

		this.initLowerTriangles = function() {
			
				var a = this._x + 20;
				var b = this._y + this._height+40;
				var c = this._x + 50;
				var d = this._y + this._height+40+20;
				var e = this._x + 80;
				var f = this._y + this._height+40;
				var fill = this.interfaceColor;
				var stroke = this.interfaceColor;	

				this.lowerTriangles =  new Triangle(a,b,c,d,e,f,fill,stroke);
				 // console.log(this.lowerTriangles.b);			
	},






		this.checkCellsForClick = function(){
		var that = this;
			this.cells.forEach(function(cell,index){
				cell.checkClick();
			})

	},


	this.display = function() {
		// var that = this;
		// fill(this._color);
		// rect(this._x, this._y, this._width, this._height);
	// console.log(this.cells);
			fill(this.interfaceColor);
			stroke(this.interfaceColor);
			triangle(this.upperTriangles.a,this.upperTriangles.b,this.upperTriangles.c,this.upperTriangles.d,this.upperTriangles.e,this.upperTriangles.f);
			triangle(this.lowerTriangles.a,this.lowerTriangles.b,this.lowerTriangles.c,this.lowerTriangles.d,this.lowerTriangles.e,this.lowerTriangles.f);


			this.cells.forEach(function(cell,index){
				// console.log(cell.cellColor);
				// console.log(index);
				fill(cell.cellColor);
				strokeWeight(0.5);
				// console.log(cell.x);
				// console.log(cell.cellColor);
				// rect(that._x+(that._width/20), (that._y)+((that._height/that.numCells)*index), that._width*0.9, that._height*.25);
				rect(cell.x-5,cell.y,cell.width,cell.height);
				//rect(250,100,90,80);
			}) 
			
		

	},

	this.checkClick = function() {
		if(this.checkRect(mouseX, mouseY,this._x,this._y,this._width,this._height)) {
				this.draggable = true;
				 console.log(this.draggable);
		}
	},


	
	this.checkRect = function() {
		
		return (mouseX > this._x && mouseX < this._x + this._width && mouseY > this._y && mouseY < this._y + this._height)		
	},

	this.updateClick = function() {
		var that = this;
		that.cells.forEach(function(cell,index){
			if(cell.clicked && !cell.playing) {
				// console.log(cell.sound);
			 	cell.sound.play();
				cell.playing= true;
			}
			else {
				cell.sound.stop();
				cell.playing = false;
				cell.clicked = false;
			}
			fill(cell.cellColor);
			strokeWeight(0.5);
			rect(cell.x-5,cell.y,cell.width,cell.height);

		})
	},



	this.unClick = function() {
		this.draggable = false;
	},

	this.moveCells = function() {
		var that = this;
			// console.log(this._y);
			// console.log(that._y);
			that.cells.forEach(function(cell,index){
				// console.log(index);
				cell.x= that._x + (that._width/20);
				cell.y = that._y + ((that._height/that.numCells)*index);
				cell.width = that._width * 1.0;
				cell.height = that._height/that.numCells;
				 // console.log(cell.y);
				})
	},

	this.moveTriangles = function() {
		this.upperTriangles.a = this._x + 20;
		this.upperTriangles.b = this._y - 20;
		this.upperTriangles.c = this._x + 50;
		this.upperTriangles.d = this._y - 40;
		this.upperTriangles.e =  this._x + 80;
		this.upperTriangles.f =  this._y  -20;

		this.lowerTriangles.a = this._x + 20;
		this.lowerTriangles.b = this._y + this._height+40;
		this.lowerTriangles.c = this._x + 50;
		this.lowerTriangles.d = this._y + this._height+40+20;
		this.lowerTriangles.e = this._x + 80;
		this.lowerTriangles.f = this._y + this._height+40;


	},

	this.move = function() {
		// console.log(mouseY);
		if(this._y > 0 && this._y < (1000 - this._height)) {
		this._y = mouseY;
		this.moveCells();
		};

		if (this._y < 40) {this._y=40};

		if (this._y > (360)) {this._y = (360 )};
		this.settleInGrid();
		
	},

	this.settleInGrid = function() {
		// if(this._y > 0 && this._y < 90 ) 	{this._y = 20};
		// if(this._y > 90 && this._y <180 ) 	{this._y = 100};
		// if(this._y > 180 && this._y <270 ) 	{this._y = 180};
		// if(this._y > 270 && this._y <360 ) 	{this._y = 260};

		if(this._y > 0 && this._y < 120 ) 	{this._y = 40};
		if(this._y > 110 && this._y <200 ) 	{this._y = 120};
		if(this._y > 200 && this._y <280 ) 	{this._y = 200};
		if(this._y > 280 && this._y <360 ) 	{this._y = 280};
		if(this._y > 360 && this._y <440 ) 	{this._y = 360};

	},

	this.settleCellsInGrid = function() {
		this.cells.forEach(function(cell,index){
			if(cell.y > 0 && cell.y < 90 ) 	{cell.y = 20};
			if(cell.y > 90 && cell.y <180 ) 	{cell.y = 100};
			if(cell.y > 180 && cell.y <270 ) 	{cell.y = 180};
			if(cell.y > 270 && cell.y <360 ) 	{cell.y = 260};
		})
	},

	this.checkPlayhead = function(x) {
		var currentColumn;
		// if (x <40) { currentColumn = 5};
		// if (x > 30 && x < 145) {currentColumn = 0};
		// if (x >140 && x < 245) {currentColumn = 1};
		// if (x >240 && x < 365) {currentColumn = 2};
		// if (x >360 && x < 450) {currentColumn = 3};
		// if (x >450 && x < 555) {currentColumn = 4};
		// if (x >530) {currentColumn = 5};
		 // console.log(currentColumn);
		if (x <140) { currentColumn = 5};
		if (x > 130 && x < 245) {currentColumn = 0};
		if (x >240 && x < 345) {currentColumn = 1};
		if (x >340 && x < 465) {currentColumn = 2};
		if (x >460 && x < 550) {currentColumn = 3};
		if (x >550 && x < 655) {currentColumn = 4};
		if (x >630) {currentColumn = 5};


		return currentColumn;
		
	},

	this.startColor = function() {

		this.cells.forEach(function(cell,index){
		// this.checkRedLine();	
		cell.cellColor = [2,12,51];
		cell.sound.stop();
		});
	}



	// this.highlight = function() {

	// 	this.cells.forEach(function(cell,index){
	// 	// this.checkRedLine();	
	// 	cell.cellColor = [23,225,239];
	// 	});
	// },

	// this.resetColor = function() {


	// },


	// this.makeRed = function() {

	// 	this.cells.forEach(function(cell,index){
	// 	// this.checkRedLine();	
	// 	cell.cellColor = [200,0,0];
	// 	});
	// },

	// this.makeWhite = function() {

	// 	this.cells.forEach(function(cell,index){
	// 	// this.checkRedLine();	
	// 	cell.cellColor = [200,200,200];
	// 	});
	// },

	// checkRedLine = function() {
	// 	this.cells.forEach(function(cell,index){
	// 		if (this.cell) {

	// 		}
	// 	})	
	// }


}

