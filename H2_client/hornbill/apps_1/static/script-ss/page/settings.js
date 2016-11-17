fml.use(['app/settings'] , function(){
	var settings = this.settings;
	switch(Meilishuo.config.controller){
		case 'setPassword':
			settings.setPassword();
			break;
		case 'setPersonal':
			settings.setPersonal();
			break;
		case 'set_addr':
			settings.set_addr();
			break;
		case 'sync':
			settings.sync();
			break;
		// case 'myReport':
		// 	settings.myReport();
		// 	break;
		case 'setAvatar':
			settings.setAvatar();
			break;
		case 'setEmail':
			settings.setEmail();
			break;
		case 'bindMobile':
			settings.bindMobile();
			break;
		case 'biePhone':
			settings.bindMobile();
			break;
		default:
			break;
	}
});

fml.define('page/settings' , [] , function(){});
