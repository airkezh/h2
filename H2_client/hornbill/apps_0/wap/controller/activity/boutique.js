function boutique(){
    return this;
}

var controlFns = {
    'index' : function(args){ //?cid=1705
        //var code = this.req.__get.code || 'fuider_wap_special'; //fuider_wap_special;
        var php = {
            'all' : '/customactivity/CustomActivity_common_tool_single?id=fuider_wap_special&cid='+ args +'&preview=1'
        }

        delete this.req.__get.header
        var mSelf = this;

        mSelf.setMDefault(php);
        mSelf.bridgeMuch(php);
        var wapMod = base.loadModel('wap/tools.js');
        var shareUrl = "http://mapp.meilishuo.com/activity/boutique/index/" + args;
        var t = '2014年秋季最值得入手单品';
        var p = "http://i.meilishuo.net/css/images/wap/activity/project/boutique_share_1.jpg";
        var sp = "http://i.meilishuo.net/css/images/wap/activity/project/boutique_share_2.jpg"
        var c = "2014年秋季最值得入手单品看这里，不买可惜，快来美丽说选购你的最爱！";
        var shareUrl = "http://mapp.meilishuo.com/goto/open/?appUrl=" + encodeURIComponent(shareUrl);
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
            'url' : shareUrl
        };


        mSelf.listenOver(function(data){
            //if (!data.all) return this.errorPage();



            data.pageTitle = '精品场 - 美丽说';
            //data.meta_description = data.all.share.text;


            data.share = wapMod.shareTo(mSelf.req , params);

            data._CSSLinks = ['activity/boutique'];

            mSelf.render('activity/boutique.html' , data);

        });
    }

};
exports.__create = controller.__create(boutique , controlFns);

