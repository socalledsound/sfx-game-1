			if(cell.clicked && !cell.playing) {
				// console.log(cell.sound);
			 	cell.sound.play();
				cell.playing= true;
			}
			else {
				cell.sound.stop();
				cell.playing = false;
				// cell.clicked = false;
			}