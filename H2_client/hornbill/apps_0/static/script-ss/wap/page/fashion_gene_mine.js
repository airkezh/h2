/*common*/
var $ = require('wap/zepto')
require('wap/zepto/touch')
var appIcon = require('wap/app/appIcon')
var openAppLink = require('wap/app/openAppLink');

if (fml.vars.appShare) {
	var appOpts = {
		'share': {
			'param': fml.vars.params,
			'channels': ['weixin', 'weixin_timeline']
		},
		'cart': false
	}
	appIcon(appOpts);
}

var isMlsApp = Meilishuo.config.os.mlsApp


if(!Meilishuo.config.user_id && Meilishuo.config.isMine){
	if(isMlsApp){
		window.MLS.didLogin = function(){
			window.location.reload();
		}
		setTimeout(function(){
			location.href = 'meilishuo://login.meilishuo/'
		}, 500)
	} else {
		location.href = '/user/login/'
	}
}

/* 层级控制器，需要先调用init方法 */
var viewController = {
	viewParent: $('.main_container')
	,currentIndex: 0
	,length: 0 //总层数
	,init: function(index){
		// index 0~3 代表初始化时的层级
		index = index|0
		this.currentIndex = index
		this.length = this.viewParent.find('[class*=step_wrapper_]').length
		var length = this.length
		if(this.currentIndex>length-1) 
			this.currentIndex=length-1;
		if(this.currentIndex<0) 
			this.currentIndex=0;
		this.reloadView()
	}
	,next: function(){
		//跳转至下一层
		this.currentIndex++
		var length = this.length
		if(this.currentIndex>length-1) 
			this.currentIndex=length-1;
		this.reloadView()
	}
	,prev: function(){
		//回到上一层
		this.currentIndex--
		if(this.currentIndex<0) 
			this.currentIndex=0;
		this.reloadView()
	}
	,reloadView: function(){
		switch(this.currentIndex){
			case 0:
				this.viewParent.find('.step_others_wrapper').removeClass('show_other')
				$('.my_head_wrapper').css('opacity',1) //hack某些机型翻到后几页闪出头像的问题
				break;
			case 1:
			case 2:
			case 3:
				setTimeout(function(){
					$('.my_head_wrapper').css('opacity',0) //hack某些机型翻到后几页闪出头像的问题
				},300)
				this.viewParent.find('.step_others_wrapper').addClass('show_other')
				this.viewParent.find('.step_others').removeClass(function(index, className){
					var removeClasses = []
					className.split(' ').forEach(function(name){
						if(name.indexOf('show')!==-1){
							removeClasses.push(name)
						}
					})
					return removeClasses.join(' ')
				}).addClass('show'+(this.currentIndex+1))
				if(this.currentIndex===3){
					this.viewParent.find('.step_wrapper_4').addClass('show_ani')
				}
				break;
			default:
				break;
		}
	}
}

//禁止默认滑动事件
var startX = 0, startY =0
document.addEventListener('touchstart', function(event){
	var touch = event.touches[0]; //获取第一个触点  
    startX = Number(touch.pageX); //页面触点X坐标  
    startY = Number(touch.pageY); //页面触点Y坐标  
}, false)
document.addEventListener('touchmove', function (event) {
	if($(event.target).parents('.step_wrapper_3').length===0){
		event.preventDefault();
	} else {
		var touch = event.touches[0]; //获取第一个触点  
        var x = Number(touch.pageX); //页面触点X坐标  
        var y = Number(touch.pageY); //页面触点Y坐标
        if(Math.abs(startY-y)>Math.abs(startX-x)){
        	event.preventDefault();
        }
	}
}, false);


//初始化层级控制
viewController.init(0)

//初始化翻页滑动事件
;(function initSwipe(){
	var hasTransitionend = (function(){
		var transitions = {
			'transition':'transitionend',
			'OTransition':'oTransitionEnd',
			'MozTransition':'transitionend',
			'WebkitTransition':'webkitTransitionEnd'
		}
		for(var k in transitions){
			if(('on'+transitions[k]) in window)
				return transitions[k];
		}
		return false;
	})() //是否支持Transitionend
	var isBindOver = false; //已绑定翻页事件flag
	
	if(hasTransitionend){
		window.addEventListener(hasTransitionend, function(){
			closeSwipeEvent()
			initSwipeEvent()
		}, false)
	}

	initSwipeEvent()
	
	function initSwipeEvent(){
		if(isBindOver) return;
		isBindOver = true;
		$('.main_container').on('swipeUp', function(){
			closeSwipeEvent()	
			viewController.next()
		}).on('swipeDown', function(){
			closeSwipeEvent()
			viewController.prev()
		}).on('click', '.tle', function(event) {
			closeSwipeEvent()	
			viewController.init($(this).parent().index()+1)
			// viewController.next()
		});
	}

	function closeSwipeEvent(){
		isBindOver = false;
		$('.main_container').off('swipeUp swipeDown click')
		// if not support transitonend or no transition
		setTimeout(function(){
			initSwipeEvent()
		}, 500)
	}
})();

/* 第一页相关 */
var pageOneViewController = {
	init: function(index){
		index = index|0
		this.length = this.viewParent.find('.view').length
		this.currentIndex = index
		if(this.currentIndex>length-1) this.currentIndex=length-1;
		if(this.currentIndex<0) this.currentIndex=0;
		this.viewParent.on('swipeLeft', function(event) {
			pageOneViewController.next()
		}).on('swipeRight', function(event) {
			pageOneViewController.prev()
		});
	}
	,next: function(){
		this.currentIndex++
		var length = this.length
		if(this.currentIndex>length-1) return this.currentIndex=length-1;
		this.reloadView()
	}
	,prev: function(){
		this.currentIndex--
		if(this.currentIndex<0) return this.currentIndex=0;
		this.reloadView()
	}
	,reloadView: function(){
		this.viewParent.find('.showline').removeClass('showline')
		var $view = this.viewParent.removeClass(function(index, className){
			var removeClasses = []
			className.split(' ').forEach(function(name){
				if(name.indexOf('view')===0){
					removeClasses.push(name)
				}
			})
			return removeClasses.join(' ')
		}).addClass('view'+this.currentIndex).find('.view').eq(this.currentIndex)
		setTimeout(function(){
			$view.addClass('showline')
		}, 500)
	}
	,autoShow: function(){
		var _this = this
		var _view = this.viewParent
		_view.addClass('viewauto')
		_view.find('.showline').removeClass('showline')
		preventAllTouch()
		setTimeout(function(){
			_view.removeClass('viewauto')
			_this.reloadView()
			_view.find('[data-change]').addClass('show_change')
			setTimeout(function(){
				_view.find('[data-change]').removeClass('show_change')
			}, 2500)
			openTouch()
		}, 4100)
	}
	,length: 0
	,index: 0
	,viewParent: $('.step_wrapper_1')
}
pageOneViewController.init()
$('.step_wrapper_1').on('click', '.my_head_wrapper', function(event) {
	event.preventDefault();
	if(!Meilishuo.config.isMine) return;
	var url = __get_r('/fashion_gene/game/', fml.vars.page_r)
	if(isMlsApp){
		openScheme('openURL',{
			url:location.origin + url
			,inApp:1
			,require_login:1
		})
	} else {
		window.open(url)
	}
}).on('click', '.cata_circle_wrapper',function(event) {
	event.preventDefault();
	var style_id = $(this).data('style_id')
	var url =  __get_r('/fashion_gene/fashionGene/'+style_id, $(this).data('r'))
	if(!Meilishuo.config.isMine){
		url += '?user_id='+fml.vars.user_id;
	}
	if(isMlsApp){
		openScheme('openURL',{
			url:location.origin + url
			,inApp:1
			,require_login:1
		})
	} else {
		window.open(url)
	}
});

/* 第二页 */
var pageTwoViewController = {
	viewParent: $('.step_wrapper_2')
	,index: 0
	,length: 0
	,init: function(){
		this.index = 0;
		this.length = this.viewParent.find('.page2_ul').children('.page2_item').length
		var _this = this
		this.viewParent.on('swipeRight', function(event) {
			_this.prev()
		}).on('swipeLeft', function(event) {
			_this.next()
		});
	}
	,next: function(){
		this.index++
		if(this.index>this.length-1){
			this.index = this.length-1
		}
		this.reloadView()
	}
	,prev: function(){
		this.index--
		if(this.index<0){
			this.index = 0;
		}
		this.reloadView()
	}
	,reloadView: function(){
		var $ul = this.viewParent.find('.page2_ul')
		var itemWidth = $ul.width()
		var w = 'translateX('+(-itemWidth*this.index)+'px)'
		$ul.css({
			'transform':w
			,'-webkit-transform':w
		})
	}
}
pageTwoViewController.init()
$('.step_wrapper_2').on('click', '.cata_li', function(event) {
	event.preventDefault();
	var keywords = $(this).data('keywords')
	var xr = $(this).data('xr')
	var url = isMlsApp ?
		openAppLink.getAppLink({
			'protocol': 'search_goods_result',
			'param': {
				"tag_word": keywords
				,'coin' : '0'
			}
		}) :'/search/?keyword='+encodeURIComponent(keywords)
	window.location.href = window.__get_r(url, xr);
});

/* 第三页相关 */
$('.step_wrapper_3').on('click', '.page3_item[data-twitter_id]', function(event) {
	event.preventDefault();
	var twitter_id = $(this).data('twitter_id')
	var xr = $(this).data('xr')
	var url = isMlsApp ?
		openAppLink.getAppLink({
			'protocol': 'twitter_single',
			'param': {
				"twitter_info": {
					"twitter_id": twitter_id,
					"is_doota": 1
				}
			}
		}) :'/share/item/'+twitter_id
	window.location.href = window.__get_r(url, xr);
}).on('click', '.see_more', function(event) {
	event.preventDefault();
	var url = isMlsApp ?
		openAppLink.getAppLink({
			'protocol' : 'openURL'
			,'param' : {
				'url' : location.origin + '/guessulike'
				,'inApp' : 1
				,'require_login':1
			}
		}) : '/guessulike'
	window.location.href = window.__get_r(url,'fashion_gene-mine:_page_code=fashion_gene-mine:_page_area=nominate:_pos_id=-1');
});

/* 第四页相关 */
$('.step_wrapper_4').on('click', '.share_btn', function(event) {
	if(isMlsApp){
		var shareData = {
			title: fml.vars.params.title
			,text: fml.vars.params.text || fml.vars.params.title
			,thumb_url: fml.vars.params.pic
			,url:fml.vars.params.url
			,message_type:"webpage"
		}
		var data = {
			'share_items':{
				'weixin':{
					url:'meilishuo://share.meilishuo?json_params=' + encodeURIComponent(JSON.stringify($.extend(true, {type:'weixin'}, shareData)))
				}
				,'weixin_timeline':{
					url:'meilishuo://share.meilishuo?json_params=' + encodeURIComponent(JSON.stringify($.extend(true, {type:'weixin_timeline'}, shareData)))
				}
			}
		}
		openScheme('pop_share',data)
	}
}).on('click', '.download_btn', function(event) {
	event.preventDefault();
	openScheme('changetab',{"tab":"我"})
	setTimeout(function(){
		location.href = '/goto/download/'
	}, 1000)
});

if(Meilishuo.config.os.weixinBrowser){
	var signWX = require('wx/sign')//认证签名
	var shareWX = require('wx/share')//分享
	signWX()
	shareWX.bind({
	    "desc":fml.vars.params.text || fml.vars.params.title,
	    "imgUrl":fml.vars.params.pic,
	    "title":fml.vars.params.title
	});
}

/* 初始化*/
window.onload = function(){
	setTimeout(function(){
		$('#win_loading').remove()
		$('.step_wrapper_1').addClass('show_head') //头像从下到中间
		$('.main_container').show()
		if(isMlsApp) openScheme('close_web_refresh',{}) //禁用安卓下拉刷新
		pageOneViewController.autoShow()
	}, 500)
}

function openScheme(type, param){
	var paramStr = JSON.stringify(param)
	var href = 'meilishuo://'+type+'.meilishuo/?json_params='+encodeURIComponent(paramStr)
	var iframe = $('<iframe src="'+href+'">').hide()
	$('body').append(iframe)
}

function preventAllTouch(){
	$('#preventTouchMasker').show()
}

function openTouch(){
	$('#preventTouchMasker').hide()
}
