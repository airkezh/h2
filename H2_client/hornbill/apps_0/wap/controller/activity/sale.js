function sale(){
	return this;
}
var controlFns = {
	index : function(args){
		args = (args in controlFns) ? args  : 'mz420'
		this[args]()
	},
    video11 : function(){
        var php = {};
        var mSelf = this;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data._CSSLinks = ['activity/may_sale/video11'];
            data.pageTitle = '美丽说11.11金装装X指南';
            mSelf.render('activity/may_sale/video11.html', data);
        });
    },
    'common_meet' : function() {
        var wapMod = base.loadModel('wap/tools.js')
        var all_cid = this.readData('all_cid' , this.req.__get , '');
        var show_cid = this.readData('show_cid' , this.req.__get , '');
        var cid = this.readData('cid' , this.req.__get , '');
        if(cid){
            all_cid = cid;
            show_cid = cid;
        }
        delete this.req.__get.cid;
        var php = {
            'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid='+ show_cid
            ,'pageData_all' : '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid='+ all_cid
        };
        var ua = this.req.headers['user-agent'];
        var platform = false;
        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }
        var channel = this.readData('channel',this.req.__get, '');
        var param = channel || param
        this.req.__get.channel = param
        var ua = this.req.headers['user-agent'];
        if(/(Android)/i.test(ua)){
            php.apks = '/url/Package_get'
        }
        var mSelf = this;
        var locationUrl = this.req.headers.host + this.req.url
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data.locationUrl = locationUrl

            if(!data.pageData) return mSelf.errorPage();
            //数据整合
            data.pageData.banner_word = data.pageData_all.banner_word;
            data.pageData.pageControl.pt = data.pageData_all.pageControl.pt;
            data.pageData.pageControl.start_time = data.pageData_all.pageControl.start_time;
            data.pageData.pageControl.end_time = data.pageData_all.pageControl.end_time;
            data.pageData.header = data.pageData_all.header;
            data.pageData.footer = data.pageData_all.footer;
            delete data.pageData_all;


            var timeSetting = data.pageData.pageControl;
            if(timeSetting.pt && timeSetting.start_time && timeSetting.end_time){
                data.pt = timeSetting.pt;
                var startTime = new Date(timeSetting.start_time).getTime();
                var endTime  = new Date(timeSetting.end_time).getTime();
                var currDate = new Date();
                var currTime = currDate.getTime();
                data.nowTime = parseInt(currTime/1000);
                if (currTime < startTime) {
                    data.bannerText = "距离返场结束还有";
                    data.endTime = parseInt(startTime/1000);
                } else if (currTime > endTime) {
                    data.bannerText = "活动结束";
                } else if (currTime >= startTime) {
                    data.bannerText = "距离活动结束还有";
                    data.endTime = parseInt(endTime/1000);
                }
            }


            data.pid = mSelf.readData('pid' , this.req.__get , '');
            data.isIphone = platform;
            data._CSSLinks = ['activity/promotion/promotion_poster'];
            data.pageTitle = data.pageData.pageControl.title;
            mSelf.render('activity/promotion/promotion_poster.html' , data);
        });
    },
    meet11 : function(actid) {
        var rootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/meet/";

        var php = {
            'tabsData' : '/customactivity/CustomActivity_common_featured_area?actid=' + (actid ? actid : 17)
        };
        var mSelf = this;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            if (data.tabsData.data) {
                var posters = data.tabsData.data;
                for (var i in posters) {

                    data.firstTabs =posters[i].falls;
                    break;
                }
            }
            data._CSSLinks = ['activity/promotion/meet11'];
            mSelf.render('activity/promotion/meet11.html' , data);
        });
    },
    main11 : function(args) {
        //this.debugSnake({target : 'devlab1'});
        var comStatic = this.req.headers.staticize || this.req.__get.__staticize;
        var php = {
        };
        var isCompleteStatic = false;
        if (comStatic == 1) {
            php.couponInfo = "/customactivity/CustomActivity_coupon_venue?type=mob&name=encore_11";
            isCompleteStatic = true;
        }
        var mSelf = this;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            if (comStatic == 1) {
                var currDate = new Date();
                var picRootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/coupon/";
                if (data.couponInfo) {
                    data.coupons = data.couponInfo.coupon;
                    data.coupons.forEach(function(e,i) {
                        e.bgPic = picRootUrl + "c" + i + ".png";
                        e.btnPic = picRootUrl;
                        if (e.left_amount == 0) {
                            var nextDate = e.next.begin.split(" ");
                            var d = new Date(nextDate[0]);
                            d.setHours(parseInt(nextDate[1]));
                            if (d.getDate() == currDate.getDate()) { //日期相同说明今天还有抢券机会
                                var hours = d.getHours();
                                e.btnPic += hours + ".png";
                            } else { //明天再来
                                e.btnPic += "tomorrow.png";
                            }
                        } else {
                            e.btnPic += "get.png"
                        }
                    });
                }
            }
            data.isCompleteStatic = isCompleteStatic;
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data._CSSLinks = ['activity/promotion/main11'];
            mSelf.render('activity/promotion/main11.html' , data);
        });
    },
    main916 : function() {
        this.debugSnake({target : 'devlab1'});
        var php = {
            "couponInfo" : "/customactivity/CustomActivity_common_promote_venue?type=mob"
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        //this.setMDefault(php);
        this.bridgeMuch(php);
        var picRootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/916/";

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};

            if (!data.couponInfo) {
                data.couponInfo = {"isLogin" : 0};
            }

            data.isLogin = data.couponInfo.islogin == 0 ? false : true;
            //判断按钮状态
            var currDate = new Date();
            data.sTime = currDate.getTime();
            var coupons = data.couponInfo.coupon;
            if (!coupons) {

                data.couponInfo.coupon = {};
                coupons = {
                    1 : {"can_use" : 0, "total_amount" : "", "left_amount" : ""},
                    2 : {"can_use" : 0, "total_amount" : "", "left_amount" : ""},
                    3 : {"can_use" : 0, "total_amount" : "", "left_amount" : ""},
                    4 : {"can_use" : 0, "total_amount" : "", "left_amount" : ""}
                }
                data.couponInfo.coupon = coupons;
            } else {
                for (var i = 1; i < 5; i++) {
                    if (!coupons[i] ) {
                        coupons[i] = {"can_use" : 0, "total_amount" : "", "left_amount" : ""};
                    }
                }
            }


            for (var i in coupons) {
                var coupon = coupons[i];

                //构建图片后缀
                var btnPicSuffix;
                switch(+i) {
                    case 1 : btnPicSuffix = "100"; break;
                    case 2 : btnPicSuffix = "40"; break;
                    case 3 : btnPicSuffix = "80"; break;
                    case 4 : btnPicSuffix = "120";
                }
                coupon.btnPic = picRootUrl;
                switch(coupon.can_use) {
                    case 0 : //可以使用  活动开始前该值也为0
                        if (!coupon.left_amount) { //这个数据为空时，说明活动还没开始
                            coupon.btnPic += "10_btn" + btnPicSuffix + ".jpg";
                        } else if(data.couponInfo.islogin == 0) { //用户没登陆
                            coupon.btnPic += "get_btn" + btnPicSuffix + ".jpg";
                        } else {
                            //立即抢券
                            coupon.btnPic += "get_btn" + btnPicSuffix + ".jpg";
                        }
                        break;
                    case 1 : //抢光
                        var d = new Date(coupon.next.begin);
                        if (d.getDate() == currDate.getDate()) { //日期相同说明今天还有抢券机会
                            var hours = d.getHours();
                            coupon.btnPic += hours + "_btn" + btnPicSuffix + ".jpg";
                        } else { //明天再来
                            coupon.btnPic += "tomorrow_btn" + btnPicSuffix + ".jpg";
                        }
                        break;
                    case 2 : //领过
                        if (currDate.getDate() < 16) { //16号前显示 已领取，916再领一次
                            coupon.btnPic += "916_get_btn" + btnPicSuffix + "_01.jpg";
                        } else {
                            coupon.btnPic += "already_get_btn" + btnPicSuffix + ".jpg";
                        }
                        break;
                    case -2 : //领过2
                        if (currDate.getDate() < 16) { //16号前显示 已领取，916再领一次
                            coupon.btnPic += "916_get_btn" + btnPicSuffix + ".jpg";
                        } else {
                            coupon.btnPic += "already_get_btn" + btnPicSuffix + ".jpg";
                        }
                        break;
                    case 3 : //不符合领取条件
                        coupon.btnPic += "no_get.jpg";
                        break;
                }
            }

            var currDate = new Date();
            data.startTime = parseInt(currDate.getTime()/1000);
            if (currDate.getMonth() == 8 && currDate.getDate() < 16) {
                data.bannerText = "距离衣橱升级还有";
                data.endTime = parseInt(new Date(2014, 08, 16, 00, 00, 00).getTime()/1000);
            } else if (currDate.getMonth() == 8 && currDate.getDate() > 18) {
                data.bannerText = "活动结束";
            } else if (currDate.getMonth() == 8 && currDate.getDate() >= 16) {
                data.bannerText = "距离活动结束还有";
                data.endTime = parseInt(new Date(2014, 08, 19, 00, 00, 00).getTime()/1000);
            }

            data.bannerText = null;

            data.key = data.couponInfo.key;

            /*判断版本是否支持优惠券*/
            data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
            data._CSSLinks = ['activity/promotion/main916'];
            mSelf.render('activity/promotion/main916.html' , data);
        });
    },
    main820 : function() {
        this.debugSnake({target : 'devlab1'});
        var php = {
            "couponInfo" : "/customactivity/CustomActivity_offer_venue_coupon"
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        //this.setMDefault(php);
        this.bridgeMuch(php);
        var picRootUrl = "http://i.meilishuo.net/css/images/wap/activity/august_act/820_mob/";

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};

            if (!data.couponInfo) {
                data.couponInfo = {"isLogin" : 0};
            }

            data.isLogin = data.couponInfo.islogin == 0 ? false : true;
            //判断按钮状态
            var currDate = new Date();
            var coupons = data.couponInfo.coupon;
            if (!coupons) {

                data.couponInfo.coupon = {};
                coupons = {
                    1 : {"can_use" : 0, "left_amount" : ""},
                    2 : {"can_use" : 0, "left_amount" : ""},
                    3 : {"can_use" : 0, "left_amount" : ""},
                    4 : {"can_use" : 0, "left_amount" : ""}
                }
                data.couponInfo.coupon = coupons;
            }
            for (var i in coupons) {
                var coupon = coupons[i];

                coupon.bgPic = picRootUrl + "coupons" + i + ".png";

                coupon.btnPic = picRootUrl;
                //var c = cd[i];
                switch(coupon.can_use) {
                    case 0 : //可以使用  活动开始前该值也为0
                        if (!coupon.left_amount) { //这个数据为空时，说明活动还没开始
                            coupon.btnPic += "10.png";
                        } else if(data.couponInfo.islogin == 0) { //用户没登陆
                            /*if (coupon.left_amount == 0) {
                                var d = new Date(coupon.next.begin);
                                if (d.getDate() == currDate.getDate()) { //日期相同说明今天还有抢券机会
                                    var hours = d.getHours();
                                    coupon.btnPic += hours + ".png";
                                } else { //明天再来
                                    coupon.btnPic += "tomorrow.png";
                                }
                            } else {
                                coupon.btnPic += "get.png";
                            }*/
                            coupon.btnPic += "get.png";
                        } else {
                            //立即抢券
                            coupon.btnPic += "get.png";
                        }
                        break;
                    case 1 : //抢光
                        var d = new Date(coupon.next.begin);
                        if (d.getDate() == currDate.getDate()) { //日期相同说明今天还有抢券机会
                            var hours = d.getHours();
                            coupon.btnPic += hours + ".png";
                        } else { //明天再来
                            coupon.btnPic += "tomorrow.png";
                        }
                        break;
                    case 2 : //领过
                        if (currDate.getDate() < 20) { //20号前显示 已领取，820再领一次
                            coupon.btnPic += "already_get_820.png";
                        } else {
                            coupon.btnPic += "already_get.png";
                        }
                        break;
                    case 3 : //不符合领取条件
                        coupon.btnPic += "no_get.png";
                        break;
                }
            }

            var d = new Date();
            data.sTime = d.getTime();
            var currDay = d.getDate();
            if (currDay < 20) {

                data.remainDay = 20 - currDay;
                if (data.remainDay == 1) {
                    data.remainText = "活动开始就在明天";
                    data.remainDay = '';
                } else {
                    data.remainText = "距离活动开始还有";
                }

            } else {

                data.remainDay = 22 - currDay;
                if (data.remainDay <  0) {
                    data.remainText = "活动已结束";
                    data.remainDay = '';
                } else {
                    if (data.remainDay == 0) {
                        data.remainText = "大促活动最后一天";
                        data.remainDay = '';
                    } else {
                        data.remainText = "距离活动结束还有";
                    }
                }

            }

            /*判断版本是否支持优惠券*/
            data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
            data._CSSLinks = ['activity/august_sale/main820'];
            mSelf.render('activity/august_sale/main11.html' , data);
        });
    },
	main520 : function(){
		var cid = this.readData('cid',this.req.__get, '');
		var r = this.readData('r',this.req.__get, '');
		var short_url = '/activity/sale/main520/?cid='+cid+'&r='+r;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(short_url)+'&bg='+encodeURIComponent(short_url)+'&bg2='+encodeURIComponent('http://www.meilishuo.com/biz/huodong/act618/?frm=mobShare');
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_520_main'
			,"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
			,'couponData' : '/customactivity/CustomActivity_spring_carnival_coupon?type_coupon=0&type=wap'
			,'coupon_new' : '/customactivity/CustomActivity_june_coupon_privilege_status'
			,'coupon_old' : '/customactivity/CustomActivity_coupon_revival_add'
			,'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var shareData = data.pageData.share;
			if(shareData && shareData.title){
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : (data.shortURL && data.shortURL.url) || shareURL
				};
				data.share = wapMod.shareTo(mSelf.req , params);
			}

			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			/*倒计时状态*/
			if(data.pageData.timeSetting){
				var end_time = data.pageData.timeSetting.end_time;
				var start_time = data.pageData.timeSetting.start_time;
			} else {
				var end_time = '2014/06/19 00:00:00';
				var start_time = '2014/06/09 00:00:00';
			}
			data.cur_time = new Date();
			data.start_time = new Date(start_time);
			data.end_time = new Date(end_time);
			if( data.cur_time < data.start_time ){
				data.status = 'nostart';
				data.countdown_text = '距离狂欢开始：';
				data.countdown_time = Date.parse(data.start_time)/1000;
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.status = 'saling';
				data.countdown_text = '距结束还有：';
				data.countdown_time = Date.parse(data.end_time)/1000;
			}else{ 
				data.status = 'end';
				data.countdown_text = '活动已结束';
			}
			/*判断版本是否支持优惠券*/
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');

			data._CSSLinks = ['activity/may_sale/main'];
			mSelf.render('activity/may_sale/main.html' , data);
		});
	},
	clothing520 : function(){
		var acid = this.readData('acid',this.req.__get, 0);/*用了两个通用接口，不能直接传cid*/
		var r = this.readData('r',this.req.__get, '');
		var short_url = '/activity/sale/clothing520/?acid='+acid+'&r='+r;
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(short_url)+'&bg='+encodeURIComponent(short_url)+'&bg2='+encodeURIComponent('http://www.meilishuo.com/biz/huodong/mainpro/?frm=mobShare_cloth');
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single_520?id=m_maysale_cloth&cid='+acid
			,'list' : '/customactivity/CustomActivity_common_tool_single?id=14_520_main_store&cid=1133'
			,'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.app_access_token = data.accessToken;

			data.cur_time = new Date();
			data.start_time = new Date('2014/05/20 00:00:00');
			data.end_time = new Date('2014/05/23 00:00:00');
			if( data.cur_time < data.start_time ){
				data.status = 'nostart';
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.status = 'saling';
			}else{ 
				data.status = 'end';
			}

			data.cid = acid;
			/*share*/
			var shareData = data.pageData.share;
			if(shareData){
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : (data.shortURL && data.shortURL.url) || shareURL
				};
				data.share = wapMod.shareTo(mSelf.req , params);
			}

			data._CSSLinks = ['activity/may_sale/cloth'];
			data.pageTitle = '520 - 美丽说';
			mSelf.render('activity/may_sale/cloth.html' , data);
		});
	},
	shop520 : function(){
		var php = {
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_shop520',
			'good_shop' : '/customactivity/CustomActivity_shop_info?id=14_520_youdian&cid=1001',
			'fashion_shop' : '/customactivity/CustomActivity_shop_info?id=14_520_youdian&cid=1105'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data._CSSLinks = ['activity/may_sale/shop'];
			mSelf.render('activity/may_sale/shop.html', data);
		});
	},
	love : function(){
		var php = {
			"userInfo" : "/customactivity/CustomActivity_wap_user_info",
			'goods' : '/customactivity/CustomActivity_lovers_confessions_rank?frame=1'
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');
			data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data._CSSLinks = ['activity/may_sale/love'];
			mSelf.render('activity/may_sale/love.html', data);
		});
	},
	bell : function(){
		var php = {
			'goods':'/customactivity/CustomActivity_lovers_confessions_rank.class.php',
            'userInfo':'/customactivity/CustomActivity_lovers_confessions_user_info',
            //'cfg' : '/customactivity/CustomActivity_common_tool_single?id=exo_niuniu_cfg',

		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');
			// var params = data.cfg.share;
			// params.url = "http://m.meilishuo.com/activity/sale/bell/";
			// data.share = wapMod.shareTo(mSelf.req , params);

			data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data.pageTitle = '男神叫你起床啦 -- 美丽说';
			data._CSSLinks = ['activity/may_sale/bell'];
			mSelf.render('activity/may_sale/bell.html', data);
		});
	},
	loveshare : function(user_id){
		var shareURL = 'http://mapp.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/sale/bell/?access_user_id='+user_id) + '&bg='+ encodeURIComponent('/activity/sale/bell/?access_user_id='+user_id) + '&bg2='+encodeURIComponent('http://www.meilishuo.com/biz/juneSale/loveAlarm/');
		var php = {
			"userInfo" : "/customactivity/CustomActivity_wap_user_info",
			'shareData' : '/customactivity/CustomActivity_lovers_confessions_user_info',
			'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){			
			
			/*share*/
			var _shareData = data.shareData.data;
			if(!_shareData.user_desc){
				_shareData.user_desc = '我在美丽说参加了#EXO-M 男神闹钟#';
			}
			var params = {
					'title' : '亲们快来帮我点赞吧~',
					'text' : _shareData.user_desc,
					'pic' : {
						'weixin' : _shareData.pic_url_min,
						'weixin_timeline' : _shareData.pic_url_min,
						'default' : _shareData.pic_url_max,
					},
					'url' : data.shortURL.url
				};

			data.share = wapMod.shareTo(mSelf.req , params);
			data._shareData = _shareData;
			if(data.userInfo.user_id == 0) return mSelf.errorPage();
			data._CSSLinks = ['activity/may_sale/loveshare'];
			mSelf.render('activity/may_sale/loveshare.html', data);
		});
	},
	niuniu : function(){
		var php = {
			"userInfo" : "/customactivity/CustomActivity_wap_user_info",
			'display' : '/customactivity/CustomActivity_mob_winning',
			'pics' : '/customactivity/CustomActivity_common_tool_single?id=exo_niuniu',
			'cfg' : '/customactivity/CustomActivity_common_tool_single?id=exo_niuniu_cfg',
			'get' : '/customactivity/CustomActivity_mob_every_draw?act=get&act_id=1'
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.isNewest = wapMod.isNewest(mSelf.req, '4.1.0');
			var params = data.cfg.share;
			params.url = "http://m.meilishuo.com/activity/sale/niuniu/";
			data.share = wapMod.shareTo(mSelf.req , params);
			data.rand = Math.min(parseInt(Math.random()*6),5);
			data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
			data._CSSLinks = ['activity/may_sale/niuniu'];
			mSelf.render('activity/may_sale/niuniu.html', data);
		});
	},
	niuniushare : function(){
		var php = {
			"userInfo" : "/customactivity/CustomActivity_wap_user_info"
		};
		var mSelf = this;
		var wapMod = base.loadModel('wap/tools.js');
		var s_pic = this.readData('s_pic',this.req.__get, '');
		var text = this.readData('text',this.req.__get, '');
		var title = this.readData('title',this.req.__get, '');
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/sale/niuniu/') + '&bg='+ encodeURIComponent('/activity/sale/niuniu/') + '&bg2='+encodeURIComponent('http://www.meilishuo.com/client/');
			/*share*/

			var params = {
					'title' : '我在美丽说抽中了【'+text+'】，小伙伴们也来试试手气吧~',
					'text' : '美丽扭蛋机，大奖掉不停',
					'pic' : s_pic,
					'url' : shareURL
				};
			data.share = wapMod.shareTo(mSelf.req , params);
			data.shareData = {
				's_pic' : s_pic,
				'text' : text,
				'title' : title
			};

			data._CSSLinks = ['activity/may_sale/loveshare'];
			mSelf.render('activity/may_sale/niuniushare.html', data);
		});
	},
	mz420 : function(){
		var wapMod = base.loadModel('wap/tools.js');
		var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl=' + encodeURIComponent('/activity/sale/mz420/') + '&bg='+ encodeURIComponent('/activity/sale/mz420/') + '&bg2='+encodeURIComponent('http://www.meilishuo.com/welcome/');
		var php = {
			'temai1' : '/Wapactivity/Activity_goodsV3?ac_id=523',
			'temai2' : '/Wapactivity/Activity_goodsV3?ac_id=525',
			'temai3' : '/Wapactivity/Activity_goodsV3?ac_id=527',
			'temai4' : '/Wapactivity/Activity_goodsV3?ac_id=529',
			"mobUserInfo" : "/customactivity/CustomActivity_wap_user_info",
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=m_sale_coupon',
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
            data.start_time = 1397995200;
            data.end_time = 1398268800;
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
					'pic' : data.PICTURE_URL + "images/huodong/sale420/mz_wap_share.jpg",
					'url' : shareURL
				};
			data.share = wapMod.shareTo(mSelf.req , params);
			data.pageTitle = '421春夏最IN美妆';
			data._CSSLinks = ['activity/mz420'];
			mSelf.render('activity/mz420.html' , data);
		});
	},
	ocoupon618 : function(){
		var wapMod = base.loadModel('wap/tools.js');
		var short_url = '/activity/sale/main520/?cid=1435';
		var shareURL = 'http://mapp.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(short_url)+'&bg='+encodeURIComponent(short_url)+'&bg2='+encodeURIComponent('http://www.meilishuo.com/biz/huodong/act618/?frm=mobShare');
		var php = {
			'mobUserInfo' : '/customactivity/CustomActivity_wap_user_info',
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=coupon_alert_618',
			'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL)
		};
		php.coupon_info = '/customactivity/CustomActivity_mob_revive';
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			/*share*/
			var shareData = data.pageData.share;
			if(shareData){
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : (data.shortURL && data.shortURL.url) || shareURL
				};
				data.share = wapMod.shareTo(mSelf.req , params);
			}
			data.page_from = data.coupon_info.flag;
			data._CSSLinks = ['activity/may_sale/ac618'];
			mSelf.render('activity/may_sale/ocoupon618.html', data);
		});
	},
	ncoupon618 : function(){
		var wapMod = base.loadModel('wap/tools.js');
		var short_url = '/activity/sale/main520/?cid=1435';
		var shareURL = 'http://mapp.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(short_url)+'&bg='+encodeURIComponent(short_url)+'&bg2='+encodeURIComponent('http://www.meilishuo.com/biz/huodong/act618/?frm=mobShare');
		var php = {
			'mobUserInfo' : '/customactivity/CustomActivity_wap_user_info',
			'pageData' : '/customactivity/CustomActivity_common_tool_single?id=coupon_alert_618&cid=1477',
			'shortURL' : "/url/shorturl?url="+encodeURIComponent(shareURL),
			'coupon_100' : '/customactivity/CustomActivity_june_coupon_privilege_status'
		};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if(!data.coupon_100) return mSelf.errorPage();
			data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
			/*判断版本是否支持优惠券*/
			data.isNewest = wapMod.isNewest(mSelf.req , '4.1.0');
			/*share*/
			var shareData = data.pageData.share;
			if(shareData){
				var params = {
					'title' : shareData.title,
					'text' : shareData.text,
					'pic' : {
						"weixin" : shareData.pic_weixin,
						"weixin_timeline" : shareData.pic_weixin,
						"default" : shareData.pic
					},
					'url' : (data.shortURL && data.shortURL.url) || shareURL
				};
				data.share = wapMod.shareTo(mSelf.req , params);
			}
			data._CSSLinks = ['activity/may_sale/ac618'];
			mSelf.render('activity/may_sale/ncoupon618.html', data);
		});
	},
	exoconcert : function(){
		var php = {};
		var mSelf = this;
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			var end_time = '2014/07/17 00:00:00';
			var start_time = '2014/07/13 00:00:00';
			data.cur_time = new Date();
			data.start_time = new Date(start_time);
			data.end_time = new Date(end_time);
			if( data.cur_time < data.start_time ){
				data.status = 'nostart';
				data.countdown_text = '距活动开启';
				data.countdown_time = Date.parse(data.start_time)/1000;
			}else if(data.cur_time >= data.start_time && data.cur_time <= data.end_time){
				data.status = 'saling';
				data.countdown_text = '距活动结束';
				data.countdown_time = Date.parse(data.end_time)/1000;
			}else{ 
				data.status = 'end';
				data.countdown_text = '活动已结束';
			}
			var end_time1 = '2014/07/16 00:00:00';
			var start_time1 = '2014/07/13 00:00:00';
			data.cur_time1 = new Date();
			data.start_time1 = new Date(start_time1);
			data.end_time1 = new Date(end_time1);
			if( data.cur_time1 < data.start_time1 ){
				data.status1 = 'nostart1';
				data.countdown_text1 = '距活动开启';
				data.countdown_time1 = Date.parse(data.start_time1)/1000;
			}else if(data.cur_time1 >= data.start_time1 && data.cur_time1 <= data.end_time1){
				data.status1 = 'saling1';
				data.countdown_text1 = '距活动结束';
				data.countdown_time1 = Date.parse(data.end_time1)/1000;
			}else{ 
				data.status1 = 'end1';
				data.countdown_text1 = '活动已结束';
			}

			data.pageTitle = '2014美丽说EXO-M粉丝签名会开始抢票啦~ -- 美丽说';
			data._CSSLinks = ['activity/may_sale/exoconcert'];
			mSelf.render('activity/may_sale/exoconcert.html', data);
		});
	},
    turntable : function() {
       //this.debugSnake({target : 'devlab1'});
        var php = {
            "core" : "/customactivity/CustomActivity_lottery?act=get&activity_id=19",
            "mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
        };
        var mSelf = this;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            if (!data.core) {

            }
            if (!data.core.data.activity) {
                data.core.data.activity = {};
            }
            if (!data.core.data.awards) {
                data.core.data.awards = {};
            }
            if (!data.core.data.user) {
                data.core.data.user = {};
            }
            if (!data.core.data.leftTimes) {
                data.core.data.leftTimes = 0;
            }
            if (data.core.data.activity.winner_tip) {
                var winnersTip = data.core.data.activity.winner_tip.split(";");
                var winnersTipHtml = "";
                for (var i = 0; i < winnersTip.length; i ++) {
                    winnersTipHtml += "<p><span>" + winnersTip[i] + "</span></p>"
                }
                data.winnersTipHtml = winnersTipHtml;
            }
            data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
            data.actData = data.core.data.activity;
            data.awards = data.core.data.awards;
            data.noAwards = data.core.data.activity.nowin_picArr;
            data._CSSLinks = ['activity/turntable'];
            mSelf.render('activity/turntable.html', data);
        });
    },
    turntableShare : function() {
        //this.debugSnake({target : 'devlab1'});
        var headPic = this.req.__get.headPic;
        var prizePic = this.req.__get.prizePic;
        var mes = decodeURIComponent(this.req.__get.mes);
        var fromShare = this.req.__get.fromShare;

        if (!prizePic) {
            prizePic = "";
        }
        var mSelf = this;

        var php = {
            "core" : "/customactivity/CustomActivity_lottery?act=get&activity_id=19",
            "mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
        };
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data) {
            data.prizePic = prizePic;
            data.headPic = headPic;
            data.mes = mes;
            data.tips = data.core.data.activity.prize_desc;
            data.bannerPic = data.core.data.activity.share_bg_pic;
            data._CSSLinks = ['activity/turntable_share'];
            mSelf.render('activity/turntable_share.html', data);
        });





    },
    match916:function(params){
        // this.debugSnake({target : 'pmlab1'});
        var php = {
            "userInfo" : "/customactivity/CustomActivity_wap_user_info",
            "list" : "/dress/promote916?id="+params
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            var currDate = new Date();
            data.startTime = parseInt(currDate.getTime()/1000);
            if (currDate.getMonth() == 8 && currDate.getDate() < 16) {
                data.bannerText = "距离衣橱升级还有";
                data.endTime = parseInt(new Date(2014, 08, 16, 00, 00, 00).getTime()/1000);
            } else if (currDate.getMonth() == 8 && currDate.getDate() > 18) {
                data.bannerText = "活动结束";
            } else if (currDate.getMonth() == 8 && currDate.getDate() >= 16) {
                data.bannerText = "距离活动结束还有";
                data.endTime = parseInt(new Date(2014, 08, 19, 00, 00, 00).getTime()/1000);
            }
            if(!data.list){
                data.list={};
            }
            data.cur=params;
            data.userInfo.user_id == 0 ? data.isLogin = false : data.isLogin = true;
            /*判断版本是否支持916*/
            data.isNewest = wapMod.isNewest(mSelf.req , '5.0.0');
            data._CSSLinks = ['activity/may_sale/match916'];
            mSelf.render('activity/may_sale/match916.html' , data);
        });
    }
}
exports.__create = controller.__create(sale , controlFns);
