fml.define('app/pickGoods' , ['jquery' , 'ui/dialog' , 'app/closeFrame' , 'app/login' , 'app/magazine' , 'component/urlHandle' , 'app/sharePost'] , function(require , exports){
	var $ = require('jquery');	
	var login = require('app/login');   
	var magazine = require('app/magazine');
	var dialog = require('ui/dialog');
	var urlHandle = require('component/urlHandle');
	var sharePost = require('app/sharePost');
	var closeIframe = require('app/closeFrame');
	return function(){
		if(Meilishuo.config.user_id == 0){
			login.showGoodsLoginWin();	
			$("#waitFor").hide();
		}else{
			var query = urlHandle.getUrl(window.location.href);
			var mlstype = query.mlstype || '';
			if(mlstype == 'goods'){
				var close = new dialog({title : "分享" , content : '<div class="add_share_goods"><div id="linkMessageTips"></div></div>' , onClose : function(){
					closeIframe();
					if (document.referrer.indexOf('meilishuo_share') > -1) window.close();	//for share api
				}});
				var goods_url = query.mlsurl;
				var dialogShow = sharePost.dialogShow;
				dialogShow();
				dialogShow.goodsAjax(goods_url , {'pickup' : 3}, closeIframe);
				$("#waitFor").hide();
			}else if(mlstype == 'twitter'){
				var location = query.location;
				var url = '/aj/twitter/pick';
				var data = {'url' : query.picurl, 'refer' : location};
				var callback = function(response){
					$("#waitFor").hide();
					if(response.code){ 
						alert('抓取图片失败') ;
						closeIframe();
						return;
					}
					var uploadPanel = $(".forwardMagazin").show();
					new dialog({title : "分享" , content : '<div class="add_share_goods"></div>' , onClose : function(){
						closeIframe();
					}});
					magazine();
					$(".magaImgage").attr("src",query.picurl);
					var dialogShow = sharePost.dialogShow;
					dialogShow();
					response.source = 'pickup';
					dialogShow.picForUpload(response);
				}
				$.get(url , data , callback , 'jsonp');
			}
		}
	}	
});
