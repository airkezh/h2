fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'heart' : query.heart || 0,
		'actName' : 'lenovo'
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/haibao_wall', {'subScroll': '.len_fixheight'});
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
}); 
fml.use('app/follow' , function(){
    this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});

fml.define('page/huodong/lenovo' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var pin = require('component/waterfall');
	var logTrack = require('app/tracking');

	//导航fix
	if($.browser.msie && $.browser.version == '6.0'){
		$('#phone').css({'position' : 'absolute' , 'top' : $(window).scrollTop() + 150 + 'px' , 'left' : '0'});
		$(window).scroll(function(){
			$('#phone').css({'position' : 'absolute' , 'top' : $(window).scrollTop()+ 150 +'px' , 'left' : '0'});
		});
	}

	$('#len_rule').on('click' , function(){
		var tpl = shareTmp('rule');
		var html = tpl;
		var lenovo_dia = new dialogUI({ 
			'content':html , 
			'width': '820px' , 
			'onStart':function(){
				$('#overlay').addClass('overblack');
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			},
			'onClose' : function(){
				$('#overlay').removeClass('overblack');	
			}
		});	
		$('#close_btn2').on('click' , function(){
			lenovo_dia.drive.destroyModel();	
		});
	});
	$('.len_btn').on('click' , function(){
		if(!check()) return;
		var tpl = shareTmp('model1');
		var html = tpl;
		var lenovo_dia = new dialogUI({
			'content' : html,
			'width' : '820px',
			'onStart':function(){
				$('#overlay').addClass('overblack');
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			},
			'onClose' : function(){
				$('#overlay').removeClass('overblack');	
			}

		});
		$('#close_btn , #close_btn1 , #close_btn2').live('click' , function(){
			lenovo_dia.drive.destroyModel();	
		});
		var index;
		$('#3model li').on('click' , function(){
			logTrack.cr('lenovo', {'frm': 'yaochuse08'});
			index = $('#3model li').index($(this));
			$('.model').hide();
			$('.upbox').show();
			var model2 = shareTmp('model2');
			$(model2).appendTo('.upbox');
			$('.lenUpWapper').css('background' , 'url('+Meilishuo.config.picture_url+'/images/huodong/lenovo/upbg'+(index+4)+'.jpg) no-repeat');
			//图片上传后的操作
			upload.init(function(){
				logTrack.cr('lenovo', {'frm': 'yaochuse09'})
			});
		});
		$('#len_pre').live('click' , function(){
			$('.upbox').hide().html('');
			$('.model').show();
		});
		var $upbox = $('.upbox');
		$('#len_sure').die('click').live('click', function(){
			var img_text = $upbox.find('textarea').val();
			if(img_text == ""){
				alert('请输入文字');
				return false;
			}
			if($('.preview').attr('src') == undefined){
				alert('请上传图片');
				return false;
			}
			$(this).attr('disabled','disabled');
			logTrack.cr('lenovo', {'frm': 'yaochuse1' + index});
			var url = '/aj/huodong/create_lenovo'
			var data = {
				'actName' : 'lenovo',
				'src' : $upbox.find('img').attr('src'),
				'img_idx' : parseInt(index)+1,
				'img_text' : img_text
			}
			data = $.extend(data, upload.getImgData());
			$.post(url, data, function(r){
				if (!r) return;
				$.get('/aj/huodong/single_haibao', {'actName': 'lenovo'}, function(res){
					if ((!res || res.code) && res.data) return;
					var tpl = shareTmp('posterWall', res.data);
					pin.prepend(tpl);
				} , 'json');
				$('.upbox').hide();
				$('.succeed').show();
				$('<img src="'+ r +'" />').appendTo('.succeed');
				$('.share_sina').on('click' , function(){
					var s_url = location.href;
					var s_desp = '联想S820#我要出色#我秀出了我最出色的红，最耀眼的自己，姐妹们，快来支持我吧！@联想广东 @美丽说 你的出色在哪里？快来秀吧！>>';
					var s_img = r;
					share.shareToWeibo(s_url, s_desp, s_img);
					lenovo_dia.drive.destroyModel();	
				});

			});
		});
	});

	//监控 KPI
	//monitor magazine
	var mon_groups = [
		'http://meilishuo.com/u/EIJyR9?frm=yaochuse01',
		'http://meilishuo.com/u/EIJyyJ?frm=yaochuse02',
		'http://meilishuo.com/u/EIJzCj?frm=yaochuse03'
	]
	$('.len_group').find('.groupBox').each(function(i){
		$(this).find('a').click(function(){
			$(this).attr('href', mon_groups[i]);
		})
	})

	$('#len_rule').click(function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse06'});
	})
	$('.len_btn').click(function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse07'});
	})
	$('.video').on('mousedown', function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse13'});
	})
	$('.share_sina').click(function(){
		logTrack.cr('lenovo', {'frm': 'yaochuse14'});
	})

	//hack for ie6，页面有锚点和?参数的时候标题有问题
	if($.browser.msie) {
		document.title = '秀我的出色';
	}
});
