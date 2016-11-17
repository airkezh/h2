/*common*/
//original source code: https://github.com/amibug/fly

/**
 var Fly = require( 'component/fly' );

 // start 与 end 里都可以选择传入 width 与 height
 // end 里的 width 和 height 表示动画结束后元素变成的尺寸
 Fly( {
    start: {
        left: 100,
        top: 100,
        width: 50,
        height: 50
    },
    end: {
        left: 500,
        top: 200,
        width: 1,
        height: 1
    },

    speed: 1,  //默认是 1, 数值越大,速度越快,

    onEnd: function() {
        // 动画结束的回调函数
    }
 } )
 */

var $             = require( 'jquery' ),
    RAF           = require( 'component/rAF' ),
    $doc          = $( document ),
    rAF           = RAF.rAF,
    cAF           = RAF.cAF,

    defaultConfig = {
        speed: 1,
        onEnd: function() {
            return true
        }
    }

function Fly( config ) {
    this.config = $.extend( {}, defaultConfig, config )
    this.init()
}

Fly.prototype = {
    constructor: Fly,

    init: function() {
        var config = this.config,
            $el    = $( config.el ),
            start  = config.start,
            end    = config.end,
            vertexTop, vertexLeft, curvature, distance, steps, ratio

        $el.css( {
            position:   'fixed',
            left:       start.left,
            top:        start.top,
            visibility: 'visible'
        } )

        //处理滚动条
        end.left -= $doc.scrollLeft()
        end.top -= $doc.scrollTop()

        // 不要超出页面顶部
        vertexTop = Math.max( 0, Math.min( start.top, end.top ) - Math.abs( start.left - end.left ) / 3 )

        distance = Math.sqrt( Math.pow( start.top - end.top, 2 ) + Math.pow( start.left - end.left, 2 ) )
        // 元素移动次数
        steps = Math.ceil( Math.min( Math.max( Math.log( distance ) / 0.05 - 75, 30 ), 100 ) / config.speed )

        ratio = start.top == vertexTop ? 0 : -Math.sqrt( (end.top - vertexTop) / (start.top - vertexTop) )

        vertexLeft = (ratio * start.left - end.left) / (ratio - 1)
        // 特殊情况，出现顶点left==终点left，将曲率设置为0，做直线运动。
        curvature = end.left == vertexLeft ? 0 : (end.top - vertexTop) / Math.pow( end.left - vertexLeft, 2 )

        config.$el        = $el
        config.start      = start
        config.end        = end
        config.count      = 0
        config.steps      = steps
        config.curvature  = curvature
        config.vertexTop  = vertexTop
        config.vertexLeft = vertexLeft

        this.move()
    },

    move: function() {
        var _this    = this,
            settings = _this.config,
            start    = settings.start,
            count    = settings.count,
            steps    = settings.steps,
            end      = settings.end,
            $element = settings.$el

        // 计算left top值
        var left = start.left + (end.left - start.left) * count / steps,
            top  = settings.curvature == 0 ? start.top + (end.top - start.top) * count / steps : settings.curvature * Math.pow( left - settings.vertexLeft, 2 ) + settings.vertexTop

        // 运动过程中有改变大小

        if ( end.width != null && end.height != null ) {
            var i      = steps / 2,
                width  = end.width - (end.width - start.width) * Math.cos( count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2 ),
                height = end.height - (end.height - start.height) * Math.cos( count < i ? 0 : (count - i) / (steps - i) * Math.PI / 2 )

            $element.css( {
                width:       width + 'px',
                height:      height + 'px',
                "font-size": Math.min( width, height ) + 'px'
            } )
        }

        $element.css( {
            left: left + 'px',
            top:  top + 'px'
        } )

        settings.count++
        // 定时任务
        var time = rAF( function() {
            _this.move( settings )
        } )

        if ( count == steps ) {
            cAF( time );
            // fire callback
            settings.onEnd.apply( this )
        }
    }
}

return function( config ) {
    return new Fly( config )
}
