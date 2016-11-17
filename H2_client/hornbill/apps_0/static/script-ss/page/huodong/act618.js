fml.define('page/huodong/act618' , ['app/doota/timedown','jquery','ui/alert','component/windowScroll','app/subNavUp'] , function(require, exports){
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
		if (scoll > 300) {
			$('.rignav').show();
		}else{
			$('.rignav').hide();
		}
	});
	// $('.unit').on('mouseenter',function(){
	// 	$(this).find('.cover').show()
	// }).on('mouseleave',function(){
	// 	$(this).find('.cover').hide();
	// })
	$('.coup_alert').live('click', function(event) {
		alert('已经领取过了,618再来领取吧~');
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
	})

    subNavUp.navBind({
    	'secNavCon' : '#goods_rg .content' 
    	// ,'navBar' : '#navBar'
    	,'firNavBar' : '.wheader'
    	, 'secNavBar' : '.sec_nav'
    });
    $(window).scroll(function(event) {
        var scoll = $(document).scrollTop();
        if (scoll > 80) {
            $('.nav_rig').show();
        }else{
            $('.nav_rig').hide();
        }
    });

});

fml.use('app/addToCart', function() {
    this({
        hook: '.js-addToCart',
        tmpl: 'tmplAddToCart',
        parent: '.new_poster'
    });
});