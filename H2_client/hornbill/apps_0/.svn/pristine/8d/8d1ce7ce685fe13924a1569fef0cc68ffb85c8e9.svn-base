function lorealBox(){
	return this;
}
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'hot'
		this[args]()
	},
	hot : function(){
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/lorealBox/hot/') + '&bg='+ encodeURIComponent('/goto/download/') + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var php = {
			'lorealBox' : '/customactivity/CustomActivity_oulaiya_beautybox'
		};
		var mSelf = this;

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');

			/*share*/
			var params;
			if(data.lorealBox.data[0].is_start == 0){
				params = {
					'title' : '520美丽说&欧莱雅集团联手打造 顶级奢宠美盒',
					'text' : '#爱的礼物•告白赢大牌# 美丽说联手欧莱雅集团独家推出五月小美盒，网罗兰蔻、阿玛尼、植村秀、碧欧泉四大顶级美妆品牌！精心为你定制最超值奢华美盒！快来看看吧~',
					'pic' : {
						"weixin" : data.PICTURE_URL + "images/wap/activity/lorealBox/share3.jpg",
						"weixin_timeline" : data.PICTURE_URL + "images/wap/activity/lorealBox/share3.jpg",
						"default" : data.PICTURE_URL + "images/wap/activity/lorealBox/share4.jpg"
					},
					'url' : shareURL
				};
			}
			else {
				params = {
					'title' : '520美丽说&欧莱雅集团联手打造 顶级奢宠美盒',
					'text' : '#爱的礼物•告白赢大牌# 美丽说联手欧莱雅集团独家推出五月小美盒，网罗兰蔻、阿玛尼、植村秀、碧欧泉四大顶级美妆品牌！精心为你定制最超值奢华美盒！快来看看吧~',
					'pic' : {
						"weixin" : data.PICTURE_URL + "images/wap/activity/lorealBox/share3.jpg",
						"weixin_timeline" : data.PICTURE_URL + "images/wap/activity/lorealBox/share3.jpg",
						"default" : data.PICTURE_URL + "images/wap/activity/lorealBox/share4.jpg"
					},
					'url' : shareURL
				};
			}
			
			data.is_ended = data.lorealBox.data[0].end_time < new Date().getTime()/1000;
			data.share = wapMod.shareTo(mSelf.req , params);
			data.pageTitle = '爱的礼物 为你而来';
			data.headTag = 'lorealBox';
			data._CSSLinks = ['activity/lorealBox'];
			mSelf.render('activity/hot.html' , data);
		});
	}
}
exports.__create = controller.__create(lorealBox , controlFns);
