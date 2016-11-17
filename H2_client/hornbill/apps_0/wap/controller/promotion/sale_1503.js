function sale_1503(){
    return this;
}



var controlFns = {

    wallet_act : function(actid) {
        this.debugSnake({target : 'devlab1'});
        var locationUrl = "http://" + this.req.headers.host;
        var php = {
            'core' : '/promotion/promotion_recharge_coupon?key=pocket_charge_coupon&cid=' + (actid ? actid : 6357)
        };
        var mSelf = this;
        var wapMod = base.loadModel('wap/tools.js');
        this.setMDefault(php);
        delete php.userInfo;
        delete php.log;
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.userInfo = {"avatar_c" : "", "nickname" : "", "user_id" : 0};
            var pengyou = '美丽说320最美春装节，充值领优惠券，提前送福利！';
            var pengyouquan = "美丽说320最美春装节，充值即得优惠券，先到先得，速来领取";
            var weibo = "美丽说320最美春装节，充值即得优惠券，先到先得，速来领取";
            var p = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1503/wallet/share.jpg";
            var sp = mSelf.siteInfo.PICTURE_URL + "images/wap/activity/promotion/1503/wallet/share.jpg";
            var c = "我在美丽说使用钱包进行现金充值，得了超值优惠券，你也来看看吧";
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
                'url' : locationUrl + '/promotion/sale_1503/wallet_act/?isFromShare=true'
            };
            data.share = wapMod.shareTo(mSelf.req , params);

            data.shareInfo = {"pengyou_title" : pengyou, "pengyouquan_title" : pengyouquan,"pic" : p, "spic" : sp, "content" : c, "url" : params.url}
            data.locationUrl = locationUrl;
            data.pageTitle = '钱包充值';
            data._CSSLinks = ['activity/promotion/wallet_act'];
            mSelf.render('activity/promotion/wallet_act.html' , data);
        });
    },
    wallet_act_intro : function() {
        var php = {
        };
        var mSelf = this;
        this.setMDefault(php);
        this.bridgeMuch(php);
        this.listenOver(function(data){
            data.pageTitle = '钱包充值说明';
            data._CSSLinks = ['activity/promotion/wallet_act_intro'];
            mSelf.render('activity/promotion/wallet_act_intro.html' , data);
        });
    }

}
exports.__create = controller.__create(sale_1503 , controlFns);
