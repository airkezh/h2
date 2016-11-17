fml.define('page/demo/plupload' , ['jquery' , 'plus/plupload'] , function(require , exports){
	$ = require('jquery');
	$('#uploader').pluploadQueue({
		url : '/aj/up',
		filters : [
			{title : "Image files", extensions : "jpg,gif,png"}
		],
		max_file_size : '10mb',
		multiple_queues : true,
		rename: true,
		resize: { width: 320, height: 240, quality: 90 },
		flash_swf_url : 'http://i.meilishuo.net/css/images/demo/Moxie.swf',
		init : {
			Error: function(up, err) {
				console.log("\nError #" + err.code + ": " + err.message);
			},
			UploadProgress : function(up, file) {
				if(file.percent == 100){
					console.log(1);
				}
			},
			FileUploaded : function(up, file){
				var user_id = 7580550;
				var url = '/aj/getUser/';
				var data = {'user_id' : user_id , 'ajax' : 1};
				var callback = function(response){
					console.log(file.name);
				}
				$.get(url , data , callback , 'json');
			}
		}
	});
});