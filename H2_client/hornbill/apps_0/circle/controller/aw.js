function aw() {
    return this;
}
var controlFns   = {
    user: function( params ) {
        var php = {
            'logon': '/user/user_log_on'
        }
        this.ajaxTo( php[ params ] )
    },

    'twitter': function( params ) {
        var php = {
            'like': '/twitter/like',
            'exoTicket': "/customactivity/CustomActivity_exo_add_poster_puzzle",
            'exo_poster_pubble': "/customactivity/CustomActivity_exo_poster_puzzle"
        }
        this.ajaxTo( php[ params ] );
    },

    'create_group': function( params ) {
       //this.debugSnake({target:"mob.rdlab"})
        var php = {
            'create': '/circle/apply'
        }
        this.ajaxTo( php[ params ] );
    },

    'circle_create': function() {
        // this.debugSnake({target:"lab1"})
        this.ajaxTo( '/circle/apply' )
    },

    'shop_create': function() {
        //this.debugSnake({target:"lab1"})
        this.ajaxTo( '/circle/shop_create' )
    },

    /**
     * 『喜欢』接口
     * 验证 token 有效期，最长为 10 分钟
     */
    'msg_like': function( param ) {
        if ( !this.isTokenLive( 10 ) ) {
            return this.res.end('{"status":-21}')
        }

        var php = {
            'like': '/richmessage/richmessage_like',
            'unlike': '/richmessage/richmessage_unlike'
        }
        this.ajaxTo( php[ param ] )
    },

    /**
     * 提交信息
     * @param param
     */
    'circle': function( param ) {
        this.debugSnake( { target: 'pmlab1' } )
        var php = {
            /**
             * http://redmine.meilishuo.com/projects/adapter/wiki/Chatcircle_post
             * 格式跟这个一样
             */
            richmsg: '/circle/richmsg_post',
            /*申请加入圈子*/
            join: '/circle/member_join'
        }

        this.ajaxTo( php[ param ] )
    }
}
exports.__create = controller.__create( aw, controlFns );
