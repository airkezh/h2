fml.use('app/tracking' , function(){
	this.logClick('.pins' , 'twitter_id' , 'cr/pin')
	});
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'word_name' : query.word_name || fml.vars._guang_word_name,
		'section' : query.section || 'hot',
		'price' : query.price || 'all'
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/getGoods/goods');
});
fml.use('app/userFollow' , function(){
	this('.addAds' , '.removeAds' , '.removeAds', 'red_sbtn' , 'pink_sbtn');
});
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('app/deletePoster_guang' , function(del){
	    del.deleteTrigger();
}); 
fml.use('app/admClick', function(){
    this.monitor();
})
fml.use('component/focus' , function(){
	    this.inputFocus('.searchKeyCatalog');   
});
fml.use(['jquery', 'component/windowScroll', 'component/userstate', 'component/urlHandle'], function(){
	if (fml.vars._guang_word_name != 'new') return;
	// for 粉条
	var $ = this.jquery;
	var scroll = this.windowScroll;
	var userstate = this.userstate;
	var goUrl = this.urlHandle;
	var h_update = $('.h_update');
	if ($.browser.msie && $.browser.version=='6.0') {
		scroll.bind(function(pos){
			h_update.css({'top':pos + 260 + 'px'});
		});
	}
	h_update.unbind('click').click(function(){
		goUrl.redirect('/guang/new');
	});
	
	var timer = 1;
	function newShareFunc() { 
		if (userstate.activity()) {
			$.get('/aj/getGoods/latest_num', function(res){
				if (!res) return;
				getProfileUpdate(res.change_size);
			}, 'json');	
		}
		if (timer > 5) timer = 5;
		window.setTimeout(newShareFunc, 20000 * timer);
	}
	window.setTimeout(newShareFunc, 2000);

	function getProfileUpdate(newshare) {
		if (newshare) {
			timer = timer * 1.5;
			if ($.browser.msie && $.browser.version == '6.0') {
				h_update.css({'position':'absolute', 'left':'0px', 'top':$(window).scrollTop() + 260 + 'px'});
			}
			h_update.fadeIn(400,function(){if($.browser.msie) this.style.removeAttribute('filter');}).find('span').html(newshare>99?'99+':newshare);
		} else {
			h_update.fadeOut(400,function(){if($.browser.msie) this.style.removeAttribute('filter');}); 
		}
	}
});
fml.use('component/lazyLoad' , function(){
	var ll = this
	window.setTimeout(function(){
	    ll.load('.imgBox>span' ,'asrc')
	    ll.load('.ad_pic a>span' ,'asrc')
	    ll.load('.attr_box ul.list a>span' ,'asrc')
		ll.load('.pretty_ent a>span', 'asrc')
	},600)
})
fml.use('app/sharePortal');
fml.use('app/attention' , function(){});
fml.define('page/guang' , [], function(){});
