/*common*/
/**
 * @name: requestAnimationFrame
 * @use:
 *      var RAF = require( 'circle/core/rAF' ),
 *          rAF = RAF.rAF,
 *          cAF = RAF.cAF
 *
 *      // 不能直接使用 RAF.rAF(), 必须将
 */
var WIN          = window,
    oldStyleMove = (function() {
        var timeLast = 0

        return function( callback ) {
            var timeCurrent = +new Date,
                timeDelta

            /* Dynamically set delay on a per-tick basis to match 60fps. */
            /* Technique by Erik Moller. MIT license: https://gist.github.com/paulirish/1579671 */
            timeDelta = Math.max( 0, 16 - ( timeCurrent - timeLast ) )
            timeLast  = timeCurrent + timeDelta

            return setTimeout( function() {
                callback( timeCurrent + timeDelta )
            }, timeDelta )
        }
    })()

exports.rAF = WIN.requestAnimationFrame ||
            WIN.webkitRequestAnimationFrame ||
            WIN.mozRequestAnimationFrame ||
            oldStyleMove

exports.cAF = WIN.cancelAnimationFrame ||
            WIN.webkitCancelAnimationFrame ||
            WIN.webkitCancelRequestAnimationFrame ||
            WIN.mozCancelAnimationFrame ||
            function( timeoutID ) {
                clearTimeout( timeoutID )
            }
