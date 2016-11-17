fml.use('app/adPoster', function(){
	this.carousel('.top_box',{'width':948,'height':400,'gap':3500,'type':2});
});
fml.use('component/focus' , function(){
	this.inputFocus('.searchKeyCatalog');
});
fml.use('app/eventHover' , function(){
	this.hoverShow('.tb_pic li' , '.onpic');
});
fml.use(['jquery', 'ui/dialog', 'component/shareTmp'], function(){
	var dialog = this.dialog;
	var shareTmp = this.shareTmp;
	$('.fold').click(function(){
		var tpl = shareTmp('brandPop');
		var brandDia = new dialog({title : "品牌故事" , width : 570 , content : tpl});
	});
});
fml.use(['jquery' , 'app/accordion_slider'] , function(){
	$('#accordion-slider').kwicks({ max : 430 , spacing : 1 , sticky : true });  //max为图片展开的最大宽度，min和max至少要提供一个
	$('#accordion-slider li').mouseenter(function(){
		$(this).find('.focus_text').fadeIn('slow');
	}).mouseleave(function(){
		$(this).find('.focus_text').fadeOut('slow');
	});
});
fml.use('app/follow' , function(){
    this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.define('page/brand' , ['jquery'] , function(){
	var turn = function(type){
		var _this =  $('.in-mz div'),
			_left = parseInt(_this.css('left'));
		if(_left % 904) return;
		type ?
		(_left === -1808 && _this.animate({'left' : 0} , 1000))|| _this.animate({'left' : _left - 904} , 1000) :
		(_left === 0 && _this.animate({'left' : -1808} , 1000))|| _this.animate({'left' : _left + 904} , 1000);
	}
	$('.left-mz').click(function(){
		turn(0);
	});
	$('.right-mz').click(function(){
		turn(1);
	});
});