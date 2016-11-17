/*common*/
var $            = require( 'wap/zepto' )
    , timedown   = require( 'wap/app/doota/timedown' )
    , shareTmp   = require( 'wap/component/shareTmp' )
    , dialog     = require( 'wap/app/dialog' )
    , scroll     = require( 'wap/component/windowScroll' )
    , touchSlide = require( 'wap/app/touchSlide' )
    , iscroll    = require( 'wap/iscroll' ),
    $doc         = $( document ),
    $imageSlide  = $( '#imageSlide' ),
    _adesc       = $( '.activity-rule' ),
    $nav         = $( '.navbox' ),
    $seemore     = $( '.seemore' ),
    $contentBox  = $( '#content_box .content' ),
    $loadBtn     = $( '.js-btn-load' ),
    $nextBtn     = $( '.js-btn-next' ),
    $allBtn      = $( '.js-btn-all' ),
    $empty       = $( '.js-empty' ),
    $curTab, timer;

require( 'wap/zepto/fastclick' )

fml.vars.isexit  = isexit;
fml.vars.joinurl = joinurl;

var special_new = {
    clienttablen:   5, /*可视tab数*/
    targettabinx:   3, /*目标tab的索引*/
    Cwidth:         document.body.clientWidth > 640 ? 640 : document.body.clientWidth, //内容窗口宽度
    init:           function() {
        var navWidth = $( '.nav_wap' ).width(),
            $li = $nav.find( 'ul li' )
        this.tabwidth = Math.floor(  navWidth / this.clienttablen );
        $nav.find( 'ul' ).width( this.tabwidth * $li.length )
        $li.width( this.tabwidth );
        this.bindEvent();
        $curTab       = $( '.points .curr' )
        this.navMove( $curTab );
        $nav.show();
    },
    bindEvent:      function() {
        var that = this;
        $( '.points li' ).on( 'tap', function( e ) {
            $curTab = $( this )
            e.preventDefault();
            //last tab
            if ( $curTab.data( 'islast' ) == 1 ) {
                if ( fml.vars.isLoadAll ) {
                    //zepto 的 show() 会把 a 标签的 display 设置为 inline
                    $allBtn.css( 'display', 'block' )
                    $nextBtn.hide()
                }
            } else {
                if ( fml.vars.isLoadAll ) {
                    $allBtn.hide()
                    $nextBtn.show()
                }
            }
            that.navMove( $curTab );
            if ( $nav.hasClass( 'scrollin' ) ) {
                document.getElementById( 'nav_wap' ).scrollIntoView();
            }
        } )
        _adesc.on( 'tap', function() {
            alertMsg( {}, 'ruleMsg' );
        } )
        $seemore.on( 'click', function() {
            $( '.points li.tomorrow' ).click();
        } )

        $loadBtn.on( 'click', function() {
            setTimeout( function() {
                $contentBox.find( 'li' ).show()
                $doc.triggerHandler( 'load-seckill' )
            }, 0 )
            $loadBtn.hide()

            if ( $curTab.data( 'islast' ) == 1 ) {
                $allBtn.css( 'display', 'block' )
            } else {
                $nextBtn.show()
            }
            fml.vars.isLoadAll = true
        } )

        $nextBtn.on( 'click', function() {
            $curTab
                .next()
                .trigger( 'tap' )[ 0 ].scrollIntoView()
        } )

        $doc.on( 'nav-finished', function() {
            if ( !fml.vars.isLoadAll ) {
                $nextBtn.hide()
                $loadBtn.show()
            }
            $empty.hide()
        } )
    },
    navMove:        function( me ) {/*导航条移动效果*/
        var tabindex = me.index() + 1;
        var movelen  = this.targettabinx - tabindex;
        me.parent( 'ul' ).css( { '-webkit-transform': 'translate3d(' + this.tabwidth * movelen + 'px, 0, 0)' } );
        me.addClass( 'curr' ).siblings().removeClass( 'curr' );
        /*tab点击异步拉取商品信息*/
        var _hour = me.data( 'hour' );
        this.getspeciallist( 2, 'zd_info', _hour, me );
    },
    getspeciallist: function( type, id, hour, obj ) {/* 获取tab对应宝贝*/
        var data      = {};
        var that      = this;
        data.event_id = fml.vars.event_id;
        data.type     = type;
        if ( hour != 'none' )data.time = hour;
        that.countdown( obj );
        $.get( '/aj/tuan/qiang8_list?', data,
            function( res ) {
                var list = { 'item': res.data.goods_list || res.data.segments };
                $contentBox.html( shareTmp( id, list ) );
                $doc.trigger( 'nav-finished' )
                $doc.triggerHandler( 'load-seckill' )
                setTimeout( function() {
                    if ( !$contentBox.html().length ) {
                        that.getspeciallist( type, id, hour );
                        return;
                    }
                }, 1000 )
                $( '.foreshow' ).show();
                $( '.time-box' ).show();
            }, 'json' );
    },
    navFixed:       function() {
        scroll.yIn( $nav.position().top, function() {
                $nav.removeClass( 'scrollout' ).addClass( 'scrollin' );
            },
            function() {
                $nav.removeClass( 'scrollin' ).addClass( 'scrollout' );
            } )
    },
    countdown:      function( obj ) {
        var that          = this;
        clearTimeout( timer );
        var status        = obj.data( 'status' ),
            unix          = obj.data( 'unix' ),
            reminds       = parseInt( unix ) * 10;
        fml.vars.timeunix = unix;
        var tipcontent    = status == 0 ? '本场抢购已结束' : (status == 1 ? '距离本场结束' : '距离本场开始');
        $( '.c-tip' ).text( tipcontent );
        if ( status == 0 ) {
            $( '.time' ).hide();
            return;
        }
        timer = setInterval( function() {
            if ( unix == 599 && status == 2 ) {
                $( '.good_box' ).find( '.status-btn' ).each( function( data ) {
                    $( this ).html( '<i class=\'clock\'></i>马上开抢' ).off( 'tap' );
                    $( this ).removeClass( 'remind_btn' ).addClass( 'reminded_btn' );
                } )
            }
            if ( unix == 0 ) {
                window.location.reload();
            }
            $( '.time' ).show();
            var time = that.calcutetime( unix );
            $( '.time' ).find( '.t-hour' ).html( time.h );
            $( '.time' ).find( '.t-minute' ).html( time.m );
            $( '.time' ).find( '.t-seconds' ).html( time.s );
            unix--;
        }, 1000 );
    },
    calcutetime:    function( stamp ) {
        var t = stamp * 1000;
        var d = Math.floor( t / (60 * 60 * 24 * 1000) );
        t     = t - d * (60 * 60 * 24 * 1000);
        var h = Math.floor( t / (60 * 60 * 1000) );
        t     = t - h * (60 * 60 * 1000);
        var m = Math.floor( t / (60 * 1000) );
        t     = t - m * (60 * 1000);
        var s = Math.floor( t / 1000 );
        return {
            d: d < 10 ? '0' + d : d,
            h: h < 10 ? '0' + h : h,
            m: m < 10 ? '0' + m : m,
            s: s < 10 ? '0' + s : s
        }
    },
}

special_new.init();

/*判断用户是否已设置提醒*/
function isexit( tids, val ) {
    for ( var item in tids ) {
        if ( tids[ item ] == val )
            return true;
    }
    return false;
}
/*拼接r参数（用于模板里）*/
function joinurl( protocol, param, isosapp, r, wapHref ) {
    if ( !protocol || !param ) return false
    if ( !isosapp ) return wapHref || '###noapp'
    if ( r ) param.r = r
    var link = 'meilishuo'
    link += '://' + protocol + '.meilishuo?json_params=' + encodeURIComponent( JSON.stringify( param ) )
    return link
}

/*弹窗*/
function alertMsg( data, id ) {
    //_adesc.removeClass('movelr');
    var tpl = shareTmp( id, data );
    $.fn.dialog( { dialogContent: tpl, dialogTitle: '' } );
    $( '#maskLayer,.rbclose' ).on( 'touchstart touchend', function( event ) {
        event.preventDefault();
    } ).on( 'tap', function( e ) {
        $( '.closeDialog' ).trigger( 'tap' );
        //_adesc.addClass('movelr');
    } );
}

function alertMsgFn( msg, twitter_id, shop_id, btn_str ) {
    var detail_url = joinurl( 'twitter_single', {
        'twitter_info': {
            'twitter_id': twitter_id,
            'is_doota':   1,
            'event_end':  1
        }
    }, fml.vars._os, fml.vars._r, '/share/item/' + twitter_id );
    var param      = { "r": fml.vars._r, "shop_id": shop_id };
    var shop_url   = 'meilishuo://shop.meilishuo?json_params=' + encodeURIComponent( JSON.stringify( param ) );
    var data       = { msg: msg, shop_url: shop_url, detail_url: detail_url, btn_str: btn_str };
    alertMsg( data, 'alertMsg' );
}

var $goodsInfo  = $( '.goodsInfo' ),
    _iscrollObj = null
$seemore        = $( '.seemore' );
if ( $goodsInfo.length > 0 ) {
    var _w      = $( window ).width() / 4;
    //$goodsInfo.css({ width: _w, marginLeft: 10});
    $goodsInfo.css( { 'min-width': _w, 'max-width': _w, marginLeft: 10 } );
    $seemore.height( $seemore.width() );
    $( '.fore-list-wrap' ).width( $goodsInfo.length * ($goodsInfo.width() + parseFloat( $goodsInfo.css( 'margin-left' ) )) + 10 );
    _iscrollObj = new iScroll( document.querySelector( '.fore-list' ),
        {
            useTransition: true
            , vScroll:     false
            , hScroll:     true
            , hScrollbar:  false
            , vScrollbar:  false
        } );
}
