fml.define('app/sharePicture' , ['jquery' , 'ui/dialog' ,'app/closeWindow' , 'app/login' , 'app/magazine' , 'component/urlHandle' , 'app/sharePost'] , function(require , exports){
	var $ = require('jquery');
	var login = require('app/login');
	var magazine = require('app/magazine');
	var dialog = require('ui/dialog');
	var urlHandle = require('component/urlHandle');
	var sharePost = require('app/sharePost');
	var closeWindow = require('app/closeWindow');
	return function(){
		if(Meilishuo.config.user_id == 0){
			login.showGoodsLoginWin('default');
			$("#waitFor").hide();
			$('#maskLayer').remove();
			var left = parseInt($('#dialogLayer').css('left'));
			$('#dialogLayer').css({'top':'60px','margin-left':'auto','margin-right':'auto', 'width':'500px', 'left':left-50+'px'}).find('#closeDialog').hide();
			$('.small_qq').removeAttr('target');
			$('.small_sina').removeAttr('target');
			return;
		}
		var href = window.location.href;
		if (window.name.indexOf('_blank') == 0) window.name = '';	//hack for chrome
		if (window.name.indexOf('meilishuo.com') == 0) window.name = '';	//hack for add/tracking
		if (window.name == '') window.name = href;
		else if (href.indexOf('picurl=') == -1) href = window.name;
		$('.logout').attr('href', '/users/logout?r='+encodeURIComponent(href.substr(0, href.indexOf('?'))));
		var query = urlHandle.getUrl(href);
		if (!query.picurl) {
			alert('图片地址参数不能为空!!!');
			closeWindow();
			return;
		}
		if(typeof String.prototype.trim !== 'function') {
			String.prototype.trim = function() {
				return this.replace(/^\s+|\s+$/g, '');
			}
		}
		var location = encodeURIComponent($.trim(query.siteurl));
		var url = '/aj/twitter/pick';
		var data = {'url' : query.picurl, 'refer' : location};
		var callback = function(response){
			$("#waitFor").hide();
			if(response.code){
				alert('抓取图片失败') ;
				closeWindow();
				return;
			}
			var uploadPanel = $(".forwardMagazin").show();
			var shareDialog = new dialog({title : "分享到美丽说" , content : '<div class="add_share_goods"></div>' , onClose : function(){
				windowclose();
			}});
			magazine();
			if (response.data.site_short_url) location = response.data.site_short_url;
			var con = ' >>> ' + location;
			if (query.content && query.content != '')
				con = query.content + con;
			$("#forwardContent").val(con);
			$('.share_published').remove();
			$('#dialogLayer').css({'top':'60px','margin-left':'auto','margin-right':'auto','position':'static'}).find('#closeDialog').hide();
			$(".magaImgage").attr("src",query.picurl);
			shareDialog.drive.overlay.destroy();
			var dialogShow = sharePost.dialogShow;
			dialogShow();
			response.source = 'button';
			dialogShow.picForUpload(response);
		}
		$.get(url , data , callback , 'jsonp');
	}
});
