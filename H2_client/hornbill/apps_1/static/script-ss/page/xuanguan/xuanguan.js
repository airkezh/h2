/*common*/
require('jquery')

var subNavUp = require('app/subNavUp')
var shareTmp = require('component/shareTmp')
var posterWall = require('app/posterWalls11')

$(window).scroll(function(event) {
	var scoll = $(document).scrollTop()
	if (scoll > 180) {
		$('.nav_right').show()
	}else{
		$('.nav_right').hide()
	}
})
$(".go_top").on("click",function(){
	$(window).scrollTop(0);
});

posterInit()

function posterInit(){
	var urlData = { 
		'frame' : 0,
		'page_size':20,
		'pstrc' : fml.vars.pstrc,
		'asid' : fml.vars.asid
	};
	posterWall(urlData , '/aj/xuanguan/middle', {'Infinite' : '1'});
}

subNavUp.navBind({
	'secNavCon' : '.tab_wrap',
	'firNavBar' : '.wheader',
	'secNavBar' : '.sec_nav'
});