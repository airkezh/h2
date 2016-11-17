fml.define('app/insertAtCaret' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	return function(obj , myValue){
		if (typeof obj[0].name != 'undefined') {
			obj = obj[0];
		}   
		if ($.browser.msie) {
			obj.focus();
			setTimeout(function(){
				sel = document.selection.createRange();
				sel.text = myValue;
				obj.focus();
			}, 10);
		}   
		else if ($.browser.mozilla || $.browser.webkit || $.browser.chrome) {
			var startPos = obj.selectionStart;
			var endPos = obj.selectionEnd;
			var scrollTop = obj.scrollTop;
			obj.value = obj.value.substring(0, startPos)+myValue+obj.value.substring(endPos,obj.value.length);
			obj.focus();
			obj.selectionStart = startPos + myValue.length;
			obj.selectionEnd = startPos + myValue.length;
			obj.scrollTop = scrollTop;
		}
		else {
			obj.value += myValue;
			obj.focus();
		}  
	}
});
