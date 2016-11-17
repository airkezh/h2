fml.use('component/focus' , function(mod){
    mod.inputFocus('textarea', '.main_con');
    mod.inputFocus('.wraper_l .title');
    mod.inputFocus('.wraper_l .content');
});
fml.use(['jquery', 'app/clubAction', 'component/shareTmp', 'ui/alert'], function(){
	var $ = this.jquery;
	var clubAction = this.clubAction;
	var shareTmp = this.shareTmp;
	var alert = this.alert;

	var alertTip = function(content) {
		new alert({
			content: content, 
			width: 370
		});
	}

	var preCbk = function() { $('.add_pic').html('上传图片中<em class="cl_i_upload">&nbsp;</em>'); }
	clubAction.uploadPic('.add_con', function(res){
		$('.add_pic').html('<em>+&nbsp;</em>添加图片');
		if (res.code) {
			alertTip(res.msg);
			return false;
		}
		var data = {
			type: 2,
			tContent: '',
			pid: res.pic_id
		}
		res.isPic = true;
		var $main_con = $('.main_con');
		if ($main_con.find('.item').length == 0){
			res.hide_up = 'v_hidden';
		} else {
			res.hide_up = '';
			$main_con.find('.item').last().find('.arrow_down').removeClass('v_hidden');
		}
		var tpl = shareTmp('addCon', res);
		$main_con.append(tpl).find('.item').last().data(data).find('textarea').focus();
	}, preCbk);
});

fml.use(['jquery', 'app/sharePost', 'component/shareTmp', 'ui/dialog', 'app/checkLogin'], function(){
	var $ = this.jquery;
	var dialogShow = this.sharePost.dialogShow;
	var shareTmp = this.shareTmp;
	var dialogUI = this.dialog;
	var check = this.checkLogin;

	$('.add_goods').click(function(){
		if (!check()) return false;
		var tpl = shareTmp('shareGoodsLinkTpl');
		var shareGoodsDia = new dialogUI({ title: "分享宝贝", content: tpl, isOverflow: false });
        $("#addGoodsSubmit").on("click",function(){
			var goods_url = $(".add_goods_url").val();
			var cbk = function(res, goods_url){
				if (!res) return;
				res.isPic = false;
				var data = {
					type: 7,
					goodsID : res.data.gInfo.goodsID,
					tContent : '',
					goods_pic_url : res.data.gInfo.image,
					goods_title : res.data.gInfo.title 
				}
				var $main_con = $('.main_con');
				if ($main_con.find('.item').length == 0){
					res.hide_up = 'v_hidden';
				} else {
					res.hide_up = '';
					$main_con.find('.item').last().find('.arrow_down').removeClass('v_hidden');
				}
				var tpl = shareTmp('addCon', res);
				$main_con.append(tpl).find('.item').last().data(data).find('textarea').focus();
				shareGoodsDia.drive.destroyModel();
			}
			dialogShow.goodsAjax(goods_url, cbk);
        });
	})
});

fml.use('jquery', function($){
	var _hideArrow = function($prev, $obj) {
		if ($prev.find('.arrow_up').hasClass('v_hidden')){
			$prev.find('.arrow_up').removeClass('v_hidden');
			$obj.find('.arrow_up').addClass('v_hidden');
		}
		if ($obj.find('.arrow_down').hasClass('v_hidden')) {
			$prev.find('.arrow_down').addClass('v_hidden');
			$obj.find('.arrow_down').removeClass('v_hidden');
		}
	}
	$('.main_con').on('click', '.arrow_up', function(){
		var $pObj = $(this).parents('.item');
		var $prev = $pObj.prev();
		$pObj.insertBefore($prev);
		_hideArrow($prev, $pObj);
		
	}).on('click', '.arrow_down', function(){
		var $pObj = $(this).parents('.item');
		var $next = $pObj.next();
		$next.insertBefore($pObj);
		_hideArrow($pObj, $next);	
	})
})

fml.define('page/club/newTopic', ['jquery', 'ui/alert', 'app/checkLogin', 'app/clubApi'], function(require, exports){
	var $ = require('jquery');
	var alert = require('ui/alert');
	var check = require('app/checkLogin');
	var clubApi = require('app/clubApi').clubApi;

	var alertTip = function(content) {
		new alert({
			content: content, 
			width: 370
		});
	}
	
	var $wraper_l = $('.wraper_l');

	$('.main_con').on('click', '.cl_i_close', function(){
		$(this).parents('.item').remove();
	})

	var $hint = $wraper_l.find('.hint_msg');
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
	$('.wraper_l .title').on('keydown', function(){
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
		var bid = $('.catalog').val();
		if (bid == 0) {
			alertTip('类别不能为空哦~');
			isAjax = false;
			return;
		}
		if (aTitle.length == 0) {
			alertTip('标题不能为空哦~');
			isAjax = false;
			return;
		}
		var tids = [];
		$wraper_l.find('.item').each(function(){
			var dt = $(this).data();
			var $txt = $(this).find('textarea');
			var content = $.trim($txt.val());
			if(content == $txt.attr('placeholder')) content = '';
			dt.tContent = content;
			tids.push(dt);
		})
		if (tids.length > 20) {
			alertTip('图片或者宝贝不能超过20个哎~~');
			isAjax = false;
			return;
		}
		var data = {
			'bid' : bid,
			'aTitle' : aTitle,
			'aDesc' : aDesc,
			'tids' : tids
		}
		$.post('/aw/club/create', data, function(res){
	//	clubApi('create', data, function(res){
			if (res.code) {
				alertTip(res.msg);
				isAjax = false;
				return;
			}
			location.href = '/club/single/' + res.data.article_id;
		}, 'json').error(function(){
			isAjax = false;
		});
	})
})
