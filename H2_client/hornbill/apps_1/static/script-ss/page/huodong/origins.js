fml.define('page/huodong/origins' , ['jquery' , 'ui/dialog' , 'app/twitterApi' , 'component/shareTmp' , 'app/shareTo' , 'app/checkLogin'] , function(require,exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var check = require('app/checkLogin');
	var twitterApi = require('app/twitterApi');


	/*share sina qzone qq*/
	var url = location.href + '?frm=hd_origins13';
	var desc = '为什么你的肌肤很缺水？你知道神秘的肌肤“储水库“吗？是哪3种神奇的植物成分，扭转干燥乾坤，为肌肤抓水，储水，锁水了呢？来看看吧！Origins悦木之源为你揭晓答案！活动地址：';
	var title = '悦木之源·植物成分“对对碰”，对号入座赢大奖';
	var pic = Meilishuo.config.picture_url + 'images/huodong/origins/weibo_new.jpg';
	$('.i_qzone').on('click',function(){
		share.shareToQzone(url , desc, '', title , pic);
	});
	$('.i_sina').on('click',function(){
		share.shareToWeibo(url , desc , pic , false);//false 为不抓取图片
	});
	$('.i_tx').on('click',function(){
		share.shareToQQ(url , desc , pic);
	});


	var gostep1 = function(){
		var win = $('.step1')
		win.addClass('show')
		win.find('li').toggle(function(){
			$(this).addClass('checked')
		}, function(){
			$(this).removeClass('checked')
		})
		win.find('.gonext').on('click', function(){
			if(!check()) return;
			if(win.find('.checked').length > 0){
				win.removeClass('show')
				gostep2()
			}else{
				alert('请至少选择一个情况')
			}
		})
	}
	var gostep2 = function(){
		var win = $('.step2')
		win.addClass('show')
		win.find('.gonext').on('click', function(){
			win.removeClass('show')
			gostep3()
		})
	}
	var gostep3 = function(){
		var win = $('.step3')
			, al = win.children('.o_alert')
		var item = null
			, done = 0
		win.addClass('show')
		win.find('li').bind('click', function(){
			$(this).addClass('checked')
			if(item === null){
				item = $(this)
				item.unbind();
			}else{
				if(item.children('p').attr('class') === $(this).children('p').attr('class')){
					item.addClass('done');
					$(this).addClass('done').unbind();
					done++;
					item = null;
				}else{
					al.addClass('show')
					$(this).removeClass('checked')
				}
			}
		})
		al.find('.al_ensure').bind('click', function(){
			al.removeClass('show')
		})
		win.find('.gonext').on('click', function(){
			if(!check()) return;
			if(done !== 3){
				alert('完成全部配对才可以进入下一步')
			}else{
				$.post('/aj/huodong/origins_addnum', {} ,function(r){
					win.removeClass('show')
					gostep4()
				}, 'json')
			}
		})
	}
	var gostep4 = function(){
		var win = $('.step4')
		win.addClass('show')
		win.find('.gonext').on('click', function(){
			if(!check()) return;
			var url = '/goods/ajax_origins_twitter';
			var callback = function(response){
				win.removeClass('show')
				gostep5()
			}
			$.post(url, {}, callback, 'json');
		})
	}
	var gostep5 = function(){
		var win = $('.step5')
		win.addClass('show')
		shareArea = win.find('.shareArea')
		shareArea.val(desc + url)

		win.find('.goshare').on('click', function(){
			var desc = shareArea.val()
			desc = desc.replace(url, '')
			if(!check()) return;
			if(desc.length > 140){
				alert('字数超长')
			}else{
				share.shareToWeibo(url , desc , pic , false);//false 为不抓取图片
			}
		})
	}
	gostep1();
//	gostep3();

});
