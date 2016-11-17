fml.define('wap/app/forminput' , ['wap/zepto/touch'] , function(require,exports){

	var init = function(input_ids){
		if(!input_ids.length) return;
		for(var i=0; i<input_ids.length; i++){
			bindEvt($('#' + input_ids[i]));
		}
	};

	var bindEvt = function($input){
		if(!$input) return;

		var $clear = $input.parent('div').find('.clear');
		$input.bind('input propertychange',function(){
			if($input.val() != '')
				$clear.show()
			else
				$clear.hide()
		});

		$clear.on('tap', function(){
			$input.val('');
			$clear.hide();
		});
	};

	exports.init = init;
});