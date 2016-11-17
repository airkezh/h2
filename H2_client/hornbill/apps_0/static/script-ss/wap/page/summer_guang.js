fml.use(['wap/app/summerMatchWall','jquery'] , function(){
	var posterWall = this.summerMatchWall;
	var $ = this.jquery
	var urlData = { 'frame' : 0 , 'ac_id' : fml.vars.poster.ac_id , 'r' : $('.sm_r').html() };

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/summer_match/match' ,function(){
			$('#sharePnl').show().appendTo($('.scroller'))
			var h = $(window).height() 
			if(Meilishuo.config.os.ios){
			 window.setInterval(function() {
				var h2 = $(window).height()
				if (h2 == h) return 
				h = h2
				$('.scroller').height(h2);
				}, 500);
			}
			});
	}

	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster(true);
});

fml.define('wap/page/summer_guang',[] ,function(){});
