fml.define('lm/page/agreement' , ['jquery'] , function(require){
	var $ = require('jquery');
	$('.submit_btn').click(function(){
		$.ajax({
			url:'/aj/announce/register',
			type:'post',
			dataType:'json',
			success: function(data){
				if (data.code != 0) {
					return alert(data.msg);
				}else{
					location.href = data.data.r;
				}
			},
			error: function(){
				return alert('系统错误');
			}
		})
	});
});