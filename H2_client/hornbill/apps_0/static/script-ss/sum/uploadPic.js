fml.define('sum/uploadPic' , ['jquery','component/shareTmp'] , function(require , exports){
	var $ = require('jquery');	
	var shareTmp = require('component/shareTmp');
	return function(){
		var tpl = shareTmp('uploadPicTpl');
		$('.uploadPicBox').append(tpl);
		$("#uploadFileSubmit")
		.css({"opacity":"0","position":"absolute","left":"-18px","height":"40px","-moz-transform":"scale(2)","bottom":"0px"});
		//提交上传图片
		$("#uploadFileSubmit").bind("change",function(){
			var filename = $("#uploadFileSubmit").val();
			if (!/\.(gif|jpg|png|jpeg|bmp)$/i.test(filename)) {
				alert('请上传标准图片文件, 我们支持gif,jpg,png和jpeg.');
				return false;
			}else{
				$(".up_photos").html('正在上传...');
				this.form.submit();
			}
		});
		//上传图片成功回调函数
		window.upload_callback = function(response){
		//	console.log(response)
			if(response.tooBig == '1'){
				$(".up_photos").html('选择照片文件');
				alert('图片过大，上传失败。请修改后重新上传小于2M的图片。');
				return false;
			}
			if(response.notJpg == '1'){
				$(".up_photos").html('选择照片文件');
				alert('图片格式不符合');
				return false;
			}
			if(response.tooSmall == '1'){
				$(".up_photos").html('选择照片文件');
				alert('图片太小');
				return false;
			}
			$(".up_photos").html('选择照片文件');
			$(".showImgage img").attr("src",response.pic_url).attr("id",response.pic_id);
		}
	};
});
