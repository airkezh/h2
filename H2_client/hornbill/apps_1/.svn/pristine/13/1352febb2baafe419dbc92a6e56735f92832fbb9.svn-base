/*common*/
require('wap/zepto');

/*
opts = {
	fileInput : 'fileInput' , //input id
	fileButton : 'fileButton' ,  //Button id
	appSuccess : cbk,
	webSuccess : cbk,
	appBefore : cbk,
	webBefore : cbk
}
*/

function uploadImg(opts) {
	var input = opts.fileInput;
	var $input = $('#' + input);
	var button = opts.fileButton;
	var $button = $('#' + button);
	var appSuccess = opts.appSuccess;
	var webSuccess = opts.webSuccess;
	var appBefore = opts.appBefore;
	var webBefore = opts.webBefore;

	if (Meilishuo.config.os.mlsApp) { //美丽说app
		if (!(MLS in window)) {
			window.MLS = {};
		}

		window.MLS.onUploadComplete = function(json) {
			appSuccess(json);
		}

		$input.hide();

		var jsonParams = {
			action: 'desire',
			max: 1,
			source: 'photo'
		};
		$button.show().click(function(event) {
			if(appBefore){
				appBefore();
			};

			window.location.href = 'meilishuo://upload.meilishuo?json_params=' + encodeURIComponent(JSON.stringify(jsonParams)) ;
		});

	} else { //非美丽说app

		$input.show();
		$button.hide();
		/************** 上传图片 **************/

		var uploadImg = require('wap/ui/uploadImg');
		var dataURItoBlob = require('component/dataURItoBlob');
		var opts = {
				behind: '/imageupload/pic_upload', //上传api
				success: webSuccess,
				onStart: function(cbk, $fileInput) { //开始前
					cbk()
				}
			}
			/************** 上传图片 end **************/
		var faceReader = require('wap/component/lark/fileReader');
		var inputFile = faceReader(input);

		inputFile.change(function(event) {

			if (inputFile.checkImg()) {
				inputFile.readAsDataURL(function(data) {
					if(webBefore){
						webBefore(data);
					}

					/************** 上传图片 **************/
					uploadImg(dataURItoBlob(data), opts);
					/************** 上传图片 end **************/
				})
			} else {
				alert('请选择图片哦！')
			}
		});


	}
}

return uploadImg;