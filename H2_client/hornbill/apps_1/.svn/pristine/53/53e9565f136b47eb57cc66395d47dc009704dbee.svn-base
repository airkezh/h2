/*common*/

var facePlusPlus = require('wap/component/lark/facePlusPlus');

// facePlusPlus(imgUrl,successFn,errorFn,successFnParam);
// imgUrl : 必填  图片的url地址;
// successFn : 必填  facePlusPlus接口请求成功后的回调函数;
// errorFn : 选填  facePlusPlus接口请求出错后的回调函数;
// successFnParam : 选填  为successFn传递的参数;

function successFn(result,param){
	console.log(result);
	var ret = [];
        result.face.forEach(function(face){
            ret.push('gender:'+face.attribute.gender.value+';  age :'+ face.attribute.age.value);
        });
    var faceData = ret.length?ret.join('<br />'):'no face data';
    var $this = param;
    $this.parent().siblings('.text').html(faceData);
};

function errorFn(data){
	console.log(data);
	console.log('error');
};

var imgUrlNull = ''
	,imgUrlNoimg = 'http://m.meilishuo.com'
	,imgUrl0  = 'http://d05.res.meilishuo.net/pic/_o/ed/b0/a0025c00a82b08307b33e7e558bb_1024_681.cf.jpg'
	,imgUrl1  = 'http://d04.res.meilishuo.net/pic/_o/7a/76/dda50cf3f0eeb59a8e6f6ec6be02_1500_1000.ch.jpg'
	,imgUrl2  = 'http://d01.res.meilishuo.net/pic/_o/7d/cb/bc81617a91d029f8cae5c86b971f_1600_977.cg.jpg';

$('#butNull').click(function(){
	facePlusPlus(imgUrlNull,successFn,errorFn,$(this));
});

$('#butNoimg').click(function(){
	facePlusPlus(imgUrlNoimg,successFn,errorFn,$(this));
});

$('#but0').click(function(){
	facePlusPlus(imgUrl0,successFn,errorFn,$(this));
});

$('#but1').click(function(){
	facePlusPlus(imgUrl1,successFn,errorFn,$(this));
});

$('#but2').click(function(){
	facePlusPlus(imgUrl2,successFn,errorFn,$(this));
});



