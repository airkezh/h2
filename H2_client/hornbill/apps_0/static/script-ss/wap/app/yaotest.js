/*common*/
var signWX = require( 'wx/sign' )
signWX();
wx.ready(function(){
	$('#scanQRCode').on('click',function(){
		wx.scanQRCode({
	      needResult: 1,
	      desc: 'scanQRCode desc',
	      success: function (res) {
	        alert(JSON.stringify(res));
	      }
	    });
	})
});