fml.use(['wap/zepto', 'wap/component/windowScroll','wap/zepto/fastclick', 'wap/zepto/scroll', 'wap/app/tracking'],function(require){
	var $gotop = $('.gotop'),
		onscroll = this.windowScroll,
		logTrack = this.tracking;
	$gotop.on('click' , function(){
		$('html,body').scrollTo({
			endY : 0,
			updateRate: 5
		});
	});
	var $gotop_wrap = $('.gotop_wrap');
	function gotop(pos,isDown){
		if(pos < 400){
			$gotop_wrap.hide();
		} else {
			$gotop_wrap.show();
		}
	}
	onscroll.bind(gotop,'gotop_wrap');

	var close_mask = function(){
		$('.mask').removeClass('show_sort').addClass('close_sort');
		setTimeout(function(){
			$('.mask').css({'display':'none'});
		}, 810);
		$('html, body').off('scroll', function(e){
			e.preventDefault();
			return false;
		});
	};
	var show_mask = function(){
		$('.mask').removeClass('close_sort').addClass('show_sort').css({'display':'block'});
		$('html, body').on('scroll', function(e){
			e.preventDefault();
			return false;
		});
	};

	$('.sort_item a').on('click', function(e){
		$('.mask').hide();
		logTrack.cr('bs_sort', {'frm': 'words_'+$(this).attr('data_name')});
		window.location.href = $(this).attr('href');
		e.stopPropagation();
		return false;
	});

	$('.mask').on('click', function(){
		setTimeout(close_mask, 300);
		return false;
	});
	$('.sort').on('click', function(){
		logTrack.cr('bs_sort', {'frm': 'sort_btn'});
		setTimeout(show_mask, 300);
		return false;
	});
});
fml.define('wap/page/biz/act_home_layer', ['wap/zepto'], function(require, exports){});