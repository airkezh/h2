fml.define('app/posterWalls' , ['component/userstate' , 'component/iStorage', 'component/waterfall' ,'app/referrer' , 'app/checkLogin' , 'component/windowScroll' , 'jquery' , 'component/shareTmp' ] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var scroll = require('component/windowScroll');
	var check = require('app/checkLogin');
	var refer = require('app/referrer');
	var ua = require('component/userstate');
	var pin = require('component/waterfall');
	var storage = require('component/iStorage');
	var minHeight = 0;
	var isPosterLoad = false;
	var	html_botSpinner = $('.botSpinner');
	var html_paging_panel = $('.paging_panel');
	var pageSize = 220;
	var html_midSpinner = $('.midSpinner');

	var content_fluid = $('.content_fluid , .header_top');		
	var colWidth = pin.getSettings('colWidth');
	var colNumMin = pin.getSettings('colNumMin');
	var showPg = function(){
		html_paging_panel.removeClass('none_f')
        html_botSpinner.hide()	
	}
	var i = 0;
	var getPoster = function(urlData , posterUrl , options){
		html_botSpinner.show();
		var callback = function(response){
			if (response.code === 0 || response.error_code === 0) response = response.data;
			if (options && options.onData) response = options.onData(response);
			if(response){
				if(response['continue']){
					urlData.frame++;
					getPoster(urlData , posterUrl , options);	
					return; 
				}	
				//log attr poster?
				html_botSpinner.hide();
				html_midSpinner.hide();
				pin.append(shareTmp('posterWall' , response));
				minHeight = pin.getMinCH();

				var goodsPage = response.totalNum / pageSize;
				var frameSize = response.frame_size || 20
				if(((Math.floor(goodsPage) == urlData.page) && (response.tInfo.length < frameSize)) || response.tInfo.length == 0){
					showPg();
				}
			
			   fml.vars.toLogPoster && window.setTimeout(function(){
								fml.fireProxy('logPoster' , response)
								}, 2000)
				//大于5帧 停止继续加载	
				//Infinite为1时为无限下拉加载
				if(urlData.frame >= 10 && !(options && options.Infinite)){
					showPg();
					if (Meilishuo.config.user_id > 0) return;
					/*
					#10027
					fml.fireProxy('showLoginWin', check);
					*/
					return;
				}else{
					
					if(response.tInfo && +response.totalNum > +frameSize && Math.floor(response.totalNum/frameSize) > urlData.frame){
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
		var _subWin = (options && options.subScroll) ? $(options.subScroll) : null;
		pageSize =  options && options.pageSize || pageSize

        /**
         * 为了避免 reload() 操作对其他页面产生影响，所以只针对好店做该操作
         */
        options && options.isShop && pin.reload();

		var scrollPoster = function(){
			scroll.bind(function(pos , isDown){
				if(!isDown) return;
				var winH = _win.height(); 
				var top = pos + winH; 
				if (_subWin && _subWin.scrollTop()) top += _subWin.scrollTop() + 500;
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
			fml.fireProxy('logPoster' , poster0)
			delete Meilishuo.config.poster0	
		}else{
			getPoster(urlData , posterUrl , options);	
		}

		scrollPoster();
	}
});
