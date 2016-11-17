/*common*/
/**
 * @name: waterfallDataUniquePlugin
 * @desc: 瀑布流数据去重插件
 *
 *  在瀑布流上增加 uniquekey 配置
 *      uniquekey:
 *          String 可以用逗号分割
 *          Array: 包含多个关键字
 *          Object: {
 *              keys:
 *                  String
 *                  Array
 *              type: 'opt' 或者 'default'
 *          }
 *          Function: function( data ) {}
 *
 *          对于自定义函数, 返回 true, 表示数据没有重复, 否则返回 false
 */
var $             = require( 'wap/zepto' ),
    defaultConfig = {
        uniquekey: 'twitter_id'
    },

    /* handler 返回值为 true, 表示数据没有重复, 否则为重复数据 */
    Handler       = {
        default: function( data, cache ) {
            var key = this.keys.map( function( k ) {
                return data[ k ]
            } ).join( '-' )

            //找不到 key 的情况, 默认不重复
            if ( !key ) {
                return true
            }

            if ( cache[ key ] ) {
                return false
            } else {
                return cache[ key ] = 1
            }
        },

        /*
         目前的策略:
         keys 中的值哪个存在就用哪个
         */
        opt: function( data, cache ) {
            var key = this.keys.filter( function( k ) {
                return data[ k ]
            } )

            if ( key.length ) {
                this.keys = [ key[ 0 ] ]
            } else {
                //all data will be passed
                return this.handler = NOOP
            }

            this.handler = Handler.default
            return this.handler( data, cache )
        }
    },

    NOOP          = function() {
        return true
    },

    NULL          = null,

    rblank        = /\s*/g

function parseUniqueKey( key, obj ) {
    if ( !key ) {
        throw Error( 'Must provide a uniquekey.' )
    }

    var keyObj = obj,
        keys

    switch ( typeof key ) {
        case 'string':
            keys = key.replace( rblank, '' ).split( ',' )

            if ( keyObj ) {
                keyObj.keys = keys
                return keyObj
            } else {
                return {
                    keys:    keys,
                    handler: Handler.default
                }
            }

        case 'function':
            return {
                keys:    NULL,
                handler: key
            }

        case 'object':
            if ( Array.isArray( key ) ) {
                return parseUniqueKey( key.join( ',' ) )
            } else {
                keyObj = {
                    handler: Handler[ key.type ] || Handler.default
                }
                return parseUniqueKey( key.keys, keyObj )
            }
    }
}

function WaterfallDataUnique( key ) {
    this.cache  = {}
    this.keyObj = parseUniqueKey( key )
}

WaterfallDataUnique.prototype = {
    constructor: WaterfallDataUnique,

    unique: function( data ) {
        var cache   = this.cache,
            keyObj  = this.keyObj,
            newData = [],
            len     = data.length,
            i       = 0,
            v

        if ( len ) {
            for ( ; i < len; i++ ) {
                v = data[ i ]

                if ( keyObj.handler( v, cache ) ) {
                    newData.push( v )
                }
            }
        }

        return newData
    },

    destroy: function() {
        this.cache = {}
    }
}

function init( instance ) {
    var config        = instance._config,
        oldDataFilter = config.dataFilter,
        preFilter     = new WaterfallDataUnique( config.uniquekey )

    config.dataFilter = function( data ) {
        return preFilter.unique( oldDataFilter.call( this, data ) )
    }
}

exports.init = function( instance ) {
    instance._config = $.extend( {}, defaultConfig, instance._config )
    return init( instance )
}
