/*common*/
var $ = require('jquery')
$('body').on('click', 'a[target=_blank]', function(event) {
	if(navigator.userAgent.toLowerCase().indexOf('macintosh') < 0){
		event.preventDefault();
		var href = $.trim($(this).attr('href'));

		if(href && !(/javascript/.test(href))){
			if(href.substr(0,1)==='/'){
				href = location.protocol+'//'+location.host+href
			} else if(/^http(s)?\:/.test(href)){

			} else {
				href = location.protocol+'//'+location.host+location.pathname+href
			}

			if(window.c_defaultBrowser){
				window.c_defaultBrowser(href)
			} else {
				console.log('window has no method: c_defaultBrowser')
			}
		}
	}

}).on('click','a[target=_img]', function(event){
	event.preventDefault();
	var href = $.trim($(this).attr('href'));
	
	if(href && !(/javascript/.test(href))){
		if(href.substr(0,1)==='/'){
			href = location.protocol+'//'+location.host+href
		} else if(/^http(s)?\:/.test(href)){

		} else {
			href = location.protocol+'//'+location.host+location.pathname+href
	}

	if(window.c_defaultBrowser){
			window.c_defaultBrowser(href)
		} else {
			console.log('window has no method: c_defaultBrowser')
		}

	}

	/*event.preventDefault();
	event.stopPropagation();
	var href = $.trim($(this).attr('href'));
	if(window.c_imgPreview){
		window.c_imgPreview(href);

	}else{
		console.log('window has no method: c_imgPreview');
	}*/
})
