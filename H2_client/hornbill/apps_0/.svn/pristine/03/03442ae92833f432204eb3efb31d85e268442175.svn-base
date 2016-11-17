fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var magazine_id = $("#magazne_id").val() || 0;
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'group_id' : magazine_id
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/magazinePoster');
});
fml.use('app/magaCommon', function(){});
fml.use('app/adPoster' , function(){
	this.adBanner('bottom', 'group');
});
fml.define('page/magazine_con' , ['jquery','app/addFavorite','app/tracking'] , function(require, exports){
	setTimeout(function(){
		if (Meilishuo.config.header_show_collection !== '1') return;
		var $ = require('jquery');
		var addFavor = require('app/addFavorite');
		var logTrack = require('app/tracking');
		var mag_id = $("#magazne_id").val() || 0;
		if ($('.g_pic').length === 0) return;
		$('.g_pic').click(function(){
			logTrack.cr('add_favor_from_mag');
			$(this).css('cursor','pointer');
			addFavor.addFavorite({'href':location.href.split('?')[0], 'frm':'hfapp', 'name':Meilishuo.config.mag_name+'-美丽说','tipPos':{'center':true,'top':100}, 'obj':'.g_pic'});
		});
	}, 50);

});
