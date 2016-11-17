fml.use(['wap/app/posterWalls'] , function(){
	var posterWall = this.posterWalls;
	var urlData = { 'frame' : 0, 'mac' : fml.vars.mac }

	var pullUpAction = function(){
		posterWall.ajaxPoster('/aj/activity/sale_voted_haibao');
	}
	
	posterWall.testPoster0(urlData ,pullUpAction);
	posterWall.scrollPoster();
			
});
fml.use('wap/page/activity/shareTo2' , function(){});
fml.define('wap/page/activity/sale_vote/sale_voted' , [] , function(require , exports){	});

