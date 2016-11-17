/*common*/	
require('wap/zepto/fastclick')
require('wap/app/dialog')
var timedown = require('wap/app/doota/timedown')
	, shareTmp = require('wap/component/shareTmp')
	, Alert = require('wap/ui/alert')

var a = function(msg){
    if (!msg) {
        msg = "活动已结束";
    }
	return new Alert({
		content : msg
	})
}

var nurtureid = location.search.substr(1).split('&')[0]
//是否出分享弹窗
if(location.href.indexOf('dialog') != -1) {
	//微信分享导流弹窗
	var tpl = shareTmp('shareLead');
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('.dialog_box').on('click' , function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	});
}

//选择打赏项
function selectState(selectNum){
	var selected = $('.select_wrap li').find('.selected')
		, selectedLen = selected.length
	$('.select_wrap li').on('click',function(){
		var $this = $(this)
			, normal = $this.children('.normal')
		
		if(normal.attr('isSelected') == '0') {
			normal.addClass('selected')
			normal.attr('isSelected', '1')
			$this.siblings().children('.normal').removeClass('selected').attr('isSelected', '0')
			selectedLen += 1;
		} else {
			normal.removeClass('selected')
			normal.attr('isSelected', '0')
			selectedLen -= 1;
		}
	})
}

data = {
	'nurtureid' : nurtureid
}
$.post('/aj/baoyang/rewardsInfo', data, function(res){
	if(res.error_code == 0) {
		var mission = res.data.info.nurturing.mission
			, store =  []
		mission.map(function(item, index){
		  var type = item.split('-')[0]
		  var content = item.split('-')[1]
		  var storeObj = {}
		  storeObj.type = type
		  storeObj.content = content
		  store.push(storeObj)
		})

		var tpl = shareTmp('userInfo', 
			{
				'nurturing' : res.data.info.nurturing 
				, 'rewards' : res.data.info.rewards
				, 'mission' : store
			});
		$('#contractWrap').append(tpl)

		//活动已结束
        a();

		//选择打赏项
		selectState(1)
		//倒计时
		$('.time').each(function(){
	        var _this = $(this);
	        _this.removeClass('time');
	        timedown.down(this, _this.attr('remain') ,'0h-0i-0s',['<b>%v</b>时','<b>%v</b>分','<b>%v</b>秒'])
	        .onTimeOver(function(){
	            window.location.reload();   
	        }).correct(); 
	    });

	    var nickname = $('.nickname').attr('nickname')
	    	, avatar = $('.avatar').attr('avatar')
	    	, maxMoney = $('.rewards_user').attr('totalMoney') - $('.rewards_user').attr('rewardsMoney')
	    	if(isNaN(maxMoney) || maxMoney < 0) {
	    		maxMoney = 200
	    	}
	    //立刻打赏
	    $('.rewardBtn').on('click',function(){
	    	//活动已结束
	    	a()
	    	return;

	    	if($('.timeleft').attr('timeleft') == 0) {
	    		a('本轮打赏已结束！')
	    		return false
	    	}
	    	var selected =  $('.select_wrap li').find('.selected')
	    	if(selected.length != 0){
	    		var task = $(selected).siblings('.service').text()
	    	}
	    	if(selected.length == 0) {
				a('亲，请选择一项打赏！')
			} else {
				window.location.href='/wx/pay?nurtureid=' + nurtureid +'&tast='+task +'&nickname=' + nickname +'&avatar=' + avatar +'&maxMoney=' + maxMoney
			}
	    })
	    //立即使用优惠券
	    $('.get_money').on('click',function(){
	    	//活动已结束
	    	a()
	    	return;

	    	var countPrice = $('.countPrice').attr('countPrice')
	    	window.location.href = '/wx/baoyangCoupon?nurtureid=' + nurtureid + '&nickname=' + nickname + '&avatar=' + avatar + '&countPrice=' + countPrice
	    })
	}
	else {
		a('求打赏的人太多了，等会再试试吧~！')
	}
},'json');

$(".meToo").on("click", function(e) {
    a();
    e.preventDefault();
})
