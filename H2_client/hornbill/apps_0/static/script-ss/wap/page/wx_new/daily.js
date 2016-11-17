/*common*/
window.$                  = require( 'wap/zepto');
var waterFall             = require( 'circle/component/waterfall' );
var biWaterFallPlugin     = require( 'circle/component/biWaterfallPlugin' );
var waterFallReflowPlugin = require( 'circle/component/waterfallReflowPlugin' );
var waterfallDataUniquePlugin = require( 'circle/component/waterfallDataUniquePlugin' );
var optimiseFn            = require( 'circle/component/waterfallOptimise');
var lazy                  = require( 'm/component/lazyLoad' );
var tracking              = require( 'wap/app/tracking');
var Alert                 = require( 'wap/ui/alert');

var lazyLoad = lazy.init({xpath:'.pic_load'})
/* 预先绑定懒加载事件 */
lazyLoad.scroll()

var waterFallInstance = waterFall.init({
	el: '.goods_wall',
	url: '/aj/wx_new/daily_list',
	dataName: 'tInfo', //默认
	colNum: 2,
	colGap : '10 8',
	hasSideGap : true,
	isAutoUpdateURL : false, //专为微信分享url定制（有分享设置）
	uniquekey: 'twitter_id,n_pic_file',
	plugins: [ biWaterFallPlugin, waterFallReflowPlugin , waterfallDataUniquePlugin],
	// onFetchStart: function(wf){
	// 	// wf.data.offset = wf.data.frame*10;
	// },
	onFetchSuccess: function(data){
		if(data.length === 0){
			$('.pullUp').attr('status','stop');
		}
	},
	onFetchFinished: function(data){
		lazyLoad.load()
		// hide_loading();
	},
	optimiseFn: optimiseFn
})

// console.log( waterFallInstance )
//专为微信分享url定制 global
//waterFallInstance.updateParam( 'isAutoUpdateURL' , true);

$( window ).on('wx-sign-over', function(event) {
	waterFallInstance.updateParam( 'isAutoUpdateURL' , true);
});

/* 跑男活动 微信钱包指示信息层 */
if(fml.vars.wxGuide){
	var cookie = require('component/iStorage');
	if(!cookie.getCookie('wx_guide')){
		cookie.setCookie('wx_guide','1',{ "duration" : 365*24*3600} ); //过期时间：秒
	}
	runLayer();
}
function runLayer(){
	var $layer = $('body').children('.runlayer');
	$('html,body').css({
		'height': '100%',
		'overflow': 'hidden'
	});
	$layer.on('click', function() {
		$('html,body').css({
		'height': 'auto',
		'overflow': 'auto'
		});
		$(this).hide();
	});
}

// alert(2)

function alertCon(msg){
	new Alert({
		content : msg
	})
}

window.onload =  function(){
	tracking.cr('wx/onload');
}

/* 穿衣助手 */
$(".test_close").on("click",function(){
	$(".clothes_report").hide();
});

//突出大促以及节庆氛围需求--领券逻辑
$('.list-box').on('click', '.pro-coupon', function(event) {
	var code = $(this).data('code');
	$.post('/aj/wx_new/wx818', { 'code' : code }, function(res) {
		// console.log(res)
		alertCon(res.msg);
	},'json');
});


/* 砸蛋逻辑 */

/*var $egg = $('#egg')
	,mark = true
$egg.find('.egg').click(function(event) {
	if(mark){
		mark = false
		$.post('/aj/wx_new/hit_egg', function(data){
			if (data && data.ret == 0) {
				tracking.cr('wx/receive_coupon', {'action' : 'click', 'result' : 'success','name':'320大促'});
				$egg.find('.egg').hide();
				$egg.find('.egg-open').show();
				setTimeout(function(){
					alertCon('恭喜您获得10元优惠券，马上可以使用哦！');
					$egg.find('.egg-open').hide();
				},500);
			}else{
				tracking.cr('wx/receive_coupon', {'action' : 'click', 'result' : 'fail','name':'320大促'});
				alertCon(data.msg);
			}
			mark = true
		}, 'json')
	}
});*/