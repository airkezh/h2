fml.define('sum/qqwelfareWin' , ['jquery','component/urlHandle','component/shareTmp','component/dialog','app/tracking','sum/qqfusion2sendStory','component/focus','sum/qqwelfareValidate'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('component/dialog');
	var urlHandle = require('component/urlHandle');
	var input = require('component/focus');
	var logTrack = require('app/tracking');
	var qqsendStory = require('sum/qqfusion2sendStory');
	var validate = require('sum/qqwelfareValidate');
	return {
		//申请表单弹窗
		apply : function(){
			var mSelf = this;
			var html = shareTmp('qqwelfareApplyTpl');
			dialog.meiliDialog({dialogTitle : "填写申请" , dialogWidth : 600 , dialogContent : html , onStart : function(){} , onClose : function(){}}); 
			input.inputFocus('#email'); 
			input.inputFocus('#remark'); 
			$('#realname').focus();
			$('#email').bind('blur' , function(){
				if(!validate.email($(this).val())){
					$(this).next('span').attr('class','bad').html('邮件格式不正确');
					return false;
				}else{
					$(this).next('span').attr('class','good').html('');
				}
			});
			$('#qqwelfareApplyCancel').bind('click',function(){
				$('.close_z').click();
			});
			$('#qqwelfareApplyBtn').bind('click',function(){
				logTrack.cr('qqwelfareApplyBtn');
				var form = {
					realname : $('#realname').val(),
					telnumber : $('#telnumber').val(),
					email : $('#email').val(),
					address : $('#address').val(),
					zipcode : $('#zipcode').val(),
					reason : $('#reason').val()
				};
				if(!validate.email(form.email)){
					$('#email').next('span').attr('class','bad').html('邮件格式不正确');
					return false;
				}
				if(form.realname == '' || form.telnumber == '' || form.email == '' || form.address == '' || form.zipcode == '' || form.reason == '' ){
					alert('除“备注”外，所有选项不能为空！');
					return false;
				}
				var url = '/qqwelfare/activityApply/';
				var data = {
					activity_id : $('.free_box').attr('aid'),
					real_name : form.realname,
					telephone : form.telnumber,
					email : form.email,
					address : form.address,
					reason : form.reason
				};
				var callback = function(){
					$('.wf_ico1').attr('class','wf_ico2').unbind();
					mSelf.success({
						onClose : function(){
							var url = Meilishuo.config.server_url + 'qqwelfare/?frm=qzoneapp_list';
							urlHandle.redirect(url);
						}
					});
				};
				var $dia = $('#dialogLayer');
				$dia.hide();
				qqsendStory({
					title : '美丽免费领',
					img : 'http://ctc.qzonestyle.gtimg.cn/qzonestyle/act/qzone_app_img/app100657684_100657684_100.png',
					summary : '美丽说专为QQ空间的爱美丽们，提供各种宝贝免费试用的平台，跟万千MM一起变美吧！',
					msg : '好想免费试用#' + $('.free_box .bw_tle').text() + '#，' + '@美丽说 我申请咯！姐妹们，在#美丽免费领#可以免费试用好多好宝贝哦！' + '申请链接' + 'http://rc.qzone.qq.com/100657684?via=DLJ',
					onSuccess : function(){ $.post(url , data , callback ,'json'); },
					onClose : function(){ $dia.show(); }
				});
			});
		},
		//24小时内申请提示弹窗
		info : function(opts){
			var html = shareTmp('qqwelfareInfoTpl');
			dialog.meiliDialog({dialogTitle : "" , dialogWidth : 390 , dialogContent : html , onClose : opts.onClose || function(){}}); 
			$('.onTrueBtn').bind('click', function(){
				opts.onTrue();	
			});
		},
		//申请成功弹窗
		success : function(opts){
			var html = shareTmp('qqwelfareSuccessTpl');
			dialog.meiliDialog({dialogTitle : "申请成功提示" , dialogWidth : 426 , dialogContent : html , onClose : opts.onClose || function(){}}); 
		},
		//关注弹窗
		follow : function(opts){
			var html = shareTmp('folQzonePopTpl');
			dialog.meiliDialog({
				dialogTitle : "" ,
				dialogContent : html ,
				dialogWidth : 390 ,
				onClose : function(){
					var url = '/qqwelfare/setUserIsfans/';
					var data = {number : 1};
					var callback = opts.onClose || function(){};
					$.post(url , data , callback ,'json');
				}
			});
			var $dia = $('#dialogLayer');
			logTrack.cr('qzone_fol_pop');
			$dia.find('#dialogTitle').css('background', '#FFF');
			if(opts.info){
				$dia.find('.tj_bg p').html(opts.info);
			}
			$dia.find('.close_z').hide();
			setTimeout(function(){
				$dia.find('.close_z').show()
			}, 4000);	
		}
	}
});
