fml.define('page/club/newTopic_ie' , ['jquery', 'plus/plupload', 'component/shareTmp', 'ui/alert', 'component/focus'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var alertT = require('ui/alert');
	var input = require('component/focus');
	//调整容器为article_post
	var $article_con = $('.article_post');

	var alertTip = function(content) {
		new alertT({
			content: content, 
			width: 420
		});
		$('.maga_suc').css('width', '420px');
	};

	var tool = function(){
		$article_con = $('.article_post');
		var overMaxPost = false;
		var isFirst = false;
		var hasAddPic = false;
		var uploader = new plupload.Uploader({
			runtimes : 'html5,flash,html4',
			browse_button : 'add_pic',
			container: document.getElementById('addPic_con'),
			url : '/imageupload/pic_upload',
			prevent_duplicates: true,
			filters : {
				max_file_size : '10mb',
				mime_types: [
					{title : "Image files", extensions : "jpg,gif,png"}
				]
			},
			file_data_name: 'attach',
			flash_swf_url : 'http://i.meilishuo.net/css/images/demo/Moxie.cdn.swf',

			init : {
				Error: function(up, err) {
					if(err.code == -602){
						alertTip('亲，图片' + err.file.name + '已上传，请勿重复上传 ：）');
					} else {
						var fileDom = $('#' + err.file.id);
						fileDom.parents('.item').addClass('error');
						fileDom.parents('.progress_bar').hide();
						fileDom.parents('.uploading').find('.upload_errormsg').html('图片上传失败，网络错误或者图片太大！').show();
						$('.article_toolbar').addClass('article_toolbar_load');
					}
				},
				FilesAdded : function(up, file) {
					var fileLength = file.length;
					var res = {'isPic' : true};
					overMaxPost = false;

					for(var i = 0;i<fileLength;i++){
						if(canPostNum <= 0){
							up.removeFile(file[i]);
							overMaxPost = true;
							continue ;
						}
						if ($article_con.find('.item').length == 0){
							res.hide_up = 'none_f';
						} else {
							res.hide_up = '';
							$article_con.find('.item').last().find('.arrow_down').removeClass('none_f');
						}
						var data = {'pic_title' : file[i].name, 'uppic_id' : file[i].id};
						res.data = data;
						var tpl = shareTmp('addCon', res);
						$article_con.append(tpl).find('.item').last();
						canPostNum -= 1;
					}
					up.start();
					if(overMaxPost != false){
						alertTip('亲，本次上传图片已超出上传限制，超出的图片未上传');
					}
				},
				UploadProgress : function(up, file) {
					$('#'+file.id).css({'width' : (file.percent/100*250)});
				},
				FileUploaded : function(up, file, resObj){
					var reg = /<[^>]*>/g;
					var res = resObj.response.replace(reg, '');
					res = JSON.parse(res);
					hasAddPic = $('#'+file.id).parents('.item').find('.upload').length;
					if(res.pic_id && !hasAddPic){
						var data = {
							pid : res.pic_id,
							type : 2
						}
						var tpl = shareTmp('addPicCon', res);
						var itemObj = $('#'+file.id).parents('.uploading').hide().after(tpl).parents('.item').data(data);
						input.inputFocus(itemObj.find('.desp')[0]);
						if(!isFirst){
							isFirst = true;
							itemObj.addClass('firstPic');
						}
					} else {
						var fileDom = $('#'+file.id);
						fileDom.parents('.progress_bar').hide();
						fileDom.parents('.uploading').find('.upload_errormsg').html(res.msg).show();
						fileDom.parents('.item').addClass('error').appendTo('.article_post_error');
						$article_con.find('.item').last().find('.arrow_down').addClass('none_f');
						$article_con.find('.item').first().find('.arrow_up').addClass('none_f');
					}
					$('.article_toolbar').addClass('article_toolbar_load');
				},
				UploadComplete : function() {
					var firstPic = $('.firstPic');
					$('.editor').removeClass('editor');
					firstPic.find('textarea').addClass('editor').focus();
					firstPic.removeClass('firstPic');
					isFirst = false;
				}
			}
		});

		uploader.init();
		window.setTimeout(function(){
			uploader.refresh();
		}, 100);

		//删除上传item
		$('.article_post, .article_post_error').on('click', '.cl_i_close', function(){
			var itemDiv = $(this).parents('.item');
			var itemIndex = itemDiv.index();
			var maxIndex = $('.article_post').find('.item').length;
			canPostNum += 1;
			if(itemDiv.find('.editor').length){
				$('.content').addClass('editor');
			}
			if(itemIndex == 0){
				itemDiv.next().find('.arrow_up').addClass('none_f');
			} else if (itemIndex == (maxIndex-1)){
				itemDiv.prev().find('.arrow_down').addClass('none_f');
			}
			if(itemDiv.find('.upload_percentage').length > 0){
				var fileId = itemDiv.find('.upload_percentage').attr('id');
				uploader.removeFile(fileId);
			}
			maxIndex += $('.article_post_error').find('.item').length;
			if(maxIndex == 1){
				$('.article_toolbar').removeClass('article_toolbar_load');
			}
			itemDiv.remove();
		});
	}
	exports.tool = tool;
});
