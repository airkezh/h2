/*common*/	
require('wap/zepto/fastclick')

var reback_timer = false	
	, mobile_value = $('#mobile').val()
	, error_message = $('.error_message')

var timeDown = function(times, cbk) {
	if (!times) {
		return;
	} else if(reback_timer){
		cbk(0);
		reback_timer = false;
	} else {
		times--;
		cbk(times);
		win_timer = setTimeout(function(){
			timeDown(times, cbk);
		},1000)
	}
};

var checkCode = function(){
	var time = 10
		, timeDownValue = $('#timeDown')

	var start = function() {
		timeDown(time, function(times) {
			if (!times) {
				reback_timer = false;
				timeDownValue.removeAttr("disabled");
				timeDownValue.html("重新发送");
			} else {
				timeDownValue.attr("disabled", "disabled");
				timeDownValue.html( times + 'S 后重发' );
			}
		});
	}

 	start();

}

var checkCodeForm = $('#sendCodeForm').hasClass('sendCodeForm')

if(checkCodeForm) {
	checkCode()
}

$('#timeDown').on('click', function(){
	checkCode()
})

$('.getCode').on('click', function(){
	if(!mobile_value) {
		error_message.html('请输入手机号').show()
	}	
})

