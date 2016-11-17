/* 倒计时 */
fml.use('app/countdown' , function(){ this(); });
/* 福利社 */
fml.use('app/welfare_apply' , function(){});
/* 海报墙 */
fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'heart' : query.heart || 0,
		'actName' : 'lenovo2'
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/haibao_wall', {'subScroll': '.hb-table'});
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
});
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});

fml.define('page/huodong/lenovo2' , ['jquery' , 'ui/dialog', 'component/shareTmp', 'app/uploadPhoto', 'app/shareTo', 'app/tracking', 'component/waterfall', 'app/checkLogin'] , function(require , exports){
	var $ = require('jquery'),
		dialog = require('ui/dialog'),
		shareTmp = require('component/shareTmp'),
		upload = require('app/uploadPhoto'),
		share = require('app/shareTo'),
		logTrack = require('app/tracking'),
		pin = require('component/waterfall'),
		check = require('app/checkLogin');

	document.title = Meilishuo.config.pageTitle;
	$('.paging_panel').removeClass('none_f');

	$('.lev-bg1-funs .rule').on('click',function(){
		var tpl = shareTmp('activityRule');
		var popRule = new dialog({ 
			'content':tpl , 
			'width': '623px' , 
			'onStart':function(){
				$('#overlay').css({'background-color':'black'});
			},
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background':'none' , 'padding-right':'20px','filter':''});
				$('#dialogContent').css({'background':'none'});
			},
			'onClose' : function(){}
		});
		$('.closeButton').on('click' , function(){
			popRule.drive.destroyModel();
		});
	});

	//图片长传
	var isImgLoad = false;
	var data = {
		'rp' : '',
		'rms' : '',
		'imgUrl' : ''
	};
	upload.init(function(){
		$('.imgUpload').addClass('uploading');
	});
	$('#upsure').click(function() {
		isImgLoad = true;
		$(this).parent('.imgUpload').removeClass('uploading');
	});
	$('.show-result').on('click',function(){
		var resultStr=getSelectValue("q1") + getSelectValue("q2") + getSelectValue("q3");
		if(resultStr.length<3 || !isImgLoad){
			//答题未完成 或未上传照片
			alert('亲，不要着急，一步一步才能得大奖哦！~');
			return;
		}
		var rp,rs,rms;
		switch (resultStr.substr(0,2)){
			case '11':
			case '12':
			case '21':
			case '31':
				rp = 'C. 80分，高人气的你俨然已经成为大家身边活跃的小太阳，要持之以恒哦~';
				rms = '80分，万人迷吸力姐';
				rs = 80;
				break;
			case '13':
			case '22':
			case '32':
				rp = 'B. 60分，你在你的朋友圈颇有人气，勤加修炼必成焦点！';
				rms = '60分，小清新吸力姐';
				rs = 60;
				break;
			case '23':
			case '33':
				rp = 'A. 20分，不要总是迷恋自己的世界，偶尔要对外界展示自己独具魅力的一面哦！';
				rms = '20分，潜力股吸力姐';
				rs = 20;
				break;
			default:
				break;
		}

		/* 站内分享，采用合成图片接口 弹窗 */
		data = {
			'rp' : rp,
			'rms' : rms,
			'imgUrl' : $('.preview').attr('src')
		}
		var imgData = {
			'actName' : 'lenovo2',
			'src' : data.imgUrl,
			'score' : rs
		}
		var url = '/aj/huodong/xilijie';

		/* 图片上传，向后台传入图片调整系数 */
		imgData = $.extend(imgData, upload.getImgData());

		$.post(url, imgData, function(r){
			if (!r) return alert('吸力值计算错误');
			/* 将分享添加到海报墙 */
			$.get('/aj/huodong/single_haibao', {'actName': 'lenovo2'}, function(res){
				if ((!res || res.code) && res.data) return;
				var tpl = shareTmp('posterWall', res.data);
				pin.prepend(tpl);
			}, 'json');

			/* 显示弹出框 */
			var rate = 131/244;
			data.style = 'width:' + (imgData.scaleWidth*rate+1) + 'px;top:' + imgData.top*rate + 'px;left:' + imgData.left*rate +'px';
			var tpl = shareTmp('xiliResult', data);
			var xiliOut = new dialog({ 
				'content':tpl,
				'width': '625px',
				'onStart':function(){
					$('#overlay').css({'background-color':'black'});
				},
				'onChange' : function(){
					$('#dialogTitle').hide();
					$('#dialogLayer').css({'background':'none' , 'padding-right':'20px','filter':''});
					$('#dialogContent').css({'background':'none'});
				},
				'onClose' : function(){}
			});
			$('.closeButton').on('click' , function(){
				xiliOut.drive.destroyModel();
			});
			data.imgUrl = r;
		});

		function getSelectValue(rname){
			var radios=document.getElementsByName(rname);
			for (var i = 0; i < radios.length; i++) {
				if(radios[i].checked ==true) return radios[i].value;
			}
			return "";
		}
		logTrack.cr('lenovo2', {'frm': 'checkResult'});
	});

	/* 福利社点击统计 */
	$('.wf_apply').click(function(){
		logTrack.cr('lenovo2', {'frm': 'wf_apply'});
	});

	//分享到新浪
	$('.share_sina').live('click' , function(){
		logTrack.cr('lenovo2', {'frm': 'shareSina'});
		var s_url = location.href + '?frm=lenovo103';
		var s_desp = '#VIBE X万有引力 打造“吸力”姐#今天我才真正了解到我的“吸力”值是多少，你是传说中的万人迷“吸力”姐吗？快来试试吧！更有免费机会赢联想VIBE X手机，打造最具吸引力的“摄”交达人！@联想 @美丽说';
		var s_img = data.imgUrl;
		share.shareToWeibo(s_url, s_desp, s_img);
	});

	//轮播动画
	if($('.photos-table a').length > 4){
		$('.btn-left').on('click',function(){
			$('.photos-table a').stop().last().css({'margin-left': '-216px'}).prependTo('.photos-table').animate({'margin-left': '0'}, 200);
		});

		$('.btn-right').on('click',function(){
			$('.photos-table a').stop().first().animate({'margin-left': '-216px'}, 200, function(){$(this).appendTo('.photos-table').css({'margin-left': '0'});});
		});
	}
});