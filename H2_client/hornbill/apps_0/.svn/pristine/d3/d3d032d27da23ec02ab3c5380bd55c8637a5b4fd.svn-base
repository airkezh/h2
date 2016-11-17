fml.define('wap/page/activity/exoconcert' , ['wap/zepto'] , function(require , exports){
	var diff=0 ,endDate=0;
	function countdown(now){
		var t = endDate - now;
		var d = Math.floor(t / (60 * 60 * 24 ));
		t = t - d * (60 * 60 * 24);
		var h = Math.floor(t / (60 * 60));
		t = t - h * (60 * 60);
		var m = Math.floor(t / (60));
		t = t - m * 60;
		var s = Math.floor(t);
		return [ separate_num(d).charAt(0),
			 	 separate_num(d).charAt(1), 
				 separate_num(h).charAt(0), 
				 separate_num(h).charAt(1), 
				 separate_num(m).charAt(0), 
				 separate_num(m).charAt(1), 
				 separate_num(s).charAt(0), 
				 separate_num(s).charAt(1)
		];
	}
	function separate_num(num){
		return ( num <= 9  ? "0" + num : num).toString();
	}
	return function(){
		var timeStamp=$('.timeStamp1')
		, DD = timeStamp.find('dd')

		endDate = parseInt(timeStamp.attr('end-date'))
		var serverDate = parseInt(timeStamp.attr('now'));
		diff = serverDate - (new Date()).getTime() / 1000;
        if (serverDate >= endDate) {
            DD.each(function(){
                var d=$(this);
                d.children().html("0");
            });
            return;
        }
		var timer = setInterval(function(){
				var now = (new Date()).getTime()/1000 + diff;
				timeStamp.each(function(){
					var time = countdown(now);
					$('dd',this).each(function(i){
						var d=$(this);
						if(time[i] != d.children().html()){
							d.children().html(time[i]);	//改变数字
							// d.attr('class' , 'modeX move'); //同时翻转
							d.addClass('modeX move')
							setTimeout(function(){  //翻转时间400ms 之后删除翻转
								d.removeClass('modeX move');
							} , 500);
						}
					});
				});
				if(now + 1 > endDate ){
					location.reload(true);
					return;
				}
		},1000);
	}
});
