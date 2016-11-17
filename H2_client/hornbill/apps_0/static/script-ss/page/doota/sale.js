/*common*/

var vars            = fml.vars,
    goodsSKU        = vars.sku,
    goodsHasColor   = vars.hasColor,
    goodsHasSize    = vars.hasSize,
    goodsId         = vars.goods.id,
    goodsPid        = vars.goods.pid,
    goodsTwitter    = vars.goods.twitter_id,

    $               = require( 'jquery' ),
    stock           = require( 'app/doota/stock' ),
    picZoom         = require( 'app/doota/picZoom' ),
    checkLogin      = require( 'app/checkLogin' ),
    Animation       = require( 'core/animation' ),
    Tween           = Animation.Tween,
    requestFrame    = Animation.requestFrame,
    urlHandle       = require( 'component/urlHandle' ),
    tracking        = require( 'app/tracking' ),
    itemCom         = require( 'page/doota/itemCom' ),
    followShop      = require( 'app/followShop' ),
    shareTmp        = require( 'component/shareTmp' ),
    //引入额外的文件，别删
    saleExtra       = require( 'page/doota/sale_extra' ),
    TimeDown        = require( 'app/doota/timedown' ),
    WindowScroll    = require( 'component/windowScroll' ),
    ShareTo         = require( 'app/shareTo' ),
    TwitterComment  = require( 'app/twitter_comment' ),
    Search          = require( 'component/search/index' ),
    $amount         = $( '.amount' ),
    $numBox         = $amount.find( '.js-stock' ),
    orderSize, orderColor, orderNum,
    //@TODO
    skuInfo,

    isThumbComplete = false,

    SHOP_ID         = vars.shop_id,
    searchInstance

//自定义搜索栏
searchInstance = Search.init( {
    tmpl: 'tmpl_shop_search',
    el:   '#shop-search-wrap'
} )

searchInstance.$el.on( 'click', '.js-search-site', function() {
    searchInstance.widgets.AutoComplete.jump()
} ).on( 'click', '.js-search-shop', function() {
    var searchKey = $.trim( searchInstance.widgets.AutoComplete.$input.val() )

    if ( searchKey ) {
        location.href = '/shop/' + fml.vars.shop_id + '?query=' + encodeURIComponent( searchKey )
    }
} )

$( '.reportL' ).mouseover( function( event ) {
    $( '.warn' ).show();
} );
$( '.reportL' ).mouseout( function( event ) {
    $( '.warn' ).hide();
} );
$( '.reportL' ).on( 'click', function( event ) {
    if ( !checkLogin() ) {
        return false;
    }
} );

if ( !goodsSKU ) {
    return
}

goodsSKU[ 'default' ] = {
    repertory: vars.repertory
}

orderNum = stock.bind( {
    'input':       $numBox.find( 'input' ),
    'minus':       $numBox.find( '.js-stock-minus:not(.hidden)' ),
    'plus':        $numBox.find( '.js-stock-plus:not(.hidden)' ),
    'stockMax':    $amount.find( '.js-stock-reserve span' ),
    'maxOrderNum': fml.vars.maxOrderNum
} )

orderNum.tipOnout = function( stat ) {
    var msg_limit = $( '.msg_limit' ),
        msg_over  = $( '.msg_over' ),
        msg_zero  = $( '.msg_zero' )

    switch ( stat ) {
        case 1:
            msg_limit.show();
            msg_over.hide();
            msg_zero.hide()
            break;
        case 2:
            msg_limit.hide();
            msg_over.show();
            msg_zero.hide()
            break;
        case 3:
            msg_limit.hide();
            msg_over.hide();
            msg_zero.show()
            break;
        default:
            msg_limit.hide();
            msg_over.hide();
            msg_zero.hide()
    }
}

var orderSkinBox = $( '.sku_info .skin' ),
    $amount      = $( '.amount .js-stock-num' ),
    defineCbk, defineUnReadyCbk;

function getlogUnit( type, typeCont ) {
    var ret     = {
        'goods_pid':  goodsPid,
        'goods_id':   goodsId,
        'twitter_id': goodsTwitter,
        'user_id':    Meilishuo.config.user_id,
        'url':        window.location.href
    }
    ret[ type ] = typeCont
    return ret
}

function getOrderInfo() {
    var ret = {
        'goods_pid':  goodsPid,
        'goods_id':   goodsId,
        'twitter_id': goodsTwitter,
        'amount':     +$amount.val(),
        'price':      skuInfo.campaign_price || skuInfo.price,
        'sku_id':     skuInfo.sku_id
    }

    if ( fml.vars.isPresale ) {
        ret.presale_type = 'deposit'
    }

    if ( orderSize ) {
        ret.size = skuInfo.size_name + '__' + skuInfo.size
    }
    if ( orderColor ) {
        ret.color = skuInfo.color_name + '__' + skuInfo.color
    }

    return ret
}

function closePromtBox() {
    if ( !orderSkinBox.is( '.promptBox' ) ) {
        return
    }

    $( '.define' ).hide()
    defineCbk        = null
    defineUnReadyCbk = null
    orderSkinBox.removeClass( 'promptBox' )
}

$( '.close_z', orderSkinBox ).click( closePromtBox )

function checkSelectDone() {
    if ( !orderSize && goodsHasSize ) {
        return false
    }

    if ( !orderColor && goodsHasColor ) {
        return false
    }

    return true
}

var btn_box = $( '.btn_box .same_btn a , .tab_tle .add_cart' ).click( function( e ) {
    var ele = $( this )
    if ( ele.is( '.non_buy' ) || ele.is( '.js-btn-disabled' ) ) return
    tracking.cr( 'buy', getlogUnit( 'btn', ele.is( '.buy_btn' ) ? 'buy_btn' : 'add_cart' ) )
    var confirmCbk = ele.is( '.buy_btn' ) ? function( opt ) {
        var orderedInfo      = getOrderInfo()
        orderedInfo[ 'ori' ] = 'share'
        var query            = urlHandle.http_build_query( orderedInfo )
        var orderURI         = '/order/init/?' + query + '&shop_id=' + SHOP_ID;
        opt                  = opt || {
                'param': {
                    'btn': 'buy_btn'
                }
            };
        if ( !checkLogin( opt ) ) {
            ///connect/tobuy_sku_cache?skuinfo=orderInit url
            $.get( '/aw/sku/ready_tobuy', {
                "skuinfo": orderURI
            } )
            fml.on( 'login_success', function() {
                ele.trigger( 'click' )
            } )
            return
        }
        window.location.href = orderURI
    } : function() {
        itemCom.addToCart( getOrderInfo(), e )
    }
    if ( !checkSelectDone() ) {
        var ct       = 0,
            posTop   = $( document ).scrollTop(),
            posMove  = posTop - (orderSkinBox.offset().top - 90)
        var duration = posMove > 10 ? Math.ceil( posMove / 10 ) : 1
        if ( duration > 60 ) duration = 60

        function showOrderSkinBox() {
            var top = Tween.Cubic.easeInOut( ct++, posTop, -posMove, duration )
            window.scrollTo( 0, top )
            if ( ct <= duration ) requestFrame( showOrderSkinBox )
        }

        showOrderSkinBox()
        orderSkinBox.addClass( 'promptBox' )
        tracking.cr( 'skinShow', {
            'btn': ele.is( '.buy_btn' ) ? 'buy_btn' : 'add_cart'
        } )
        defineCbk        = function() {
            $( '.define' ).show().unbind( 'click' ).click( function() {
                tracking.cr( 'sureBtn', {
                    'btn': ele.is( '.buy_btn' ) ? 'buy_btn' : 'add_cart'
                } )
                confirmCbk( {
                    'param': {
                        'btn': 'buy_btn_sure'
                    }
                } )
                defineCbk        = null
                defineUnReadyCbk = null

            } )
        }
        defineUnReadyCbk = function() {
            $( '.define' ).hide()
        }

        return
    }
    confirmCbk()
} )

orderNum.outStock = function( isOut ) {
    if ( isOut ) $( btn_box ).addClass( 'non_buy' )
    else $( btn_box ).removeClass( 'non_buy' )

}

var $bigPic = $( '.j-big-pic' );

/**
 * 『颜色』与『尺码』的点击操作
 */
;
(function() {
    var $colorList, $sizeList, $colors, $sizes,
        curSelectedEl = {},
        idsList       = {},

        ACTIVE        = 'active',
        OUT_OF_STOCK  = 'out_of_stock',
        PRICE_MIN     = 'price-min',
        PRICE_MAX     = 'price-max',
        JS_ITEM_CLASS = '.js-item'

    function init() {
        $colorList = $( '#colorList' )
        $sizeList  = $( '#sizeList' )
        $colors    = $colorList.find( JS_ITEM_CLASS )
        $sizes     = $sizeList.find( JS_ITEM_CLASS )

        /**
         * 收集 color 与 size 的 id，用于循环 fml.vars.sku
         */
        var colorIds = idsList.color = [],
            sizeIds = idsList.size = []

        $colors.each( function( _, el ) {
            colorIds.push( $( el ).data( 'id' ) )
        } )

        $sizes.each( function( _, el ) {
            sizeIds.push( $( el ).data( 'id' ) )
        } )

        bindEvent()
        updateSkuState( null, null, true )

        if ( $colors.length == 1 ) {
            $colors.eq( 0 ).trigger( 'click' )
        }

        if ( $sizes.length == 1 ) {
            $sizes.eq( 0 ).trigger( 'click' )
        }
    }

    function bindEvent() {
        $colorList.add( $sizeList ).on( 'click', JS_ITEM_CLASS, function( e ) {
            e.preventDefault();

            var $el  = $( e.currentTarget ),
                type = $el.data( 'type' ),
                tmp;

            if ( $el.hasClass( OUT_OF_STOCK ) ) {
                return
            }

            if ( $el.hasClass( ACTIVE ) ) {
                $el.removeClass( ACTIVE )
                curSelectedEl[ type ] = null
            } else {
                ( tmp = curSelectedEl[ type ] ) && tmp.removeClass( ACTIVE )
                curSelectedEl[ type ] = $el.addClass( ACTIVE )
            }

            /**
             * @TODO 兼容旧代码，找时间清理
             */
            if ( type == 'color' ) {
                orderColor = curSelectedEl[ type ];
                if ( orderColor ) {
                    tracking.cr( 'selectProp', getlogUnit( 'color', orderColor.data( 'index' ) ) )
                }
            } else {
                orderSize = curSelectedEl[ type ]
                if ( orderSize ) {
                    tracking.cr( 'selectProp', getlogUnit( 'size', orderSize.data( 'index' ) ) )
                }
            }

            updateSkuState( type, curSelectedEl[ type ] )
            updatePrice()
            //@TODO 旧代码
            checkActive()

            //color 下会有 img，用于更新左侧大图
            if ( ( tmp = $el.find( 'img' )).length && isThumbComplete ) {
                picZoom.placeBig( $bigPic, tmp.attr( 'bsrc' ) )
            }
        } );
    }

    /**
     * 更新颜色和尺寸列表按钮状态，库存总量
     */
    function updateSkuState( type, selectedEl, isInit ) {
        var $color  = curSelectedEl.color,
            $size   = curSelectedEl.size,
            colorId = $color && $color.data( 'id' ),
            sizeId  = $size && $size.data( 'id' ),
            colors  = idsList.color,
            sizes   = idsList.size,

            prefix  = colorId ? colorId + '_' : '',
            suffix  = ( goodsHasSize && !sizeId ) ? '' : '_' + ( sizeId || '' ),
            skuId, $curCol

        if ( type == 'color' ) {
            updateSize( sizes, prefix )
        } else if ( type == 'size' ) {
            //size 可能为空，color 会始终存在
            updateColor( colors, suffix )
        } else {
            updateSize( sizes, prefix )
            updateColor( colors, suffix )
        }

        /**
         * 有些商品没有库存(无论是否有尺寸)，那么它们应该始终保持缺货状态
         */
        if ( !isInit && $size && $size.length && !selectedEl ) {
            if ( type == 'color' ) {
                $curCol = $sizes
            } else {
                $curCol = $colors
            }

            $curCol.filter( '.' + OUT_OF_STOCK ).removeClass( OUT_OF_STOCK )
        }

        /**
         * goodsSKU 的 key 是由 colorId, sizeId, colorId_sizeId 三种情况组合而成
         */
        skuId = colorId ? (sizeId ? (colorId + '_' + sizeId) : goodsHasSize ? colorId : (colorId + '_')) : (sizeId || 'default')
        skuInfo = goodsSKU[ skuId ]
        orderNum.upStockNum( skuInfo.repertory )
    }

    function updateColor( colors, suffix ) {
        var $el, i, len

        for ( i = 0, len = colors.length; i < len; i++ ) {
            $el = $colors.eq( i )
            if ( goodsSKU[ colors[ i ] + suffix ].repertory == 0 ) {
                $el.addClass( OUT_OF_STOCK )
            } else {
                $el.removeClass( OUT_OF_STOCK )
            }
        }
    }

    function updateSize( sizes, prefix ) {
        var $el, i, len

        for ( i = 0, len = sizes.length; i < len; i++ ) {
            $el = $sizes.eq( i )
            if ( goodsSKU[ prefix + sizes[ i ] ].repertory == 0 ) {
                $el.addClass( OUT_OF_STOCK )
            } else {
                $el.removeClass( OUT_OF_STOCK )
            }
        }
    }

    /**
     * preheat  活动价
     * original 原价
     * now      现价
     * phone    手机专享价
     */
    var priceEls      = {
        'preheat':  $( '#price-preheat' ),
        'original': $( '#price-original' ),
        'now':      $( '#price-now' ),
        'phone':    $( '#price-phone' )
    },
        priceNames    = [ 'preheat', 'original', 'now', 'phone' ],
        priceNamesLen = 4;

    /**
     * 后端传的都是价格区间，如果 min 和 max 相等，那就不显示区间。
     */
    function updatePrice() {
        var tmpMin, tmpMax;

        if ( skuInfo ) {
            //颜色与尺寸均已选择
            if ( skuInfo.sku_id ) {
                priceEls.preheat.html( skuInfo.campaign_price );
                priceEls.original.html( skuInfo.price );
                priceEls.now.html( skuInfo.campaign_price || skuInfo.price );
                priceEls.phone.html( skuInfo.campaign_phone_price );
            } else {
                var el;
                for ( var i = 0; i < priceNamesLen; i++ ) {
                    el     = priceEls[ priceNames[ i ] ];
                    tmpMin = el.data( PRICE_MIN );
                    tmpMax = el.data( PRICE_MAX );

                    el.html( tmpMin == tmpMax ? tmpMin : (tmpMin + '-' + tmpMax) );
                }
            }
        }
    }

    function checkActive() {
        var foos = [ orderSize, orderColor ]
        for ( var i = 0; i < foos.length; i++ ) {
            var foo = foos[ i ]
            if ( foo && foo.is( '.out_of_stock' ) ) {
                foo.removeClass( 'active' )
                foo = null
            }
        }
        if ( checkSelectDone() ) {
            defineCbk && defineCbk()
        } else {
            defineUnReadyCbk && defineUnReadyCbk()
        }
    }

    init();
}())

/**
 * 缩略图切换
 */
;
(function() {
    var $thumb = $( '#picture' ).find( '.js-pic-thumb' ),
        $spans = $thumb.find( 'span' ),
        $curThumb,
        timerId,
        ACTIVE = 'active';

    $thumb.on( 'mouseenter', 'span', function( e ) {
        isThumbComplete = true
        clearTimeout( timerId );
        timerId = setTimeout( function() {
            if ( $curThumb ) {
                if ( e.currentTarget === $curThumb[ 0 ] ) return;
                $curThumb.removeClass( ACTIVE );
            }

            ($curThumb = $( e.currentTarget )).addClass( ACTIVE );
            picZoom.placeBig( $bigPic, $curThumb.find( 'img' ).attr( 'bsrc' ) )
        }, 300 );
    } )

    $spans.eq( 0 ).trigger( 'mouseenter' );

    if ( !$spans.length ) {
        isThumbComplete = true
    }
}())

followShop( {
    el:     '.js-follow-shop',
    $numEl: $( '.js-fans' ),

    followClass:   'is-followed',
    unfollowClass: 'is-not-followed',

    follow:   '<i class="icon-plus">+</i>关注',
    followed: '<i class="icon-check"></i>已关注'
} );

followShop( {
    el:     '.shop_box',
    $numEl: $( '.j_fans i' ),

    follow:   '<i class="plus-ico"></i>关注本店',
    followed: '<i class="check-ico"></i>已关注'
} );

/*
 将代码拆分出去 sale_extra.js
 使用 fml.use() 会导致潜在的问题：
 加载多个相同的 js 文件
 */

;
(function() {
    var el  = $( '.countdown' ),
        obj = {
            d: el.find( '.day' ),
            h: el.find( '.hour' ),
            i: el.find( '.minute' ),
            s: el.find( '.second' )
        };

    TimeDown.down( el, parseInt( el.data( 'remain' ) ) ).onAction( function( arg ) {
        for ( var k in arg ) {
            if ( arg.hasOwnProperty( k ) ) {
                obj[ k ] && obj[ k ].html( arg[ k ] )
            }
        }
    } )

    $( '.countdown_l' ).each( function() {
        var ele    = $( this )
        var remain = parseInt( ele.data( 'remain' ) )
        if ( !remain ) return
        TimeDown.down( this, remain )
    } )
}() )

    /*加载一页到详情页*/
;
(function() {
    var loaded = false,
        tid    = fml.vars.goods.twitter_id,
        /**
         * @commented by sunzhidong 2014-8-16
         * 原始代码这里是减去 200，现在改为当前窗口的 4/5，都属于 magic number，所以加个注释解释下。
         * 这段代码在普通商品下没有问题，原因在于 #short_show 下方有店铺的 banner，所以页面能够滚动到指定位置，触发请求
         * 但是『韩国馆』页面下方没有店铺 banner，导致无法向下继续滚动，也就不能发送请求。
         *
         */
        y      = $( '#short_show' ).offset().top - 0.8 * $( window ).height();

    function ajaxShort( opt ) {
        $.get( '/aj/getComment/' + opt.url, {
            'tid':  tid,
            'page': 0
        }, function( data ) {
            if ( !data || !data[ opt.gather ].length ) {
                return
            }

            var items = shareTmp( opt.tpl, {
                'item': data[ opt.gather ]
            } )
            $( '#short_show .' + opt.pnl ).html( items )
        }, 'json' )
    }

    WindowScroll.yIn( y, function() {
        var i, shortLink

        if ( loaded ) {
            return
        }

        loaded    = true
        shortLink = {
            'evaLink':      'eva',
            'shoppingLink': 'shopping',
            'dealLink':     'deal'
        }

        for ( i in shortLink ) {
            $( '.' + i ).click( (function( i ) {
                return function() {
                    tracking.cr( 'share/short/' + i )
                    $( '.' + shortLink[ i ] ).trigger( 'click' )
                }
            })( i ) )
        }

        ajaxShort( {
            url:      'shop?num=5&level=5&filter=1',
            'gather': 'cInfos',
            'pnl':    'eva_comments',
            'tpl':    'twitter_comment_shop'
        } )
        ajaxShort( {
            url:      'shopping?num=2',
            'gather': 'aInfo',
            'pnl':    'shoppingshow_comments',
            'tpl':    'shoppingshow_tmp'
        } )
        ajaxShort( {
            url:      'deal?num=5',
            'gather': 'cInfos',
            'pnl':    'deal-comments',
            'tpl':    'twitter_comment_deal'
        } )
    } )
}())

/**
 * 分享到新浪微博
 */
;
(function() {
    var goodsInfo   = fml.vars.goodsInfo,
        shareInfo   = fml.vars.shareInfo,
        name        = goodsInfo.title,
        pic         = goodsInfo.picSrc,
        gid         = goodsInfo.twitterId,
        replyQQ     = shareInfo.descQQ,
        reply       = shareInfo.text,
        title       = shareInfo.promo,
        description = shareInfo.comment,
        url         = 'http://www.meilishuo.com/share/item/' + gid

    $( '#share-qzone' ).on( 'click', function() {
        ShareTo.shareGoodsToQzone( name, pic, gid, replyQQ, description, title, 'share/item/' )
    } )

    $( '#share-sina' ).on( 'click', function() {
        ShareTo.shareToWeibo( url + '?frm=huiliu_weibo', reply, pic )
    } )

    $( '#share-tx' ).on( 'click', function() {
        ShareTo.shareGoodsToQQWeiBo( name, pic, gid, reply, 'share/item/' )
    } )
}() );

TwitterComment()

;
(function() {
    var clubApi = require( 'app/clubApi' )

    $( '.cnt_item .cl_like' ).live( 'click', function() {
        if ( $( this ).attr( 'uid' ) == Meilishuo.config.user_id ) return;
        if ( !checkLogin() ) return false;
        var data = {
            'aid': $( this ).attr( 'aid' )
        }
        clubApi( 'like', data );
        var $likeNum = $( this ).find( 'em' ).last();
        var num      = parseInt( $likeNum.text() ) || 0;
        var isLiked  = $( this ).find( '.cl_love' ).length > 0;
        if ( isLiked ) {
            num--;
            $( this ).find( '.cl_love' ).removeClass().addClass( 'cl_unlove' );
        } else {
            num++;
            $( this ).find( '.cl_unlove' ).removeClass().addClass( 'cl_love' );
        }
        $likeNum.html( num || '' );
    } );

    $( '.cnt_item .cl_like' ).live( 'mouseenter', function() {
        if ( $( this ).attr( 'uid' ) == Meilishuo.config.user_id ) {
            $( this ).parents( '.cnt_item' ).find( '.love_pro' ).show()
        }
    } ).live( 'mouseleave', function() {
        if ( $( this ).attr( 'uid' ) == Meilishuo.config.user_id ) {
            $( this ).parents( '.cnt_item' ).find( '.love_pro' ).hide()
        }
    } )
}())

    /* 淡入淡出喜欢+1效果*/
;
(function() {
    var Like     = require( 'app/like' ),
        like_btn = $( '.js-like-btn' ),
        like_num = like_btn.find( '.item-like-num' ),
        $loveMsg = $( '.love_msg' )

    var numLiked = like_num.text().match( /\d+/ )
    numLiked     = numLiked ? numLiked[ 0 ] * 1 : 0

    Like.twitterLike( '.item-like-wrap', '.js-like-btn', function() {
        if ( +like_btn.data( 'liked' ) | 0 ) {
            --numLiked
            like_btn.data( 'liked', 0 ).html( '<i class="icon-like"></i>喜欢' + ( numLiked ? '(' + numLiked + ')' : '' ) )
        } else {
            ++numLiked;
            like_btn.data( 'liked', 1 ).html( '已喜欢' + ( numLiked ? '(' + numLiked + ')' : '') )
            $( '.addOneLike' ).show().animate( {
                'opacity': 1
            }, 1000, function() {
                $( this ).animate( {
                    opacity: 0
                }, 500 )
            } )
        }
    }, $loveMsg.length && {
            'hoverOn':  function() {
                $loveMsg.show()
            },
            'hoverOff': function() {
                $loveMsg.hide()
            }
        } )
}())

;
(function() {
    var Like = require( 'app/like' )
    Like.posterLike( '.all_goods', '.poster_likes' )
}());

(function() {
    var EventHover = require( 'app/eventHover' )
    EventHover.hoverShow( '.hover_pic', '.like_merge' )
}());

(function() {
    var Forward = require( 'app/forward' )
    Forward.posterForward( '.all_goods', '.poster_forward' )
    Forward.twitterForward( '.twitter', '#twitter_magazi' )
}());

(function() {
    var Tab = require( 'app/doota/tab' )
    Tab.bind( {
        'tagPnl':         '.tab_match',
        'tabTag':         '.tabArea1',
        'activeTagClass': 'cur',
        'contents':       '.contentArea1'
    } )

    Tab.bind( {
        'tagPnl':         '.tab_combo',
        'tabTag':         '.tabCombo1',
        'activeTagClass': 'cur',
        'contents':       '.contentCombo1'
    } )
}())

;
/*
 $(document).ready(function(){
 $(".rule_btn").hover(function(){
 $(".rule_detail").toggle();
 });
 });
 fml.use('jquery' , function(){
 $('.rule_btn').hover(function(){
 $('.rule_detail').show();
 },function(){
 $('.rule_detail').hide();
 });

 });
 */
fml.use( 'app/eventHover', function() {
    this.hoverShow( '.presale_rule li', '.rule_detail' );
} );


(function() {
    var ItemCom = require( 'page/doota/itemCom' )
    ItemCom.setTab( function( context ) {
        window.scrollTo( 0, context.parent().offset().top - 40 )
    } )
    ItemCom.lazyLoad()
}());
