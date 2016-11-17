fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'heart' : query.heart || 0,
		'actName' : 'disney'
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/haibao_wall', {'subScroll': '.len_fixheight'});
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
});

fml.define('page/huodong/disney', ['jquery', 'ui/dialog', 'app/userApi', 'component/shareTmp', 'app/uploadPhoto', 'app/shareTo', 'component/regString', 'app/checkLogin', 'component/waterfall', 'app/tracking'], function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var upload = require('app/uploadPhoto');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var pin = require('component/waterfall');
	var regString = require('component/regString');
	var check = require('app/checkLogin');
	var logTrack = require('app/tracking');
	var userApi = require('app/userApi').userApi;
	var isImgLoad = false;
	var isGoodsGet = false;
	var oldGoodsUrl = '';

	//活动介绍
	$('#activityInfo').on('click' , function(){
		var tpl = shareTmp('activityIntro');
		var html = tpl;
		var disney_dia = new dialogUI({ 
			'content':html , 
			'width': '769px' ,
			'onStart':function(){
				$('#overlay').addClass('overblack');
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			},
			'onClose' : function(){
				$('#overlay').removeClass('overblack');	
			}
		});
		$('#dialogContent, #zeroFolDiaLayer, #dialogLayer, .dialogLayer').css({'background' : 'none','filter': 'none'});
		$('#close_btn1').on('click', function(){
			disney_dia.drive.destroyModel();
		});
		logTrack.cr('disney', {'frm': 'activityIntro'});
	});

	//图片长传
	upload.init(function(){
		alert('123')
		$('.imgUpload').addClass('uploading');
		logTrack.cr('disney', {'frm': 'imageUpload'});
	});
	//隐藏input(file)，模拟点击事件
	$('.photoFrame').click(function(e){
        e.preventDefault();
        $(this).offsetParent().find('.attach_photo').click();}
    );
	$('#upsure').click(function() {
		isImgLoad = true;
		$(this).parent('.imgUpload').removeClass('uploading');
	});

	//拾宝器
	var isAjaxLoad = true;
	var goodsInfo = {};
	var goodsAjax = function(goods_url) {
		var url = '/aj/twitter/fetch';
		var data = {
			'url': goods_url,
			'ajax': 1
		};
		var callback = function(response){
			if(response == 2){
				$("#linkMessageTips").html("<span>该店铺涉嫌作弊，已经被美丽说封禁了，请MM逛逛别家的宝贝再来分享吧~</span>");
			}else{
				if(response.error_code == 0){
					var goodsData = response.data.gInfo;
					goodsInfo.catalog_name = goodsData.catalog_name;
					goodsInfo.image = goodsData.image;
					goodsInfo.picUrls = goodsData.picUrls;
					goodsInfo.price = goodsData.price;
					goodsInfo.title = goodsData.title;
					goodsInfo.goodsID = goodsData.goodsID;
					//阅览宝贝
					oldGoodsUrl = $('.goodsPreview').attr('src');
					$('.goodsPreview').attr('src', goodsInfo.image);
					$('.goodsLink').hide();
					//宝贝信息获取成功，提交可点
					$("#linkMessageTips").html("<span>获取成功</span>");
					isGoodsGet = true;
				}else{
					if (typeof response.code != 'undefined') {
						$("#linkMessageTips").html('<span>' + response.msg + '</span>');
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
				$("#linkMessageTips").html('<span>提交中...</span>');
				$.post(url, data, callback, 'json');
				isAjaxLoad = false;
			}else{
				$("#linkMessageTips").html('<span>宝贝链接好像不对哦，换一个试试看</span>');
			};
		};
	}
	$('.preBtn').on('click',function(){
		if(!check()) return;
		logTrack.cr('disney', {'frm': 'preBtn'});
		var goods_url = $("#goodsUrl").val();
		if(goods_url == ''){
			return alert('您还没有添加链接。')
		}
		if (goods_url.indexOf('detail.tmall.com/') <= -1){
			$("#linkMessageTips span").html('无法获取宝贝信息，请检查链接是否正确，重新尝试。');
			return false;
		}
		goodsAjax(goods_url);
	});

	//确认分享
	$('#subBtn').on('click', function(){
		var imgUrl = $('.preview').attr('src');
		if(!isImgLoad || !isGoodsGet){
			return alert('亲，不要心急哦，一步一步才能得到大奖！');
		}
		logTrack.cr('disney', {'frm': 'subBtn'});
		if($('.followSina input')[0].checked){
			userApi('follow', {fuid: 53227977}, function(){});
		}

		//将上传的图片分享至个人首页并在瀑布流中添加
		var url = '/aj/huodong/create_disney';
		var data = {
			'actName' : 'disney',
			'src' : imgUrl,
			'type' : 'upload'
		};
		data = $.extend(data, upload.getImgData());
		$.post(url, data, function(r){
			if (!r) return;
			$.get('/aj/huodong/single_haibao', {'actName': 'disney','times' : 1}, function(res){
				if ((!res || res.code) && res.data) return;
				var tpl = shareTmp('posterWall', res.data);
				pin.prepend(tpl);
			}, 'json');
			imgUrl = r;
		});

		data = {
			'actName' : 'disney',
			'src' : goodsInfo.image,
			'type' : 'product',
			'goodsID' : goodsInfo.goodsID
		};
		$.post(url, data, function(r){
			if (!r) return;
			$.get('/aj/huodong/single_haibao', {'actName': 'disney','times' : 2}, function(res){
				if ((!res || res.code) && res.data) return;
				var tpl = shareTmp('posterWall', res.data);
				pin.prepend(tpl);
			}, 'json');
		});

		//完成两步确认分享
		var tpl = shareTmp('joinActivity');
		var html = tpl;
		var disney_dia = new dialogUI({ 
			'content':html , 
			'width': '637px' , 
			'onStart':function(){
				$('#overlay').addClass('overblack');
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			},
			'onClose' : function(){
				$('#overlay').removeClass('overblack');	
			}
		});
		$('#dialogContent, #zeroFolDiaLayer, #dialogLayer, .dialogLayer').css({'background' : 'none','filter': 'none'});
		$('#close_btn2').on('click' , function(){
			disney_dia.drive.destroyModel();
		});

		$('#getVote').on('click', function(){
			disney_dia.drive.destroyModel();
			$("html,body").animate({scrollTop:($(".posterWrap").offset().top-55)}, 500);
			logTrack.cr('disney', {'frm': 'getVote'});
		});

		//分享到新浪.
		$('.share_sina').on('click' , function(){
			var s_url = location.href + '?frm=disney05';
			var s_desp = '我在参加美丽说和迪士尼联合发起的“随手晒身边的小公主”活动，参与即可获得迪士尼各种惊喜奖品，更有香港迪士尼乐园套票免费赢！活动地址:' + s_url;
			var s_img = imgUrl;
			share.shareToWeibo(s_url, s_desp, s_img);
			disney_dia.drive.destroyModel();
			logTrack.cr('disney', {'frm': 'shareSina'});
		});

		//上传还原
		isImgLoad = false;
		isGoodsGet = false;
		$('.goodsPreview').attr('src', oldGoodsUrl);
		$('.goodsLink').show();
		$('#linkMessageTips').html('');
		$('#goodsUrl').val('');
		$('img.preview').css({'display':'none'});
	});

	//track信息
	$('.goodsLink').click(function(){
		logTrack.cr('disney', {'frm': 'goodsLink'});
	});
});

	
