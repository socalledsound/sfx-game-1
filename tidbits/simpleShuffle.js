
const someArray = [1, 2, 3, 4, 5];

someArray.sort(() => Math.random() * 2 - 1);


someArray.sort(function(){
	return Math.random() * 2 - 1
})