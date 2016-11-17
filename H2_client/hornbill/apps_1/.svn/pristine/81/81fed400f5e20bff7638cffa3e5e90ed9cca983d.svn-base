/*common*/
var focus=require('app/focus_banner');

$('.gtop').on('click',function(){
	$('body,html').animate({scrollTop:0},1000);
})

$('.sidenav a').not('.buy').on('click',function(){
	$('.sidenav a').removeClass('active');
	$(this).not('.buy').addClass('active');
})
$('.main div span').on('click',function(){
	var status=$(this).data('status');
	changbg(status);
	function changbg(status){
		switch(status){
			case 1:
				$('.status1').css('display','none');
				$('.status2').css('display','block');
				break;
			case 2:
				$('.status2').css('display','none');
				$('.status1').css('display','block');
				break;
			// case 1:
			// 	$('.status1 ,.status3').css('display','none');
			// 	$('.status2').css('display','block');
			// 	break;
			// case 2:
			// 	$('.status1 ,.status2').css('display','none');
			// 	$('.status3').css('display','block');
			// 	break;
			// case 3:
			// 	$('.status2 ,.status3').css('display','none');
			// 	$('.status1').css('display','block');
			// 	break;
		}

	}
})
$(window).scroll(function(){

	var stop=$(window).scrollTop();
	console.log(stop)
	if(stop<548){
		$('.sidenav a').not('.buy').removeClass('active');
		$('.sidenav .a1').not('.buy').addClass('active');
 	}

	if(stop>548 && stop<1124){
		$('.sidenav a').not('.buy').removeClass('active');
		$('.sidenav .a2').not('.buy').addClass('active');
 	}
	if(stop>1124 && stop<1789){
		$('.sidenav a').not('.buy').removeClass('active');
		$('.sidenav .a3').not('.buy').addClass('active');
 	}
	if(stop>1789 && stop<3083){
		$('.sidenav a').not('.buy').removeClass('active');
		$('.sidenav .a4').not('.buy').addClass('active');
 	}

	if(stop>3083){
		$('.sidenav a').not('.buy').removeClass('active');
		$('.sidenav .a5').not('.buy').addClass('active');
 	}
})
focus.bind({
	'unit' : '.top_bnr .banner li'
	,'btn': '.round .adType a'
	,'transition' : 'fade'
	,'toprev':'.bnr_btn_left'
	,'tonext':'.bnr_btn_right'
})

