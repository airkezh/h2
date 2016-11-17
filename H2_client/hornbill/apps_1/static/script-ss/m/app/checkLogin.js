fml.define('m/app/checkLogin' , [] , function(require , exports){
	return function (){
		if(Meilishuo.config.user_id == 0){ 
			window.location.href = '/user/login'
			return false;
		}
		return true; 
	}
});
