/*common*/
return function(fn){
	var tabStatus = 0	

	$(window).on('keydown', function(event){
	//	console.log(event.keyCode)
		if(fml.vars.im.noKeyControlTab)
			return;

		if(event.keyCode == 17)
			tabStatus = 1
	}).on('keyup', function(event){
		if(fml.vars.im.noKeyControlTab)
			return;

		if(event.keyCode == 17)
			tabStatus = 0
		else if(event.keyCode == 9 && tabStatus == 1)
			fn()
	})

}
