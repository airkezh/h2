function sale_141212(){
    return this;
}



var controlFns = {
    coupon : function(args) {
        //this.debugSnake({target : 'devlab1'});
        var php = {
            'shops' : '/customactivity/CustomActivity_common_tool_singleNew?id=m_march_apparel_guang&cid=' + 4665
        };
        var mSelf = this;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data._CSSLinks = ['activity/promotion/coupon_141212'];
            mSelf.render('activity/promotion/coupon_141212.html' , data);
        });
    },
    main_venue : function(actid) {
        this.debugSnake({target : 'devlab1'});
        var rootUrl = "http://i.meilishuo.net/css/images/wap/activity/promotion/11/meet/";
        var wapMod = base.loadModel('wap/tools.js');
        var php = {
            'tabsData' : '/promotion/promotion_common_featured_area?actid=' + (actid ? actid : 33)
        };
        var mSelf = this;
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

            var t = '美丽说12.12年末犒劳节';
            var p = "http://i.meilishuo.net/css/images/wap/activity/promotion/1212/main_meet/share.jpg";
            var sp = "http://i.meilishuo.net/css/images/wap/activity/promotion/1212/main_meet/share.jpg";
            var c = "美丽说1212年末犒劳节，新款冬装5折封顶，千万优惠券免费领";
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
                    'default' : c
                },
                'pic' : {
                    'weixin' : sp,
                    'weixin_timeline' : sp,
                    'default' : p
                },
                'url' : 'http://m-promotion.meilishuo.com/promotion/sale_141212/main_venue/?isFromShare=true'
            };
            data.share = wapMod.shareTo(mSelf.req , params);

            data._CSSLinks = ['activity/promotion/main_venue_141212'];
            mSelf.render('activity/promotion/main_venue_141212.html' , data);
        });
    },
    sub_venue : function() {
        require("./common_meet.js").build.call(this);
    },
    shopping_strategy : function() {
        var php = {
        };
        var mSelf = this;
        this.bridgeMuch(php);

        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            data._CSSLinks = ['activity/promotion/ss_141212'];
            mSelf.render('activity/promotion/ss_141212.html' , data);
        });
    }

}
exports.__create = controller.__create(sale_141212 , controlFns);
