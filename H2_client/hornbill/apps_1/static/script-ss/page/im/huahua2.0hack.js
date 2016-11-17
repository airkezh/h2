/*common*/
var $ = require('jquery')
$('body').on('click','a',function(e){
	try{
		var href = $(this).attr('href')
			,target =  $(this).attr('target')
		if(/blank/.test(target)){
			if(href && !(/javascript/.test(href))){
				if(href.substr(0,1)==='/'){
					href = location.protocol+'//'+location.host+href
				} else if(/^http(s)?\:/.test(href)){

				} else {
					href = location.protocol+'//'+location.host+location.pathname+href
				}
				window.external.NewWindow(href)
				e.preventDefault()
			}
		}
	} catch(e){
		console.log(e)
	}
})
