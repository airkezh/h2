/*common*/
var $ = require('wap/zepto');
var img_width  = 0.12
	,img_height = 0.12
	,Box =  $('<div class = "snowbox"></div>')
	,imgSrc = "http://i.meilishuo.net/css/images/staticbed/"
	,arr = [imgSrc + 'snow2.gif',imgSrc + 'snow0.gif',imgSrc + 'snow1.gif']
	,snowImg = $('<img src = '+arr[0]+'>').css({'position': 'absolute'}),
	timeoutId

exports.startSnow = function (){
		clearTimeout( timeoutId );
		var documentWidth = $(document).width()
			,documentHeight = $(document).height()
		Box.appendTo('body');
		Box[0].style.cssText = 'position:fixed;top:0;left:0;width:100;height:' 
			+ documentHeight + 'px;pointer-event:none;';
		timeoutId = setInterval(function(){
			var startLeft = documentWidth * Math.random() -100
				,startTop = Math.random() * (-70)
				,endPositionTop = documentHeight - Math.random() *100
				,endPositionLeft = documentWidth  *Math.random() - startLeft
				,speed = documentHeight * 4 + Math.random() * 7000
				,index = parseInt(Math.random() * 3)
				,scaleN = Math.random() * 1.7 + 0.5
			snowImg.clone().appendTo(Box).attr('src',arr[index]).css({
				left : startLeft +'px'
				,top :  startTop + 'px'
				,opacity : 1
				,height : img_height  + 'rem'
				,width : img_width + 'rem'
				,'-webkit-transform' :  'translateX('+startLeft+'px) translateY('+ startTop +'px) scale('+scaleN+')'
				,zIndex : 10000
			}).animate({
				translateX: endPositionLeft + 'px'
				,translateY : endPositionTop + 'px'
				,opacity : 1
			},speed,'linear',function(){
				$(this).remove();
			})
		},50)

}
exports.stopSnow = function (){
	clearInterval(timeoutId);
	if(Box){
		Box.remove();
	}	
}

