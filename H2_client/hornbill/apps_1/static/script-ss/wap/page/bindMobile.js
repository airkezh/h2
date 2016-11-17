fml.use(['wap/app/bindMobile'] , function(){
	switch(Meilishuo.config.controller){
		case 'bind_mobile_bind':
			this.bindMobile.bindMobile();
			break;
		case 'bind_mobile_change':
			this.bindMobile.bindMobile();
			break;
		default:
			break;
	}
});

fml.define('wap/page/bindMobile' , [] , function(){});