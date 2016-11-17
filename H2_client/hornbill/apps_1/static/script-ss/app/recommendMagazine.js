/*
	for home page recommend magazine in right bar
*/
fml.define('app/recommendMagazine', ['jquery', 'app/recommend', 'app/follow','component/shareTmp'], function(require, exports){
	var $ = require('jquery');
	var followMaga = require('app/follow');
	var rec = require('app/recommend');
	var shareTmp = require('component/shareTmp');

	return function() {
		var url_maga = '/aj/recommend/group_home?num=3';
		var $maga = $('.rec_maga'), $rep_maga = $('.rep_maga');
		var rep_maga = function(dt_maga) {
			if (dt_maga.length < 3) {
				$maga.parent().css('height','auto');
			}
			$maga.html(shareTmp("fol_maga", {'dt_maga':dt_maga}));
		}
		followMaga('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
		rec(url_maga, $maga, $rep_maga, rep_maga);
	}
});
