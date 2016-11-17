fml.define('page/shop_comment' , ['jquery','ui/alert'] , function(require , exports){
	$('.j-dis').click(function(event) {
		var _this = $(this)
		_this.parent().hide();
		if (_this.html().match(/发表评价/)) {
			_this.parents('.c_item').next().show(800);
		};
	});
	
	$('.send_btn').click(function(){
		var _this = $(this),
			_form = _this.parents('form'),
			_att = _form.find('.j-wrong .red_f'),
			_level = _form.find('input[name="comment_level"]:checked'),
			data = {};
		var pnl = _form.parent('.comment_wrapper')
			,btn = pnl.prev().find('.j_dis_btn')
		if (!_level.length) {
			_att.html('*请先选择评分哦');
			return;
		}
		data.level = _form.find('input[name="comment_level"]:checked').parent().attr('class').replace(/level/,'');
		data.twitter_id = _this.attr('tid');
		data.goods_id = _this.attr('gid');
		data.content = _form.find('textarea').val();
		data.anonymous = _form.find('.is_anonymous').attr('checked') ? 1 : 0 ;
		data.order_id = fml.vars.oid;
		if (data.content === '亲，姐妹们的购物评价大会开始了，您的评价对大家非常的重要，快来讲讲宝贝的质量、穿上的感觉以及商家服务。评价的越好，越详细的同学就可能获得冬日美妆大礼一份哦。') {
			data.content = '';
		};
		if (data.content.length > 500) {
			_att.html('*输入长度不得大于500字哦');
			return;
		}else if (data.content.length <10){
			_att.html('*输入长度不得小于10字哦');
			return;
		}else{
			_att.html('');
		}
		$.post('/aj/comment_new/new',data,function(msg){
			if (msg.error_code) {
				_att.html(msg.message);
			}else{
				var Alert = require('ui/alert')
				var alertDialog = new Alert({
					width : 370,
					title : '姐妹们的购物评价大会',
					content : '感谢您的评论，我们会选出对姐妹们最有用的评论进行发奖。中奖信息会以私信的形式发出，谢谢啦！',
					discover : true
				});
				alertDialog.onSure(function(){
					btn.hide()
					pnl.hide(500);
					var nextLiBtn = pnl.next().find('.j_dis_btn .j-dis').trigger('click')
				});
			}
		},'json')
	});
	$('.comment_wrapper textarea').focus(function(event) {
		var _this = $(this),
			_str = '亲，姐妹们的购物评价大会开始了，您的评价对大家非常的重要，快来讲讲宝贝的质量、穿上的感觉以及商家服务。评价的越好，越详细的同学就可能获得冬日美妆大礼一份哦。';
		if ($.trim(_this.val()) === _str) {
			_this.val('').removeClass('gray');
		};
	}).blur(function(event) {
		var _this = $(this),
			_str = '亲，姐妹们的购物评价大会开始了，您的评价对大家非常的重要，快来讲讲宝贝的质量、穿上的感觉以及商家服务。评价的越好，越详细的同学就可能获得冬日美妆大礼一份哦。';
		if (!$.trim(_this.val()).length) {
			_this.val(_str).addClass('gray');
		};
	});
});
