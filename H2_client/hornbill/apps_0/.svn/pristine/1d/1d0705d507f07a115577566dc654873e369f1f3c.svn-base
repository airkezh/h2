/*common*/
var $ = require('wap/zepto')
var openApp = require('wap/app/openApp')
var Alert = require("wap/ui/alert")
var share = require('wap/app/lark/wxShare')


var a = function(msg, callback) {
    return new Alert({
        content: msg,
        onSure: function() {
            callback && callback();
        }
    });
};

var $wrap = $('.wrap')
	,$input = $wrap.find('input')
	,$wrapEnd = $('.wrap-end')
	,$wrapStart= $('.wrap-start')
	,$start = $('.start')
	,iStart = false
	,arr = []
	,val 
	,hash
	,checkL
	,href
	,answer = {
     	'1A5A':'5501',
     	'1A5B':'5393',
     	'1A5C':'4975',
     	'1A5D':'5455',
     	'1B5A':'4707',
     	'1B5B':'4397',
     	'1B5C':'5429',
     	'1B5D':'4325',
     	'1C5A':'4707',
     	'1C5B':'4451',
     	'1C5C':'5429',
     	'1C5D':'4411',
     	'1D5A':'4325',
     	'1D5B':'4397',
     	'1D5C':'4451',
     	'1D5D':'4411'
     }

var opt = {
    'img_url' : Meilishuo.config.picture_url + '/images/wap/web/sq/share_logo.jpg',
    'link' : 'm.meilishuo.com/wx/surveyStart',
    'title' : '开年福利—时尚顾问测试',
    'desc' : '时尚顾问搞定你的私人衣橱！测试开始！',
    'appid' : 'wx28b165b5a629bb11',
    'img_width' : '600',
    'img_height': '600'
}
share.init(opt)


hash=(!window.location.hash)?"#index-1":window.location.hash; 
window.location.hash=hash;

if(hash){
	$('#index-1').show();
}

$wrap.on('tap','.next',function(){	
	isChecked($(hash))
})

$wrapStart.on('tap','.start',function(){	
	$.post("/aj/activity/wx_sur_start", null, function(res) {
			// a(JSON.stringify(res))
	         if(res.feedback == 0){
	        	window.location.href='/wx/survey#index-1'
	         }else if(res.feedback == -1){
	   			window.location.href='/wx/surveyEnd?arr='+res.info
	         }
	    }, "json");
})
function isChecked(selector){
	checkL = selector.eq(0).find('input:checked').length
	if(checkL == 0){
		a('请选择内容！')
	}else{
		hash = window.location.hash
		Whash(hash)
	}
}

// console.log(arr)

function Whash(hash){
	switch(hash){
		case '#index-2':
			$('#index-1').hide();
			$('#index-2').show();
		break;
		case '#index-3':
			$('#index-2').hide();
			$('#index-3').show();
		break;
		case '#index-4':
			$('#index-3').hide();
			$('#index-4').show();
		break;
		case '#index-5':
			$('#index-4').hide();
			$('#index-5').show();
		break;
	}
}



$wrap.on('tap','.wrap input',function(){
	for(var i = 0; i < $input.length; i ++){
		if($input[i].checked){
			$input.eq[i].attr('checked', 'checked')
		}	
	}
})

$wrap.on('tap','.last',function(){
	checkL = $('#index-5').eq(0).find('input:checked').length
	if(checkL == 0){
		a('请选择内容！')
	}else if(!iStart && checkL != 0){
		// iStart = true
		var $check = $('.wrap input:checked')
		for(var i = 0 ; i < $check.length; i++){
			val = $check.eq(i).val()
			arr.push(val)
		}
		$.post("/aj/activity/wx_survey?quiz_result="+ arr, null, function(res) {
	         if(res.feedback == 1){
	        	window.location.href='/wx/surveyEnd?arr='+arr
	         }else{
	         	a('您已经提交过，请勿重复提交！')
	         }
	    }, "json");
	}
})

function openUrl(href){
	if (!Meilishuo.config.os || !Meilishuo.config.os.mlsApp) {
		openApp(href, "http://mapp.meilishuo.com/download/latest/?channel=30902");
	}
}

$wrapEnd.on('tap','.pro',function(){
	result	= fml.vars.arr1 + fml.vars.arr5;
	href="http://mapp.meilishuo.com/activity/fwindow/index/?cid=" + answer[result]
	openUrl(href)
})






