function user(){
	return this;	
}
/* 个人中心 */
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	'index' : function(args){
		var status = this.readData('status',this.req.__get, 0)|0;
		var uid = this.readData('uid',this.req.__get, 0)|0;
		var php = {
			// 'userInfo_wx':'/connect/wxinfo',
			'connect_weixin' : '/connect/weixin'
			,'order_status' : 'doota::/wx/Order_list_classify_statistic'
			,'uInfo' : '/Weixin/Weixin_profile_info?userid=' + uid
		}
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			wapMod.connectWX(this, data);
			data.orderStatus = status;
			/*底部导航*/
			data.tabShow = 1;
			data.tabIndex = 4;
			data.share = false;
			data.use_rem_screen = true;
			data.pageTitle = '个人中心';
			data._CSSLinks = ['wx_new/user'];
			this.render('wx_new/user.html', data);
		});
	}
};
exports.__create = controller.__create(user , controlFns);
