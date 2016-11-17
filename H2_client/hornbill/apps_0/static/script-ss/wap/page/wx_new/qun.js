/*common*/
var 
	// ,lazyLoad = require('m/component/lazyLoad'),poster = require('m/app/posterPa')
	tracking = require('wap/app/tracking')
	,Alert = require('wap/ui/alert')

var WaterFall = require('circle/component/biWaterfallPlugin');

fml.vars.sid = {};
var ajurl  = fml.vars.dr_id ? '/aj/wx_new/dr_list?tag_id=' + fml.vars.dr_id : '/aj/wx_new/qun_waterfall';
var waterFallInstance = WaterFall.init({
	el: '.goods_wall',
	url: ajurl,
	dataName: 'tInfo', //默认
	colNum: 1,
	colGap : 0,
	dataFilter: function(data){
		var arr = [];
		if (data['tInfo'] && data['tInfo'].length) {
			data['tInfo'].forEach(function(v,i){
				if(v['shop_info'] && !fml.vars.sid[v['shop_info']['shop_id']]){
					fml.vars.sid[v['shop_info']['shop_id']] = 1;
					arr.push(v);
				}else if(!v['shop_info']){
					arr.push(v);
				}
			});
			data['tInfo'] = arr;
		};
		return data['tInfo']
	},
	onFetchSuccess: function(data){
		if(data.length === 0){
			$('.pullUp').attr('status','stop');
			this.lock();
		}
	}
}).start()

/* 兼容中部场馆页面滑动穿透 */
var newURL, isJump
$( 'body' ).on( 'touchstart', '.js-anchor, .list_img', function() {
    isJump = true
    newURL = $( this ).data( 'href' ) || $( this ).attr('href')
}).on( 'touchmove', function() {
    isJump = false
}).on( 'touchend', function( e ) {
   if ( isJump ) {
        e.preventDefault()
        e.stopPropagation()
        location.assign( newURL )
   } else {
       isJump = false
   }
})

window.onload =  function(){
	tracking.cr('wx/onload');
}

$('body').on('click', '.follow-btn', function(){
	var _this = $(this),
		shop_id = $(this).data('sid');

	tracking.cr('wx/wx_follow', {'action' : 'follow', 'frm' : (fml.vars.dr_id ? 'classify' : 'main'),'follow_user' : shop_id});

	$.get('/aj/shop/follow', {'shop_id' : shop_id}, function(res){
		res = JSON.parse(res);
		if(res.code == 0){
			_this.html('已关注').removeClass('follow-btn').addClass('follow-btn-ok');
		}
	});
});


/* 弹窗 */
var alertCon = function(msg){
	var a = new Alert({
		content : msg
	});
}

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