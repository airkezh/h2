fml.use('wap/app/fallWall0');
fml.use(['wap/app/fallWalls'], function(){
	var fallWalls = this.fallWalls;
	var data = {
		'url' : '/aj/beautysale/list',
		'frame' : 1
	}
	fallWalls.scrollPoster(data);
});
fml.use('wap/app/hackWeixin');

fml.use(['wap/zepto', 'wap/app/doota/timedown'] , function(){
	window.timedown = this.timedown;
	var $ = this.zepto;

	fml.on('posterFinsh' , function(){
		var $timeStamp = $('.timeStamp');
		$timeStamp.each(function(){
			var self = $(this);
			if(self.attr('loadTime') != 1){
				var end_time = self.attr('time');
				if(end_time > 3900){
					timedown.down(self, self.attr('time'), '0d-0h-0i-0s',['%v天','%v小时','%v分','<span class="none_f">%v<span>']).onTimeOver(function(){
						self.parents('.time_wrap').html('已结束').addClass('act_end');
					}).correct();
				} else {
					timedown.down(self, self.attr('time'), '0d-0h-0i-0s',['%v天','%v小时','%v分','%v秒']).onTimeOver(function(){
						self.parents('.time_wrap').html('已结束').addClass('act_end');
					}).correct();
				}
				self.attr('loadTime', 1);
			}
		});
	});
});

fml.define('wap/page/biz/list', [], function(){});