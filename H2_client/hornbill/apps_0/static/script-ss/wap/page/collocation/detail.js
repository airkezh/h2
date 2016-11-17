/*common*/
var $ = require('wap/zepto')
	,iscroll = require('wap/iscroll')
	,Tracking = require('app/tracking')
	,$collect = $('.collect')
	,$buy = $('.buy')
	,$goodsBox = $('.goods-box')
	, _iscrollObj
	,isLogin = parseInt(fml.vars.isLogin) ? true : false;

function init(){
	if($('.slide-list') && $('.slide-list .wraper').find('a').length){
		var len = $('.slide-list .wraper').find('a').length;
		var $firstobj = $('.slide-list .wraper').find('a').first();
		var slideitemW = Math.ceil($firstobj.width() + parseFloat(getStyle($firstobj[0],'marginRight')));

		$('.slide-list .wraper').width(slideitemW * len);
		_iscrollObj = new iScroll(document.querySelector('.slide-list'), 
			{ useTransition: true
			, vScroll: false
			, hScroll: true
			, hScrollbar: false
			, vScrollbar: false
		});
	}
	handleEvent();
	window.MLS.didLogin = function() {
		location.reload();
	}
}

function handleEvent(){
	$collect.on('click', function(){
		var $self = $(this);
		if(isLogin){
			$.post('/collocation/aw/batchlike', {'stids' : fml.vars.tids, 'dress_id' : fml.vars.dress_id}, 
				function(res){ 
					if(!res.code){
						$self.removeClass().addClass('uncollect').text('已收藏到我的喜欢');
						Tracking.cr('page_element', {'_action': 'click' ,'_location': '_page_code=collocation-detail:_page_area=add_shopcart:_pos_name=like'});
					}

			}, 'json');
		}else{
			location.href = window.__get_r('meilishuo://login.meilishuo/', fml.vars.common_r);
		}
	})
}

function getStyle(obj,attr){    //获取非行间样式，obj是对象，attr是值
	if(obj.currentStyle){   //针对ie获取非行间样式
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];   //针对非ie
	};
};
init();

