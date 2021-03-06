fml.use(['jquery' , 'component/iStorage', 'app/userFollow'] , function(){
	var $ = this.jquery;	
	var follow = this.userFollow;
	var storage = this.iStorage;
	$('.addFollow').live('click' , function(){
		var uid = $(this).attr('user_id');
		if(follow('add' , uid , function(){})){
			$(this).parent().html('<span class="followed removeFollow" user_id="'+ uid +'">已关注</span>')
		}	
	});
	$('.removeFollow').live('click' , function(){
		var uid = $(this).attr('user_id');
		if(follow('remove' , uid , function(){})){	
			$(this).parent().html('<span class="btn addFollow" user_id="'+ uid +'">＋加关注</span>');
		}
	});
	$('.darenBox').on('mouseover' , '.removeFollow' , function(){
		$(this).html('取消关注');
		});
	$('.darenBox').on('mouseout' , '.removeFollow' , function(){
		$(this).html('已关注');
		});
});

fml.use('component/lazyLoad' , function(){
    this.load('.imgBox>span' ,'asrc');
});

fml.use(['app/focus_banner', 'app/tracking'] , function(){
	var tracking = this.tracking,
		unit = '.top_bnr .banner li';

	this.focus_banner.bind({
		'unit' : unit
		,'btn': '.round .adType a'
		,'transition' : 'fade'
		,'btnpn': '.btnpn'
		,'toprev':'.bnr_btn_left'
		,'tonext':'.bnr_btn_right',
		cbk: function(el) {
			if(typeof el == 'number') {
				el = $(unit).eq(el);
			}
			tracking.logIt('main-banner', {
				index: el.index(),
				url: el.find('a').attr('href')
			});
		}
	})
});

fml.use('jquery' , function(){
	$('.sec_attr .list').hover(function(){
		$('.sec_attr .list').removeClass('active')
		$(this).addClass('active');
		$(this).children('.nav_list').show();
	},function(){
		$('.sec_attr .list').removeClass('active');
		$(this).removeClass('active');
		$(this).children('.nav_list').hide();
	});

	//bnr_btn
	$('.banner,.bnr_btn').hover(function(){
		$('.bnr_btn_wrap .bnr_btn').show();
	},function(){
		$('.bnr_btn_wrap .bnr_btn').hide();
	});
	
});

//好店推荐
fml.use(['jquery','app/followShop'] , function(){
	var followShop = this.followShop;

	followShop({
		el : '.recommend_shop',
		unfollowClass : 'add',
		followClass : 'unadd',
		follow : '+&nbsp;&nbsp;关注'
	});

	$('.recommend_shop .item').hover(function(){
		$('.mask',this).show();
	},function(){
		$('.mask',this).hide();
	});

	$('.recommend_shop .tab div').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		$('.recommend_shop .tab-item').eq($(this).index())
			.addClass('active').siblings().removeClass('active');
	});

});

//猜你喜欢
fml.use(['jquery','component/shareTmp'] , function(){
	var shareTmp = this.shareTmp;
	var page = 0;
	function getUrl(){
		return '/aj/welcome_aj/guessYouLike/?page=' + ( page ++ );
	}

	function getGuessData(url,cb){
		$.get(url,cb,'JSON');
	}

	function genContHtml(list){
		return shareTmp("guess_like_cont", {list:list, page:page -1 });
	}

	getGuessData(getUrl(),function(data){
		if(data && data.list){
			data.contHtml = genContHtml(data.list);
			var moduleHtml = shareTmp("guess_like", data);
			$('.newshop').after(moduleHtml);

			$('.guess_like .operate a').click(function(){
				getGuessData(getUrl(),function(rtn){
					if(rtn && rtn.list){
						$('.guess_like .cont').html(genContHtml(rtn.list));
					}
				});
			});
		}
	});

});
fml.use('app/eventHover' , function(){
	this.hoverShow('.hoverBox li' , '.hoverpic');
});

fml.define('page/welcome2015' , [] , function(require, exports){

});

