fml.define('wap/page/activity/promotion/promotion_poster', ['wap/zepto/touch', 'wap/component/windowScroll', 'wap/zepto/scroll', 'wap/component/waterfall', 'wap/app/posterWalls1', 'wap/component/shareTmp', 'wap/app/doota/timedown'], function(require, exports) {
	var shareTmp = require('wap/component/shareTmp'),
		pin = require('wap/component/waterfall'),
		colFlag = $('.goods_wall').siblings('.colFlag').css('z-index'),
		timedown = require('wap/app/doota/timedown')
	var pullUp = $('.pullUp');


    var onTop = false;

    var $i = $(".bannar  img")[0];
    if ($i.complete) {
        menuFixed();
    } else {
        $i.onload = function() {
            menuFixed();
        }
    }




	fml.vars.poster.totalColNum = colFlag || 2
	pin.init({
		containerId: '.goods_wall',
		containerWidth: document.body.clientWidth
	});
	var posterWall = require('wap/app/posterWalls1');




	var urlData = {
		'frame': 1,
		'pid': fml.vars.pid,
		'type': 'mob'
	}

	var pullUpAction = function() {
		posterWall.ajaxPoster('/aj/activity/promotion_poster_data');
	}
	Meilishuo.config.poster0 = '';
	posterWall.testPoster0(urlData, pullUpAction);
	posterWall.scrollPoster(true);
	fml.vars.toLogPoster = true
	fml.eventProxy('logPoster', function(res) {
		if (!res.tInfo.length) {
			$('.pullUp').hide();
		};
		var $_this = this;
		$('.time').each(
			function($_this) {
				var _this = $(this);
				_this.removeClass('time');
				timedown.down(this, _this.attr('time'), '0d-0h-0i-0s', ['<span>%v</span>天', '<span>%v</span>小时', '<span>%v</span>分', '<span>%v</span>秒']).onTimeOver(function() {
					_this.parents('span').html('团购已结束');
				});
			})
	})
	fml.vars.poster.scale = pin.getAttr('scale')
	fml.vars.poster.colWidth = pin.getAttr('colWidth')
	if (Meilishuo.config.poster0 && Meilishuo.config.poster0.tInfo.length > 0) {
		pin.append(shareTmp('posterWall', Meilishuo.config.poster0))
		pullUp.attr('status', 'tap');
	}
	setTimeout(function() {
		window.location.reload();
	}, 900000);

	// gotop
	var $gotop = $('.gotop'),
		onscroll = require('wap/component/windowScroll');
	$gotop.on("click", function() {
		$.scrollTo({
			endY: 0,
			duration: 300
		});
	});

	function gotop(pos, isDown) {
		if (pos < 30) {
			$gotop.hide();
		} else {
			$gotop.show();
		}
	}
	onscroll.bind(gotop, 'gotop');


    function menuFixed() {
        var $nav = $(".headline").eq(0);
        if(!$nav.length) return
        var nTop = parseInt($nav.offset().top);
        var $c = $nav.clone();
        fml.vars.$c = $c;
        $("body").append($c);
        var c2Top = $nav.height();

        $c.css({"z-index" : "1000","position" : "fixed", "top": "0", "width" :"100% ", "display" : "none"});


        var $nav2 = $(".banner_word").eq(0);
        var nTop2 = parseInt($nav2.offset().top);
        nTop2 -=  c2Top;
        var $c2 = $nav2.clone();
        $("body").append($c2);
        $c2.css({"z-index" : "1000", "position" : "fixed", "top": (c2Top+"px") , "width" : 60/64*100 + "%", "display" : "none"});

        $(window).on("scroll", function (event){
            action();
        });
        if (Meilishuo.config.os.iphone) {
            $(window).on("touchmove", function() {
                $c.css("display", "none");
                $c2.css("display", "none");
            })
        }
        function action() {
            if ($(window).scrollTop() >= nTop) {
                $c.css("display", "block");
            } else {
                $c.css("display", "none");
            }
            if ($(window).scrollTop() >= nTop2) {
                $c2.css("display", "block");
            } else {
                $c2.css("display", "none");
            }
        }
    }



    $(".banner_inner a").on("click", function(e) {
        window.location.replace($(this).attr("href"));
        e.preventDefault;
    });


});