/*common*/

/*
 手机横屏时,更新瀑布流布局
 */

var $                  = require( 'wap/zepto' ),
    Waterfall          = require( 'circle/component/waterfall' ),

    win                = window,
    $win               = $( win ),

    EVENT_CLEAR_BACKUP = Waterfall.CONS.EVENT_CLEAR_BACKUP,
    EVENT_ORIENTATION  = 'orientationchange',
    GAP                = 100,
    PORTRAIT           = 'portrait',
    LANDSCAPE          = 'landscape',
    winWidth, oldWinWidth, nowWinWidth

function WaterfallReflowPlugin( instance ) {
    this.init( instance )
}

WaterfallReflowPlugin.prototype = {
    constructor: WaterfallReflowPlugin,

    init: function( instance ) {
        this.instance  = instance
        this.config    = instance._config
        this.oldRatio  = 1
        this._handler  = this.orientationHandler.bind( this )
        this.initState = this.getOrientation()

        win.addEventListener( EVENT_ORIENTATION, this._handler )
        oldWinWidth = winWidth = $win.width()
        //console.log( instance )
    },

    orientationHandler: function() {
        var _this = this
        clearTimeout( this._timeout )

        this._timeout = setTimeout( function() {
            nowWinWidth = $win.width()

            if ( nowWinWidth != oldWinWidth ) {
                _this.ratio = nowWinWidth / oldWinWidth
                oldWinWidth = nowWinWidth
            }

            $win.triggerHandler( EVENT_CLEAR_BACKUP )
            _this.curState = _this.getOrientation()
            _this.reflow()
        }, GAP )
    },

    getOrientation: function() {
        return win.orientation == 0 ? PORTRAIT : LANDSCAPE
    },

    reflow: function() {
        var config    = this.config,
            instance  = this.instance,
            initState = this.initState,
            curState  = this.curState,
            col       = {},
            ratio     = this.ratio,
            curColWidth

        if ( initState == curState ) {
            ratio = this.ratio = this.oldRatio
        }

        //console.log( 'Ratio = ' + ratio )
        curColWidth = parseInt( config.colWidth * ratio )

        //console.log( curColWidth )
        config.colWidth = curColWidth

        //console.log( instance )
        //TODO: update _boxes, _cols, _colsHistory
        instance._boxes.forEach( function( v ) {
            var el = v.el,
                height

            el.style.width = curColWidth + 'px'
            height         = el.offsetHeight

            if ( v.top > v.height ) {
                v.top *= ratio
                v.relativeTopStyle = parseInt( v.relativeTopStyle ) * ratio + 'px'
            }

            if ( v.left > v.width ) {
                v.left *= ratio
            }

            v.width  = curColWidth
            v.height = height

            el.style.top  = v.relativeTopStyle
            el.style.left = v.left + 'px'
        } )

        instance._cols.forEach( function( v ) {
            if ( v.left > config.colGapL ) {
                v.left *= ratio
            }

            v.min *= ratio
            v.max *= ratio
        } )

        instance.resetCurTop()
    },

    destroy: function() {
        win.removeEventListener( EVENT_ORIENTATION, this._handler )
    }
}

exports.init = function( instance ) {
    return new WaterfallReflowPlugin( instance )
}
