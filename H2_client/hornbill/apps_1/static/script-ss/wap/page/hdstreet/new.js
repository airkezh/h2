/*common*/
var $ = require('wap/zepto');
var scroll = require('wap/component/windowScroll');
var lazy = require('wap/component/lazzyLoad')
var shareTmp = require('wap/component/shareTmp');
var Waterfall = require('wap/component/g-waterfall');

/*纯下拉加载瀑布流*/
/*var $pullUp = $('.pullUp')
	, total = 0
    , pageNum = 2;

var requestData = function(next){
    if(pageNum <= fml.vars.total){
         $.get('/aj/clearance/poster',{frame:pageNum},function(ret){
            if(!ret.err_code){
                $('.goods_wall').append(shareTmp('posterWall', ret));

                next();

                pageNum ++; 
                total ++; 
                if( total >= fml.vars.total - 1){ 
                    $pullUp.remove();
                }
            }
        },'json');
    }   
    
};
var wfIns = new Waterfall({firstRequest:0});
wfIns.on('requestDataStart',function(){
    requestData(function(){
        wfIns.emit('requestDataEnd');
    });
});*/

/* lazy load采用全屏扫点方式加载 */
// var lazy_pic = lazy.init({'xpath' : '.lazy_pic'});
// lazy_pic.scroll();
// lazy_pic.load();
//lazy.load($('.lazy_pic'), 'asrc')
/* lazy load setting, 采用全屏扫点方式加载 */
var lazy_pic = lazy.init({'xpath' : '.lazy_pic'})
lazy_pic.scroll();
lazy_pic.load();
/*回顶部*/
var gotop = $('.gotop');
gotop.on("click", function(e) {
    document.body.scrollTop = 0;
});
scroll.yIn(30,function(){
    gotop.show();
},function(){
    gotop.hide();
});

