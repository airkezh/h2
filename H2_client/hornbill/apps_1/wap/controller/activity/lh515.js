function lh515(){
	return this;
}

var controlFns = {
	'main' : function(args){
		// this.debugSnake({'target':'devlab1'});

		// var pageShareURL = encodeURIComponent('/biz/huodong/nissan/');
		//var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + pageShareURL + '&bg='+ pageShareURL + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		//var locationUrl = "http://" + this.req.headers.host;
		//var wapMod = base.loadModel('wap/tools.js');
		var mSelf = this;
		var php = {
			'connect_weixin' : '/connect/weixin?type=1' //拉用户信息
		};
		var wapMod = base.loadModel('wap/tools.js');
        var os = wapMod.uaos(this.req, wapMod.getMobToken(this.req,this.res));
        var mlsApp = os.mlsApp;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){	

            // var pengyou = '美丽说5.15夏日狂欢来袭！';
            // var pengyouquan = "［5.15夏日狂欢］美丽说海量夏装全站首发 5折优享 10亿现金券只为你";
            // var weibo = "美丽说5.15夏日狂欢来袭！";
            // var p = mSelf.siteInfo.PICTURE_URL + "images/wap/promotion/sale_1505/share_bg3.jpg";
            // var sp = mSelf.siteInfo.PICTURE_URL + "images/wap/promotion/sale_1505/share_bg3.jpg";
            // var c = "美丽说海量夏装初上新 5折献礼 10亿现金券等你拿";
            // var params = {
            //     'title' : {
            //         'weixin' : pengyou,
            //         'weixin_timeline' : pengyouquan,
            //         'default' : pengyouquan
            //     },
            //     'text' : {
            //         'weixin' : c,
            //         'weixin_timeline' : c,
            //         'weibo' : weibo,
            //         'txweibo' : weibo,
            //         'default' : c
            //     },
            //     'pic' : {
            //         'weixin' : sp,
            //         'weixin_timeline' : sp,
            //         'default' : p
            //     },
            //     'url' : locationUrl + '/promotion/sale_1505/mv/?isFromShare=true'
            // };

			// var params = {
			// 		'title' : '[玛驰派福利啦] 为时尚美色态度投喜欢，赢美丽说现金券',
			// 		'text' : '[玛驰派福利啦] 为时尚美色态度投喜欢，赢美丽说现金券',
			// 		'pic' : {
			// 			"weixin" : sp,
			// 			"weixin_timeline" : sp,
			// 			"default" : sp
			// 		},
			// 		'url' : shareURL
			// 	};

			// data.share = wapMod.shareTo(mSelf.req , params,['weixin_timeline', 'weixin']);
			var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > 0
			if(weixinBrowser) connectWX(mSelf, data);
			data.isWx = weixinBrowser;
			data.mlsApp = mlsApp;
            data.pageTitle = '515鹿晗活动';
			data.headTag = 'luhan';
			data._CSSLinks = ['activity/lh515'];
			mSelf.render('activity/luhan/main.html' , data);
		});
	}
}

var connectWX = function(mSelf, data){
	if(data.connect_weixin && data.connect_weixin.redirect)
		return mSelf.redirectTo(data.connect_weixin.redirect ,true);	
}

exports.__create = controller.__create(lh515 , controlFns);
