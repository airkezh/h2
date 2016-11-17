/*common*/
return function(parent, targe){
	var messageStatus = 0	
		, $parent = parent ? $(parent) : $(window)
		, targe = targe ? targe : 'form textarea' 
	

	$parent
		.on('keydown', targe, function(event){
			if(event.keyCode == 17)
				messageStatus = 3
			else if(event.keyCode == 16)
				messageStatus = 1
			else if(event.keyCode == 229)
				messageStatus = 2
			else if(event.keyCode == 13 && messageStatus == 0){
				$(this).parents('form').submit()
				return false
			}
		})
		.on('keyup', targe, function(event){
			if(event.keyCode == 17 || event.keyCode == 16 || ((event.keyCode == 13 || event.keyCode == 32) && messageStatus == 2))
				messageStatus = 0
		})
}
