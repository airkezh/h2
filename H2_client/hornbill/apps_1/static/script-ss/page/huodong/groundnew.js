fml.define('page/huodong/groundnew' , ['jquery','component/windowScroll'] , function(require, exports){
	var $ = require('jquery'),
		scroll = require('windowScroll');
	var subNav = $('.tab')
		,subOrgParent = subNav.parent()
		,subHolder = $('#navbar .sec_nav')
		,wheader = $('#navbar .wheader,#navbar .sale_nav');
	var y = subNav.offset().top - 80;
	scroll.yIn(y , function(){
		subNav.css('margin-bottom','0');
		subHolder.append(subNav)
		subHolder.show();
		wheader.stop().animate({'margin-top':-30},function(){
			if (subNav.parent().is(subHolder)) $(this).hide()
			})
		},function(){
		subNav.css('margin-bottom','30px');
		subOrgParent.prepend(subNav)
		subHolder.hide();
		wheader.show().stop().animate({'margin-top':0})
			});
	$('.main').on('click','.grypeach',function(){
		var _this = $(this);
		var _num = _this.parents('.tPosterCon').find('.likeBtn span')
		$.post('/aw/twitter/like',{'stid' : _this.parents('.poster_grid').attr('twitter_id')},function(){
			if(_this.find('.addlike').length){
				_this.find('.addlike').removeClass('addlike').addClass('dellike');
				_num.html(+_num.html()+1);
			}else{
				_this.find('.dellike').removeClass('dellike').addClass('addlike');
				_num.html(+_num.html()-1);
			}
		});
	});
});
fml.use('app/forward' , function(){
	    this.posterForward('.main' , '.grymag');
});
fml.use(['app/doota/tab','jquery','app/page','component/shareTmp','plus/jplayer','app/audio'] , function(){
var $ = this.jquery,page = this.page;
var shareTmp = this.shareTmp;
var _audio = this.audio;
var wrapBox = $('.top'),
	doc =  $(document);
$('.j-cur ').click(function(){
		var index = $('.j-cur ').index($(this));
		$('#newPagingNav').off('click').attr('binded','');
		page({
			'totalNum' : fml.vars['num' + index]
			,'url' : '/aj/ground/?type=' + $(this).attr('type')
			,'tmpId' : 'show-li'
			,'commentPnl' : $('.main .show-list')
			,'pageNav' : $('#newPagingNav')
			,'pageSize' : 40
			,'processData' : function(res){
				var list = {'item' : res.data}
				if (res && res.data.tInfo && res.data.tInfo.length) {
					$('#newPagingNav').insertBefore('body').hide();
					var list = {'item' : res.data};
					var commentItem = shareTmp('showli' , list);
					$('.main .show-list').html(commentItem);
					$('.main,.show-list').show()
					$('#newPagingNav').insertBefore('.page-show').show();
				}
				_audio();
				if (!wrapBox.length) return
				var top = wrapBox.offset().top
				if (top > doc.scrollTop()) return
				wrapBox[0].scrollIntoView()
			}
		});

		})
this.tab.bind({
	'tagPnl' : '.tab-inner'
	,'tabTag' :'.j-cur'
	,'activeTagClass' : 'choice'
	,'contents': '.main'
	,'index' : fml.vars.type
	,'onActive' : function(_index,index){
		var tabs = $('.j-cur'),
		ele = tabs.eq(index);
		tabs.eq(_index).removeClass('choice')
		ele.addClass('choice')

	}
	,'onShowed' : function(context){
		if($('.sec_nav .tab').length)
			window.scrollTo(0 , $('.top').offset().top )
		}
	})
$('.j-cur').eq(fml.vars.type).click();
});
