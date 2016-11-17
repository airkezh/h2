fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());	
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'type' : 'userfirst',
		'actName':'candycrush'
	}
	var opts = this.jquery.extend({} , query , urlData);
	this.posterWalls(opts , '/aj/huodong/haibao_wall' , {'subScroll': '.hb_box'});
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
});

fml.define('page/huodong/CandyCrush' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var check = require('app/checkLogin');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadPhoto');
	var share = require('app/shareTo');
	var pin = require('component/waterfall');
	var logTrack = require('app/tracking');

	var radiovalue=[];
	var candyindex='';

	$('.step1 span').on('click',function(){
		$(this).addClass('cbg');
		$(this).siblings().removeClass('cbg');
		radiovalue[0]=$(this).attr('data-status');
		candyindex=$(this).attr('data-index');
	});


	$('.step2 span').on('click',function(){
		$(this).addClass('cbg');
		$(this).siblings().removeClass('cbg');
		radiovalue[1]=$(this).attr('data-status');
	});


	//图片上传
	upload.init(function(){
		$('.imgbox').css({ 'width':'244px' , 'height':'344px' , 'overflow':'hidden' , 'position':'relative' });
		$('.cloud-bg').hide();
		$('.next').show();
	});

	//提交
	$('.next').off('click').on('click' , function(){
		//$(this).attr('disabled','disabled');
		if(radiovalue.length<2){
			alert('亲爱的不要急，只有一步一步全部完成互动，才能得到准确的“蜜”度值哦~');
			return;
		}
		var url1 = '/aj/huodong/jlmgz';
		var data1 ={'group_id' :117596141}
		$.post(url1, data1, function(res){
		},"json");
		
		var url = '/aj/huodong/Candy';
		var data = {'src' : $('.preview').attr('src') , 'img_idx' : candyindex, 'img_idx2': radiovalue[1],'midu':radiovalue[0]};
		data = $.extend(data, upload.getImgData());
		$.post(url , data , function(r){
			var html = shareTmp('ice',{'tpic':r.data.image,'lpic':r.data.url});
			var candy_pop = new dialogUI({
				'content' : html,
				'width' : '626px',
				'onChange' : function(){
					$('#dialogTitle').hide();
					$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
				}
			});
			//分享到新浪
			$('#share_sina').on('click' , function(){
					var s_url = location.href;
					var s_desp = '#糖果传奇 糖果女孩#妞儿们，Candy Crush喊你到美丽说爆发甜蜜力量！我已经完成了甜蜜度的测试，现在感觉自己甜甜哒~快来参与支持我，助我开启冲关大奖！@美丽说 ';
					var s_img = $('.lpic').attr('src');
					share.shareToWeibo(s_url, s_desp, s_img);
			});
			},"json")



	});


	//hack for ie6，页面有锚点和?参数的时候标题有问题
	if($.browser.msie) {
		document.title = '糖果当道，你的“蜜”度有多高？';
	}


});
