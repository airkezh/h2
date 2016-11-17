/*common*/
var $ = require('jquery');

var login = require('app/checkLogin');



var $codeInput = $('.code')
	, $submitBtn = $(submit)
	, $s1 = $('.step1')
    , $s2 = $('.step2')
	, url = '/aj/huodong/exchange_coupon';

$codeInput.on('focus' , function(){
    if(!login()) return false;
    if($(this).val() == '输入兑换码'){
        $(this).val('');
    }   
});
$codeInput.on('blur' , function(){
    if($(this).val() == ''){
        $(this).val('输入兑换码');   
    }
});
$submitBtn.on('click' , function(){  
	var data = { 'code' : $codeInput.val() };
	$.get(url, data, submitCbk, 'json');
});

function submitCbk(res){
	if(res.ret == 0){	
		var $threshold = $('.threshold'),
            $price     = $('.price'),
            $declare   = $s2.find('.declare'),
            $time      = $s2.find('.time'),
            data       = res.couponinfo;

        $threshold.text(data.coupon);
        $price.text(data.price);
        $declare.text(data.text);
        $time.text(data.time);           

        $s1.hide();
        $s2.show();   
	}else{
        var $msg = $('.msg');
        $msg.html(res.message);		
	}
}







