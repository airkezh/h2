fml.use('component/lazyLoad' , function(){
	this.load('.imgBox>span' ,'asrc');
});
fml.use(['jquery' , 'app/checkLogin'] , function(){
	var $ = this.jquery;
	var member_des = $('.toggle_btn');
	var content = $('.intro_main');
	$('.over').attr('disabled', true);
	member_des.toggle(
		function() {
		content.show();
		$('.intro_icon').css('background', 'url("http://i.meilishuo.net/css/images/member/show.png")').removeClass('hide').addClass('show')
	},
	function() {
		content.hide();
		$('.intro_icon').css('background', 'url("http://i.meilishuo.net/css/images/member/hide.png")').removeClass('show').addClass('hide')
	});
});
fml.use('app/focus_banner', function(){
	this.bind({
	    'unit' : '.top_bnr .banner li'
		,'btn': '.round .adType a'
		,'transition' : 'fade'
	});
	document.execCommand("BackgroundImageCache",false,true);
});
fml.use('app/exo/video',function(){
	window.playVideo = this.play;
});
fml.define('page/huodong/exo_zhuanti' , ['ui/dialog','component/shareTmp','jquery','app/shareTo','app/checkLogin', 'app/tracking'] , function(require , exports){
	var dialog = require('ui/dialog');
	var login = require('app/checkLogin');
	var logTrack = require('app/tracking');
	var shareTmp = require('component/shareTmp');
	var shareTo = require('app/shareTo');
	var shareText = '我在美丽说上给EXO-M加油了，每天都是一个美丽的新开始，你们也来一起加油吧！';
	var sharePic = 'http://d06.res.meilishuo.net/img/_o/e4/17/adb5e3d3e383dddd980de7b0259b_440_434.c8.png';
	function closeDialog () {
		$('.close_dailog').on('click',function(){
			$('#closeDialog').trigger('click');
		});
	}
	if($('.birthday').length){
		shareText = '我在美丽说上祝XIUMIN生日快乐，得到了粉丝专属25元优惠券，你们也来一起祝福吧！';
		sharePic = "http://i.meilishuo.net/css/images/huodong/exo/share1.jpg";
	}
	$('#join').click(function(){
		if(!login()) return false;
		$.ajax({
			url:'/aj/huodong/join?act=set',
			dataType:'json',
			type:'post',
			complete: function(){location.href="/biz/exo/main/?joined=1"}
		});
	})
	$('#fight.available').click(function(){
		logTrack.cr('exo_fight');
		if(!login()) return false;
		$.ajax({
			url:'/aj/huodong/fight?act=set',
			dataType:'json',
			type:'post',
			success: function(data){
				$('#fight').removeClass('available');
				if($.browser.msie && $.browser.version <= 6){
					$('.masker').css({top:$(window).scrollTop()+'px'}).show();
				}else{
				}
				$('#popup').css({
					top:$(window).scrollTop()+30+'px'
				}).show();
				$('.masker,#popup').show();
				$('#fight').unbind('click');
			},
			error: function(){
				alert('系统错误，请稍后重试');
			}
		})
	});
	$('#close_popup').click(function(){$('#popup,.masker').fadeOut();});
	$('#share_sina').click(function(){shareTo.shareToWeibo('http://www.meilishuo.com/biz/exo/main/',shareText,sharePic)});
	$('#share_qqzone').click(function(){shareTo.shareToQzone('http://www.meilishuo.com/biz/exo/main/',shareText,'','',sharePic)});
	$('#share_qqwb').click(function(){shareTo.shareToQQWeiBo(/*$name, $picSrc, $groupId, $reply, $rep*/'',sharePic,'',shareText)});
	function formatNum(spans,num){
		num = num.toString().split('');
		for(var i=spans.length-1; i>=0; i--){
			var t = num[num.length-1]||'0';
			if($(spans[i]).text() != t) $(spans[i]).text(t);
			num.pop();
		}
	}
	var num = $('#follow_num').length ? $('#fnum').text() : $('.join label').text();
	$('#fnum').remove();
	$('#follow_num').length && formatNum($('#follow_num span'),num);
	//$('#follow_num').length && getLatestFight();
	//$('.join').length && formatNum($('.join span'),num);
	//$('.join').length && getLatestJoin();
	function getLatestFight(){
		$.ajax({
			url:'/aj/huodong/fight?act=get',
			dataType:'json',
			type:'get',
			success: function(data){
				formatNum($('#follow_num span'),data.fight_count);
				setTimeout(getLatestFight,2000);
			},
			error: function(){
				setTimeout(getLatestFight,2000);
			}
		})
	}
	function getLatestJoin(){
		$.ajax({
			url:'/aj/huodong/join?act=get',
			dataType:'json',
			type:'get',
			success: function(data){
				//formatNum($('.join span'),data.join_num);
				$('.join span').text(data.join_num);
				setTimeout(getLatestJoin,2000);
			},
			error: function(){
				setTimeout(getLatestJoin,2000);
			}
		});
	}
	$('.erweima').mouseover(function(){
		$('.wei2').show();	
	}).mouseout(function(){
		$('.wei2').hide();
	});
	var newsLength = $('.news div.tag').length;
	var unitWidth = 295;
	if(newsLength > 3){
		var current = 3;
		$('#right').click(function(){
			$('.mask').stop();
			if(current < newsLength) current++;
			
			$('.mask').animate({left:-(current-3)*unitWidth + 'px'});
		});
		$('#left').click(function(){
			$('.mask').stop();
			if(current > 3) current--;
			$('.mask').animate({left:-(current-3)*unitWidth + 'px'});
		});
	}
	var go = $('.go');
	go.on('click',function(){
		if(!login()) return false;
		var type = $(this).parents('ul.goods').attr('type');
		var tid = $(this).parents('li').attr('tid');
		var point = $(this).attr('point');
		var exchangeNum = $(this).attr('exchangeNum');
		var my_point = $('.user_point').text();
		$.get('/aj/point_exchange/point',{type: 'pc'},function(data){
			// 接口注释 free_point 1 已经领取积分，0 未领取积分
			var free_point = data.data.free_point;
			if (free_point == 1) {
				if (+point <= +my_point) {
					var html = shareTmp("UserMember_exchange_affirm",{'data':point});
					var close = new dialog({title : "积分兑换" , width : 405 , content : html });
					closeDialog();
					$('.affirm_btn').on('click',function(){
						$.get('/aj/member_exchange/add?id=exo_mob_planet&cid=637&twitter_id='+tid+'&goods_type='+type, function(data) {
							//接口注释status 1换购成功，0换购失败 2 库存不足 3 商品兑换次数
							if (data.data.status == '1') {
								var html = shareTmp("UserMember_exchange_success", {'data':point});
								var close = new dialog({title : "积分兑换" , width : 405 , content : html });
								$('.user_point').text(data.data.point);
								closeDialog();
							} else if (data.data.status == '2') {
								var html = shareTmp("UserMember_exchange_outOfStock", {'data':point});
								var close = new dialog({title : "积分兑换" , width : 405 , content : html });
								closeDialog();
							} else if (data.data.status == '3') {
								var html = shareTmp("UserMember_exchange_num", {'data':exchangeNum});
								var close = new dialog({title : "积分兑换" , width : 405 , content : html });
								closeDialog();
							} else {
								var html = shareTmp("UserMember_exchange_defeated", {'data':exchangeNum});
								var close = new dialog({title : "积分兑换" , width : 405 , content : html });
								closeDialog();
							}
						},'json');
					});
				} else {
					var html = shareTmp("UserMember_exchange_filed", {'data':point});
					var close = new dialog({title : "积分兑换" , width : 405 , content : html });
					closeDialog();
				}
			} else {
				var html = shareTmp("UserMember_exchange_nochange",{'data':point});
				var close = new dialog({title : "积分兑换", width : 405, content : html });
				$('.close_dailog').click(function(){
					window.open('/member/get/');
					$('#closeDialog').trigger('click');
				});
			}
		},'json');		
	});
});
