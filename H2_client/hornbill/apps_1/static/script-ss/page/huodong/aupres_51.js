fml.use('app/scrollPhotos',function(){
	this('photoPlay',{speed:50,direction:'horizontal'});
});
fml.use('app/publishor' , function(){});
fml.use('app/replyBox' , function(){});
fml.define('page/huodong/aupres_51' , ['jquery' , 'app/checkLogin' , 'ui/dialog','component/shareTmp', 'app/fancybox'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var check = require('app/checkLogin');
	$("a[rel=group]").fancybox({ 'overlayShow' : false });
	$('.pf span').on('click' , function(){
		$('.pf').hide();
	});


	$('.sign').click(function(){
		if(!check()) return;
		var data = {};
		var url = '/aj/huodong/oubolai_signin';
		$.post(url, data, function(r){
			if(r.data == 1){
				$('.sign').removeClass('sign').addClass('signed').remove('click');
			}
		}, 'json');
	});

	$('.video-tab span').click(function(){

		$(this).addClass('on').siblings().removeClass('on');
		$('.tab-cont li').hide().eq($(this).index()).show();
	})


	$('.candraw').on('click', function(){
		if(!check()) return;
		var url = '/aj/huodong/oubolai_lottery';
		var data = {};
		var callback = function(res){
			var html = shareTmp("aupres3", {'data':res.data.content});
			var close = new dialog({title : "幸运抽奖" , width : 405 , content : html});
			$('.mem_btn').text(res.data.button);
			$('.tab_sure a').attr('href',res.data.link);

			//弹窗关闭
			function closeDialog () {
				$('.close_dailog').on('click',function(){
					$('#closeDialog').trigger('click');
					window.location.href = res.data.link;
				});
			}

			closeDialog();
		};
		$.post(url , data , callback ,'json');
	});


});
