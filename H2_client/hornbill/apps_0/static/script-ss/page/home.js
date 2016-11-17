fml.use(['jquery' , 'app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/home');
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
}); 
fml.use(['jquery', 'app/adPoster', 'component/urlHandle'] , function(){
	var $ = this.jquery;
	var ad = this.adPoster;
	var goUrl = this.urlHandle;
	var href = location.href;
	ad.adBanner('bottom', 'home');
	//for banner 黄条提示
	if (href.indexOf('frm=group_rec') > -1 || href.indexOf('frm=regStep4') > -1) {
		return;
	}
	ad.carousel('.ads_top',{'lazyPic':true});
});
fml.use('app/repinNotic', function(){
	this.repinNotic();
});
fml.use(['app/recommendDaren' , 'app/recommendMagazine'] , function(){
	this.recommendDaren();
	this.recommendMagazine();
});
fml.use(['jquery', 'component/windowScroll', 'component/userstate', 'component/urlHandle'], function(){
	// for 粉条
	var $ = this.jquery;
	var scroll = this.windowScroll;
	var userstate = this.userstate;
	var urlHandle = this.urlHandle;
	var h_update = $('.h_update');
	if ($.browser.msie && $.browser.version=='6.0') {
		scroll.bind(function(pos){
			h_update.css({'top':pos + 260 + 'px'});
		});
	}
	
	var timer = null;
	var data = {};
	var query = urlHandle.getUrl(location.href);
	var page = query.page || 0;
	var last_tid = '';
	function msgFunc() { 
		timer = window.setTimeout(msgFunc, 20000);
		if (userstate.activity()) {
			if (fml.vars['reset_last_tid']) last_tid = fml.vars['last_tid'];
			fml.vars['reset_last_tid'] = false;
			data = last_tid == '' ? {'page':page} : {'old_last_tid':last_tid, 'page':page};
			$.get('/aj/home/msg_num', data, function(res){
				if (fml.vars['reset_last_tid']) return;	//for /aj/home/message
				var newshare = res.change_size;
				if (last_tid == '') last_tid = res.last_tid;
				fml.vars['last_tid'] = res.last_tid;
				fml.vars['tids'] = res.tids;
				getProfileUpdate(newshare);
			}, 'json');	
		}
	}
	window.setTimeout(msgFunc, 5000);

	function getProfileUpdate(newshare) {
		if (newshare) {
			if ($.browser.msie && $.browser.version == '6.0') {
				h_update.css({'position':'absolute', 'left':'0px', 'top':$(window).scrollTop() + 260 + 'px'});
			}
			h_update.fadeIn(400,function(){if($.browser.msie) this.style.removeAttribute('filter');}).find('span').html(newshare>99?'99+':newshare);
		} else {
			h_update.fadeOut(400,function(){if($.browser.msie) this.style.removeAttribute('filter');}); 
		}
	}
});
fml.use(['component/waterfall' , 'jquery' , 'component/shareTmp' , 'component/urlHandle'], function(){
	//for 粉条点击事件处理
	var $ = this.jquery;
	var pin = this.waterfall;
	var shareTmp = this.shareTmp;
	var goUrl = this.urlHandle;
	var h_update = $('.h_update');
	var newshareClick = function() {
		//if quick click twice, then send two same req
		h_update.unbind('click');
		setTimeout(function(){h_update.click(newshareClick);}, 500);
		var newshare = h_update.css('display') == 'none' ? 0 : parseInt(h_update.find('span').html());
		if (newshare == 0) return;
		if (newshare > 0 && newshare < 20) {
			h_update.fadeOut();
			fml.vars['reset_last_tid'] = true;
			var tids_c = fml.vars['tids'] ? fml.vars['tids'].join(',') : '';
			var data = {'change_size':newshare, 'last_tid':fml.vars['last_tid'], 'tids':tids_c};
			$.get('/aj/home/message', data, function(res){
				if (!res) return;
				pin.prepend(shareTmp('posterWall', res))
				/*
				var tpl = shareTmp('posterWall', res);
				$(".goods_wall").prepend($(tpl));
				if($.browser.msie){
					location.href = location.href;
				}else{
					pin.reload();
				}
				*/
				setTimeout(function(){window.scrollTo(0, 0)},10);
				fml.vars['last_tid'] = res.last_tid;
			}, 'json');
		} else {
			goUrl.redirect('/ihome/');
		}
	};
	h_update.unbind('click').click(newshareClick);
});
fml.define('page/home', [], function(){
});
