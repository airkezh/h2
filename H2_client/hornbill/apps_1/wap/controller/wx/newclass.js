function newclass(){
	return this;	
}
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(args){
		// this.debugSnake({target : 'maoanli.rdlab'});
		var php = {
			'connect_weixin' : '/connect/weixin'
			, 'hotList' : '/weixin/Weixin_mall_rootnav'
			, 'partList' : '/weixin/Weixin_mall_childnav?nid=37'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.tabShow = 1;
			data.tabIndex = 2;
			data.use_rem_screen = true;
			// data.partList = data.partList && data.partList.data;
			data.pageTitle = '分类'
			data._CSSLinks = ['wx_new/newclass'];
			this.render('wx_new/newclass.html' , data);
		})
	},
	'secClassify' : function(){
		// this.debugSnake({target : 'maoanli.rdlab'});
		//var nid = this.readData('nid', this.req.__get, '51');
		var php = {
			'connect_weixin' : '/connect/weixin',
			'classify' : '/weixin/Weixin_mall_childnav'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.pageTitle = this.readData('firstClass', this.req.__get, '分类');
			data.tabShow = 1;
			data.tabIndex = 2;
			data.use_rem_screen = true;
			data._CSSLinks = ['wx_new/secClassify'];
			this.render('wx_new/secClassify.html' , data);
		})

	}
};
exports.__create = controller.__create(newclass , controlFns);