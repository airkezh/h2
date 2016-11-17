fml.use(['wap/app/findPwd'] , function(){
	switch(Meilishuo.config.controller){
		case 'find_pwd_form':
			this.findPwd.init();
			break;
		case 'find_pwd_send_email':
			this.findPwd.sendEmail();
			break;
		case 'find_pwd_send_sms':
			this.findPwd.sendSms();
			break;
		case 'find_pwd_reset':
			this.findPwd.resetPwd();
			break;
		case 'find_pwd_success':
			this.findPwd.success();
			break;
		default:
			break;
	}
});

fml.define('wap/page/findPwd' , [] , function(){});