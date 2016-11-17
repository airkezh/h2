/*common*/
var $ = require('wap/zepto');

//dom缓存
var $select = $('#select')
	,$show = $('#show')
	,$time = $('#time')
	,$score = $('#score')
	,$mask = $('#mask')
	
var selectArr = ['黄','绿','红','黑','蓝'];
var color = ['yellow','red','green','black','blue'];
var spanArr = $('#select span');

var matchCol = '';
var score = 0;
var bFlag = false;
	
//打乱颜色和字体
function random(arr){
	arr.sort(function(){
		return Math.floor(Math.random() * arr.length);
	});
}
//已知show中的字颜色，找到相应的文字
function match(showCls){
	switch(showCls)
	{
		case 'yellow':
			matchCol = '黄';
			break;
		case 'red':
			matchCol = '红';
			break;
		case 'green':
			matchCol = '绿';
			break;
		case 'black':
			matchCol = '黑';
			break;
		case 'blue':
			matchCol = '蓝';
			break;
		default:
			break;
	}
}
//设倒计时
function countDown(countTime){
	var timer = setInterval(function(){
		$time.html(countTime--);
		$score.html(score);
		if(countTime < 0){
			clearInterval(timer);
			$select[0].ontouchend = null;
			$score.html(score);
			alert("时间到,您的成绩是"+score);
			$mask.show();
		}
	},10);
}

random(color);
random(selectArr);

$show.html(selectArr[Math.floor(Math.random() * selectArr.length)]).removeClass().addClass(color[1]);

for(var i=0; i<spanArr.length; i++){
	$(spanArr).eq(i).html(selectArr[i]).removeClass().addClass(color[i]);
}
$select.on('touchend', function(e){
	var target = e.target;
	random(color);
	random(selectArr);
	match($show.attr('class'));
	if($(target).html() == matchCol){
		if(bFlag == false){
			countDown(500);
		}
		score++;
		bFlag = true;
		$show.html(selectArr[Math.floor(Math.random() * selectArr.length)]).removeClass().addClass(color[1]);

		for(var i=0; i<spanArr.length; i++){
			$(spanArr).eq(i).html(selectArr[i]).removeClass().addClass(color[i]);
		}
	}
	
});
$('#mask').on('touchend','#restart', function(){
	score = 0;
	$mask.hide();
	$score.html(0);
	$time.html(500);
	bFlag = false;
});