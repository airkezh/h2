/*common*/
var intoView = require('app/im/intoView')
var info = function($box, info, className){
	className = className || 'sys_info'
	var $dialog = $box.find('.im_dialog')
	var $tmp = $('<div />', {
				'class' : 'im_dialog_info'	
			})
			.html('<span class="'+className+'">'+info+'</span>')

	$tmp.appendTo($dialog)
	intoView($tmp, $dialog)
}

exports.info = info
