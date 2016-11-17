/*
	for商业活动上传图片
	arguments:
	@re_upload —— 重新上传的样式
	@container —— 图片上传父div节点（可能存在多个同时上传照片）
	@callback —— 回调
*/
fml.define('app/uploadPhoto', ['jquery', 'app/izoom', 'app/checkLogin'], function(require, exports){
	var $ = require('jquery');
	var izoom = require('app/izoom');
	var check = require('app/checkLogin');

	var container, callback, getFile;

	var _afterUpload = function() {
		var $container = $(container);

		var $upload_area = $container.find('.upload_area'),
		$preview = $container.find('.preview');

		if (this.readyState && this.readyState != 'complete') return;
		var iframe = getFile.contentDocument || getFile.contentWindow.document;
		var res = iframe.body.innerHTML.replace(/<.*?>/g,'');
		if(!res) return;
		res = $.parseJSON(res);
		if(res.code) {
			alert(res.msg);
			return;
		}
		if (res.pic_url) {
			$preview.attr({'src': res.pic_url}).show();
			_setImgData($preview, $container);
			var reload = $upload_area.attr('re_upload') || '';
			$upload_area.addClass(reload);
			izoom.init(container, '.preview');

			if(callback) callback();
		} else {
			if(res.content)
				alert(res.content);
		}
	}
	
	function _setImgData($img, $container) {
		var img = new Image;
		img.onload = function() {
			var data = {
				'sourceWidth': this.width,
				'sourceHeight': this.height,
				'resultWidth': $container.width(),
				'resultHeight': $container.height()
			}
			$img.data(data);
		}
		img.src = $img[0].src;
	}

	function init(obj, cbk) {
		if(typeof obj == 'function') {
			cbk = obj;
			obj = '';
		}
		container = obj ? obj : '.upload_wraper';
		callback = cbk;

		var $container = $(container);
		var $attach_photo = $container.find('.attach_photo');
		var $upload_pho = $container.find('.upload_pho');
	
		$attach_photo.on('click', function(){
			if (!check()) return false;
		}).on('change', function(){
			$upload_pho.submit();
		})

		getFile = $container.find('.upload_iframe')[0];
		if (getFile) {
			getFile.attachEvent ? getFile.attachEvent('onload', _afterUpload) : getFile.onload = _afterUpload;
		}
	}

	function getImgData(container) {
		container = container ? container : '.upload_wraper';
		var $preview = $(container).find('.preview');
		var data = {
			'scale': $preview.width()/$preview.data().sourceWidth,
			'scaleWidth': $preview.width(),
			'scaleHeight': $preview.height(),
			'top': $preview.css('top').replace('px', ''),
			'left': $preview.css('left').replace('px', '')
		}
		return $.extend(data, $preview.data());
	}

	function destory(index){

	}

	exports.init = init;
	exports.getImgData = getImgData;
});
