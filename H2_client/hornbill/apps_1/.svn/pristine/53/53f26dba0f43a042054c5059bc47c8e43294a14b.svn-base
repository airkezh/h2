/*common*/
var $ = require('jquery');
var focus = require('app/focus_banner'),
	alert = require('ui/alert'),
	checkLogin = require('app/checkLogin');

(function() {
	focus.bind({
		'unit': '.scroll_bar li',
		'btn': '.round .adType a',
		'transition': 'fade',
		'toprev': '#focu_prev',
		'tonext': '#focu_next'
	})
	/*$.ajax({
		url: '/aj/hd_meimei/getVote',
		type: "post",
		dataType: "json",
		success: function(data) {
			if (data.error_code == 0) {
				var vote = data.data;
				for (var key in vote) {
					$('span[rel=' + key + ']').html(vote[key])
				}
			}
		}
	});*/
	$('.like_btn').on('click', function() {
		new alert({content:'活动已结束', width:370});
		//if (!checkLogin()) return false;
		/*var item_id = $(this).attr('rel');
		$.ajax({
			url: '/aj/hd_meimei/addVote',
			type: 'POST',
			dataType: 'json',
			data: {
				act: 'addVote',
				item_id: item_id
			},
			success: function(data) {
				if (data.error_code == 0) {
					$('span[rel=' + item_id + ']').html(data.data);
					new alert({content:data.message, width:370});
				} else if(data.error_code == -1) {
					window.location.href = "/user/login";
				}else{
					new alert({content:data.message, width:370});
				};
			}
		})*/

	})
}())