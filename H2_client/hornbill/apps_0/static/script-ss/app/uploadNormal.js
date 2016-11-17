/*
	for商业活动上传图片
	arguments:
	@re_upload —— 重新上传的样式
	@container —— 图片上传父div节点（可能存在多个同时上传照片）
	@callback —— 回调
*/
fml.define('app/uploadNormal', ['jquery' , 'app/checkLogin'], function(require, exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');

	var container, callback, getFile;

	var _afterUpload = function() {
		var $container = $(container);

		var $upload_area = $('.upload_area'),
		$preview = $('.preview');

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
			var reload = $upload_area.attr('re_upload') || '';
			$upload_area.addClass(reload);

			if(callback) callback();
		} else {
			if(res.content)
				alert(res.content);
		}
	}
	
	function init(obj, cbk) {
		if(typeof obj == 'function') {
			cbk = obj;
			obj = '';
		}
		container = obj ? obj : '.upload_wraper';
		callback = cbk;

		var $container = $(container);
		var $attach_photo = $('.attach_photo');
		var $upload_pho = $('.upload_pho');
	
		$attach_photo.on('click', function(){
			if (!check()) return false;
		}).on('change', function(){
			$upload_pho.submit();
		})

		getFile = $('.upload_iframe')[0];
		if (getFile) {
			getFile.attachEvent ? getFile.attachEvent('onload', _afterUpload) : getFile.onload = _afterUpload;
		}
	}

	function destory(index){

	}

	exports.init = init;
});
