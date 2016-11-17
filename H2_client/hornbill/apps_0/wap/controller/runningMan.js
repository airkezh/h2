function runningMan() {
    return this;
}
var controlFns = {
    'index':  function() {
        var php  = {
            'rm_info': '/customactivity/CustomActivity_common_tool_single?cid=15419&id=running_man_info'
        };
        var self = this;
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.XR             = true;
            data.use_rem_screen = true;
            data._CSSLinks      = [ 'runningMan' ];
            data.pageTitle      = data.rm_info.page_title;
            return self.render( 'runningMan/index.html', data );
        } );
    },
    'chat':   function() {
        var php  = {
            chat:          '/customactivity/CustomActivity_common_tool_single?cid=16389&id=running_man_x_h5',
            'wx_userInfo': '/user/WeixinHeadInfo'
        }
        var self = this;
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            if ( data.os && data.os.weixinBrowser ) {
                //connectWX( this, data )
            }
            data.pageTitle = '跑男伐木累私聊群(8)';
            data._CSSLinks = [ 'shake/chat' ];

            data.CONFIG_SHARE = {
                'desc':   '',
                'title':  '邀请你加入伐木累群聊',
                'imgUrl': 'http://d06.res.meilishuo.net/pic/_o/df/3e/5ab35fc5ae004f6d95418746abc3_220_220.cg.png',
                'link':   'http://m.meilishuo.com/runningMan/screen/'
            }
            return self.render( 'shake/chat.html', data );

        } );
    },
    'screen': function( args ) {
        var php  = {}
        var self = this;
        this.setMDefault( php );
        this.bridgeMuch( php );
        this.listenOver( function( data ) {
            data.pageTitle      = '';
            data._CSSLinks      = [ 'shake/screen' ];
            data.use_rem_screen = true;

            data.CONFIG_SHARE = {
                'desc':   '',
                'title':  '跑男节目组邀请你加入伐木累群聊',
                'imgUrl': 'http://d06.res.meilishuo.net/pic/_o/df/3e/5ab35fc5ae004f6d95418746abc3_220_220.cg.png',
                'link':   'http://m.meilishuo.com/runningMan/screen/'
            }

            return self.render( 'shake/screen.html', data );

        } );
    }
};

var connectWX = function( mSelf, data ) {
    if ( data.connect_weixin && data.connect_weixin.redirect ) {
        console.log( 'URL ==== ', data.connect_weixin.redirect )
        return mSelf.redirectTo( data.connect_weixin.redirect, true ) || true;
    }

}

exports.__create = controller.__create( runningMan, controlFns );
