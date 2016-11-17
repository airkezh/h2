fml.use('component/poster' , function(){
	this.posterWall();
});
 fml.use(['jquery','app/posterWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'type' : query.type || 'dangdang'
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(opts , '/aj/getGoods/commercePost');
});
fml.use('app/deletePoster' , function(del){
	del.deleteTrigger();
}); 

fml.define('page/huodong/dangdang' , ['jquery' , 'ui/dialog' , 'component/shareTmp' , 'app/shareTo' , 'component/regString' , 'app/checkLogin'] , function(require,exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var regString = require('component/regString');
	var check = require('app/checkLogin');

	var isAjaxLoad = true;
	var goodsInfo = {};
	var goodsAjax = function(goods_url) {
		var url = '/editor/ajax_fetch_goods';
		var data = {
			'goods_url': goods_url,
			'ajax': 1
		};
		var callback = function(response){
			if(response == 2){
				$("#linkMessageTips")
				.html("<span>该店铺涉嫌作弊，已经被美丽说封禁了，请MM逛逛别家的宝贝再来分享吧~</span>");
			}else{
				if(response.status){		
					goodsInfo.catalog_name = response.goods.catalog_name;
					goodsInfo.image = response.goods.image;
					goodsInfo.picUrls = response.goods.picUrls;
					goodsInfo.price = response.goods.price;
					goodsInfo.title = response.goods.title;
					goodsInfo.goodsID = response.goods.goodsID;
					//宝贝信息获取成功，提交可点
					$('.ddsub').removeClass('ddsub').addClass('ddsub1').attr('disabled', false);
					$('.magaImgage').attr('src' , goodsInfo.image);
					$("#linkMessageTips").html('');
					$('.ddsub1').unbind('click').on('click',function(){
						var data = {wbapp : 'dangdang' , gPicUrl : goodsInfo.image , gPrice : goodsInfo.price , gTitle : goodsInfo.title , gUrl : goods_url , goodsID : goodsInfo.goodsID , name : goodsInfo.catalog_name , gNote : '<a href="/huodong/dangdang/" target="_blank">她参与了“当当网惹火行动”的活动>></a>' , 'gSouceType' : 1 , group_id : '17118319'};
						$.get('/goods/ajax_createWbappGoods', data ,function(res){
							$('#closeDialog').click();
							$.get('/aj/getGoods/commercePost' , {tid : res , type : 'dangdang'} ,function(data){
								var tpl = shareTmp('posterWall', data)
								$('.goods_wall').prepend(tpl).masonry('reload');
							}, 'json');
						},'json');			
					});		
				}else{
					if (typeof response.error != 'undefined') {
						$("#linkMessageTips").html('<span>' + response.error + '</span>');
					};
				};
			};
			isAjaxLoad = true;
		};
		if(isAjaxLoad){
			if (goods_url.substring(0, 4) != 'http') {
				goods_url = 'http://' + goods_url;
			};
			if(regString.isUrl(goods_url)){
				$("#linkMessageTips").html('<span>正在获取宝贝信息</span>');
				$.post(url,data,callback,'json');
				isAjaxLoad = false;
			}else{
				$("#linkMessageTips").html('<span>宝贝链接好像不对哦，换一个试试看</span>');
			};
		};
	}
	$('.dd').on('click' , function(){
		if(check()){
			var tpl = shareTmp('huodong');
			var html = tpl;
			new dialogUI({'title':'分享宝贝' , 'content':html , 'width':'650px'});
			$('.ddsure').on('click',function(){
				var goods_url = $(".ddurl").val();
				if (goods_url.indexOf('dangdang.com') <= -1){
					$("#linkMessageTips span").html('无法获取宝贝信息，请检查链接是否正确，重新尝试。');
					return false;
				}
				goodsAjax(goods_url);
			});
		}
	});
	
	
	/*share sina qzone qq*/
	var url = location.href + '?frm=dangdang6';
	var desc = "@美丽说 携手@当当网 #惹火行动，释放你的欲望清单# 活动火热开展，11月3日--11月19日期间，分享当当网宝贝到美丽说，即有机会获得免单机会，马上去挑选你的心水宝贝吧！购物狂欢季，分享赢大礼！点击进入>>";
	var title = "当当网惹火行动 释放你的欲望清单";
	var pic = Meilishuo.config.picture_url + 'images/huodong/dangdang/ddshare1.jpg';
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
