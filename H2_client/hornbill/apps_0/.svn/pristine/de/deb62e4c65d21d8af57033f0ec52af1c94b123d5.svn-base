fml.define('wap/page/activity/a91' , ['wap/zepto','wap/client/component/clientUse','wap/ui/alert','wap/zepto/touch','wap/app/checkLogin'] , function(require , exports){
    var Alert = require('wap/ui/alert')
    var $_this = this;

    //客户端登陆跳转
    if (Meilishuo.config.user_id == 0) {
        $('.cnbtn').on('tap',function(event){
            window.location.href = 'meilishuo://login.meilishuo';
        });
    } 

    $('.cnbtn').on('tap',function(){
        var data = {
                'id': 'downapp_coupon',
                'cid': 879,
                'act_id':2
        }

        $.post('/aj/activity/couponAdd', data, function(res){
           var a =  new Alert({
                content: res.msg
                ,onSure : function(){
                    if(res.data = 1) {
                        window.location.reload(); 
                    }

                }
            });
        } ,'json');

    })

})
