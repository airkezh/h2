/*common*/
var $          = require( 'jquery' );
var pcMobWrapper = $( '.pc_to_mob' );
var minLogo = pcMobWrapper.find( '.min_logo' );
var extendMask = pcMobWrapper.find( '.extend_bg' );


minLogo.show();

pcMobWrapper.on( 'click', '.min_logo', function(){
    minLogo.hide();
    extendMask.show();
})
pcMobWrapper.on( 'click', '.close_btn', function(){
    minLogo.show();
    extendMask.hide();
    // $.ajax({
    //     url: '/aj/pc_mob_aj/pc_mob/close',
    //     type: 'GET',
    //     dataType: 'json',
    //     success: function(){}
    // })
})

// $.ajax({
//     url: '/aj/pc_mob_aj/pc_mob/check_show',
//     type: 'GET',
//     dataType: 'json',
//     success: function( data ){
//         if( data.data.status == 0 ){
//             minLogo.show();
//         }else {
//             extendMask.show();
//         }
//     }
// })

// 将原来的左下角图标上移
    if ( $( '.activity_ad11' ).length == 0 ) {
        $( document ).on( 'ad11_ok', function() {
            $( '.activity_ad11' ).css( 'bottom', '152px' );
        } );
    } else {
        $( '.activity_ad11' ).css( 'bottom', '152px' );
    }