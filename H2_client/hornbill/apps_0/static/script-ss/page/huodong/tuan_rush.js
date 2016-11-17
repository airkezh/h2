/*common*/
var banner = require('app/focus_banner'),
    scroll = require('component/windowScroll');
var rightMenu = require('page/huodong/promotion/rightNav');

//posterWalls
fml.use(['jquery', 'app/posterWalls', 'component/shareTmp','component/waterfall', 'component/urlHandle'], function() {
    var shareTmp = this.shareTmp;
    var pin = this.waterfall;
    var query = this.urlHandle.getParams(window.location.href.toString());
    var urlData = {
        'frame': query.frame || 1,
        'page': query.page || 0,
        'event_id': fml.vars.event_id,
        'frame_size': 30
    };
    pin.init({
        offset: {
            x: 0,
            y: 6
        }
    });
    var opts = this.jquery.extend({}, urlData, query);
    this.posterWalls(opts, '/aj/tuan_aj/tuan/rushlist',{
        'Infinite': 1
    });
});


//nav
    var menuBox = $('#rush_nav'),
        menuBoxHeight = menuBox.height(),
        goods_wall_box=$('.goods_wall_box'),
        navHeight = $('#nav').height(),
        y = menuBox.offset().top - navHeight;
    scroll.yIn(y, function() {
        menuBox.addClass('m_ca_fixed');
        goods_wall_box.css('margin-top', (menuBoxHeight + 10) + 'px');
        menuBox.addClass('shadow');
    }, function() {
        menuBox.removeClass('m_ca_fixed');
        goods_wall_box.css('margin-top', '0');
        menuBox.removeClass('shadow');
    })

//右侧导航大促
if(fml.vars.isShow){
    rightMenu.rNav('/aj/sale/right_nav?actid=415');
    $(window).scroll(function(event) {
        var scoll = $(document).scrollTop()
        if (scoll > 180) {
            $('.nav_right').show()
        }else{
            $('.nav_right').hide()
        }
    })
}

// $('.go_top').bind("click" , function(){
//    $('body,html').stop(true , true).animate({ scrollTop: 0 }, 250);
//    return false;
// });

$(".go_top").on("click",function(){
    $(window).scrollTop(0);
});