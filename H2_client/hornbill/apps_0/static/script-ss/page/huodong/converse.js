fml.define('page/huodong/converse' , ['jquery'] , function(require , exports){
	$ = require('jquery');
	var convs_div = $('.convs_right div');
	convs_div.click(function(){
		window.open('http://meilishuo.com/u/EDGfHl');	
	})
	convs_div.mouseover(function(){
		var convs_index = convs_div.index(this) + 1;
		$(this).attr('class' , 'c_right' + convs_index + convs_index);
		$(this).parents('.convs_bottom').find('a').attr('class' , 'convs_left' + convs_index);
	}).mouseout(function(){
		var convs_index = convs_div.index(this) + 1;
		$(this).attr('class' , 'c_right' + convs_index);	
	});
	var convs_a = $('.convs_bottom a');
	convs_a.mouseover(function(){
		var convs_a_index = $(this).attr('class').substr(10,10);
		$('.c_right' + convs_a_index).removeClass().addClass('c_right' + convs_a_index + convs_a_index);
	}).mouseout(function(){
		var convs_a_index = $(this).attr('class').substr(10,10);
		$('.c_right' + convs_a_index + convs_a_index).removeClass().addClass('c_right' + convs_a_index);
			
	});
});
