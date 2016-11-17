/*common*/
require( 'wap/zepto' );
require('wap/zepto/scroll');
require('wap/zepto/fastclick');

var poster = require( 'wap/page/shop/poster' ),
    scroll = require('wap/component/windowScroll'),
    WaterFall = require( 'circle/component/waterfall'),
    optimiseFn = require('circle/component/waterfallOptimise');
var defaultOrder = 'goods_time',
    params = ['goods_time', 'goods_on_shelf', 'sale_num'],
    $goodsWall = $('#goods_wall'),
    $order = $('.order', $('nav')),
    $orderIcon = $('#price_order'),
    $goTop = $('#gotop'),
    UP    = 'price-up',
    DOWN  = 'price-down';

var waterFallInstance = createWaterFall();
$order.on('click', function (){

    $order.removeClass('current');
    $(this).addClass('current');
    var $self = $(this),
        index = $order.index($self),
        tab_type = defaultOrder;
    if(index == 3){
        if( $orderIcon.hasClass(UP) ){
            $orderIcon.removeClass(UP);
            $orderIcon.addClass(DOWN);
            tab_type = 'price_high';
        }else if( $orderIcon.hasClass(DOWN) ){
            $orderIcon.removeClass(DOWN);
            $orderIcon.addClass(UP);  
            tab_type = 'price_lower';      
        }else{
            $orderIcon.addClass(DOWN);
            tab_type = 'price_high';
        }
    }else{
        $orderIcon.hasClass(UP) && $orderIcon.removeClass(UP);
        $orderIcon.hasClass(DOWN) && $orderIcon.removeClass(DOWN);
        tab_type = params[index];
    }
    $goodsWall.empty();
    if(waterFallInstance){
        waterFallInstance.destroy();
        createWaterFall(tab_type);
    }
});

//回到顶部
$goTop.on('click', function (){
    $.scrollTo({
        endY: 0,
        duration: 300
    });
});
function goTop (pos, isDown){
    if(!isDown && pos > 100){
        $goTop.show();
    }else{
        $goTop.hide();
    }
}
scroll.bind(goTop,'gotop');

function createWaterFall(type){
    var waterFallInstance = WaterFall.init({
        el: '#goods_wall',
        url: '/aj/shop/shop',
        tmpl: 'poster_tpl',
        data: {
            frame : 0 ,
            shop_id : fml.vars.shopId,
            _orderby : type,
            limit : 20
        },
        dataFilter : function(data){
            fml.vars.poster_r = data.r || '';
            return data.data.gInfo
        },
        colNum : 2,
        colGap : 0,
        optimiseFn : optimiseFn,
        onFetchSuccess: function(data){
            if(data.length == 0){
                $('.pullUp').attr('status','stop');
                this.lock();
            }
        }
    }).start();
    return waterFallInstance;
}
