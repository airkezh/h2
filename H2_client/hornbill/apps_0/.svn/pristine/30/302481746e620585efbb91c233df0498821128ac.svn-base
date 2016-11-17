fml.use('app/cleanMsg' , function(mod){
	if(!Meilishuo.config.is_iPad){
		mod.msgFunc();
	}
});
fml.use('app/at' , function(){
	this('.__atName' , '.atDiv');	
});
fml.use('app/setting' , function(){});
fml.use('app/zeroFollowPop' , function(){
	setTimeout(this, 2000);
});
fml.use(['page/common/shopping_carts','jquery'] , function(){
    var $  			   = this.jquery,
        shopping_carts = this.shopping_carts;
    $('#headLogoutBtn').click(function(){
        shopping_carts.clearCartsNumCache();
        });
});

fml.define('page/common/global_login',[] ,function(){
	/** 风险用户再激活 */
	if(Meilishuo.config.need_active){ window.location.href = "/user/activeAccount/"; }
});
