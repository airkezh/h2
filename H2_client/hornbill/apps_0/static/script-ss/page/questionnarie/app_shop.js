fml.define('page/questionnarie/app_shop', ['jquery', 'ui/dialog', 'app/shareTo', 'component/urlHandle', 'component/regString', 'component/focus'], function(require, exports){
	var $ = require('jquery');
	var dialog = require('ui/dialog');
	var share = require('app/shareTo');
	var goUrl = require('component/urlHandle');
	var checkWidth = require('component/regString').GetStringLength;
	var inputFocus = require('component/focus').inputFocus;

	//is survey
	var surveyPop = function(){
		if (Meilishuo.config.isSurvey != '0') {
			var h = '<div style="padding:30px 20px; font-size:14px; text-align:center;"><p>每个爱美丽只能提交一次哦，分享链接让花小美收集更多宝贵意见吧</p><p class="mt10_f red_f">http://www.meilishuo.com/questionnaire?frm=twiceshare</p></div>';
			var to_url = document.referrer;
			if (to_url.indexOf('meilishuo.com') == -1) to_url = '/guang/hot';
			new dialog({content:h, onClose:function(){goUrl.redirect(to_url);}});
			return false;
		}
		return true;
	}
	surveyPop();

	inputFocus('.txt_email');

	//change page
	var qs = {'1':['q1','q2','q3'], '2':['q4', 'q5[]','q6'], '3':['q7','q8','q9[]','q10[]','q11[]','q12'], '4':['q13','q14','q15']};
	for (var i=1; i<4; i++){
		(function(t){
			$('.step'+t).click(function(){
				if(!surveyPop()) return;
				var flag_q11 = 0;
				var flag_q9 = {'0':0,'1':0,'2':0,'3':0,'4':0,'5':0}
				for (var k=0; k<qs[t].length; k++) {
					var flag = true;
					$('[name="'+qs[t][k]+'"]').each(function(index){
						if (!$(this)[0].checked) return;
						if(qs[t][k] == 'q11[]') {		//hack q12[]
							flag_q11++;
						} else if (qs[t][k] == 'q9[]') {	//hack q10[]
							flag_q9[Math.floor(index/6)]++;
						} else {
							flag = false;
						}
					});
					if (qs[t][k] == 'q11[]' && flag_q11 == 2) flag = false;
					else if (qs[t][k] == 'q9[]') {
						var f_q9 = false;
						for (var kk=0; kk<6; kk++) {
							if (flag_q9[kk] == 0) f_q9 = true;
						}
						flag = f_q9;
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

	//hack q5
	$('#q5_table').on('click','input',function(){
		$('[value=47]').removeAttr('checked');
	});
	$('[value=46]').click(function(){
		$('[value=47]').removeAttr('checked');
	});
	$('[value=47]').click(function(){
		$('#q5_table').find('input').removeAttr('checked');
		$('[value=46]').removeAttr('checked');
	});

	//hack q11
	var $q11 = $('[name="q11[]"]')
	$q11.click(function(){
		var v = $(this).val();
		var c = $(this).attr('checked');
		$q11.each(function(i){
			if (v%2!==i%2 && $(this).attr('checked')) $(this).removeAttr('checked')
		});
		$(this).attr('checked', ''+!c)
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
			share.shareToWeibo(url+'?frm=wb', reply, img);
		});
		$res_img.find('.i_qzone').click(function(){
			share.shareToQzone(url+'?frm=qz', reply+url+'?frm=qz', '和花小美聊聊网购那些事儿', '', img);
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

		var args = $form.serialize();
		$.get('/aj/survey/add?'+args, function(res){}, 'json');
		$.get('/wbapp/ajax_survey_pic?'+args, function(res){
	//		res = 'http://192.168.1.6:8080/pic/_o/7c/b6/4d5162adac04e675ede712d37855_561_693.jpg';
			genResult(res);
		});
	});

});
