/*common*/
require('wap/zepto');

//参数说明
// facePlusPlus(imgUrl,successFn,errorFn,successFnParam);
// imgUrl : 必填  图片的url地址;
// successFn : 必填  facePlusPlus接口请求成功后的回调函数;
// errorFn : 选填  facePlusPlus接口请求出错后的回调函数;
// successFnParam : 选填  为successFn传递的参数;

//参考文档
//http://demo.fexot.meiliworks.com/facepp/detect.html
//http://www.faceplusplus.com/detection_detect/


var facePlusPlus = function (imgUrl,successFn,errorFn,successFnParam){
    $.ajax({
        'url' : 'http://apicn.faceplusplus.com/v2/detection/detect'
        ,'dataType': "jsonp"
        ,'data' : {
            'api_key' : 'c50579ed735edc566adb52c070768eab'
            ,'api_secret' : '1sE-VDpLBL9jCX52vOm0PmWnylHLqRTn'
            ,'url' : imgUrl
            ,'attribute' : 'gender,age'
            //,'attribute' : 'glass,pose,gender,age,race,smiling'
        }
        ,'success' : function(result){
            if($.isFunction(successFn)){
            	successFnParam?successFnParam:null;
                successFn(result,successFnParam);
            }
        }
        ,'error' : function(err) {
            if($.isFunction(errorFn)){
            	errorFn(err);
            }
        }
    })
}
return  facePlusPlus;



