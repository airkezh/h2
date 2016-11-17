fml.define('wap/page/help/feedback' , ['wap/jquery.mobile'] , function(require , exports){

	///var Alert = require('wap/ui/alert');


	var oBox = document.getElementById('box');
	var aSpan = oBox.getElementsByTagName('span');
	var sName = '';

	for(var i=0; i<aSpan.length; i++){
		aSpan[i].onclick = function(){
			for(var i=0; i<aSpan.length; i++){
				aSpan[i].className = ''

			}
			this.className = 'active';
			sName = this.innerHTML;
		}	
	}

	var oContent = document.getElementById('content');
	var oBtn = document.getElementById('submit');
	var oSum = document.getElementById('sum');
	var num = 0; 
	oContent.onkeyup = function(){
		var res = this.value;
		num = res.length;
		oSum.innerHTML = num + '/100';
	}

	
	var oUl = document.getElementById('ulbox');
	var oMax = 9;
	var oBtnLoad = $('.btn_load');


	//上传
	oBtnLoad.on("click", function() {
		var len = oUl.children.length;
        if(len >= oMax){
        	alert('最多只能上传'+oMax+'张呦');
			return false;
        };

        var res = oMax - len;
		var jsonParams = '{"action":"desire", "max":'+res+',"source":"photo"}';
		$(this).attr('href','meilishuo://upload.meilishuo?json_params=' + encodeURIComponent(jsonParams));

		window.MLS = {
	        onUploadComplete : function(json) {
	            //美丽说app 成功上传图片，回调
	            var json = JSON.parse(json);
	            var arr = json.pictures;            
	            for(var i=0; i<arr.length; i++){
	            	var obj = arr[i];
	            	var oli = document.createElement('li');
	            	oli.innerHTML = '<a href="javascript:;"><img class="upImg_img" src="'+obj.o_pic_url+'" /><b></b></a>';
	            	oUl.appendChild(oli);
	            }
	      		


				$('.upImg_img').on('load',function(){
	                imgVerticalCenter(); //图片垂直居中
	                
	            })

				//删除
				var aLi = oUl.getElementsByTagName('li');
				for(var i=0; i<aLi.length; i++){
					aLi[i].onclick = function(){
						oUl.removeChild(this);
					}
				}

	            
	        }
	    }
	});
	
	
    oBtn.onclick = function(){
    	if(sName  ==  ''){
    		alert('为选择意见类型呦');
    	}
    	//callFace(mypic_url)
    };

});
