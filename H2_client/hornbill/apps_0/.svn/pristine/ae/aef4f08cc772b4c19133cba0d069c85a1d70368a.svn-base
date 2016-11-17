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
fml.use('app/admClick', function(){
    this.monitor();
});
fml.use(['component/urlHandle' , 'component/dialog' , 'component/shareTmp'] , function(){
	var shareTmp = this.shareTmp;
	var dialog = this.dialog;
	var query = this.urlHandle.getParams(window.location.href.toString());
	var isfail = query.fail || '';
	if(isfail != ''){
		var html = shareTmp('noBoyTpl');
		dialog.meiliDialog({dialogTitle : "美丽提示" , dialogWidth : 420 , dialogContent : html }); 
		if(isfail == 'weibo')
			$('.toshare').addClass('toweibo').html('领取男生特别准入许可勋章，并转发到微博>>')
				.show().bind('click', function(){
					var url = '/connect/shareToWeibo/',
						data = {},
						callback = function(){
							$('.close_z').click();	
						};
					$.get(url , data , callback ,'json');
				});		
	}
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

fml.define('page/welcome2014' , [] , function(require, exports){

});

