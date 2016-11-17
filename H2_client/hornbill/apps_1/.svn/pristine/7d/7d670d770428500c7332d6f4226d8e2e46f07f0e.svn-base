function sale_141220(){
    return this;
}



var controlFns = {
    coupon : function(args) {
        //this.debugSnake({target : 'devlab1'});
        var php = {
            'shops' : '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid=' + 5063
        };
        var mSelf = this;
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data._CSSLinks = ['activity/promotion/coupon_141220'];
            mSelf.render('activity/promotion/coupon_141220.html' , data);
        });
    },
    coupon_2 : function(args) {
        //this.debugSnake({target : 'devlab1'});
        var locationUrl = "http://" + this.req.headers.host;
        var php = {
            'shops' : '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid=' + 5063
        };
        var mSelf = this;
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data.locationUrl = locationUrl;
            data._CSSLinks = ['activity/promotion/coupon_141220_2'];
            mSelf.render('activity/promotion/coupon_141220_2.html' , data);
        });
    },
    main_venue : function(actid) {
        //this.debugSnake({target : 'devlab1'});
        var php = {
            'tabsData' : '/promotion/promotion_common_featured_area?actid=' + (actid ? actid : 37)
            ,'goodsBlock' : '/promotion/promotion_common_topic_list?id=37&type=mob'
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
            var t = '♥美丽说圣诞狂欢♥集齐这些圣诞装备必能推倒男神(๑˘ ˘๑)';
            var p = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1220/main_venue/share.jpg";
            var sp = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1220/main_venue/share.jpg";
            var c = "圣诞狂欢就这么任性，上千新款冬装3折起！还能提前囤Final Sale优惠券哦！";
            // shareUrl = "http://mapp.meilishuo.com/goto/open/?appUrl=" + encodeURIComponent(shareUrl);
            var params = {
                'title' : {
                    'weixin' : t,
                    'weixin_timeline' : t,
                    'default' : t
                },
                'text' : {
                    'weixin' : c,
                    'weixin_timeline' : c,
                    'weibo' : t,
                    'txweibo' : t,
                    'default' : c
                },
                'pic' : {
                    'weixin' : sp,
                    'weixin_timeline' : sp,
                    'default' : p
                },
                'url' : 'http://m-promotion.meilishuo.com/promotion/sale_141220/main_venue/?isFromShare=true'
            };
            data.share = wapMod.shareTo(mSelf.req , params);
            data.shareInfo = {"title" : t, "pic" : p, "spic" : sp, "content" : c, "url" : params.url}
            data._CSSLinks = ['activity/promotion/main_venue_141220'];
            mSelf.render('activity/promotion/main_venue_141220.html' , data);
        });
    },
    main_venue_2 : function(actid) {
        //this.debugSnake({target : 'devlab1'});
        var locationUrl = "http://" + this.req.headers.host;
        var php = {
            'tabsData' : '/promotion/promotion_common_featured_area?actid=' + (actid ? actid : 43)
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
            var pengyou = '美丽说Final Sale终极促销';
            var pengyouquan = "美丽说Final Sale，比11.11省50%， 更有1225现金券任性送！";
            var weibo = "美丽说Final Sale终极大促，比11.11省50%，还有1225元现金券任！性！送！！";
            var p = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1220/main_venue_2/share.jpg";
            var sp = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1220/main_venue_2/share.jpg";
            var c = "Final Sale终极大促，比11.11省50%，还有1225元现金券任！性！送！！";
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
                'url' : locationUrl + '/promotion/sale_141220/main_venue_2/?isFromShare=true'
            };
            data.share = wapMod.shareTo(mSelf.req , params);
            data.shareInfo = {"pengyou_title" : pengyou, "pengyouquan_title" : pengyouquan,"pic" : p, "spic" : sp, "content" : c, "url" : params.url}
            data.locationUrl = locationUrl;
            data._CSSLinks = ['activity/promotion/main_venue_141220_2'];
            mSelf.render('activity/promotion/main_venue_141220_2.html' , data);
        });
    },
    sub_venue : function() {
        require("./common_meet.js").build.call(this);
    }

}
exports.__create = controller.__create(sale_141220 , controlFns);
