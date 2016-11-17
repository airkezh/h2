function sale_1501(){
    return this;
}



var controlFns = {
    diary_day : function() {
        var tid = this.readData('tid' , this.req.__get , '');
        var all_cid = this.readData('all_cid' , this.req.__get , '');
        var show_cid = this.readData('show_cid' , this.req.__get , '');
        var cid = this.readData('cid' , this.req.__get , '');
        if(cid){
            all_cid = cid;
            show_cid = cid;
        }
        var php = {
            'pageData_top' : '/activity/activity_fuide?id='+tid,
            'pageData' : '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid='+ show_cid
        };
        if (all_cid) {
            php.pageData_all = '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid='+ all_cid;
        }
        var ua = this.req.headers['user-agent'];
        var platform = false;
        if (/(iPhone|iPod|iOS|iPad)/i.test(ua)){
            platform = true;
        }
        var mSelf = this;
        var locationUrl = "http://" + this.req.headers.host + this.req.url;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.locationUrl = locationUrl;
            if(!data.pageData) return mSelf.errorPage();
            //数据整合
            if (data.pageData_all) {
                if (!data.pageData.pageControl) {
                    data.pageData.pageControl = {};
                }
                data.pageData.banner_word = data.pageData_all.banner_word;
                data.pageData.pageControl.pt = data.pageData_all.pageControl.pt;
                data.pageData.pageControl.start_time = data.pageData_all.pageControl.start_time;
                data.pageData.pageControl.end_time = data.pageData_all.pageControl.end_time;
                data.pageData.header = data.pageData_all.header;
                data.pageData.footer = data.pageData_all.footer;
                data.pageData.cate_list_style = data.pageData_all.cate_list_style;
                delete data.pageData_all;
            }
            data.pid = data.pageData.pageControl.pid;
            data.isIphone = platform;
            data._CSSLinks = ['activity/promotion/valentine'];
            data.pageTitle = data.pageData.pageControl.title || '美丽说';
            mSelf.render('activity/promotion/valentine.html', data);
        });
    },
    mv_new_goods : function(actid) {
        //this.debugSnake({target : 'devlab1'});
        var locationUrl = "http://" + this.req.headers.host;
        var php = {
            "hotspotUrl" : "/customactivity/CustomActivity_common_tool_singleNew?id=hotspot_url&cid=5923"
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data.picRootUrl = mSelf.siteInfo.PICTURE_URL;

            var pengyou = '新年穿新装 2015春装新款抢鲜买';
            var pengyouquan = "新年穿新装 2015春装新款抢鲜买";
            var weibo = "新年穿新装 2015春装新款抢鲜买";
            var p = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1501/mv_new_goods/share.jpg";
            var sp = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1501/mv_new_goods/share.jpg";
            var c = "距离全国快递停发还有20天，趁现在买春装新款才是正经事！";
            // shareUrl = "http://mapp.meilishuo.com/goto/open/?appUrl=" + encodeURIComponent(shareUrl);
            var params = {
                'title' : {
                    'weixin' : pengyou,
                    'weixin_timeline' : pengyouquan,
                    'default' : pengyouquan
                },
                'text' : {
                    'weixin' : c,
                    'weixin_timeline' : c,
                    'weibo' : weibo,
                    'txweibo' : weibo,
                    'default' : c
                },
                'pic' : {
                    'weixin' : sp,
                    'weixin_timeline' : sp,
                    'default' : p
                },
                'url' : locationUrl + '/promotion/sale_1501/mv_new_goods/?isFromShare=true'
            };
            data.share = wapMod.shareTo(mSelf.req , params);
            data.shareInfo = {"pengyou_title" : pengyou, "pengyouquan_title" : pengyouquan,"pic" : p, "spic" : sp, "content" : c, "url" : params.url}
            data.locationUrl = locationUrl;
            data.pageTitle = '新年穿新装 2015春装新款抢鲜买';
            data._CSSLinks = ['activity/promotion/mv_1501_new_goods'];
            mSelf.render('activity/promotion/mv_1501_new_goods.html' , data);
        });
    },
    coupon_new_goods : function() {
        //this.debugSnake({target : 'devlab1'});
        var locationUrl = "http://" + this.req.headers.host;
        var php = {
        };
        var mSelf = this;
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data.locationUrl = locationUrl;
            data._CSSLinks = ['activity/promotion/coupon_1501_new_goods'];
            mSelf.render('activity/promotion/coupon_1501_new_goods.html' , data);
        });
    },
    mv_clearance : function(actid) {
        //this.debugSnake({target : 'devlab1'});
        var locationUrl = "http://" + this.req.headers.host;
        var php = {
            'tabsData' : '/promotion/promotion_common_featured_area?actid=' + (actid ? actid : 53)
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data.picRootUrl = mSelf.siteInfo.PICTURE_URL;
            if (data.tabsData.data) {
                var posters = data.tabsData.data;
                for (var i in posters) {

                    data.firstTabs =posters[i].falls;
                    break;
                }
            }
            var pengyou = '美丽说精品2折清仓啦！快来囤货！过年穿的美美哒！';
            var pengyouquan = "美丽说精品2折清仓啦！小美喊你囤货，过年穿的美美哒！";
            var weibo = "美丽说精品2折清仓啦！小美喊你囤货，过年穿的美美哒！";
            var p = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1501/main_venue/share.jpg";
            var sp = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1501/main_venue/share.jpg";
            var c = "美丽说精品2折火热清仓啦！小美喊你囤年货啦！";
            // shareUrl = "http://mapp.meilishuo.com/goto/open/?appUrl=" + encodeURIComponent(shareUrl);
            var params = {
                'title' : {
                    'weixin' : pengyou,
                    'weixin_timeline' : pengyouquan,
                    'default' : pengyouquan
                },
                'text' : {
                    'weixin' : c,
                    'weixin_timeline' : c,
                    'weibo' : weibo,
                    'txweibo' : weibo,
                    'default' : c
                },
                'pic' : {
                    'weixin' : sp,
                    'weixin_timeline' : sp,
                    'default' : p
                },
                'url' : locationUrl + '/promotion/sale_1501/mv_clearance/?isFromShare=true'
            };
            data.share = wapMod.shareTo(mSelf.req , params);

            data.shareInfo = {"pengyou_title" : pengyou, "pengyouquan_title" : pengyouquan,"pic" : p, "spic" : sp, "content" : c, "url" : params.url}
            data.locationUrl = locationUrl;
            data.pageTitle = '美丽说精品2折清仓啦！小美喊你囤货，过年穿的美美哒！';
            data._CSSLinks = ['activity/promotion/main_venue_tpl_1'];
            mSelf.render('activity/promotion/main_venue_tpl_1.html' , data);
        });
    },
    mv_clearance_2 : function(actid) {
        //this.debugSnake({target : 'devlab1'});
        var locationUrl = "http://" + this.req.headers.host;
        var php = {
            'tabsData' : '/promotion/promotion_common_featured_area?actid=' + (actid ? actid : 53)
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data.picRootUrl = mSelf.siteInfo.PICTURE_URL;
            if (data.tabsData.data) {
                var posters = data.tabsData.data;
                for (var i in posters) {

                    data.firstTabs =posters[i].falls;
                    break;
                }
            }
            var pengyou = '美丽说精品2折清仓啦！快来囤货！过年穿的美美哒！';
            var pengyouquan = "美丽说精品2折清仓啦！小美喊你囤货，过年穿的美美哒！";
            var weibo = "美丽说精品2折清仓啦！小美喊你囤货，过年穿的美美哒！";
            var p = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1501/main_venue/share.jpg";
            var sp = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1501/main_venue/share.jpg";
            var c = "美丽说精品2折火热清仓啦！小美喊你囤年货啦！";
            // shareUrl = "http://mapp.meilishuo.com/goto/open/?appUrl=" + encodeURIComponent(shareUrl);
            var params = {
                'title' : {
                    'weixin' : pengyou,
                    'weixin_timeline' : pengyouquan,
                    'default' : pengyouquan
                },
                'text' : {
                    'weixin' : c,
                    'weixin_timeline' : c,
                    'weibo' : weibo,
                    'txweibo' : weibo,
                    'default' : c
                },
                'pic' : {
                    'weixin' : sp,
                    'weixin_timeline' : sp,
                    'default' : p
                },
                'url' : locationUrl + '/promotion/sale_1501/mv_clearance_2/?isFromShare=true'
            };
            data.share = wapMod.shareTo(mSelf.req , params);

            data.shareInfo = {"pengyou_title" : pengyou, "pengyouquan_title" : pengyouquan,"pic" : p, "spic" : sp, "content" : c, "url" : params.url}
            data.locationUrl = locationUrl;
            data.pageTitle = '美丽说精品2折清仓啦！小美喊你囤货，过年穿的美美哒！';
            data._CSSLinks = ['activity/promotion/mv_1501_clearance_2'];
            mSelf.render('activity/promotion/mv_1501_clearance_2.html' , data);
        });
    },
    sv_clearance : function() {
        require("./common_meet.js").build.call(this, {"cssLink" : "activity/promotion/waterfall_tpl_1", "tplLink" : "activity/promotion/waterfall_tpl_1.html"});
    }

}
exports.__create = controller.__create(sale_1501 , controlFns);
