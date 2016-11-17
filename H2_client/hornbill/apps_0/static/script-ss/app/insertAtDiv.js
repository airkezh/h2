/*common*/	
var $ = require('jquery');
return function($obj , myValue){
	$obj.focus()
	var sel, range;

	if (window.getSelection){
		sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var el = document.createElement("div");
            el.innerHTML = myValue;
            var frag = document.createDocumentFragment(), node, lastNode;
            while ( (node = el.firstChild) ) {
                lastNode = frag.appendChild(node);
            }
			range.insertNode(frag);
            if (lastNode) {
                range = range.cloneRange();
                range.setStartAfter(lastNode);
                range.collapse(true);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
	}else if(document.selection && document.selection.type != "Control"){
		document.selection.createRange().pasteHTML(myValue);
	}else{
		$obj.append(myValue)
	}
}

		/*
return function($obj , myValue){
	$obj.focus()
	var selection= window.getSelection ? window.getSelection() : document.selection;
	var range= selection.createRange ? selection.createRange() : selection.getRangeAt(0);

	range.collapse(false);
	if (window.getSelection){

		var hasR = range.createContextualFragment(myValue);
		var hasR_lastChild = hasR.lastChild;
		while (hasR_lastChild && hasR_lastChild.nodeName.toLowerCase() == "br" && hasR_lastChild.previousSibling && hasR_lastChild.previousSibling.nodeName.toLowerCase() == "br") {
			var e = hasR_lastChild;
			hasR_lastChild = hasR_lastChild.previousSibling;
			hasR.removeChild(e)
		}                                
		range.insertNode(hasR);
		if (hasR_lastChild) {
			range.setEndAfter(hasR_lastChild);
			range.setStartAfter(hasR_lastChild)
		}
		selection.removeAllRanges();
		selection.addRange(range)

	}else if(document.selection && document.selection.type != "Control"){
		alert(111)
		range.pasteHTML(myValue);
		range.select();
	}else{
		alert(222)	
	}
}
*/
