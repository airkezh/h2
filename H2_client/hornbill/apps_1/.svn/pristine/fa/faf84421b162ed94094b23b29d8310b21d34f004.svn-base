fml.define('sum/book' , ['component/shareTmp' , 'sum/tab'] , function(require , exports){
	var shareTmp = require('component/shareTmp');
	var tab = require('sum/tab');
	return function(preobj, data, index){
		$('.back').addClass('undo').attr('id','go_items').show();
		var $preobj = $('#' + preobj);
		var a = shareTmp('book', {data : data, index : index});
		$preobj.after(a);
		var $obj = $preobj.next('div');
		var t = window.setTimeout(function(){
			$obj.addClass('load');
	//		var t = window.setTimeout(function(){
				$preobj.hide();
				var t = window.setTimeout(function(){
					$obj.find('.book_body').addClass('load');
					tab('.book_body');
				},600);
	//		},600);
		},10);
	};
});
