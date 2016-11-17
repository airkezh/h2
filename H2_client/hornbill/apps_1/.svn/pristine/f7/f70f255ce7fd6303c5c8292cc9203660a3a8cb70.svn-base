fml.define('page/huodong/sloggi', ['jquery', 'ui/dialog', 'component/shareTmp', 'app/shareTo', 'app/checkLogin'], function(require, exports){
	var $ = require('jquery');
	var dialog = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var check = require('app/checkLogin');

	var pids = ['546323778', '546354506', '546358720', '546362752'];
	var sel = '';

	$('.s_content').find('input').click(function(){
		if(!check()) {
			return;
		}
	});
	$('.s_content').find('img').click(function(){
		$(this).siblings('input').click();
	});

	$('.btn_view').click(function(){
		if(!check()) {
			return;
		}
		for (var i=1; i<7; i++) {
			if ($('[name=q'+i+']:checked').length == 0) {
				alert('你还没有做完测试哦');
				return;
			}
		}
		sel = $('[name=q6]:checked').val();
		var tpl = shareTmp('result_alert', {select: sel});
		var resDia = new dialog({
			content: tpl,
			width: 452
		})
		$('#dialogTitle').remove();
		$('#dialogContent').css('background','none');
		$('#dialogLayer').css('background','none');
		$('.result').find('.close').click(function(){
			resDia.drive.destroyModel();
		});
		var data = {
			pid : pids[sel-1],
			actName : 'sloggi',
			src : 'sloggi'
		}
		$.post('/wbapp/ajax_haibao', data);
		$.get('/aj/huodong/join_sloggi');
		$('.result').find('.btn_share').click(function(){
			var url = location.href;
			var desc = '不完美的世界，有人选择向左走，有人选择向右走，不管你选择哪个方向都要倾听内心世界的真实声音。sloggi和几米一起和你倾听内心的声音，更有sloggi惊喜礼品等着你 。';
			var pic = Meilishuo.config.picture_url + 'images/huodong/sloggi/result_' + sel +'.jpg';
			share.shareToWeibo(url, desc, pic);
			resDia.drive.destroyModel();
		});
	});
})
