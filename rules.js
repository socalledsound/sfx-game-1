var Rules = function(x,y,width,height,bgColor,textColor) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.rulesBGcolor = bgColor;
	this.textColor = textColor;
	this.rule1 = "Click on any box to hear a sound";
	this.rule2 = "Move boxes vertically by";
	this.rule3 = "clicking and dragging";
	this.rule4 = "Line up five similar sounds along"; 
	this.rule5 = "the middle band to find out what";
	this.rule6 = "that sound is called";
	this.rule7 = "'Solve' all five sounds to go";
	this.rule8 = "to the next level";
	this.rule9 = "(more levels coming soon)";
	this.fontSize = 25;




	this.initRules = function() {
		fill(this.rulesBGcolor);
		rect(this.x, this.y, this.height,this.width);
		textSize(this.fontSize);
		textFont('Sans');
		fill(this.textColor);

		text(this.rule1,this.x+20,this.y+20,this.width,this.height);

		text(this.rule2,this.x+20,this.y+80,this.width,this.height);
		text(this.rule3,this.x+20,this.y+110,this.width,this.height);

		text(this.rule4,this.x+20,this.y+170,this.width,this.height);
		text(this.rule5,this.x+20,this.y+200,this.width,this.height);
		text(this.rule6,this.x+20,this.y+230,this.width,this.height);

		text(this.rule7,this.x+20,this.y+300,this.width,this.height);
		text(this.rule8,this.x+20,this.y+330,this.width,this.height);

		text(this.rule9,this.x+20,this.y+360,this.width,this.height);

		
	}



	this.rulesCloseText_x = function() {

	}


	this.hideRules = function() {

	}


}

