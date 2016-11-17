/*common*/
var $      = require( 'wap/zepto' ),
    upload = require( 'wap/page/circle/upload' ),

    win         = window,
    $form       = $( '.circle-form' ),
    $btn        = $( '#submit' ),
    $fields     = $form.find( '.item .js-ipt' ),
    $required   = $form.find( '.js-required' ),
    $bg         = $( '#background' ),

    CREATED    = 'created',
    DISABLED   = 'disabled'

if ( !win.MLS ) {
    win.MLS = {}
}

win.MLS.didLogin = function() {
    location.reload()
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
    upload.bindUpload( $form.find( '.js-upload-btn' ), function( data ) {
        //TODO FIX
        $bg.val( ( data.pictures ? data.pictures[ 0 ] : data ).o_pic_url )
        checkRequired()
    } )

    $form.on( 'focus, blur, input', '.js-ipt', function() {
        checkRequired()
    } )

    $required.on( 'change', checkRequired )

    $btn.on( 'click', function() {
        var $el  = $( this ),
            data = getData()

        if ( !$el.hasClass( CREATED ) && !$el.hasClass( DISABLED ) ) {
            $.ajax({
                type: 'POST',
                dataType: 'json',
                url: '/aw/circle_create/',
                data: data,
                success: function( resp ) {
                    if ( resp.error_code != 0 ) {
                        alert( resp.message )
                    } else {
                        win.location.href = '/circle/create_shop'
                    }
                }
            })
        }
    });

    checkRequired()
}())
