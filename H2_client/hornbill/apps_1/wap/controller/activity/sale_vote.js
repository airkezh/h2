function sale_vote(){
	return this;	
}

var controlFns = {
	vote : function(){
		var options = [];
		var access_token = this.readData('access_token', this.req.__get,'');
		if(access_token){
			options.push('access_token='+access_token);	
		}
		var type = this.readData('type', this.req.__get,'dress');
		var app_version = this.readData('app_version', this.req.__get,'');
		if(app_version){
			options.push('app_version'+app_version);	
		}

		var mSelf = this;
		var php = {
			'sale_vote_haibao' : '/customactivity/CustomActivity_wap_guimi_haibao'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.access_token = access_token;
			data.type = type;
			data.app_version = app_version;
			data.tokeninfo = options.join('&');
			data._CSSLinks = ['activity/sale_vote'];
			mSelf.render("activity/sale_vote/vote.html" , data);	  
		});
	},
	share : function(){
		var mac = this.readData('mac', this.req.__get,'');
		var mSelf = this;
		var php = {
			'share' : '/customactivity/CustomActivity_wap_share?act_name=guimitequan&app_version=3.7.5',
			'sale_voted_haibao' : '/customactivity/CustomActivity_wap_guimi_voted_list'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mac = mac;
			data._CSSLinks = ['activity/sale_vote'];
			mSelf.render("activity/sale_vote/share.html" , data);	  
		});
	}
};
exports.__create = controller.__create(sale_vote , controlFns);
