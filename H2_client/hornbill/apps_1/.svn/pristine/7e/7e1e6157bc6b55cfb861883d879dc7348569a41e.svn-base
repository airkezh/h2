/*common*/
require('wap/zepto');


if( !Meilishuo.config.os.mlsApp ){

	/************** 上传图片 **************/

	var uploadImg = require('wap/ui/uploadImg');
	var dataURItoBlob = require('component/dataURItoBlob');
	var opts = {
	    behind:'/imageupload/pic_upload' //上传api
	    , success:function(data,$fileInput){//成功后
	        console.log(data);
	        var pic_url = data.o_pic_url;
	        $('#img2').attr('src',pic_url);
		}
	    , onStart:function(cbk,$fileInput ){//开始前
	        cbk()
	    }
	}
	/************** 上传图片 end **************/



	var faceReader = require('wap/component/lark/fileReader');

	var inputFile = faceReader('inputFile');

	inputFile.change(function(event) {
		
		if(inputFile.checkImg()){
			inputFile.readAsDataURL(function(data){
				$('#img1').attr('src',data);

				/************** 上传图片 **************/
				uploadImg(dataURItoBlob(data), opts);
				/************** 上传图片 end **************/
			})
		}else{
			alert('请选择图片哦！')
		}
	});

}else{
	
	window.MLS = {

        onUploadComplete : function(json) {
            //美丽说app 成功上传图片，回调
            var obj = JSON.parse(json);
            var pic_url = obj['pictures'][0]['o_pic_url'];
            alert('upload ok');
            $('#img1').attr('src',pic_url);
            
        }
    }

	$("#inputFile").hide();

    var jsonParams = '{"action":"desire", "max":1, "source":"photo"}';
    $("#fileA").show()
        .attr('href','meilishuo://upload.meilishuo?json_params='+encodeURIComponent(jsonParams));

}



