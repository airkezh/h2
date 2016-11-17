function project(){
	return this;	
}
var controlFns = {
	'audio' : function(args){
		var php = {
			'audio' : '/customactivity/CustomActivity_wap_special_header' 
			,'goods' : '/customactivity/CustomActivity_wap_special_main'
			,'bot' : '/customactivity/CustomActivity_wap_special_bottom'
			, 'share' : '/customactivity/CustomActivity_wap_special_share'
		}
		delete this.req.__get.header
		, mSelf = this
		//, u = mSelf.req.headers['user-agent']
		
		mSelf.setMDefault(php);
		mSelf.bridgeMuch(php);
		mSelf.listenOver(function(data){
			if (!data.audio) return this.errorPage()
			var wapMod = base.loadModel('wap/tools.js')

			data.supportShare = wapMod.supportShare(mSelf.req) 
			if (!data.share.data || !data.share.data.length){
				data.supportShare = false
				}
			data.pageTitle = '专题活动 - 美丽说';
			//base.var_dump(data.goods, false, 8);
			data._CSSLinks = ['activity/project'];
			mSelf.render('activity/project/project.html' , data);
		});
	}
};
exports.__create = controller.__create(project , controlFns);
