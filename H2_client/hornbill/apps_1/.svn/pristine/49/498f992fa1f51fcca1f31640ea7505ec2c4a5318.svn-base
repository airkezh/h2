fml.define( 'page/doota/sale', [ 'page/doota/itemCom', 'app/tracking', 'core/animation', 'app/checkLogin', 'component/urlHandle', 'app/doota/stock', 'app/doota/picZoom', 'jquery', 'app/followShop', 'component/shareTmp' ], function( require ) {
    var vars          = fml.vars,
        goodsSKU      = vars.sku,
        goodsHasColor = vars.hasColor,
        goodsHasSize  = vars.hasSize,
        goodsId       = vars.goods.id,
        goodsPid      = vars.goods.pid,
        goodsTwitter  = vars.goods.twitter_id,

        stock         = require( 'stock' ),
        picZoom       = require( 'picZoom' ),
        checkLogin    = require( 'app/checkLogin' ),
        Tween         = require( 'core/animation' ).Tween,
        requestFrame  = require( 'core/animation' ).requestFrame,
        urlHandle     = require( 'component/urlHandle' ),
        tracking      = require( 'app/tracking' ),
        itemCom       = require( 'page/doota/itemCom' ),
        followShop    = require( 'app/followShop' ),
        $             = require( 'jquery' ),
        shareTmp      = require( 'component/shareTmp' ),

        /**
         * 是否为海淘页面，需要修改“立即购买”按钮的 url
         */
        isHaiTao      = !!$( '.js-haitao' ).length,
        $amount       = $( '.amount' ),
        $numBox       = $amount.find( '.js-stock' ),
        orderSize, orderColor, orderNum,
        //@TODO
        skuInfo,

        isThumbComplete = false,

        SHOP_ID       = vars.shop_id

    $('.reportL').mouseover(function(event) {
        $('.warn').show();
    });
    $('.reportL').mouseout(function(event) {
        $('.warn').hide();
    });
    $('.reportL').on('click',function(event){
        if(!checkLogin()){
            return false;
        }
    });

    if ( !goodsSKU ) {
        return
    }

    goodsSKU[ 'default' ] = {
        repertory: vars.repertory
    }

    orderNum = stock.bind( {
        'input': $numBox.find( 'input' ),
        'minus': $numBox.find( '.js-stock-minus:not(.hidden)' ),
        'plus': $numBox.find( '.js-stock-plus:not(.hidden)' ),
        'stockMax': $amount.find( '.js-stock-reserve span' )
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
            'goods_pid': goodsPid,
            'goods_id': goodsId,
            'twitter_id': goodsTwitter,
            'user_id': Meilishuo.config.user_id,
            'url': window.location.href
        }
        ret[ type ] = typeCont
        return ret
    }

    function getOrderInfo() {
        var ret = {
            'goods_pid': goodsPid,
            'goods_id': goodsId,
            'twitter_id': goodsTwitter,
            'amount': +$amount.val(),
            'price': skuInfo.campaign_price || skuInfo.price,
            'sku_id': skuInfo.sku_id
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

    var btn_box = $( '.btn_box .same_btn a , .tab_tle .add_cart' ).click( function() {
        var ele        = $( this )
        if ( ele.is( '.non_buy' ) ) return
        tracking.cr( 'buy', getlogUnit( 'btn', ele.is( '.buy_btn' ) ? 'buy_btn' : 'add_cart' ) )
        var confirmCbk = ele.is( '.buy_btn' ) ? function( opt ) {
            var orderedInfo      = getOrderInfo()
            orderedInfo[ 'ori' ] = 'share'
            var query            = urlHandle.http_build_query( orderedInfo )
            var orderURI         = '/order/init' + (isHaiTao ? '_haitao' : '') + '/?' + query + '&shop_id=' + SHOP_ID;
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
            itemCom.addToCart( getOrderInfo() )
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
            defineCbk                     = function() {
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
            defineUnReadyCbk              = function() {
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
            skuId   = colorId ? (sizeId ? (colorId + '_' + sizeId) : goodsHasSize ? colorId : (colorId + '_')) : (sizeId || 'default')
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
            'preheat': $( '#price-preheat' ),
            'original': $( '#price-original' ),
            'now': $( '#price-now' ),
            'phone': $( '#price-phone' )
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
        el: '.js-follow-shop',
        $numEl: $( '.js-fans' ),

        followClass: 'is-followed',
        unfollowClass: 'is-not-followed',

        follow: '<i class="icon-plus">+</i>关注',
        followed: '<i class="icon-check"></i>已关注'
    } );

    followShop( {
        el: '.shop_box',
        $numEl: $( '.j_fans i' ),

        follow: '<i class="plus-ico"></i>关注本店',
        followed: '<i class="check-ico"></i>已关注'
    } );
} )

fml.use( [ 'app/doota/timedown', 'jquery' ], function() {
    var $        = this.jquery,
        timedown = this.timedown,
        el       = $( '.countdown' ),
        obj      = {
            d: el.find( '.day' ),
            h: el.find( '.hour' ),
            i: el.find( '.minute' ),
            s: el.find( '.second' )
        };

    timedown.down( el, parseInt( el.data( 'remain' ) ) ).onAction( function( arg ) {
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
        timedown.down( this, remain )
    } )
} )

/*加载一页到详情页*/
fml.use( [ 'jquery', 'component/shareTmp', 'component/windowScroll', 'app/tracking' ], function() {
    var $            = this.jquery,
        WindowScroll = this.windowScroll,
        ShareTmp     = this.shareTmp,
        Tracking     = this.tracking,

        loaded       = false,
        tid          = fml.vars.goods.twitter_id,
        /**
         * @commented by sunzhidong 2014-8-16
         * 原始代码这里是减去 200，现在改为当前窗口的 4/5，都属于 magic number，所以加个注释解释下。
         * 这段代码在普通商品下没有问题，原因在于 #short_show 下方有店铺的 banner，所以页面能够滚动到指定位置，触发请求
         * 但是『韩国馆』页面下方没有店铺 banner，导致无法向下继续滚动，也就不能发送请求。
         *
         */
        y            = $( '#short_show' ).offset().top - 0.8 * $( window ).height();

    function ajaxShort( opt ) {
        $.get( '/aj/getComment/' + opt.url, {
            'tid': tid,
            'page': 0
        }, function( data ) {
            if ( !data || !data[ opt.gather ].length ) {
                return
            }

            var items = ShareTmp( opt.tpl, {
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
            'evaLink': 'eva',
            'shoppingLink': 'shopping',
            'dealLink': 'deal'
        }

        for ( i in shortLink ) {
            $( '.' + i ).click( (function( i ) {
                return function() {
                    Tracking.cr( 'share/short/' + i )
                    $( '.' + shortLink[ i ] ).trigger( 'click' )
                }
            })( i ) )
        }

        ajaxShort( {
            url: 'shop?num=5&level=5&filter=1',
            'gather': 'cInfos',
            'pnl': 'eva_comments',
            'tpl': 'twitter_comment_shop'
        } )
        ajaxShort( {
            url: 'shopping?num=2',
            'gather': 'aInfo',
            'pnl': 'shoppingshow_comments',
            'tpl': 'shoppingshow_tmp'
        } )
        ajaxShort( {
            url: 'deal?num=5',
            'gather': 'cInfos',
            'pnl': 'deal-comments',
            'tpl': 'twitter_comment_deal'
        } )
    } )
} )

fml.use( [
    'jquery',
    'app/checkLogin',
    'app/clubAction',
    'app/focus_banner',
    'app/doota/tab',
    'app/page',
    'app/paging',
    'app/tracking',
    'component/callApi',
    'component/dropdown',
    'component/shareTmp',
    'component/windowScroll',
    'page/nav'
], function() {
    var $                = this.jquery,
        page             = this.page,
        shareTmp         = this.shareTmp,
        tab              = this.tab,
        checkLogin       = this.checkLogin,
        callApi          = this.callApi,
        Paging           = this.paging,
        DropDown         = this.dropdown,
        WindowScroll     = this.windowScroll,
        FocusBanner      = this.focus_banner,
        Tracking         = this.tracking,

        $win             = $( window ),
        $doc             = $( document ),
        $body            = $( document.body ),
        isHaiTao         = !!$( '.js-haitao' ).length,
        wrapBox          = $( '.wrap' ),

        shopCommentsNull = $( '#shop_comments_null' ),
        evaComments      = $( '#eva_comments' ),
        shopDealNull     = $( '#shop_deal_null' ),
        dealComments     = $( '#j-deal-comments' ),
        shsComments      = $( '#shoppingshow_comments' ),
        shsCommentsNull  = $( '.shoppingshow_null' ),
        $pageNav         = $( '#shopPagingNav' ),

        SHOP_ID          = fml.vars.shop_id,
        TWITTER_ID       = fml.vars.goods.twitter_id,

        shopComment      = {
            'totalNum': fml.vars.count_dis,
            'url': '/aj/getComment/shop',
            'tid': TWITTER_ID,
            'tmpId': 'twitter_comment_shop',
            'commentPnl': evaComments,
            'pageNav': $pageNav,
            'pageSize': 8,
            'processData': function( res ) {
                if ( res && res.cInfos && res.cInfos.length ) {
                    evaComments.show()
                    shopCommentsNull.hide()
                    $pageNav.show()
                    return {
                        'item': res.cInfos
                    }
                } else {
                    evaComments.hide()
                    shopCommentsNull.show()
                    $pageNav.hide()
                }
            },
            'cbk': function( data ) {
                rollCommentPnl()
                /**
                 * 当只看有内容的评论时，只有在接口返回数据后，才能知道真实的评论数目
                 */
                if ( isTotalNumChange ) {
                    isTotalNumChange = false
                    /**
                     * 每次翻页的时候不会进入该方法
                     * 需要设置 shop_comment.totalNum 来影响翻页操作
                     */
                    var num          = shopComment.totalNum = data.pages.totalNum,
                        pageLen = Math.ceil( num / 8 )

                    $pageNav.html( pageLen <= 1 ? '' : shareTmp( 'pagingNav', {
                        pageLen: pageLen,
                        page: 0
                    } ) )
                }
            },
            'param': {
                'filter': 1,
                'filter_point': 0
            }
        },
        /**
         * 当数据总数变化时，修改该值。
         */
        isTotalNumChange = true

    function rollCommentPnl() {
        var top

        if ( !wrapBox.length ) {
            return
        }

        top = wrapBox.offset().top

        if ( top > $doc.scrollTop() ) {
            return
        }

        wrapBox[ 0 ].scrollIntoView()
    }

    $( '#short_show' ).find( '.all_rate_btn' ).click( function() {
        $( '.shpcmt .all_rate_btn' ).prop( 'checked', this.checked ).trigger( 'change' )
        return false
    } )

    function updateShpcmtTotal() {
        var filter           = $( '.shpcmt .all_rate_btn' ).prop( 'checked' )
        shopComment.totalNum = fml.vars.count_dis[ filter ? 'meaning' : 'all' ]
    }

    function requestComment( config ) {
        $.ajax( {
            url: config.url,
            type: 'get',
            data: {
                tid: TWITTER_ID,
                page: config.page || 0
            },
            dataType: 'json'
        } ).done( config.callback )
    }

    $( '.eva' ).one( 'click', function() {
        page( shopComment )
    } )

    $( '.deal' ).one( 'click', function() {
        var isInit = false,

            config = {
                url: '/aj/getComment/deal',
                callback: function( res ) {
                    if ( res && res.cInfos && res.cInfos.length ) {
                        dealComments.show()
                        shopDealNull.hide()

                        dealComments.html( shareTmp( 'twitter_comment_deal', {
                            'item': res.cInfos
                        } ) )

                        rollCommentPnl()

                        if ( !isInit ) {
                            isInit = true
                            paging.setTotalPage( res.pages.totalNum )
                        }
                    } else {
                        dealComments.hide()
                        shopDealNull.show()
                    }
                }
            },

            paging = Paging( {
                el: '#dealPagingNav',
                tmpl: 'pagingNav',
                pageSize: 15,
                onChange: function( el, pageNum ) {
                    config.page = pageNum
                    requestComment( config )
                }
            } )

        requestComment( config )
    } )

    $( '.shopping' ).one( 'click', function() {
        page( {
            'totalNum': fml.vars.count_shs,
            'url': '/aj/getComment/shopping',
            'tid': TWITTER_ID,
            'tmpId': 'shoppingshow_tmp',
            'commentPnl': shsComments,
            'pageNav': $( '#shsPagingNav' ),
            'pageSize': 8,
            'processData': function( res ) {
                if ( res && res.aInfo && res.aInfo.length ) {
                    shsComments.show()
                    shsCommentsNull.hide()
                    return {
                        'item': res.aInfo
                    }
                } else {
                    shsComments.hide()
                    shsCommentsNull.show()
                }
            },
            'cbk': rollCommentPnl,
            'param': {
                'num': 8
            }
        } );
    } )

    /*
     获取评论分类的数量

     added by sunzhidong
     2014-6-26
     */
    $.get( '/aj/getComment/filter', {
        'tid': TWITTER_ID,
        'page': 0
    }, function( data ) {
        if ( !data || !data.length ) {
            return
        }
        //如果评论数为 0，则不显示分类。data[0] 表示“全部评价”
        if ( !data[ 0 ].total ) {
            return
        }

        $( '.eva_comments_filter_tab' ).html( shareTmp( 'twitter_comment_count', {
            'item': data
        } ) )

        /*
         设置评价分类 tab
         */
        var cur = 0

        //这个按钮现在是动态生成了，因此得放到这个回调方法内
        $( '.shpcmt .all_rate_btn' ).on( 'change', function() {
            shopComment.param.filter = this.checked ? 1 : 0
            updateShpcmtTotal()
            isTotalNumChange         = true
            page( shopComment, true )
            $( '.eva' ).trigger( 'click' )
        } )

        tab.bind( {
            'tagPnl': '.comments',
            'tabTag': '.eva_comments_filter_tab .item',
            'activeTagClass': 'cur',
            'contents': '.eva_comments',
            onShowed: function( _, _, index ) {
                if ( cur != index ) {
                    cur                            = index;
                    shopComment.param.filter_point = cur;
                    if ( data[ index ].total == 0 ) {
                        shopComment.totalNum = 0;
                    }
                    isTotalNumChange = true;
                    page( shopComment );
                }
            }
        } );
    }, 'json' )

    /*
     晒单商品标记，点击时自动跳到下方晒单区域
     */
    $( '#js-shopping-show' ).on( 'click', function( e ) {
        $( '.tabArea.shopping' ).click();
        e.preventDefault();
    } )

    $( '#js-comment' ).on( 'click', function( e ) {
        $( '.tabArea.eva' ).click();
        e.preventDefault();
    } )

        /*
         * @name: scrollHighLight 滚动高亮
         * @desc: 滚动页面时，商品详情下拉菜单中的菜单项会根据当前位置进行高亮
         *
         * $sentry 是用来标记高亮区域的截止位置
         */
    ;
    (function() {
        var prev, len, pos, $anchors,
            $parent      = $( '.tab_tle' ),
            $sentry      = $( '#anchor-boundry-sentry' ),
            /* 该高度需要计算在内 */
            parentHeight = $parent.height(),

            /* 小于该值就高亮 */
            minOffset    = 100,
            rhash        = /#.+$/g,
            CUR_CLASS    = 'cur'

        function initPos() {
            pos      = []
            $anchors = $parent.find( '.js-anchor-btn' )

            $anchors.each( function( i, el ) {
                var match = el.href.match( rhash ),
                    $el

                if ( match ) {
                    $el = $( match[ 0 ] )
                    $el.length && pos.push( $el.offset().top )
                }
            } )

            pos.push( $sentry.offset().top )

            len = pos.length
        }

        /**
         *  layout.is.changed 『精选好评』与『查看更多详情』触发
         */
        $body.on( 'layout.is.changed', function() {
            setTimeout( initPos, 0 )
        } )

        initPos()

        if ( len = pos.length ) {
            $win.on( 'scroll', function() {
                /*
                 用了延时就不能及时高亮~所以妥协一下
                 */
                checkPos()
            } )
            /* 默认先执行一次 */
            checkPos()
        }

        function checkPos() {
            var offset = $win.scrollTop() + parentHeight,
                i      = 0,
                dis

            for ( ; i < len; i++ ) {
                dis = pos[ i ] - offset

                if ( dis >= 0 ) {
                    /* 防止滚动到上面的时候第一个 tab 始终高亮 */
                    if ( dis > minOffset ) {
                        if ( i == 0 ) {
                            break
                        } else {
                            i -= 1
                        }
                    }

                    return highLight( $anchors.eq( i ) )
                }
            }

            unHighLight()
        }

        function highLight( anchor ) {
            /*
             减少不必要的操作
             */
            if ( !prev || ( prev && prev[ 0 ] != anchor[ 0 ] ) ) {
                prev && prev.removeClass( CUR_CLASS );
                ( prev = anchor ).addClass( CUR_CLASS )
            }
        }

        /*
         使用 prev 保存上一个高亮元素，因此这里不需要传值。
         */
        function unHighLight() {
            prev && prev.removeClass( CUR_CLASS )
            prev = null
        }
    }())

    /**
     * 显示全国城市
     */
    ;
    (function() {
        var city,
            $cities       = $( '#js-cities' ),
            $destCity     = $( '#js-dest-city' ),
            $destCityName = $destCity.find( '.js-city-name' ),
            $freightText  = $( '#js-freight-text' ),
            $label        = $( '.js-label' ).filter( '[data-text=免运费]' ),
            isInit        = false,

            /* 防止网络延迟导致数据设置错误 */
            gid           = 0;

        city = DropDown.init( {
            el: $destCity,
            panel: $cities,

            events: {
                beforeShow: function() {
                    var pos, timeoutId

                    if ( !isInit ) {
                        $.get( '/aj/getAllCities/', function( data ) {
                            isInit = true;
                            /**
                             * 不要在外面获取高度，因为页面可能会动态显示
                             * 一些内容，造成高度的偏差。
                             */
                            pos    = $destCity.offset()
                            $cities.html( shareTmp( 'tmplCities', {
                                data: data
                            } ) )
                                .css( {
                                    left: pos.left,
                                    top: pos.top + $destCity.height()
                                } );

                            city.show();
                        }, 'json' )

                        $win.on( 'resize', function() {
                            clearTimeout( timeoutId );

                            timeoutId = setTimeout( function() {
                                $cities.css( 'left', $destCity.offset().left );
                            }, 100 );
                        } )

                        return false
                    }
                }
            }
        } );

        $cities.on( 'mouseenter', '.js-city', function( e ) {
            $( this ).find( 'ul' ).show();
        } ).on( 'mouseleave', '.js-city', function() {
            $( this ).find( 'ul' ).hide();
        } ).on( 'click', '.js-cities-sec', function( e ) {
            var $el = $( this ),
                id  = ++gid;
            $destCityName.text( $el.text() );
            /* 隐藏城市面板 */
            city.hide();

            $.get( '/aj/getFreight/', {
                'cid': $el.data( 'id' ),
                'goods_id': fml.vars.goods.id
            }, function( data ) {
                if ( data && data.content && data.content.data && id == gid ) {
                    data = data.content.data;
                    if ( data.charge_free ) {
                        $freightText.text( '全场免运费' );
                        $label.show();
                    } else if ( data.charge ) {
                        var str = '运费: ' + data.charge + '元';
                        if ( data.quota ) {
                            str += ' (满' + data.quota + '元包邮)'
                        }
                        $freightText.text( str );
                        $label.hide();
                    } else {
                        $freightText.text( '免运费' );
                        $label.show();
                    }
                }
            }, 'json' )
        } )
    }())

    /**
     * 手机专享价
     */
    DropDown.init( {
        el: '.js-mob-exclusive-btn',
        panel: '.js-mob-exclusive-panel'
    } )

    /**
     * @name: 活动价
     * @date: 2014-09-16
     */
    ;
    (function() {
        var time,
            $el = $( '.js-promotion-desc' )

        if ( $el.length ) {
            /**
             * 后端传的是秒
             */
            time = new Date( +$el.data( 'time' ) * 1000 )

            $el.html( '将在' + ( time.getMonth() + 1 ) + '月' +
                time.getDate() + '日' +
                time.getHours() + '点' +
                time.getMinutes() + '分降价' )
        }
    }())

    /**
     * 每次活动的时候，都可能在『商品详情』下显示一个额外的 banner
     */
    $.getJSON( '/aj/bigPromoteBanner/', { key: 'share', tid: TWITTER_ID } )
        .done( function( data ) {
            var tmpl = '<div class="recom-banner"><a href="${url}" target="_blank"><img src="${image_url}" title="${title}" width="${image_width}" height="${image_height}"></a></div>';

            if ( $.isArray( data ) ) {
                if ( !data.length ) {
                    return
                }

                data = data[ 0 ]
            }

            $( '<div>' ).html( tmpl.replace( /\${([^}]+)}/g, function( _, m ) {
                return data[ m ]
            } ) ).children()
                .insertBefore( $( '.contentArea' )
                    .eq( 0 )
                    .children( ':first-child' ) )
        } )

    /**
     * 商品人气提示
     */
    ;
    (function() {
        var $popTip = $( '.js-pop-tip' ),
            isShow  = false,
            TIMEOUT = 5000

        if ( isHaiTao || !$popTip.length ) {
            return
        }

        WindowScroll.yIn( $popTip.offset().top - $( window ).height(), function() {
            if ( isShow ) {
                return
            }
            isShow = true

            $popTip.css( 'bottom', 13 )
            setTimeout( function() {
                $popTip.css( 'opacity', 0 )
            }, TIMEOUT )
        } )
    }())

    /**
     * 分享到围脖/空间
     */
    ;
    (function() {
        var $el    = $( '.js-item-share-btn' ),
            $panel = $( '.js-item-share-panel' ),
            offset,
            timeoutID

        $el.on( 'mouseenter', function() {
            clearTimeout( timeoutID )
            offset = $el.offset()

            $panel.css( {
                top: offset.top + $el.height() + 10,
                left: offset.left
            } ).show()
        } ).on( 'mouseleave', function() {
            timeoutID = setTimeout( function() {
                $panel.hide()
            }, 300 )
        } )

        $panel.on( 'mouseenter', function() {
            clearTimeout( timeoutID )
        } ).on( 'mouseleave', function() {
            $panel.hide()
        } )
    }())

    /**
     * 导航条吸顶
     */
    ;
    (function() {
        var $shopHd          = $( '#shop-hd' ),
            $shopNav         = $( '#shop-nav' ),

            FIXED_CLASS      = 'shop-nav-fixed',
            FIXED_ANIM_CLASS = 'shop-nav-fixed-anim'

        /**
         * 特卖商品没有导航栏
         */
        if ( !$shopNav.length ) {
            return
        }

        $shopHd.css( 'height', $shopHd.height() )

        WindowScroll.yIn( $shopNav.offset().top, function() {
            $shopNav.addClass( FIXED_CLASS )
        }, function() {
            $shopNav.removeClass( FIXED_CLASS )
        } )

        WindowScroll.yIn( $( '.js-ceiling-tab' ).offset().top, function() {
            $shopNav.removeClass( FIXED_CLASS ).addClass( FIXED_ANIM_CLASS )
        }, function() {
            $shopNav.removeClass( FIXED_ANIM_CLASS ).addClass( FIXED_CLASS )
        } )
    }())

    /**
     * 『查看更多详情』
     *  注意：滚动高亮那里也会监听这里触发的事件
     */
    ;
    (function() {
        var $expandBtn     = $( '#item-check-more' ),
            $anchors       = $( '.js-anchor-btn' ),

            CLICK          = 'click.seemore',
            COLLAPSE_CLASS = 'js-item-collapse',
            EXPAND_EVENT   = 'expand-item'

        $body.one( EXPAND_EVENT, function() {
            $expandBtn.prev( '.' + COLLAPSE_CLASS ).show()
                .end().hide()

            $body.triggerHandler( 'layout.is.changed' )
        } )

        $anchors.on( CLICK, function() {
            var $anchor = $( $( this ).attr( 'href' ) )
            if ( $anchor.parent().hasClass( COLLAPSE_CLASS ) ) {
                $body.triggerHandler( EXPAND_EVENT )
                /**
                 * 折叠内容展开之前会影响锚点定位
                 */
                setTimeout( function() {
                    window.scrollTo( 0, $anchor.offset().top - $( '.js-tab-wrap' ).height() )
                }, 0 )
                $anchors.off( CLICK )
            }
        } )

        $expandBtn.one( CLICK, function() {
            Tracking.cr( 'share_item', {
                name: 'more_detail',
                area: 'product_desc',
                action: 'click'
            } )
            $body.triggerHandler( EXPAND_EVENT )
            return false
        } )
    }())

    /**
     * 『精选好评』
     */
    ;
    (function() {
        var $handPickComment = $( '#handpick-comments' ),
            $goodsStar       = $( '#goods-star' ),
            MAX_CHARACTERS   = 50

        /**
         * 有好评，且有满意度评分，才显示『精选好评』
         */
        function initHandpickComments( data ) {
            var comment, content, uInfo, time, clen,
                $commentArea = $( '.tabArea.eva' ),
                i            = 0,
                len          = data.length,
                comments     = [],
                rdate        = /年|月|日/g

            for ( ; i < len; i++ ) {
                comment = data[ i ]
                uInfo   = comment.uInfo
                content = comment.content
                time    = comment.time.replace( rdate, '.' )
                clen    = content.length

                if ( clen > MAX_CHARACTERS ) {
                    content = content.substring( 0, MAX_CHARACTERS ) + '...'
                    clen    = MAX_CHARACTERS
                }

                comments.push( {
                    avatar: uInfo.avatar_a,
                    content: content,
                    fontSize: 14 + 6 * ( 1 - clen / MAX_CHARACTERS ),
                    link: '/person/u/' + uInfo.user_id,
                    nickname: uInfo.nickname,
                    time: time.substring( 0, time.length - 1 )
                } )
            }

            $handPickComment
                .show()
                .find( '.js-comments-list' )
                .html( shareTmp( 'tmpl_handpick_comment', {
                    item: comments
                } ) )
                .on( 'click', function( e ) {
                    Tracking.cr( 'share_item', {
                        name: 'more_comment',
                        area: 'good_comment',
                        action: 'click'
                    } )
                    $commentArea.click()
                    e.preventDefault()
                } )

            FocusBanner.bind( {
                'unit': '.handpick-comments-list li',
                'btn': '.handpic-comments-handle li',
                'transition': 'fade',
                'setting': {
                    'stay': 3000,
                    'speed': 500
                }
            } )

            /**
             * 添加锚点
             */
            $( '.js-anchor-btn' ).first().before(
                '<a href="#anchor-handpick-comments" class="js-anchor-btn">精选好评</a>'
            )

            /**
             * 好评是动态添加的，会影响『商品详情』标签下的锚点定位
             */
            $body.trigger( 'layout.is.changed' )

            /**
             * 显示『精选好评』
             */
            Tracking.cr( 'share_item', {
                area: 'good_comment',
                action: 'show'
            } )
        }

        function updateGoodsTag( hasSatisfyRatio, data ) {
            var item, tmp, $featureList, i, len, v,
                max   = 0,
                infos = data.tInfos,
                $tags = $( '.js-goods-tags' )

            if ( hasSatisfyRatio ) {
                item = infos.tags_info

                for ( i = 0, len = item.length; i < len; i++ ) {
                    v = +item[ i ].tag_count
                    if ( max < v ) {
                        max = v
                    }
                }

                /**
                 * 让数值大的进度条更长~
                 */
                if ( max < 50 ) {
                    max *= 2
                } else if ( max < 100 ) {
                    max = 100
                } else if ( max < 200 ) {
                    max = 200
                }

                item.totalTags = max

                tmp = shareTmp( 'tmpl_goods_tag', {
                    item: item
                } )

                $tags.html( tmp )

                tmp = shareTmp( 'tmpl_handpick_comment_tag', {
                    item: item
                } )

                $featureList = $handPickComment.find( '.js-feature-list' )
                $featureList.html( tmp )
                if ( item.length > 4 ) {
                    $featureList.addClass( 'item-features-more' )
                }

                $body.trigger( 'layout.is.changed' )
            } else {
                //没有评分，『购买评价』处的样式会有改变
                if ( !$goodsStar.find( '.js-star-title' ).length ) {
                    $( '.js-star-right' ).css( 'float', 'left' )
                }
            }
        }

        /**
         * 显示晒单
         */
        function initShoppingShow() {
            if ( fml.vars.hasShoppingShow ) {
                $.ajax( '/aj/getComment/shopping', {
                    dataType: 'json',
                    data: {
                        num: 4, //最多显示四条
                        tid: TWITTER_ID
                    }
                } ).done( function( data ) {
                    var detail, $el, $shoppingArea

                    if ( data.aInfo && data.aInfo.length ) {
                        detail = 'twitter_id:' + TWITTER_ID + '.shop_id:' + SHOP_ID
                        //alert(detail)
                        Tracking.cr( 'buyer_share', {
                            detail: detail,
                            action: 'show'
                        } )

                        $el           = $handPickComment.find( '.js-item-shoppingshow' )
                        $shoppingArea = $( '.tabArea.shopping' )

                        $el.css( 'display', 'block' )
                            .find( 'ul' )
                            .html( shareTmp( 'tmpl_handpick_comment_shopping', {
                                item: data.aInfo
                            } ) )
                            .on( 'click', function( e ) {
                                Tracking.cr( 'buyer_share', {
                                    detail: detail,
                                    action: 'click'
                                } )

                                $shoppingArea.click()
                                e.preventDefault()
                            } )

                        $body.trigger( 'layout.is.changed' )
                    }
                } )
            }
        }

        $.when(
            /**
             * 『精选好评』
             */
            $.getJSON( '/aj/handpick_comments/', {
                tid: TWITTER_ID
            } ),
            /**
             * 商品满意度细节评分
             */
            $.getJSON( '/aj/item_goods_tag/', {
                goods_id: fml.vars.goods.id
            } ) ).done( function( v1, v2 ) {
                var d1              = v1[ 0 ],
                    d2              = v2[ 0 ],
                    hasSatisfyRatio = d2 && d2.tInfos && d2.tInfos.total_tags

                updateGoodsTag( hasSatisfyRatio, d2 )

                if ( fml.vars.satisfy_rate != '--' && d1 && d1.length && hasSatisfyRatio ) {
                    initHandpickComments( d1 )
                    initShoppingShow()
                }
            } )
    }())

    /**
     * 点击『客服』的埋点
     */
    $( '.goserviceqq, .ico_serviceqq' ).on( 'click', function() {
        var frm = 'sale',
            pos = 'shareGroup9'

        if ( ~this.className.indexOf( 'ico_serviceqq' ) ) {
            frm = 'side'
            pos = 'shareFlow'
        }

        Tracking.cr( 'dootaQQ', {
            'frm': frm,
            'action': 'contact_service',
            'pos': pos
        } )
    } )

    /**
     * 『新品到货』的图片
     */
    ;
    (function() {
        var isLoaded = false

        WindowScroll.yIn( $( '.js-item-detail' ).offset().top - 100, function() {
            if ( isLoaded ) {
                return
            }

            isLoaded = true
            $.ajax( {
                url: '/aj/shop_cover/',
                type: 'get',
                data: {
                    shop_id: SHOP_ID
                },
                dataType: 'json'
            } ).done( function( data ) {
                var date, monthAndDay

                if ( data && data.length ) {
                    data        = data[ 0 ]
                    date        = data.new_date
                    monthAndDay = date.replace( /^\d+\-(\d+)-(\d+)$/, '$1.$2' )

                    $( '.js-shop-cover' )
                        .find( 'h3' )
                        .html( monthAndDay + ' 新品到货' )
                        .end()
                        .find( 'a' )
                        .attr( 'href', '/shop/' + shopID + '?current_date=' + date )
                        .find( 'img' )
                        .attr( 'src', data.cover_img )
                        .end()
                        .end()
                        .show()
                }
            } )
        } )
    }())

    /**
     * 优惠券的下拉菜单
     */
    function couponMenu() {
        var BTN_CLASS = 'js-coupon-btn';

        $( '.js-coupon' ).each( function( i, cont ) {
            var $cont  = $( cont ),
                $el    = $cont.find( '.js-coupon-btn' ),
                $panel = $cont.find( '.js-coupon-panel' ),
                $info  = $panel.find( '.js-info' ),
                isInit = false,
                timeoutId;

            DropDown.init( {
                el: $el,
                panel: $panel,
                events: {
                    beforeShow: function() {
                        var that = this;
                        if ( !isInit ) {
                            isInit = true;
                            return callApi.read( { 'url': '/coupon/coupon_share' }, {
                                shop_id: SHOP_ID
                            }, function( data ) {
                                that.$panel.find( '.bd' ).html( shareTmp( 'tmpl_coupon', {
                                    item: data
                                } ) );

                                that.show();
                            } )
                        }
                    }
                }
            } );

            /**
             * 领取优惠券
             */
            $panel.on( 'click', '.' + BTN_CLASS, function() {
                if ( !checkLogin() ) return;

                var $el  = $( this ),
                    code = $el.data( 'code' );

                callApi.write( {
                    url: '/coupon/coupon_apply'
                }, {
                    coupon_apply_code: code
                }, function( data ) {
                    if ( data.code ) {
                        $el.removeClass( BTN_CLASS )
                            .text( '已领完' );
                    } else {
                        clearTimeout( timeoutId );
                        $info.text( '领取成功' )
                            .css( 'top', $el.offsetParent().position().top + 5 )
                            .show()
                            .animate( {
                                opacity: 1
                            }, 500 );
                    }

                    timeoutId = setTimeout( function() {
                        $info.animate( {
                            opacity: 0
                        }, 1000, function() {
                            $info.hide();
                        } );
                    }, 2000 )
                } )
            } );

        } );
    }

    /**
     * 店铺优惠券
     */
    $.ajax( {
        url: '/aj/shop_coupons/',
        dataType: 'json',
        data: {
            twitter_id: TWITTER_ID
        },
        success: function( data ) {
            if ( !data || !data.length ) {
                return
            }

            var tmpl = shareTmp( 'tmpl_shop_coupons', {
                coupons: data
            } ),
                $container = $( '.js-shop-promote' ),
                $items = $container.find( '.js-promote-item' )

            /**
             * 确保优惠券放在『店铺优惠』的上面
             */
            if ( $items.length ) {
                $items.eq( $items.length - 1 ).after( tmpl )
            } else {
                $( tmpl ).prependTo( $container )
            }

            couponMenu()
        }
    } )

    /**
     * 店铺优惠
     */
    $.ajax( {
        url: '/aj/shop_promote/',
        dataType: 'json',
        data: {
            twitter_id: TWITTER_ID
        },
        success: function( data ) {
            if ( !data || !data.length ) {
                return
            }

            var tmpl = shareTmp( 'tmpl_shop_promote', {
                datas: data
            } )

            $( '.js-shop-promote' ).append( tmpl )

            /**
             * 营销工具的下拉层
             */
            DropDown.init( {
                el: '.js-promote-mail-btn',
                panel: '.js-promote-mail-panel'
            } )

            DropDown.init( {
                el: '.js-promote-discount-btn',
                panel: '.js-promote-discount-panel'
            } )

            DropDown.init( {
                el: '.js-promote-reduce-btn',
                panel: '.js-promote-reduce-panel'
            } )
        }
    } )
} );

/**
 * 分享到新浪微博
 */
fml.use( [ 'jquery', 'app/shareTo' ], function() {
    var $           = this.jquery,
        ShareTo     = this.shareTo,
        goodsInfo   = fml.vars.goodsInfo,
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
} );

fml.use( 'app/twitter_comment', function() {
    this();
} );
fml.use( [ 'app/clubApi', 'jquery', 'app/checkLogin' ], function() {
    var check   = this.checkLogin,
        clubApi = this.clubApi.clubApi
    $( '.cnt_item .cl_like' ).live( 'click', function() {
        if ( $( this ).attr( 'uid' ) == Meilishuo.config.user_id ) return;
        if ( !check() ) return false;
        var data     = {
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
} );

/* 淡入淡出喜欢+1效果*/
fml.use( [ 'app/like', 'jquery' ], function() {
    var $        = this.jquery,
        like_btn = $( '.js-like-btn' ),
        like_num = like_btn.find( '.item-like-num' ),
        $loveMsg = $( '.love_msg' )

    var numLiked = like_num.text().match( /\d+/ )
    numLiked     = numLiked ? numLiked[ 0 ] * 1 : 0

    this.like.twitterLike( '.item-like-wrap', '.js-like-btn', function() {
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
            'hoverOn': function() {
                $loveMsg.show()
            },
            'hoverOff': function() {
                $loveMsg.hide()
            }
        } )
} )

fml.use( 'app/like', function() {
    this.posterLike( '.all_goods', '.poster_likes' )
} );
fml.use( 'app/eventHover', function() {
    this.hoverShow( '.hover_pic', '.like_merge' )
} );
fml.use( 'app/forward', function() {
    this.posterForward( '.all_goods', '.poster_forward' )
    this.twitterForward( '.twitter', '#twitter_magazi' )
} );
fml.use( [ 'app/doota/tab' ], function() {
    this.tab.bind( {
        'tagPnl': '.tab_combo',
        'tabTag': '.tabCombo1',
        'activeTagClass': 'cur',
        'contents': '.contentCombo1'
    } )
} );
fml.use( [ 'app/doota/tab' ], function() {
    this.tab.bind( {
        'tagPnl': '.tab_match',
        'tabTag': '.tabArea1',
        'activeTagClass': 'cur',
        'contents': '.contentArea1'
    } )
} );
fml.use( 'page/doota/itemCom', function() {
    this.setRightBar()
    this.setTab( function( context ) {
        window.scrollTo( 0, context.parent().offset().top - 40 )
    } )
    this.lazyLoad()
} );
