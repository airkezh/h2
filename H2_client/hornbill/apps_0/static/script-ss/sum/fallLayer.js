/*
eg:
var icons = [
	{reg : /财|工资|金|钱/, ico : 'money'},
	{reg : /婚/, ico : 'merry'},
	{reg : /姐妹|闺蜜|朋友/, ico : 'sister'},
	{reg : /礼物/, ico : 'figt'},
	{reg : /美丽|花/, ico : 'flower'},
	{reg : /喵|猫/, ico : 'cat'},
	{reg : /男朋友|老公/, ico : 'bf'},
	{reg : /圣诞/, ico : 'christ'}
];
fallLayer('姐妹', icons);

less
.ficon(@name){ .pa;.w(34px);.h(34px);
	background:url("@{pic_url}/images/huodong/maya/icon/@{name}.png") repeat;
//	background:#fff;
}
.ficon_{
	&sister{.ficon('sister');}
}

*/
fml.define('sum/fallLayer' , ['jquery', 'component/position'] , function(require , exports){
	var $ = require('jquery');	
	var position = require('component/position');
	var isIe = $.browser.msie && $.browser.version == '6.0';
	var overflow = function(){
//		$(document.body).css('overflow' , 'hidden');
		if(isIe){$("html").css("overflow","visible")};
	};
	var sync = function(){
		$('#fallLayer').remove();
//		$("body").css("overflow","auto");
		if(isIe) $("html").css({"overflow":"auto" , "overflow-x":"hidden"});
	};
	var testTxt = function(txt,icon){
		for(var i in icon){
			if(icon[i].reg.test(txt)) return icon[i].ico;
		}
		return '';
	};
	var mask = function(icon){
		var fallLayer = $('<div id="fallLayer" class="fallLayer"></div>');
		$("body").append(fallLayer);
		var width = $(window).width(),
			height = $(window).height();
		fallLayer.css({"width" : width , "height" : height, "position":'fixed'});
		position.winCenter($('#fallLayer') , window);	
		overflow();
		fallIcon(icon, width, height - 32);
	};
	var rmficon = function(){
		setTimeout(ficon.fadeOut,300);
	};
	var fallIcon = function(icon, width, height){
		var total = parseInt(width / 50) + 8;
		var maxT = 0;
		for(var i = 0;i < total; i++){
			var left = parseInt(Math.random() * (width / 10)) * 10;
			var t = parseInt(Math.random() * 400) * 10 + 1800;
			maxT = t > maxT ? t : maxT;
			var ficon = $('<span class="ficon_' + icon + '" style="left:' + left + 'px;"></span>');
		//	var rmficon = i === (total - 1) ? sync : function(){ setTimeout(function(){icon.fadeOut},300);};
			var rmficon = function(){ setTimeout(function(){ficon.fadeOut();},300);};
			ficon.appendTo('#fallLayer').animate({"top": height}, t, rmficon);
		}
		setTimeout(sync, maxT);
	};
	return function(icon){ mask(icon); };
	/*
	return function(txt,icon){
		var showIcon = testTxt(txt,icon);
		if(!showIcon) return false;
		mask(showIcon);
	};
	*/
});
