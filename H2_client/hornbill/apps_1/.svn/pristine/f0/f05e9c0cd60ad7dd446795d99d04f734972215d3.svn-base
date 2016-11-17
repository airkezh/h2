/*common*/
var $        = require( 'circle/zepto' ),
    $doc     = $( document )

exports.init = function( callback ) {
    $doc.on( 'post.message.mine', function( e, msg ) {
        callback( [{
            msg_text: msg,
            msg_type: 'text',
            uinfo: fml.vars.userInfo,
            publish_time: ( +new Date ) / 1000
        }], true )
    } )
}
