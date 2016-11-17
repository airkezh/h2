/*common*/
var uploadBtn = require('wap/component/uploadBtn');
uploadBtn.bind('.upload_btn' , {
    'behind' : '/image/upload'
    ,'success' : function(data,obj){debugger;
    	datas = {
            'image_id':data.data.image_id
        }
        //TODO
    }
    ,'error' : function(a){
    	alert('系统错误，上传失败');
    }
});