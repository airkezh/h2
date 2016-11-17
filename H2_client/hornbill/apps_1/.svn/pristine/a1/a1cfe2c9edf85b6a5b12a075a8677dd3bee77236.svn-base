/*common*/	
require('wap/zepto/fastclick')
var signWX = require('wx/sign'), 
	shareWX = require('wx/share'),
	openApp = require('wap/app/openApp');
	var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger');
	var mlsApp = Meilishuo.config.os.mlsApp;
	var score = $('#scoreId').val();
	$('.score'+score).show();


	$('.share').on('click',function(){
		if(weixinBrowser != -1){
			$('.popwin').show();
		}else{
			$('.appshare').show();
		}
		return false;
	});
	$('.popwin').on('click',function(){
		$(this).hide();
	});

	$(document).click(function(e){
		var ele = $(e.target).closest('.appshare');
		if(!ele.length){
			$('.appshare').hide();
		}
	});

	$('.guang').on('click',function(){
		var urlLink = 'http://mapp.meilishuo.com/activity/tuan/hd/1872?hdtrc=tuan1872_daticeshi';
		mlsApp ? window.location.href = urlLink : openApp(urlLink);
	});

	var scoreDesc = '';
	var scoreTitle = '';
	if(score == 0){
		scoreDesc = '得零分也蛮不容易，地球不适合我，我回火星了...',
		scoreTitle = '6.1动画片测试得0蛋，不要质疑我的智商，不信你测测！';
	}else if(score == 10){
		scoreDesc = '我老了- - 我要去陪外孙看动漫补童年了...';
		scoreTitle = '6.1动画片测试得10分，这题到底谁出的，一般人都不行啊！';
	}else if(score == 20){
		scoreDesc = '噢肉！我的童年难道只有喜羊羊了...';
		scoreTitle = '6.1动画片测试得20分， 感觉不会再爱了，你来帮我挽尊啊？';
	}else if(score == 30){
		scoreDesc = '唉，动画片还没看齐就已经老了....';
		scoreTitle = '6.1动画片测试得30分，我先哭会儿，目测你测也会哭！';
	}else if(score == 40){
		scoreDesc = '没有电视与漫画，童年专攻数理化的少年就是我…';
		scoreTitle = '6.1动画片测试得40分，题目肯定有问题，不信你试下！';
	}else if(score == 50){
		scoreDesc = '工作再累，也不要让童年不及格喔~';
		scoreTitle = '6.1动画片测试得50分，10分都不给我，你测也许就及格了！';
	}else if(score == 60){
		scoreDesc = '也许童年少看点动漫就变成学霸了呢！';
		scoreTitle = '6.1动画片测试60分飘过，感人！别看，你测也比不过我！';
	}else if(score == 70){
		scoreDesc = '看这么多动漫，从小就注定是宅属性啊> <';
		scoreTitle = '6.1动画片测试测得心好累，70分太不容易了！来超越我！';
	}else if(score == 80){
		scoreDesc = '从小就阅片无数，长大必然为国争光啊！';
		scoreTitle = '6.1动画片测试得了80分！感觉棒棒哒，不服来战！';
	}else if(score == 90){
		scoreDesc = '童年能看这么多动漫，我要感谢我的麻麻・ω・';
		scoreTitle = '棒！6.1动画片测试90分，获小红花一枚，你快来拿红花！';
	}else if(score == 100){
		scoreDesc = '机智如我~人家是有满满回忆的幸福童年！';
		scoreTitle = '尼玛，6.1动画片测试我居然100分！有本事来挑战我！';
	}else{
		scoreDesc = '美丽说特别策划，10道题鉴定你是没童年还是美童年！';
		scoreTitle = '6.1儿童节测你看过多少经典动画片~有胆来玩！';
	}
	signWX();
	shareWX.bind({
		'desc':scoreDesc,
		'imgUrl':'http://d02.res.meilishuo.net/pic/_o/ea/af/a41d94fc94a4d64ac955b0f2b107_200_200.cf.jpg',
		'title': scoreTitle,
		'link': 'http://m.meilishuo.com/activity/market/children/'
	});