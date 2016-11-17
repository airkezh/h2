/*common*/
	var	$ = require('jquery')
	,Alert = require('ui/alert')
	,scroll = require('component/windowScroll')
	,subNavUp = require('app/subNavUp')
	var alert = function(msg){
		return new Alert({
			content:msg,
			width:380
		});
	};
	var timedown = require('app/doota/timedown');
	var $_this = this;
	$(window).scroll(function(event) {
		var scoll = $(document).scrollTop();
		if (scoll > 180) {
			$('.nav_right').show();
		}else{
			$('.nav_right').hide();
		}
	});
	$(".go_top").on("click",function(){
        $(window).scrollTop(0);
    });
    $('.time').each(function($_this){
		var _this = $(this);
		_this.removeClass('time');
		timedown.down(this, _this.attr('time') ,'0d-0h-0i-0s',['<b>%v</b>天','<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
		.onTimeOver(function(){
			var is_load = (new Date().getTime()/1000) - _this.attr('data-expiretime');
			// alert(is_load);
			if (is_load < 5) {
				window.location.href=window.location.href;
			};
		});
	});
	subNavUp.navBind({
    	'secNavCon' : '#goods_rg .content' 
    	// ,'navBar' : '#navBar'
    	,'firNavBar' : '.wheader'
    	, 'secNavBar' : '.sec_nav'
    });

	var menu = fml.vars.navBgColor;
	if(menu){
		$(".sec_nav").css({'background' : menu.bg_color || '#f43169'});
		$(".content .a_li").css({'color': menu.text_color || '#fff'});
		$(".current").css({'background' : menu.active_color || '#db2c5e' , 'color' : menu.active_text_color || '#fff'});
		$(".content .a_li").mouseover(function(){
			var strHref = $(this).attr('href');
			if( strHref.indexOf("?") > 0 ){
				var strH = strHref.split('?')[1].split('&');
				var result = strH[1].substr(4);
				if( fml.vars.pid == result ){
					return;
				}
			}
			$(this).css({'background' : menu.active_color || '#db2c5e' , 'color' : menu.active_text_color || '#fff'})
		});
		$(".content .a_li").mouseleave(function(){
			var strHref = $(this).attr('href');
			if( strHref.indexOf("?") > 0 ){
				var strH = strHref.split('?')[1].split('&');
				var result = strH[1].substr(4);
				if( fml.vars.pid == result ){
					return;
				}
			}
			$(this).css({'background' : menu.bg_color || '#f43169' , 'color' : menu.text_color || '#fff'})
		});
	}else{
		$(".sec_nav").css({'background' : '#f43169'});
		$(".content .a_li").css({'color': '#fff'});
		$(".current").css({'background' : '#db2c5e' , 'color' : '#fff'});
		$(".content .a_li").mouseover(function(){
			var strHref = $(this).attr('href');
			if( strHref.indexOf("?") > 0 ){
				var strH = strHref.split('?')[1].split('&');
				var result = strH[1].substr(4);
				if( fml.vars.pid == result ){
					return;
				}
			}
			$(this).css({'background' :  '#db2c5e' , 'color' :  '#fff'})
		});
		$(".content .a_li").mouseleave(function(){
			var strHref = $(this).attr('href');
			if( strHref.indexOf("?") > 0 ){
				var strH = strHref.split('?')[1].split('&');
				var result = strH[1].substr(4);
				if( fml.vars.pid == result ){
					return;
				}
			}
			$(this).css({'background' :  '#f43169' , 'color' : '#fff'})
		});
	}
	
	
	
	
fml.use('app/addToCart', function() {
    this({
        hook: '.js-addToCart',
        tmpl: 'tmplAddToCart',
        parent: '.new_poster'
    });
});