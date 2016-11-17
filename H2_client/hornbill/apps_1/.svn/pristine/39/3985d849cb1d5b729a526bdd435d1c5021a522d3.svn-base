/*common*/
require( 'm/zepto' )
require( 'm/zepto/touch' )
require( 'm/zepto/ajax' )

var shareTmp = require( 'wap/component/shareTmp' )
    , OpenApp      = require( 'wap/app/openAppCustom' )
    , tagshow      = require( 'wap/page/share/tagshow' )
    , $  = require( 'm/zepto/deferred' )
    , $mask        = $( '.mask' )
    , $content     = $mask.find( '.content' )
    , circleId     = fml.vars.circleId
    , circle       = fml.vars.circle
    , TAP          = 'tap'
    , getMember    = $.ajax( { url: '/aj/circle/get_member_list', data: { circle_id: circleId },
                        type: 'get', dataType: 'json' } )
    , getMsg       = $.ajax( { url: '/aj/circle/get_msg_list', data: { circle_id: circleId },
                            type: 'get', dataType: 'json' } )



/**
* 请求该单品所在圈子的相关数据(头像和消息)
* 需要参数circle_id
*/
$.when(  getMember , getMsg  ).then(function( data1,data2 ) {
    addTagShow( data1[ 0 ], data2[ 0 ])
    tagshow.init(data1[ 0 ],data2[ 0 ])

} )


function addTagShow( users, msgs ) {
    var $circle = $( '.circle' )
    tpl = shareTmp( 'tagshow', { 'users': users, 'msgs': msgs, 'circle': circle } )
    $circle.append( tpl )
}


$( document ).on( TAP, '.js-circle', function() {
    OpenApp.check( function( isInstalled ) {
        if ( isInstalled ) {
            OpenApp.jump( 'meilishuo://circle.meilishuo?json_params=' +
            encodeURIComponent( '{"circle_id": "' +
            fml.vars.circleId + '"}' ) )
        } else {
            $mask.show()
            $content.css( 'margin-top', -$content.height() / 2 )
        }
    } )
} )

$mask.on( TAP, function() {
    $mask.hide()
} )

$content.on( TAP, function( e ) {
    if ( !$( e.target ).is( 'a' ) ) {
        e.stopPropagation()
    }
} )
