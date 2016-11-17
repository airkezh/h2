fml.define( 'app/welfare_apply' , ['jquery', 'app/twitterApi', 'app/survey', 'app/userApi', 'ui/dialog', 'component/shareTmp', 'component/focus', 'app/checkLogin'], function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var input = require('component/focus');
	var check = require('app/checkLogin');
	var twitterApi = require('app/twitterApi').twitterApi;
	var userApi = require('app/userApi').userApi;
	var survey = require('app/survey');
	var $edit_prompt = $('.edit_prompt');
	if ($edit_prompt.length > 0 && Meilishuo.config.editor == 0) {
		$('.wf_apply').hover(function(){
			$edit_prompt.show();
		},function(){
			$edit_prompt.hover(function(){
				$edit_prompt.show();
			}, function(){
				$edit_prompt.hide();
			});
			$edit_prompt.hide();
		});

	} 
	$('.wf_apply').click(function(){
		var begin = Meilishuo.config.begin;
		if (begin == 1) {
			if (!check()) return false;
			if ($edit_prompt.length > 0 && Meilishuo.config.editor == 0) return;
			$.get('/aj/welfare/apply_info', function(res){
				if(!res) return;
				if (res.status == 0) {
					showBefore(res);
				} else if (res.status == 3 || res.status == 8) {
					showAfter(res);
				}
			}, 'json');
		} else if (begin == 0) {
			alert('还没开始呢，急啥!');
		} else if (begin == 2) {
			alert('已经申请过了!');
		} else if (begin == 3) {
			//12月16日思瑶需求去掉话题 赵洋
			$('textarea.editor').focus();
			//$('textarea.editor').val('#'+Meilishuo.config.topic_title+'#').focus();
		}
	});
	
	function showBefore(res) {
		var tpl = shareTmp('welfare_apply_before');
		var bindDia = new dialog({title : "提示" , width : 400 , content : tpl, onClose : function(){ fml.vars.saveItem=1; showAfter(res); }});
	}

  	//弹窗部分--转发到微博@好友-start
    var weibo_area = {}; 
	weibo_area.init = function(){
		weibo_area.str = ''; 
		weibo_area.i = 0;//起点
		weibo_area.j = 7;//终点
		weibo_area.img = $('#weibo_area img');
		weibo_area.imgLen = weibo_area.img.size();
        weibo_area.img.click(weibo_area.imgClick);
        weibo_area.img.eq(0).click();
        weibo_area.img.eq(1).click();
        weibo_area.img.eq(2).click();
        weibo_area.imgChange();
        $('#weibo_area_change').click(weibo_area.imgChange);
    };
    weibo_area.imgClick = function(){
        var flag = $(this).next().is('.selected');
        var name = $(this).attr("alt");
        var infoBox = $('#weibo_area_info');
        var info = infoBox.text() - 0;
        if(flag){
            $(this).css('border-color','#fff').next('.selected').remove();
            weibo_area.str = weibo_area.str.replace(' @' + name,'');
            info--;
            infoBox.text(info);
        }
        else{
            $(this).css('border-color','#f69').after('<div class="selected left_f"></div>');
            weibo_area.str = weibo_area.str + ' @' + name;
            info++;
            infoBox.text(info);
        }
    };  
    weibo_area.imgChange = function(){
        weibo_area.img.hide().next('.selected').hide();
        var k;
        for(k = weibo_area.i;k < weibo_area.j;k++){
            weibo_area.img.eq(k).show().next('.selected').show();
        }
        weibo_area.i += 7;
        weibo_area.j += 7;
        if(weibo_area.j >= weibo_area.imgLen){
            weibo_area.j = weibo_area.imgLen;
        }
        if(weibo_area.i >= weibo_area.imgLen){
            weibo_area.i = 0;
            weibo_area.j = 7;
        }
    };

    function showAfter(res){
		var cbk = function(h) {
			if (!h) {
				_showAfter(res);
				return;
			}
			var $tpl = $('<div style="padding:56px 100px 70px; height:250px; overflow-y:scroll; ">' + h 
				+ '<p class="tab_sure" style="margin-top:20px;"><a class="sure btn sureBtn" style="padding: 6px 29px;">下一步</a></p></div>');
			var surveyDia = new dialog({
				title: "填写申请", 
				width: 580, 
				content: $tpl
			});
			$tpl.find('.sureBtn').click(function(){
				var pid = $tpl.find('.quest_info').attr('pid');
				if(survey.answer(pid)) {
					_showAfter(res);
				}
			})
		}
		survey.question(1, Meilishuo.config.activity_id, cbk);
    }

	function _showAfter(res) {
		var tpl = shareTmp('welfare_apply', res);
		var applyDia = new dialog({title : "填写申请", width : 580, content : tpl});
		var uid = $("#fol_actor").attr('fuid');
		input.inputFocus('#note');
		if (res.fans && res.fans.length > 0) weibo_area.init();
		else $('#weibo_area').hide().siblings('.l22_f').hide();
		$('.wf_cancel').click(function(){ applyDia.drive.destroyModel();});
		if(weibo_area.imgLen <= 7){
			$('#weibo_area_change').hide();
		}
		var checkInput = ['real_name', 'telephone', 'address', 'reason'];
		var $form = $('.wf_form');
		var $wf_tip = $('.wf_form .wf_tips');
		var isLoad = false;
		$('#applying_submit').click(function(){
			/*for (var i=0;i<checkInput.length; i++) {
				if($.trim($form.find('[name='+checkInput[i]+']').val()).length == 0) {
					alert('所有选项不能为空!');
					return false;
				}
			}*/
			try{
				$wf_tip.each(function(idx) {
					var $_this = $(this);
					var nesy_value = $_this.attr('is_necessary');
					var wf_name = $_this.prev().attr('wf_label');
					var wf_value = $_this.attr('value');
					if(nesy_value == '1' && wf_value == ''){
						alert(wf_name + "不能为空！");
						throw 'err';
					}
				});

				if (isLoad) return;
				isLoad = true;
				var args = $form.serializeArray();
				var data = serializeJSON(args);
				data.weibo_str = weibo_area.str;
				data.status = res.status;
				var ifFol = $('#fol_actor').is(':checked');
				var ifShareHome = $('#share_home').is(':checked');
				var tpl = shareTmp('welfare_apply_success');
				var sucDia = new dialog({title:'提示申请成功', width: 380, content:tpl});
				$('.apply_success_ok').click(function(){ window.location.href = window.location.href; });
				$('.add_follow_ok').click(function(){
					userApi('follow', {fuid:$(this).attr('fuid')}, function(){});
					setTimeout(function(){window.location.href = window.location.href;}, 200);
				});
				$.post('/aj/welfare/apply', data, function(res){
					isLoad = false;
					if(!res) return;
					if (ifFol && uid) userApi('follow', {fuid:uid}, function(){});
				});
				//for welfare comment
				twitterApi('create', {'activity_id': Meilishuo.config.activity_id, 'tContent': $.trim($form.find('[name=reason]').val()), 'type': 5});
				//for share to home
				if (ifShareHome) {
					twitterApi('create', {activity_id: Meilishuo.config.activity_id, pid: Meilishuo.config.pid, tContent: '我参加了福利社活动，这期福利是“'+Meilishuo.config.wl_title+'”，都来试试吧>>', type:2});
				}
			} catch(e){

			}

		});
		function serializeJSON(a) {
			var o = {};
			$.each(a, function() {
				if (o[this.name]) {
					if (!o[this.name].push) o[this.name] = [o[this.name]];
					o[this.name].push(this.value || '');
				} else {
					o[this.name] = this.value || '';
				}
			});
			return o;
		}
	}
})
