/*common*/

var $            = require( 'wap/zepto/touch' ),
    CallAPI      = require( 'wap/component/callApi' ),
    $doc         = $( document ),
    isRequesting = false,
    $btn         = $( '#payment' ),
    vars         = fml.vars,
    Alert        = require('wap/ui/alert')

var alertCon = function(msg){
    var a = new Alert({
        content : msg
    });
}
$btn.on( 'tap', function() {
    if ( isRequesting ) {
        return
    }

    isRequesting = true

    CallAPI.write( {
        url: '/wx/add_weixin_income'
    }, {
        'twitter_id': vars.twitterID,
        'sku_id': vars.skuID,
        'price': vars.price,
        'total_price': vars.total_price,
        'goods_id': vars.goods_id
    }, function( res ) {
        if (res.code != 0) {
            alertCon(res.msg);
        }else{
            var data = res.form
                , order_id = res.order_id

            WeixinJSBridge.invoke('getBrandWCPayRequest',data, function(res){
                var url = ''
                if(res.err_msg != "get_brand_wcpay_request:ok"){
                    url = '/wx/fail/?order_id=' + order_id
                } else {
                    url = '/wx/circlePaymentSuccess/' + order_id
                }

                window.location.href = url
            });
        }
        isRequesting = false
    } )
} )
