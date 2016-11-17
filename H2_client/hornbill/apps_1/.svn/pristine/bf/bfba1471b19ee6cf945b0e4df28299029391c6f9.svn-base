/*common*/
require('wap/zepto');
var ShareTo = require('wap/app/shareTo'),
	Alert = require('wap/ui/alert');
window.MLS = {
  didLogin : function() {
    // 成功登录，跳转到下一步
    window.location.reload();
  }
};
if(fml.vars.CONFIG_SHARE && fml.vars.isWx){
	var signWX = require('wx/sign'),
		shareWX = require('wx/share');
	signWX();
	fml.vars.shareData = {
		'desc' : fml.vars.CONFIG_SHARE.text,
		'imgUrl' : fml.vars.CONFIG_SHARE.src,
		'title' : fml.vars.CONFIG_SHARE.title
	};
	shareWX.bind(fml.vars.shareData);
}
if (!Meilishuo.config.user_id && Meilishuo.config.os.mlsApp) {
	$('.login').show();
    $('body').click(function(){
    	window.location.href = 'meilishuo://login.meilishuo/?json_params=';
    });
};
if (Meilishuo.config.user_id) {
	var shake = require('wap/app/lark/shake');

	shake('.swimg',function(date){
		var url = '/aj/wx_new/shake_init',
			_data = {};
		$.get(url, _data, function(res) {
			res = JSON.parse(res);
			$('.shake').hide();
			if (res.error_code == 1) {
				if (res.data.award) {
					var _level = res.data.award.prize_level;
					showDiv(_level);
				}else{
					$('.rogerT-7').show();
				}
			}else{
				$('.rogerT-7').show();
			}
		});
	});
	
};

var windowWidth = $(window).width()
    ,windowHeight = $(window).height();

$('.shake').css('left',windowWidth * (21/64)).show();

var showDiv = function(type){
	type = type || 0;
	$('.mask-bottom').css('z-index','10');
	maskShow();
	if (type == 1) {
		$('.rogerT-1').show();
		window._th = 1;
	}else if (type == 2) {
		$('.rogerT-2').show();
		window._th = 2;
	}else if (type > 2 && type < 8) {
		var s_type = [3,4,5,2,1];
		if (Meilishuo.config.os.mlsApp) {
			$('.rogerT-4').show();
			$('.app-all').hide();
			$('.app-' + s_type[type - 3]).show();
		}else{
			$('.rogerT-5').show();
			$('.wx-all').hide();
			$('.wx-' + s_type[type - 3]).show();
		}
	}else{
		$('.rogerT-7').show();
	}
}

var shareAct = function(){
	if (Meilishuo.config.os.mlsApp) {
		opt = {
	        'text' : '【急】50台手机发不出去了，快帮我领一个',
	        'title' : '【急】50台手机发不出去了，快帮我领一个',
	        'pic' : 'http://d05.res.meilishuo.net/pic/_o/28/b3/678b1051958821924a5f8a157696_34_34.cg.jpg',
	        'url' : '/wx/shake/'
	    }
	    ShareTo.shareToPengYouQuan(opt);
	}else{
		$('.mask').show();
		$('.mask-bottom').css('z-index','102');
		maskShow();
	}
}

var maskShow = function(){
	$('body').css('overflow','hidden').find('.mask-bottom').show().css('height',$('body').height());
}

var maskHide = function(){
	$('body').css('overflow','scroll').find('.mask-bottom').hide();
}

var alertCon = function(msg){
	var a = new Alert({
		content : msg
	});
}

$('.mask').on('click',function(){
	maskHide();
	$(this).hide();
});

$('.btn-4, .btn-1').on('click',function(){
	shareAct();
});

$('.btn-3').on('click',function(){
	window.location.href = '/goto/open/?appUrl=' + encodeURIComponent(location.href);
});

$('.btn-2').on('click',function(){
	window.location.reload();
});

$('.rogerT-1, .rogerT-2').on('click', function(){
	var _this = $(this);
	_this.hide();
	$('.rogerT-6').show();
});

$('.share-main').on('click', function(event) {
	shareAct();
});

$('.mask-btn-one').on('click', function(){
	var _this = $(this);
	var _data = {
		'name' : $('#name').val(),
		'mobile' : $('#tel').val(),
		'address' : $('#addr').val()
	}
	var _num = _data.mobile;
	if(!_data.name || !_data.address) return alertCon('信息输入不完整，请重新输入。');
	if(!/^\d{11}$/.test(_num)) return alertCon('手机号输入错误，请重新输入。');
	$.post('/aj/wx_new/shake_save', _data, function(data) {
		data = JSON.parse(data);
		if (data.error_code == 0) {
			$('.rogerT-6').hide();
			$('.th-1, .th-2').hide();
			var _th = window._th;
			if (_th == 1) {
				$('.th-1').show();
			}else{
				$('.th-2').show();
			}
			$('.rogerT-3').show();
		}else{
			alertCon(data.message);
		}
	});
});

