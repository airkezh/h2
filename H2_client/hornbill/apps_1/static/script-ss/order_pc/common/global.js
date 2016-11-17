fml.define('order_pc/common/global', [], function() {});

fml.use('component/focus', function(mod) {
	mod.inputFocus('.ser_n .searchKey');
});
fml.use(['app/hoverNav', 'app/tracking'], function() {
	var logTrack = this.tracking;
	var hoverNav = this.hoverNav;
	hoverNav('.hoverNav', '.header_nav');
	$('.header_nav').bind('mouseenter', function() {
		logTrack.cr('header_nav');
	});
});
fml.use(['component/windowScroll', 'jquery', 'component/position', 'component/iStorage'], function() {
	var $ = this.jquery;
	var scroll = this.windowScroll;
	var position = this.position;
	var is6 = $.browser.msie && $.browser.version == '6.0';
	//head nav
	var nag = $('#navbar');
	if (!nag.length) return; //没有主站导航不需要绑定吸顶
	var header_top = $('.header_bg:first');
	var nagheight = nag.height();
	var nagMt = nag.offset();
	var lt80 = is6 ? function() {
		nag.css({
			'position': 'relative',
			'top': 0
		});
		scroll.unBind('logonfloat');
		header_top.css({
			'margin-bottom': 0
		});
	} : function() {
		nag.css({
			'position': 'relative',
			'top': 0,
			'height': 'auto'
		});
		header_top.css({
			'margin-bottom': 0
		});

		$('#shop_coupon_couplet').css({
			'top': (nagMt.top + nag.height() + 100) + 'px',
			'position': 'absolute'
		});

	};
	var gt80 = is6 ? function(pos) {
		nag.css({
			'position': 'absolute',
			'left': 0,
			'top': pos + 'px',
			'z-index': 100
		});
		scroll.bind(function(pos) {
			nag.css({
				'top': pos + 'px'
			});
		}, 'logonfloat');
		if ($.browser.msie)
			header_top.css({
				'margin-bottom': nagheight
			});
		else
			header_top.css({
				'margin-bottom': nagheight + 42
			});
	} : function() {
		nag.css({
			'position': 'fixed',
			'left': 0
		});
		header_top.css({
			'margin-bottom': nagheight
		});
		$('#shop_coupon_couplet').css({
			'top': (nag.height() + 100) + 'px',
			'position': 'fixed'
		});
	};

	if (nagMt) {
		lt80();
		scroll.yIn(nagMt.top, gt80, lt80);
	}

	//gotop
	var goTop = $("#goTop");
	var feedback = $('#feedback');
	var go_top = $('#go_top');
	var win = $(window);
	var shareGroup = $('.share_group');
	//	var browse = $('.browse');
	//goTop.show();
	//questionnaire 入口
	//var storage = this.iStorage;
	var goTopBtn = $('#go_top')
	scroll.yIn($(window).height() - 100, function() {
		goTopBtn.show()
		//goTop.removeClass('border_n')
	}, function() {
		goTopBtn.hide()
		//goTop.addClass('border_n')
	})


	goTopBtn.bind("click", function() {
		$('body,html').stop(true, true).animate({
			scrollTop: 0
		}, 250);
		return false;
	});

	if (is6) {
		goTop.css("position", "absolute");
		$('#feedback').css('position', 'absolute');
		var offset = {
			top: shareGroup.size() > 0 ? shareGroup.offset().top : 0
		}
		scroll.bind(function(pos) {
			goTop.css({
				"top": (pos + win.height() - 240) + 'px'
			})
			$('#feedback').css({
				"top": (pos + win.height() - 320) + 'px'
			})
			offset.top && position.toFixed(shareGroup, offset);
		});

	}

});
fml.use('app/search', function() {
	this.init();
});
fml.use('jquery', function($) {
	//导航搜索框为空时，搜索不跳转
	$('.fm_hd_btm_shbx_bttn').click(function() {
		var $serKey = $(this).parents('.searchBox').find('.searchKey');
		//	console.log($.trim($serKey.val()) == '', $serKey.val() == $serKey.attr('placeholder'))
		if ($.trim($serKey.val()) == '' || $serKey.val() == $serKey.attr('placeholder'))
			return false;
	})
})

fml.use('page/im/open', function() {
	this.bind('.knilmi', {
		is_simple: !(Meilishuo.config.is_service)
	})
})

fml.use('app/referrer', function() {});

fml.use(['jquery', 'component/iStorage', 'app/tracking'], function() {
	/* yellow tip */
	var $ = this.jquery,
		tracking = this.tracking,
		self = this,
		$bind_tip = $('.bind_tip'),
		$close = $('.bind_tip strong'),
		$header_top = $('.header_top'),
		storage = this.iStorage

	if (!storage.getCookie('tip_close') && !$bind_tip == 0)
		$bind_tip.show();

	$close.click(function(e) {
		$(this).parent().hide();
		storage.setCookie('tip_close', new Date().getTime(), {
			'duration': 3 * 86400
		});
	});
})

fml.use(['jquery', 'app/setting'], function() {
	var $ = this.jquery,
		setting = this.setting
	var topbanner = $('#topbanner')
	if (!topbanner.length) return
	var miniPic = topbanner.attr('mini'),
		showSec = topbanner.attr('showSec') | 0,
		mini_height = topbanner.attr('mini_height') | 0
	if (showSec <= 0) return

	window.setTimeout(function() {
		topbanner.animate({
			'height': mini_height
		}, function() {
			topbanner.css('background-image', 'url(' + miniPic + ')')
			setting.init()
		})
	}, showSec * 1000)
})

fml.use('jquery', function() {
	var $ = this;
	var club_guide = $('.club_guide');
	var page_href = window.location.href;

	if (!club_guide.length || page_href.indexOf('/club') > -1) return;

	club_guide.show();
	$('.club_guide_close').click(function() {
		var url = '/aw/club/club_guide',
			data = {
				'status': 1
			},
			cbk = function(res) {};
		$.post(url, data, cbk, 'json');
		club_guide.hide();
	});
	$('.club_guide_go').click(function() {
		var url = '/aw/club/club_guide',
			data = {
				'status': 2
			},
			cbk = function(res) {
				window.location.href = '/club?frm=club_guide'
			};
		$.post(url, data, cbk, 'json');
		return false;
	});
})

fml.use('app/cleanMsg' , function(mod){
	if(!Meilishuo.config.is_iPad){
		mod.msgFunc();
	}
});

fml.use('order_pc/common/shopping_carts', function() {
	this.readShopsCount()
})

fml.use('app/eventHover', function() {
	this.hoverShow('.nav_new .dress', '.header_list');
	this.hoverShow('.nav_new .report', '.header_list');
	this.hoverShow('.menu_leo #setting', '.add_menu_leo');
	this.hoverShow('.menu_leo #message', '.add_menu_leo');
})
fml.use('app/focus_banner', function() {
	this.bind({
		'unit': '.header_top .head_bnr li',
		'btn': '.adType1 a',
		'transition': 'fade'
	})
});
fml.use(['jquery', 'app/tracking'], function() {
	var $ = this.jquery,
		tracking = this.tracking
	$('.bot_cart a').click(function() {
		tracking.cr('bot_cart/' + ($(this).is('.openIM') ? 'openIM' : 'cart'))
	})
	$('#goTop a').click(function() {
		var clsNm = this.className
		var btnType = ''
		if (clsNm.indexOf('knilmi') > -1)
			btnType = 'openIM'
		else if (clsNm.indexOf('ico_guide') > -1)
			btnType = 'ico_guide'
		else if (clsNm.indexOf('ico_top') > -1)
			btnType = 'gotop'

		tracking.cr('rightBar/' + btnType)
	})
})

//再激活用户
fml.use(['jquery','ui/alert','app/checkcode'] , function(){
    var $ = this.jquery;
    var uiAlert = this.alert;
    var checkcode = this.checkcode;

    if($('#activeAccountTpl').length){
    	var content = $('#activeAccountTpl').html();
		var alertTip = new uiAlert({
			width: 400,
			noConfirmBtn : true,
			content: content,
			isOverflow: false,
			discover: true,
			title: '激活你的账号',
			onClose : function (){
				location.href = '/user/logout';
			}
		});

		var $root = alertTip.drive.window.content;

		function sendSmsValid(){
			var $err_msg = $('.err_msg',$root);
			var phoneVal = $.trim($('.phone',$root).val());
			var codeVal = $.trim($('.code',$root).val());
			if(!phoneVal){
				$err_msg.html('手机号码不能为空！');
				return false;
			}else if(!/^\d{11}$/.test(phoneVal)){
				$err_msg.html('请输入正确的手机号码！');
				return false;
			}
			if(!codeVal){
				$err_msg.html('请输入验证码！');
				return false;
			}
			$err_msg.html('');
			return true;
		}

		function sendSms(){
			if(sendSmsValid()){
				var data = {
					rule : 'captcha',
					data : $.trim($('.code',$root).val())
				};
				$.post('/aw/user/reg_validate',data,function(res){
					$('.err_msg',$root).html('');
					if(res == 0){
						$('.step1',$root).hide();
						$('.step2',$root).show();
						sendCode();
					}else{
						$('.step1-err',$root).html('验证码输入有误！');
					}
				},'json');
			}
		}

		function timeDown(times, cbk){
			setTimeout(function(){
				if(!times){
					return;
				}else {
					times--;
					cbk(times);
					timeDown(times, cbk);
				}
			},1000);
		}

		function sendCode(){
			var time = 60,
			    url = '/aw/user/reactive_send_sms',
			    data = {
					mobile : $.trim($('.phone',$root).val())
				};

			var $reGet = $('.re_get',$root);

			var callback = function(res){
				if(res.code == 0) {
					timeDown(time ,function(times){
				   		if(!times){
				   			$reGet.val('获取短信验证码');
						}else {
							$reGet.val('重新发送 (' + times + '秒)');
						}
					});
				}else{
					$('.step2-err',$root).html('<p>'+ res.message +'，点击上一步返回。</p>');
				}
			}
			$.post(url , data , callback ,'json');
		}

		function activeNow(){
			var url = '/aw/user/reactive',
				data = {
					mobile : $.trim($('.phone',$root).val()),
					captcha : $.trim($('.sms_code', $root).val())
				};
			var callback = function (res){
				if(res.code == 0){
					$('.step2',$root).hide();
					$('.step3',$root).show();
				}else{
					$('.sms_code', $root).val('');
					$('.step2-err',$root).html('<p>短信验证码输入有误！</p>');
				}
			}
			$.post(url, data ,callback, 'json');
			
		}

		function init(){
			checkcode();

			$('.refresh,.checkImage img',$root).click(function(){
				checkcode();
			});

			$('.active_send',$root).click(function(){
				sendSms();
			});

			$('.active_now',$root).click(function(){
				activeNow();
			});

			$('.re_get',$root).click(function(){
				sendSms();
			});

			$('.last_step',$root).click(function(){
				$('.step1',$root).show();
				$('.step2',$root).hide();
			});
			$('.sug_confirm',$root).click(function(){
				alertTip.drive.destroyModel(true);
			});
		}

		init();
	}
});