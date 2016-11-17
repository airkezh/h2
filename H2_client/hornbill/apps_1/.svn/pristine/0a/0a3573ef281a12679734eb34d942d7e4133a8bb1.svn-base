/*common*/
var dialog = require('ui/dialog');
var shareTmp = require('component/shareTmp');
var $ = require('jquery');
alertui = require('ui/alert'),
	checkLogin = require('app/checkLogin');

(function() {
	/**$.ajax({
		url: '/aj/hd_nuannuan/getVote',
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.error_code == 0) {
				var vote = data.data;
				for (var key in vote) {
					$('img[rel=' + key + ']').next('.lovt').html(vote[key])
				}
			}
		}
	});**/
	var tpl = shareTmp("alertUi");
	var yyBox = new dialog({
		width: 642,
		content: tpl,
		'onStart': function() {
			$('#overlay').css({
				'background-color': 'black',
				'filter': 'alpha(opacity=40)',
				'opacity': 0.4
			});

		},
		'onChange': function() {
			$('#dialogTitle').hide();
			$('#dialogLayer').css({
				'background': 'none',
				'filter': ''
			});
			$('#dialogContent').css({
				'background': 'none'
			});
			$('.close').on('click', function() {
				$('#closeDialog').trigger('click');
			})
			setTimeout(function(){
				$('#closeDialog').trigger('click');
			}, 5000)
		}
	});
var scrotop=[0,595,1305,1780,2246,2720,3200]
$('.nav li a').each(function(index, el) {
	$(this).on('click',function(){
	$('body,html').animate({scrollTop:scrotop[index] + 130},1000);
	})
});

	$('.like_btn').on('click', function() {
		//if (!checkLogin()) return false;
		var item_id = $(this).attr('rel');
		$.ajax({
			url: '/aj/hd_nuannuan/addVote',
			type: 'POST',
			dataType: 'json',
			data: {
				act: 'addVote',
				item_id: item_id
			},
			success: function(data) {
				if (data.error_code == 0) {
					$('img[rel=' + item_id + ']').next('.lovt').html(data.data);
				} else if (data.error_code == -1) {
					window.location.href = "/user/login";
				} else {
					new alertui({
						content: data.message,
						width: 370
					});
				};
			}
		})

	})
}())

$(window).scroll(function(){

	var stop=$(window).scrollTop();
	console.log(stop)
	if(stop<140){
		$('.nav').fadeOut();
 	}else{
 		$('.nav').fadeIn();
 	}
	if(stop<595){
		$('.nav li').removeClass('active');
		$('.nav li:eq(0)').addClass('active');
 	}

	if(stop>595 && stop<1305){
		$('.nav li').removeClass('active');
		$('.nav li:eq(1)').addClass('active');
 	}
	if(stop>1305 && stop<1780){
		$('.nav li').removeClass('active');
		$('.nav li:eq(2)').addClass('active');
 	}
	if(stop>1780 && stop<2246){
		$('.nav li').removeClass('active');
		$('.nav li:eq(3)').addClass('active');
 	}
 	if(stop>2246 && stop<2720){
		$('.nav li').removeClass('active');
		$('.nav li:eq(4)').addClass('active');
 	}
 	if(stop>2720 && stop<3200){
		$('.nav li').removeClass('active');
		$('.nav li:eq(5)').addClass('active');
 	}

	if(stop>3200){
		$('.nav li').removeClass('active');
		$('.nav li:eq(6)').addClass('active');
 	}
})