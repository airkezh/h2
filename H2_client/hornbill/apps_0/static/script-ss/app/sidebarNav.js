fml.define('app/sidebarNav' , ['jquery' , 'component/shareTmp' , 'component/urlHandle'] , function(require , exports){
	var $ = require('jquery');	
	var shareTmp = require('component/shareTmp');
	var url = require('component/urlHandle');
	var clearTime = null;
	return function(){
		$('#sidebarNav').find('li').bind('mouseenter' , function(){
			window.clearTimeout(clearTime);
			$.each($('#sidebarNav').find('li') , function(){
				($(this).find('a').eq(0))[0].className = ($(this).find('a').eq(0))[0].className.replace('_d' , ''); 
			});
			($(this).find('a').eq(0))[0].className += '_d'; 
			if($('.navhover').size() > 0){
				$('.navhover').remove();	
			}
			var sidebarTpl = $(shareTmp('sidebarNavTpl'));
			$('body').append(sidebarTpl);
			sidebarTpl.find('.sidebarContent').html($(this).find('.navContent').html());
			sidebarTpl.find('.sideTitle').removeClass('none_f');
			var itemTop = $(this).find('.sidebarItem').offset().top;
			var upTop = $('.new_nav').offset().top - (+$('.new_nav').css('marginTop').replace('px' , '') + 2);
			if(itemTop + sidebarTpl.height() > ($(window).height() + $(window).scrollTop())){
				var top = itemTop -( sidebarTpl.height() - $(this).find('.sidebarItem').height()) + 4;	
				if(top < upTop){
					top = upTop;	
				}
			}else{
				var top = itemTop;	
				if((top + sidebarTpl.height()) > (upTop + $('.new_nav').height())){
					top = top - ((top + sidebarTpl.height()) - (upTop + $('.new_nav').height()));
				}
			}
			sidebarTpl.css({
				top : top,
				left : $(this).find('.sidebarItem').offset().left
			});
			$('.navhover').show();
		});
        $('#sidebarNav , .navhover').live('mouseleave' ,  function(){
			clearTime = window.setTimeout(function(){
				fml.fireProxy('showNav');   
			} , 500);   
		});
		$('.navhover').live('mouseenter' , function(){
			window.clearTimeout(clearTime);
		})
		fml.eventProxy('showNav' , function(){
			var navClass = {
				'9999' : '热门',
				'2000000000000' : '衣服',
				'2001000000000' : '上衣',
				'2004000000000' : '裙子',
				'2006000000000' : '裤子',
				'2009000000000' : '内衣',
				'6000000000000' : '鞋子',
				'5000000000000' : '包包',
				'7000000000000' : '配饰',
				'9000000000000' : '家居',
				'8000000000000' : '美容'
			}
			var cataid = url.getParams(location.href).cata_id;
			if(navClass[cataid])
				$('#sidebarNav').find('li[itemname="'+ navClass[cataid] +'"]').trigger('mouseenter');	
			else 
				$('#sidebarNav').find('li[itemname="热门"]').trigger('mouseenter');	
		});
	}
});
