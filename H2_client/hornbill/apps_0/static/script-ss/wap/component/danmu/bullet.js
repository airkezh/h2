/*common*/
var
    DOC       = document,
    DUMMY     = DOC.createElement( 'div' ),

    TRANSFORM = (function() {
        var vendorTransform = [ 'transform', '-webkit-transform', '-moz-transform', '-o-transform' ],
            style = DOC.body.style,
            len   = vendorTransform.length,
            i     = 0

        for ( ; i < len; i++ ) {
            if ( vendorTransform[ i ] in style ) {
                return vendorTransform[ i ]
            }
        }
    })()

function Bullet( config ) {
    var cfg

    this.context = config.context
    this.channel = config.channel
    cfg = this.context.config

    if ( cfg.bulletTmpl ) {
        this.tmpl = cfg.bulletTmpl
    }

    this.initBullet = cfg.initBullet || function() {
        return true
    }

    this.create()
}

Bullet.prototype = {
    constructor: Bullet,

    tmpl: '<div><i data-name="icon"></i><span data-name="content"></span></div>',

    /**
     * 生成子弹
     */
    create: function() {
        var els, el

        this.els = els = {}

        DUMMY.innerHTML = this.tmpl
        el = els.el = DUMMY.firstChild
        this.context.$el.append( el )
        this.initEls()
    },

    initEls: function() {
        var els = this.els

        $( els.el ).find( '[data-name]' ).each( function() {
            els[ this.getAttribute( 'data-name' ) ] = this
        })
    },

    /**
     * TODO 移动子弹
     */
    move: function( timestamp ) {
        var left

        this.startTime || ( this.startTime = timestamp )

        left = this.left = this.speed * ( timestamp - this.startTime )
        this.style[ TRANSFORM ] = 'translate3d(' + left + 'px, 0, 0 )'

        if ( left <= this.dist ) {
            return 'end'
        } else if ( !this.passNext && left <= this.next ) {
            this.passNext = true
            return 'next'
        }
    },

    /**
     * TODO 初始化子弹
     */
    init: function( custom ) {
        var style, width, left, customObj, cutomType, ret, el, contentEl,
            r         = Math.random().toFixed( 2 ),
            ctx       = this.context,
            cfg       = ctx.config,
            els       = this.els,
            ctxWidth  = ctx.width,
            topOffset = r * ctx.channelOffset

        $( els.el ).html( $( this.tmpl ).html() )

        this.initEls()

        el           = els.el,
        contentEl    = els.content,
        el.className = cfg.bulletClass || 'bullet'
        contentEl.innerHTML = ctx.getMessage()
        style = this.style = this.style || el.style

        customObj = {
            bullet: this
        }

        if ( custom ) {
            cutomType = typeof custom
            if ( cutomType == 'object' ) {
                customObj = $.extend( true, custom, customObj )
            } else if( cutomType == 'function' ) {
                custom.call( customObj )
            } else {
                throw Error( 'load() function\'s parameter type is not right!' )
            }
        }

        ret = this.initBullet.call( customObj )

        width = this.width = el.offsetWidth

        /**
         * 子弹初始化完毕后，top 是不会发生变化的
         * 设置 left 是为了控制 translate 的原点
         */
        left = this.left = ctxWidth + r * width

        this.stylePrefix = 'left:' + left + 'px;top:' +
        ( this.channel * ctx.channelHeight + topOffset ) + 'px;'

        style.cssText = this.stylePrefix + TRANSFORM + ':translate3d(' + left + 'px, 0, 0 );'

        this.dist = -1 * ( width + left )

        /**
         * 避免弹幕出现过快导致太多重叠
         */
        this.next      = -1 * ( r * ctxWidth + width )
        this.passNext  = false
        this.startTime = 0

        return ret
    }
}

return Bullet
