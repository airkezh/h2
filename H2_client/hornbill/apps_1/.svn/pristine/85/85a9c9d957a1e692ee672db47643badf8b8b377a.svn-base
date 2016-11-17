/*common*/
var shareTmp = require('wap/component/shareTmp'),
	urlHandle = require('wap/component/urlHandle'),
	Alert = require('wap/ui/alert'),
	scroll = require('wap/component/windowScroll'),
	Waterfall = require('wap/component/g-waterfall');
	
var query = urlHandle.getParams(location.href);

// window.alert(123);

//折叠部分代码
$('.goods_wall').on('click','.more',function(){

	var $img = $(this).closest('.shop').find('.dis').show().find('.img-wrapper img');
	
	$img.each(function(){
		$(this).attr('src',$(this).data('src'));
	});

	$(this).remove();
});

var $pullUp = $('.pullUp');
// 瀑布流
var total = 0, 
	pageNum = 2;

var requestData = function(next){
	if(pageNum <= fml.vars.total){
		 $.get('/aj/clearance/poster',{frame:pageNum},function(ret){
	    	if(!ret.err_code){
				$('.goods_wall').append(shareTmp('posterWall', ret));
				console.log( ret );
				next();

				pageNum ++;
				total ++;
				if( total >= fml.vars.total - 1){
					$pullUp.attr('status', 'stop');
				}
	    	}
		},'json');
	}
	
};

var wfIns = new Waterfall({firstRequest:0});
wfIns.on('requestDataStart',function(){
    requestData(function(){
        wfIns.emit('requestDataEnd');
    });
});

//弹窗
var alert = function (param){
	new Alert({
		'content': param,
		'onSure' : function(){
		}
	});
};

//弹幕
var toasts = fml.vars.toast.data || [];

function randomTime(index){
	if(index == 0){
		return Math.ceil(Math.random() * 15 + 15) * 1000;
	}else if(index > 0){
		return Math.ceil(Math.random() * 20 + 30) * 1000;
	}
}

var index = 0;
function run(){

	var time = randomTime(index) || 50000;
	var hideTime = 5000;

	var $toast = $('.toast');
	if(index >= toasts.length){
		index = 0;
	}

	setTimeout(function(){
		var toast = toasts[index];
		$toast.animate({display:"block"})
			  .find('img')
			  .attr('src', toast.activtor)
			  .next('span')
			  .text(toast.toast);

		setTimeout(function(){
			$toast.hide();

			index ++;

			run();

		},hideTime);

	},time);
}

run();

//优惠券
$('.goods_wall').on('click','.coupon li',function(){
	var $this = $(this);
    //跳至客户端登录
    checkLogin(function(){
    	var coupon_id = $this.find('.threshold').data('coupon');
    	var current = $this.find('.threshold').data('current');
		$.post('/aj/coupon/coupon_clearance',{'coupon_apply_code' : coupon_id, 'current' : current},function(res){
			if (res.code) {
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
	 // window.location.href = "meilishuo://login.meilishuo/";
	 window.location.href = 'meilishuo://login.meilishuo';
	}else{

		cb && cb();
	}

	
}


//回到顶部
var $goTop = $('.gotop');

$goTop.on("click", function() {
	$("body").scrollTop(0);
});
function goTop (pos, isDown){
	if(!isDown && pos > 100){
		$goTop.show();
	}else{
		$goTop.hide();
	}
}
scroll.bind(goTop,'gotop');
