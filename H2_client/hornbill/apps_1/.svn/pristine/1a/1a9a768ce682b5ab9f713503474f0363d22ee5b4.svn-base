function kuaiyong(){
	return this;
}
var controlFns = {
	regist : function(params){
		var mSelf = this;
		var php = {};
		var mac = this.readData('mac',this.req.__get, 0);
		var token = this.readData('token',this.req.__get, 0);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mac = mac;
			data.token = token;
			data.headTag = 'regist';
			data._CSSLinks = ['activity/kuaiyong'];
			mSelf.render('activity/kuaiyong/regist.html' , data);
		});
	},
	result : function(params){
		var mSelf = this;
		var php = {'_type' : 'http://snake.meilishuo.com/customactivity/CustomActivity_kuaiyong'};
		var mac = this.readData('mac',this.req.__get, 0);
		var token = this.readData('token',this.req.__get, 0);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mac = mac;
			data.thisType = ({'1' : '4','10' : '3', '30' : '2', '100' : '1'})[data._type.amount];
			data.headTag = 'result';
			data._CSSLinks = ['activity/kuaiyong'];
			mSelf.render('activity/kuaiyong/result.html' , data);
		});
	},
	'set' : function(args){
		var php = {
			'result' : '/customactivity/CustomActivity_kuaiyong_awardinfo',
			'regist' : '/customactivity/CustomActivity_mac_check'
		};
		this.ajaxTo(php[args]);
	},
	back : function(params){
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/kuaiyong'];
			mSelf.render('activity/kuaiyong/back.html' , data);
		});
	}
}
exports.__create = controller.__create(kuaiyong , controlFns);
