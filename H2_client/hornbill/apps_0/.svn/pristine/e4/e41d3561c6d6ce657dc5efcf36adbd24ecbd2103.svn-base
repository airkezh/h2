function mlsmapinfo() {
	return this;
}
var controlFns = {
	'index' : function(){
		return this.mlsitemap();
	},
	'mlsitemap' : function(){
		var php = {
			'bookinfo' : '/mlsmap/Bookinfo',
			'shareitem' : '/mlsmap/ShareIteminfo',
			'shopinfo' : '/mlsmap/Shopinfo'
		};
		var page = this.readData('page',this.req.__get, 0)|0;
		
        var mSelf = this;
        this.setDefaultData(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){

        	//获取分页总数
			data.groupPg = {};
			data.groupPg.total_num = 1000;
			data.groupPg.current_page = page;
			data.groupPg.page_size = 10;

			data.img = mSelf.readData('img',mSelf.req.__get, 0);
			data._CSSLinks = ['mlsmap'];
			mSelf.render('mlsitemap.html' , data);
        });
    },
}
exports.__create = controller.__create(mlsmapinfo, controlFns);