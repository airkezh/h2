fml.define('app/scrollPhotos',['jquery'],function(require, exports){ 
	var $=require('jquery');
	
	/*
		HTML format: div ul li a img
		defaultData: {speed:50,direction'vertical'}
	*/
	return function(divId,defaultData){
		if(!divId) return;
		defaultData=defaultData || {speed:50,direction:'horizontal'};

		var	speed=defaultData.speed||50,
			isHorizon=(defaultData.direction=='vertical')?false:true;

		var ulNode = $('#'+divId+' ul'), 
			liNode = ulNode.children('li'), 
			picNum = liNode.length, 
			li_out_width = isHorizon?liNode.outerWidth(true):liNode.outerHeight(true), 
			ulWidth = li_out_width * picNum, 
			win_pic_num =isHorizon?Math.floor($('#'+divId).width() / li_out_width)
								  :Math.floor($('#'+divId).height() / li_out_width);  
		if(picNum <= win_pic_num) return false; 
		ulNode.append(ulNode.children('li:lt('+win_pic_num+')').clone()); 
		var tid = setInterval(move , speed); 
		ulNode.on('mouseover' , liNode , function(){ clearInterval(tid); tid = null; })
			  .on('mouseout' , liNode , function(){ if(tid === null) tid = setInterval(move , speed); }); 
		function move(){ 
			if(!isHorizon){ 
				move=function(){
					var top = parseInt(ulNode.css('top'));
					ulNode.css({'top' : (top-1) + 'px'});
					if(parseInt(ulNode.css('top')) <= -ulWidth)ulNode.css('top' , '0'); 
				}; 
			}else{ 
				move=function(){ 
					var left = parseInt(ulNode.css('left')); 
					ulNode.css({'left' : (left - 1) + 'px'}); 
					if(parseInt(ulNode.css('left')) <= -ulWidth)ulNode.css('left' , '0'); 
				} 
			} 
			move(); 
		}
	}
}); 
