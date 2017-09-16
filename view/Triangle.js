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
		},

		this.move = function() {

		},

		this.moveBy_y = function(amount) {
			this.b = this.b + amount;
			this.d = this.d + amount;
			this.f = this.f + amount;

		}		
				// stroke(this.strokeColor);
				// strokeWeight(3);
				// fill(this.fillColor);
				// triangle(this.a,this.b,this.c,this.d,this.e,this.f);

};