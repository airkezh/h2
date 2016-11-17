/*common*/
return function(parentObj, tag, speed){
	$(parentObj).on('click', tag + '_tab li', function(){
		var $this = $(this)
		$this.addClass('act').siblings().removeClass('act')
		$this.parents(tag + '_tab').parent().find(tag + '_list')
			.stop()
			.animate({'margin-left' : $this.index() * (-100) + '%'}, speed || 300)
	})
}
