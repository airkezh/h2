fml.define('sum/qqwelfareValidate' , ['jquery'] , function(require , exports){
	var $ = require('jquery');	
	return {
		realname : function (val){
			var re = /[^\x00-\xff]/;
			return re.test(val);
		},
		email : function (val){
			var re = /\S+@\S+\.\S+/;
			return re.test(val);
		}
	}
});
