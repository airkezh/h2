/*common*/

var $ = require('wap/zepto');
var shareTmp = require('wap/component/shareTmp');
require('wap/app/dialog');
var params = require('component/urlHandle').getParams(location.href);


var url = '/help/robot/comment';
var userId = $('input[type=hidden]').val();
var knowId= params.know_id;

//有用
$('.yes').click(function(){
	var _this = $(this);

	if(_this.hasClass('yes')){
		postSubmit(1,'','');	
		_this.addClass('heart').removeClass('yes');
		$('.no').hide().next().show();
	}else{
		_this.removeClass('heart').addClass('yes');
		$('.no').show().next().hide();
	}
});


//没用
$('.no').click(function(){
	var $this = $(this);
	if($this.hasClass('no')){
		show();
	}else{
		$this.addClass('no').removeClass('broken').prev().show();
		$('#vote').find('p').hide();
	}
});

$('#feedback').click(function(){
	show();

});


//
function show(){
	var tpl = shareTmp('revise');
	$.fn.dialog({dialogContent : tpl , dialogTitle : ''});

	var aIpt = $('.useless input');
	var textArea = $('#textArea');
	$.each(aIpt,function(){
		var _this = $(this);

		_this.click(function(){
			$('#submit').show();
			if(_this.attr('id') == 'r3' ){
				textArea.show();
			}else{
				textArea.hide();
			}
		});
		//提交
		$('#submit').click(function(){
			if(_this.attr('checked') == true){
				var type = _this.val();			
				postSubmit(0, type, textArea.val());
				$('.closeDialog').trigger('tap');
				$('.no').addClass('broken').removeClass('no').prev().hide();
				$('#vote').find('p').eq(0).show();
				$('#vote').find('p').eq(1).hide();
			}
		});			
	});

	//取消
	$('#canCel').click(function(){
		postSubmit(0,'','');
		$('.closeDialog').trigger('tap');
		$('.no').addClass('broken').removeClass('no').prev().hide();
		$('#vote').find('p').eq(1).show();
	});
}

function postSubmit(num, type, content){
	var data = {
		'know_id': knowId,
		'outer_user_id': userId,
		'is_useful': num,
		'useless_type': type,
		'comment': content
	};
	$.post(url, data, function(){});
}







	

