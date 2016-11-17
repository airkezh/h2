fml.use('component/poster' , function(){
	this.posterWall();
});
fml.use(['jquery','app/posterWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'type' : query.type || 'ms1'
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(opts , '/aj/getGoods/commerce_oppo');
});
fml.use('app/deletePoster' , function(del){
	del.deleteTrigger();
}); 
fml.define('page/huodong/ms1' , ['jquery' , 'ui/dialog' , 'component/shareTmp' , 'app/shareTo' , 'component/regString' , 'app/checkLogin'] , function(require,exports){
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
			'ajax': 1,
			'actName' : 'ms1'
		};
		var callback = function(response){
			if(response == 2){
				current_mslook.html("<span>该店铺涉嫌作弊，已经被美丽说封禁了，请MM逛逛别家的宝贝再来分享吧~</span>");
			}else{
				if(response.status){		
					goodsInfo.catalog_name = response.goods.catalog_name;
					goodsInfo.image = response.goods.image;
					goodsInfo.picUrls = response.goods.picUrls;
					goodsInfo.price = response.goods.price;
					goodsInfo.title = response.goods.title;
					goodsInfo.goodsID = response.goods.goodsID;

					$('.ms_sub1').removeClass('ms_sub1').addClass('ms_sub').attr('disabled', false);
					$('.magaImgage').remove();
					if($('.goods_msimg img').length > 5){
						alert('最多上传6张图片哦~');
						$("#linkMessageTips").html('');
						return false;
					}else{
						$('.goods_msimg').append('<img src="'+goodsInfo.image+'" />');
						$("#linkMessageTips").html('');
					}
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
	//弹窗
	$('.ms_click').on('click' , function(){
		if(check()){
			var tpl = shareTmp('ms');
			var html = tpl;
			new dialogUI({ 'title':'分享宝贝' , 'content':html , 'width':'784px'});
		}
		//预览
		$('.mssure').unbind('click').click(function(){
			var goods_url = $(this).siblings('input').val();
			goodsAjax(goods_url);	
			$('.msurl').val('');
		});
		//提交
		$('.ms_sub3').unbind('click').click(function(){
			var ms_pics = [];
			$('.goods_msimg img').each(function(i){
				ms_pics[i] = $(this).attr('src');	
			});
			var data = { actName : 'ms1' , pics : ms_pics , msPic_default : '/css/images/huodong/ms/ms_img5.jpg' };
			$.get('/wbapp/ajax_composepics' , data , function(res){
				$.get('/aj/getGoods/commercePost' , { tid : res , type : 'ms1' } , function(data){
					var tpl = shareTmp('posterWall', data);
					$('.goods_wall').prepend(tpl).masonry('reload');
				} , 'json'); 
			} , 'json');	
			//关注
			if($('.ms_follow input').is(':checked')){
				$.get('/aj/user/follow?fuid=34474601');
			}
			$('#closeDialog').click();
		});
	});

	/*share sina qzone qq*/
	var url = location.href + '&frm=MS02';
	var desc = "我刚刚在美丽说参与了M&S马莎百搭大赛，各种风格任我搭，你也来玩吧！还有更多好礼等你来拿！@马莎中国 >>";
	var pic = Meilishuo.config.picture_url + 'images/huodong/ms/ms_share1.jpg';
	$('.i_sina').on('click',function(){
		share.shareToWeibo(url , desc , pic );
	});



});
