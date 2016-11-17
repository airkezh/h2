/*
	for home page recommend daren in right bar
*/
fml.define('app/recommendDaren', ['jquery', 'app/recommend', 'app/userFollow', 'component/shareTmp', 'app/checkLogin'], function(require, exports){
	var $ = require('jquery');
	var rec = require('app/recommend');
	var followUser = require('app/userFollow');
	var shareTmp = require('component/shareTmp');
	var check = require('app/checkLogin');

	return function() {
		var url_daren = '/aj/recommend/daren_home?num=15';
		var $daren = $('.interest'), $rep_daren = $('.rep_daren');
		var rep_daren = function(dt_daren) {
			var credit = ['', 'i_lv', 'i_special', '', 'i_zv'];
			for (var i=0, len=dt_daren.length; i<len; i++) {
				var dt = dt_daren[i];
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
				var creditBak = dt.credit;
				dt.credit = dt.credit==0 ? '' : '<em class="' + credit[dt.credit] + '">&nbsp;</em>';
				if (creditBak == 3) dt.credit = '<a class="i_editor" href="http://www.meilishuo.com/super_editor?frm=super" target="_blank">&nbsp;</a>'
			}
			$daren.html(shareTmp("fol_daren", {'dt_daren':dt_daren}));
		}
		
		followUser('.addRec', '.removeRec', '.followedhover', 'btn folbtn', 'followed folbtn followedhover', function(){
			if ($(this).hasClass('btn')) $.get('/aj/recommend/clear_alert?num=15');		
		});

		rec(url_daren, $daren, $rep_daren, rep_daren);
	}
});
