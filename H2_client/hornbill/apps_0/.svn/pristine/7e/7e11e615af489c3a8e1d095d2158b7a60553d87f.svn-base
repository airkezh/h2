fml.define('app/showMedal' , ['jquery' , 'component/tips' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');
	var tips = require('component/tips');
	var shareTmp = require('component/shareTmp');
	return function(){
		tips('.medal' , '.showMedal' , '.pop_loading' , function(obj , t){
			var objId = obj.next().attr('id');
			var tpl = shareTmp(objId);
			$('.pop_loading').html(tpl);
			$('.corner_t,.corner_b').hide();
			$('.corner'+t).show();
		});  
	}
});
