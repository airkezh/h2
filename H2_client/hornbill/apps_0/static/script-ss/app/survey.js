fml.define('app/survey', ['jquery', 'component/ajax'], function(require, exports){
	var $ = require('jquery');
	var ajax = require('component/ajax');

	/*
		api接口信息
		获取调查内容：http://redmine.meilishuo.com/projects/pinpai/wiki/QuestionQuestionnaire_info
		发送调查答案：http://redmine.meilishuo.com/projects/pinpai/wiki/QuestionQuestionnaire_answer
	*/

	function question(type, id, cbk) {
		var data = {
			'obj_type' : type,
			'obj_id' : id
		}
		var prefix = '';
		if (type == 1) {	//for welfare
			prefix = '福利问答：';
		}
		ajax.aj('/aj/survey/question', data, function(res){
			if (res.code || (res.data && res.data.length === 0)) {
				cbk && cbk(false);
				return;
			}
			res = res.data;
			var h = '<div class="quest_info" pid="' + res.p_id + '">';
			var qInfo = res.qInfo;
			for (var i = 0; i < qInfo.length; i++) {
				h += '<p qid="' + qInfo[i].q_id + '" class="f16_f mt14_f q_info">' + prefix + qInfo[i].q_title + '</p>';
				var inputType;
				if (qInfo[i].q_types == 2) {
					inputType = 'checkbox';
				} else if (qInfo[i].q_types == 1) {
					inputType = 'radio';
				}
				for (var k in qInfo[i].q_select) {
					var s = qInfo[i].q_select[k];
					h += '<p class="mt10_f"><label class="cursor_f"><input name="q' + qInfo[i].q_id + '" type="' + inputType + '">' + s + '</label></p>'
				}
			}
			h += '<div class="f14_f mt14_f">' + res.more + '</div>';
			h += '</div>';
			cbk && cbk(h);
		})
	}

	function answer(pid, cbk) {
		var aInfo = [];
		var $ans = $('[pid='+pid+']');
		var flag = true;
		$ans.children('.q_info').each(function(){
			var qid = $(this).attr('qid'), answer = [];
			$('[name=q'+qid+']').each(function(i){
				if ($(this)[0].checked)
					answer.push(i+1);
			})
			if (answer.length > 0) {
				aInfo.push({'q_id': qid, 'answer': answer.join(',')});
			} else {
				flag = false;
			}
		})
		if (!flag) {
			alert('亲，请完成所有选题哦~');
			return flag;
		}
		var data = {
			'p_id' : pid,
			'aInfo' : aInfo
		}
		ajax.aw('/aj/survey/answer', {'answers': data}, function(res){
			cbk && cbk();
		})
		return flag;
	}

	exports.question = question;
	exports.answer = answer;
})