/*common*/
var $ = require('wap/zepto');

// dom缓存
var $box = $('#box')
	,$arrSpan = $('.num span');

// 随机给炸弹填入数字
function random(arr){
	return arr.sort(function(){
		return (0.5 - Math.random());
	});
}

var randomArr = random([1,2,3,4,5,6,7]);
var orderNum = [];//二维数组，分别存储炸弹中的数字和数字的相应位置

//存储过程
for(var i=0; i<$arrSpan.length; i++){
	$arrSpan.eq(i).html(randomArr[i]);
	orderNum.push([randomArr[i],i]);
}
// console.log(orderNum.sort());

var pitArr = [];
$box.on('touchend','li', function(){
	// pitArr.push($(this).index());
	// $(this).hide('slow');
	// console.log(pitArr);
	console.log(orderNum.sort());
});