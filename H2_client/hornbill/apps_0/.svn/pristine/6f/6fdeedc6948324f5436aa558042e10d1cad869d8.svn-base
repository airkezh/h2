fml.define('sum/qqwelfare' , ['jquery','component/urlHandle','sum/qqwelfareWin','sum/qqfusion2invite','app/tracking'] , function(require , exports){
	var $ = require('jquery');	
	var qqwelfareWin = require('sum/qqwelfareWin');
	var urlHandle = require('component/urlHandle');
	var qqinvite = require('sum/qqfusion2invite');
	var logTrack = require('app/tracking');
	return function(){
		$('.inviteBtn').live('click', function(){
			qqinvite({
				img : 'http://ctc.qzonestyle.gtimg.cn/qzonestyle/act/qzone_app_img/app100657684_100657684_100.png',
				msg : '“美丽免费领”是美丽说专为QQ空间的MM们提供免费试用的平台。'
			});
		});
		if(Meilishuo.config.headTag == 'qqwelfareHome'){
			if(Meilishuo.config.qq_userInfo.isFans != 1 && Meilishuo.config.headTag == 'qqwelfareHome' && Meilishuo.config.current_page == 0){
				qqwelfareWin.follow({});
			}
			$('[avalid=0], [avalid=2]').find('.wf_ico2, .wf_ico3, .bw_tle, .pic').bind('click',function(){
				var aid = $(this).parents('.free_box').attr('aid');
				urlHandle.redirect(Meilishuo.config.server_url + 'qqwelfare/activity/' + aid + '?frm=qzoneapp_detail');
			});
			$('[avalid=1]').find('.wf_apply, .bw_tle, .pic').bind('click',function(){
				var aid = $(this).parents('.free_box').attr('aid');
				var infoObj = {
					onTrue : function(){
						qqinvite({
							img : 'http://ctc.qzonestyle.gtimg.cn/qzonestyle/act/qzone_app_img/app100657684_100657684_100.png',
							msg : '“美丽免费领”是美丽说专为QQ空间的MM们提供免费试用的平台。',
							onSuccess : function(ret){
								var url = '/qqwelfare/setUserValid/';
								var data = {number : ret.invitees.length};
								var callback = function(res){
									if(res)
										urlHandle.redirect(Meilishuo.config.server_url + 'qqwelfare/activity/' + aid + '?frm=qzoneapp_detail');
									else
										qqwelfareWin.info(infoObj);
								};
								$.get(url , data , callback ,'json');
							},
							onClose : function(){
								$('.close_z').click();
							}
						});
					},
					onClose : function(){
						return false;	
					}
				};
				if(Meilishuo.config.qq_userInfo.isValid == true){
					urlHandle.redirect(Meilishuo.config.server_url + 'qqwelfare/activity/' + aid + '?frm=qzoneapp_detail');
				}else{
					qqwelfareWin.info(infoObj);
				}
			});
		}
		$('.wf_ico1').bind('click', function(){
			var url = '/qqwelfare/qq_userInfo/';
			var data = {};
			var callback = function(res){
				Meilishuo.config.qq_userInfo.isFans = res.isFans;
				if(Meilishuo.config.qq_userInfo.isFans != 1){
					qqwelfareWin.follow({
						info : '才可以继续申领哦！',
						onClose : function(){
							qqwelfareWin.apply();
						}
					});
				}else{
					qqwelfareWin.apply();
				}
			};
			$.get(url , data , callback ,'json');
			logTrack.cr('wf_ico1');
		});		
	}
});
