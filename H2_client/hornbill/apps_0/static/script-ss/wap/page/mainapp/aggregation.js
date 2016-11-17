/*common*/

require( 'wap/zepto/fastclick' )

var $            = require( 'wap/zepto' ),
    WaterFall    = require( 'circle/component/waterfall' ),
    OpenAppLink  = require( 'wap/app/openAppLink' ),
    FollowUser   = require( 'wap/app/followUser' ),
    GoTop        = require( 'wap/component/gotop' ),
    WindowScroll = require( 'wap/component/windowScroll' ),
    $body        = $( document.body ),
    $tabs        = $( '#tabs' ),
    $cur         = $tabs.find( '.active' ),
    $container   = $( '#container-wrap' ),
    $loadingBar  = $( '#loading-bar' ),
    curType      = $cur.data( 'type' ) || '',
    keyword      = fml.vars.searchKeyword,
    r            = fml.vars.r,

    config       = {
        'addr-user': {
            type: 'user',
            url: '/aj/aggregation/addr_user',
            tmpl: 'tmpl-user',
            hasSideGap: true,
            colGap: '0 10',
            colNum: 1,
            data: {
                addr: keyword,
                page_size: 10
            }
        },

        'addr-circle': {
            type: 'circle',
            url: '/aj/aggregation/addr_circle',
            tmpl: 'tmpl-circle',
            hasSideGap: false,
            colNum: 2,
            data: {
                addr: keyword,
                page_size: 10
            }
        },

        'addr-item': {
            type: 'item',
            url: '/aj/aggregation/addr_item',
            tmpl: 'tmpl-item',
            hasSideGap: true,
            colNum: 2,
            data: {
                addr: keyword,
                page_size: 10
            }
        },

        'word-item': {
            type: 'item',
            url: '/aj/aggregation/word_item',
            tmpl: 'tmpl-item',
            hasSideGap: true,
            colNum: 2,
            data: {
                word: keyword,
                page_size: 10
            }
        },

        'tag-user': {
            type: 'user',
            url: '/aj/aggregation/tag_user',
            tmpl: 'tmpl-user',
            hasSideGap: true,
            colNum: 1,
            data: {
                tag_name: keyword,
                page_size: 10
            }
        }
    },
    environment  = Meilishuo.config.os.mlsApp ? 'app' : 'wap',
    rholder      = /{([^}]+)}/g,
    rcurls       = /{|}/g,
    linkConfig   = {
        goods: {
            wap: '//m.meilishuo.com/share/item/',
            app: 'twitter_single'
        },

        textpic: {
            wap: '//circle.meilishuo.com/circle/textpic/{msg_id}?r={r}',
            app: 'rich_message'
        },

        miscpic: {
            wap: '//m.meilishuo.com/mainapp/detail/{msg_id}?r={r}',
            app: 'rich_message'
        }
    },

    curConf      = curType && config[ curType ],

    ACTIVE       = 'active',
    PREFIX       = 'cont-',
    //当前显示的空白元素
    curBlank

function getAppLink( protocal, params ) {
    return OpenAppLink.getAppLink( {
        protocol: protocal,
        param: params
    } )
}

function convertLink( protocol, params ) {
    var url  = linkConfig[ protocol ][ environment ];
    params.r = r;

    if ( environment == 'wap' ) {
        if ( protocol == 'goods' ) {
            url += params.twitter_info.twitter_id + '?r=' + r;
        } else {
            url.match( rholder ).forEach( function( str ) {
                url = url.replace( str, params[ str.replace( rcurls, '' ) ] );
            } );
        }

        return url;
    } else {
        return 'meilishuo://' + url
            + '.meilishuo?json_params='
            + encodeURIComponent( JSON.stringify( params ) )
    }
}

function changeState( type, url ) {
    history.replaceState( type, null, url )
}

if ( typeof history.replaceState != 'function' ) {
    changeState = function() {
        return true
    }
}

function tabInit( type ) {
    var _waterfall, _container

    curConf.isInit     = true
    curConf.$container = _container = $( '<div/>', {
        id: PREFIX + type,
        'class': 'container-' + type.split( '-' )[ 1 ]
    } )

    $container.prepend( _container )

    _waterfall = curConf.waterfall = WaterFall.init( {
        el: _container,
        url: curConf.url,
        tmpl: curConf.tmpl,
        colNum: curConf.colNum,
        hasSideGap: curConf.hasSideGap,
        data: curConf.data,
        colGap: curConf.colGap || 10,
        helpers: {
            getAppLink: getAppLink,
            convertLink: convertLink
        },
        dataFilter: function( data ) {
            return data
        },
        onBeforeFetch: function() {
            $loadingBar.attr( 'status', 'loading' )
        },
        onFetchSuccess: function( data, config ) {
            /**
             * 第一帧，并且返回数据为空，显示空页面
             */
            if ( config.data.frame == 0 && !data.length ) {
                $body.addClass( 'blank-page' )
                _waterfall.destroy()
                curBlank && curBlank.hide()
                curBlank        = $( '#blank-' + curConf.type ).show()
                curConf.isBlank = true
                return
            } else {
                curBlank && curBlank.hide()
                $body.removeClass( 'blank-page' )
            }

            //TODO page_size
            if ( !data.length ) {
                _waterfall.destroy()
            }
        },
        onFetchFinished: function() {
            $loadingBar.attr( 'status', 'stop' )
        }
    } )

    _waterfall.start()
}

function tabChange() {
    var type

    if ( $cur[ 0 ] != this || !curConf.isInit ) {

        $cur.removeClass( ACTIVE )
        $cur = $( this ).addClass( ACTIVE )

        if ( curConf ) {
            curConf.$container && curConf.$container.hide()
        }

        type    = $cur.data( 'type' )
        curConf = config[ type ]

        if ( !curConf.isInit ) {
            tabInit( type )
        }

        curConf.$container.show()
        if ( curBlank ) {
            curBlank.hide()
        }
        if ( curConf.isBlank ) {
            curBlank = $( '#blank-' + curConf.type ).show()
        }

        changeState( 'tab-change', '?keyword=' + keyword + '&type=' + curConf.type )
    }
}

(function init() {
    var $gotop      = $( '.gotop-wrap' ),
        isGotopHide = false

    WindowScroll.bind( function( pos, isDown ) {
        if ( pos < 400 ) {
            if ( !isGotopHide ) {
                $gotop.hide()
                isGotopHide = true
            }
        } else {
            if ( isDown ) {
                if ( !isGotopHide ) {
                    $gotop.hide()
                    isGotopHide = true
                }
            } else if ( isGotopHide ) {
                $gotop.show()
                isGotopHide = false
            }
        }
    }, 'gotop' )

    GoTop.init( {
        el: $gotop
    } )

    FollowUser.follow( {
        el: '.js-focus',
        followClass: 'done',
        unfollowClass: 'ready',
        follow: '关注',
        unfollow: '取消关注'
    } )

    $tabs.on( 'click', '[data-type]', tabChange )

    $cur.trigger( 'click' )
})()
