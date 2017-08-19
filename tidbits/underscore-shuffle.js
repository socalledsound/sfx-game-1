var _ = require("underscore");

var arr = [1,2,3,4,5,6];
// Testing _.shuffle
var testShuffle = function () {
  var indexOne = 0;
    var stObj = {
      '0': 0,
      '1': 1,
      '2': 2,
      '3': 3,
      '4': 4,
      '5': 5
    };
    for (var i = 0; i < 1000; i++) {
      arr = _.shuffle(arr);
      indexOne = _.indexOf(arr, 1);
      stObj[indexOne] ++;
    }
    console.log(stObj);
};
testShuffle();





