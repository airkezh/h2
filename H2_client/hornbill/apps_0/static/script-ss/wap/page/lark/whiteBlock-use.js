/*common*/
var $ = require('wap/zepto');
var whiteBlock = require('wap/page/lark/whiteBlock');


$('body').on('touchmove',function(e){
	e = e || window.event;
	e.preventDefault();
	e.stopPropagation();	
});

//var oCon = document.getElementById('container');
var opts = {
	boxId : 'container',
	text : 'text'
}

var block = new whiteBlock(opts);
block.init();




