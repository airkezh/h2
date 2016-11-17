/*common*/
var znm = require('wap/app/lark/znm');

var productNum = fml.vars.productNum;
var chanceNum = fml.vars.chanceNum;
znm.init(".images img", productNum, chanceNum,function(){
	window.location.href = '/activity/znm/ok/';
},function(){
	window.location.href = '/activity/znm/show/';
});

// pt.init();


