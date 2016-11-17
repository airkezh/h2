seajs.use(['ht/app/batch-table'], function(res){
	var init = function(){
		$('.table').on('click','.all-selector',function(){
			var _this = $(this),
				_parent = _this.parents('table').find('input:checkbox'),
				i = 0;
			if (!_this.attr('checked')) {
				for(;i < _parent.length; i++){
					_parent.eq(i).attr('checked', null);
				}
			}else{
				for(;i < _parent.length; i++){
					_parent.eq(i).attr('checked', 'true');
				}
			}
		});
		$('.table').on('click','input:checkbox[class!="all-selector"]',function(){
			var _this = $(this),
				_parent = _this.parents('table').find('.all-selector'),
				i = 0;
			if (!_this.attr('checked')) {
				_parent.attr('checked', null);
			}
		});
		$('body').on('click','.close',function() {
			$('.wrap').hide();
		}).on('click','.show',function(){
			$('.wrap').css('left',($(window).width() - $('.wrap').width())/2).css('top',$(document).scrollTop() + 100).show();
		});
	}
	var showDiv = function(_msg){
		var _wrap = $('<div class="wrap">'+
			'<span href="" class="close-X close">X</span>'+
			'<p>欢迎光临</p>'+
			'<span href="" class="btn-s-red ok close">确定</span>'+
			'<div class="down"></div>'+
		'</div>');
		$('body').append(_wrap);
		_wrap.css('left',($(window).width() - $('.wrap').width())/2).css('top',100).show();
		_wrap.find('p').html(_msg);
	}
	window.showDiv = showDiv;
	init();
});
