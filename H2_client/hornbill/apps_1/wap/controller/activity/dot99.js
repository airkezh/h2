function dot99(){
		return this;
}
var controlFns = {
	download : function(params){
		if ('share' == params) return this.share()
		var mSelf = this;
		var php = {};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/dot99'];
			mSelf.render('activity/dot99/download.html' , data);
		});
	},
	share : function(){
		var mSelf = this;
		var php = {};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var params = {
				'title' : '0.99元限量抢购韩国有机水果润肤霜！',
				'text' : {
					'weixin' : '0.99元尝鲜价，限量抢购韩国有机水果润肤霜。下载美丽说即享抢购特权！',
					'weixin_timeline' : '0.99元尝鲜价，限量抢购韩国有机水果润肤霜。下载美丽说即享抢购特权！',
					'default' : '0.99元尝鲜价，限量抢购韩国有机水果润肤霜。扫描二维码，下载美丽说APP即可享受抢购特权！'
				},
				'pic' : {
					'weixin' : data.PICTURE_URL + 'images/wap/activity/dot99/share_weixin_friends.jpg',
					'weixin_timeline' : data.PICTURE_URL + 'images/wap/activity/dot99/share_weixin_friends.jpg',
					'default' : data.PICTURE_URL + 'images/wap/activity/dot99/share_others3.jpg'
				},
				//'url' : 'http://mlab2.meilishuo.com/goto/open/?url=meilishuo%3A%2F%2FopenURL.meilishuo%3Fjson_params%3D%257B%2522url%2522%253A%2522http%253A%252F%252Fmlab2.meilishuo.com%252Factivity%252Fdot99%252Fdownload%252Fshare%2522%252C%2522require_app_info%2522%253A%25221%2522%252C%2522inApp%2522%253A%25221%2522%257D&apk=%2Fu%2FEIeaMh%20&bg=http%3A%2F%2Fmlab2.meilishuo.com%2Factivity%2Fdot99%2Fdownload%2F&bg2=http%3A%2F%2Fwww.meilishuo.com%2Fbiz%2Fhuodong%2Fdot99%2F'
				'url' : 'http://m.meilishuo.com/goto/t/dot99'
			};
			var shares = wapMod.shareTo(mSelf.req , params);
			data.share = shares;
			data._CSSLinks = ['activity/dot99'];
			mSelf.render('activity/dot99/share.html' , data);
		});
		
		
		
		}
};
exports.__create = controller.__create(dot99 , controlFns);
