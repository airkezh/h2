fml.define('component/ajax',['jquery'] , function(require , exports){
	var $ = require('jquery')
	

	function _ap(method){
		return function(url , data , onSuccess , onFail){
			if ('function' == typeof data){
				onSuccess = data
				data = {}
			}		

			$.ajax({
			  type: method,
			  url: url,
			  dataType: "json",
			  data: data,
			  success: onSuccess,
			  error: function (xhr,  thrownError) {
				onFail && onFail(xhr.status , xhr.responseText , thrownError)
				exports.callOnErr && exports.callOnErr(xhr.status , xhr.responseText , thrownError);
			  }
			})
			//$[method].apply(null , passArg)
		}
	}

		
	exports.callOnErr  = null 

	exports.aw = _ap('post') 

	exports.aj = _ap('get') 
				
	
	})
