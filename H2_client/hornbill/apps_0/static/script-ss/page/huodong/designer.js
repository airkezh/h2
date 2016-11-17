/*common*/
require( 'app/slider' )

var $           = require( 'jquery' ),
    CheckLogin  = require( 'app/checkLogin' ),
    $body       = $( document.body ),
    $rule       = $body.find( '#rule-panel' ),
    $mask       = $body.find( '#mask' ),
    $tip        = $( '#tip' ),
    $tipContent = $body.find( '.js-sub-content' ),

    VOTED       = 'js-is-voted',
    IS_VOTED    = 'is-voted',
    VOTING      = 'js-is-voting'

$body
    .on( 'click', '.js-rule', function() {
        $rule.show()
        $mask.show()
    } )
    .on( 'click', '.js-close', function() {
        $rule.hide()
        $tip.hide()
        $mask.hide()
    } )
    .on( 'click', '.js-vote', function() {
        if ( !CheckLogin() ) {
            return
        }

        var $el = $( this )

        if ( $el.is( '.' + VOTED ) ) {
            alert( '已经投过票了' )
            return
        }

        if ( $el.is( '.' + VOTING ) ) {
            return
        }

        $el.addClass( VOTING )
        $el.html( '正在投票' )
        vote( $el )
    } )

function vote( $el ) {
    var id          = $el.data( 'vid' ),
        $num        = $el.parent().find( '.js-num' ),
        num         = +$num.html(),
        lotteryCode = $el.data( 'lottery' )

    $num.html( num + 1 )

    $.ajax( {
        type:     'post',
        dataType: 'json',
        url:      '/aw/designer/vote',
        data:     {
            'item_id':    id,
            'project_id': 3,
            'season_id':  2
        }
    } ).done( function( data ) {
        var code = data.error_code

        if ( code == 0 ) {
            $el
                .addClass( VOTED )
                .addClass( IS_VOTED )
            return lottery( lotteryCode )
        } else if ( code == -2 ) {
            alert( '已经投过票了' )
        } else {
            alert( '投票失败' )
        }

        $num.html( num )
    } ).fail( function() {
        alert( '网络异常，请稍后再试' )
        $num.html( num )
    } ).always( function() {
        $el.removeClass( VOTING )
        $el.html( '投票' )
    } )
}

function lottery( lotteryCode ) {
    $.ajax( {
        type:     'post',
        url:      '/aw/designer/award',
        data:     {
            act_code: lotteryCode
        },
        dataType: 'json'
    } ).done( function( data ) {
        data = data.data
        var text

        if ( data.type == 2 ) {
            text = '恭喜您获得' + data.name
        } else {
            text = '今日优惠券已发完'
        }

        $tipContent.html( text )
        $mask.show()
        $tip.show()
    } )
}
