function bedook(){
	return this;
}
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'hot'
		this[args]()
	},
	hot : function(){
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/bedook/hot/') + '&bg='+ encodeURIComponent('/activity/bedook/hot/') + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var php = {
			"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info",
			"bedooke" : "/customactivity/CustomActivity_biduke"
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;

			data.cur_time = new Date().getTime()/1000;
            data.start_time = 1398096000;
            data.end_time = 1398441600;
            if( data.cur_time < data.start_time ){
                data.status = 'nostart';
            }else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
                data.status = 'saling';
            }else{ 
                data.status = 'end';    
            }
			/*share*/
			var params = {
					'title' : '战痘一下，美丽一夏！比度克超值“战痘礼盒”为你折！',
					'text' : '战痘一下，美丽一夏！美丽说联手比度克明星祛痘产品，推出超值夏日“战痘礼盒”，为每天“吃饭睡觉打痘痘”的妹纸们排忧解难！！迎接美艳的夏日， Are you ready?',
					'pic' : data.PICTURE_URL + "images/wap/activity/bedook/share.jpg",
					'url' : shareURL
				};
			data.share = wapMod.shareTo(mSelf.req , params);
			data.pageTitle = '战痘一下，美丽一夏';
			data._CSSLinks = ['activity/bedook'];
			mSelf.render('activity/bedook.html' , data);
		});
	}
}
exports.__create = controller.__create(bedook , controlFns);
