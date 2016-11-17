/*common*/
var $ = require('wap/zepto')
	, openApp = require('wap/app/openApp')
	, shareWX = require('wx/share');

/* wweixinshare */
var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger') != -1;
if (weixinBrowser) {
	shareWX.bind({
		'title': '上海草莓音乐节门票免费送！速来',
		'desc': '美丽说带你嗨翻天，草莓音乐节门票免费送啦，小伙伴快来领→',
		'imgUrl': 'http://d04.res.meilishuo.net/img/_o/70/60/e8d1171dc8adaa5f26447c2b8bf7_200_200.ch.jpg',
		'link': 'http://mapp.meilishuo.com/activity/music/music/'
	});
}

$('.goApp').on('click',function(){
	openApp('meilishuo://open.meilishuo')
})
/* 禁止页面活动 */
// var screenHeight = $(window).height();
// $('.main').height(screenHeight);

// $('body').on('touchmove',function (e){
// 	e = e || window.event;
// 	e.preventDefault();
// 	e.stopPropagation();	
// });

/* 问答题 */
var aChange = $('.change');
$(aChange[1]).hide();
$(aChange[2]).hide();
$(aChange[0]).on('click',function(){
	$(this).hide();
	$(aChange[1]).show();
});
$(aChange[1]).on('click',function(){
	$(this).hide();
	$(aChange[2]).show();
});

/* 选项卡 */
$("div.tab_menu ul li").click(function(){
	$(this).addClass('selected')
	.siblings().removeClass('selected');

	var index = $("div.tab_menu ul li").index(this);
	
	$("div.tab_box > div").eq(index).show()
	.siblings().hide();
});

$('.share-button').on('click',function(){
	$('.popwin').css('visibility','visible');
});
$('.know').on('click',function(){
	$('.popwin').css('visibility','hidden');
});

/* 城市对应时间 */
// $('.city').on('change',function(){
// 	if($('.city').val() != "上海"){
// 		$('.detail-data').html('敬请期待')
// 		.attr('selected','selected')
// 		.parent().attr('disabled','disabled');
// 	}else{
// 		$('.detail-data').html('5月1日')
// 		.attr('selected','selected')
// 		.parent().removeAttr('disabled');
// 	}
// });
$('.city').on('change',function(){
	if($('.city').val() != "上海"){
		for(var i=0;i<3;i++){
			$('.select-data').children().eq(i).html('敬请期待');
		}
		$('.select-data').attr('disabled','disabled');
	}else{
		for(var i=0;i<3;i++){
			$('.select-data').children().eq(i).html('5月'+(i+1)+'日');
		}
		$('.select-data').removeAttr('disabled');
	}
});


/* 倒计时 */
var downCount = new Date();
$('.data-num').children().html(31-(downCount.getDate()));
