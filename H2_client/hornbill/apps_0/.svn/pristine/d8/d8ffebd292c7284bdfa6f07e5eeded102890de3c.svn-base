function beautyBox(){
	return this;	
}
var controlFns = {
	hot : function(id){
		var access_token = this.readData('access_token' ,this.res.__get ,0);
		var mSelf = this;
		var php = {
			'magicBoxMain' : '/wapbiz/magicbox_main?id='+id+'&type=mob&access_token='+access_token,
			'share' : '/wapbiz/magicbox_share?id='+id
		};
		var wapMod = base.loadModel('wap/tools.js');
		var os = wapMod.uaos(this.req);
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			//判断是否最新版
			data.isNewest = wapMod.isNewest(mSelf.req , data.os.android ? '3.7.5' : '3.0.6');
			data.boxPage = data.magicBoxMain.boxPage;
			if ( !data.os.phone && !data.os.android) return mSelf.redirectTo('//www.meilishuo.com/biz/huodong/beautyBox/'+id); 
			data._CSSLinks = ['activity/beautyBox'];
			mSelf.render('activity/beautyBox.html' , data);
		});
	}
};
exports.__create = controller.__create(beautyBox , controlFns);
