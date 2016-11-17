function scarletHeart (){
    return this;
}

var controlFns = {
    'index': function(){
        var wapMod = base.loadModel('wap/tools.js')
        var req = this.req,
            php = {
            'connect_weixin' : '/connect/weixin?type=1', 
            'danmu' : '/customactivity/CustomActivity_barrage_drifting_otc?actid=804'
            }
        var weixinBrowser = req.headers['user-agent'].indexOf('MicroMessenger') > 0
        this.setDefaultData(php)
        this.bridgeMuch(php)
        this.listenOver(function (data){
            var danmu = data.danmu
            var shareData = {
                'url'   : 'http://m.meilishuo.com/activity/scarletHeart/index/',
                'pic'   : 'http://d01.res.meilishuo.net/pic/_o/aa/15/5ca21b55b2133fd97c9544fe48c5_128_179.ch.jpg',
                'text'  : '8月4日/9日/10日每晚21点 0.1元看陈意涵穿越新剧《新步步惊心》！只要0，1元全国通兑影券限量抢！',
                'title' : '0.1元疯抢《新步步惊心》电影票'
            }
            if(weixinBrowser && req.__get.connect ) connectWX(this, data)
            if ( !danmu || danmu.error_code !== 0 ){
                this.errorPage()
            }
            data.share = wapMod.shareTo(this.req, shareData)
            data.supportShare = wapMod.supportShare(this.req)
            data.pageTitle = '0.1元疯抢《新步步惊心》电影票'
            data._CSSLinks = ['activity/scarlet_heart']
            this.render('activity/scarlet_heart.html', data)
        });
    }
};

var connectWX = function(mSelf, data){
    if(data.connect_weixin && data.connect_weixin.redirect)
        return mSelf.redirectTo(data.connect_weixin.redirect ,true) || true;
}

exports.__create = controller.__create(scarletHeart, controlFns);
