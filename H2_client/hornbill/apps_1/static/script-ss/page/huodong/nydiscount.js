fml.use('component/poster' , function(){
	this.posterWall();	
});
fml.use(['jquery','app/posterWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'tag' : query.tag || '0'
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(opts , '/aj/getGoods/time_discount');
});
fml.use('app/deletePoster' , function(del){
	del.deleteTrigger();
});
fml.define('page/huodong/nydiscount' , ['jquery' , 'component/shareTmp' , 'app/shareTo' , 'app/checkLogin'] , function(require , exports){
	$ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var check = require('app/checkLogin');
	
	if(location.href.indexOf('tag') > -1){
		$('.nyd_mado' + Meilishuo.config.tag).removeClass().addClass('nyd_mado' + (Meilishuo.config.tag+3));
		if(Meilishuo.config.tag == 0){
			$('.nyd_nav0').removeClass().addClass('nyd_nav3');
		}else if(Meilishuo.config.tag == 1){
			$('.nyd_nav3').removeClass().addClass('nyd_nav0');
			$('.nyd_nav1').removeClass().addClass('nyd_nav4');
		}else if(Meilishuo.config.tag == 2){
			$('.nyd_nav3').removeClass().addClass('nyd_nav0');
			$('.nyd_nav2').removeClass().addClass('nyd_nav5');
		}
		$('html , body').animate({scrollTop : $('.nyd_nav').offset().top - 80} , 100);
	}else{
		$('.nyd_top a').mouseover(function(){
			var i = $(this).index();
			$(this).removeClass().addClass('nyd_mado' + (i+3));		
		}).mouseout(function(){
			var i =$(this).index();
			$(this).removeClass().addClass('nyd_mado' + i);	
		});	
	}

	setTimeout(function(){
		$('.nyd_bg').removeClass('nyd_h');	
	} , 1000);

	/*share sina qzone qq*/
	var url = location.href + '?frm=Newyear01';
	var desc = '新年在即，怎能少亲朋好友欢乐聚！穿新衣，送好礼，收拾好心情，精彩过假期！1月19日-1月27日，来美丽说参与“新年狂欢购•精彩过假期”活动，挑选新年必备单品，全场折扣哟~>>';
	var title = "新年狂欢购 精彩过假期";
	var pic = Meilishuo.config.picture_url + 'images/huodong/newyear/nyd_share.jpg';
	$('.i_qzone').on('click',function(){
		share.shareToQzone(url , desc, '', title , pic);	
	});
	$('.i_sina').on('click',function(){
		share.shareToWeibo(url , desc , pic);
	});
	$('.i_tx').on('click',function(){
		share.shareToQQ(url , desc , pic);	
	});

	
});
