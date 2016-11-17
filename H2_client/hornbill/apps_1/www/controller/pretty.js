function pretty(){
	return this;	
}
var controlFns = {
	'index' : function(vid){
		var page = this.readData('page',this.req.__get, 0)|0;
		var cid = this.readData('cid',this.req.__get, '');
		var eid = this.readData('eid',this.req.__get, '');
		var vid = vid || this.readData('vid',this.req.__get, '');
		this.req.__get.vid = vid
		var php = {
			'volume_head' : '/goods/volume_head',
			'volume_keywords' : '/goods/volume_keywords',
			'volume_lite' : '/goods/volume_lite',
			'poster0' : '/goods/volume_poster'
		}
		var mSelf = this;
        if(cid == 'all') delete mSelf.req.__get.cid;
        if(eid == 'all') delete mSelf.req.__get.eid;
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//console.log(data.volume_lite);
			if(!data.volume_head) return mSelf.errorPage();
			data.pageTitle = data.volume_head.prefix + data.volume_head.volumeName + ' - 美丽说';
			data.meta_description = data.volume_head.detail + ' - 美丽说';
			data._CSSLinks = ['pretty'];
			// true 宽屏 
			data.fluid = true;
			data.groupPg = {}; 
			data.groupPg.total_num = data.poster0.totalNum;
			data.groupPg.current_page = page; 

			data.headTag = 'pretty'
			
			mSelf.render('pretty/pretty.html' , data);	
		});	
	}
};
exports.__create = controller.__create(pretty , controlFns);
