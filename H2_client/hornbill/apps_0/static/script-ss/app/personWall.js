fml.define('app/personWall' , ['app/referrer' , 'app/checkLogin' , 'component/windowScroll' , 'jquery' , 'component/waterfall' ,  'component/shareTmp' , 'component/storage'] , function(require , exports){
	var $ = require('jquery');
	var pin = require('component/waterfall');
	var shareTmp = require('component/shareTmp');
	var scroll = require('component/windowScroll');
	var check = require('app/checkLogin');
	var storage = require('component/storage');
	var refer = require('app/referrer');
	var isPosterLoad = false;
	var pageSize = 160;
	var minHeight = 0;
	var totalNum = 0;
	var	html_botSpinner = $('.botSpinner');
	var html_paging_panel = $('.paging_panel');
	var html_midSpinner = $('.midSpinner');
	var content_fluid = $('.content_fluid , .header_top');		
	var colWidth = pin.getSettings('colWidth');
	var colNumMin = pin.getSettings('colNumMin');
	var showPg = function(){
		html_paging_panel.removeClass('none_f')
        html_botSpinner.hide();	
		html_midSpinner.hide();
		isPosterLoad = false;
	}

	return function(urlData , posterUrl){
		var getPoster = function(data){
			data = data || {};
			html_botSpinner.show();
			var callback = function(response){
				if(response.magazine && response.goods){
					data.isFrame = 1;	
				}
				if((response.goods && response.goods['continue']) || (response.magazine && response.magazine['continue'])) {
					urlData.frame++;
					getPoster(urlData);
					return;
				}
				if(response.magazine && response.magazine.tInfo.length == 0){ 
					showPg();
					return;
				}
				if(response.goods && response.goods.tInfo.length == 0){ 
					showPg();
					return;
				}
				html_botSpinner.hide();
				html_midSpinner.hide();
				if(response.goods){
					var goodsPage = response.goods.totalNum / pageSize;
					if((Math.floor(goodsPage) == urlData.page) && (response.goods.tInfo.length < 20)){
						showPg();
					}
				}
				if(response){
					if(response.magazine && response.magazine.tInfo.length > 0){
						pin.append(shareTmp('magazineWall' , response.magazine));
					}
					if(response.goods && response.goods.tInfo.length > 0){
						pin.append(shareTmp('posterWall' , response.goods));
					}
					if(response.shop && response.shop.tInfo.length > 0){
						if(data.newFocusShop == 'true'){
							$.each(response.shop.tInfo, function(index, item){
								item.newFocusShop = 1;	
							})
							pin.append(shareTmp('shopWall' , response.shop));
						}else{
							pin.append(shareTmp('posterWall' , response.shop));
						}
					}
					if(urlData.type == 'book' || !urlData.type){
						totalNum = +fml.vars.totalNum + +fml.vars.shareTotalNum;	
					}
					if(urlData.type == 'share' || urlData.type == 'like'){
						totalNum = response.goods.totalNum;	
					}
					if(urlData.type == 'editor' || urlData.type == 'follow'){
						totalNum = response.magazine.totalNum;	
					} else if (urlData.type == 'shop') {
						totalNum = response.shop.totalNum
						}
					window.setTimeout(function(){
						fml.fireProxy('logPoster' , response)
					}, 25)
				}
				minHeight = pin.getMinCH();
				//$('.goods_wall').masonry('reload');
				//var instance = $.data( $('.goods_wall').get(0), 'masonry' );
				//minHeight = instance.getHeight();

				// twitter页面加载个人海报 只加载3帧
				if(urlData.is_twitter && urlData.frame >= 2){
					isPosterLoad = false;	
					$('.botSpinner').hide();
					if (refer != 'gdt.qq' && refer != 'weibo') return;
					if (Meilishuo.config.user_id > 0) return;
					storage.getSession('log_pop_sess', function(v){		
						if (v) return;
						storage.setSession('log_pop_sess', 1);
						check();
					});
					return;
				}
				//大于5帧 停止继续加载
				if(urlData.frame >= 7){
					//显示分页
					$('.paging_panel').removeClass('none_f');
					isPosterLoad = false;
					html_botSpinner.hide();
					if (refer != 'gdt.qq' && refer != 'weibo') return;	
					if (Meilishuo.config.user_id > 0) return;	
					storage.getSession('log_pop_sess', function(v){		
						if (v) return;
						storage.setSession('log_pop_sess', 1);
						check();
					});
					return;
				}else{
					if(Math.floor(totalNum/20) > urlData.frame){
						isPosterLoad = true;
					}
					html_botSpinner.hide();
				}
				urlData.frame++;
			}
			$.get(posterUrl , data , callback , 'json');
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
