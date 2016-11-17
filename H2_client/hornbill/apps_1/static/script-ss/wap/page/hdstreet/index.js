/*common*/
/* lazy load setting, 采用全屏扫点方式加载 */
var lazy = require('wap/component/lazzyLoad')
    ,scroll = require('wap/component/windowScroll')
    ,nav=$('#nav_wap')
    ,$gotop = $('.gotop')
    ,storage = require('component/iStorage')
    ,hcookie=storage.getCookie('hdpop')
    ,Alert = require('wap/ui/alert');
var lazy_pic = lazy.init({
    'xpath': '.lazy_pic'
});
var alertDiv = function(msg){
    var a = new Alert({
        content : msg
    });
}
lazy_pic.scroll();
//lazyLoad
lazy_pic.load();

scroll.yIn(300,function(){
    nav.addClass('scrollin');
},
function(){
    nav.removeClass('scrollin');
})

$('.nav').on('click',function(){
    if(document.body.scrollTop>0){
       scrolltonav(); 
    }
})
function scrolltonav(){

    document.getElementById('nav_wap').scrollIntoView();
}

/*回顶部*/

$gotop.on("click", function(e) {
    document.body.scrollTop = 0;
});
scroll.yIn(30,function(){
    $gotop.show();
},
function(){
    $gotop.hide();
})






