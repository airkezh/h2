fml.define('wap/page/activity/fcoup', ['wap/ui/alert','wap/zepto/touch'], function (require, exports) {
	require('wap/zepto/touch');  
    var a = require('wap/ui/alert');

   //登陆成功后的回掉函数
    window.MLS = {
        didLogin : function() {
            // 成功登录，跳转到下一步
            window.location.reload();
        }
    };

	$(".coup").on("tap",function(){
		if(!isLogin){
            window.location.href = "meilishuo://login.meilishuo/";
            return;
        }
        var _this = $(this);

        var cType = _this.attr("type");
        var cCode = _this.attr("code");

        $.ajax({
            url : "/aw/sale/fCoupon",
            data:{
                'type': cType,
                'code' : cCode
            },
            type : "get",
            dataType : "json",
            timeout : 5000,
            success : function(data) {
                //alert(JSON.stringify(data));
                if (data.success == 1) { //领取成功
                    var picUrl = "http://i.meilishuo.net/css/images/wap/fcoupons/recv.png";
                    $(".coup img").attr("src", picUrl);
                    //剩余券数减1
                    var la = _this.parent().find(".couptext span");
                    la.text(+la.text() - 1);
                } else { //没抢到
                    var alt = new a({
                        content : data.tips,
                        onSure : function () {
                            return;
                        }
                    });
                }
            },
            complete : function(xhr, status) {
                if (status == "timeout") {
                    alert("请求超时！");
                } else if (status == "error") {
                    alert("请求出错:" + xhr.responseText);
                }
            }
        });
	})
  
});
