fml.define('app/closeFrame' , [] , function(require , exports){
	return function(){
		if (!document.referrer) return;
		var isIe = window.postMessage;
		if (!isIe) {
			window.name = 'close';
			window.location = document.referrer;
		}else{  
			var ref = window.name
			if (ref && ref.indexOf('http://') == -1 ) ref = null
			parent.postMessage('close',ref || document.referrer)
		} 
	}	
});
