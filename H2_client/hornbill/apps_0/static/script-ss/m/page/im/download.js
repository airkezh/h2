/*common*/
require('m/zepto/touch');

var ua = navigator.userAgent;
var os = this.os = {},
	android = ua.match(/(Android)\s+([\d.]+)/),
	ipad = ua.match(/(iPad).*OS\s([\d_]+)/),
	iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);

if (android) os.android = true, os.version = android[2]
if (iphone) os.ios = os.iphone = true, os.version = iphone[2].replace(/_/g, '.')
if (ipad) os.ios = os.ipad = true, os.version = ipad[2].replace(/_/g, '.')

//if(iphone) $('.iphone').css('display','block')
if(android) $('.android').css('display','block')

$('.iphone, .android').on('touchstart', function(e){
	if( (os.android && $(this).hasClass('iphone')) || (os.ios && $(this).hasClass('android'))) {
		e.preventDefault();
		return false;
	}
});
$('.iphone, .android').on('tap', function(){
	if(os.android){
		$('.mask_android').show();
	}
	if(navigator.userAgent.indexOf(' MicroMessenger/') > 0){
		$('.mask').show();
		if(os.ios){
			$('.mask_ios').show();
		}
		return false;
	} else if(navigator.userAgent.indexOf(' QQ/') > 0 && os.ios){
		$('.mask').show();
		$('.mask_ios').show();
		return false;
	}
});
