fml.use(['app/findPwd'] , function(){
	switch(Meilishuo.config.controller){
		case 'find_pwd_form':
			this.findPwd.init();
			break;
		case 'find_pwd_check':
			this.findPwd.init();
			break;
		case 'find_pwd_send_sms':
			this.findPwd.sendSms();
			break;
		case 'find_pwd_reset':
			this.findPwd.resetPwd();
			break;
		default:
			break;
	}
});

fml.define('page/findPwd' , [] , function(){});

