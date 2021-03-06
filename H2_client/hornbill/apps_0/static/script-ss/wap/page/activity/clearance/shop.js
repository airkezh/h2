/*common*/
require('wap/zepto')
require('wap/zepto/scroll')

var logTrack = require('wap/app/tracking')
var touchSlide = require('wap/app/touchSlide')
var shareTmp = require('wap/component/shareTmp')
var onscroll = require('wap/component/windowScroll')
var lazy = require('wap/component/lazzyLoad')
var Alert = require('wap/ui/alert')
var Waterfall = require('wap/component/g-waterfall')
window.timedown = require('wap/app/doota/timedown')
var $nav = $('.sec_nav');
var isMeilishuoApp = Meilishuo.config.os.mlsApp
var isWeixinBrowser = navigator.userAgent.indexOf( 'MicroMessenger' ) != -1

//倒计时
function end_down(mSelf){
	var d = 0
		, timeformat = $(mSelf).attr('etime').replace(/-/g,'/')
		, timeunix = (new Date(timeformat) - new Date())/1000;

	timedown.down(mSelf, timeunix, '0d-0h-0i-0s',['%v: ','%v: ','%v ','<b class="none_f">%v</b>']).onAction(function(t){
		if(t.d != undefined){ $(mSelf).find('.t_day').html(t.d<10 ? '0'+t.d : t.d);}
		if(t.h != undefined){ $(mSelf).find('.t_hour').html(t.h<10 ? '0'+t.h : t.h); }
		if(t.i != undefined){ $(mSelf).find('.t_minute').html(t.i<10 ? '0'+t.i : t.i);}
	}).onTimeOver(function(){
		$(mSelf).html('抢购已结束');
	}).correct();
}

function start_down(mSelf){
	var d = 0
		, timeformat = $(mSelf).attr('stime').replace(/-/g,'/')
		, timeunix = (new Date(timeformat) - new Date())/1000;
	timedown.down(mSelf, timeunix, '0d-0h-0i-0s',['%v: ','%v: ','%v ','<b class="none_f">%v</b>']).onAction(function(t){
		if(t.d != undefined){ $(mSelf).find('.t_day').html(t.d<10 ? '0'+t.d : t.d);}
		if(t.h != undefined){ $(mSelf).find('.t_hour').html(t.h<10 ? '0'+t.h : t.h); }
		if(t.i != undefined){ $(mSelf).find('.t_minute').html(t.i<10 ? '0'+t.i : t.i);}
	}).onTimeOver(function(){
		$(mSelf).data("flag", 1);
		end_down(mSelf);
	}).correct();
}

$('.js_timeStamp').each(function(){
	var self = this;
	if($(self).data('flag') == 1){
		end_down(self)
	} else {
		start_down(self)
	}
});

//弹窗
var alert = function (param){
	new Alert({
		'content': param,
		'onSure' : function(){
		}
	});
};

/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.bs_load_img'})
lazy_pic.scroll();
lazy_pic.load();

//优惠券
$('.coupon').on('click', 'li.can', function(){
	var $this = $(this);
    //跳至客户端登录
    checkLogin(function(){
    	var coupon_id = $this.attr('data-coupon');
    	var current = $this.find('.threshold').data('current');
		$.post('/aj/coupon/coupon_clearance',{'coupon_apply_code' : coupon_id },function(res){
			if(res.code) {
				if(res.code != -1){ alert(res.message); }
			}else{
				$this.removeClass('can').addClass('get');
				alert("申领成功");
			}
		},'json');
    });
});

function checkLogin(cb){
	if(fml.vars.isLogin == 0){
		window.MLS = {
		    didLogin: function() {
		        window.location.reload();
		    }
	 	};
		if(isMeilishuoApp){
			window.location.href = 'meilishuo://login.meilishuo';
		}else if(isWeixinBrowser){
		 	window.location.href = 'http://m.meilishuo.com/wx/connectCircle?goback=' + encodeURIComponent(window.location.href) ;	
		}else{
			window.location.href = 'http://m.meilishuo.com/user/login';
		}
		return false;
	}else{
		cb && cb();
	}
}

//数据加载
var $posterWrap = $('#posterWrap .goods')
	, $pullUp = $('.pullUp')
	, page = 2;

var addPoster = function (cbk, changeTab){
	var url = '/clearance/goodsList/'
		, $curTab = $('.tab_item.active');
	var data = {
		id : fml.vars.id
		, page : page
		, tab : $curTab.attr('status')
		, r : $curTab.data('r')
	}

	if( $curTab.index() == 2 ){
		// $curTab.attr('sort');
		data.psort = $curTab.attr('sort');
	}else if($curTab.index() == 3){
		data.dsort = $curTab.attr('sort');
	}
	
	if(page <= fml.vars.totalPage){
		$.get(url, data, function (res){
			if(res.error_code == 0){
				if(changeTab){
					$posterWrap.html(shareTmp('posterWall', res.data.data));	
				}else{
					$posterWrap.append(shareTmp('posterWall', res.data.data));
				}
				if(cbk){ cbk();} 
				lazy_pic.load();
				page++;
				if( page > fml.vars.totalPage){
					$pullUp.attr('status', 'stop');
				}
			}
		}, 'json')	
	}else{
		$pullUp.attr('status', 'stop');
	}
}

// tab change
$('.tab_item').on('click', function(){
	var $this = $(this);

	if( ($.inArray($this.index(), [2,3]) != -1) && $this.hasClass('active') ){
		$this.attr('sort', $this.attr('sort')==1 ? 2 : 1 );
	}else{
		$('.tab_item').eq(2).attr('sort', 1);
		$('.tab_item').eq(3).attr('sort', 1);
	}

	$this.addClass('active').siblings().removeClass('active');
	page = 1;
	$pullUp.attr('status', 'loading');
	$posterWrap.html('');
	wfIns.reset();
	wfIns.emit('requestDataStart');	
});

var wfIns = new Waterfall({firstRequest:0});
wfIns.on('requestDataStart',function(){
    addPoster(function(){
        wfIns.emit('requestDataEnd');
    });
});

//标签吸顶
function navFixed(){
	onscroll.yIn($nav.position().top + 10,function(){
		$nav.removeClass('scrollout').addClass('scrollin');
	},
	function(){
		$nav.removeClass('scrollin').addClass('scrollout');
	})
}
navFixed();

// 回顶部
var $gotop = $('.gotop')
$gotop.on("click", function() {
	$.scrollTo({
		endY: 0,
		duration: 1000
	})
})

function gotop(pos, isDown) {
	if (pos < 440) {
		$gotop.hide()
	} else {
		$gotop.show()
	}
}
onscroll.bind(gotop, 'gotop');