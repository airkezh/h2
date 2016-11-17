/*common*/
var $ = require('wap/zepto')
, timedown = require('wap/app/doota/timedown')
, shareTmp = require('wap/component/shareTmp')
, dialog = require('wap/app/dialog')
,scroll = require('wap/component/windowScroll')
,touchSlide = require('wap/app/touchSlide'),
$imageSlide = $('#imageSlide'),
_adesc = $('.a-desc'),
$nav = $('.navbox'),
timer;

fml.vars.isexit = isexit;
fml.vars.joinurl = joinurl;

var special_new = {
	clienttablen : 5,  /*可视tab数*/
	targettabinx : 3,/*目标tab的索引*/
	Cwidth : document.body.clientWidth > 640 ? 640 : document.body.clientWidth, //内容窗口宽度
	init: function(){
		this.tabwidth = Math.floor($('.nav_wap').width()/this.clienttablen);
		$nav.find('ul li').width(this.tabwidth);
		$nav.show();
		this.bindEvent();
		this.slide();
		this.navMove($('.points .curr'));
		/*图片加载完成后再吸顶*/
		var oImg = $imageSlide.find('img').last().get(0);
		this.imgLoaded(oImg,this.navFixed);	
	},
	bindEvent: function(){
		var that = this;
		$('.points li').on('click',function(e){
			e.preventDefault();
			that.navMove($(this));
			if ($nav.hasClass('scrollin')) {
				document.getElementById('nav_wap').scrollIntoView();
			}
		})
		_adesc.on('tap',function(){
			alertMsg({},'ruleMsg');
		})
	},
	slide: function(){  //顶部banner轮番
		if(!$imageSlide.length) return;
		var slideHeight = Math.floor(200 * this.Cwidth/640);
		_adesc.show();
		$("#imageSlide,#imageSlide li").width(this.Cwidth).height(slideHeight+"px");

		if($imageSlide.find('li').length>1){
			$imageSlide.touchSlide({autoTime:5000});
			$('.num').find('b').text('');
		}
	},
	navMove: function(me){/*导航条移动效果*/
		var tabindex = me.index()+1;
		var movelen =this.targettabinx-tabindex;
		me.parent('ul').css({'-webkit-transform':'translate3d('+ this.tabwidth * movelen + 'px, 0, 0)'});
		me.addClass('curr').siblings()
		.removeClass('curr');
		/*tab点击异步拉取商品信息*/      
		var _hour=me.data('hour');

		this.getspeciallist(2 ,'zd_info' ,_hour,me);
	},
	getspeciallist: function(type,id,hour,obj){/* 获取tab对应宝贝*/		
		var data={};
		var that = this;
		data.event_id=fml.vars.event_id;
		data.type=type;
		if(hour!='none')data.time=hour;
		that.countdown(obj);
		$.get('/aj/tuan/qiang8_list?', data, 
			function(res){ 
				var list = {'item' : res.data.goods_list||res.data.segments};
				$('#content_box').html(shareTmp(id , list)); 
				setTimeout(function(){
					if(!$('#content_box').html().length){
						that.getspeciallist(type,id,hour);return;
					}
				},1000)
				that.tipFn();
				that.qiangPush();

		} , 'json');
	},
	countdown: function(obj){
		var that = this;
		clearTimeout(timer);
		var status = obj.data('status'),
		unix = obj.data('unix'),
		reminds = parseInt(unix)*10; 
		fml.vars.timeunix = unix;
		var tipcontent = status == 0 ? '本场抢购已结束' : (status == 1 ? '距离本场结束' : '距离本场开始');
		$('.c-tip').text(tipcontent);
		if(status == 0) {
			$('.time').text('');
			return;
		}
		timer = setInterval(function(){
			if(unix == 599 && status == 2){
				$('.good_box').find('.status_btn').each(function(data){
					$(this).html('<i class=\'clock\'></i>即将开始').off('tap');
					$(this).removeClass('remind_btn').addClass('reminded_btn');
				})
			}
			if(unix == 0){
				window.location.reload();
			}
			var time = that.calcutetime(unix);
			$('.time').html(time.h + ':' + time.m + ':' + time.s);
			unix--;
		}, 1000);
	},
	calcutetime: function(stamp){
		var t = stamp * 1000;
		var d = Math.floor(t / (60 * 60 * 24 * 1000));
		t = t - d * (60 * 60 * 24 * 1000);
		var h = Math.floor(t / (60 * 60 * 1000));
		t = t - h * (60 * 60  * 1000);
		var m = Math.floor(t / (60 * 1000));
		t = t - m * (60 * 1000);
		var s = Math.floor(t / 1000);
		return {
			d : d < 10 ? '0' + d : d,	
			h : h < 10 ? '0' + h : h,	
			m : m < 10 ? '0' + m : m,	
			s : s < 10 ? '0' + s : s	
		}	
	},
	tipFn: function(){/*已抢光/已结束提示*/
		var that = this;
		$('.empty_btn,.over_btn').on('click',function(e){

			var layertip = '宝贝太抢手了，下次早点来哦！';
			if($(this).hasClass('over_btn')) {
				layertip = '宝贝抢购已结束，下次早点来哦！';
			}       
			var $probox=$(this).parents('.good_box');  
			alertMsgFn(layertip,$probox.attr('twid'),$probox.attr('shopid'),$(this).attr('strtype')=='2'?'去店铺看看':'领取优惠券');                          
		})
	},
	qiangPush: function(){/*开抢提醒*/
		var that = this;
		$('.good_box .remind_btn').on('tap',function(e,type){
			var $this=$(this);
			var $probox=$this.parents('.good_box');
			//,'access_token':'6ad1c635cb5301b84dbc1bcb8b420d51'
			var _time=$probox.attr('stime').replace(/-/g,'/'),
			param=type=='all'?'?remine_type=1':'';
			$.get('/aj/tuan/remind_set'+param, 
				{'pushtime':(new Date(_time).getTime()/1000).toString(),
				'actidfor8':fml.vars.event_id,'twitter_id': $probox.attr('twid')}, function(res){
				if(res.code=='10000'){
					$this.html('<i class=\'clock\'></i>已设提醒').off('tap');
					$this.removeClass('remind_btn').addClass('reminded_btn');
				}
				else{
				var error='设置提醒失败'; 
					// if(issuccess)
					// {  
					//issuccess=false;}
					that.alertMsg({msg:error},'errorMsg');
				}
			} , 'json');
		}) 
	},
	imgLoaded: function(el,callback){
		if(el){
			if (el.complete) {
			   callback();
			} else {
			   el.onload = function() {
			   		callback();
			   }
			}
		}
		else{
			callback();
		}
	},
	navFixed: function(){
		scroll.yIn($nav.position().top,function(){
			$nav.removeClass('scrollout').addClass('scrollin');
		},
		function(){
			$nav.removeClass('scrollin').addClass('scrollout');
		})
	}
}

special_new.init();

/*判断用户是否已设置提醒*/
function isexit(tids,val){
	for(var item in tids){
		if(tids[item] == val)
			return true;
	}
	return false;
}
/*拼接r参数（用于模板里）*/
function joinurl(protocol,param , isosapp , r ,wapHref){
	if (!protocol || !param) return false
	if (!isosapp) return wapHref || '###noapp'
	if (r) param.r = r
	var link = 'meilishuo'
	link += '://'+ protocol +'.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param))
	return link 
}

/*弹窗*/
function alertMsg(data,id)
{
	_adesc.removeClass('movelr');
	var tpl = shareTmp(id, data);        
	$.fn.dialog({dialogContent : tpl , dialogTitle : ''});        
	$('#maskLayer,.rbclose').on('touchstart touchend', function(event){
		event.preventDefault();
	}).on('tap' , function(e){
		$('.closeDialog').trigger('tap'); 
		_adesc.addClass('movelr');
	});
}

function alertMsgFn(msg,twitter_id,shop_id,btn_str){
	var detail_url=joinurl('twitter_single', {'twitter_info' : {'twitter_id' : twitter_id, 'is_doota' : 1, 'event_end': 1}}, fml.vars._os, fml.vars._r, '/share/item/'+twitter_id);
	var param = {"r":fml.vars._r,"shop_id": shop_id};
	var shop_url= 'meilishuo://shop.meilishuo?json_params='+ encodeURIComponent(JSON.stringify(param));
	var data = {msg:msg,shop_url:shop_url,detail_url:detail_url,btn_str:btn_str};
	alertMsg(data,'alertMsg');
}