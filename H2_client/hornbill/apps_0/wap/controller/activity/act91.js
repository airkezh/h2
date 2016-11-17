function act91(){
	return this;
}
var controlFns = {
	award : function(params){
		var php = {}
		, mSelf = this

		if(params == 'winners'){
			php = {'winners' : '/customActivity/CustomActivity_wap_91_winner'}
		}
		var app_version = this.readData('app_version',this.req.__get, '')
			, app_mac = this.readData('app_mac',this.req.__get, '') 

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.app_mac = app_mac;
			data.pageTitle = '91安卓市场特权活动 - 美丽说';
			data._CSSLinks = ['activity/act91'];
			if(params == 'userinfo'){
				mSelf.render('activity/act91/userinfo.html' , data);
			}else if(params == 'success'){
				data.success = true;
				mSelf.render('activity/act91/success.html' , data);
			}else if(params == 'fail'){
				data.success = false;
				mSelf.render('activity/act91/success.html' , data);
			} if(params == 'winners'){
				data.winners = data.winners[0];
				mSelf.render('activity/act91/result.html' , data);
			}else{
				mSelf.render('activity/act91/award.html' , data);
			}
		});
	},
	'set' : function(args){
		var php = {
			'submit' : '/customactivity/CustomActivity_wap_91'
		};
		this.ajaxTo(php[args]);
	}
}
exports.__create = controller.__create(act91 , controlFns);
