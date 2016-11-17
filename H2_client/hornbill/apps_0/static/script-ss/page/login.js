/*
fml.use(['jquery' , 'app/checkLogin'] , function(){
	var $ = this.jquery;	
	var check = this.checkLogin;
	$('#mymedal').live('click' , function(){
		if(check()){
			location.href = '/medal/u/' + Meilishuo.config.user_id;
		}
	});
});
*/
fml.use(['app/login'] , function(){
	var login = this.login;
	login.showLogin();
});
fml.define('page/login' , ['jquery'] , function(){
});
