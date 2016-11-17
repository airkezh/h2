/*common*/
var $ = require('jquery')
var success_code = $('#success').val()
if(success_code==0){
	setTimeout(function(){
		location.href = '/coupon/'
	}, 5000)
} else if(success_code==2){
	$.post('/aj/cache/register_redirect_cache', {
		redirect_url : location.href.substr(location.href.indexOf(location.pathname))
	}, function(data, textStatus, xhr) {
		setTimeout(function(){
			location.href = '/user/login'
		}, 2000)
	},'json');
}
