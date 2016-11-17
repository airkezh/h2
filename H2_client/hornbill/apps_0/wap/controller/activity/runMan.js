function runMan(){
    return this;
}
var controlFns = {
    index : function(){
        var php = {
            'connect_weixin': '/connect/weixin?type=1'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
            if(weixinBrowser){
                connectWX(this, data);
            }
            data.isWx = weixinBrowser;
            data.islogin = 0;
            if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
                data.islogin = 1;
            };
            data.pageTitle     = '如果我参加跑男';
            data._CSSLinks     = [ 'activity/runMan' ];
            this.render( 'activity/runMan.html', data );
        } )
    },
    result : function(){
        //this.debugSnake({ target: 'wenkaizheng.rdlab' });
        var php = {
            "resultInfo":"/customactivity/customActivity_runner_nametest"
            ,'connect_weixin': '/connect/weixin?type=1'
        }
        this.setMDefault( php )
        this.bridgeMuch( php )
        this.listenOver( function( data ) {
            var weixinBrowser = this.req.headers['user-agent'].indexOf('MicroMessenger') > -1;
            if(weixinBrowser){
                connectWX(this, data);
            }
            data.isWx = weixinBrowser;
            data.islogin = 0;
            if (this.req.headers.referer && this.req.headers.referer.match(/user\/login/g)) {
                data.islogin = 1;
            };
            data.pageTitle     = '如果我参加跑男';
            data._CSSLinks     = [ 'activity/runMan_result' ];
            this.render( 'activity/runMan_result.html', data );
        } )
    },
    aj : function(params){  
        // this.debugSnake({ target: 'wenkaizheng.rdlab' });      
        var php = {
           "resultInfo":"/customactivity/customActivity_runner_nametest"
        };
        this.ajaxTo(php[params])
    }
};

var connectWX = function(mSelf, data){
    if (data.connect_weixin && data.connect_weixin.redirect) {
        return mSelf.redirectTo(data.connect_weixin.redirect, true);
    }
}
exports.__create = controller.__create(runMan , controlFns);
