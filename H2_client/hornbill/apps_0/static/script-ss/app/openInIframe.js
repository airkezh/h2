fml.define('app/openInIframe' , ['jquery'] , function(require , exports){
	var $ = require('jquery')
	//open url in iframe
	return function(o){
		var dom = $(o);
		if(dom.length){
			$('body').append('<iframe id="openFrame" name="openFrame" frameborder="0" height="0" width="0" style="display:none;"></iframe>')
			dom.attr('target', 'openFrame');
		}
	}
});