function macaron(){
	return this;	
}
var controlFns = {
	'page' : function(){
		var php = {
			'logo' : '/customactivity/CustomActivity_tuesday_img?actName=macarons'	
		}
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '马卡龙色强势来袭 - 美丽说';
			data._CSSLinks = ['activity/macaron'];
			data.noBasecss = true;
			//base.var_dump(data.logo, false, 5);
			mSelf.render('activity/macaron/macaron.html' , data);	
		});	
	},
	'goods' : function(){
		var page = this.readData('page',this.req.__get, 0)|0;
		var php = {
			'pink' : '/customactivity/CustomActivity_tuesday?color=pink&actName=macarons',
			'green' : '/customactivity/CustomActivity_tuesday?color=green&actName=macarons',
			'yellow' : '/customactivity/CustomActivity_tuesday?color=yellow&actName=macarons',
			'purple' : '/customactivity/CustomActivity_tuesday?color=purple&actName=macarons',
			'blue' : '/customactivity/CustomActivity_tuesday?color=blue&actName=macarons',
			'logo' : '/customactivity/CustomActivity_tuesday_img?actName=macarons'
		};	
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.pageTitle = '马卡龙色强势来袭 - 美丽说';
			data._CSSLinks = ['activity/macaron'];
			data.macaronInfo = {}
			data.macaronInfo.pink = data.pink;
			data.macaronInfo.green = data.green;
			data.macaronInfo.yellow = data.yellow;
			data.macaronInfo.blue = data.blue;
			data.macaronInfo.purple = data.purple;

			mSelf.render('activity/macaron/macaron_con.html' , data);	
		});	
	}
};
exports.__create = controller.__create(macaron , controlFns);
