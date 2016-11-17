fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('component/lazyLoad' , function(){
	this.load('.imgBox>span' ,'asrc');
});
fml.define('page/huodong/garnier' , ['jquery' , 'ui/dialog' , 'component/shareTmp' , 'app/shareTo' , 'component/regString' , 'app/checkLogin'] , function(require,exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var regString = require('component/regString');
	var check = require('app/checkLogin');

	var isAjaxLoad = true
		, goodsInfo = {}
		, win = {};
	var goodsAjax = function(goods_url) {
		var url = '/editor/ajax_fetch_goods';
		var data = {
			'goods_url': goods_url,
			'actName' : 'garnier' ,
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
					$('.gasub').removeClass('gasub').addClass('gasub1').attr('disabled', false);
					$('.magaImgage').attr('src' , goodsInfo.image);
					$("#linkMessageTips").html('');
					$('.gasub1').bind('click',function(){
						$.get('/garnieractivity/ajax_check_user', {} ,function(res){
							$('.gasub1').removeClass('gasub1').addClass('gasub').attr('disabled', true);
							var data = {
								gPicUrl : goodsInfo.image ,
								gPrice : goodsInfo.price , 
								gTitle : goodsInfo.title , 
								gUrl : goods_url ,
								goodsID : goodsInfo.goodsID ,
								gSouceType : 1,
								actName : 'garnier' ,
								name : res.group_name || '卡尼尔保鲜盒' , 
								group_id : res.group_id || '0'
							};
							$.get('/goods/ajax_createGarnierGoods', data ,function(res){
								$('.gasub').removeClass('gasub').addClass('gasub1').attr('disabled', false);
								var tpl = shareTmp('jifen', res)
								$('.dialogContent').html(tpl); 
								/*
									var tpl = shareTmp('posterWall', data)
									$('.goods_wall').prepend(tpl).masonry('reload');
								*/
								$('#ga_continue').bind('click', function(){
									win.drive.destroyModel();
								});
							},'json');			
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
	$('.ga').on('click' , function(){
		if(check()){
			var tpl = shareTmp('huodong');
			var html = tpl;
			win = new dialogUI({'title':'分享宝贝' , 'content':html , 'width':'650px'});
			$('.gasure').on('click',function(){
				var goods_url = $(".gaurl").val();
				if(!goods_url){
					$("#linkMessageTips span").html('请输入宝贝链接！');
					return false;
				}
				if (goods_url.indexOf('tmall.com') <= -1){
					$("#linkMessageTips span").html('请输入天猫旗舰店链接！');
					return false;
				}
				goodsAjax(goods_url);
			});
			$('.ga_select input').on('click', function(){
				var goods_url = $(this).parent().find('span').attr('gohref')
				$('.gaurl').val(goods_url);
				goodsAjax(goods_url);
			});
			$('.ga_select span').on('click', function(){
				$(this).parent().find('input').click();
			});
		}
	});
	
	
	/*share sina qzone qq*/
	var url = location.href + '?frm=garnier_hd01';
	var desc = "只要订制你的专属保鲜盒，卡尼尔全新AQUA密集保湿精华正品送给你！快来打开你的保鲜盒吧，新鲜水嫩的完美肌肤即刻拥有！";
	var title = "卡尼尔，为你打造专属保鲜盒";
	var pic = Meilishuo.config.picture_url + 'images/huodong/garnier/garnier.jpg';
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
