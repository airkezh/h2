/*common*/
require('wap/zepto/fastclick');

var height = $(window).height();
if(height < 530){
	$('.jjl_msgAlert').css({
		width : '60%',
		left : '20%'
	})
};

var shareTmp = require('wap/component/shareTmp')
	, signWX = require('wx/sign')
	, shareWX = require('wx/share')
	, jjl = require('wap/page/lark/jjl');

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
	, shareBtn = $('.share')
	, gameWrap = $('.gameWrap')
	, result = $('.result')
	, tips = $('#tips')
	, getScore = $('#getScore')


/*  微信签名 */
signWX()

/*   微信浏览器分享   */
if (weixinBrowser != -1) {
	shareWX.bind({
		'desc':'玩游戏，拼眼力，免费门票拿到手软！南方草莓音乐节向你招手～',
		'imgUrl': 'http://d04.res.meilishuo.net/pic/_o/f8/a1/806866792b3622c4ba8375965124_640_640.cf.jpg',
		'title':'在这个看脸的星球我偏要拼实力！草莓音乐节门票是我的！',
		'link': 'http://' + fml.vars.mlsHost + '/activity/music/main/'
	});
}

function tipsFn(score) {
	if(0 <= score && score <= 30 ) {
		tips.html('亲，脑洞有点大哦～')
	} else if (30 < score && score <= 50) {
		tips.html('视力不佳手也残，还怎么抢门票～')
	} else if (50 < score && score <= 70) {
		tips.html('亲，你的速度只比广场舞大妈快一点哦')
	} else if (70 < score && score <= 120) {
		tips.html('亲～你是一匹黑马～门票就在你的眼前！')
	} else {
		tips.html('这么牛X！还有人敢和你竞争门票吗？！')
	}
}

function scoreFn(score){
	$('.score').html(score)
}

function endFn(score,time){
	// alert(score +" "+ time);
	clearInterval(countTimeInt);
	countTime = gameTime - 1;

	$('.begin_btn').show();;

	getScore.html(score)
	tipsFn(score)

	gameWrap.hide()
	result.show()

};

var gameTime  = 60 ;
var countTime = gameTime-1 , countTimeInt ;

function countTimeFn(){
	countTimeInt = setInterval(function() {
		countTime--;
		var progressW = (1-countTime/gameTime)*100+"%";
		$('.jjl_time_con span').html(countTime);
		$('.jjl_progress i').width(progressW);

		if(countTime < 1){
			clearInterval(countTimeInt);
			countTime = gameTime - 1;
		}
	}, 1000)
}


$('.begin_btn').removeClass('none')
	.on('tap', function(){
		$(this).hide();
		$('.basket').css({visibility: 'visible'});
		$('.jjl_msgAlert').addClass('none');
		countTimeFn();
		jjl.gameStart(gameTime,scoreFn,endFn);
	})

$('.again').on('click', function(){
	result.hide()
	gameWrap.show()
})

