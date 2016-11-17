define('ht/app/batch-table', ['jquery', 'tcal', 'ui/dialog', 'ui/alert', 'component/shareTmp'],function(require, exports, module) {
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var alert = require('ui/alert');

	var alertTip = function(content, cbk) {
		cbk = cbk || function(){};
		new alert({
			content: content, 
			width: 370,
			onClose: cbk
		});		
	}

	$('.batchUploadBtn').on('click', function(){
		new dialog({
			title : "批量发货" 
			, width : 430
			, content : shareTmp('batchUploadWin')
		});
	})
	$("#uploadFileSubmit").live("change",function(){
		var filename = $("#uploadFileSubmit").val();
		if (!/\.(xlsx|xls)$/i.test(filename)) {
			alertTip('请上传Excel文件');
			return false;
		}else{
			$(".up_photos").hide();
			$(".up_photosing").show()
			this.form.submit();
		}
		//上传图片成功回调函数
		var up_iframe = document.getElementById('getUploadFile');
		var upload_cbk = function(){
			if (this.readyState && this.readyState != 'complete') return;
			$(".up_photos").show();
			$(".up_photosing").hide();
			var iframe = up_iframe.contentDocument || up_iframe.contentWindow.document;
			var res = iframe.body.innerHTML.replace(/<.*?>/g,'').replace('&amp;', '&');
			if(!res) return;
			res = $.parseJSON(res);
			if(res.result == '0'){
				alertTip(res.data.errorMsg);
				$("#uploadFileSubmit").val('');
				$("#submitExcel")[0].reset();
				return false;
			}
			new dialog({
				title : "批量发货" 
				, width : 240
				, content : shareTmp('batchUploadResult', {data:res.data})
			});
		}
		up_iframe.attachEvent ? up_iframe.attachEvent('onload', upload_cbk) : up_iframe.onload = upload_cbk;
	});
})

