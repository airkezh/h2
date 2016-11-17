fml.define('app/huodong/520coupon' , ['jquery','ui/alert','app/checkLogin'] , function(require, exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	var Alert = require('ui/alert');
	var alert = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	}
	function reload(params){
		var search = location.search.substr(1);
		search = search.replace(/\&{0,1}anchor\=[^\&]*/g,'');
		for(var i in params){
			search += '&'+i+'='+params[i];
		}
		location.href = location.href.split('?')[0].split('#')[0] + '?' + search;
	}
	var anchor = location.search.match(/anchor=([^\&]+)/);
	if(anchor){
		location.href = location.href.split('#')[0]+'#'+anchor[1]
	}
	exports.coupon = function(){
		$('.get_coupon').click(function(){
			if(!check()) return false;
			var self = $(this);
			coupon_id = self.attr('data-code');
			type = self.attr('data-type');
			$.ajax({
				url:'/aj/huodong/May_sale_coupon_get',
				data:{
					type_coupon:0,
					type:'pc',
					coupon:type,
					code:coupon_id
				},
				type:'post',
				dataType:'json',
				success: function(data){
					var a = alert(data.msg);
					if(!data.code){
						a.onSure(function(){
							reload({ 'anchor':'coupon' });
						});
					}
				},
				error:function(){
					alert('系统繁忙，请稍后再试');
				}
			})
		});
	}
});
