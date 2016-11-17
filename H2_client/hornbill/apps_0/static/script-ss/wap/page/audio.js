fml.use(['app/audio'] , function(){
	//多人语音需求，加入长度参数
	var _length = $('.jp-jplayer').length;
	this.audio(_length);
	
	var share_url = $('#share_ico .active').attr('share_url')

	$('#share_ico a').bind('click', function(){
		$('#share_ico a').removeClass('active')
		$(this).addClass('active')	
		share_url = $(this).attr('share_url')
	});
	$('#shareBtn').on('click', function(){
		console.log(share_url)
		window.location.href = share_url
	})

});

fml.define('wap/page/audio' , ['wap/zepto/touch','wap/component/windowScroll','wap/zepto/scroll','wap/component/waterfall','wap/app/posterWalls1','wap/component/shareTmp','wap/app/doota/timedown'] , function(require){
	// gotop
	var $gotop = $('.gotop'),
		onscroll = require('wap/component/windowScroll');
	$gotop.on("click" , function(){
		document.body.scrollTop = 0;
		//$.scrollTo({
		//    endY: 0,
		//    duration: 300
		//});
	});
	function gotop(pos,isDown){
		if(pos < 30){
			$gotop.hide();
		} else {
			$gotop.show();
		}
	}
	onscroll.bind(gotop,'gotop');
});
