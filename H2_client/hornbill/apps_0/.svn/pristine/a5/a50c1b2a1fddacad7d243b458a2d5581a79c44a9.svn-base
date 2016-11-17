/*common*/
require('m/zepto/touch');

var slipPageFn = require('cooper/component/slipPage');
var checkLogin = require('circle/app/checkLogin');
var signWX = require( 'wx/sign' );
var shareWX = require( 'wx/share' );
var shareTmp = require('wap/component/shareTmp');
var dialog = require('wap/ui/dialog');
var tracking = require('wap/app/tracking');
var openApp = require('wap/app/openAppCustom');
var openAppLink = require('wap/app/openAppLink');

setTimeout(function(){
	// 判断登录，包含app和wx
	 checkLogin();

	 var r = $('.main').attr('xr');

	/*微信分享*/
	var $tShareBtn = $('.tShareBtn') //weixin share btn
		, $shareMask = $('.mask'); //weixin share mask
	if(Meilishuo.config.os.weixinBrowser){
		signWX();
		shareWX.bind({
	        'desc': '以前你可能从来不知道，她比你想象中爱你...',
	        'imgUrl':'http://d01.res.meilishuo.net/pic/_o/7f/07/a7baf36e259c4456921e1f54ff80_200_200.cj.png',
	        'title': '2015美丽大事记【末页有惊喜】',
	        'link': 'http://pages.w.meilishuo.com/cooper/169401',
	        'success': function(res, name, eventName){
	            hideMask()
	            var area = {'Timeline' : 'pyq' , 'AppMessage' : 'wx'};
	            // alert(area[eventName])
	            // tracking.cr('member_time_machine' , {'area' : area[eventName] })
	        }
	    });

		$tShareBtn
			.on('click', showMask)
			// .on('click', function(){
				// tracking.cr('member_time_machine', {'click':'share_button'});
			// });
		$shareMask
			.on('click', hideMask);
	}
	function showMask(){
	    if(Meilishuo.config.os.weixinBrowser) $shareMask.show();
	}
	function hideMask(){
	    if(Meilishuo.config.os.weixinBrowser) $shareMask.hide();
	}

	/*app内分享*/
	if(Meilishuo.config.os.mlsApp){
		var tpl = shareTmp('wapShare' , {"share" :JSON.parse(fml.vars.share)});
		$tShareBtn.on('click', function(){
			// tracking.cr('member_time_machine' , {'click' : 'share_button' , });
			var sharePalDlg = new dialog({
				content:tpl
			});
			var share_url = $('#share_ico .active').attr('share_url');
			$('#share_ico a').bind('click', function(){
				$('#share_ico a.active').removeClass('active');
				$(this).addClass('active');
				share_url = $(this).attr('share_url');
			});
			$('#shareBtn').on('click', function(){
				//console.log(share_url)
				var area = $('#share_ico a.active').html();
				var share_area = {'朋友圈' : 'pyq' , '微信' : 'wx'};
				// alert(share_area[area])

				// tracking.cr('member_time_machine' , { 'area' : share_area[area] });

				window.location.href =  share_url;  
			});		
		});
	}	

	$('.sub_btn').on('click' , function(){
		var textLength = $('textarea').val().length;
		var text = $('textarea').val();
		var t = Meilishuo.config.os.weixinBrowser ? 'weixin' : '';

		if(textLength > 20){
			alert('20字以内哦~');
			return false;
		}else{
			$.post('/activity/vip_data/aj/dream' , {'type' : t , 'content' : text } , function(res){
				if(!res.error_code){
					$('textarea').val('').attr('placeholder' , '你已经许过愿了，分享让愿望加速实现')
					$('.dream_box').prepend('<li class="info_box"><img src="'+res.data.avatar+'"><div class="talk"><p class="nick">'+res.data.nickname+'</p><p class="cont">'+res.data.content+'</p></div></li>');
				}else{
					alert(res.message);
				}

			} , 'json');
		}
		
	});

	// var List = $('.dream');
	// var ListHeight = List.height();
	// var i = -1;
	// var t = setInterval(function(){
	// 	List.css({ '-webkit-transform' : 'translateY('+i+'px)' , 'transform' : 'translateY('+i+'px)'});
	// 	i -= 1;
	// 	if(i < -ListHeight){
	// 		i = 0;
	// 	}
	// } , '30');


} , 500)