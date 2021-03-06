function vip_data(){
	return this;
}
var controlFns = {
	'index' : function(p){
		var php = {
			'connect_weixin': '/connect/weixin?type=1',
			'weixinUserInfo' : 'vip::/wish/getList?type=weixin&frame=1&size=20',
			'appUserInfo' : 'vip::/wish/getList?frame=1&size=40'
		}
		var wapMod = base.loadModel( 'wap/tools.js' );
		var self = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// 微信互联
			if(data.os.weixinBrowser) {
				connectWX(this, data);
			}

			//分享
			var params = { 
				'title' : '2015美丽大事记【末页有惊喜】',
				'text' : '以前你可能从来不知道，她比你想象中爱你...',
				'pic' : 'http://d01.res.meilishuo.net/pic/_o/7f/07/a7baf36e259c4456921e1f54ff80_200_200.cj.png',
				'url' : 'http://pages.w.meilishuo.com/cooper/169401'
			};
			data.share = wapMod.shareTo( this.req, params,['weixin_timeline','weixin']);

			data.XR = true;
			data._CSSLinks = ['vip_data'];
			data.use_rem_screen = true;
			data.pageTitle = '15年美丽大事记';

			self.render('vip_data.html',data);

		});
	},
	'aj' : function(params){
		var php = {
			'dream' : 'vip::/wish/create'
		}
		this.ajaxTo(php[params]);
	}
	
};

var connectWX = function(mSelf, data){
    if (data.connect_weixin && data.connect_weixin.redirect) {
        return mSelf.redirectTo(data.connect_weixin.redirect, true);
    }
}
exports.__create = controller.__create(vip_data , controlFns);
