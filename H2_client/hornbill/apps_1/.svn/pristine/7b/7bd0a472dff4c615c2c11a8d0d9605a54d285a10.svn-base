/*common*/
var $ = require('wap/zepto'),
	scroll = require('wap/component/windowScroll'),
	lazy = require('wap/component/lazzyLoad'),
	scroll = require('wap/component/windowScroll'),
	$gotop = $('.gotop'),
	$pullUp = $('.pullUp'),
	$nav = $('.nav');
	require('wap/zepto');
	require('wap/zepto/scroll');


	var mlslm = {
		init:function(){
			this.lazyer = lazy.init({'xpath' : '.bs_load_img'});
			this.lazyer.scroll();
			this.lazyer.load();
			this.navFixed();
			this.eventInit();
		},
		navFixed: function(){
			scroll.yIn($nav.position().top + 10,function(){
				$nav.removeClass('scrollout').addClass('scrollin shadow');
			},
			function(){
				$nav.removeClass('scrollin shadow').addClass('scrollout');
			})
		},
		eventInit: function(){
			//回顶部
			$gotop.on('click', function(e) {
				document.body.scrollTop == 0 ? document.documentElement.scrollTop = 0 :
				document.body.scrollTop = 0;
			});
			$('.more').on('click' , function(){
				$(this).parent().find('.new_goods').show();
				$(this).hide();
			});
			// $('.img_hide').on('click' , function(){
			// 	$(this).parent().parent().find('.none_f').hide();
			// 	$(this).parent().removeClass('Hide');
			// });
			$('.new_goods').click(function(){
				window.location.href = $(this).find('a').attr('href');
			})
		    $('#m_ca a').on('click', function(index) {
		        var $that = $(this),
		            active = $that.attr('class'),
					Top = $('#'+ active).offset().top,
					nav_wap = $('#nav_wap').height();
				document.body.scrollTop = Top - nav_wap - 100;
		       
		    });

		}
	}
	mlslm.init();