fml.define('app/rollPoster' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	var defaults = {
		gap : 3000,			//carousel gap time
		type : 1,			//1: carousel top, 2: carousel left, 3: fade, 4: shift...
		numType : 1,			//num style
		speed : 50			//shift speed(left to right)
	};
	
	var catalogBanner = function(adBoxId, options, colNum){
		var $adBox = $(adBoxId);
		if ($adBox.length == 0) return;
		var $box = $adBox.find('.boxImg')
			, $boxImg = $adBox.find('._img')
			, $boxNum = $adBox.find('._num')
			, $boxBox = $box.parent()
			, $boxItem = $boxImg.find('._imgItem')
			, $cataPoint = $('.catalog_point')

			, cataPoint_width = $cataPoint.width()
			, boxBox_width = colNum * (226 + 6*2) - 6*2 - (24*2) - (28*2)
			, item_width = $boxItem.eq(0).width()

		if($cataPoint.length !== 0){
			boxBox_width -= cataPoint_width 
			$adBox.parent().css({'margin-left':cataPoint_width})
		}

		var item_len_all = $box.attr('num') // 原始总数
			, item_len = Math.floor(boxBox_width / item_width) // 每行个数 
			, item_roll = (item_len_all % item_len) == 0 ? 1 : item_len
		
			, box_width = item_width * item_len
			, boxImg_width = item_width * item_len_all + box_width

			, box_margin = (boxBox_width - box_width)/3 

			, len0 = Math.ceil(boxImg_width / box_width) -1  //针数
			
		var opts = $.extend({}, defaults, options);
		var clockTimeout = null;

		if(box_margin < 0) box_margin = 0;

		$box.css({'width': box_width})
		$boxImg.css({'width': boxImg_width})
		$boxBox.css({'margin-left': box_margin})
		
		if (len0 === 1){
			$(opts.left).hide();
			$(opts.right).hide();
			return;
		}else if(len0 === 2){
			if(item_len_all < (item_len * len0))
				$boxImg.append($boxItem.clone())	
		}
		
		var act = function( order) {
			$boxImg.stop(true, true);
			if(order == 1){
				$boxImg.animate({left: -box_width + 'px'}, 300, function(){
					$boxImg.css({left: 0}).find('._imgItem:lt(' + item_len + ')').appendTo($boxImg)
				});
			}
			if(order == -1){
				$boxImg.css({left: -box_width + 'px'}).find('._imgItem:gt(' + (item_len_all - 1 - item_len) + ')').prependTo($boxImg)
				$boxImg.animate({left: 0}, 300, function(){
				});
			}
		}
		var clock = function(order) {
			var order = order || 1
			act(order);
			clockTimeout = setTimeout(clock, opts.gap);
		};
		var goLeft = function(){
			clearTimeout(clockTimeout);
			clock(-1)
		}
		var goRight = function(){
			clearTimeout(clockTimeout);
			clock(1)
		}
		$(opts.left).on('click', goLeft)
		$(opts.right).on('click', goRight)

		var start = function() {
			clockTimeout = setTimeout(clock, opts.gap);

			$boxImg.hover(function(){
				clearTimeout(clockTimeout);
			}, function(){
				clockTimeout = setTimeout(clock, opts.gap);
			});
		};
		start();
	};

	exports.catalogBanner = catalogBanner;
});
