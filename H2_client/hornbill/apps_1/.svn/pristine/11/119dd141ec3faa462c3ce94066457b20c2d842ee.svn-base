/*common*/

/**
 * @name: followUser
 * @desc: 关注达人
 * @author: xiaojingwang
 * @use：
 *      var followUser = require('app/followUser');
 *      followUser({
 *          el: '.follow-user',
 *          numEl: '.js-num'
 *      })
 *
 *      <em>需要在关注按钮上使用 data-shop 属性来提供店铺 id</em>
 *
 *      el:必须传入
 *          el 使用事件代理来处理关注按钮的点击
 *
 *      numEl:该达人现在拥有多少关注元素，可以不传
 *          @WARN：numEl 必须为『关注按钮』的子元素
 *
 *          如果关注人数元素不能放到按钮下面，可以手动设置 $numEl(必须为 jQuery 对象)
 *
 *      $numEl:关注人数元素的 jQuery 对象
 *          @WARN：该值设置之后不会改变
 *
 *
 *      由于代码中在处理 numEl 时存在的限制，建议自己在事件中处理人数加减。
 *
 */
    var $ = require( 'wap/zepto/touch' ),
        checkLogin = require('circle/app/checkLogin'),
        $body = $( document.body ),

        ACTING = 'clicked',
        gConfig,
        afterFollow,
        afterUnFollow,

        defaultConfig = {
            /**
             * 以下三项为默认文案
             */
            follow: '关注',
            unfollow: '取消',
            followed: '已关注',
            isFollowing: '关注中..',
            isCanceling: '取消中..',

            /**
             * 按钮上的 class，以此来区分关注状态
             */
            followClass: 'att',
            unfollowClass: 'no_att',

            /**
             * 发送请求的 API
             */
            followApi: '/aw/user/newfollow',
            unfollowApi:  '/aw/user/cancelFollow',

            /**
             * 事件处理函数默认 this 为按钮(jQuery 对象)，参数为 config
             */
            events: {
                /**
                 * 关注后触发的事件
                 * 默认为关注人数 + 1
                 */
                'afterFollow': function( c ) {
                    var $numEl = c.$numEl;

                    if(!$numEl && c.numEl) {
                        /**
                         * 这里使用了 this.find()
                         */
                        $numEl = this.find(c.numEl);
                    }
                    $numEl && $numEl.html(parseInt($numEl.html()) + 1);

                },

                /**
                 * 取消关注后触发的事件
                 * 默认为关注人数 - 1
                 */
                'afterUnfollow': function(c) {
                    var $numEl = c.$numEl;

                    if( !$numEl && c.numEl ) {
                        $numEl = this.find(c.numEl);
                    }
                    $numEl && $numEl.html( parseInt( $numEl.html() ) - 1 );

                },
            }
        };

    function execute ( e, action ) {
        if (!checkLogin()) return;
            e.preventDefault();
            var $this = $( this );
            var fuids = [];
            var config = gConfig;
            if ( action == 'follow' ){
                var changingWords = config.isFollowing,
                    postApi = config.followApi,
                    successState = followedState,
                    errorState = unfollowedState,
                    afterfunc = afterFollow;
            }else{
                var changingWords = config.isCanceling,
                postApi = config.unfollowApi,
                successState = unfollowedState,
                errorState = followedState,
                afterfunc = afterUnFollow;
            }
            if(!$this.data( ACTING )) {
                $this.data( ACTING, true );
                $this.html( changingWords );
                $this.each(function( _, el ) {
                    fuids.push( $(this).data( 'id' ) )
                });
                var data ={
                    'fuid' : fuids.join(','),
                    'weiquan' : 1
                }

                $.ajax({
                   url: postApi,
                   type: 'POST',
                   dataType: 'json',
                   data: data,
                   success: function( data ) {
                        successState( $this );
                        afterfunc.call ( $this, config );
                        action == 'follow' && $this.length > 1 && $(document).trigger( 'allSuccess' );
                   },
                   error: function( data ) {
                        errorState( $this );
                        alert( '系统繁忙,请稍后再试' );
                   },
                   complete: function( data ) {
                        $this.data( ACTING, false );
                   }
               })
            }
    }

    //关注前的按钮
    function unfollowedState( _this ) {
        _this.html( gConfig.follow )
        .removeClass( gConfig.followClass )
        .addClass( gConfig.unfollowClass );
    }

    //关注后的按钮
    function followedState ( _this ) {
        _this.html( gConfig.unfollow )
        .removeClass( gConfig.unfollowClass )
        .addClass( gConfig.followClass );
    }

exports.follow = function(config) {
    gConfig = $.extend( true, {}, defaultConfig, config )
    var events        = gConfig.events,
        unfollowClas  = gConfig.unfollowClass,
        followClass   = gConfig.followClass

    afterFollow       = events.afterFollow;
    afterUnFollow     = events.afterUnfollow;

    $body.on( 'tap', gConfig.el, function( e ) {
        var $el = $( this )
        if ( $el.hasClass( unfollowClas ) ) {
            execute.call( this, e, 'follow' )
        } else {
            execute.call( this, e, 'unfollow' )
        }
    } )
}

exports.followAll = function( els, e ) {
    execute.call( els, e, 'follow' )
}
