function new_temp(){
	return this;
}
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	/* 店铺首页 */
	'index' : function(args){
		this.debugSnake({target : 'longchi.rdlab'});
		var php = {
			'connect_weixin' : '/connect/weixin'
			,'tempInfo' : '/weixin/weixin_mall_general_special_page'
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.use_rem_screen = true;
			data.cid = this.readData('cid',this.req.__get, '17247');
			if( data.tempInfo && data.tempInfo.is_connect == 1 ){
				wapMod.connectWX(this, data);
			}
			data.types = 1;
			data.share = true;
			data.pageTitle = '你暖了，世界才暖';
			data._CSSLinks = ['wx_new/new_temp'];
			this.render('wx_new/new_temp.html' , data);
		})
	}
};
exports.__create = controller.__create(new_temp , controlFns);
