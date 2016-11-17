function xuanguan_new (){
	return this;	
}
var controlFns = {
	'index' : function (){
		var pstrc = this.readData('pstrc',this.req.__get, 0);
		var asid = this.readData('asid',this.req.__get, 0);
		var php = {	
			'pageInfo' : '/commerce/middlepage_banner?pstrc='+pstrc+'&asid='+asid,
			'tabInfo' : '/customactivity/CustomActivity_common_tool_single?id=xuanguan_pc&cid=13523'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.pageInfo) return this.errorPage();
			data.pageTitle = data.pageInfo && data.pageInfo.pageTitle;
			data.pstrc = pstrc;
			data.asid = asid;
			data._CSSLinks = ['activity/xuanguan'];
			this.render('activity/xuanguan.html', data);		
		});
	},
	'cps' : function(){
		var pstrc = this.readData('pstrc',this.req.__get, 0);
		var asid = this.readData('asid',this.req.__get, 0);
		var php = {	
			'pageInfo' : '/commerce/middlepage_banner?pstrc='+pstrc+'&asid='+asid
			, 'navigate_top':'/alliance/navigate_top'
			,'tabInfo' : '/customactivity/CustomActivity_common_tool_single?id=xuanguan_pc&cid=13523'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function (data){
			if(!data.pageInfo) return this.errorPage();
			data.pstrc = pstrc;
			data.asid = asid;
			data.pageTitle = data.pageInfo && data.pageInfo.pageTitle;
			data._CSSLinks = ['activity/xuanguan'];
			this.render('activity/xuanguan_cps.html', data);	
			
		});
	}
};
exports.__create = controller.__create(xuanguan_new , controlFns);