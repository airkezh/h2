/*common*/
var $ = require('wap/zepto');

var $btn = $('.btn')
	,$ground = $('.ground li')
    ,$gro = $('.ground')
    ,time = $('.time').text()
    ,total = 0
    ,isClicked = false
	,i
	,timer
	,m

$btn.on('tap','.start',function(){
	if(!isClicked){
		$('.start').css('background','#fdbd12').text('已开始')
		isClicked = true
		game()
		timer = setInterval(function(){
			$('.time').html(time --) 
			// console.log($('.time').html() + '****' + time)
			if(time < 0){
				clearInterval(timer);
				$ground.removeClass('on')
				$('.start').css('background','#fdbd12').text('已结束')
				alert('时间到，游戏停止\n恭喜你，一共打倒'+ total + '只小地鼠')
			}
		},1000)	
	}
})
$btn.on('tap','.again',function(){
	window.location.reload();
})
function game(){
	// clearInterval(timer);
	m = Math.floor(Math.random()*9)
	$ground.eq(m).addClass('on')
	// if($ground.hasClass('on')){
		$gro.on('tap','.on', function(){
			$ground.eq(m).removeClass('on')
			i = Math.floor(Math.random()*9)
			if ( i == m ) {
				if ( i > 1 ) {
					i -= 1
				} else {
					i += 1 
				}
			}
			$ground.eq(i).addClass('on')
			m = i
			total++
			// console.log('####' + total)
		})
	// }
}
	