/*common*/
var shareTmp = require('wap/component/shareTmp');
var touch=require('wap/zepto/touch');
var dialog=require('wap/app/dialog');

if (Meilishuo.config.user_id == 0) {
        $('.like').on('click',function(event){
            window.location.href = 'meilishuo://login.meilishuo';
        });
} 
$('.like').on('click', function(){
    var likebtn=$(this);
    var url1='/aj/activity/df_like';
    var data={'style': likebtn.attr('data-status')};
    $.post(url1, data,function(res){
        if(!res) return;
        likebtn.unbind('click').removeClass('like').addClass('liked');
    }, 'json');
    var url = '/aj/activity/df_cj';
    $.post(url,function(res){
        if(!res) return;
        if(fml.vars.is_lottery==0){
            var tpl = shareTmp('toupdate',{'coupon_code':res.data});
            $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
            $('.closeDialog').on('tap',function(){
                $('.closeDialog').trigger('tap');
                window.location.reload();
            });
        }
    }, 'json');
    
});


