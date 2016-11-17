/*common*/
require('wap/zepto/fastclick');

var Alert = require('wap/ui/alert');
var confirm = require('wap/ui/confirm');
var dialog = require('wap/app/dialog');
var openApp = require('wap/app/openApp');
var tracking = require('wap/app/tracking');
var shareTmp = require('wap/component/shareTmp');
var urlHandle = require('wap/component/urlHandle');
var checkLogin = require('circle/app/checkLogin');

window.MLS = {
    didLogin: function(){
        // 成功登录，跳转到下一步
        window.location.reload();
    },

    /*客户端填写地址 回调*/
    onPickAddress: function(res){
        var code = res.code;

        if (code == 0) {
            var data = (Meilishuo.config.os.android ? res.info : $.parseJSON(res.info)) || {},
                addrId = data.addr_id || '',
                phone = data.phone || '',
                address = data.address || '',
                nickname = data.nickname || '',
                address = address.substr(0, 18) + '...',
                nicknameLen = nickname.length || 0,
                nickname = (nicknameLen <= 4) ? nickname : nickname.substr(0, 4) + '...';
                //  获奖弹窗
                recordId = $('#j_prize_btn').data('recoid') || 0;

            $('#j_pic_bg').attr('src', 'http://d03.res.meilishuo.net/pic/_o/53/59/325ee5e37d190acbb3ac2ef4fcfe_471_437.cf.png');
            $('#j_prize_desc').html('<p class="address">商品将发往:<br>' + address + '<br>' + nickname + '&nbsp;&nbsp;' + phone + '</p>');
            $('#j_prize_btn').html('<div class="buttons"><div class="alter_btn">修改地址</div><div class="sure_btn" data-addrid="' + addrId + '" data-recoid="' + recordId + '">确定</div><div class="closeDialog"></div></div>');
        }
    }
};

var curCaptchaType;
var curCaptchaDomain;
var curCaptchaRuleId;
var ajaxRequestIsComplete = false;
var curUrlSearchParams = urlHandle.getParams(window.location.search); 
var isFromShare = curUrlSearchParams.isFromShare;

if (isFromShare || (navigator.userAgent.indexOf('MicroMessenger') != -1)) {
    openApp(window.location.href, '', '', true, 'member');
}

//九宫格 抽奖动作
var lottery = {
	id:'lottery', //九宫格id
	index:-1,	//当前转动到哪个位置，起点位置是0
	count:0,	//总共有多少个位置
	timer:0,	//setTimeout的ID，用clearTimeout清除
	speed:410,	//初始转动速度
	times:0,	//转动次数
	cycle:20,	//转动基本次数：即至少需要转动多少次再进入抽奖环节
	prize:-1,	//中奖位置
	slowSpeed:50, //加速基本单元
	slowNum:10, //加速基本次数
	init : function(){
		if ($("#"+this.id).find(".lottery-unit").length>0) {
			$lottery = $("#"+this.id);
			$units = $lottery.find(".lottery-unit");
			this.count = $units.length;
			this.prize = -1;
			this.times = 0;
			this.speed = 410;
			this.index = -1;
			draw9.moving = false;
			$lottery.find('.active').hide();
		};
	},
	roll_unit : function(){
		var index = this.index;
		var count = this.count;
		$lottery.find('.active').show();

		$lottery.find(".lottery-unit-"+index).find('.active').show();

		index += 1;

		if (index>count-1) {
			index = 0;
		};

		$lottery.find(".lottery-unit-"+index).find('.active').hide();
		this.index=index;
		return false;
	},
	roll : function(item){
		this.times += 1;
		this.roll_unit();
		//当轮转到的 当前位置=中奖位置 停止 出弹窗
		if (this.times > this.cycle + this.slowNum && this.prize == this.index) {
			this.speed += 300;
			clearTimeout(this.timer);
				// console.log('转动结束' , this.speed , this.times)
			draw9.prize_dialog(item);	
		}else{
			//轮转次数 《= 转动基本次数  速度不断加快 到40匀速
			if (this.times <= this.cycle) {
				this.speed -= this.slowSpeed;
				// console.log('加速' , this.speed )

			}else{
				//转动基本次数 以后的8次 速度不断减慢 之后直到当前位置 在奖品的前一个 速度更慢 
				if (this.times >= this.cycle + this.slowNum && ((this.prize==0 && (this.index==6 || this.index==7)) || (this.prize==1 && (this.index==7 || this.index==0)) || this.prize==this.index+2 || this.prize==this.index+1) ) {
					this.speed += 300;
					// console.log('减速300' , this.speed , this.index )
				}else{
					if(this.speed > 100){
						this.speed = 130;
					}else{
						this.speed += 50;
					}
					if(this.prize == 6 && this.times >= this.cycle + this.slowNum -1 ){
						this.speed += 300;
					}
					// console.log('减速' , this.speed , this.index)
				}
			}
			if (this.speed<60) {
				this.speed=60;
			}
			this.timer = setTimeout(function(){ lottery.roll(item) }, this.speed);
		}
	}
};


//抽奖
var draw9 = {
	moving : false, //是否正在抽奖 用于避免重复发送请求
	init : function(){
		var self = this;
		lottery.init();
		// 点击抽奖按钮
		$(".lottery-btn").on('click' , function(){
			checkLogin();

			if ($(this).hasClass('inactive')) {
			    return;
			}
			// console.log('click')
			self.sendDrawAjax();
			// lottery.roll_unit();
			// lottery.prize = 6
			// lottery.roll()
			// var tpl = shareTmp('img_captcha_tpl');
			// $.fn.dialog({ dialogContent : tpl });

		});
		$('.login').on('click' , function(){
			checkLogin();
		});


	},
	sendDrawAjax : function(){
		var self = this;
		if(self.moving) {return;}
		self.moving = true;

		$.ajax({
		    url: '/aj/member/doDraw',
		    type: 'post',
		    data: { 'act_code': 'beans_dial'},
		    dataType: 'json',
		    success: function(data){
		    	// console.log('success')
		        var code = data.error_code,
		            jsonData = data.data || {};

		        switch (code) {
		        	// 中奖
		            case 0:
		            	// console.log('中奖');
		            	// var isFree = (fml.vars.LotteryFreeTimes < 1) ? 1 : 0;
		                tracking.cr('page_element', {'_action': 'click', 'r':'_page_id=1100003:_page_area=LargeDraw:_pos_id=1:_pos_name=draw' });
		                fml.vars.LotteryFreeTimes = fml.vars.LotteryFreeTimes - 1;
		                // 更新当前美美豆 和 点击状态
		                self.updateTurntableState();

		                // 获取中奖id(奖品个数范围内)
		                lottery.prize = self.getPrizeIndex(jsonData);
		                // console.log(lottery.prize)

		                // 抽奖
		                lottery.roll(jsonData);
		                
		                break;
		            case 400901:
		                curCaptchaType = jsonData.captcha_type || '';
		                curCaptchaRuleId = jsonData.rule_id || '';

		                self.smsCaptchaValidate();

		                break;
		            case 400902:
		            case 400903:
		            case 400904:
		                curCaptchaType = jsonData.captcha_type || '';
		                curCaptchaDomain = jsonData.captcha_domain || '';
		                curCaptchaRuleId = jsonData.rule_id || '';

		                self.imgCaptchaValidate();

		                break;
		            default:
		                /*var alt = new Alert ({
		                    content : '抽奖失败！',
		                    onSure : function(){
		                        self.removeLayer();
		                        return;
		                    }
		                });*/
		                break;
		        }
		    },
		    error: function(){
		        var alt = new Alert ({
		            content : '服务器开小差中...请稍后再试~',
		            onSure : function(){
		            	window.location.reload();
		                return;
		            }
		        });
		        self.moving = false;
		    }
		});
	},
	updateTurntableState: function(){
	    var self = this,
	        oTotalBeans = $('#j_total_beans'),
	        curUserTotalBeans = parseInt(oTotalBeans.text());

	    if (fml.vars.LotteryFreeTimes < 0) {
		    curUserTotalBeans = parseInt(oTotalBeans.text()) - fml.vars.turntableThreshold;
		    oTotalBeans.text(curUserTotalBeans);
		}
// console.log('更新当前美美豆')
	    self.updateTurntablePointer();
	},
	updateTurntablePointer: function(){
	    var obtn = $('.lottery-btn'),
	        curUserTotalBeans = parseInt($('#j_total_beans').text());

	    
        if (fml.vars.LotteryFreeTimes > 0) {
            obtn.attr('src', fml.vars.freePointerImg);
        } else {
            if (curUserTotalBeans < fml.vars.turntableThreshold) {
                obtn.addClass('inactive');
                obtn.attr('src', fml.vars.unavailablePointerImg);
            } else {
                obtn.removeClass('inactive');
                obtn.attr('src', fml.vars.availablePointerImg);
            }
        }
	   
	},
	getPrizeIndex: function(item){
	    var index = 0,
	        itemId = item.id || 0,
	        turntablePrizeData = fml.vars.turntablePrizeData,
	        curPrizeLen = turntablePrizeData.length || 0;

	    for (var i = 0; i < curPrizeLen; i++) {
	        var curItem = turntablePrizeData[i],
	            curItemId = curItem.id || 0;

	        if (curItemId == itemId) {
	            index = i;
	            break;
	        }
	    }
	    return index;
	},
	prize_dialog : function(item){
		// console.log('prize_dialog~~~~~~~~~')
		var type = item.type || 0;
		var beans = item.extra.beans || 0;
		var oAddBeans = $('#j_add_beans');
		oAddBeans.text('+' + beans);
		var _self = this;
		setTimeout(function(){
			var tpl = shareTmp('j_prize_tpl', {'data': item});
			$.fn.dialog({
				dialogContent : tpl,
				dialogWidth : '4.71rem',
				onClose : function(){
					// console.log('关闭弹窗')
					// 九宫格初始化
					lottery.init();
					// 美美豆动画
					if (type == 3) {
						oAddBeans.addClass('beans_act').unbind('webkitAnimationEnd').on('webkitAnimationEnd' , function(){
							// console.log('动画结束')
							var oTotalBeans = $('#j_total_beans'),
							    curUserTotalBeans = parseInt(oTotalBeans.text()) + beans;

							// console.log(parseInt(oTotalBeans.text()))
							// console.log(beans , parseInt(oTotalBeans.text()))
							// console.log(curUserTotalBeans)

							oTotalBeans.text(curUserTotalBeans);

							_self.updateTurntablePointer();

							$(this).removeClass('beans_act');
						});
					}

				} 
			});
			//点击弹窗里 确认地址按钮
			$('body').on('click' , '.sure_btn' , function(){
				var that = $(this),
				    addrId = that.data('addrid'),
				    recordId = that.data('recoid');

				if (ajaxRequestIsComplete) {
				    return;
				}
				ajaxRequestIsComplete = !ajaxRequestIsComplete;

				$.ajax({
				    url: '/aj/member/saveContactInfo',
				    type: 'post',
				    data: {
				        'addr_id': addrId,
				        'record_id': recordId,
				        'act_code': 'beans_dial'
				    },
				    dataType: 'json',
				    success: function(data){
				        var code = data.error_code;
				        
				        if (code != 0) {
				            var alt = new Alert ({
				                content : '保存失败！'
				            });
				        }
				        $('.closeDialog').trigger('tap');

				        ajaxRequestIsComplete = !ajaxRequestIsComplete;
				    },
				    error: function(){
				        var alt = new Alert ({
				            content : '服务器开小差中...请稍后再试~'
				        });

				        ajaxRequestIsComplete = !ajaxRequestIsComplete;
				    }
				});
			});
			//点击弹窗里 修改地址按钮
			$('body').on('click' , '.alter_btn,.write_btn' , function(){
				if (!fml.vars.isNewest && Meilishuo.config.os.android) {
				    var c = new confirm({
				        content: '当前版本不支持编辑地址，请升级最新版本后，在“会员签到－抽奖大转盘－我的奖品”中继续填写地址。',
				        onSure: function(){
				            window.location.href = '/download/latest/wap';
				        },
				        onCancel: function(){
				            return;
				        }
				    });
				} else {
				    window.location.href = 'meilishuo://pick_address.meilishuo';
				}
			});
			$('body').on('click' , '.looks_btn' , function(){
				tracking.cr('page_element', {'_action': 'click', 'r':'_page_id=1100003:_page_area=LargeDraw:_pos_id=2:_pos_name=my_prize' });
				window.location.href = $(this).attr('ahref');	
			});


		} , 1000);
	},
	imgCaptchaValidate: function(){
	    var self = this,
	        imgCaptchaUrl = curCaptchaDomain + 'Captcha/Captcha?token=9adfc893s&type=' + curCaptchaType,
	        tpl = shareTmp('img_captcha_tpl', {'picUrl': imgCaptchaUrl + '&timestamp=' + new Date().getTime()});

	    $.fn.dialog({ dialogContent : tpl });

	    // 更换图片
	    $('.newImg').on('click', function(){
	        $('.captchaImg').attr('src', imgCaptchaUrl + '&timestamp=' + new Date().getTime());
	    });

	    // 验证图片
	    $('.imgCaptchaCheck').on('click', function(){
	        var captchaVal = $.trim($('.captchaInput').val()) || '';

	        if (captchaVal == '') {
	            return;
	        }

	        var imgCheckUrl = '/aj/captcha/picValidate',
	            params = {
	                'expire_type': 'today',
	                'captcha': captchaVal,
	                'ruleid': curCaptchaRuleId
	            };

	        $.get(imgCheckUrl, params, function(data){
	            if (data.code == 0) {
	                // self.removeLayer();
	                $('.closeDialog').trigger('tap');
	                self.sendDrawAjax();
	            } else {
	                $('.imgCenter').css('display', 'block');
	                $('.captchaImg').attr('src', imgCaptchaUrl + '&timestamp=' + new Date().getTime());
	            }
	        }, 'json');
	    });
	},
	smsCaptchaValidate: function(){
	    var self = this,
	        tpl = shareTmp('sms_captcha_tpl', {'picUrl': '/aj/captcha/getSms?rule_id=' + curCaptchaRuleId + '&smstype=active_sm_captcha'});

	    $.fn.dialog({ dialogContent : tpl });

	    // 获取短信验证码
	    var canGetSms = true,
	        changeSmsStatus = function(that){
	            that.text('60秒后重新发送');
	            that.css({'border-color': '#ccc2c9', 'color': '#ccc2c9'});

	            var countdownTimer = setInterval(function(){
	                if (that.smsTime == 0) {
	                    clearInterval(countdownTimer);
	                    canGetSms = true;
	                    that.text('点击发送');
	                    that.css({'border-color': '#ff94b7', 'color': '#ff95b6'});
	                } else {
	                    that.text(that.smsTime + '秒后重新发送');
	                    that.smsTime--;
	                }
	            }, 1000);
	        };
	    $('.getSmsCaptcha').on('click', function(){
	        if (!canGetSms) {
	            return;
	        }

	        canGetSms = false;

	        var that = $(this);

	        that.smsTime = 59;
	        changeSmsStatus(that);
	        
	        var getSmsUrl = '/aj/captcha/getSms',
	            params = {
	                'smstype': 'active_sm_captcha',
	                'rule_id': curCaptchaRuleId
	            };

	        $.get(getSmsUrl, params, function(data){
	            if (data.code == 0) {
	                // 验证短信
	                $('.captchaCheck').css('background-color', '#ff94b7');
	            } else {
	                canGetSms = true;
	            }
	        }, 'json');
	    });

	    $('.captchaCheck').on('click', function(){
	        var captchaVal = $.trim($('.captchaInput').val()) || '';

	        if (captchaVal == '') {
	            return;
	        }

	        var smsCheckUrl = '/aj/captcha/smsValidate',
	            params = {
	                'expire_type': 'today',
	                'smstype': 'active_sm_captcha',
	                'captcha': captchaVal,
	                'ruleid': curCaptchaRuleId
	            };

	        $.get(smsCheckUrl, params, function(data){
	            if (data.code == 0) {
	                // self.removeLayer();
	                $('.closeDialog').trigger('tap');
	                self.sendDrawAjax();
	            } else {
	                $('.smsCenter').css('display', 'block');
	            }
	        }, 'json');
	    });
	}
}
window.onload = function(){
	draw9.init();	
}

/*中奖名单 向上滚动*/
var prizeList = $('.person_box');
var prizeListHeight = prizeList.height();
var i = -1;
var t = setInterval(function(){
	prizeList.css({ '-webkit-transform' : 'translateY('+i+'px)' , 'transform' : 'translateY('+i+'px)'});
	i -= 1;
	if(i < -prizeListHeight){
		i = 0;
	}
} , '30');


/*活动规则*/
$('.activity_rule').on('click', function(){
	tracking.cr('page_element', {'_action': 'click', 'r':'_page_id=1100003:_page_area=LargeDraw:_pos_id=3:_pos_name=rule' });
	// window.location.href = $(this).attr('ahref');
    var tpl = shareTmp('rule' , {'rule_pic' : fml.vars.rule_pic});
    $.fn.dialog({
    	dialogContent : tpl , 
    	dialogTitle : '',
    	dialogWidth : '5.7rem',
    	noScroll : false ,
	});

});
/*我的奖品*/
$('.my_prize').on('click' , function(){
	tracking.cr('page_element', {'_action': 'click', 'r':'_page_id=1100003:_page_area=LargeDraw:_pos_id=2:_pos_name=my_prize' });
	window.location.href = $(this).attr('ahref');
});
/*活动入口*/
$('.act_list td').on('click' , function(){
	var index = $('.act_list td').index($(this)) + 1;
	tracking.cr('page_element', {'_action': 'click', 'r':'_page_id=1100003:_page_area=event:_pos_id=1:_pos_name=act_list'+index });
	var href = $(this).attr('ahref') || '';

	if (href == '') {
	    // 判断是否登陆
	    checkLogin();

	    $.ajax({
	        url: '/aj/member/getDuibaUrl',
	        type: 'post',
	        dataType: 'json',
	        success: function(data){
	            var code = data.error_code;

	            if (code == 0) {
	                var link = data.data || '';
	                if (link != '') { window.location.href = link; }
	            } else {
	                var alt = new Alert ({
	                    content : '服务器开小差中...请稍后再试~',
	                    onSure : function(){
	                    	window.location.reload();
	                        return;
	                    }
	                });
	            }
	        },
	        error: function(){
	            var alt = new Alert ({
	                content : '服务器开小差中...请稍后再试~',
	                onSure : function(){
	                	window.location.reload();
	                    return;
	                }
	            });
	        }
	    });
	} else {
	    window.location.href = href;
	}
});













