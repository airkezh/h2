/*common*/
require('jquery');
var windowScroll = require('component/windowScroll');

/*吸顶导航*/
var $navTop = $('.nav_box');
windowScroll.yIn( '1' , function() {
    $navTop.attr('class' , 'nav_box nav_fixed') 
}, function() {
    $navTop.attr('class' , 'nav_box nav_pa')
})

/*页面动画*/
var $head = $('.item_box1').find('li');
var $talk = $('.item_box2').find('p');
var $page = $('.item_box3').find('p');
var $step = $('.item_box4').find('p');
var $two_code = $('.item_box5').find('p');
windowScroll.bind(function(pos){
	if(pos > 300){
		$head.each(function(i){
			$(this).css('animation' , 'avatar 1000ms ease '+i*300+'ms 1 forwards');
		})
	}
	if(pos > 800){
		$talk.each(function(i){
			$(this).css('animation' , 'talk'+i+' 1000ms ease '+i*300+'ms 1 forwards');
		})
	}
	if(pos > 1300){
		$page.each(function(i){
			$(this).css('animation' , 'page 1500ms ease '+i*500+'ms 1 forwards');
		})
	}
	if(pos > 1900){
		$step.each(function(i){
			$(this).css('animation' , 'step 1000ms ease '+i*500+'ms 1 forwards');
		})
	}
	if(pos > 2700){
		$two_code.each(function(i){
			$(this).css('animation' , 'two_code'+i+' 1200ms ease '+i*500+'ms 1 forwards');
		})
	}
} , 'body');



