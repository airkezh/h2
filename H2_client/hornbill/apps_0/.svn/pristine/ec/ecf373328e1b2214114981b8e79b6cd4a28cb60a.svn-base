/*common*/

require( 'circle/zepto/touch' )

var $           = require( 'circle/zepto' ),
    Fix         = require( 'circle/component/fixFixed' ),
    $doc        = $( document ),
    circleID    = fml.vars.circle_id,
    rblank      = /^\s*$/

function send() {
    var $content = this.$content,
        text     = $content.text()

    $content.html( '' )

    if ( !rblank.test( text ) ) {
        $.ajax( {
            url: '/aw/circle/richmsg',
            type: 'POST',
            dataType: 'json',
            data: {
                circle_id: circleID,
                text: text,
                type: 'text',
                multimedia: ''
            },
            success: function( data ) {
                /**
                 * 发送成功后，将消息 id 保存，用于接下来轮询数据的时候做过滤
                 * 否则自己发送的消息会显示两遍
                 */
                if ( data.error_code == 0 ) {
                    $doc.triggerHandler( 'message.id', [ data.data.id ] )
                }
            }
        } )
        /* @TODO message Type */
        $doc.triggerHandler( 'post.message.mine', [ text ] )
    }

    setTimeout( function() {
        $content.blur()
    }, 0 )
}

function Input( el ) {
    var $el

    this.$el = $el = $( el )
    this.$content = $el.find( '.js-content' )
    this.$btn     = $el.find( '.js-send-btn' )

    Fix.fix( 'fixfixed', this.$content )
    this.bindEvent()
}

Input.prototype = {
    bindEvent: function() {
        var $content = this.$content

        $content.on( 'focus', function() {
            $doc.triggerHandler( 'message.scrolldown' )
        } )

        $doc.on( 'losefocus', function() {
            $content.blur()
        } )

        this.$btn.on( 'tap', $.proxy( send, this ) )
    }
}

exports.init = function( el ) {
    return new Input( el )
}
