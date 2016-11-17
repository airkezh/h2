/*common*/

require('wap/zepto/fastclick');

var shareTmp = require('wap/component/shareTmp');
var dialog = require('wap/app/dialog');
var signWX = require('wx/sign');
var shareWX = require('wx/share');
var checkLogin = require('circle/app/checkLogin');

var weixinBrowser = Meilishuo.config.os.weixinBrowser;

window.MLS = {
    didLogin : function(){  
        //美丽说app 登录后回调  成功登录后，返回刷新页面。
        window.location.reload();
    }
}

/*  微信签名 */
signWX();

/*   微信浏览器分享   */
if (weixinBrowser) {
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


$('.vote_btn').on('click' , function(){
	//登录
	checkLogin();

	var self = $(this);
	var v_num_box = self.parent('.vote_box').find('.vote_num');
	var v_num = parseInt(self.parent('.vote_box').find('.vote_num').html());

    $.ajax({
        type : 'post',
        url : '/aj/designer/vote',
        data : {
            'project_id' : 3,
            'season_id' : 3,
            'item_id' : self.attr('did')
        },
        success : function(data){
            res = JSON.parse(data);

            if(res.error_code == 0){

                $.ajax({
                	type : 'post',
                	dataType: 'json',
                	url : '/aj/designer/award',
                	data: {
		                'act_code': self.attr('lottery')
		            },
		            dataType: 'json',
		            success : function(item){
		            	code = item.data

		            	self.find('img').attr('src' , 'http://d05.res.meilishuo.net/pic/_o/b8/7f/a507d953132c62d134c3d81c2d96_90_90.cg.png');
						v_num_box.html(v_num + 1);	

		            	if(code.type == 2) {
		            		text = '恭喜您获得' + code.name;

		            		var tpl = shareTmp('getAward');
						    $.fn.dialog({dialogContent : tpl , dialogTitle : '' , dialogWidth : '6.39rem'});
							$('#maskLayer,.closeIcon').on('click' , function(){
								$('.closeDialog').trigger('tap');
							});

		            	};

		            	$('.result').html(text)
		            	
		            },
		            error:  function () {
			            alert('额，稍后再试！');
			        }

		        });

            } else if(res.error_code == -2){
            	alert('亲，已经投过票了!');
            } else{
                alert('没能成功投票！');
            }
        },
        error:  function () {
            alert('额，稍后再试！');
        }
    });
	$.get('/aj/shop/follow' , {'shop_id' : $(this).attr('sid')} , function(){ } , 'json');	
	
});






