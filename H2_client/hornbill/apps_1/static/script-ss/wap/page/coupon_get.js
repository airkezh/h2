/*common*/
require('wap/zepto/touch');
var success_code = $('#success').val()
if(success_code==2){
	$.post('/aj/cache/register_redirect_cache', {
		redirect_url : location.href.substr(location.href.indexOf(location.pathname))
	}, function(data, textStatus, xhr) {
		setTimeout(function(){
			if(fml.vars.inApp){
				window.MLS = {
					didLogin : function() {
						window.location.reload()
					}
				}
				window.location.href = "meilishuo://login.meilishuo/"
			} else {
				location.href = '/user/login'
			}
		}, 300)
	},'json');
}
$('.js_go_back').on('touchstart touchend', function(event){
	event.preventDefault();
}).on('tap', function(){
	window.history.back();
});
