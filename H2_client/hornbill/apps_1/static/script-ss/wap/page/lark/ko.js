/*common*/
require('wap/zepto');
var _man = $('.man');
fml.vars.ko = 0;
$("body").keydown(function(e){
	if (fml.vars.ko) {
		return false;
	};
    var ev = window.event || e;
    var code = ev.keyCode || ev.which;
    if (code == 68) {
    	fml.vars.ko = 1;
		_man.removeClass('stance').addClass('kick');
    };
    setTimeout(function(){
		_man.removeClass('kick').addClass('stance');
		fml.vars.ko = 0
    },400)
});