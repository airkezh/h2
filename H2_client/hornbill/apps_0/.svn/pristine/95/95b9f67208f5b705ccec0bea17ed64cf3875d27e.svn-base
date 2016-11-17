fml.define('wap/page/activity/niuniu' , ['wap/ui/alert','wap/zepto' , 'wap/app/dialog' , 'wap/component/shareTmp'] , function(require , exports){
	var shareTmp = require('wap/component/shareTmp');
	var Alert = require('wap/ui/alert');
	var a = function(msg){
		return Alert({
			content:msg
		});
	};
	var dialog = function(data){
		var tpl = shareTmp('drawing',data);
		$('.popup .content').empty().append(tpl);
		$('.popup,.masker').show();
		var el = $('.popup .btn').unbind('tap');
		el.on('tap',function(){
			$('#closePopup').trigger('tap');
		});
		el.text(data.btn);
		if(data.type == 'remind'){
			el.on('tap',function(){
				$('.remind_btn').trigger('tap');
			});
		}
		if(data.link){
			el.unbind('tap');
		}
		if(data.big){
			$('.img img').css({
				width:'50%'
			});
			$('.img').css({
				top:'30%'
			})
		}else{
			$('.img img').css({
				width:'25%'
			});
			$('.img').css({
				top:'25%'
			})
		}
		el.attr('href',data.link || 'javascript:;');
	}
	$('#closePopup').on('tap',function(){
		$('.popup,.masker').hide();
	});
	/*更新版本*/
	var update = function(){
        var tpl = shareTmp('toupdate');
        $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
		$('.delayclose').on('tap' , function(){
			setTimeout(function(){
				$('.closeDialog').trigger('tap');
			} , 1000);
		});
	}
	/*抽奖*/
	window.MLS = {
		didLogin : function() {
			// 成功登录，跳转到下一步
			window.location.reload();
		}
	};
	$('.get_btn').on('tap', function(event){
		event.preventDefault();
		var promoteNum = Number($('#promoteNum').html());
		if(!Meilishuo.config.os || !Meilishuo.config.os.mlsApp){
			var data = {
				type:'download',
				end:'立即下载客户端，每天3次抽奖机会，<br/>缤纷好礼等你来拿！',
				btn:'下载美丽说客户端',
				link:'http://m.meilishuo.com/goto/open/?appUrl='+encodeURIComponent(location.href),
				url:'http://d04.res.meilishuo.net/img/_o/cc/a0/b01668364d49189970ef6d1bc1fb_235_175.c8.png',
				header:'我勒个去~扭蛋机睡着了！<br/>快下载美丽说客户端叫醒它！'
			}
			return dialog(data);
		}
		/*登录*/
		if(!fml.vars.isLogin){
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		$.get('/aj/niuniu/get', {'src' : 'wap'} , function(res){
			/*抽奖次数*/
			promoteNum = Math.max(0,promoteNum -1);
			$('#promoteNum').html(promoteNum);
			switch(res.code){
				case 0:
					res.mess.type = 'share';
					res.mess.btn = '炫耀一下';
					res.mess.link = '/activity/sale/niuniushare/?text='+encodeURIComponent(res.data.awardname)+'&s_pic='+encodeURIComponent(res.mess.urlshare);
					break;
				case 1:
					res.mess.type = 'share';
					res.mess.btn = '炫耀一下';
					res.mess.link = '/activity/sale/niuniushare/?text='+encodeURIComponent(res.data.awardname)+'&s_pic='+encodeURIComponent(res.mess.urlshare);
					res.mess.big = true;
					break;
				case 10002:
					res.mess.type = 'close';
					res.mess.btn = '继续抽';
					break;
				case 10003:
					if(!res.data.switch){
						res.mess.type = 'remind';
						res.mess.btn = '每天提醒我来扭一扭';
					}else{
						res.mess.type = 'close';
						res.mess.btn = '明日再来';
					}
					break;
			}
			dialog(res.mess);
		} , 'json');
	});
	$('.remind_btn').on('tap', function(event){
		event.preventDefault();
		/*登录*/
		if(!fml.vars.isLogin){
			window.location.href = "meilishuo://login.meilishuo/";
			return;
		}
		var self = $(this);
		var _switch = $(this).hasClass('has_remind') ? 0 : 1;
		$.ajax({
			url:'/aj/niuniu/push',
			data:{
				'switch':_switch
			},
			type:'post',
			dataType:'json',
			success: function(data){
				if(data.code){
					a(data.mess);
				}else{
					if(data.mess == 0){
						self.removeClass('has_remind');
					}else{
						self.addClass('has_remind');
					}
				}
			},
			error: function(){
				a('系统繁忙');
			}
		})
	});
	/*循环滚动字幕*/
	var w = 0;
	$('.scroll_inner p').each(function(i,p){
		w += $(p).width()+10;
	});
	$('.scroll_inner').append($('.scroll_inner p')[0].cloneNode(true));
	current = 0;
	var ele = $('.scroll_inner')[0];
	var token,style,sheet,rule,test;
	//创建style对象，并获取关联的sheet对象
	style=document.createElement("style");
	document.head.appendChild(style);
	sheet=style.sheet;
	//创建一个名为test的keyframe（webkit需要前缀）
	var token="-webkit-";
	sheet.insertRule("@"+token+"keyframes test {from{left:0}to{left:-"+w+"px;}}",0);
	test=sheet.cssRules[0];
	var time = parseInt(w*20/640) + 's';
	ele.style.animation= ele.style.WebkitAnimation= "test "+time+" linear infinite";
});
