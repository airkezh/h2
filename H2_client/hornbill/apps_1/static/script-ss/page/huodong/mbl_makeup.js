fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'type' : query.type ||'new',
		'actName' : 'nmnfs5'
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWalls(opts , '/aj/huodong/haibao_wall', {'subScroll': '.len_fixheight'});
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
}); 
fml.define('page/huodong/mbl_makeup' , ['jquery' , 'ui/dialog' , 'component/shareTmp' , 'app/uploadNormal' , 'component/waterfall' , 'app/huodong/dragline'] , function(require , exports){
	$ = require('jquery');
	var dialogUI = require('ui/dialog');
	var shareTmp = require('component/shareTmp');
	var upload = require('app/uploadNormal');
	var pin = require('component/waterfall');
	var dragline = require('app/huodong/dragline');

	var liNode = $('.shipin li');
	var ulNode = $('.shipin ul');
	//新浪微博分享
	var share_text = ['闪耀派对妆新浪分享内容：立刻学习最潮闪耀派对妆？成为本季最IN 派对达人！ http://v.youku.com/v_show/id_XNjI3Njg0NzA4.html跟视频轻松学化妆，就去美宝莲潮妆学院！' , '红粉开运妆新浪分享内容：立刻学习最潮红粉开运妆？成为本季最IN 节庆达人！ http://v.youku.com/v_show/id_XNjI3Njg1Njg4.html跟视频轻松学化妆，就去美宝莲潮妆学院！'];
	var share_sina = share_text[0];
	var share_pop = function(){
		var html = shareTmp('poppp1');
		var pop2 = new dialogUI({
			'content' : html,
			'width' : '501px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' :'0'}); 	
			}
		});
		$('.close_btn').on('click' , function(){
			pop2.drive.destroyModel();
			return false;
		});
	}
	var sina = function(){
		WB2.anyWhere(function(W){
			W.widget.publish({
				id : 'standardSelector',
				default_text : share_sina,
				callback: function() {
					share_pop();
			    },
			});
		});
	}
	sina();
	liNode.on('click' , function(){
		var index = liNode.index($(this));
		if(index == 0){
			ulNode.attr('class' , 'tab1');
			share_sina = share_text[0];
			$('.vedio1').show();
			$('.vedio2').hide();
		}else{
			share_sina = share_text[1];
			ulNode.attr('class' , 'tab2');	
			$('.vedio2').show();
			$('.vedio1').hide();
		}
		sina();
	});

	$('.share').on('click' , function(){
		var img = new Image();
		var date = Date.parse(new Date())
		img.src="http://ad-apac.doubleclick.net/click;h=v2|4045|0|0|%2a|g;267519174;0-0;0;93326298;31-1|1;52421809|52379007|1;;%3fhttp://ad.cn.doubleclick.net/dot.gif?"+date;
	});

	var liNode1 = $('.mday li');
	var ulNode1 = $('.mday ul');
	var cindex = 0;
	liNode1.on('click' , function(){
		cindex = liNode1.index($(this));
		if(cindex == 0){
			ulNode1.attr('class' , 'tab3');
			$('.star1').show();
			$('.star2').hide();
		}else{
			ulNode1.attr('class' , 'tab4');
			$('.star1').hide();
			$('.star2').show();
		}
	});

	var daren_li = $('.daren li');
	daren_li.on('click' , function(){
		var index = daren_li.index($(this));
		var html = shareTmp('pop0');
		var pop1 = new dialogUI({
			'content' : html,
			'width' : '843px',
			'onStart' : function(){
				$('body').css({'overflow': 'auto'});	
			},
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' :'0' , 'position' : 'absolute' , 'top' : '1000px'}); 	
				$('#win0').attr('class' , 'pop' + index);
			}
		});
		$('.close_btn').on('click' , function(){
			pop1.drive.destroyModel();
			return false;
		});
	});

	$('.join').on('click' , function(){
		var img = new Image();
		var date = Date.parse(new Date())
		img.src="http://ad-apac.doubleclick.net/click;h=v2|4045|0|0|%2a|e;267519154;0-0;0;93326274;31-1|1;52421809|52379007|1;;%3fhttp://ad.cn.doubleclick.net/dot.gif?"+date;

		var html = shareTmp('poppp2');
		var dialog = new dialogUI({
			'content' : html,
			'width' : '741px',
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' :'0'});
				if(cindex == 1) $('.joinbox').addClass('candy');
				
			}
		});
		$('.close_btn').on('click' , function(){
			dialog.drive.destroyModel();
			return false;
		});

		//图片上传
		upload.init(function(){ 
			Meilishuo.config.mbl_pic = $('.preview').attr('src');
		});
		//滑动条
		dragline.init({
			0 : ['0.1','0.2', '0.3' , '0.4' , '0.5' , '0.6' , '0.7' , '0.8' , '0.9' , '1.0' , '1.1' , '1.2' , '1.3' , '1.4' , '1.5' , '1.6' , '1.7' , '1.8' , '1.9'],
			1 : ['0.8' , '0.85' , '0.9' , '0.95' , '1.0' , '1.05' , '1.1' , '1.15' , '1.2'],
			2 : ['-180' , '-90' , '0' , '90' , '180']
		} , '/aj/huodong/mbl_pic' , function(res){
			if(!res.data) return;
			$('.preview').attr('src' , res.data);
		} , 'out' , 'inner1');

		$('.sub1').on('click' , function(){
			var img = new Image();
			var date = Date.parse(new Date())
			img.src="http://ad-apac.doubleclick.net/click;h=v2|4045|0|0|%2a|w;267519188;0-0;0;93326316;31-1|1;52421809|52379007|1;;%3fhttp://ad.cn.doubleclick.net/dot.gif?"+date;

			$(this).html('提交中...');
			var img_src = $('.preview').attr('src');
			var url = "/aj/huodong/mbl_tui";
			var data = {'actName' : 'nmnfs5' , 'src' : img_src};
			$.get(url , data , function(r){
				if (!r && !r.data) return;
				$('.sub1').html('完成，并提交').attr('disabled','disabled');
				$('.joinbox').hide();
				$('.name_box').show().find('img').attr('src' , r.data);
				$.get('/aj/huodong/single_haibao' , { 'actName' : 'nmnfs5' } , function(res){
					if ((!res || res.code) && !res.data) return;
					var tpl = shareTmp('posterWall', res.data);
					pin.prepend(tpl);
				} , 'json');
				$('.sub2').on('click' , function(){ 
					var img = new Image();
					var date = Date.parse(new Date())
					img.src="http://ad-apac.doubleclick.net/click;h=v2|4045|0|0|%2a|n;267519180;0-0;0;93326302;31-1|1;52421809|52379007|1;;%3fhttp://ad.cn.doubleclick.net/dot.gif?"+date;

					var inp1 = $('.inp1').val();	
					var inp2 = $('.inp2').val();
					if(inp1 == ""){
						alert('请写昵称！');
						return false;
					}
					if(inp2 == ""){
						alert('请填写地址！');
						return false;
					}
					//发请求
					$.get('/aj/huodong/mbl_user' , { 'actName' : 'nmnfs5' , 'nick_name' : inp1 , 'address' : inp2 , 'source' : 'web' } , function(){} , 'json');
					$('.name_box').hide();
					$('.success_box').show().find('img').attr('src' , r.data);

				});
			} , 'json');
			
		});
	});

	$('.wei2').on('click' , function(){
		_gaq.push(['_trackPageview', 'more']);	
	});
	$('.daren a').on('click' , function(){
		_gaq.push(['_trackPageview', 'now']);	
	});
	$('.learn').on('click' , function(){
		_gaq.push(['_trackPageview', 'learn']);	
	});

});
