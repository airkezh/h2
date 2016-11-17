fml.use('component/focus', function(mod){
    mod.inputFocus('textarea', '.article_context');
    mod.inputFocus('.wraper_l .title');
    mod.inputFocus('.article_post');
});
fml.use('app/smile', function(){
	this.showSmile('.article_subject' , '.add_smileys' , 'recom_publish');
});

fml.use(['jquery', 'app/sharePost', 'component/shareTmp', 'ui/dialog', 'app/checkLogin', 'ui/alert', 'component/focus', 'page/club/newTopic_ok', 'page/club/newTopic_ie'], function(){
	var $ = this.jquery;
	var dialogShow = this.sharePost.dialogShow;
	var shareTmp = this.shareTmp;
	var dialogUI = this.dialog;
	var check = this.checkLogin;
	var alertT = this.alert;
	var input = this.focus;
	//调整容器为article_post
	var $article_con = $('.article_post');

	var alertTip = function(content) {
		new alertT({
			content: content, 
			width: 420
		});
		$('.maga_suc').css('width', '420px');
	};

	// 固定上传的宝贝和图片总数
	window.canPostNum = 50;

	// 图片上传,newTopic_ok兼容ie6、7，newTopic_ie使用plupload插件
	var overMax_msg = Meilishuo.config.is_shoppingshow ?
			'亲，每楼的晒单图片总数最多为20个，更多内容请分楼发布 ：）'
			: '亲，每楼的晒单图片和宝贝总数最多为20个，更多内容请分楼发布 ：）';
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

	// 宝贝抓取
	$('.add_goods').click(function(){
		if (!check()) return false;
		if(canPostNum <= 0){ alertTip(overMax_msg);return false; }
		var tpl = shareTmp('shareGoodsLinkTpl');
		var shareGoodsDia = new dialogUI({ title: "分享宝贝", content: tpl, isOverflow: false });
		$("#addGoodsSubmit").on("click",function(){
			var goods_url = $(".add_goods_url").val();
			var cbk = function(res, goods_url){
				if (!res) return;
				res.isPic = false;
				canPostNum -= 1;
				var data = {
					type: 7,
					goodsID : res.data.gInfo.goodsID,
					tContent : '',
					goods_pic_url : res.data.gInfo.image,
					goods_title : res.data.gInfo.title 
				}
				if ($article_con.find('.item').length == 0){
					res.hide_up = 'none_f';
				} else {
					res.hide_up = '';
					$article_con.find('.item').last().find('.arrow_down').removeClass('none_f');
				}
				var tpl = shareTmp('addCon', res);
				var itemObj = $article_con.append(tpl).find('.item').last().data(data);
				input.inputFocus(itemObj.find('.desp')[0]);
				itemObj.find('textarea').focus();
				shareGoodsDia.drive.destroyModel();
			}
			dialogShow.goodsAjax(goods_url, cbk);
		});
	});
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

	// 添加图片点击效果
	$('.add_pic, .add_goods').mousedown(function(){
		$(this).addClass('active');
	}).mouseup(function(){
		$(this).removeClass('active');
	}).mouseleave(function(){
		$(this).removeClass('active');
	});
	// 绑定输入位置
	$('.article_con').delegate('textarea', 'click', function(){
		$('.editor').removeClass('editor');
		$(this).addClass('editor');
	});

	// 下拉框显示
	$('.dropdown_tog, .cl_i_dropdown').click(function(e){
		if($('.dropdown_menu').hasClass('dropdown_show')){
			$('.dropdown_menu').hide().removeClass('dropdown_show');
		}else{
			$('.dropdown_menu').show().addClass('dropdown_show');
		}
		return false;
	});
	$('.dropdown_menu li').click(function(){
		$('.dropdown_tog').html($(this).html());
		$('.dropdown_tog').attr('data', $(this).attr('data'));
		$('.dropdown_menu').hide().removeClass('dropdown_show');
		return false;
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
});

fml.define('page/club/newTopicN', ['jquery', 'ui/alert', 'app/checkLogin', 'app/checkcode', 'app/clubApi', 'app/tracking'], function(require, exports){
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
	var $wraper_l = $('.wraper_l');
	var $hint = $wraper_l.find('.hint_msg');

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
		$('#checkcode').val('').focus();
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

	var _checkWordNum = function(self){
		var len = $.trim($(self).val()).length;
		if (len < 30) {
			$hint.html('').hide();
		} else if (len >= 30 && len <= 40) {
			$hint.html('还可以输入' + (40 - len) + '个字').show();
		} else if (len > 40) {
			$hint.html('超过标题字数限制' + (len - 40) + '个字').show();
		}
	}
	$('.wraper_l .title').live('keydown', function(){
		_checkWordNum(this);
	}).on('blur', function(){
		_checkWordNum(this);
	});

	var isAjax = false;
	var $title = $wraper_l.find('.title');
	var $content = $wraper_l.find('.content');
	$wraper_l.find('.submit').click(function(){
		if (!check()) return false;
		if (isAjax) return;
		isAjax = true;
		var aTitle = $.trim($title.val());
		if (aTitle == '请输入标题') aTitle = '';
		var aDesc = $.trim($content.val());
		if (aDesc == '在这里输入正文...') aDesc = '';
		var bid = $('.catalog').attr('data');
		if (bid == 0) {
			alertTip('类别不能为空哦~');
			isAjax = false;
			return;
		}
		if(Meilishuo.config.is_shoppingshow){
			if(aTitle.length == 0){
				aTitle = $.trim($title.attr('placeholder'));
			}
			if($('.addPic').length == 0){
				alertTip('请上传晒单图片~');
				isAjax = false;
				return;
			}
		} else if (aTitle.length == 0) {
			alertTip('标题不能为空哦~');
			isAjax = false;
			return;
		}

		var checkcodeDom = $('#checkcode');
		if(!checkcodeDom.hasClass('noCheck')){
			var checkcodes = checkcodeDom.val();
			if(checkcodes.length < 4){
				alertTip('请填写完整的验证码~');
				isAjax = false;
				return;
			}
		}
		var tids = [];
		$wraper_l.find('.item').each(function(){
			if($(this).hasClass('error')){ return ; }
			var dt = $(this).data();
			var $txt = $(this).find('textarea');
			var content = $.trim($txt.val());
			if(content == $txt.attr('placeholder')) content = '';
			dt.tContent = content;
			tids.push(dt);
		})
		var data = {
			'bid' : bid,
			'aTitle' : aTitle,
			'aDesc' : aDesc,
			'tids' : tids
		}
		if(checkcodes){
			data.checkcode = checkcodes;
		}
		if(Meilishuo.config.is_shoppingshow){
			data.twitter_id = $('.twitter_id').attr('data');
			data.goods_id = $('.goods_id').attr('data');
		}
		$.post('/aw/club/create', data, function(res){
			if (res.code) {
				alertTip(res.msg);
				if(res.code == 40009){
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