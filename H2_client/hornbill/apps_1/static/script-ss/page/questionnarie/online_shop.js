fml.define('page/questionnarie/online_shop', ['jquery', 'ui/dialog', 'app/shareTo', 'component/urlHandle', 'component/regString', 'component/focus'], function(require, exports){
	var $ = require('jquery');
	var dialog = require('ui/dialog');
	var share = require('app/shareTo');
	var goUrl = require('component/urlHandle');
	var checkWidth = require('component/regString').GetStringLength;
	var inputFocus = require('component/focus').inputFocus;

	//is survey
	var surveyPop = function(){
		if (Meilishuo.config.isSurvey != '0') {
			var h = '<div style="padding:30px 20px; font-size:14px; text-align:center;"><p>每个爱美丽只能提交一次哦，分享链接让花小美收集更多宝贵意见吧</p><p class="mt10_f red_f">http://www.meilishuo.com/questionnaire?frm=twiceshare</p><div class="mt14_f c_f sv_ok"><a href="javascript:void(0)" class="btn sure">确定</a></div></div>';
			var to_url = document.referrer;
			if (to_url.indexOf('meilishuo.com') == -1) to_url = '/guang/hot';
			var sv_d = new dialog({content:h, onClose:function(){goUrl.redirect(to_url);}});
			$('.sv_ok').click(function(){
				sv_d.drive.destroyModel();
			})
			return false;
		}
		return true;
	}
	surveyPop();

	inputFocus('.txt_email');

	//change page
	var qs = {'1':['q1','q2','q3','q4'], '2':['q5','q6[]','q7'], '3':['q8','q9','q10[]','q11[]','q12[]','q13'], '4':['q14','q15']};
	for (var i=1; i<4; i++){
		(function(t){
			$('.step'+t).click(function(){
				if(!surveyPop()) return;
				var flag_q12 = 0;
				var flag_q10 = {'0':0,'1':0,'2':0,'3':0,'4':0,'5':0}
				for (var k=0; k<qs[t].length; k++) {
					var flag = true;
					$('[name="'+qs[t][k]+'"]').each(function(index){
						if (!$(this)[0].checked) return;
						if(qs[t][k] == 'q12[]') {		//hack q12[]
							flag_q12++;
						} else if (qs[t][k] == 'q10[]') {	//hack q10[]
							flag_q10[Math.floor(index/6)]++;
						} else {
							flag = false;
						}
					});
					if (qs[t][k] == 'q12[]' && flag_q12 == 2) flag = false;
					else if (qs[t][k] == 'q10[]') {
						var f_q10 = false;
						for (var kk=0; kk<6; kk++) {
							if (flag_q10[kk] == 0) f_q10 = true;
						}
						flag = f_q10;
					}
					if (flag) {
						var $title = $('.page'+t).find('.title').eq(k);
						if($title.find('.title_tip').length == 0) {
							$title.append('<em class="red_f title_tip" style="margin-left:50px;">请完成该题作答~~</em>')
						}
						$(window).scrollTop($title.offset().top-43)
						return;
					}
				}
				$('.page'+t).hide();
				$('.page'+(t+1)).show();
				$(window).scrollTop(0);
			});
		})(i);
	}

	//remove tip
	$('.form').on('click','input',function(){
		var $tip = $('.title_tip');
		if ($tip.length > 0) $tip.remove();
	});

	//hack q16
	var checkQ16 = true;
	$('[name=q16]').blur(function(){
		var $title = $('.title').eq(15);
		if(checkWidth($(this).val())>140) {
			if($title.find('.title_tip1').length == 0)
				$title.append('<em class="red_f title_tip1" style="margin-left:50px;">请不要超过140个字~~</em>')
			checkQ16 = false;
		} else {
			checkQ16 = true;
			if($title.find('.title_tip1').length > 0)
				$title.find('.title_tip1').remove();
		}
	})

	//hack q6
	$('.q6_data').on('click','a',function(){
		var $input = $(this).find('input');
		$('[value=47]').removeAttr('checked');
		if($input.attr('checked')){
			$input.removeAttr('checked');
			$(this).find('.q_yes').remove();
		}else{
			$input.attr('checked', 'true');
			$(this).prepend('<div class="q_yes"></div>')
		}
	});
	$('[value=46]').click(function(){
		$('[value=47]').removeAttr('checked');
	});
	$('[value=47]').click(function(){
		$('.q6_data').find('input').removeAttr('checked');
		$('.q6_data').find('.q_yes').remove();
		$('[value=46]').removeAttr('checked');
	});

	//hack q12
	var $q12 = $('[name="q12[]"]')
	$q12.click(function(){
		var v = $(this).val();
		var c = $(this).attr('checked');
		$q12.each(function(i){
			if (v%2!==i%2 && $(this).attr('checked')) $(this).removeAttr('checked')
		});
		$(this).attr('checked', ''+!c)
	});

	//validate email
	function validateEmail(itemObj){
		var re = /\S+@\S+\.\S+/;
		return re.test(itemObj.value);
	}

	$('[name=email]').focus(function(){
		var $email_tip = $('.email_tip');
		if ($email_tip.length > 0) $email_tip.remove();
	});

	//create result dialog
	function genResult(img) {
		var html = '<div class="res_img"><div class="close_z right_f" style="margin-right:10px;"></div><img style="margin-left:62px;" width="324" src="'+img+'">';
		html += '<div style="margin-right:10px;margin-bottom:10px;line-height:32px;" class="right_f mt10_f">分享到：&nbsp;<span class="i_sina">&nbsp;</span><span class="i_qzone">&nbsp;</span></div>';
		var res_dia = new dialog({width:450, content:html, onClose:function(){goUrl.redirect(document.referrer||'/guang/hot');}});
		$('#dialogTitle').remove();
		var $res_img = $('.res_img');
		$res_img.find('.close_z').click(function(){
			res_dia.drive.destroyModel();
		});
		var reply = '年终了，来和花小美聊聊网购那些事儿，看看你在购物血拼方面有多高的造诣吧！我在这里，你呢？快来发表下你的败家意见吧 >>';
		var url = 'http://www.meilishuo.com/questionnaire';
		$res_img.find('.i_sina').click(function(){
			share.shareToWeibo(url+'?frm=wb_interview', reply, img);
		});
		$res_img.find('.i_qzone').click(function(){
			share.shareToQzone(url+'?frm=qz_interview', reply+url+'?frm=qz_interview', '和花小美聊聊网购那些事儿', '', img);
		})
	}

	$form = $('.form').find('form')
	$form.find('[type=submit]').click(function(){
		var t = 4;
		for (var k=0; k<qs[t].length; k++) {
			var flag = true;
			$('[name="'+qs[t][k]+'"]').each(function(){
				if($(this)[0].checked) {
					flag = false;
					return;
				}
			});
			if (flag) {
				var $title = $('.page'+t).find('.title').eq(k);
				if($title.find('.title_tip').length == 0) {
					$title.append('<em class="red_f title_tip" style="margin-left:50px;">记得全部填写，否则无法提交哦^3^</em>')
				}
				$(window).scrollTop($title.offset().top-43)
				return false;
			}
		}

		if (!checkQ16) {
			$(window).scrollTop($('.title').eq(15).offset().top-43)
			return false;
		}

		if (!validateEmail($('[name=email]')[0])) {
			var $tip_e = $('<span class="red_f email_tip" style="font-size:14px; margin-left:50px;">邮箱地址格式不正确~~</span>');
			if($('.email_tip').length == 0) $('.submit').append($tip_e);
			return false;
		}
		var args = $form.serialize();
		$.get('/aj/survey/add?'+args, function(res){}, 'json');
		$.get('/wbapp/ajax_survey_pic?'+args, function(res){
	//		res = 'http://192.168.1.6:8080/pic/_o/7c/b6/4d5162adac04e675ede712d37855_561_693.jpg';
			genResult(res);
		});
	});

});
