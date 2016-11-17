/*common*/
require('wap/zepto/touch')
require('jquery')

$('.mdSha').on('touchstart touchend', function(event){
			event.preventDefault();
		}).on('tap',function(){
		 $('#shareMd').fadeIn(300);
		 $('.md_share').css('display','none');
})
$('#close').on('touchstart touchend', function(event){
			event.preventDefault();
		}).on('tap',function(){
		 $('#shareMd').fadeOut(300);
		 $('.md_share').css('display','block');
})


