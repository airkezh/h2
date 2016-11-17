/*common*/
require('m/zepto/touch');

var slipPageFn = require('cooper/component/slipPage');
var checkLogin = require('circle/app/checkLogin');
var signWX = require( 'wx/sign' );
var shareWX = require( 'wx/share' );
var shareTmp = require('wap/component/shareTmp');
var dialog=require('wap/app/dialog');
var tracking = require('wap/app/tracking');
var openApp = require('wap/app/openAppCustom');
var openAppLink = require('wap/app/openAppLink');
var Alert = require('wap/ui/alert');

function alertCon(msg){
    var a = new Alert({
        content : msg
    });
};

setTimeout(function(){
	// 判断登录，包含app和wx
	 //checkLogin();
	//滑动翻页效果
	window.slipPage = slipPageFn.init({
		outer:'.wrap .main'
		, page:'.page'
		, transitionExt : function(dir, type, y){
	        var scaleType = {
	            'curr' : [1,1]
	            , 'prev' : [0.8, 0.8]
	            , 'next' : [0.8, 0.8]
	        }
	        return {'transform':'scale3d(' + scaleType[type][0] + ', ' + scaleType[type][1] + ', ' + '1' + ')'}

	    }
	});
	slipPage.getPages().on('pageShow', function(){
		tracking.cr('olay_time', { 'page':($(this).index()+1)});
	})


	window.MLS = {
		'didLogin': function() {
			//美丽说app 登录后回调  成功登录后，返回刷新页面。
			window.location.reload();
		},
		"onPickAddress": function(res) {
			var code = res.code;
			if (code == 0) {
				var data = (fml.vars.isAndroid ? res.info : $.parseJSON(res.info)) || {},
					addr_id = data.addr_id || '',
					phone = data.phone || '',
					address = data.address || '',
					nickname = data.nickname || '',
					address = address.substr(0, 18) + '...',
					nicknameLen = nickname.length || 0,
					nickname = (nicknameLen <= 4) ? nickname : nickname.substr(0, 4) + '...',
					recordId = $('#j_prize_btn').data('recoid') || 0;

				var addressStr = "商品将发往,<br/>" + address + "<br/>" + nickname + phone;
				$("#address").attr("data-id", addr_id);
				$("#address").html('').html(addressStr);
			}
		}
	};

if (Meilishuo.config.user_id == 0) {
		if(Meilishuo.config.os.mlsApp){
	        $('.support_btn').on('click',function(event){
	            window.location.href = 'meilishuo://login.meilishuo';
	        });
		}
		else{
	        $('.support_btn').on('click',function(event){
	            window.location.href = '/user/login';
	        });
		}

} 

$(document).on('tap','.support_btn',function(){
	$.ajax({
		type: "post",
		url: '/aj/designer/vote'+'?item_id=99882&project_id=3&season_id=2',
		data: {
		},
		dataType: 'json',
		success: function(res) {
			if(res.error_code==0){
				var tjnum=$(this).find('.support-num').html();
				$(this).find('.support-num').html(parseInt(tjnum)+1);
					//抽奖处理
					$.ajax(
					{
						type: "post",
						url: "/aj/activity/free_draw",
						data: {
							'act_code': 'test_olay'
						},
						dataType: 'json',
						success: function(res) {
							var tpl=shareTmp('olaybox',{
								'prize_code':res.data.id,
								'name':res.data.extra.name,
								'phone':res.data.extra.phone,
								'address':res.data.extra.address
							});
					        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
							$('#dialogLayer').css({'top':'0','width':'100%','height':'100%','left':'0'})
					        $('.closeDialog').on('tap',function(){
					            $('.closeDialog').trigger('tap');
					        });
							$("#address").attr("data-id",res.data.extra.id);
							$('#address').attr('data-record',res.data.record_id);
						     if(res.data.id!==0){
								/*提交中奖信息*/
								$(".olay-btn2").on("tap", function() {
									var addr_id = $("#address").attr("data-id") || 0;
									var record_id = $("#address").attr("data-record") || 0;
									$.ajax({
										type: "post",
										url: "/aj/activity/free_saveInfo",
										data: {
											'act_code': 'test_olay',
											'addr_id': addr_id,
											"record_id": record_id
										},
										dataType: 'json',
										success: function(res) {
										},
										error: function() {
											alert("服务器开小差中...请稍后重试～");
										}
									});
								});

						     }
						    $(".olay-btn2").on('tap',function(){
					            $('.closeDialog').trigger('tap');
					        });
							$('.olay-btn1').on('click',function(){
								if (!fml.vars.isNewest && fml.vars.isAndroid) {
									var c = new confirm({
										content: '当前版本不支持编辑地址，请升级最新版本。',
										onSure: function() {
											window.location.href = '/download/latest/wap';
										},
										onCancel: function() {
											return;
										}
									});
								} else {
									window.location.href = 'meilishuo://pick_address.meilishuo';
								}

							})
						},
						error: function() {
							alert("服务器开小差中...请稍候再试");
							window.location.reload();
						}
					});

			}
			else if(res.error_code==-2){
				alertCon('亲,你已经赞过了！');
				return;
			}
		},
		error: function() {
			alert("服务器开小差中...请稍候再试");
		}
	});

})

} , 500)


var appShare = require('wap/app/appShare');
if (fml.vars.appShare) {
    appShare(fml.vars.shareparams, ['weixin', 'weixin_timeline'] ,'image');
}








