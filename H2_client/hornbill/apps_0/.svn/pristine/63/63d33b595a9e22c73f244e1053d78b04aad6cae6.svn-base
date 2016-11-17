/*
 * @desc: 加入购物车
 * @author: zhidongsun
 * @date: 2014-10-30
 * @depend:
 *      less: /less/app/addToCart.less
 *      tmpl: /www/views/tmpl/app.addToCart.html
 *
 * @how-to-use:
 *      //示例，来自于 script-ss/page/huodong/tg512.js
 *      fml.use('app/addToCart', function() {
 *          this({
 *              hook: '.js-addToCart',   //按钮的 class
 *              tmpl: 'tmplAddToCart',   //组件依赖的模板
 *              parent: 'li'             //弹出层遮盖的最大范围，即弹层底部会与该元素底部对齐
 *          })
 *      })
 *
 *      注意：『加入购物车』按钮上需提供 data-tid=twitter_id
 *
 */
fml.define( 'app/addToCart',
    [ 'jquery',
        'app/checkLogin',
        'app/doota/stock',
        'app/tracking',
        'component/callApi',
        'component/shareTmp',
        'ui/alert'
    ], function( require ) {
        var $                      = require( 'jquery' ),
            CheckLogin             = require( 'app/checkLogin' ),
            Stock                  = require( 'app/doota/stock' ),
            Tracking               = require( 'app/tracking' ),
            CallApi                = require( 'component/callApi' ),
            ShareTmp               = require( 'component/shareTmp' ),
            Alert                  = require( 'ui/alert' ),

            doc                    = document,
            $doc                   = $( doc ),
            $body                  = $( doc.body ),

            LOCATION               = window.location.href,
            USER_ID                = Meilishuo.config.user_id,

            //did nothing.
            noop                   = function() {
                return true;
            },

            //当前 ajax 请求的 id
            globalAjaxId           = 1,

            //只能存在一个购物车 panel
            addToCartPanelInstance = null,
            $currentActiveButton   = null,

            //加入购物车后弹出框隐藏的定时器
            alertWinTimeoutId,

            dummy,

            //fix IE 7
            ieChangeButtonPosition,
            ieGetParent,
            ieResetButtonPosition,

            GLOBAL_INTERVAL_ID,
            //需要修复 ie bug
            NEED_FIX               = false,

            //按钮上的文案可能会改变，所以不要写成固定的
            DEFAULT_TEXT,

            ACTIVE                 = 'active',
            ACTIVE_TEXT            = '确定',
            ADD_TO_CART_ACTIVE     = 'btn-addToCart-active',
            ADD_TO_CART_PANEL      = 'addToCart-panel',
            CAN_NOT_BUY            = 'js-can-not-buy',
            GLOBAL_PANEL_ID        = 'addToCartPanel',
            INDEX                  = 'index',
            IS_LOADING             = '正在加载',
            IS_LOADING_SUFFIX      = '...',
            IS_REQUEST             = 'is_request',
            MAX_HEIGHT             = 'max_height',
            MAX_TOP                = 'max_top',
            MESSAGE_LIMIT          = '.js-msg-limit',
            MESSAGE_OVER           = '.js-msg-over',
            MESSAGE_ZERO           = '.js-msg-zero',
            NORMAL_HEIGHT          = 'normal_height',
            NORMAL_TOP             = 'normal_top',
            OUT_OF_STOCK           = 'out-of-stock',
            PANEL_ERROR            = 'addToCartPanel-error',
            PANEL_COLOR_ITEM       = '.js-panel-color .js-item',
            PANEL_SIZE_ITEM        = '.js-panel-size .js-item',
            PANEL_STOCK            = '.addToCartPanel-stock',

            ALERTWIN_CONTENT       = '恭喜亲已成功加入购物车!',
            ALERTWIN_TIMEOUT       = 1500,

            URL_CART               = '/cart/add',
            URL_DATA               = '/aj/shareMain/'

        /**
         * @TODO HACK
         * 修复 IE 7 的 z-index 问题
         * 点击按钮时将按钮移动到 body，设置绝对定位，在按钮原位置设置 dummy 元素做占位
         */
        if ( $.browser.msie && $.browser.version <= 8 ) {
            NEED_FIX = true

            dummy = $( '<div></div>' )
            dummy.css( 'display', 'block !important' )

            ieChangeButtonPosition = function( $el ) {
                var offset    = $el.offset(),
                    marginTop = $el.css( 'marginTop' )
                dummy.css( 'marginTop', marginTop )

                dummy.css( {
                    width: $el.width(),
                    height: $el.height()
                } ).insertBefore( $el )

                $el.data( {
                    'parent': $el.parent(),
                    'marginTop': marginTop
                } )
                    .css( {
                        position: 'absolute',
                        left: offset.left,
                        top: offset.top,
                        marginTop: 0
                    } );

                $body.append( $el )
            }

            ieResetButtonPosition = function( $el ) {
                $el.insertBefore( dummy )
                    .css( {
                        'position': 'static',
                        'marginTop': $el.data( 'marginTop' )
                    } )
                    .removeData( 'parent' )

                dummy.remove()
            }

            ieGetParent = function( $el, selector ) {
                return $el.data( 'parent' ).closest( selector )
            }
        } else {
            ieChangeButtonPosition = ieResetButtonPosition = noop;
            ieGetParent = function( $el, selector ) {
                return $el.closest( selector )
            };
        }

        /**
         * 点击空白处关闭弹层
         */
        $doc.on( 'click', function() {
            addToCartPanelInstance && addToCartPanelInstance.close()
        } )

        function AddToCart( config ) {
            this.config = config

            if ( !config || !config.hook || !config.tmpl || !config.parent ) {
                throw Error( 'please provide property hook, tmpl and parent!' )
            }

            this.init()
        }

        AddToCart.prototype = {
            init: function() {
                $doc.on( 'click', this.config.hook, $.proxy( this.handler, this ) )
            },

            /**
             * 处理按钮点击事件
             */
            handler: function( e ) {
                if ( !CheckLogin() ) {
                    return false
                }

                var $el = $( e.currentTarget )

                if ( $el.hasClass( CAN_NOT_BUY ) ) {
                    return false;
                }

                DEFAULT_TEXT || (DEFAULT_TEXT = $el.html())

                if ( $currentActiveButton && $currentActiveButton[ 0 ] !== $el[ 0 ] ) {
                    addToCartPanelInstance && addToCartPanelInstance.close()
                }

                $currentActiveButton = $el

                if ( $el.hasClass( ADD_TO_CART_ACTIVE ) ) {
                    this.addToCart( $el )
                } else {
                    //FIX IE
                    ieChangeButtonPosition( $el )
                    this.render( $el )
                }

                return false;
            },

            /**
             *  代码来自于 /page/doota/itemCom
             *  源码中针对的是单品页，无法适用其余页面，所以将关键函数单独抽取出来
             */
            addToCart: function() {
                var $panel = addToCartPanelInstance,
                    $cont  = $panel.$cont,
                    orderInfo

                if ( !$panel.isReady() ) {
                    return $panel.$cont.addClass( PANEL_ERROR )
                }

                Tracking.cr( 'buy', {
                    'btn': 'add_cart',
                    'goods_pid': $cont.data( 'goods_pid' ),
                    'goods_id': $cont.data( 'goods_id' ),
                    'twitter_id': $cont.data( 'twitter_id' ),
                    'user_id': USER_ID,
                    'url': LOCATION
                } )

                orderInfo = $panel.getOrderInfo()

                CallApi.write( { 'url': URL_CART }, orderInfo, function( res ) {
                    var sid = res && res.info && res.info.sid,
                        alertWin, errMsg

                    if ( sid ) {
                        alertWin = new Alert( {
                            width: 370,
                            confirmTxt: '确定',
                            content: ALERTWIN_CONTENT,
                            onClose: function() {
                                clearTimeout( alertWinTimeoutId )
                            }
                        } )

                        alertWinTimeoutId = setTimeout( function() {
                            alertWin.drive.destroyModel();
                        }, ALERTWIN_TIMEOUT )
                    } else {
                        if ( !res ) {
                            errMsg = 'opps,有点错误,一会儿再试试吧'
                        } else if ( res.code ) {
                            errMsg = res.info.msg
                        }

                        new Alert( {
                            width: 370,
                            title: '我的购物车',
                            confirmTxt: res && '去整理购物车',
                            content: errMsg
                        } ).onSure( function() {
                                if ( res ) {
                                    window.open( '/cart' )
                                }
                            } )
                    }
                } )
            },

            render: function( $el ) {
                var that  = this,
                    count = -1,
                    max   = IS_LOADING_SUFFIX.length,
                    //使用局部变量来缓存副本，否则清除的会是错的
                    intervalId, ajaxID

                if ( $el.data( IS_REQUEST ) ) {
                    return
                }

                ajaxID = ++globalAjaxId

                $el.data( IS_REQUEST, true ).html( IS_LOADING )

                GLOBAL_INTERVAL_ID = intervalId = setInterval( function() {
                    count++
                    $el.html( IS_LOADING + IS_LOADING_SUFFIX.substring( 0, count ) )
                    count >= max && (count = -1)
                }, 300 )

                $.getJSON( URL_DATA, {
                    tid: $el.data( 'tid' )
                } ).done( function( data ) {
                    if ( globalAjaxId !== ajaxID ) {
                        return
                    }
                    $el.addClass( ADD_TO_CART_ACTIVE )
                    new AddToCartPanel( $el, that.config, data )
                } ).always( function() {
                    clearInterval( intervalId )
                    if ( globalAjaxId !== ajaxID ) {
                        return $el.html( DEFAULT_TEXT ).data( IS_REQUEST, false )
                    }
                    $el.data( IS_REQUEST, false ).html( ACTIVE_TEXT )
                } )
            }
        }

        function AddToCartPanel( $el, config, data ) {
            var that

            if ( !addToCartPanelInstance ) {
                that = addToCartPanelInstance = this
            } else {
                that = addToCartPanelInstance
            }

            that.config        = config
            that.curSelectedEl = {}
            that.data          = data
            that.$el           = $el
            that.render()
            return that
        }

        AddToCartPanel.prototype = {
            /*
             * 弹层关闭后要记得清除按钮上的 class，还原文案
             */
            close: function() {
                var $cont            = this.$cont

                ieResetButtonPosition( this.$el )

                $cont.hide()
                    .css( {
                        'height': 'auto',
                        'width': 'auto',
                        'minHeight': 0,
                        'top': 0,
                        'left': 0
                    } )
                    .html( '' )
                    .removeClass( PANEL_ERROR )
                    .removeData( [ NORMAL_HEIGHT, MAX_HEIGHT, NORMAL_TOP, MAX_TOP ] )

                /**
                 * IE 7 下不支持 width 的 'auto' 值，所以只能每次都重新生成 panel
                 */
                if ( NEED_FIX ) {
                    $cont.off( 'click' ).remove()
                    addToCartPanelInstance = null
                }

                this.$el.removeClass( ADD_TO_CART_ACTIVE + ' ' + CAN_NOT_BUY )
                    .html( DEFAULT_TEXT )
                    .data( IS_REQUEST, false )

                clearTimeout( GLOBAL_INTERVAL_ID )
                $currentActiveButton = null
            },

            handler: function( e ) {
                var $target       = $( e.currentTarget ),
                    $cont         = this.$cont,
                    type          = $target.data( 'type' ),
                    data          = this.data.stock,
                    curSelectedEl = this.curSelectedEl,
                    tmp, index, el, trackData

                if ( $target.hasClass( OUT_OF_STOCK ) ) {
                    return
                }

                if ( $target.hasClass( ACTIVE ) ) {
                    $target.removeClass( ACTIVE )
                    el = curSelectedEl[ type ] = null
                } else {
                    (tmp = curSelectedEl[ type ]) && tmp.removeClass( ACTIVE )
                    el = curSelectedEl[ type ] = $target.addClass( ACTIVE )
                }

                index = el ? el.data( INDEX ) : 0;
                if ( type == 'color' ) {
                    $cont.find( PANEL_SIZE_ITEM ).each( function( i, v ) {
                        v = $( v )
                        if ( index ? data[ i + 1 ].color[ index ] : data[ i + 1 ].sum ) {
                            v.removeClass( OUT_OF_STOCK )
                        } else {
                            !v.hasClass( OUT_OF_STOCK ) && v.addClass( OUT_OF_STOCK )
                        }
                    } )
                } else if ( type == 'size' ) {
                    $cont.find( PANEL_COLOR_ITEM ).each( function( i, v ) {
                        v = $( v )
                        if ( data[ index ].color[ i + 1 ] ) {
                            v.removeClass( OUT_OF_STOCK )
                        } else {
                            !v.hasClass( OUT_OF_STOCK ) && v.addClass( OUT_OF_STOCK )
                        }
                    } )
                }

                if ( index ) {
                    trackData         = {
                        'goods_pid': $cont.data( 'goods_pid' ),
                        'goods_id': $cont.data( 'goods_id' ),
                        'twitter_id': $cont.data( 'twitter_id' ),
                        'user_id': USER_ID,
                        'url': LOCATION
                    }
                    trackData[ type ] = index
                    Tracking.cr( 'selectProp', trackData )
                }
                data = data[ curSelectedEl.size ? curSelectedEl.size.data( INDEX ) : 0 ]
                this.stock.upStockNum( curSelectedEl.color ? data.color[ curSelectedEl.color.data( INDEX ) ] : data.sum )
            },

            /**
             * 是否可以提交
             * @returns {boolean}
             */
            isReady: function() {
                var data = this.data
                return !((!this.curSelectedEl.color && data.color.is_show) ||
                (!this.curSelectedEl.size && data.size.is_show))
            },

            /**
             * 获取订单信息
             */
            getOrderInfo: function() {
                var $cont = this.$cont,
                    obj   = {
                        'amount': +$cont.find( '.js-nums' ).val(),
                        'goods_pid': $cont.data( 'goods_pid' ),
                        'goods_id': $cont.data( 'goods_id' ),
                        'twitter_id': $cont.data( 'twitter_id' )
                    },
                    data  = this.data

                if ( this.curSelectedEl.color ) {
                    obj.color = data.color.name + '__' +
                    (data.color.value[ this.curSelectedEl.color.data( INDEX ) - 1 ])
                }
                if ( this.curSelectedEl.size ) {
                    obj.size = data.size.name + '__' +
                    (data.size.value[ this.curSelectedEl.size.data( INDEX ) - 1 ])
                }

                return obj
            },

            bindEvent: function() {
                this.$cont.on( 'click', '.js-item', $.proxy( this.handler, this ) )
                    .on( 'click', '.js-close', $.proxy( this.close, this ) )
                    .on( 'click', function() {
                        //防止冒泡
                        return false
                    } )
            },

            createStock: function() {
                var $cont  = this.$cont,
                    $el    = this.$el,
                    $stock = $cont.find( PANEL_STOCK ),
                    data   = this.data,
                    that   = this,
                    stock

                this.stock = stock = Stock.bind( {
                    'input': $stock.find( 'input' ),
                    'minus': $stock.find( '.js-minus:not(.disabled)' ),
                    'plus': $stock.find( '.js-plus:not(.disabled)' ),
                    'stockMax': $cont.find( '.js-stocknum' )
                } )

                stock.tipOnout = function( stat ) {
                    that.outOfStock( stat, $cont )
                }

                stock.outStock = function( isOut ) {
                    $el[ (isOut ? 'add' : 'remove') + 'Class' ]( CAN_NOT_BUY )
                }

                /* 初始化库存 */
                stock.upStockNum( data.repertory )
            },

            /**
             * 渲染 panel，并进行初始化
             */
            render: function() {
                var $el   = this.$el,
                    $cont = this.$cont = this.$cont || $( '<div></div>' ),
                    $parent = ieGetParent( $el, this.config.parent ),
                    pOffset = $parent.offset(),
                    data    = this.data

                data.color = data.prop ? (data.prop[ 0 ] || {}) : {}
                data.size  = data.prop ? (data.prop[ 1 ] || {}) : {}

                $cont.html( ShareTmp( this.config.tmpl, data ) )

                if ( !this.inItialized ) {
                    $cont.addClass( ADD_TO_CART_PANEL )
                        .attr( 'id', GLOBAL_PANEL_ID )

                    $body.prepend( $cont )
                    this.bindEvent()
                } else {
                    $cont.show()
                }

                this.createStock()

                $cont.css( {
                    left: pOffset.left,
                    width: $parent.width()
                } )

                $cont.data( {
                    'goods_id': data.goods_id,
                    'goods_pid': data.goods_pid || 0,
                    'twitter_id': data.twitter_id
                } )

                this.inItialized = true

                /**
                 * panel 底部始终与 $el(即按钮) 相距 20px
                 * msg_box 有 margin-top: 10px，所以下面减去 10
                 */
                setTimeout( function() {
                    var eTop      = $el.offset().top,
                        cHeight   = $cont.height(),
                        cTop      = eTop - cHeight - 10,
                        msgHeight = $cont.find( MESSAGE_LIMIT ).outerHeight()//默认三条错误信息的高度一致

                    cHeight = pOffset.top + $parent.height() - cTop

                    $cont.css( {
                        'top': cTop,
                        'height': cHeight
                    } ).data( {
                        'normal_height': cHeight,
                        'normal_top': cTop,
                        'max_height': cHeight + msgHeight,
                        'max_top': cTop - msgHeight
                    } )
                }, 0 )
            },

            /**
             * 提示与库存相关的错误信息
             */
            outOfStock: function( stat, $cont ) {
                var $msgLimit = $cont.find( MESSAGE_LIMIT ),
                    $msgOver  = $cont.find( MESSAGE_OVER ),
                    $msgZero  = $cont.find( MESSAGE_ZERO ),
                    msg

                switch ( stat ) {
                    case 1:
                        msg = $msgLimit.show()
                        $msgOver.hide()
                        $msgZero.hide()
                        break
                    case 2:
                        $msgLimit.hide()
                        msg = $msgOver.show()
                        $msgZero.hide()
                        break
                    case 3:
                        $msgLimit.hide()
                        $msgOver.hide()
                        msg = $msgZero.show()
                        break
                    default:
                        $msgLimit.hide()
                        $msgOver.hide()
                        $msgZero.hide()
                }

                //让体验更好一点，没什么用
                msg ? $cont.css( {
                    'top': $cont.data( MAX_TOP ),
                    'height': $cont.data( MAX_HEIGHT )
                } ) : $cont.css( {
                    'top': $cont.data( NORMAL_TOP ),
                    'height': $cont.data( NORMAL_HEIGHT )
                } )
            }
        }

        return function( config ) {
            new AddToCart( config )
        }
    } )
