fml.define('wap/page/sq/global' , ['wap/app/gotop', 'wap/page/sq/share'], function(require , exports){
	var gotop = require('wap/app/gotop')

	window.setTimeout(function(){
		gotop.gotop(true);
	},100);

	/**
	 * 搜索功能
	 * by qindai
	 */
	var oForm = $('#form_search')
	var oInput = oForm.children('.ipt')

	oForm.on('submit',function(e){
		e.preventDefault();
		var v = $.trim(oInput[0].value)
		if(v){
			window.location.assign('/sq/search?key=' + encodeURIComponent(v) ); 
		}else{
			new Alert({
				content : '请输入搜索关键词'
			})
		}
	})
	oInput.on('focus',function(){
		oForm.find('.a-line').hide();
		oForm.find('.search-close').show();
	}).on('blur', function(){
		oForm.find('.a-line').show();
		oForm.find('.search-close').hide();
	});
});
