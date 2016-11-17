/*common*/	
require('wap/zepto/fastclick')
var confirm = require('wap/ui/confirm')
	, Alert = require('wap/ui/alert')
	, shareTo = require('wap/app/shareTo')
	, tracking = require('wap/app/tracking');

var startBtn = $('.startBtn')
	, totalMoney = $('.totalMoney')
	, loginBtn = $('.loginBtn')

//埋点
if(navigator.userAgent.indexOf('MicroMessenger') != -1) {
	tracking.cr('weixin_baoyang')
} else {
	tracking.cr('client_baoyang')
}
//Alert
var a = function(msg) {
    if (!msg) {
        msg = "活动已结束"
    }
	return new Alert({
		content: msg
	});
};

a();

/*登陆成功后的回掉函数*/
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};
//随机出六个服务
function getArrayItems(arr, num) {
    var return_array =[]

    for (var i = 0; i<num; i++) {
        if (arr.length>0) {
            var arrIndex = Math.floor(Math.random()*arr.length);
            return_array[i] = arr[arrIndex];
            arr.splice(arrIndex, 1);
        } else {
            break;
        }
    }
    return return_array;
}
var ArrList = fml.vars.serviceArr;
var serviceList = getArrayItems(ArrList,6);
serviceList.map(function(index,item){
	$('#serviceStore').append('<li><span class="type'+' '+index.type+'_icon" type='+index.type +'></span><span class="service">'+ index.service+'</span><span class="normal" isSelected="0" money='+index.money+'></span></li>')
})

//选择服务项
function selectState(selectNum){
	var selected = $('.select_wrap li').find('.selected')
		, selectedLen = selected.length
	$('.select_wrap li').on('click',function(){
		var $this = $(this)
			, normal = $this.children('.normal')
		if(normal.attr('isSelected') == '0') {
			normal.addClass('selected')
			normal.attr('isSelected', '1')
			selectedLen += 1;
		} else {
			normal.removeClass('selected')
			normal.attr('isSelected', '0')
			selectedLen -= 1;
		}
		// var money = 0;
		// $.each($('.selected'),function(index,dom){
		// 	money += parseInt($(dom).attr('money'))
		// });
		// totalMoney.text(money)
	})
}
selectState(6)

//包养列表内容
function listContent(){
	var selected =  $('.select_wrap li').find('.selected')
		, store = []
	for(i = 0; i < selected.length; i++ ){
		var storeLi = $(selected[i]).siblings('.type').attr('type') + '-' + $(selected[i]).siblings('.service').text()
		store.push(storeLi)
		mission = store.join(':')
	}
}

//分享
function share(nurtureid) {
	var params = {
        'title' : {
            'default' : fml.vars.shareTitle
        },
        'text' : {
            'default' : fml.vars.shareText
        },
        'pic' : {
            'default' : fml.vars.sharePic
        },
        'url' : fml.vars.shareUrl + '?' + nurtureid
    };
	shareTo.shareToPengYouQuan(params);
}
//马上去包养
startBtn.on('click',function(){
    a();
    return;
	//app里是否登录
	if(fml.vars.isLogin == 0 && navigator.userAgent.indexOf('MicroMessenger') == -1) {
	    window.location.href = "meilishuo://login.meilishuo/";
	    return;
	}
	//至少要选择三项服务
	if( $('.select_wrap li').find('.selected').length < 3) {
		a('亲，至少要选择三项服务！')
		return;
	}
	//包养列表内容
	listContent()
	data = {
		'name': fml.vars.title
		, 'price' : totalMoney.text()
		, 'mission': mission
	}
	$.post('/aj/baoyang/startInfo', data, function(res){
		if(res.error_code == '0') {
			//包养成功
			var nurtureid = res.data.info.nurtureid
			if( navigator.userAgent.indexOf('MicroMessenger') != -1 ){
				location.href = '/wx/rewards?' + nurtureid + "&dialog"
			} else {
				share(nurtureid)
			}	
		}
		else {
			a('求打赏的人太多了，等会再试试吧~！')
		}
	},'json');
})

