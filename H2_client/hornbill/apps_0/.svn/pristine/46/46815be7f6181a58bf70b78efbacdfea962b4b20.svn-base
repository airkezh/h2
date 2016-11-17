fml.define('page/huodong/exo_lottery' , ['jquery','app/checkLogin','app/checkLogin','ui/alert'] , function(require , exports){
	var login = require('app/checkLogin');
	var Alert = require('ui/alert');
	alert = function(msg){
		return new Alert({
			width:380,
			content:msg,
			discover:true
		})
	}
	$('#draw').click(function(){
		if(!login()) return false;
		$.ajax({
			url:'/aj/huodong/exo_draw_lottery',
			dataType:'json',
			type:'post',
			success: function(data){
				alert(data.msg);
			},
			error: function(){
				alert('系统错误，请稍后重试');
			}
		});
	})
});
