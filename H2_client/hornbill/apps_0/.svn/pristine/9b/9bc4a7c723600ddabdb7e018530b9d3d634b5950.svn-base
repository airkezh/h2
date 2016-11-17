function huanji(){
	return this;
}
var controlFns = {
	1 : function(){
		var mSelf = this;
		var php = {};
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var params = {
				'title' : '美丽说30天时尚换季专场',
				'text' : '2013秋冬趋势最完整版，9月1日10：00起，美丽说连续30天强强放送时尚换季秀，邀你坐在最前排。电脑观众请扫二维码；手机观众点击观看时尚大片',
				'pic' : {
					'weixin' : data.PICTURE_URL + 'images/wap/activity/huanji/share_weixin_friends4.jpg',
					'weixin_timeline' : data.PICTURE_URL + 'images/wap/activity/huanji/share_weixin_friends4.jpg',
					'default' : data.PICTURE_URL + 'images/wap/activity/huanji/share_pic3.jpg'
				},
				'url' : 'http://meilishuo.com/u/EJC2WB'
				};
				var shares = wapMod.shareTo(mSelf.req , params);
				data.share = shares;
				data._CSSLinks = ['activity/huanji'];
				mSelf.render('activity/huanji.html' , data);
		});
	}
};
exports.__create = controller.__create(huanji , controlFns);
