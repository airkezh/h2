/*common*/
var $ = require('wap/zepto');
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var dialog=require('wap/app/dialog');
var lazy = require('wap/component/lazzyLoad');
var Waterfall = require('wap/component/g-waterfall');
var scroll = require('wap/component/windowScroll');


// var lazyer = lazy.init({'xpath' : '.lazy_pic'});
// lazyer.scroll();
/*纯下拉加载瀑布流*/
var $pullUp = $('.pullUp')	
    , pageNum = 1;

var requestData = function(next){ 
     $.get('/aj/new_user/poster',{ 'frame' : pageNum , 'id' : fml.vars.vip_id },function(ret){
        if(!ret.error_code){
            $('.goods_wall').append(shareTmp('posterWall', ret));
            // lazyer.load()
            pageNum++;

            if( pageNum >= ret.data.frame_count + 1){ 
                $pullUp.remove();
            }else{
            	
            	next()
 
            }

        }
    },'json'); 


};
var wfIns = new Waterfall();
wfIns.on('requestDataStart',function(){
    requestData(function(){
        wfIns.emit('requestDataEnd');
    });
});

/*弹窗*/
$('.ac_rule').on('click' , function(){
	var tpl = shareTmp('rule' , {'rule_pic' : fml.vars.rule_pic});
	$.fn.dialog({dialogContent : tpl , dialogTitle : ''});
});

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