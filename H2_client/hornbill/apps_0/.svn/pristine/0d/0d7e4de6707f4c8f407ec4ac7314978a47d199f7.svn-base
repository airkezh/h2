fml.define('app/paipaiWalls' , ['component/userstate' , 'component/waterfall' ,'app/referrer' , 'component/windowScroll' , 'jquery' , 'component/shareTmp' ] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var scroll = require('component/windowScroll');
	var refer = require('app/referrer');
	var ua = require('component/userstate');
	var pin = require('component/waterfall');
	var minHeight = 0;
	var isPosterLoad = false;
	var	html_botSpinner = $('.botSpinner');
	var html_paging_panel = $('.paging_panel');
	var pageSize = 160;
	var html_midSpinner = $('.midSpinner');
	
	var content_fluid = $('.content_fluid , .header_top');		
	var colWidth = pin.getSettings('colWidth');
	var colNumMin = pin.getSettings('colNumMin');
	var showPg = function(){
		html_paging_panel.removeClass('none_f')
        html_botSpinner.hide()	
	}
	var getPoster = function(urlData , posterUrl , options){
		html_botSpinner.show();
		var callback = function(response){
			if (options && options.onData) response = options.onData(response);
			if(response){
				if(response['continue']){
					urlData.frame++;
					getPoster(urlData , posterUrl , options);	
					return; 
				}	
				html_botSpinner.hide();
				html_midSpinner.hide();
				pin.append(shareTmp('posterWall' , response));
				minHeight = pin.getMinCH();

				var goodsPage = response.totalNum / pageSize;
				if(((Math.floor(goodsPage) == urlData.page) && (response.tInfo.length < 20)) || response.tInfo.length == 0){
					showPg();
					return; 
				}
				//大于7帧 停止继续加载	
				if(urlData.frame >= 7){
					showPg();
					return;
				}else{
					if(response.tInfo && response.totalNum > 20 && Math.floor(response.totalNum/20) > urlData.frame){
						isPosterLoad = true; 
						urlData.frame++;
					}else{
						html_botSpinner.hide();
					} 
				}
			}	
		}
		$.get(posterUrl , urlData , callback , 'json');	
	}
	return function(urlData , posterUrl , options){
		var _win = $(window);
		var scrollPoster = function(){
			scroll.bind(function(pos , isDown){
				if(!isDown) return;
				var winH = _win.height(); 
				var top = pos + winH; 
				//浏览器滚动大于等于当前海报最小高加载海报
				if(top >= minHeight - 300 ){
					if(isPosterLoad){
						isPosterLoad = false;	
						getPoster(urlData , posterUrl , options);
					}
				}
			});
		}
		var poster0 = Meilishuo.config.poster0; 
		if (poster0 && poster0.tInfo.length > 0){
			minHeight = pin.getMinCH();
			urlData.frame++
			isPosterLoad = true;
			delete Meilishuo.config.poster0	
		}else{
			getPoster(urlData , posterUrl , options);	
		}

		scrollPoster();
	}
});
