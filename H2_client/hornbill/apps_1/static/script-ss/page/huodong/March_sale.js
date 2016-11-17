/* 轮播 */
fml.use('app/lunbo' , function(){
	this({
		iWidth:860,
		snum:1,
		dtime:500,
		ptable:'photos-table',
		toright:'btn-right',
		toleft:'btn-left',
		auto:{direction:'right',time:5000},
		nav : true,
		navcss : {scla : 'scla', ucla : 'ucla'}
	});
});
/* 吸顶导航 */
fml.use(['component/windowScroll','jquery'] , function(){
	var $ = this.jquery;
	var scroll = this.windowScroll;
	var nag = $('#subNav .subBox')
	,nagParent = nag.parent()
	,nav = $('#navbar')
	,subHolder = $('#navbar .sec_nav')
	,wheader = $('#navbar .wheader,#navbar .sale_nav')
	,navHeight = nav.height();
	var gt80 = function(){
		$('.goods_box').css({'margin-top' : '99px'});
		subHolder.append(nag).show();
		wheader.stop().animate({'margin-top':'-'+navHeight},function(){
			if (nagParent.is(subHolder)) $(this).hide()
		});
	}
	var lt80 = function(){
		$('.goods_box').css({'margin-top' : '0'});
		nagParent.prepend(nag);
		subHolder.hide();
		wheader.show().stop().animate({'margin-top':0});
	}
	var y = nag.offset().top - navHeight;
    scroll.yIn( y, gt80, lt80);

});
fml.define('page/huodong/March_sale' , ['jquery' , 'app/checkLogin' , 'ui/dialog' , 'component/shareTmp'] , function(require , exports){
	$ = require('jquery');
	var check = require('app/checkLogin');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	/* 循环滚动字幕 */
	var ulNode = $('#roundText').children('ul');
	var liNode = ulNode.children('li');
	var ulWidth = 0;
	liNode.each(function(i){
		ulWidth += liNode.eq(i).outerWidth(true);
	});
	ulNode.append(ulNode.children('li:lt(7)').clone());
	setInterval(function(){
		var left = parseInt(ulNode.css('left'));
		ulNode.css('left' , (left - 1) + 'px');
		if(parseInt(ulNode.css('left')) <= -ulWidth) ulNode.css('left' , '0');
	} , '50');
	/*锚点定位*/
	/*$('.thirdNav a').on('click' , function(){
		var index = $('.thirdNav a').index($(this));
		$('html , body').animate({scrollTop:$('.pic' + index).offset().top - '162'},500);
	});*/
	if(location.href.indexOf('type') > -1){
		$('html , body').animate({scrollTop:$('#subNav .subBox').offset().top}, 'fast');
	}
	/*抽奖*/
	var flag = 0;
	$('.price_box').on('mouseover' , function(){
		if(flag) return;
		$('.cj_normal').hide();
		$('.cj_over').show();
		$('.vote').show();
	}).on('mouseout' , function(){
		$('.cj_over').hide();
		$('.cj_normal').show();
		$('.vote').hide();
	});
	$('.vote').on('click' , function(){
		if(!check()) return;
		var promoteNum = $('#promoteNum').html();
		$.get('/aj/huodong/March_vote' , function(res){
			if ((!res || res.code) && res.data) return;
			/*抽奖次数*/
			promoteNum <= 0 ? promoteNum = 0 : promoteNum = promoteNum - 1;
			$('#promoteNum').html(promoteNum);
			/*动图效果切换*/
			flag = 1;
			$('.cj_click').show();
			$('.cj_over').hide();
			$('.vote').hide();
			/*弹窗*/
			var cj_pop = function(){
				var tpl = shareTmp('win');
				var vote_pop = new dialogUI({
					'content' : tpl,
					'width' : '450px',
					'title' : '抽奖结果',
					'onChange' : function(){
						$('#pop_tit').html(res.data.title);
						$('#pop_text').html(res.data.content);
					},
					'onClose' : function(){
						$('.cj_click').hide();	
						flag = 0;
					}
				});
				$('.sure').on('click' , function(){
					vote_pop.drive.destroyModel();	
				});			
			}
			setTimeout(function(){ cj_pop() } , 1000);
		} , 'json');
	});



});
