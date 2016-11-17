/*common*/
var dialog = require('ui/dialog');
var shareTmp = require('component/shareTmp');
var $ = require('jquery');
var focus = require('app/focus_banner'),
	alertui = require('ui/alert'),
	checkLogin = require('app/checkLogin');

function select_show() {
	var sel = $('.select_box p');
	var showOption = $('.show_option');
	var $li = showOption.find('li');
	$('body').on('click', function(e) {
		// e.stopPropagation();
		// e.preventDefault();
		$('.show_option').hide();
	})
	$('body').on('click', sel, function(e) {
		var $lp = $(e.target);
		var showop = $lp.parent('.select_box').find('.show_option');
		// e.stopPropagation();
		// e.preventDefault();
		if (showop.is(":hidden")) {
			showop.css('display', 'block');
		} else {
			showop.hide();
		}
	})
	$('body').on('click', $li, function(e) {
		var itarget = $(e.target);
		if (itarget[0].tagName == 'LI') {
			var ltext = itarget.text();
			var itemid = itarget.attr('itemId'),
			value = itarget.attr('data_value');
			itarget.parents('.select_box').find('p').attr({'itemId':itemid,'data_value':value}).html(ltext);
			if(itarget.parents('.select_box').attr('rel') == 'province'){
				showCity(itemid);
			}else if(itarget.parents('.select_box').attr('rel') == 'city'){
				showDealer(itemid);
			}

		}

	})

}

function dailog_chou(many,text,tips){
	var dailog = shareTmp("dailogBox");
	var daiBox = new dialog({
		width: 600,
		content: dailog,
		'onStart': function() {
			$('#overlay').css({
				'background-color': 'black',
				'filter': 'alpha(opacity=40)',
				'opacity': 0.4
			});
			

		},
		'onChange': function() {
			if( tips ){
				$('.many_box').html('<span>'+tips+'</span>');
			}else{
				$('.many_box').html('<em>'+many+'</em>元');
			}
			
			$('.dia_tip').html(text);
			$('#dialogTitle').hide();
			$('#dialogLayer').css({
				'background': 'none',
				'filter': ''
			});
			$('#dialogContent').css({
				'background': 'none'
			});
			$('.dialog_close').on('click', function() {
				$('#closeDialog').trigger('click');
			})
		}
	})
}

function radio_click() {
		$('body').on('click', $('.radio_box li'), function(e) {
			var itarget = $(e.target);
			if (itarget[0].tagName == 'LI') {
				itarget.parents('ul').find('i').removeClass('active');
				itarget.find('i').addClass('active');
				itarget.parents('ul').find('input').removeAttr('checked');
				itarget.find('input').attr('checked', 'checked');
			}
			if (itarget[0].tagName == 'I') {
				itarget.parents('ul').find('i').removeClass('active');
				itarget.addClass('active');
				itarget.parents('ul').find('input').removeAttr('checked');
				itarget.parent('li').find('input').attr('checked', 'checked');
			}
		})
	}
function showArea(){
	 $.ajax({  
        url:"/aj/hd_dongfeng/getProvince",  
        dataType:'json',  
        data:'',  
        success:function(result) {  
           	if(result.error_code == 0){
           		var code = [];
           		var list = result.data;
				for(var i=0, length=list.length; i<length; i++){
					code.push('<li data_value='+list[i].Code+' itemId='+list[i].ItemID+'>'+list[i].Name+'</li>');
				}
				$('.show_option:eq(0) ul').html(code.join(''));
           	}
        },  
    });  
}
function showCity(itemid){
	 $.ajax({  
        url:"/aj/hd_dongfeng/getCity",  
        dataType:'json',  
        data:{pid:itemid},  
        success:function(result) {  
           	if(result.error_code == 0){
           		var code = [];
           		var list = result.data;
				for(var i=0, length=list.length; i<length; i++){
					code.push('<li data_value='+list[i].Code+' itemId='+list[i].ItemID+'>'+list[i].Name+'</li>');
				}
				$('.show_option:eq(1) ul').html(code.join(''));
           	}
        },  
    });  
}
function showDealer(itemid){
	 $.ajax({  
        url:"/aj/hd_dongfeng/getDealer",  
        dataType:'json',  
        data:{cid:itemid},  
        success:function(result) {  
           	if(result.error_code == 0){
           		var code = [];
           		var list = result.data;
				for(var i=0, length=list.length; i<length; i++){
					code.push('<li data_value='+list[i].Code+' itemId='+list[i].ItemID+'>'+list[i].Name+'</li>');
				}
				$('.show_option:eq(2) ul').html(code.join(''));
           	}
        },  
    });  
}

	(function() {
		var tpl = shareTmp("yyBox");
		$('.yy_btn').on('click', function() {
			var yyBox = new dialog({
				width: 994,
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
					showArea();
					$('#submit').on('click', function() {
			var name = $('#name').val(),
				phone = $('#phone').val(),
				area = $('.select_box:eq(0) p').attr('data_value') || 0,
				city = $('.select_box:eq(1) p').attr('data_value') || 0,
				store = $('.select_box:eq(2) p').attr('data_value')|| 0,
				shijia = $('input[name=shijia][checked]').val(),
				gouche = $('input[name=gouche][checked]').val();
			if ($.trim(name) == '') {
				new alertui({
					content: '请输入姓名！',
					width: 250
				});
				return false;
			}
			if ($.trim(phone) == '') {
				new alertui({
					content: '请输入您的手机号！',
					width: 250
				});
				return false;
			}
			var re = /^1\d{10}$/;
			if (!re.test(phone)) {
				new alertui({
					content: '请输入正确的手机号！',
					width: 250
				});
				return false;
			}
			if (!area) {
				new alertui({
					content: '请选择省份！',
					width: 250
				});
				return false;
			}
			if (!city) {
				new alertui({
					content: '请选择城市！',
					width: 250
				});
				return false;
			}
			if (!store) {
				new alertui({
					content: '请选择专营店！',
					width: 250
				});
				return false;
			}
			$.ajax({
				url: '/aj/hd_dongfeng/record',
				type: 'POST',
				dataType: 'json',
				data: {
					name: name,
					mobile: phone,
					drive_date:shijia,
					lift_car_date:gouche,
					province:area,
					city:city,
					dealercode:store
				},
				success: function(data) {
					if (data.error_code == 0) {
						$('#closeDialog').trigger('click');
						new alertui({
							content: '预约成功！',
							width: 370
						});
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
				}
			});
		})

		select_show();
		radio_click();
		focus.bind({
			'unit': '.scroll_bar li',
			'btn': '.round .adType a',
			'transition': 'fade',
			'toprev': '#focu_prev',
			'tonext': '#focu_next'
		})


		$('.like_btn').on('click', function() {
			//if (!checkLogin()) return false;
			var item_id = $(this).attr('rel');
			$.ajax({
				url: '/aj/hd_dongfeng/addVote',
				type: 'POST',
				dataType: 'json',
				data: {
					act: 'addVote',
					item_id: item_id
				},
				success: function(data) {
					if (data.error_code == 0) {
						/*new alertui({
							content: data.message,
							width: 370
						});*/
						choujiang();
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

function choujiang() {
	$.ajax({
		url: '/aj/hd_dongfeng/lottery',
		type: 'POST',
		dataType: 'json',
		data: {
			act: 'set',
			activity_id: '49'
		},
		success: function(data) {
			if (data.error_code == 1) {
				dailog_chou(data.data.award.awardname)
			} else if( data.error_code == 0 ){
				if( data.data.leftTimes == 1 ){
					dailog_chou( 0 ,'还有一次机会，再接再励噢。' , '再来一次 !' )
				} else{
					dailog_chou( 0 ,'不要紧，明天再来还能抽优惠券哦。' , '明日再战 !' )
				}
			}else{
				new alertui({
					content: data.message,
					width: 370
				});
			};
		}
	})
}



