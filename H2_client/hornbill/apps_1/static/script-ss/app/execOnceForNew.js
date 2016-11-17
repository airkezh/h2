fml.define('app/execOnceForNew' , ['jquery', 'app/tracking', 'component/iStorage', 'component/windowScroll', 'app/addFavorite'] , function(require , exports){
	var $ = require('jquery');
	var logTrack = require('app/tracking');
	var storage = require('component/iStorage');
	var addFav = require('app/addFavorite');
	var scroll = require('component/windowScroll');
	// #2802 新用户landing收藏浮层
	var addFavorNew = function() {
		storage.get('isAddFavorite', function(v) {
			if (v === '1') return;
			storage.get('isAddFavorNew', function(v1) {
				v1 = v1 || '';
				var val = v1.split(';');
				for (var vv in val)
					if (val[vv] === '1') return;
				var href = 'http://www.meilishuo.com/';
				var $favorNew = $('.favor_new');
				if ($favorNew.length === 0) return;
				if ($('.mag_favor').length > 0) return;
				$('.favor_new').show();
				storage.set('isAddFavorNew', v1+';1');
				$favorNew.find('.fav_close').click(function(){
					$favorNew.hide();
				});
				$favorNew.find('.add_fav_new').click(function(){
					addFav.addFavorite({'href':href, 'frm':'hf2', 'tipPos':{'right':95,'top':1}});
					$favorNew.hide();
				});
			});
		});
	}

	// #2806 drive回访内容杂志引导收藏
	var addMagFavor = function() {
		if ($('.mag_favor').length === 0) return;
		storage.get('isAddFavorMag', function(v) {
			if (v && v > 2) return;
			v = v || 0;
			storage.set('isAddFavorMag', parseInt(v)+1);
			if ($('.favor_new').length !== 0) $('.favor_new').hide();
			var $mag_fav = $('.mag_favor');
			$mag_fav.show();
			if ($.browser.msie && $.browser.version == '6.0') {
				$mag_fav.css({'position':'absolute', 'left':'0px', 'top':$(window).scrollTop() + 260 + 'px'});
				scroll.bind(function(pos){
					$mag_fav.css({'top':pos + 260 + 'px'});
				});
			}
			function closeFav() {
				$mag_fav.hide();
			}
			$mag_fav.find('.close_fav').click(function(){ closeFav(); });
			$mag_fav.find('.add_fav').click(function(){
				logTrack.cr('add_favor_from_mag');	
				addFav.addFavorite({'href':location.href.split('?')[0], 'frm':'hfapp', 'name':$('.mag_fav_name').text()+'-美丽说','notShowTip':true});
				closeFav();
			});
		});
	}
	
	// #2818 新用户landing的banner
	var bannerAddFavor = function() {
		if ($('.ban_add_fav').length === 0) return;
		$('.ban_add_fav').click(function() {
			logTrack.cr('add_favor_from_land_ban');	
			addFav.addFavorite({'frm':'hf5', 'obj':'.ban_add_fav','tipPos':{'center':true, 'top':30}});
		});
	}

	return function() {
		if (location.href.indexOf('/group/') > -1 && !($.browser.safari)) {
			storage.get('isAddFavorite',function(v){ 
				if(v === '1') return;
				addMagFavor();
			})
		}
//		addFavorNew();
		bannerAddFavor();
	}
});
