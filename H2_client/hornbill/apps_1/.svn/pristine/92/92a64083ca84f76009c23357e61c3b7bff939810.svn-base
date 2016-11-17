/*common*/
return function($item, $parent){
	var scrollTop = $parent.height() + 10

	if($item.outerHeight){
		scrollTop += $item.outerHeight()
		$parent.parent().scrollTop(scrollTop)

	}else{
		scrollTop += $item.height()	
		$(window).scrollTop(scrollTop)
	}
}
