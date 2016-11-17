fml.use('page/poster_guang');
fml.use(['jquery','app/posterWalls' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'type' : query.type || 'new',
		'actName' : 'songxia'
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
/* 轮播 */
fml.use('app/lunbo' , function(){
	this({
			iWidth:218,
			snum:4,
			dtime:1000,
			ptable:'photos-table',
			toright:'btn-right',
			toleft:'btn-left'
	});
});


fml.define('page/huodong/panasonic' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'app/shareTo', 'component/shareTmp', 'app/uploadPhoto', 'component/waterfall', 'app/tracking'] , function(require , exports){
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
		$('#l_side , #r_side').css({'position' : 'absolute' , 'top' : $(window).scrollTop() + 150 + 'px' , 'left' : '0'});
		$(window).scroll(function(){
			$('#l_side , #r_side').css({'position' : 'absolute' , 'top' : $(window).scrollTop()+ 150 +'px' , 'left' : '0'});
		});
	}
	//图片上传
	upload.init(function(){
	});
	//弹窗
	$('#pana_rule').on('click' , function(){
		var tpl = shareTmp('rule');
		var html = tpl;
		var lenovo_dia = new dialogUI({ 
			'content':html , 
			'width': '625px' , 
			'onChange' : function(){
				$('#dialogTitle').hide();  
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			},
		});	
		$('#close_btn').on('click' , function(){
			lenovo_dia.drive.destroyModel();	
		});
	});

	var top_pic_node = $('#photos-table li');
	var pic_index = -1;
	top_pic_node.on('click' , function(i){
		$(this).addClass('bord').siblings('li').removeClass();	
		pic_index = top_pic_node.index($(this));
	});
	var r_side_node = $('#r_side li');
	r_side_node.on('click' , function(){
		$(this).children('a').addClass('hlight');
		$(this).siblings('li').children('a').removeClass();
	})
	
	//发推
	$('.sub_btn').on('click' , function(){
		var wording = $('.pana_up textarea').val();
		if(top_pic_node.hasClass('bord') == false || wording == "" || $('.preview').attr('src') == undefined){
			alert('亲，不要着急，一步一步才能得大奖哦！~');
			return false;
		}
		$(this).html('正在提交...');
		var url = '/aj/huodong/songxia_tui';
		var data = { actName : 'songxia' , src : $('.preview').attr('src') , img_idx : pic_index , img_text : wording };
		data = $.extend(data, upload.getImgData());
		$.post(url , data , function(r){
			if ((!r || r.code) && !r.data) return;
			$('.panaUpWapper').hide();
			$('.back_pic').show();
			$('.back_pic img').attr('src' , r.data);
			$('.words').show().html(wording);
			$('.pana_up textarea').hide();
			$.get('/aj/huodong/single_haibao', {'actName': 'songxia'}, function(res){
				if ((!res || res.code) && !res.data) return;
				var tpl = shareTmp('posterWall', res.data);
				pin.prepend(tpl);
			} , 'json');
			$('.sub_btn').html('我要CHANGE >>').attr('disabled','disabled');
		} , 'json');

	});


	//hack for ie6，页面有锚点和?参数的时候标题有问题
	if($.browser.msie) {
		document.title = '我要Change，焕美新生';
	}
});
