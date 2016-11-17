fml.define('app/searchWall' , ['app/referrer' , 'component/windowScroll' , 'component/waterfall' , 'jquery' , 'component/shareTmp' , 'component/storage' , 'component/regString'] , function(require , exports){
	var $ = require('jquery');
	var pin = require('component/waterfall');
	var shareTmp = require('component/shareTmp');
	var scroll = require('component/windowScroll');
	var storage = require('component/storage');
	var refer = require('app/referrer');
	var isPosterLoad = false;
	var pageSize = 220;
	var minHeight = 0;
	var totalNum = 0;
	var isTop = false;
	var info = {'goods' : 'tInfo', 'user' : 'uInfo', 'magazine' : 'gInfo','shop':'sInfo'};
	var tplWall = {'goods' : 'posterWall', 'user' : 'userWall', 'magazine' : 'magazineWall','shop':'shopWall'};
	var regString = require('component/regString');
	var html_botSpinner = $('.botSpinner');
	var html_paging_panel = $('.paging_panel');
	var html_midSpinner = $('.midSpinner');
	var content_fluid = $('.content_fluid , .header_top');          
	var colWidth = pin.getSettings('colWidth');
	var colNumMin = pin.getSettings('colNumMin');
	var showPg = function(){
		html_paging_panel.removeClass('none_f')
			html_botSpinner.hide()  
	}   
	if(fml.vars.search_totalNum.goods == 0) tplWall.goods = 'attrWall';
	return function(urlData , posterUrl){
		var getPoster = function(data){
			data = data || {};
			html_botSpinner.show();
			var callback = function(response){
				html_botSpinner.hide();
				html_midSpinner.hide();
				if(response){
					var response = response[urlData.filter];
					if(response){
						if(response[info[urlData.filter]].length == 0){
							showPg();
							return false;
						}
						totalNum = response.totalNum;
						var page = totalNum / pageSize;
						if((Math.floor(page) == urlData.page) && (response[info[urlData.filter]].length < 20)){
							showPg();
						}
						if(response[info[urlData.filter]].length > 0){
							var res = {'tInfo' : response[info[urlData.filter]], 'totalNum' : response.totalNum , 'regString' : regString , 'wallType' : 'searchWall'};
							var tpl = shareTmp(tplWall[urlData.filter] , res);	
							pin.append(tpl);
						}
					}
				}
				minHeight = pin.getMinCH();

				//大于7帧 停止继续加载
				if(urlData.frame >= 10){
					//显示分页
					showPg();
					isPosterLoad = false;
					return;
				}else{
					if(totalNum > 20 && Math.floor(totalNum/20) > urlData.frame){
						isPosterLoad = true;
					}
					html_botSpinner.hide();
				}
				urlData.frame++;
			}
			$.get(posterUrl , data , callback , 'json').error(callback);
		}	
		var _win = $(window);
		var scrollPoster = function(){
			scroll.bind(function(pos , isDown){
				if(!isDown) return;
				var winH = _win.height(); 
				var top = pos + winH; 
				//浏览器滚动大于等于当前海报最小高加载海报
				if(top >= minHeight){
					if(isPosterLoad){
						isPosterLoad = false;	
						getPoster(urlData);
					}
				}
			});
		}
		getPoster(urlData);
		scrollPoster();
	}
});
