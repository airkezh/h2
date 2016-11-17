/*common*/
var $ = require('wap/zepto');

var boardWidth = $('.board').width();
var aInput = $('input'),
	aAttribute = $('.attribute');
var arrValue = [],
	arrName = [];

$('.board').height(boardWidth);

for(var i=0;i<aInput.length;i++){ 
	(function(i){
		aInput[i].addEventListener('touchmove' , function () {
			var value = $(this).val();
			var name = $(this).attr('name');
			if(name == 'opacity'){
				$(aAttribute[i]).css("-webkit-filter",name + "(" + value + ")");
			}
			if(value!=0 && name!="opacity"){
				if(name == 'blur'){
					$(aAttribute[i]).css("-webkit-filter",name + "(" + value + "px)");
				}else if(name == 'hue-rotate'){
					$(aAttribute[i]).css("-webkit-filter",name + "(" + value + "deg)");
				}else if(name == 'drop-shadow'){
					$(aAttribute[i]).css("-webkit-filter",name + "(" + value + "px " + value + "px 20px black)");
				}else{
					$(aAttribute[i]).css("-webkit-filter",name + "(" + value + ")");
				}
			}else if(value==0 && name!="opacity"){
				$(aAttribute[i]).css("-webkit-filter","none");
			}
		});
	})(i);
};
$('.reset').on('tap',function(){
	for(var i=0;i<aInput.length;i++){
		$(aInput[i]).val(0);
		$(aAttribute[i]).css("-webkit-filter","none");
	}
});