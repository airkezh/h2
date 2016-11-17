fml.define('page/huodong/yuemuzhiyuan' , ['jquery'] , function(require, exports){
	$ = require('jquery');
	
	var $items = $('.ymzy-item')
		, $item = $items.children('.item')
		, $infos = $items.children('.info')
		, $closed = $infos.children('.closed')
		, $more = $infos.children('.more')
		, item

	$item.on('click', function(){
		$infos.hide()
		item = $(this)
		item.next('.info').show()		
	})

	$closed.on('click', function(){
		item.next('.info').hide()		
	})

	$more.on('click', function(){
		$(this).hide().parent().find('.hideintro').show()		
	})

});

