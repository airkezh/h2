/*common*/
require('wap/zepto');

var faceReader = require('wap/component/lark/fileReader');

var inputFile = faceReader('inputFile');

inputFile.change(function(event) {
	
	if(inputFile.checkImg()){
		inputFile.readAsDataURL(function(data){
			$('#img1').attr('src',data);
		})
	}else{
		alert('请选择图片哦！')
	}
});

