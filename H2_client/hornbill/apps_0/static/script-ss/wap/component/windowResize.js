fml.define('wap/component/windowResize' , [] , function(require , exports){
	var onWindowSizeCng = [];
	var delay;

	function resizeFn(){
		delay && clearTimeout(delay);
		delay = window.setTimeout(function(){
			var j = onWindowSizeCng.length;
			for (var i = 0 ; i < j; i++) onWindowSizeCng[i]();
		} , 240);
	};

	window.onresize = resizeFn;	

	exports.bind = function(f) {
		onWindowSizeCng.push(f);		
    };
});
