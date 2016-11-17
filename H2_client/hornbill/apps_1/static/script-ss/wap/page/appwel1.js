/*common*/
var touch = require('wap/zepto/touch')

window.MLS = {
	onSigninEncry : function(obj){
		alert(obj.encryString)
		$('.showData').html(obj.encryString);
 
		var ua = navigator.userAgent
		, Android = /(Android)/i.test(ua)
		, iphone = /(iPhone|iPad|iPod|iOS)/i.test(ua)

		data = {
			'code': $('.showData').html(),
			'platform': Android ? 'Android' : 'iphone'
		}
		$.get('/aj/appTest/appWelcome',data,function(data){
			alert(data)
			$('.getData').html(data)
		},'json');
	}
}
