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
var $nav = $('.sec_nav');

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
    	var coupon_id = $this.data('coupon');
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
	 window.location.href = 'meilishuo://login.meilishuo';
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
		, r : fml.vars.r + ':area_tab=' + ($curTab.index() + 1)
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