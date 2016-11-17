function a91(){
	return this;
}
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'a91'
		this[args]()
	},
	a91 : function(){
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/a91/mz420/') + '&bg='+ encodeURIComponent('/activity/a91/mz420/') + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var php = {
			'temai1' : '/Wapactivity/Activity_goodsV3?ac_id=523',
			'temai2' : '/Wapactivity/Activity_goodsV3?ac_id=525',
			'temai3' : '/Wapactivity/Activity_goodsV3?ac_id=527',
			'temai4' : '/Wapactivity/Activity_goodsV3?ac_id=529',
			"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info",
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_a91_coupon',
			'couponData' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=0&type=wap',
			'coupon_100' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=1&type=wap'

		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			/*判断版本是否支持优惠券*/
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
			if(!data.coupon_100 || !data.couponData){
				data.has_coupon = true;
			}

			data.cur_time = new Date().getTime()/1000;
            data.start_time = 1398096001;
            data.end_time = 1398441599;
            if( data.cur_time < data.start_time ){
                data.status = 'nostart';
            }else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
                data.status = 'saling';
            }else{ 
                data.status = 'end';    
            }
			/*share*/
			var params = {
					'title' : '【美丽说421春游季】春夏最IN美妆2折起，折上满减享不停',
					'text' : '【美丽说421春游季】春夏最IN潮妆2折起，折上满减双优惠，现金福利抢不停！',
					'pic' : data.PICTURE_URL + "images/huodong/a91420/mz_wap_share.jpg",
					'url' : shareURL
				};
			data.share = wapMod.shareTo(mSelf.req , params);
			data.pageTitle = '421春夏最IN美妆';
			data._CSSLinks = ['activity/a91'];
			mSelf.render('activity/a91.html' , data);
		});
	},
	a91:function(){


		
	}
}
exports.__create = controller.__create(a91 , controlFns);
