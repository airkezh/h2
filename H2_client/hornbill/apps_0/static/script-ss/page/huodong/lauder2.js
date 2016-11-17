fml.define('page/huodong/lauder2' , ['jquery' , 'ui/dialog' , 'app/shareTo' , 'app/checkLogin'] , function(require,exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var share = require('app/shareTo');
	var check = require('app/checkLogin');
	
	//点击出弹窗
	$('#lauder2_pop').on('click' , function(){
		if(check()){
			var tpl = shareTmp('lauder2');
			var html = tpl;
			new dialogUI({ 'title':'' , 'content':html , 'width':'626px'});
		}
		//点击选项
		var options = $('.lauder2_step1 span');
		options.on('click' , function(){
			$(this).addClass('yellow').siblings('span').removeClass();	
		});
		//下一步
		var lauder_num; //选择对应产品索引值
		$('#lauder2_next1').on('click' , function(){
			var flag = 1;
			if(options.hasClass('yellow')){
				flag = 1;	
			}else{
				flag = 0;	
			}
			if(flag == 0){
				alert('请选择一项');
				return false;
			}else{
				lauder_num = $('.yellow').index();
				$('.close_z').click();
				var tpl1 = shareTmp('lauder2_1');
				var html1 = tpl1;
				new dialogUI({ 'title':'' , 'content':html1 , 'width':'521px'});
				setTimeout(function(){
					$('.close_z').click();
					var tpl2 = shareTmp('lauder2_2');
					var html2 = tpl2;
					new dialogUI({ 'title':'' , 'content':html2 , 'width':'729px'});
					$('.lauder2_step3').addClass('lauder2_fight' + lauder_num);
					$('#lauder_share').on('click' , function(){
						$.get('/wbapp/ajax_app_noimg' , {actName : 'esteelauder2' , lauder2Num : lauder_num} , function(){} , 'json');
						$('.lauder2_step3').hide();
						$('.lauder2_step4').show().addClass('lauder2_ok' + lauder_num);
						var eye_links = ['http://meilishuo.com/u/EC8k4d?frm= esteelauder_hd11' , 'http://meilishuo.com/u/ECbIyX?frm= esteelauder_hd12' , 'http://meilishuo.com/u/EC8k6l?frm= esteelauder_hd13' , 'http://meilishuo.com/u/EC8k9h?frm= esteelauder_hd14' , 'http://meilishuo.com/u/EC8lFP?frm= esteelauder_hd15' , 'http://meilishuo.com/u/EC8lGd?frm= esteelauder_hd16'];
						$('#lauder2_eye').attr('href' , eye_links[lauder_num]);
					});
				} , 1000);
			}
		});
	});

	/*share sina qzone qq*/
	var url = 'http://www.meilishuo.com/huodong/esteelauder2/?frm=esteelauder_hd04';
	var desc = "我在参加#雅诗兰黛ANR眼部精华，对抗臭氧！增强你的战斗力！#活动，为你增加战斗力，抵御臭氧对眼周肌肤造成的伤害，解决你的眼周肌肤问题，还有更多奖品送出，你也来参与吧！！！>>";
	var title = "雅诗兰黛ANR眼部精华，对抗臭氧！增强你的战斗力！";
	var pic = Meilishuo.config.picture_url + 'images/huodong/lauder2/lauder2_share.jpg';
	$('.i_qzone').on('click',function(){
		share.shareToQzone(url , desc, '', title , pic);	
	});
	$('.i_sina').on('click',function(){
		share.shareToWeibo(url , desc , pic);
	});
	$('.i_tx').on('click',function(){
		share.shareToQQ(url , desc , pic);	
	});


});
