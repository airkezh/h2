/*common*/
var $ = require('wap/zepto');
var QRCode = require('component/qrcode');

var screenWidth = $(window).width();
var qrcodeWidth = $('#qrcode_c').width();

$('#qrcode_c').height(qrcodeWidth);

$('.submit').on('click',function(){
	$('#qrcode_c').html('');
	if($('.text').val()){
		var thisURL = $('.text').val();
		if($('#qrcode_c')){
			var qrcode = new QRCode(qrcode_c, {  
		        width : qrcodeWidth,  
		        height : qrcodeWidth  
		    });  
  			qrcode.makeCode(thisURL);  
		}
	}else{
		alert("Please enter a web site!");
	}
});