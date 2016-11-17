function shareOrderList(){
    return this;
}
var controlFns = {
    'index' : function(args){
        //?cid = 31
        var code = this.req.__get.code || 'fuider_wap_special'
        var php = {
            'all' : '/customactivity/CustomActivity_common_tool_single?id='+code
        }
        delete this.req.__get.header
            , mSelf = this
        //, u = mSelf.req.headers['user-agent']

        mSelf.setMDefault(php);
        mSelf.bridgeMuch(php);
        var wapMod = base.loadModel('wap/tools.js')
        mSelf.listenOver(function(data){
            if (!data.all) return this.errorPage()
            var shareURL = 'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent('/activity/fwindow/index/?cid='+ this.req.__get.cid)+'&bg='+encodeURIComponent('/activity/fwindow/index/?cid='+ this.req.__get.cid)+'&bg2='+encodeURIComponent('http://meilishuo.com/client/')
            var params = {
                'title' : data.all.share.title,
                'text' :  data.all.share.text,
                'pic' : data.all.share.src,
                'url' : shareURL,
            };
            var shares = wapMod.shareTo(mSelf.req , params);
            data.share = shares;

            data.supportShare = wapMod.supportShare(mSelf.req)
            data.pageTitle = '晒单分享说明 - 美丽说';
            data.meta_description = data.all.share.text;
            //base.var_dump(data.all, false, 8);
            data._CSSLinks = ['activity/shareOrderIntro'];
            mSelf.render('activity/shareOrderIntro.html' , data);
        });
    }
};
exports.__create = controller.__create(shareOrderList , controlFns);

