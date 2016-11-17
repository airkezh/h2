/*common*/
/**
 * @name: 转换 app 和 wap 中的链接
 * @note:
 *      默认不提供 r 参数，需要自己手动传入
 */
var environment = Meilishuo.config.os.mlsApp ? 'app' : 'wap',
    rholder     = /{([^}]+)}/g,
    rcurls      = /{|}/g,
    linkConfig  = {
        goods: {
            wap: '//m.meilishuo.com/share/item/{twitter_id}?r={r}',
            app: 'twitter_single'
        },

        circle: {
            wap: '//circle.meilishuo.com/circle/chat?circle_id={circle_id}&r={r}',
            app: 'circle'
        },

        textpic: {
            wap: '//circle.meilishuo.com/circle/textpic/{msg_id}?r={r}',
            app: 'rich_message'
        },

        miscpic: {
            wap: '//m.meilishuo.com/mainapp/detail/{msg_id}?r={r}',
            app: 'rich_message'
        }
    };

function convertLink( protocal, params ) {
    var config = linkConfig[ protocal ][ environment ],
        url    = ''

    if ( environment == 'wap' ) {
        config.match( rholder ).forEach( function( str ) {
            url += config.replace( str, params[ str.replace( rcurls, '' ) ] )
        } )

        return url
    } else {
        return 'meilishuo://' + config +
            '.meilishuo?json_params=' +
            encodeURIComponent( JSON.stringify( params ) )
    }
}

exports.convert = convertLink
