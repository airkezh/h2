fml.define('app/openClosed' , ['jquery', 'component/waterfall'] , function(require , exports){
	var pin = require('component/waterfall');
	return function(btn, targe, classname){
		var btn = $(btn)
			, targe = $(targe)
			, info = $(btn).children('.info')
			, classname = classname || 'closed'
			, isOpen = btn.attr('isOpen') - 0 || 0
			, autoPoster = btn.attr('autoPoster') - 0 || 1
			, autoOpen = btn.attr('autoOpen') - 0 || 0

		var open = function(){
			btn.attr('isOpen', '1')
			info.html('收起')
			targe.removeClass(classname)
			if(autoPoster)
				pin.reload(true);
		}
		var close = function(){
			btn.attr('isOpen', '0')
			info.html('展开')
			targe.addClass(classname)
			if(autoPoster)
				pin.reload(true);
		}

		btn.on('click', function(){
			isOpen = btn.attr('isOpen') - 0
			autoPoster = btn.attr('autoPoster') - 0
			if(isOpen) 
				close();
			else
				open();
		})

		if(autoOpen){
			targe.hover(function(){
				isOpen = btn.attr('isOpen') - 0
				autoPoster = btn.attr('autoPoster') - 0
				autoOpen = btn.attr('autoOpen') - 0
				if(!isOpen)
					open();
			},function(){
				isOpen = btn.attr('isOpen') - 0
				autoPoster = btn.attr('autoPoster') - 0
				autoOpen = btn.attr('autoOpen') - 0
				if(isOpen)
					close();
			})
		}
	}
});
