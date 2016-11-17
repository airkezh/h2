fml.use('component/poster' , function(){
	this.posterWall();
});
 fml.use(['jquery','app/posterWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'type' : query.type || 'shangpin'
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(opts , '/aj/getGoods/commercePost');
});
fml.use('app/deletePoster' , function(del){
	del.deleteTrigger();
}); 

fml.define('page/huodong/shangpin' , ['jquery' , 'ui/dialog' , 'component/shareTmp' , 'app/shareTo' , 'component/regString' , 'app/checkLogin'] , function(require,exports){
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
					$('.spsub').removeClass('spsub').addClass('spsub1').attr('disabled', false);
					$('.magaImgage').attr('src' , goodsInfo.image);
					$("#linkMessageTips").html('');
					$('.spsub1').unbind('click').on('click',function(){
						var data = {wbapp : 'shangpin' , gPicUrl : goodsInfo.image , gPrice : goodsInfo.price , gTitle : goodsInfo.title , gUrl : goods_url , goodsID : goodsInfo.goodsID , name : goodsInfo.catalog_name , gNote : '' , 'gSouceType' : 1 , group_id : '17155021'};
						$.get('/goods/ajax_createWbappGoods', data ,function(res){
							$('#closeDialog').click();
							$.get('/aj/getGoods/commercePost' , {tid : res , type : 'shangpin'} ,function(data){
								var tpl = shareTmp('posterWall', data)
								$('.goods_wall').prepend(tpl).masonry('reload');
								$('.posterContent a').attr('target','');
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
	$('.shangpin').on('click' , function(){
		if(check()){
			var tpl = shareTmp('huodong');
			var html = tpl;
			new dialogUI({'title':'分享宝贝' , 'content':html , 'width':'650px'});
			$('.spsure').on('click',function(){
				var goods_url = $(".ddurl").val();
				if (goods_url.indexOf('shopin.net') <= -1){
					$("#linkMessageTips span").html('无法获取宝贝信息，请检查链接是否正确，重新尝试。');
					return false;
				}
				goodsAjax(goods_url);
			});
		}
	});
	
	/*share sina qzone qq*/
	var url = 'http://www.meilishuo.com/huodong/shangpin/?frm=shangpin6';
	var desc = "精采？精明？全满足！@美丽说 携手@上品折扣官方购物网 11月5日--11月18日期间，分享上品折扣网宝贝到美丽说，即有机会获得免单机会。马上去挑选你最喜欢的宝贝吧！点击进入>>";
	var title = "上品style，穿的精彩，买的精明";
	var pic = Meilishuo.config.picture_url + 'images/huodong/shangpin/spshare3.jpg';
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
