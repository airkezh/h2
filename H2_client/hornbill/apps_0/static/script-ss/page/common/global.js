fml.use('app/checkLogin' , function(mod){
	$(".mt_zzs").bind("click" , function(){
		return mod();
	});
});
fml.use('component/focus' , function(mod){
    mod.inputFocus('.ser_n .searchKey');
});
fml.use('app/sharePost' , function(mod){
	mod.dialogShow("shareMeiliDialog");
});
fml.use(['app/hoverNav', 'app/tracking'] , function(){
	var logTrack = this.tracking;
	var hoverNav = this.hoverNav;
	hoverNav('.hoverNav', '.header_nav');
	$('.header_nav').bind('mouseenter', function(){
		logTrack.cr('header_nav');
	});
});
fml.use('app/adPoster', function(){
	this.carousel('.daily_mobile', {type: 1, height: 30});
})
fml.use(['component/windowScroll','jquery' , 'component/position', 'component/iStorage'] , function(){
    var $ = this.jquery;
    var scroll = this.windowScroll;
	var position = this.position;
    var is6 = $.browser.msie && $.browser.version=='6.0';
	//head nav
    var nag = $('#navbar, #shop-nav');

	var shop_coupon_couplet = $('#shop_coupon_couplet');
    if(nag.length && shop_coupon_couplet.length ){
	    // if(!nag.length) return; //没有主站导航不需要绑定吸顶
		var header_top = $('.header_bg:first');
		var nagheight = nag.height();
		var nagMt = nag.offset();
	    var lt80 = is6? function(){
		      nag.css({'position':'relative','top':0});
		      scroll.unBind('logonfloat');
			  header_top.css({'margin-bottom': 0});
		     } : function(){
		      nag.css({'position':'relative','top':0});
			  header_top.css({'margin-bottom': 0});

			shop_coupon_couplet.css({
					'top' : (nagMt.top + nag.height() + 100) + 'px',
					'position' : 'absolute'
				});

	         };
	    var gt80 = is6? function(pos){
	         nag.css({'position':'absolute', 'left' : 0 , 'top':pos + 'px','z-index':100});
	         scroll.bind(function(pos){
	              nag.css({'top':pos + 'px'});
		            },'logonfloat');
			if($.browser.msie)
				header_top.css({'margin-bottom': nagheight  });
			else
				header_top.css({'margin-bottom': nagheight   + 42});
	        }:function(){
				nag.css({'position':'fixed' , 'left' : 0});
				header_top.css({'margin-bottom': nagheight  });
				shop_coupon_couplet.css({
						'top' : (nag.height() + 100) + 'px',
						'position' : 'fixed'
					});
				};

	    if (nagMt) {
	    	lt80();
	    	scroll.yIn( nagMt.top , gt80, lt80);
	    }
	}

	//gotop
	var goTop = $("#goTop");
	var feedback = $('#feedback');
	var go_top = $('#go_top');
	var win  =$(window);
	var shareGroup = $('.share_group');
//	var browse = $('.browse');
	//goTop.show();
	//questionnaire 入口
	//var storage = this.iStorage;
	var goTopBtn = $('#go_top')
	scroll.yIn( $(window).height() - 100 , function(){
				goTopBtn.show()
				//goTop.removeClass('border_n')
			} , function(){
				goTopBtn.hide()
				//goTop.addClass('border_n')
			})


	goTopBtn.bind("click" , function(){
		   $('body,html').stop(true , true).animate({ scrollTop: 0 }, 250);
		   return false;
	    });

	if (is6){
		goTop.css("position","absolute");
		$('#feedback').css('position','absolute');
		var offset = {
			top : shareGroup.size() > 0 ? shareGroup.offset().top : 0
		}
        scroll.bind(function(pos){
            goTop.css({"top" : (pos + win.height()-240) + 'px'})
            $('#feedback').css({"top" : (pos + win.height()-320) + 'px'})
			offset.top && position.toFixed(shareGroup , offset);
        });

	}

});
fml.use('app/addFavorite' , function(){
	this.addFavor();
});

fml.use('app/search' , function(){
	this.init();
	// this.searchKey('.ser_n');
	// this.mouseStype('.ser_n');
	// this.documentClick(".ser_n");
});
fml.use('jquery', function($){
	//导航搜索框为空时，搜索不跳转
	$('.fm_hd_btm_shbx_bttn').click(function(){
		var $serKey = $(this).parents('.searchBox').find('.searchKey');
	//	console.log($.trim($serKey.val()) == '', $serKey.val() == $serKey.attr('placeholder'))
		if ($.trim($serKey.val()) == '' || $serKey.val() == $serKey.attr('placeholder'))
			return false;
	})
})

fml.use('page/im/open' , function (){
	this.bind('.knilmi',{is_simple:true})
	this.bind({
		parent: fml.vars.globalSidebarSelector,
		self: '.openIM-shop'
	}, {
		is_simple: true
	})
})


fml.use('app/referrer' , function(){
});
/*
#10027
fml.use(['component/iStorage'], function(){
	var storage = this.iStorage;
	var t = new Date;
	t = parseInt(t.getTime()/86400000);
	storage.get('isShowLogin', function(v) {
		if (v && (t-v < 1)) return;
		fml.eventProxy('showLoginWin', function(cbk){
			storage.get('isShowLogin', function(v) {		//for page turning, or open many pages
				if (v && (t-v < 1)) return;
				cbk();
				storage.set('isShowLogin', t);
			});
		});
	});
});
*/

//footer 底部邮件订阅
fml.use(['jquery', 'component/shareTmp', 'ui/dialog', 'component/focus'], function(){
	var $ = this.jquery;
	var self = this;
	function click_sub() {
		var shareTmp = self.shareTmp;
		var dialog = self.dialog;
		var input = self.focus;
		var $tpl = $(shareTmp('mailSub'));
		var title = '邮件订阅<span style="font-size: 12px; font-weight: normal;">-为您推荐感兴趣的内容!</span>';
		var subtribeWin = new dialog({title : title , width : 430 , content : $tpl , onStart : function(){ } , onClose : function(){ }});
		input.inputFocus('#sub_email');
		input.inputFocus('#sub_opt');
		function validateEmail(itemObj){
			var re = /\S+@\S+\.\S+/;
			return re.test(itemObj.value);
		}
		var $email = $('#sub_email');
		$email.focus(function(){
			$tpl.find($('.hint_sub')).addClass('none_f');
		}).blur(function(){
			if (!validateEmail($email[0]))
				$tpl.find($('.hint_sub')).removeClass('none_f');
		});
		$('#substribe').submit(function(){
			if (!validateEmail($email[0])) {
				$tpl.find($('.hint_sub')).removeClass('none_f');
				return false;
			}
			var optVal = $('#sub_opt').val();
			if  (optVal == '' || optVal == '选填') $('#sub_opt').val('')
			window.setTimeout(function(){
				subtribeWin.drive.destroyModel()
			}, 20)
		});
	}
	$('#sub_mail').click(click_sub);
});
//#3103 页面fix新增二维码，意见反馈入口相应调整
fml.use(['jquery', 'component/shareTmp'], function(){
	var $ = this.jquery;
	var self = this;
	var $qq_card = null, shareTmp = null, $tpl = null;
	var $goTop = $('#goTop');
	setTimeout(function(){
		$goTop.find('.two_code').hover(function(){
			shareTmp = shareTmp || self.shareTmp;
			if ($tpl) {
				$tpl.show();
			} else {
				$tpl = $(shareTmp('weixinCode'));
				$goTop.append($tpl.show());
			}
			$qq_card = $goTop.find('.qq_card');
			if ($qq_card.length > 0) $qq_card.hide();
		}, function(){
			$tpl.hide();
			if ($qq_card.length > 0) $qq_card.show();
		});
	}, 1000);
});
fml.use(['jquery', 'component/iStorage', 'app/tracking'], function(){
	/* yellow tip */
	var $ = this.jquery
	   ,tracking = this.tracking
	   ,self = this
	   ,$bind_tip = $('.bind_tip')
	   ,$close = $('.bind_tip strong')
	   ,$bnr_close = $('.header_top .close_bnr_btn')
	   ,$header_top =$('.header_top')
	   ,storage = this.iStorage
	   ,is_weak = $bind_tip.data('isweak')
       ,url = window.location.href
       ,index = url.indexOf('/settings/')
       if( is_weak == 1 && index<0 ){
           $bind_tip.show();
           $close.click(function(e) {
               var $this = $(this);
               $.get('/aj/weak_password_aj/weakPassword/remove', {}, function(res){
                   $this.parent().hide();
               }, 'json');
           });
       }

	/* 顶部banner add close button */

	$bnr_close.click(function(e){
		$(this).parents('.header_top').hide();
		var data = {
			'act_name' : 'header_banner_global',
			'time_type' : 1,
			'type' : 'add'
		};
		$.get('/aj/huodong/user_mark', data, function(){}, 'json');
		tracking.cr('bnr_close');
	});

})

fml.use(['jquery','app/setting'] , function(){
	var $ = this.jquery
		,setting = this.setting
	var topbanner = $('#topbanner')
	if (!topbanner.length) return
	var miniPic = topbanner.attr('mini')
		,showSec = topbanner.attr('showSec')|0
		,mini_height = topbanner.attr('mini_height')|0
	if (showSec <= 0) return

	window.setTimeout(function(){
			topbanner.animate({'height' : mini_height } ,function(){
				topbanner.css('background-image' , 'url('+miniPic+')')
				setting.init()
			})
		},showSec*1000)
})

fml.use('jquery' , function(){
	var $ = this;
	var club_guide = $('.club_guide');
	var page_href = window.location.href;

	if (!club_guide.length || page_href.indexOf('/club') > -1) return;

	club_guide.show();
	$('.club_guide_close').click(function(){
		var url = '/aw/club/club_guide',
			data = {'status': 1},
			cbk = function(res){};
		$.post(url, data, cbk, 'json');
		club_guide.hide();
	});
	$('.club_guide_go').click(function(){
		var url = '/aw/club/club_guide',
			data = {'status': 2},
			cbk = function(res){
				window.location.href = '/club?frm=club_guide'
			};
		$.post(url, data, cbk, 'json');
		return false;
	});
})

fml.use('page/common/shopping_carts' , function(){
	this.readShopsCount()
})

fml.use('app/eventHover' , function(){
	this.hoverShow('.nav_new .dress' , '.header_list');
	this.hoverShow('.nav_new .report' , '.header_list');
	this.hoverShow('.menu_leo #setting' , '.add_menu_leo');
	this.hoverShow('.menu_leo #message' , '.add_menu_leo');
	this.hoverShow('#downapp' , '.down');
})
fml.use('app/focus_banner' , function(){
	this.bind({
				'unit' : '.header_top .head_bnr li'
				,'btn': '.adType1 a'
				,'transition' : 'fade'
				})
});
/*fml.use(['jquery' , 'app/tracking'] , function(){
	var $ = this.jquery
		,tracking = this.tracking
	$('.bot_cart a').click(function(){
		tracking.cr('bot_cart/'+ ($(this).is('.openIM')?'openIM':'cart'))
		})
	$('#goTop a').click(function(){
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


	})*/

fml.use('jquery', function($){
	//pass trace code while click A
	var traceKey = 'pstrc'
	if (location.search.length < 2) return
	var reg = new RegExp('\\b' + traceKey + '=([\\w\\W]+?)(\\&|$)')
	var traceVal = location.search.match(reg)
	if (!traceVal || !traceVal[1]) return
	traceVal = decodeURIComponent(traceVal[1])
	traceVal = decodeURIComponent(traceVal) //double encode

	$('body').on('click' , 'a' , function(){
		//$(this).attr('href' , window.prompt('','/guang/attr/40471?&pstrc=ad:2_0'))
		var _href = $(this).attr('href');
		if (!_href || _href.indexOf('javascript:') > -1 || _href.indexOf('#') == 0 ) {
			return;
		};
		var href = _href.split('#')
		var hash = href[1]
			,href = href[0]
		if ($(this).data(traceKey)) return
		var traceNew = href.match(reg)
		var tTraceVal = traceVal
		if (traceNew && traceNew[1]  ) {
			traceNew = decodeURIComponent(traceNew[1].split('|')[0])
			if (traceVal.indexOf(traceNew) ==  -1 ){

				var tTraceVal = traceVal.split('|')


				var tn = traceNew.split(':')
				for (var i = tTraceVal.length - 1; i >= 0  ; i--){
					var tv = tTraceVal[i].split(':')
					if (tv[0] == tn[0]){
						tTraceVal.splice(i,1)
					}
				}
				tTraceVal.unshift(traceNew)
				if (tTraceVal.length > 10) tTraceVal.splice(10) && tTraceVal.push('bad')
				tTraceVal = tTraceVal.join('|')
			}
			href = href.replace(reg , '')
		}
		var t = href.slice(-1)
		if ('&' != t && '?' != t )href += (href.indexOf('?') > -1 ?'&' :'?')
		href += traceKey + '=' + encodeURIComponent(tTraceVal)
		if (hash) href += '#' + hash
		$(this).attr('href' , href).data(traceKey , 1)

	})

})

fml.use('jquery', function($){
//sina_attention
	if ('https:' === window.location.protocol) return
	 var e = document.createElement("script");
	 var s = document.getElementsByTagName("script")[0];
	 e.src = "http://tjs.sjs.sinajs.cn/open/api/js/wb.js";
	 e.async = true;
	 s.parentNode.insertBefore(e, s);

	var timer = null,
        $sinaAtten     = $('.sina_attention'),
        $sinaAttenArea = $sinaAtten.find('.sina_attention_area');

    $sinaAtten.mouseover(function(){
        $sinaAttenArea.show();
		clearTimeout(timer);
	}).mouseout(function(){
		timer = setTimeout(function(){
            $sinaAttenArea.hide();
		},500);
	});

    $sinaAttenArea.mouseout(function(){
        $sinaAttenArea.hide();
	});
});


/*全站左下角一次性弹窗*/
fml.use(['jquery','component/shareTmp'], function(){
	var $ = this.jquery;
	var self = this;
	var shareTmp = self.shareTmp;
	if(!fml.vars.ad_leftPic) return;

	$.get('/aj/bay_window_aj/sale/bay_window', { }, function(data){
		var baydata=data.data;
        var tpl = shareTmp("bay_window" , {
            "baydata" : baydata
        });

		$.get('/aj/ad_win/adWin', { 'time_type' : 1 }, function(data){
			if( data.data ==0){
				 $('body').append(tpl);
				 $( document ).trigger( 'ad11_ok' );
			}
		}, 'json');

	}, 'json');


	$("body").on("click",".close_ad11",function(){
		$(".activity_ad11").remove();
		var data = {
			'act_name' : 'left_ad_global',
			'time_type' : 1,
			'type' : 'add'
		};
		$.get('/aj/huodong/user_mark', data, function(){}, 'json');
	})


	// var nTime = new Date() , startTime = new Date('2015/5/20 10:00:00') , endTime = new Date('2015/5/23 23:59:59');
	// if( nTime > startTime && nTime < endTime ){
	// 	$.get('/aj/ad_win/adWin', { 'time_type' : 1 }, function(data){
	// 		if( data.data === 0){
	// 			$(".activity_ad11").show();
	// 		}
	// 	}, 'json');


	// 	$(".close_ad11").on("click",function(){
	// 		$(".activity_ad11").remove();
	// 		var data = {
	// 			'act_name' : 'left_ad_global',
	// 			'time_type' : 1,
	// 			'type' : 'add'
	// 		};
	// 		$.get('/aj/huodong/user_mark', data, function(){}, 'json');
	// 	})
	// }

});

/**
 * @description 全站一次性弹窗
 * @author yunqian@meilishuo.com
 * @date 2014-12-10
 */

fml.use(['jquery', 'ui/dialog', 'component/shareTmp'], function(){
	if(!fml.vars.apparel_alert) return
	var dialog = this.dialog
	var shareTmp = this.shareTmp

	var showApparelAlert = function(data){
		var tpl = shareTmp('apparel_alert', data)
		var popRule = new dialog({
			'content':tpl ,
			'width': '684px',
			'onStart': function(){
				$('#overlay').css({
					'background-color':'black',
					'filter': 'alpha(opacity=40)',
					'opacity': 0.4
				})
			},
			'onChange': function(){
				$('#dialogTitle').hide()
				$('#dialogLayer').css({'background':'none' , 'filter':''})
				$('#dialogContent').css({'background':'none'})
			}
		})
		$('.closeButton, .check_act').on('click', function(){
			popRule.drive.destroyModel()
		})
	}
	$.get('/aj/fullalert/dialog', {'time_type' : 1}, function(res){
		if(res.code === 1){
			showApparelAlert({apparel_alert:res})
		}
	}, 'json')
})

/**
 * @description PC向MOB导流的弹层
 * @author xiaojingwang@meilishuo.com
 * @date 2015-8-12
 */

fml.use(['jquery', 'component/shareTmp'], function(){
	// if(!fml.vars.apparel_alert) return
	// var dialog = this.dialog
	// var shareTmp = this.shareTmp

	// var showApparelAlert = function(data){
	// 	var tpl = shareTmp('apparel_alert', data)
	// 	var popRule = new dialog({
	// 		'content':tpl ,
	// 		'width': '684px',
	// 		'onStart': function(){
	// 			$('#overlay').css({
	// 				'background-color':'black',
	// 				'filter': 'alpha(opacity=40)',
	// 				'opacity': 0.4
	// 			})
	// 		},
	// 		'onChange': function(){
	// 			$('#dialogTitle').hide()
	// 			$('#dialogLayer').css({'background':'none' , 'filter':''})
	// 			$('#dialogContent').css({'background':'none'})
	// 		}
	// 	})
	// 	$('.closeButton, .check_act').on('click', function(){
	// 		popRule.drive.destroyModel()
	// 	})
	// }
	// $.get('/aj/fullalert/dialog', {'time_type' : 1}, function(res){
	// 	if(res.code === 1){
	// 		showApparelAlert({apparel_alert:res})
	// 	}
	// }, 'json')
})


fml.define('page/common/global',[ 'page/common/global_login' ] ,function() {
	var vars = fml.vars,
		im   = vars.is_item_page ? 2 : 1

	Biu.init({
		container: vars.globalSidebarSelector,
        im: im,
		serviceIM: vars.globalSidebarServiceIM,
        domain: vars.globalSidebarDomain
	});
});
