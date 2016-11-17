fml.define('page/group/set_avatar', ['jquery', 'app/imgPreviewSelect', 'ui/confirm'], function(require, exports){
	var $ = require('jquery');
	var imgPreviewSelect = require('app/imgPreviewSelect');
	var confirmDia = require('ui/confirm');

	var $save = $('.save_ava'), $preview_pic = $('.preview_pic');

	function clearAreaSelect() {
		if ($('.imgareaselect-outer').length > 0) {
			$('.imgareaselect-selection').parent().remove();
			$('.imgareaselect-outer').remove();
		}
	}

	//hack for firefox, reset file input size
	if ($.browser.mozilla) $('.attach').attr('size', 12); 

	var opts = { 
		width: 920, 
		pre_w: 922, 
		pre_h: 243, 
		aspectRatio: '9.5:2.5',
		parent: '.set_ava'
	};
	var elements = {
		img: '#thumbn',
		previewImg: '.preview',
		originImg: '.original',
		previewDiv: '.preview_pic'
	};
	imgPreviewSelect('.attach', elements, opts, function(){
		$preview_pic.show();
		$('.header_pic').hide();
	});

	$save.click(function(){
		$('#upload_ava').submit();
	});

	$('.del_header').click(function(){
		var url = '/aj/magazine/delete_avatar';
		var data = { 'group_id': Meilishuo.config.group_id };
		new confirmDia({
			content : '您确定要删除背景图么?',
			width : 370,
			isOverflow : true
		}).onSure(function(){
			$.get(url, data, function(r){
				window.location.href = location.href;
			}, 'json');
		});
	});
});