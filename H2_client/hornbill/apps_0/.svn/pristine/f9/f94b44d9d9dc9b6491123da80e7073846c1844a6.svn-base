/*common*/
require('wap/zepto/fastclick')
var $ = require('wap/zepto')
	,Alert = require('wap/ui/alert')


/**
 * 搜索
 */
var oForm = $('#form_search')
var oInput = oForm.children('.ipt')
oForm.on('submit',function(e){
	e.preventDefault();
	var v = $.trim(oInput[0].value)
	if(v){
		window.location.assign('/wx/search?key=' + encodeURIComponent(v) ); 
	}else{
		new Alert({
			content : '请输入搜索关键词'
		})
	}
})