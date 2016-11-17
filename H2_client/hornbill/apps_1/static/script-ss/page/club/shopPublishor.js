fml.use('component/focus', function(mod){
	mod.inputFocus('textarea', '.article_context');
	mod.inputFocus('.article_post');
});

fml.use(['jquery', 'component/shareTmp', 'ui/dialog', 'app/checkLogin', 'ui/alert', 'component/focus', 'page/club/newTopic_ok', 'page/club/newTopic_ie'], function(){
	var $ = this.jquery;
	var shareTmp = this.shareTmp;
	var dialogUI = this.dialog;
	var check = this.checkLogin;
	var alertT = this.alert;
	var input = this.focus;
	//调整容器为article_post
	var $article_con = $('.article_post');
	var page = 0;

	var alertTip = function(content) {
		new alertT({
			content: content,
			width: 420
		});
		$('.maga_suc').css('width', '420px');
	};

	// 固定上传的宝贝和图片总数
	window.canPostNum = 12;

	// 图片上传,newTopic_ok兼容ie6、7，newTopic_ie使用plupload插件
	var overMax_msg = '亲，晒单图片总数最多为12个 ：）'
	$('.add_pic').mousedown(function(){
		if (!check()) return false;
		if(canPostNum <= 0){ alertTip(overMax_msg);return false; }
	});
	var userAgent = window.navigator.userAgent.toLowerCase();
	var msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
	var msie6 = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(userAgent);
	var is_badie = msie7 || msie6;
	if(is_badie){
		this.newTopic_ok.tool();
	} else {
		this.newTopic_ie.tool();
	}
	//选择商品
	var $no_goods = $('.no_goods');
	if($no_goods){
		$no_goods.on('click', function(){
			if (!check()) return false;
			$.post('/aj/club/buy_goods_list', {}, function(goods){
				if (goods.length) {
					var data = {
						'goods': goods
					};
					var tpl = shareTmp('chooseGoods', data);
					var goods_dialog = new dialogUI({
						title: '选择晒单商品',
						content: tpl,
						width: '590'
					});
					$('#closeDialog').on('click', function(){
						window.close();
					});
					$('.goods_alert .j_get_goods').on('click', function(){
						var input = $(this).parents('.goods_alert').find('input:checked');
						if(input.length){
							var goods_dom = $(input).parents(':first');
							input.remove();
							$('.goods').html(goods_dom);
						}
						goods_dialog.drive.destroyModel();
					});
				} else {
					alertTip('你还没有要晒单的商品呢，赶紧去购买吧~');
				}
			}, 'json');
		});
		$no_goods.trigger('click');
	}
});

//页面控制
fml.use('jquery', function($){
	//按钮排序
	var _hideArrow = function($prev, $obj) {
		var prevClass = $prev.find('.arrow_up')[0].className;
		$prev.find('.arrow_up')[0].className = $obj.find('.arrow_up')[0].className;
		$obj.find('.arrow_up')[0].className = prevClass;

		prevClass = $prev.find('.arrow_down')[0].className;
		$prev.find('.arrow_down')[0].className = $obj.find('.arrow_down')[0].className;
		$obj.find('.arrow_down')[0].className = prevClass;
	}
	$('.article_post .arrow_up').live('mousedown', function(){
		var $pObj = $(this).parents('.item');
		var $prev = $pObj.prev();
		$pObj.insertBefore($prev);
		_hideArrow($prev, $pObj);
	});
	$('.article_post .arrow_down').live('mousedown', function(){
		var $pObj = $(this).parents('.item');
		var $next = $pObj.next();
		$next.insertBefore($pObj);
		_hideArrow($pObj, $next);
	})

	// 绑定输入位置
	$('.article_con').delegate('textarea', 'click', function(){
		$('.editor').removeClass('editor');
		$(this).addClass('editor');
	});

	// item移动
	$('.article_post .item').live("mousedown",function(event){
		if (event.which != 1 || event.target.nodeName == 'TEXTAREA' || event.target.className == 'cl_i_close' || event.target.className == 'arrow_up' || event.target.className == 'arrow_down') return;
		event.preventDefault();

		var mouse_y = event.pageY;
		var move_o_y = mouse_y;
		var move_y = m_y = d_y = 0;
		var self = $(this);
		var selfCopy = self.clone();
		var d_f = self.position().top;
		var maxHeight = $('.article_post').height() - 175;
		$('.article_post').prepend(selfCopy);
		selfCopy.addClass('move').css({
			top : d_f + 'px'
		});
		self.addClass('moving');
		$(document).bind("mousemove",function(ev){
			move_y = ev.pageY;
			m_y = move_y - move_o_y;
			d_y = move_y - mouse_y;
			if(d_y > 175){
				var $next = self.next();
				_hideArrow($next, self);
				$next.insertBefore(self);
				mouse_y += 175;
			} else if(d_y < -175){
				var $prev = self.prev();
				_hideArrow($prev, self);
				$prev.insertAfter(self);
				mouse_y -= 175;
			}
			var move_r = d_f + m_y;
			var cursor = 'move';
			if(move_r > maxHeight){
				move_r = maxHeight;
				cursor = 'not-allowed';
			} else if(move_r < 0){
				move_r = 0;
				cursor = 'not-allowed';
			}
			selfCopy.css({
				top : move_r + "px",
				cursor : cursor
			});
			return false
		});
		return false
	});
	$(document).bind("mouseup",function(e){
		$('.move').remove();
		$('.moving').removeClass('moving');
		$(this).unbind("mousemove");
	});
	$(document).bind("click",function(e){
		if(e.target.className == 'dropdown_menu' || e.target.className == 'cl_i_dropdown') return;
		if($('.dropdown_menu').hasClass('dropdown_show')){
			$('.dropdown_menu').hide().removeClass('dropdown_show');
		}
	});
	$('.goods_comment span').on('click', function(){
		$(this).parents(':first').find('.active').removeClass('active');
		$(this).addClass('active');
	});
});

fml.define('page/club/shopPublishor', ['jquery', 'ui/alert', 'app/checkLogin', 'app/checkcode', 'app/clubApi', 'app/tracking'], function(require, exports){
	var $ = require('jquery');
	var alert = require('ui/alert');
	var check = require('app/checkLogin');
	var checkcode = require('app/checkcode');
	var clubApi = require('app/clubApi').clubApi;
	var logTrack = require('app/tracking');

	var alertTip = function(content) {
		new alert({
			content: content, 
			width: 370
		});
	}
	var $wrap = $('.wrap');

	//验证码
	var initCode = function(){
		if($('.checkImage').find('img').attr('isblank') === 'true'){
			$('.checkImage').find('img').attr('isblank', 'false');
		}
		$('.checkImage').bind('click',changeCode);
		showCode();
	};
	var changeCode = function(){
		showCode();
		$('#checkcode_club').val('').focus();
	};
	var showCode = function(){
		checkcode(function(){
			$('.checkImage').unbind('click');
			var t = setTimeout(function(){
				$('.checkImage').bind('click',changeCode);
			}, 600);
		});
	};

	//验证码
	initCode();

	var isAjax = false;
	var $title = $wrap.find('.title');
	var $content = $wrap.find('.content');
	$wrap.find('.submit').click(function(){
		if (!check()) return false;
		if (isAjax) return;
		isAjax = true;

		var twitter_id = $('.shopping_wrap').attr('tid_data');
		var goods_id = $('.shopping_wrap').attr('gid_data');
		if(!twitter_id){
			alertTip('请选择要晒单的商品~');
			isAjax = false;
			return;
		}

		var aTitle = $.trim($title.val());
		var aDesc = $.trim($content.val());
		if(aDesc == $content.attr('placeholder')) aDesc = '';

		if($('.addPic').length == 0){
			alertTip('请上传晒单图片~');
			isAjax = false;
			return;
		}

		var checkcodeDom = $('#checkcode_club');
		if(!checkcodeDom.hasClass('noCheck')){
			var checkcodes = checkcodeDom.val();
			if(checkcodes.length < 4){
				alertTip('请填写完整的验证码~');
				isAjax = false;
				return;
			}
		}
		var tids = [];
		$wrap.find('.item').each(function(){
			if($(this).hasClass('error')){ return ; }
			var dt = $(this).data();
			var $txt = $(this).find('textarea');
			var content = $.trim($txt.val());
			if(content == $txt.attr('placeholder')) content = '';
			dt.tContent = content;
			tids.push(dt);
		})
		var data = {
			'bid' : 101,
			'tids' : tids,
			'aDesc' : aDesc,
			'aTitle' : aTitle,
			'goods_id' : goods_id,
			'twitter_id' : twitter_id
		}
		if(checkcodes){
			data.checkcode = checkcodes;
		}
		data.buyerInfos = {
			'fit' : $('.u_fit .active').attr('data') || 0,
			'color' : $('.u_color .active').attr('data') || 0,
			'height' : $('.u_height').val() || 0,
			'weight' : $('.u_weight').val() || 0
		};

		$.post('/aw/club/shoppingshow_post', data, function(res){
			if (res.code) {
				alertTip(res.msg);
				if(res.code == 40009111){
					$('checkBox').show();
					checkcodeDom.removeClass('noCheck');
				}
				changeCode();
				isAjax = false;
				return;
			}
			setTimeout(function(){
				location.href = '/club/single/' + res.data.article_id;
			}, 1000);
		}, 'json').error(function(res){
			alertTip('发布失败');
			isAjax = false;
		});
		logTrack.cr('newPublishor', {'frm': 'club_post_button'});
	})
});