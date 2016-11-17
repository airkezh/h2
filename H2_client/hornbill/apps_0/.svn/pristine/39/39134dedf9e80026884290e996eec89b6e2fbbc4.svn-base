/*common*/
/**
 * @name: freshAjax
 * @description: 多次请求同一数据源，只有最新的请求才会生效
 */
var $        = require( 'wap/zepto' ),
    cache    = {},

    NOOP     = function() {
        return true
    },

    hasAbort = 'abort' in ( new XMLHttpRequest )

function wrapCallback( url, guid, fn ) {
    return function() {
        var freshXHR = cache[ url ]

        /**
         * cache 里保存的是请求的最新 uid
         */
        if ( freshXHR.abortUID < guid && freshXHR.uid == guid ) {
            freshXHR.abortUID = freshXHR.uid
            fn.apply( this, [].slice.call( arguments, 0 ) )
        }
    }
}

function FreshAjax( config ) {
    this.init( config )
}

FreshAjax.prototype = {
    constructor: FreshAjax,

    init: function( config ) {
        var oldSuccess  = config.success || NOOP,
            oldError    = config.error || NOOP,
            url         = config.url,
            runningAjax = cache[ url ],
            _guid

        this.url = url

        /**
         * 当前 ajax 正在运行
         */
        if ( runningAjax ) {
            _guid = ++runningAjax.uid
        } else {
            /**
             * 这是新的请求
             */
            _guid = 1

            cache[ url ] = {
                uid: _guid,
                abortUID: 0
            }
        }

        config.success = wrapCallback( url, _guid, oldSuccess )
        config.error   = wrapCallback( url, _guid, oldError )

        this.xhr = $.ajax( config )
    },

    /**
     * @TODO 取消当前请求
     */
    abort: function() {
        var freshXHR      = cache[ this.url ]
        freshXHR.abortUID = freshXHR.uid
        hasAbort && this.xhr.abort()
    }
}

exports.ajax = function( config ) {
    return new FreshAjax( config )
}
