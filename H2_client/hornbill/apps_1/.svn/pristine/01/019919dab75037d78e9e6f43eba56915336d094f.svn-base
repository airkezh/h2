//#3216 新浪微博行为动态开发需求
fml.define('app/folSyncWb', ['jquery', 'ui/dialog', 'component/iStorage'], function(require, exports){
	var $ = require('jquery');
	var dialog = require('ui/dialog');
	var storage = require('component/iStorage');
	var isShowDialog = true;

	var h = '<div class="close_z mr6_f"></div><div class="maga_suc f14_f" style="width:auto;padding:25px 0 15px;"><p><span class="ms_ico">已关注</span></p><p class="mt14_f">是否同步行为动态到新浪微博？</p><p class="mt14_f"><span class="syn_ok btn sure" style="width:32px;">是</span><span class="syn_no sure followed" style="width:32px;margin-left:16px;">否</span></p><p class="mt14_f f12_f"><span class="red_f">提示：</span>可在设置账号-同步绑定中进行修改</p></div>';
	
	var folSyncFun = function(fuid, type, cbk) {
		var url = '/aj/user/sync_wb';
		var folSynD = new dialog({width:403, content:h, onClose:cbk});
		$('#dialogTitle').remove();
		$('#dialogContent').find('.close_z').click(function(){
			$.get(url, {'fuid':fuid, 'type':type, 'response':0});
			folSynD.drive.destroyModel();
			isShowDialog = false;
		});
		$('#dialogContent').find('.syn_ok').click(function(){
			$.get(url, {'fuid':fuid, 'type':type, 'response':1});
			folSynD.drive.destroyModel();
			isShowDialog = false;
		});
		$('#dialogContent').find('.syn_no').click(function(){
			$.get(url, {'fuid':fuid, 'type':type, 'response':0});
			folSynD.drive.destroyModel();
			isShowDialog = false;
		});
	}

	return function(fuid, type, cbk){
		if (!isShowDialog || (Meilishuo.config.weibo_bind != 1 && Meilishuo.config.weibo_bind != 2) || Meilishuo.config.weibo_act != 0) {
			setTimeout(cbk, 500);
			return;
		}
		folSyncFun(fuid, type, cbk);
	}
});
