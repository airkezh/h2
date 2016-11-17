/*common*/
var $ = require( 'wap/zepto' ),
    upload = require( 'wap/page/circle/upload' ),

    win = window,

    $form     = $( '#shop-form' ),
    $btn      = $( '#submit' ),
    $fields   = $form.find( '.js-ipt' ),
    $required = $form.find( '.js-required' ),
    $picArea  = $( '#upload-area' ),
    $photo    = $( '#cards_photo' ),

    CREATED    = 'created',
    DISABLED   = 'disabled'

function postData() {
    var $el  = $( this )

    if ( !$el.hasClass( CREATED ) && !$el.hasClass( DISABLED ) ) {
        $btn.off( 'click' )
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/aw/shop_create/',
            data:  getData(),
            success: function( resp ) {
                var url
                if ( resp.error_code != 0 ) {
                    alert( resp.message )
                    $btn.on( 'click', postData )
                } else {
                    alert( '创建店铺成功！' )
                    url = '{"url":"meilishuo://circle.meilishuo/?json_params=' +
                        encodeURIComponent( '{"circle_id":"' +
                        fml.vars.circle_id + '"}' ) + '"}'

                    win.location.href = 'meilishuo://close_and_open.meilishuo?json_params=' + encodeURIComponent( url )
                }
            }
        })
    }
}

function getData() {
    var data = {}

    $fields.each(function() {
        data[ this.id ] = this.value
    })

    return data
}

function checkRequired() {
    var isOK = true

    $required.each( function( i, v ) {
        if ( !v.value ) {
            return isOK = false
        }
    })

    $btn[ ( isOK ? 'remove' : 'add' ) +  'Class' ]( DISABLED )
}

;(function() {
    $form.on( 'focus, blur, input', '.js-ipt', function() {
        checkRequired()
    })

    $btn.on( 'click', postData )

    upload.bindUpload( $form.find( '.js-upload-btn' ), function( data ) {
        //TODO FIX
        var url = ( data.pictures ? data.pictures[ 0 ] : data ).o_pic_url
        $picArea.addClass( 'uploaded' ).css( 'background-image', 'url(' + url + ')' )
        $photo.val( url )
        checkRequired()
    } )

    checkRequired()
}())
