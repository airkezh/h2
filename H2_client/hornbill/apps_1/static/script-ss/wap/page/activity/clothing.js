/*common*/
require('wap/zepto/fastclick');
require('wap/app/dialog');

var shareTmp = require('wap/component/shareTmp')
	, Alert = require('wap/ui/alert')
	, signWX = require('wx/sign')
	, shareWX = require('wx/share')

var weixinBrowser = navigator.userAgent.indexOf('MicroMessenger')
	, voteBtn = $('.voteBtn')
	, $dialogRule = $('#dialogRule')

//Alert
function alertCon(msg){
    var a = new Alert({
        content : msg
    });
};

window.MLS = {
    didLogin : function(){  
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}

$('#openRule').on('click',function(){
	var tpl = shareTmp('activityRule');
    $.fn.dialog({dialogContent : tpl , dialogTitle : '', noScroll : false});
	$('#maskLayer,.closeIcon').on('click' , function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	});
	  
})

/*  微信签名 */
signWX()

/*   微信浏览器分享   */
if (weixinBrowser != -1) {
	shareWX.bind({
		'desc' : fml.vars.shareContent,
        'imgUrl' : fml.vars.shareIcon,
        'title' : fml.vars.shareTitle,
        'url' : fml.vars.shareLink
	});

	$('#designer_share').on('click',function(){
		var tpl = shareTmp('shareLead');
	    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('#maskLayer,.dialog_share').on('click' , function(){
			$('.closeDialog').trigger('tap');
		});
	})
} else {
	$('#designer_share').click(function(){
        window.scrollTo(0,30000)
    })
}

//投票

voteBtn.on('click', function(){
	if(fml.vars.isLogin == 0 && weixinBrowser == -1) {
		window.location.href = "meilishuo://login.meilishuo/";
	    return;
	} else {
		vote($(this).attr('data-did'), $(this).attr('data-lottery'), $(this))
	}
})

function vote(did, lotteryCode, ele){
    $.ajax({
        type : 'post',
        url : '/aj/designer/vote',
        data : {
            'project_id' : 3,
            'season_id' : 2,
            'item_id' : did
        },
        success : function(data){
            res = JSON.parse(data);

            if(res.error_code == 0){

                $.ajax({
                	type : 'post',
                	url : '/aj/designer/award',
                	data: {
		                'act_code': lotteryCode
		            },
		            dataType: 'json',
		            success : function(item){
		            	code = item.data

		            	var votes = ele.siblings().find('.votes').html()
            			ele.siblings().find('.votes').html(++ votes)

		            	ele.css({'background' : '#999'}).html('已投')

		            	var tpl = shareTmp('getAward');
					    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
						$('#maskLayer,.closeIcon').on('click' , function(){
							$('.closeDialog').trigger('tap');
						});

		            	if(code.type == 2) {
		            		text = '恭喜您获得' + code.name
		            	} else {
		            		text = '今日优惠券已发完~'
		            	}

		            	$('.result').html(text)
		            	
		            },
		            error:  function (XMLHttpRequest, textStatus, errorThrown) {
			            alertCon('额，稍后再试！');
			        }

		        });

            } else if(res.error_code == -2){
            	alertCon('亲，已经投过票了!');
            } else{
                alertCon('没能成功投票！');
            }
        },
        error:  function (XMLHttpRequest, textStatus, errorThrown) {
            alertCon('额，稍后再试！');
        }
    });
}
