/*common*/
require('m/zepto')

function wxcall(params){
	$.ajax({
		url: '/aj/wx/wxcall'
		, data:params
		, dataType: 'json'
		, type: 'post'
		, success : function(data){
			window.location.href = data.jumpUrl
		}
	})
}

return wxcall;
