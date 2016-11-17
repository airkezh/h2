/*common*/
var $              = require( 'wap/zepto' ),
    CheckLogin     = require( 'circle/app/checkLogin' ),
    Tab            = require( 'wap/component/tab' ),
    touchSlide     = require( 'wap/app/touchSlide' ),
    WaterFall      = require( 'circle/component/waterfall' ),
    Tracking       = require( 'wap/app/tracking' ),
    ShareTmp       = require( 'wap/component/shareTmp' ),

    $win           = $( window ),
    LIMIT          = 10,
    BLANK_EL       = '.data-blank',
    FOLLOWED       = 'is-followed',
    NOT_FOLLOW     = 'is-not-follow',
    SIMILAR        = 'similar',
    MATCH          = 'match',
    SHOP           = 'shop',
    TID            = fml.vars.tid,
    R              = fml.vars.R,
    CR_STR         = R + ':twitter_id=' + TID + ':_page_area=',
    DATA           = {
        tid:       TID
    },

    $body          = $( document.body ),
    $tabs          = $body.find( '.tab' ),
    $contents      = $body.find( '.js-tab-content' ),
    $contentWrap   = $body.find( '.content-wrap' ),
    $pullUp        = $( '#pullUp' ),
    tabHeight      = $tabs.height(),
    initTabPos     = $tabs.offset().top,
    lastTabPos     = initTabPos,
    oldMarginTop   = $contentWrap.css( 'marginTop' ),
    isTabFixed     = false,
    os             = Meilishuo.config.os,

    followData     = {
        follow: {
            url:         '/aj/follow/shop/follow',
            text:        '已关注',
            removeClass: NOT_FOLLOW,
            addClass:    FOLLOWED
        },

        unfollow: {
            url:         '/aj/follow/shop/unfollow',
            text:        '关注',
            removeClass: FOLLOWED,
            addClass:    NOT_FOLLOW
        }
    },
    //瀑布流加载商品完毕
    notEnoughItems = false,
    isRequesting   = false,
    isMatchLoaded  = false,
    isShopLoaded   = false,
    isSimilarEmpty = false,
    isMatchEmpty   = false,
    isShopEmpty    = false,
    isFirstLoaded  = true,
    waterfallInstance, tabInstance, $waterfallEl, $waterfallBlank

require( 'wap/zepto/touch' );

function followOrUnfollow( $el, type ) {
    var shopId = $el.data( 'shop' ),
        fData  = followData[ type ]

    $.ajax( {
        data:     {
            shop_id: shopId
        },
        dataType: 'json',
        type:     'post',
        url:      fData.url,
        success:  function( data ) {
            if ( data.code == 0 ) {
                $el.addClass( fData.addClass )
                    .removeClass( fData.removeClass )
                    .text( fData.text )
            } else {
                alert( data.msg )
            }
        },
        complete: function() {
            isRequesting = false
        }
    } )
};

function getAppLink( appLink ) {
    var link = 'meilishuo'
    if ( os && os.ipad ) {
        link = 'meilishuohd'
    }
    link += '://' + appLink.protocol + '.meilishuo?json_params=' + encodeURIComponent( JSON.stringify( appLink.param ) )
    return link
}

function parseItemLink( id, R ) {
    return getAppLink( {
        protocol: 'twitter_single',
        param:    {
            'twitter_info': {
                'twitter_id': id,
                'is_doota':   1
            },
            r:              R
        }
    } )
}

function parseLink( protocol, param ) {
    return getAppLink( {
        protocol: protocol,
        param:    param
    } )
}

function handleDataLoaded() {
    $pullUp.attr( 'status', 'loading' ).show()

    var type = tabInstance.els.curTab.data( 'type' )

    if ( ( type == MATCH && isMatchLoaded ) ||
        ( type == SHOP && isShopLoaded ) ) {
        $waterfallBlank.hide()
        if ( ( type == MATCH && isMatchEmpty ) || ( type == SHOP && isShopEmpty ) ) {
            $pullUp.hide()
        } else {
            $pullUp.attr( 'status', 'stop' ).show()
        }
    } else {
        if ( isSimilarEmpty ) {
            $pullUp.hide()
            $waterfallBlank.show()
        } else {
            $pullUp.show()
            $waterfallBlank.hide()
        }
    }
}

function requestTabData( config ) {
    config.data.timestamp = +( new Date() )

    $.ajax( {
        type:     'get',
        dataType: 'json',
        data:     config.data,
        url:      config.url,
        success:  config.success
    } )
}

( function() {
    var tabDataConfig = {}

    tabDataConfig[ MATCH ] = {
        url:     '/aj/similar/index/match',
        data:    DATA,
        success: function( data ) {
            var html = ShareTmp( 'tmpl_match', {
                data:          data,
                parseItemLink: parseItemLink,
                R:             data.r
            } )
            $contents.filter( '.content-match' ).html( html )

            isMatchLoaded = true
            isMatchEmpty  = !data.data
            handleDataLoaded()
        }
    }

    tabDataConfig[ SHOP ] = {
        url:     '/aj/similar/index/shop',
        data:    DATA,
        success: function( data ) {
            var html = ShareTmp( 'tmpl_shop', {
                data:          data,
                parseLink:     parseLink,
                parseItemLink: parseItemLink,
                R:             data.r
            } )
            $contents.filter( '.content-shop' ).html( html )

            isShopLoaded = true
            isShopEmpty  = data.data && !data.data.length
            handleDataLoaded()
        }
    }

    $waterfallEl    = $contents.find( '.waterfall-wrap' )
    $waterfallBlank = $waterfallEl.next( BLANK_EL )

    $win.on( 'touchmove touchend scroll', function() {
        var lastPos = $win.scrollTop()

        if ( lastPos - lastTabPos > tabHeight ) {
            if ( !isTabFixed ) {
                $tabs.addClass( 'fixed-tab' )
                $contentWrap.css( 'marginTop', tabHeight )
                isTabFixed = true
            }
        } else if ( isTabFixed ) {
            $tabs.removeClass( 'fixed-tab' )
            $contentWrap.css( 'marginTop', oldMarginTop )
            isTabFixed = false
            lastTabPos = $tabs.offset().top
        }
    } )

    waterfallInstance = WaterFall.init( {
        el:             $waterfallEl,
        tmpl:           'tmpl_similar',
        url:            '/aj/similar/index/similar',
        data:           DATA,
        colNum:         2,
        helpers:        {
            parseItemLink: parseItemLink
        },
        dataFilter:     function( data ) {
            return Array.isArray( data ) ? data : data.data
        },
        onFetchSuccess: function( data, config ) {
            if ( !data.length ) {
                if ( isFirstLoaded ) {
                    isFirstLoaded  = false
                    isSimilarEmpty = true
                    $waterfallBlank.show()
                    $pullUp.hide()
                }

                notEnoughItems = true
                waterfallInstance.lock()
                $pullUp.attr( 'status', 'stop' )
                return
            }

            isFirstLoaded = false

            config.data.offset += LIMIT
        }
    } )

    tabInstance = Tab.init( {
        rememberState: true,
        stateName:     'type',
        afterChange:   function( item ) {
            var type = item.data( 'type' ),
                dataConfig

            window.scrollTo( 0, initTabPos )
            setTimeout( function() {
                $win.triggerHandler( 'scroll' )
            }, 0 )

            Tracking.cr( 'page_element', {
                _action:   'click',
                _location: CR_STR + item.data( 'area' )
            } )

            handleDataLoaded()

            if ( type != SIMILAR ) {
                dataConfig = tabDataConfig[ type ]

                if ( dataConfig ) {
                    requestTabData( tabDataConfig[ type ] )
                    delete tabDataConfig[ type ]
                }

                waterfallInstance.lock()
            } else {
                if ( !waterfallInstance.isInitialed ) {
                    waterfallInstance.isInitialed = true
                    waterfallInstance.start( fml.vars.similarGoods )
                }

                if ( !notEnoughItems ) {
                    waterfallInstance.unlock()
                    $pullUp.attr( 'status', 'loading' )
                }
            }
        }
    } )

    if ( tabInstance.getCurTab() == SIMILAR ) {
        waterfallInstance.isInitialed = true
        waterfallInstance.start( fml.vars.similarGoods )
    }

    $body.on( 'tap', '.js-follow-btn', function( e ) {
        if ( CheckLogin() && !isRequesting ) {
            isRequesting = true

            var $el = $( e.target )

            if ( $el.hasClass( NOT_FOLLOW ) ) {
                followOrUnfollow( $el, 'follow' )
            } else {
                followOrUnfollow( $el, 'unfollow' )
            }
        }
    } )

    if(Meilishuo.config.os.mobileQQ){
        $('body').on('click', '.main a',function(e){
            e.preventDefault();

            var $t = $('title')
            var title = $t.html()
            var link =  'http://' + location.host + $(this).attr('href');

            $t.html('返回')
            mqq.ui.refreshTitle()
            mqq.ui.openUrl({
                url: link,
                target: 1,
                style: 0
            })

            setTimeout(function (){
                $t.html(title)
                mqq.ui.refreshTitle()
            }, 0)

        });
    }
}() )
