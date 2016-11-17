function aj() {
    return this;
}
var controlFns = {
    sendcode : function(params){
		var php = {
			'sBind' : '/user/Validate_sms_captcha_without_phone',
			'sCode2' : '/user/Send_sms_captcha',
			'sCode' : '/user/Send_sms_captcha_without_phone',
			'changeBind' : '/user/Change_bind_mobile',
			'sendBind' : '/setting/setting_bind_mobile',
			'sendCode' : '/setting/setting_send_mob_active'
		}
		this.ajaxTo(php[params]);
	}
}

exports.__create = controller.__create(aj, controlFns);
