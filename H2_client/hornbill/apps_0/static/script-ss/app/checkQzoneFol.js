fml.define('app/checkQzoneFol' , ['jquery', 'component/iStorage', 'component/shareTmp', 'component/dialog', 'app/tracking'] , function(require , exports){
	var $ = require('jquery');
	var storage = require('component/iStorage');
    var shareTmp = require('component/shareTmp');
    var dialog = require('component/dialog');
	var logTrack = require('app/tracking');
	var qzoneFolKey = Meilishuo.config.user_id + 'MEILISHUO_QZONE_FOL';
	var showQzoneFol = function() {
		var tpl = shareTmp('folQzonePopTpl');
		dialog.meiliDialog({dialogTitle : "" , dialogContent : $(tpl) , dialogWidth : 390 });
		var $dia = $('#dialogLayer');
		logTrack.cr('qzone_fol_pop');
		$dia.find('#dialogTitle').css('background', '#FFF');
		$dia.find('.close_z').hide();
		setTimeout(function(){$dia.find('.close_z').show()}, 6000);	
	}
	var showQzoneF = function(gap, log) {
		if (storage.getCookie('MEILISHUO_QZONE_FOL') == 1) return;	//@todo: for dolphin
		storage.getSession(qzoneFolKey, function(sVal) {	//if click close button, current session not show
			if (sVal) return;
			storage.setSession(qzoneFolKey, 1);
			storage.setCookie('MEILISHUO_QZONE_FOL', 1); //@todo: for dolphin
			if (log) logTrack.cr(log);
			setTimeout(showQzoneFol, gap);
		});
	}
	exports.showQzoneFol = showQzoneFol;
	exports.folQzoneUnLog = function(){ 
		$.get('/aj/checkIp/', function(res) {
			if (res != 0) return;
			showQzoneF(0, 'qzone_fol_pop_newUv');
		}, 'json');
	};
	exports.folQzoneLogin = function (){
		if (Meilishuo.config.user_id == 0) return;
		if (Meilishuo.config.qzone_notfans != 1 || Meilishuo.config.is_actived == 1) return;
		showQzoneF(1000);
	};
});
