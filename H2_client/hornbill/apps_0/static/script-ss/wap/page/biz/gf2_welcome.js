fml.use(['wap/zepto', 'wap/component/windowScroll','wap/component/waterfall', 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = this.shareTmp;
	var scroll = this.windowScroll;
	var pin = this.waterfall;

	var pullUp = $('.pullUp')
		, win = $(window)
		, win_h = win.height()
		, win_w = win.width()
		, isPosterLoad = false
		, pullUp_top
		, urlData
		, pullUpAction
	
	var ajaxPoster = function(url){
	//	console.log('ajax f')
		isPosterLoad = false 
		pullUp.attr('status', 'loading');

		$.get(url, urlData, function(res){
			/*
			if(res.tInfo.length == 0){
				pullUp.attr('status', 'stop');
				return;
			}
			*/
			if(res.tInfo.length > 9){
				res.tInfo.length = 9;
			}
			loadPoster(urlData, res);
		}, 'json')
	}
	var loadPoster = function(urlData, data){
		pullUp.attr('status', 'tap');
		pin.append(shareTmp('posterWall' , data))
		urlData.frame++;
	//	console.log('load t')
		isPosterLoad = true;
	}

	var testPoster0 = function(data, action){
		urlData = data
		pullUpAction = action

		var poster0 = Meilishuo.config.poster0; 
		if (poster0 && poster0.tInfo.length > 0){
			urlData.frame++;
		//	console.log('test0 t')
			isPosterLoad = true;
	//		isPanLoad = true
			minHeight = pin.getAttr('minHeight');
		//	delete Meilishuo.config.poster0	
		}else{
			pullUpAction(urlData);
		}
	}

	var _urlData = {
		'frame' : 0,
		'access_token' : fml.vars.access_token,
		'id' : fml.vars.id,
		'cid' : fml.vars.cid,
		'row' : 3
	}

	testPoster0(_urlData , function(){
		ajaxPoster('/aj/biz/girls_rank')
	});
	// posterWall.scrollPoster();
});

fml.define('wap/page/biz/gf2_welcome', ['wap/zepto/touch', 'wap/app/dialog', 'wap/component/shareTmp'], function(require, exports){
	var shareTmp = require('wap/component/shareTmp');
	$('.js_showPic').on('tap', function(){
		$('.closeDialog').trigger('tap');
		setTimeout(function(){
			var tpl = shareTmp('alertMsg');
			$.fn.dialog({dialogContent : tpl , dialogTitle : '提示'});
			$('.delayclose').on('tap' , function(){
				$('.js_lookBrand').trigger('tap');
			});
		}, 800);
	});
	$('.js_lookBrand').on('tap', function(){
		var url = $(this).attr('go_href');
		var data = {
			'access_token': fml.vars.access_token,
			'id' : fml.vars.id,
			'cid' : fml.vars.cid
		}
		$.get('/aj/biz/girls_add', data, function(res){
			location.href = url;
		}, 'json').error(function(){
			location.href = url;
		});
		setTimeout(function(){
			location.href = url;
		}, 500);
	});
});
