fml.use(['wap/app/login'] , function(){
	var login = this.login;
	login.showLogin();
});
fml.define('wap/page/login' , ['wap/zepto/touch'] , function(){
	var refer = fml.vars.refer

	$('#weiXin').click(function(){
		$.ajax({
			url: '/aj/wx/connect'
			, data: {
				jumpUrl: refer ? refer : '/welcome'	
			}
			, dataType: 'json'
			, type: 'get'
			, success : function(data){

				// console.log(JSON.stringify(data))

				if(data.redirect)
					window.location.href = data.redirect

			}
			, error:function(data){
				window.location.href = '/welcome'
			}
		})
	})


});
