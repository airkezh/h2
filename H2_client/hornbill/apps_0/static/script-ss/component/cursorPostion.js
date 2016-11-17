fml.define('component/cursorPostion' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	return {
		getCursortPosition : function (ctrl) {
			ctrl = $(ctrl)[0];
			var CaretPos = 0;	// IE Support
			if (document.selection) {
				ctrl.focus ();
				var Sel = document.selection.createRange ();
				Sel.moveStart ('character', -ctrl.value.length);
				CaretPos = Sel.text.length;
			}
			// Firefox support
			else if (ctrl.selectionStart || ctrl.selectionStart == '0'){
				CaretPos = ctrl.selectionStart;
				return (CaretPos);
			}
		},
		setCaretPosition : function (ctrl, pos){
			ctrl = $(ctrl)[0];
			if(ctrl.setSelectionRange){
				ctrl.focus();
				ctrl.setSelectionRange(pos,pos);
			}
			else if (ctrl.createTextRange) {
				var range = ctrl.createTextRange();
				range.collapse(true);
				range.moveEnd('character', pos);
				range.moveStart('character', pos);
				range.select();
			}
		},
		getSelection : function(ctrl){
			var s,e,range,stored_range;
			ctrl = $(ctrl); 
			if(ctrl[0].selectionStart == undefined){
				var selection=document.selection;
				if (ctrl[0].tagName.toLowerCase() != "textarea") {
					var val = ctrl.val();
					range = selection.createRange().duplicate();
					range.moveEnd("character", val.length);
					s = (range.text == "" ? val.length:val.lastIndexOf(range.text));
					range = selection.createRange().duplicate();
					range.moveStart("character", -val.length);
					e = range.text.length;
				}else {
					range = selection.createRange(),
					stored_range = range.duplicate();
					stored_range.moveToElementText(ctrl[0]);
					stored_range.setEndPoint('EndToEnd', range);
					s = stored_range.text.length - range.text.length;
					e = s + range.text.length;
				}
		   }else{
				s=ctrl[0].selectionStart,
				e=ctrl[0].selectionEnd;
		   }
		   var te=ctrl[0].value.substring(s,e);
		   return {start:s,end:e,text:te}
		}
	}
});
