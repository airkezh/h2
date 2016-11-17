fml.use('wap/app/banner');
fml.define('wap/page/activity/March_sale' , ['wap/zepto' , 'wap/app/dialog' , 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	/*更新版本*/
	var update = function(){
        var tpl = shareTmp('toupdate');
        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 1000);
		});			
	}
	/*抽奖*/
	window.MLS = {
		didLogin : function() {
			// 成功登录，跳转到下一步
			window.location.reload();
		}
	};
	$('.jiang').on('click' , function(event){
		event.preventDefault();
		/*登录*/
		if(fml.vars.isLogin == 0){
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		/*版本判断*/
		if(fml.vars.isNewest == "false"){
			setTimeout(function(){ update(); } , 500);
			return;
		}else{
			var promoteNum = $('#promoteNum').html();
			$.get('/aj/activity/March_vote' , {'src' : 'wap'} , function(res){
				if (res.code) return;
				/*抽奖次数*/
				promoteNum <= 0 ? promoteNum = 0 : promoteNum = promoteNum - 1;
				$('#promoteNum').html(promoteNum);
				/*动图效果切换*/
				$('.cj_gif').hide();
				$('.cj_tap').show();
				/*抽奖结果弹窗*/
				var mob_cj = function(){
					var tpl = shareTmp('drawing');
					$.fn.dialog({
						'dialogContent' : tpl ,
						'dialogTitle' : '抽奖结果',
						'onLoad' : function(){
							$('#draw_tit').html(res.data.title);
							$('#draw_text').html(res.data.content);
						},
						'onClose' : function(){
							$('.cj_tap').hide();
							$('.cj_gif').show();
						}
					});		
				}
				setTimeout(function(){ mob_cj() } , 1000);
			} , 'json');
		}
	});
	/*循环滚动字幕*/
	var ulNode = $('#roundText').children('ul');
	var liNode = ulNode.children('li');
	var ulWidth = 0;
	liNode.each(function(i){
		ulWidth += liNode.eq(i).width() + parseInt(liNode.eq(i).css('margin-right'));
	});
	ulNode.append(ulNode.children('li').slice(0,3).clone());
	setInterval(function(){
		var left = parseInt(ulNode.css('left'));
		ulNode.css('left' , (left - 1) + 'px');
		if(parseInt(ulNode.css('left')) <= -ulWidth) ulNode.css('left' , '0');
	} , '50');
	/*判断最新版*/
    var bannerLi = $('.banner').children('li');
    bannerLi.on('tap' , function(event){
        event.preventDefault();
        if(fml.vars.isNewest == "true"){
            window.location.href = $(this).attr('ahref');   
        }else{
			update();
        }
    });

});
