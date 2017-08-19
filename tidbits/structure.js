//structure: take all the first elements and put them in one container, etc.




var puzzle1 = { 
	sounds: [
	{
		title: "canvas suitcase zipper",
		clips: [
			{A1:"sounds/zippers/canvas-suitcase-zipper/cszipper1.ogg"},
			{A2:"sounds/zippers/canvas-suitcase-zipper/cszipper2.ogg"},
			{A3:"sounds/zippers/canvas-suitcase-zipper/cszipper3.ogg"},
			{A4:"sounds/zippers/canvas-suitcase-zipper/cszipper4.ogg"},
			{A5:"sounds/zippers/canvas-suitcase-zipper/cszipper5.ogg"}
		]
	},
	{
		title: "woodpeckers in a forest",
		clips: [
			{B1:"sounds/woodpeckers/woodpeckers1.ogg"},
			{B2:"sounds/woodpeckers/woodpeckers2.ogg"},
			{B3:"sounds/woodpeckers/woodpeckers3.ogg"},
			{B4:"sounds/woodpeckers/woodpeckers4.ogg"},
			{B5:"sounds/woodpeckers/woodpeckers5.ogg"},
		]
	},
	{
		title: "eerie space tone",
		clips: [
			{C1:"sounds/eerieSpace/eerieSpace1.ogg"},
			{C2:"sounds/eerieSpace/eerieSpace2.ogg"},
			{C3:"sounds/eerieSpace/eerieSpace3.ogg"},
			{C4:"sounds/eerieSpace/eerieSpace4.ogg"},
			{C5:"sounds/eerieSpace/eerieSpace5.ogg"},
		]
	},
	{
		title: "giant hummingbird flapping wings -- cartoon",
		clips: [
			{D1:"sounds/hummingbird/hummingbird1.ogg"},
			{D2:"sounds/hummingbird/hummingbird2.ogg"},
			{D3:"sounds/hummingbird/hummingbird3.ogg"},
			{D4:"sounds/hummingbird/hummingbird4.ogg"},
			{D5:"sounds/hummingbird/hummingbird5.ogg"},
		]
	},
	{
		title: "high fairy sound design",
		clips: [
			{E1:"sounds/highFairy/highFairy1.ogg"},
			{E2:"sounds/highFairy/highFairy2.ogg"},
			{E3:"sounds/highFairy/highFairy3.ogg"},
			{E4:"sounds/highFairy/highFairy4.ogg"},
			{E5:"sounds/highFairy/highFairy5.ogg"},
		]
	}	
]};


// var container1sounds = puzzle1.sounds.filter(function(sound,i,sounds){
// 	return sounds[i].clips.indexOf(sound) === 0
// })

var container1sounds=[];
var container2sounds=[]; 
var container3sounds=[];
var container4sounds=[]; 
var container5sounds=[];


 puzzle1.sounds.forEach(function(sound){
	 container1sounds.push(sound.clips[0]);
	 container2sounds.push(sound.clips[1]);
	 container3sounds.push(sound.clips[2]);
	 container4sounds.push(sound.clips[3]);
	 container5sounds.push(sound.clips[4]);
})


console.log(container5sounds);