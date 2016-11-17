/*common*/
/**
 * @name: 弹幕
 * @author: sunzhidong
 * @how-to-use:
 *      var Danmu = require( 'wap/component/danmu/index' ),
 *          danmu = Danmu( config )
 *
 * @doc: http://gitlab.fexot.meiliworks.com/refactor/egret/tree/master/documents/danmu
 *
 * TODO:
 *      1，子弹内容，样式定制
 *      2，运动方向
 */
var $      = require( 'wap/zepto' ),
    Bullet = require( 'wap/component/danmu/bullet' ),

    WIN    = window,
    Date   = WIN.Date,

    Tools,

    /**
     * https://github.com/julianshapiro/velocity/blob/master/velocity.js#L464
     */
    oldStyleMove = (function() {
        var timeLast = 0

        return function( callback ) {
            var timeCurrent = Tools.getCurrentTime(),
                timeDelta

            /* Dynamically set delay on a per-tick basis to match 60fps. */
            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
            timeDelta = Math.max( 0, 16 - ( timeCurrent - timeLast ))
            timeLast  = timeCurrent + timeDelta

            return setTimeout( function() { callback( timeCurrent + timeDelta ) }, timeDelta )
        }
    })(),

    requestAnimationFrame = WIN.requestAnimationFrame       ||
                            WIN.webkitRequestAnimationFrame ||
                            WIN.mozRequestAnimationFrame    ||
                            oldStyleMove,

    cancelAnimationFrame  = WIN.cancelAnimationFrame        ||
                            WIN.webkitCancelAnimationFrame  ||
                            WIN.webkitCancelRequestAnimationFrame ||
                            WIN.mozCancelAnimationFrame     ||
                            function( timeoutID ) {
                                clearTimeout( timeoutID )
                            },

    PERFORMANCE = WIN.performance || {},

    /**
     * 检查『空闲通道』的间隔时间
     */
    CHECK_IDLE_TIMEOUT = 5000,

    FALSE  = false,

    MANUAL = 'manual',

    STOP_CHECK_IDLE_CHANNEL = 'stop-check-idle-channel'

/**
 * 工具对象
 */
Tools = {
    /**
     * 获得当前时间
     */
    getCurrentTime: PERFORMANCE.now ? function() {
        return PERFORMANCE.now()
    } :
        PERFORMANCE.webkitNow ? function() {
            return PERFORMANCE.webkitNow()
        } : function() {
            return ( new Date ).getTime()
        }
}

function Danmu( config ) {
    var $el

    if ( !config || !config.el ) {
        throw Error( 'Please provide a config object!' )
    }

    this.config      = config || {}
    this.$el         = $el = $( config.el )
    this.width       = $el.width()
    this.height      = $el.height()
    this.queue       = []
    this.handlers    = config.handlers || {}
    this.initBullet  = config.initBullet
    this.handleTouch = config.handleTouch || function() { return true }
    this.getMessage  = config.getMessage  || function() { return '' }
    this.initChannel = config.initChannel
    this.mode        = config.mode || 'auto'

    this.init()
}

Danmu.prototype = {
    constructor: Danmu,

    /**
     * TODO CUSTOM
     *      signaleEl not defined
     */
    init: function() {
        var bullet, channel, index, channels, customChannel, clipSize,
            channelOffset, channelHeight,
            $el           = this.$el,
            cfg           = this.config,
            height        = cfg.bulletHeight,

            /*
             * 每个通道最多拥有的子弹数
             * 这个 4 是初始值，随便取的
             */
            maxBulletsPerChannel = 4,

            clip     = this.clip   = [],  //弹夹
            flying   = this.flying = [],  //正在飞行的子弹
            avaliableChannels = this.avaliableChannels = [],
            i        = 0,
            mode     = cfg.mode,
            that     = this

        if ( mode == MANUAL ) {
            this.isShutDown = true
        }

        if ( this.initChannel ) {
            customChannel = this.initChannel
            channelOffset = this.channelOffset = customChannel.offset
            channelHeight = this.channelHeight = customChannel.height
            channels      = this.channelSizes  = customChannel.size
        } else {
            channelOffset = this.channelOffset = ( height / 4 ) << 0
            //默认通道高度 = bullet 内容高度 + 偏移
            channelHeight = this.channelHeight = height + channelOffset
            channels      = this.channelSizes  = parseInt( this.height / channelHeight )
        }

        clipSize = maxBulletsPerChannel * channels

        for ( ; i < clipSize; i++ ) {
            index  = i % channels
            bullet = new Bullet( {
                context: this,
                channel: index
            })

            if ( i < channels ) {
                avaliableChannels.push( i )
                if ( !this.isShutDown && bullet.init() !== FALSE ) {
                    flying.push( bullet )
                }
            } else {
                channel = clip[ index ]
                channel || ( channel = clip[ index ] = [] )
                channel.push( bullet )
            }
        }

        !this.isShutDown && this.checkIdleChannels()

        $el.on( 'touchstart', '[data-action]', function( e ) {
            var h
            h = that.handlers[ this.getAttribute( 'data-action' ) ]
            h && h.call( this, e )
        })

        $el.on( STOP_CHECK_IDLE_CHANNEL, function() {
            clearTimeout( that._checkIdleChannelsID )
        } )

        return this.start()
    },

    /**
     * 空闲通道检测
     * 在特殊情况下，通道中的所有子弹都出现在弹幕中，并且都已设置过 next 状态
     * 等这些子弹飞行结束后，flying 数组中已没有该通道的子弹，该通道即视为『空闲』
     */
    checkIdleChannels: function() {
        clearTimeout( this._checkIdleChannelsID )

        var size    = this.channelSizes,
            checker = new Array( size ),
            flying  = this.flying,
            len     = flying.length,
            i       = 0,
            that    = this

        for ( ; i < len; i++ ) {
            checker[ flying[ i ].channel ] = 1
        }

        for ( i = 0; i < size; i++ ) {
            !checker[ i ] && that.emit( i )
        }

        this._checkIdleChannelsID = setTimeout( function() {
            that.checkIdleChannels()
        }, CHECK_IDLE_TIMEOUT)
    },

    /**
     * 发射子弹
     * @param channelNum 子弹所在通道
     */
    emit: function( channelNum ) {
        var channel = this.clip[ channelNum ],
            custom  = this.queue.shift(),
            bullet  = channel.shift()

        if ( bullet ) {
            if ( bullet.init( custom ) != FALSE ) {
                this.flying.push( bullet )
            }
        }
    },

    handle: function( state, index ) {
        var clip       = this.clip,
            flying     = this.flying,
            bullet     = flying[ index ],
            channelNum = bullet.channel,
            remains    = clip[ channelNum ]

        switch ( state ) {
            //发射下一颗子弹
            case 'next':
                this.avaliableChannels.push( channelNum )
                if ( this.queue.length || !this.isShutDown ) {
                    this.emit( channelNum )
                }
                break

            /*
             *   bullet 飞行结束，放回到弹夹中
             */
            case 'end':
                flying.splice( index,  1 )
                remains.push( bullet )
                break
        }
    },

    /**
     * 填充子弹
     * 在 manual 模式下，需要手动调用 emit
     * @param bullet 子弹
     */
    load: function( bullet ) {
        var channelNum, index,
            avaliableChannels = this.avaliableChannels,
            len = avaliableChannels.length

        this.queue.push( bullet )

        if ( len && this.mode == MANUAL ) {
            index = parseInt( Math.random() * len )
            channelNum = avaliableChannels[ index ]
            avaliableChannels.splice( index, 1 )
            this.emit( channelNum )
        }
    },

    /**
     * 弹幕启动
     */
    start: function() {
        var that   = this,
            flying = that.flying

        /**
         * TODO 如果弹幕停止(即 isShutdown 为 true)，这里还会继续循环
         */
        function frame( timestamp ) {
            var bullet, result,
                len = flying.length

            while ( len-- ) {
                bullet = flying[ len ]
                result = bullet.move( timestamp )
                result && that.handle( result, len )
            }

            that.animationID = requestAnimationFrame( frame )
        }

        this.animationID  = requestAnimationFrame( frame )

        return this
    },

    /**
     * 弹幕暂停
     */
    pause: function() {
        this.pauseStartTime = Tools.getCurrentTime()
        cancelAnimationFrame( this.animationID )
        this.$el.trigger( STOP_CHECK_IDLE_CHANNEL )

        return this
    },

    /**
     * 弹幕恢复
     */
    restore: function() {
        var costTime,
            flying = this.flying,
            len    = flying.length

        costTime = Tools.getCurrentTime() - this.pauseStartTime

        while ( len-- ) {
            flying[ len ].startTime += costTime
        }

        this.isShutDown = false
        this.checkIdleChannels()

        return this.start()
    },

    /**
     * 停止弹幕动画
     * 不会添加新的子弹，使用 restore() 恢复执行
     */
    shutdown: function() {
        this.isShutDown = true
        this.$el.trigger( STOP_CHECK_IDLE_CHANNEL )
    },

    /**
     * 切换弹幕模式
     * mode：
     *      auto：默认自动模式
     *      manual：手动模式，组件不会自动发射子弹，需要手动调用 load()
     */
    setMode: function( mode ) {
        this.mode = mode || 'auto'

        if ( mode == MANUAL ) {
            this.$el.trigger( STOP_CHECK_IDLE_CHANNEL )
        }
    },

    /**
     * TODO 弹幕销毁
     */
    destroy: function() {
        this.$el.off( STOP_CHECK_IDLE_CHANNEL ).off( 'touchstart' )

        cancelAnimationFrame( this.animationID )
    }
}

return function( config ) {
    return new Danmu( config )
}
