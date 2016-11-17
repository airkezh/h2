/*common*/


var $ = require('wap/zepto');

	
	$('.more').on('click',function(){
		$(this).parent().find('ul').addClass('list-block');
		$(this).hide();
	})