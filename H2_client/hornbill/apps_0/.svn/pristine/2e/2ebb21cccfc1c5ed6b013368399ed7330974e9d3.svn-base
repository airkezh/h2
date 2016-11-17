fml.define('wap/page/sq/account' , ['wap/zepto/fastclick', 'wap/ui/confirm', 'wap/ui/alert'] , function(require){
	var confirm = require('wap/ui/confirm')
		, Alert = require('wap/ui/alert')

	var confirmCbk = function(){
		var url = '/aj/sq/release';
		var callback = function(r){
			if(r.msg) {
				var a =  new Alert({
					content : r.msg
					, onClose : function(){
						window.location.reload();
					}
				})
			} 
		}
		$.post(url , {} , callback ,'json');
	}

	$('.release').on('click', function(){
		var c = new confirm({
			content : '确定将美丽说账号【'+ $('.nickname').text() +'】与QQ账号解除绑定吗?'
			, onSure : function(){
				confirmCbk();
			}
			, onCancel : function(){
				return;
			}
		});
	});
});
