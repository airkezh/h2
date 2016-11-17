fml.use('app/personFollow' , function(){
	this();	
});
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('app/letter' , function(){
	this('#sendPrivateLetter');	
});
fml.use('app/adPoster', function(){
    this.carousel('.minisite_bnr',{'width':706,'height':330,'gap':2500,'type':2});
});
fml.use('app/replyBox' , function(){});

fml.define('page/minisite/minisite' , ['jquery' , 'app/shareTo'] , function(require , exports){
	$ = require('jquery');
	var share = require('app/shareTo');
	var url = location.href + '?frm=dangdang6';
	var desc = "刚才在逛美丽说时发现了 XX 的品牌主页，推荐给你们看看，真的蛮值得关注的。>>";
	var title = "当当网惹火行动 释放你的欲望清单";
	var pic = "";
	var description = '';
	$('.i_qzone').on('click',function(){
		share.shareToQzone(url , desc, '', title , pic , description);	
	});
	$('.i_sina').on('click',function(){
		share.shareToWeibo(url , desc , pic);
	});
	$('.i_tx').on('click',function(){
		share.shareToQQ(url , desc , pic);	
	});
	
	//展开收起
	var showMore = function(textbox , height){
		var allHeight = textbox.height();
		if(allHeight > height){
			textbox.css({height : height , overflow : 'hidden'}).after('<div class="gray_f cursor_f mt10_f click_me" >全部展开<small style="font-size:8px;">▼</small></div>');	
			textbox.siblings('.click_me').toggle(function(){
				textbox.animate({'height' : allHeight} , 400);
				$(this).html('收起<small style="font-size:8px;">▲</small>');
			} , function(){
				textbox.animate({'height' : height} , 400);
				$(this).html('全部展开<small style="font-size:8px;">▼</small>');
			});
		}
		textbox.find('a').addClass('red_f').attr('target','_blank');      
	}
	showMore($('.story') , 180);
	showMore($('.mini_text') , 54);
});

