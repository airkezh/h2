fml.define('app/clubAction', ['app/clubApi', 'jquery', 'ui/confirm', 'app/checkLogin', 'ui/alert'], function(require, exports){
	var $ = require('jquery');
	var clubApi = require('app/clubApi').clubApi;
	var confirmDia = require('ui/confirm');
	var check = require('app/checkLogin');
	var alert = require('ui/alert');

	var confirmFun = function(text, cbk) {
		new confirmDia({
			content : text,
			width : 370,
			isOverflow : true
		}).onSure(cbk);
	}

	var alertTip = function(content) {
		new alert({
			content: content, 
			width: 370
		});
	}

	exports.uploadPic = function(pObj, cbk, preCbk) {
		var $picUpload = $(
			'<div class="club_imgupload">' +
				'<form method="post" enctype="multipart/form-data" action="/imageupload/pic_upload" target="picture_upload_iframe">' +
					'<input type="file" size="20" name="attach" class="upload_file pa_f" style="z-index:99; filter:alpha(opacity=0); opacity:0; cursor:pointer;" />' +
					'<input type="hidden" name="ajax" value="1" />' +
					'<input type="hidden" name="domain" value="0" />' +
				'</form>' +
				'<iframe src="about:blank" id="picture_upload_iframe" name="picture_upload_iframe" style="display: none;"></iframe>' +
			'</div>'
		);
		var $uploadForm = $picUpload.find('form');
		var $uploadFile = $picUpload.find('.upload_file');
		$(pObj).append($picUpload);
		$uploadFile.click(function(){
			if (!check()) return false;
			$uploadFile.change(uploadFn);
		});
		function uploadFn(){
			preCbk();
			var filename = $(this).val();
			// validate file extension
			if (!/\.(gif|jpg|png|jpeg|bmp)$/i.test(filename)) {
				$(this).val();
				showMessage('请上传标准图片文件, 我们支持gif,jpg,png和jpeg.');
				return false;
			}
			$uploadForm.submit();
		}
		var up_iframe = document.getElementById('picture_upload_iframe');
		var upload_cbk = function(res){
			if (this.readyState && this.readyState != 'complete') return;
			var iframe = up_iframe.contentDocument || up_iframe.contentWindow.document;
			var res = iframe.body.innerHTML.replace(/<.*?>/g,'').replace('&amp;', '&');
			if(!res) return;
			res = $.parseJSON(res);
			cbk(res);
		}
		up_iframe.attachEvent ? up_iframe.attachEvent('onload', upload_cbk) : up_iframe.onload = upload_cbk;
	}

	exports.clubLikeHover = function(obj, pObj) {
		$(pObj).on('mouseenter', obj, function(){
			if ($(this).attr('uid') == Meilishuo.config.user_id) {
				$(this).parents(pObj).find('.love_pro').show()
			}
		}).on('mouseleave', obj, function(){
			if ($(this).attr('uid') == Meilishuo.config.user_id) {
				$(this).parents(pObj).find('.love_pro').hide()
			}
		})
	}

	exports.clubLike = function(obj, pObj){
		$(pObj).on('click', obj, function(){
			if ($(this).attr('uid') == Meilishuo.config.user_id) return;
			if (!check()) return false;
			var data = {
				'aid' : $(this).attr('aid')
			}
			clubApi('like', data);
			var $likeNum = $(this).find('em').last();
			var num = parseInt($likeNum.text()) || 0;
			var isLiked = $(this).find('.cl_love').length > 0;
			if(isLiked) {
				num--;
				$(this).find('.cl_love').removeClass().addClass('cl_unlove');
			} else {
				num++;
				$(this).find('.cl_unlove').removeClass().addClass('cl_love');
			}
			$likeNum.html(num||'');
		});
	};

	exports.replyDelete = function(obj, pObj, delObj){
		$(pObj).on('click', obj, function(){
			if (!check()) return false;
			var _self = this;
			var cbk = function() {
				var data = {
					'aid' : $(_self).attr('aid')
				}
				$(_self).parents(delObj).remove();
				clubApi('delete', data);
			}
			confirmFun('确定要删除？', cbk);
		});
	};

	exports.topicDelete = function(obj){
		$(obj).click(function(){
			if (!check()) return false;
			var _self = this;
			var cbk = function() {
				var data = {
					'aid' : $(_self).attr('aid')
				}
				var clubCbk = function(res){
					if(res.code == 0) {
						location.href = '/club/';
					} else {
						alertTip('删除失败');
					}
				}
				clubApi('delete', data, clubCbk);
			}
			confirmFun('确定要删除？', cbk); 
		})
	};

	exports.replyComment = function(obj, pObj){
		$(pObj).on('click', obj, function(){
			var tContent = $.trim($(this).parents('.reply_box').find('textarea').val());
			if (tContent.length == 0) {
				alertTip('评论不能为空哦~~');
				return;
			}
			var tid = {
				'type' : 5,
				'tContent' : tContent
			}
			var data = {
				'said' : Meilishuo.config.aid,
				'paid' : $(this).attr('aid'),
				'tids' : [tid]
			}
			clubApi('reply', data, function(res){
				if (res && res.code) {
					alertTip(res.msg);
					return;
				}
				location.href = location.href.split('#reply')[0];	
			});
		});
	}
})
