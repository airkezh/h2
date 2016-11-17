fml.define('page/huodong/kisscat' , ['jquery' , 'ui/dialog' , 'app/checkLogin' , 'component/shareTmp'] , function(require , exports){
	$ = require('jquery');
	var dialog = require('ui/dialog')
	, check = require('app/checkLogin')
	, shareTmp = require('component/shareTmp');
	
	$('.kc_vote').on('click' , function(){
		if(!check()) return;
		var gid = $(this).parents('.kc_single').attr('gid');
		var html = shareTmp('kcat');	
		var kcat = new dialog({
			'content' : html ,
			'width' : '502px' ,
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			}
		});
		$('.closeBtn').on('click' , function(){
			kcat.drive.destroyModel();
		});
		var img_url = $(this).parents('.kc_single').find('img').attr('src');
		$.post('/aj/huodong/kiss_vote' , {'vote_content' : gid , 'hd_name' : 'kisscat'} , function(){} , 'json' );
		$.post('/aj/huodong/kiss_twitter' , {'actUrl' : '/biz/huodong/kc/?frm=kc55' , 'actTitle' : 'KISSCAT 美鞋狂欢季，喜欢停不了' , 'goods_id' : gid , 'group_id' : '60448969' , 'shareType' : 1 , 'twitterType' : 'goods' , 'goods_pic_url' : img_url  } , function(){} , 'json');
	});
	$('.kk_vote').on('click' , function(){
		if(!check()) return;
		var gid = $(this).parents('.kc_single').attr('gid');
		var html = shareTmp('kkitty');	
		var kkitty = new dialog({
			'content' : html ,
			'width' : '502px' ,
			'onChange' : function(){
				$('#dialogTitle').hide();
				$('#dialogLayer').css({'background' : 'none' , 'padding' : '0'});
			}
		});
		$('.closeBtn').on('click' , function(){
			kkitty.drive.destroyModel();
		});
		var img_url = $(this).parents('.kc_single').find('img').attr('src');
		$.post('/aj/huodong/kiss_vote' , {'vote_content' : gid , 'hd_name' : 'kisscat'} , function(){} , 'json' );
		$.post('/aj/huodong/kiss_twitter' , {'actUrl' : '/biz/huodong/kc/?frm=kc55' , 'actTitle' : 'KISSCAT 美鞋狂欢季，喜欢停不了' , 'goods_id' : gid , 'group_id' : '60448969' , 'shareType' : 1 , 'twitterType' : 'goods' , 'goods_pic_url' : img_url  } , function(){} , 'json');
	});

});
