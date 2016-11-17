/*common*/
var goWXAddress = require('wap/app/wx/goWXAddress')

var $addrArea = $('.receiver_info')
	$addrArea
		.on('touchstart touchend', function(event){
			event.preventDefault();
		})
		.on('tap', function(){
			goWXAddress(setAddress)
		});