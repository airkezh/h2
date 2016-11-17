/*common*/
var $ = require('wap/zepto');
require('wap/zepto/fastclick');
var shareTmp = require('wap/component/shareTmp');
var dialog=require('wap/app/dialog');
// var lazy = require('wap/component/lazzyLoad');
var Waterfall = require('wap/component/g-waterfall');
var scroll = require('wap/component/windowScroll');
var tracking = require('wap/app/tracking');
var Alert = require("wap/ui/alert");
var alert_con = function(msg) {
    return new Alert({
        content: msg       
    }); 
};
// 登录状态注册
window.MLS = {
    didLogin: function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};
function getAppLink(tid){
    if(!Meilishuo.config.os.mlsApp ? true : false ){
        return '/share/item/'+tid;
    } else {
        return 'meilishuo://twitter_single.meilishuo?json_params='+encodeURIComponent(JSON.stringify({"twitter_info" : {"twitter_id":tid, "is_doota":1}, "r": Meilishuo.config.r }));
    }
} 

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
            get_coupon();
        }
    },'json'); 
};
var wfIns = new Waterfall();
wfIns.on('requestDataStart',function(){
    requestData(function(){
        wfIns.emit('requestDataEnd');
    });
});

/*优惠券*/
var get_coupon = function(){
    var goods_box = $('.goods_box');
    goods_box.on('click' , function(){
        tracking.cr('june_coupon_click');

        var tid = $(this).attr('tid');
        if(Meilishuo.config.user_id == 0){
            window.location.href = 'meilishuo://login.meilishuo';
        }else{
            $.get('/aj/getCoupons/june_coupon' , {'device_code' : fml.vars.device_code } , function(res){
                // if(res.code == 0){
                    window.location.href = getAppLink(tid);
                // }else{
                //     alert_con(res.message);
                // }
            } , 'json');
        }
        
    });
}


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