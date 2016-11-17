fml.use('app/countdown', function(){
    this();
});
fml.use('component/lazyLoad', function(ll){
	setTimeout(function(){
		ll.load('.kl_user span', 'asrc');
	}, 1000);
});
fml.use('app/welfare_apply' , function(){});
fml.define('page/huodong/kleenex' , ['jquery', 'app/checkLogin', 'component/urlHandle'] , function(require , exports){
	var $ = require('jquery');
	var check = require('app/checkLogin');
	var redirect = require('component/urlHandle').redirect;
	//导航fix页面
	var left = ($(window).width() - '1044')/2;
	left = Math.ceil(left);
	var $kleenex_nav = $('.kleenex_nav');
	$kleenex_nav.css({'left' : left + 'px'});
	if($.browser.msie && $.browser.version == '6.0'){
		$kleenex_nav.css({'position' : 'absolute' , 'top' : $(window).scrollTop() + $(window).height() - '52' + 'px' , 'left' : left + 'px'});
		$(window).scroll(function(){
			$kleenex_nav.css({'position' : 'absolute' , 'top' : $(window).scrollTop() + $(window).height() - '52' + 'px' , 'left' : left + 'px'});
		});
	}
	//导航交互
	$kleenex_nav.find('a').on('click' , function(){
		var index = $kleenex_nav.find('a').index($(this));
		$('.k_nav0').attr('class' , 'k_hnav0');
		$('.k_nav1').attr('class' , 'k_hnav1');
		$('.k_nav2').attr('class' , 'k_hnav2');
		$('.k_nav3').attr('class' , 'k_hnav3');
		$('.k_nav4').attr('class' , 'k_hnav4');
		$(this).attr('class' , 'k_nav' + index);
	});
	//达人图片交互
	var daren_text = [
		'小王子就要上学了，最近正在训练他学擦屁屁。干纸巾怎么都擦不干净，直到发现舒洁湿厕纸。小baby的屁股是用婴儿湿巾擦，湿厕纸也是一样的，再也不用担心宝宝屁股擦不干净！',
		'自己试用后还把湿厕纸推荐给老爸和男朋友，其实男同胞们的很多难言之隐的问题都是重在预防啊！舒洁湿厕纸，擦得干净而且非常舒服，极其适合久坐办公室的男性同胞们使用。',
		'查了下发现舒洁湿厕纸是不含酒精的，而且PH弱酸性，还含有绿茶芦荟精华。最最重要的是，它通过了私密处敏感测试，这样一来我就放心地使用啦，现在每天包里都要带上它呢。',
		'对于女生来说，那几天又黏又闷，是最难受的时候，干的纸巾总没有办法擦拭干净。舒洁湿厕纸，湿润柔软，擦拭后干净清爽，而且通过了敏感测试，绝对适合女生私密处使用啊！',
		'刚开始觉得很疑惑，但试过后就惊呆了！什么叫做湿擦更干净，只有你试了才知道，现在彻底爱上这种真正干净的感觉，人从里到外更有自信。好有爱的新品，推荐给爱美的女生哦~',
		'知道湿厕纸是有因为一次偶然使用了美国回来的朋友带的，她把这个叫“厕纸神器”，因为真的超级好用，湿擦真的更干净！比光用卷纸擦不知道干净几倍，实在是必备哦！'
	];
	var $kl_daren = $('.kl_daren > div');
	$kl_daren.hover(function(){
		var i = $kl_daren.index($(this));
		if (i > 5) return;
		$(this).find('.kl_meng').stop(true, true).fadeOut('show');
		$('.kl_darentext').removeClass().addClass('dt'+(1+i)).addClass('kl_darentext').html(daren_text[i])
			.stop(true, true).slideDown('slow');
	}, function(){
		var i = $kl_daren.index($(this));
		if (i > 5) return;
		$(this).find('.kl_meng').stop(true , true).fadeIn('slow');
		$('.kl_darentext').stop(true , true).slideUp('slow');
	});


	//关注
	$('.btn_join').on('click' , function(){
		if(check()){
			$.post('/aw/user/follow', {fuid: '49671065'});
			$('.btn_join').removeClass('btn_join').addClass('joined').html('已经<br />加入');
			$(this).unbind('click');
		}
	});

	//监控代码
	var _monitor = function(name){
		CClicki[45479]._trackEvent({
   			type: 2,
    		labels: [
        		{"按钮名称": name}    /*填入按钮名称*/
    		],
    		values: [
        		{"点击数": 1} 
    		]
    	})
	}
	var _clickFun = function(obj, name) {
		$(obj).click(function(){
			_monitor(name);
		})
	}
	var _monObj = {
		'.kl_d1' : '达人a按钮',
		'.kl_d2' : '达人b按钮',
		'.kl_d3' : '达人c按钮',
		'.kl_d4' : '达人d按钮',
		'.kl_d5' : '达人e按钮',
		'.kl_d6' : '达人f按钮',
		'.btn_join' : '舒洁账号关注按钮',
		'.kl_group1' : '加香湿巾按钮',
		'.kl_group2' : '时尚加香湿巾按钮',
		'.kl_group3' : '迪斯尼无香湿巾按钮',
		'.g_1' : '优惠套餐a',
		'.g_2' : '优惠套餐b',
		'.g_3' : '优惠套餐c',
		'.g_4' : '优惠套餐d'
	}
	for (var k in _monObj) {
		_clickFun(k, _monObj[k]);
	}
	$('.video').on('mousedown', function(){
		_monitor('视频播放按钮');
	})
});
