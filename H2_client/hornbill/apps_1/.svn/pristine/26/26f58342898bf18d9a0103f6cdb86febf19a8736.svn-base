/*common*/	
require('wap/zepto/fastclick')
var shareTmp = require('wap/component/shareTmp')
	, goWXPay = require('wap/app/wx/goWXPay')
	, Alert = require('wap/ui/alert')

var a = function(msg){
    if (!msg) {
        msg = "活动结束";
    }
	return new Alert({
		content : msg
	})
}

a();

var trimLR = function (str) {
        return str.replace(/(^\s*)/g, "").replace(/(\s*$)/g, "");
    }
var params = location.search.substr(1).split('&')
	, nickname = ''
	, avatar = ''
	, tast = ''
	, maxMoney = ''
for (var i=0; i < params.length; i++) {
	var pair = params[i]
		, index = pair.indexOf('=')
		, key = pair.substr(0,index)
		, val = decodeURIComponent(pair.substr(index+1))
	if (key == 'nickname'){
		nickname = val
	} 
	if (key == 'avatar'){
		avatar = val
	}
	if (key == 'tast') {
		tast = val
	}
	if (key == 'nurtureid') {
		nurtureid = val
	}
	if(key == 'maxMoney') {
		maxMoney = val
	}
};

//随机出一个留言默认项
function getArrayItems(arr, num) {
    var temp_array = new Array();
    for (var index in arr) {
        temp_array.push(arr[index]);
    }
    var return_array = new Array();
    for (var i = 0; i<num; i++) {
        if (temp_array.length>0) {
            var arrIndex = Math.floor(Math.random()*temp_array.length);
            return_array[i] = temp_array[arrIndex];
            temp_array.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    return return_array;
}
var ArrList = fml.vars.message;
var msgList = getArrayItems(ArrList,1);
msgList.map(function(index,item){
	$('.textareaWrap').append('<textarea name="txtarea" id="" cols="30" rows="3" class="txtarea" content='+index.cnt+' placeholder='+index.cnt+'></textarea>')
})

$('.nickname').text(nickname)
$('.user_pic').append('<img style="top:16px; left:10px;" src="'+avatar+'"/>')
$('.maxPrice').text(maxMoney)

$('.payBtn').on('click',function(){
    a();
    return;
	var txtarea = $('.txtarea').val() == "" ? $('.txtarea').attr('content') : $('.txtarea').val()
		, price = trimLR($('.txt').val())
	if(!/^([1-9]|\d\d+)$/.test(price) || parseInt(price) > parseInt(maxMoney)) {
		a('亲，打赏金额必须是1~'+maxMoney+'之间的整数！')
		return;
	}
	if(txtarea.length > 100) {
		a('亲，留言要在100字以内哦！')
		return;
	}
	data = {
		'nurturing_id' : nurtureid
		, 'task' : tast
		, 'price' : trimLR($('.txt').val())
		, 'comment' : txtarea
	}

	$.post('/aj/baoyang/payInfo', data, function(res){
		if(res.error_code == '0') {
			goWXPay(res.data.info)
		}
		else {
			a('支付的人太多了，等会再试试吧~！')
		}
	},'json');			
})
	