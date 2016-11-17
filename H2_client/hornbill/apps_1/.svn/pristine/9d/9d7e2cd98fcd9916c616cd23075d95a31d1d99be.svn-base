function taobaoback(){
		return this;
}
var controlFns = {
	find : function(){
		var mSelf = this;
		var php = {
			'setPersonal' : '/setting/setting_personal',
			'isTaobaoUser' : '/connect/is_taobao_connect_user'
		};
		var access_token = this.readData('access_token', this.req.__get, '');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.access_token = access_token;
			data._CSSLinks = ['activity/taobaoback'];
			mSelf.render('activity/taobaoback.html' , data);
		});
	},
	reg : function(args){
		var mSelf = this;
		this.ajaxTo('/register/register_' + args);
	},
	'set' : function(args){
		var php = {
			'findUserBack' : '/connect/Taobao_account_update_m'
		};
		this.ajaxTo(php[args]);
	}
};
exports.__create = controller.__create(taobaoback , controlFns);
