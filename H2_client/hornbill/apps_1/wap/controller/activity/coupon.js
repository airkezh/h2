function coupon(){
    return this;
}

var controlFns = {

    get : function(price) {

        var php = {
            "mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
            if (data.isLogin == 0) {
                data.btnHref = "meilishuo://register.meilishuo/";
                data.btnPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/bnt2.png";
            } else {
                data.btnHref = "meilishuo://coupons.meilishuo";
                data.btnPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/btn1.png";
            }
            if (price == 10) {
                data.bannerPt = "82%";
                data.bannerPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/banner10.jpg";
                data.staticPt = "60%";
                data.staticPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/coupon10.jpg"
            } else if (price == 50) {
                data.bannerPt = "76%";
                data.bannerPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/banner50.jpg";
                data.staticPt = "80%";
                data.staticPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/coupon50.png"
            }
            data._CSSLinks = ['activity/getCoupon'];
            mSelf.render('activity/getCoupon.html', data);
        });
    },
    deduct : function() {
        var php = {
            "mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
            if (data.isLogin == 0) {
                data.btnHref = "meilishuo://register.meilishuo/";
                data.btnPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/bnt2.png";
            } else {
                data.btnHref = "meilishuo://coupons.meilishuo";
                data.btnPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/btn1.png";
            }
            data._CSSLinks = ['activity/deductCoupon'];
            mSelf.render('activity/deductCoupon.html', data);
        });
    },
    gift_bag : function() {
        var php = {
            "mobUserInfo" : "/customactivity/CustomActivity_wap_user_info"
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.mobUserInfo.data.user_id == 0 ? data.isLogin = 0 : data.isLogin = 1;
            if (data.isLogin == 0) {
                data.btnHref = "meilishuo://register.meilishuo/";
                data.btnPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/btn829.png";
            } else {
                data.btnHref = "meilishuo://coupons.meilishuo";
                data.btnPic = "http://i.meilishuo.net/css/images/wap/activity/coupon/btn50_1.png";
            }
            data._CSSLinks = ['activity/giftBagCoupon'];
            mSelf.render('activity/giftBagCoupon.html', data);
        });
    }
}

exports.__create = controller.__create(coupon, controlFns);
