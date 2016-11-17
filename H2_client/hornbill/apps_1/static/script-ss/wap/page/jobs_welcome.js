/*common*/
var $ = require('jquery');
$('title').html('女神喊你来上班：美丽说技术专场招聘');
var w = $('.content').width();
var h = $('.content').height();
for(var i=1; i<13; i++){
	var addNum = h*((5707+60*(i-1))/9800);
	$('#btn'+i).css({'top': addNum,'left': w*(169/640),'width': w*(225/640),'height':h*(31/9800)});
}
$('#btn5').css({'width': w*(290/640)});
$('#btn6').css({'width': w*(365/640)});
