fml.use(['component/windowScroll','jquery' , 'component/position', 'component/iStorage'] , function(){
    var $ = this.jquery;
    var scroll = this.windowScroll;
	var position = this.position;
    var is6 = $.browser.msie && $.browser.version=='6.0';
	//gotop
	var goTop = $("#goTop");
	var sideNav = $('#sideNav');
	var go_top = $('#go_top');
	var win  =$(window);
	var shareGroup = $('.share_group');
	var browse = $('.browse');
	goTop.show();

	//questionnaire 入口
	var storage = this.iStorage;

	$('#go_top').bind("click" , function(){
	   $('body,html').stop(true , true).animate({ scrollTop: 0 }, 300);
	   return false;
	});
    scroll.yIn(100 , function(){
	  go_top.stop(true,true).fadeIn("fast");
	  sideNav.stop(true,true).fadeIn("fast");
	} , function(){
	  go_top.stop(true,true).fadeOut("fast");
	  sideNav.stop(true,true).fadeOut("fast");
	});
	

	if (is6){
		goTop.css("position","absolute");
		sideNav.css('position','absolute');
		browse.show();
		browse.find('.close_z').bind('click' , function(){
			browse.hide();
		}); 
		var offset = {
			top : shareGroup.size() > 0 ? shareGroup.offset().top : 0
		}
		var offset1 = {
			top : browse.size() > 0 ? browse.offset().top : 0,
			left : ($(window).width() - browse.width()) / 2
		}
		browse.css('left' , offset1.left)
        scroll.bind(function(pos){
            goTop.css({"top" : (pos + win.height()-240) + 'px'})
            sideNav.css({"top" : (pos + win.height()-320) + 'px'})
			offset.top && position.toFixed(shareGroup , offset);
			offset1.top && position.toFixed(browse, offset1);
        });
		
	}
});
fml.use('app/addFavorite' , function(){
	this.addFavor();
});
fml.use('jquery' , function(){
	$('#sideNav a').bind('click', function(){
		$('#sideNav a').removeClass('active')
		$(this).addClass('active')	
	});

});
fml.define('page/huodong/macaron' , [] , function(){});
