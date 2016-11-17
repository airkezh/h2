fml.define('wap/ui/filterSelecter' , [] , function(require , exports){
	return function(selecter){
		var selecter = $(selecter)
			, item
		return selecter.children().filter(function(i){
			item = selecter.children().eq(i)
			if(item.prop('selected'))
				return item
		})
	}
});
