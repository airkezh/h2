fml.define('sum/posterWall' , ['sum/goods' , 'sum/page' , 'component/pin' , 'component/shareTmp'] , function(require , exports){
	var $ = require('component/pin');
	var goods = require('sum/goods');
	var page = require('sum/page');
	var shareTmp = require('component/shareTmp');
	var minHeight = 0;
	var isTop = false;
	return function(urlData , posterUrl , objName){
		var afterPage = function(){
			var p1 = $('.goods_wall1'), p2 = $('.goods_wall2');
			var w1 = $('.wall'), w2 = $('.wall2');
			p1.html('').css({height : 0});
			w1.find('.spinnerBig').hide();
			p1.removeClass('goods_wall1').addClass('goods_wall2');
			p2.removeClass('goods_wall2').addClass('goods_wall1');
			w1.removeClass('wall').addClass('wall2');
			w2.removeClass('wall2').addClass('wall');
		};
		var getPoster = function(data , name){
			var name = name || '.goods_wall1';
			var data = data || {};
			var callback = function(response){
				if(response && (response.tInfo || []).length > 0 && (response.totalNum - 0) > 0){
					$('.spinner').hide();
					var str = sessionStorage.getItem(urlData.name);
					var a = (JSON.parse(str) || []); 
					if(urlData.frame == a.length){
						a.push(response);
				//		console.log('insert');
						var s = JSON.stringify(a);
						sessionStorage.setItem(urlData.name,s);
					}
				//	console.log(urlData.frame);
				//	console.log(urlData.name);
				//	console.log(a);	
					var tpl = shareTmp('posterWall' , {tInfo : response.tInfo, index : urlData.frame}); 
					$(name).append($(tpl));
					$(name).masonry('reload');
					var instance = $.data( $(name).get(0), 'masonry' );
					minHeight = instance.getHeight();
					if(urlData.frame == 0){
						page.autoPage('.book_body', true, afterPage);
	//					page.movePage('.book_body', true);
					}
					urlData.frame++;
				}else{
					if(urlData.frame == 0){
						$('.wall2 .spinnerBig').show();
						page.autoPage('.book_body', true, afterPage);
	//					page.movePage('.book_body', true);
					}
				}
				//大于5帧 停止继续加载
				if(urlData.frame >= 5 || response.totalNum <= urlData.frame * 40){
					fml.vars.isPosterLoad = false;
					return;
				}else{
					fml.vars.isPosterLoad = true;
				}
			};
			var s = sessionStorage.getItem(urlData.name) || '[]';
			var storageData = JSON.parse(s);
			if(storageData[urlData.frame]){
				callback(storageData[urlData.frame]);
			}else{
				$.get(posterUrl , data , callback , 'json');
			}
		}	
		var scrollPoster = function(name){
			var name = name || '.goods_wall1';
			var inner = $(name).parents('.page_inner');
			$('.page_inner').unbind('scroll');
			$(inner).bind('scroll' , function(){
				if( $(this).height() + $(this).scrollTop() >=  minHeight){
					if(fml.vars.isPosterLoad){
						fml.vars.isPosterLoad = false;
						$('.spinner').show();
						getPoster(urlData);
					}				
				}
			});
		}
		
		$('.book_body').addClass('open');
		getPoster(urlData , objName);
		scrollPoster(objName);
	}
});
