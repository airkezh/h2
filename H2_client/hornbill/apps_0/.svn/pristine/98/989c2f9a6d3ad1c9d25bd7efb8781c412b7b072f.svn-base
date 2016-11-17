fml.define('app/zeroFollowPop', ['jquery', 'component/iStorage', 'app/userApi', 'component/shareTmp', 'ui/dialog', 'component/urlHandle'], function(require, exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var storage = require('component/iStorage');
	var goUrl = require('component/urlHandle');
	var userApi = require('app/userApi').userApi;
	var url_getRec = '/aj/recommend/daren_home?num=8&type=alert';
	var url_clear = '/aj/recommend/clear_alert?num=8&type=alert&frm=rec_pop';
	var zeroFolKey = Meilishuo.config.user_id + 'zeroFol';
	var callback = function(res) {
		if (!res || res.length == 0) return;
		var credit = ['', 'i_lv', 'i_special', 'i_editor', 'i_zv'];
		for (var i=0, len=res.length; i<len; i++) {
			var dt = res[i];
			if (typeof dt.status == 'undefined') break;
			switch(dt.status) {
				case 0:
					if (dt.rank) dt.sim = '与你喜好相似度' + dt.rank + '%'; break;
				case 1:
					if (dt.weibo_name) dt.sim = '你的微博好友: ' + dt.weibo_name; break;
				case 2:
					dt.sim = '在你附近的人'; break;
				case 3:
					if (dt.tag) dt.sim = dt.tag; break;
			}
			dt.credit = dt.credit==0 ? '' : '<em class="' + credit[dt.credit] + '">&nbsp;</em>';
		}
		var data = {'fol_user' : res};
		data.frm = '?frm=pop_fl';
		var zeroFolTpl = shareTmp("zeroFollowTpl", data);
		var folTipTpl = shareTmp("folTipTpl");
		function zeroFollow() {
			$("#maskLayer").remove();
			$("#dialogLayer").remove();
			var closeFolDia = new dialog({windowId : 'zeroFolDiaLayer', dialogTitle : '', content : $(zeroFolTpl), width : 605});
			var $folDia = $('#zeroFolDiaLayer');
			$folDia.find('#dialogTitle').hide();
			$folDia.find('.close_z').click(function(){ 
				storage.set(zeroFolKey, 1);		//never pop
				closeFolDia.drive.destroyModel(); 
			});
			//when screen height < dialog height...
			var isIE6  = $.browser.msie && $.browser.version=='6.0';
			if (isIE6) {
				if (parseInt($folDia.css('top')) - parseInt($(window).scrollTop()) < 0)
					$folDia.css('top', $(window).scrollTop());
			} else {
				if (parseInt($folDia.css('top')) < 0) $folDia.css('top', 0 + 'px');
			}
			var $selectAll = $('#selectall'),
				$checkbox = $('[id=checkedbox]');
			$selectAll.click(function(){
				$checkbox.prop('checked', $selectAll.prop('checked'));
			});
			$checkbox.click(function(){
				$selectAll.prop('checked', false);
			});
			$('#afterFollow').click(function(){
				var followUids = [], i=0;
				$checkbox.each(function(){
					if ($(this).prop('checked') == true)
						followUids[i++] = $(this).attr('usrId');
				});
				if (followUids.length == 0) {
					closeFolDia.drive.destroyModel();
					new dialog({title : '提示', content : $(folTipTpl), width : 370, onClose : function(){ zeroFollow(); }});	
					$('#follow_confirm').click(function(){ $('#dialogLayer').remove(); zeroFollow();});
					return;
				}
				followUids = followUids.join(':');
				$.get('/aj/recommend/clear_alert?num=15');
				userApi('follow', {"fuid" : followUids}, function(){
					goUrl.redirect('/'); 
				});
			});
			$.get(url_clear);
		}
		zeroFollow();
	};
	return function(){
		var fliterPages = ['register_step3', 'register_step4', 'home'];
		for (var i in fliterPages) 
			if (Meilishuo.config.controller === fliterPages[i]) return;
		if (Meilishuo.config.level == 5 || location.href.indexOf('landing')>-1) return;
		if ($('#dialogLayer').length > 0) return;
		var t = new Date;
		t = parseInt(t.getTime()/86400000);
		storage.get(zeroFolKey, function(v){
			if (v && (v == 1 || (t - v < 1))) return;
			storage.set(zeroFolKey, t);
			$.get(url_getRec, {}, callback, 'json');
		});
	}
});
