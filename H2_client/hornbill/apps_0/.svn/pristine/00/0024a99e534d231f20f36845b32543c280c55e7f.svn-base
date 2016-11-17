/*common*/

/*
将objet对象转成css中的字符串。

参数：
object  必选


*/

function toCss(object,selector){
	
	var arr = [] , style = '';
	for(p in object){
		arr.push(p +':'+ object[p]);
	}
	style = arr.join(';')+';'

	return selector?selector+'{'+style+'}':style

};

return toCss;



