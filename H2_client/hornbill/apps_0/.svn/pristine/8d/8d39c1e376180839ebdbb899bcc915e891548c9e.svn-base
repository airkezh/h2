fml.define('m/page/demo/dialog', ['wap/ui/alert', 'wap/ui/confirm', 'wap/ui/dialog', 'wap/zepto/touch'], function(require) {
	var Alert = require('wap/ui/alert')
	var Confirm = require('wap/ui/confirm')
	var Dialog = require('wap/ui/dialog')

	$('#showAlert').on('tap', function(){
		var a = new Alert({
			content:'Alert!'
		});
		console.log(a)
	})
	$('#showConfirm').on('tap', function(){
		var c = new Confirm({
			content:'Confirm!'
			, onSure : function(){
				alert('confirm sure!')	
			}
		});
		console.log(c)
	})
	$('#showDialog').on('tap', function(){
		var d = new Dialog({
			content:'Dialog!'
		});
		console.log(d)
	})

})
