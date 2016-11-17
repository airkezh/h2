/*common*/
var $ = require('wap/zepto');
var shareTmp = require('component/shareTmp');

var portrait = fml.vars.portrait;
var userId = fml.vars.userId;

function intoView($item, $parent){
	var scrollTop = $parent.height() + 10

	if($item.outerHeight){
		scrollTop += $item.outerHeight()
		$parent.parent().scrollTop(scrollTop)

	}else{
		scrollTop += $item.height()	
		$(window).scrollTop(scrollTop)
	}
}


function appendText(text){

	$('.dialog').append(shareTmp('client_dialog', {'portrait': portrait, 'text': text}));

	$.post('/aj/robotchat/robot/search', { user_id: userId, question: text}, function(ret){
		if(ret.data.length){
			$('.revise_box').remove();
			$('.bottom_con').append(shareTmp('revise'));
			$('.revise_hand_wrapper').show();
		
			if(ret.data[0].answer.indexOf('href') != -1){
				var answer = ret.data[0].answer;
				var href = encodeURIComponent(JSON.stringify({ "url": answer.match(/http[^"]+/)[0], "inApp": 1}));
				ret.data[0].answer = answer.replace(/http[^"]+/, "meilishuo://openURL.meilishuo/?json_params=" + href);
			}
		}
		var $box = $(shareTmp('robot_dialog', ret));
		
		$box.appendTo($('.dialog'));
		$('.pos')[0].scrollIntoView(false);

	}, 'json');
	
	$('.inputbox_input').val('');
}

function revise(questionId, questionIndex){
	$.post('/aj/robotchat/robot/revise', { id: questionId, index: questionIndex, is_helpful: 1}, function(ret){
		if(!ret.code){
			reviseAnmiate(1);
		}
	}, 'json');
}

function getOrderList(){
	$.get('/aj/robotchat/robot/order', {page: 0, status: 0}, function(ret){
		if(!ret.code){
			var box = shareTmp('order', ret.info[0]);
			$('.dialog').append(box);

			intoView($('.go_more'), $('.dialog'));
		}
	}, 'json');
}

var isShow = 0;
function togglePanel(target){
	var $inputBox = $('.chat_inputbox');
	var $panel = $('.order_icon_wrapper');
	var $icon = $('.chat_inputbox .icon');

	var iconFlag = target.is('.chat_inputbox .icon');
	var panelFlag = target.is('.icon_box');
	var orderIconFlag = target.is('.order_icon img');

	// $('.pos')[0].scrollIntoView(false);

	if(!isShow && iconFlag){
		$('.inputbox_input').blur();
		$inputBox.addClass('up');
		$panel.show();
		isShow = 1;
	}else if(panelFlag || orderIconFlag){

	}else if(target.is('.inputbox_input')){
		$inputBox.removeClass('up');
		target.focus();
		$panel.hide();
	}else{
		$inputBox.removeClass('up');
		$panel.hide();
		isShow = 0;
	}	
}

function reviseAnmiate(isHelpful){
	
	if(isHelpful){
		$('.animation').children('.useful').addClass('scale').one('webkitAnimationEnd', function(){
			$(this).removeClass('scale')
		});
	}else{
		$('.animation').children('.unuseful').addClass('scale').one('webkitAnimationEnd', function(){
			$(this).removeClass('scale')
		});
	}
}

function init(){
	$('body').on('touchend', function(e){
		$('.revise_con').hide();
		togglePanel($(e.target));
		if(!$(e.target).is('textarea')){
			$('textarea').blur();
		}
	});

	$('.sendBtn').on('touchend', function(){
		$('.chat_inputbox').removeClass('up');
		var text = $.trim($('.inputbox_input').val());
		if(text){
			appendText(text);
		}
	});

	$('.bottom_con').on('touchend', '.revise_hand_wrapper', function(e){
		$('.revise_con').toggle();
		return false;
	}).on('touchend','.useful_wrapper', function(){
		var $question = $('.create .bubble').find('p').last();
		var questionId = $question.data('id');
		var questionIndex = "" + $question.data('index');

		revise(questionId, questionIndex);
		$('.revise_box').remove();
	}).on('touchend', '.unuseful_wrapper', function(){
		reviseAnmiate(0);
		$('.revise_box').remove();
	}).on('touchend', '.order_icon', function(){
		getOrderList();
	});

}

function checkLogin(cb, text){
	window.MLS = {
		 didLogin: function() {
		    window.location.reload();
		}
	}
	if(Meilishuo.config.user_id === 0){
		window.location.href = 'meilishuo://login.meilishuo';	 
	}else{
		init();
	}	
}
checkLogin();
