fml.define('page/huodong/crest' , ['jquery'] , function(require , exports){
	$ = require('jquery');
	var dr_text=[
		'真的真的变白了！！！佳洁士这款3d炫白牙膏配合它的牙贴使用效果真的是惊讶四射，再也不用担心咧嘴笑时露出黄黄牙齿而尴尬了。',
		'佳洁士MICA炫白+牙贴 ，快速跟玉米牙齿说bye bye~PS：牙膏泡沫少非常好用，牙贴呢，贴的时候略微有点酸，效果妥妥的！',
		'用了一段时间的佳洁士牙膏和牙贴，真的是可以变白的哦！之前其实也用过蛮多牌子的，这款效果真心不错，而且不会不舒服也不用上美容院或者专门冷光美白，轻松的每天刷刷牙，坚持贴贴牙贴就可以啦！',
		'上个月原本打算做牙齿的冷光美白，但是我的牙齿太敏感了！还是牙医给我推荐了佳洁士的这款3D炫白双效牙膏，我是配合着牙贴一起用的！个人觉得非常适合牙齿脆弱敏感的人群，很有美白的针对性！特别要说的就是牙贴，完全可以无刺激的达到一天见效！！ps：刷完牙不能用牙贴哦，最好是刷之前使用！',
		'很羡慕荧屏中明星们美丽自信的笑容，也羡慕他们整齐洁白的牙齿。之前用过很多美白牙膏效果都不理想，冷光美白价格又太贵…自从配套使用了佳洁士3D炫白牙膏和牙贴以后，牙齿真的变白了，特别是那个牙贴，效果非常显著，重要活动来一贴，美牙效果立刻实现！',
	];
	var $crest_dr=$('.crest_daren > div')
	$crest_dr.hover(function(){
		var i=$crest_dr.index($(this));
		if(i>4) return;
		$(this).find('.dr_meng').stop(true,true).fadeOut('slow');
		$('.dr_text').removeClass().addClass('w'+i).addClass('dr_text').html(dr_text[i])
			.stop(true, true).slideDown('slow');
	},function(){
		var i=$crest_dr.index($(this));
		if(i>4) return;
		$(this).find('.dr_meng').stop(true, true).fadeIn('slow');
		$('.dr_text').stop(true, true).slideUp('slow');
	})
	

});
