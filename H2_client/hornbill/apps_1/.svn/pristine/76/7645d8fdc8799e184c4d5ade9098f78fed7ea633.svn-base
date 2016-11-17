fml.define("wap/page/sq/coupon_zone", ['wap/ui/alert', 'wap/zepto'], function (require, exports) {
    var a = require('wap/ui/alert');

    $(".coupon_btn img").on("click", function() {
        // if ($(this).attr("src").indexOf("/go_mall.png") > 0){
        //     window.location.href = 'http://open.show.qq.com/cgi-bin/login_state_auth_redirect?appid=210915&redirect_uri=http%3A%2F%2Fmobapi.meilishuo.com%2F2.0%2Fqq%2Fauth%3Fredirect%3Dhttp%253A%252F%252Fm.meilishuo.com%252Fsq%253ffrom%253dqqpush&_wv=1027'
        // }
        if ($(this).attr("src").indexOf("/get.png") < 0) return;
		if(!isLogin){
            return;
        }
		var _this = $(this);
        var cType = _this.attr("type");
        var cCode = _this.attr("code");

        $.ajax({
            url : "/aj/sq/sq_coupon",
            data:{
                'type': cType,
                'code' : cCode
            },
            type : "get",
            dataType : "json",
            timeout : 5000,
            success : function(data) {
                if (data.success == 1) { //领取成功
                    var picUrl = "http://i.meilishuo.net/css/images/wap/sq_coupon_qq/already_get.png";
                    _this.attr("src", picUrl);
                } else { //没抢到
                    var alt = new a({
                        content : data.tips,
                        onSure : function () {
                            var picUrl = "http://i.meilishuo.net/css/images/wap/sq_coupon_qq/none.png";
                            _this.attr("src", picUrl);
                            return;
                        }
                    });
                }
            },
            complete : function(xhr, status) {
                if (status == "timeout") {
                    alert("请求超时！");
                } else if (status == "error") {
                    alert("请求出错");
                }
            }
        });
    });
});
