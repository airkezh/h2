fml.define('sum/init' , ['sum/items', 'sum/page', 'sum/goods'] , function(require , exports){
	var items = require('sum/items');
	var page = require('sum/page');
	var goods = require('sum/goods');
	var loadImg = function(url, callback){
		var img = new Image();
		img.src = url;
		img.onload = function(){
			img.onload = null;
			callback();
		}
//		console.log('loadImg');
	};
	return function(obj){
		if((localStorage || []).length > 0){
			localStorage.clear();
			console.log('clearLocal');
		}
		var url = '';
		url = 'http://i.meilishuo.net/css/images/app/summer/init.png';
		loadImg(url, function(){
			$('#init_window').find('li').css('opacity',1);
			url = 'http://i.meilishuo.net/css/images/app/summer/body_section1.png';
			loadImg(url, function(){
				var t = window.setTimeout(function(){
					$('.itemsObj,header').show();
					$('#init_window').fadeOut('slow',function(){
						$(this).remove();
					});
				},4000);
			});
			for(var i = 0;i<6;i++){
				loadImg('http://i.meilishuo.net/css/images/app/summer/bs_big_' + i + '.png',function(){});
			}
			items('itemsObj');
		});

		$('.poster_wall').live('click', function(){
			$(this).addClass('isPop');
			goods('bookObj', this);
			$('.back').attr('id','go_book');
		});
		$('#go_items').live('click', function(){
			$(this).attr('id','none').hide();//.css({opacity : 0});
			$('.book_body').removeClass('open load');
			fml.vars.openBookOuter = true;
			page.autoPage('.book_body', false);
			var t = window.setTimeout(function(){
				$('#bookObj').removeClass('load');
				var t = window.setTimeout(function(){
					$('#itemsObj').show();
					$('#bookObj').remove();
					var t = window.setTimeout(function(){
						$('#itemsObj .isPop').removeClass('isPop');
					}, 10);
					$('#itemsObj section').find('li').removeClass('undo');
				}, 800);
			}, 800);
		});
		$('#go_book').live('click', function(){
			$(this).attr('id', 'go_items');
			$('#goodsObj').removeClass('load');
			$('#bookObj').show();
			$('.goods_wall1').masonry('reload');
			var t = window.setTimeout(function(){
				$('#bookObj .isPop').removeClass('isPop');
			}, 10);
			var t = window.setTimeout(function(){
				$('#goodsObj').remove();
			}, 400);
		});
	};
});
