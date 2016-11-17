/*common*/
var $ = require('wap/zepto')
	,$btn_click = $(".btn_click")
	,Alert = require('wap/ui/alert');
$btn_click.on("click",function(){
    $.ajax({
        type: 'post',
        dataType: 'json',
        url: '../aj/win_coupon',
        success: function( res ) {
        	if(res.status=="1"){
        		window.location.assign("../result/?page="+res.status);
                return;
        	}
        	window.location.assign("../result/");
        },
        error : function(){
        	new Alert({
					content :"接口请求失败"
				})
		}
    });
});