fml.define('page/huodong/masterliner' , ['jquery' , 'app/rollunslider', 'ui/dialog', 'component/shareTmp', 'app/checkLogin' ] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var check = require('app/checkLogin');

	//活动介绍
	$('#actived_intro').on('click' , function(){
		var tpl = shareTmp('activityIntro');
		var html = tpl;
		var disney_dia = new dialogUI({ 
			'content':html , 
			'width': '439px' ,
			'onStart':function(){
				// $('#overlay').remove();
				$('body').css({'overflow': 'auto'});
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0', 'position': 'absolute', 'top': '100px'});
			},
			'onClose' : function(){
				$('#overlay').removeClass('overblack');	
			}
		});
		$('#maskLayer, .maskLayer, .transmaskLayer').css({'background' : '#000', 'filter' : 'alpha(opacity=60)', 'opacity' : '0.6'});
		$('#dialogContent, #zeroFolDiaLayer, #dialogLayer, .dialogLayer').css({'background' : 'none','filter': 'none'});
		$('#close_btn_1').on('click', function(){
			disney_dia.drive.destroyModel();
		});
	});

	// 活动分享
	$('#share_mls_btn').click(function(){
		if(!check()) return;
		var data = {
			'group_id' : 45403753
		};
		var url = '/aj/magazine/Add_editor';
		var callback = function(){
			var data = {
				'type' : 2,
				'pid' : 681980635,
				'group_id' : 45403753,
				'actUrl': '/u/EJoVz9',
				'actTitle' : '轻松画眼线',
				'actContent' : '美宝莲携手彩妆维纳斯游丝棋带来8大眼型1笔轻松画眼线口诀，2点1线，一支轻松画眼线笔就能搞定！每天还有30份眼部套装送不停哦，你也快来参加吧！'
			};
			var url = '/aj/huodong/cus_create_twitter';
			var callback = function(res){
				var res = JSON.parse(res);
				if(res.code == 0){
					alert('分享成功');
				} else {
					alert(res.msg);
				}
			}
			$.post(url, data, callback);
		}
		$.post(url, data, callback);
	});

	$('.questionWap a, .styleList a, .newSale a').click(function(){
		var trackMsg = $(this).attr('data');
		_gaq.push(['_trackPageview', trackMsg]);
	});
	$('.question .unslider-arrow').click(function() {
		var fn = this.className.split(' ')[1];
		if(fn == 'prev'){
			$('.questionWap ul a').last().css({'margin-left': '-240px'}).prependTo('.questionWap ul').animate({'margin-left': '0'}, 300);
		}else if(fn == 'next'){
			$('.questionWap ul a').first().animate({'margin-left': '-240px'}, 300, function(){$(this).appendTo('.questionWap ul').css({'margin-left': '0'});});
		}
	});
});