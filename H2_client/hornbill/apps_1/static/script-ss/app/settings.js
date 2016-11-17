fml.define('app/settings', ['jquery', 'component/validate', 'app/imgPreviewSelect', 'component/ajax', 'component/iStorage'], function(require, exports) {
	var $ = require('jquery');
	var validate = require('component/validate');
	var ajax = require('component/ajax');
	var storage = require('component/iStorage');
	var settings_box = $('.settings_box'),
		email = settings_box.find('#email'),
		new_email = settings_box.find('#new_email'),
		old_pass = settings_box.find('#old_password'),
		$info = settings_box.find('.setPasswordErrorMessageLine'),
		$province = settings_box.find('#provinceid'),
		$city_id = settings_box.find('#city_id'),
		$true_name = settings_box.find('#true_name'),
		$beauty = settings_box.find('#beauty'),
		$nickname = settings_box.find('#nickname'),
		$t_name = settings_box.find('#t_name'),
		$add_mark = settings_box.find('#add_mark'),
		$zip_code = settings_box.find('#zip_code'),
		$tel_phone = settings_box.find('#tel_phone'),
		$thumbn = settings_box.find('#thumbn'),
		$qq_num = settings_box.find('#qq_num'),
		$msn_num = settings_box.find('#msn_num'),
		$original = settings_box.find('.original'),
		$set_submit = settings_box.find('#set_submit'),
		$crop_out = settings_box.find('.crop_out'),
		$pic_msg = settings_box.find('.pic_msg'),
		$syncBind = settings_box.find('.syncBind '),
		$preview_pic = settings_box.find('.preview_pic'),
		$send_code = settings_box.find('#send_code'),
		$send_bind = settings_box.find('#send_bind'),
		$change_bind = settings_box.find('#change_bind'),
		$mobile = settings_box.find('#mobile'),
		$code = settings_box.find('#code'),
		$usename = settings_box.find('.use-name'),

		$s_code = settings_box.find('#s_code'),
		$s_code2 = settings_box.find('#s_code2'),
		$send_next=settings_box.find('#send_next'),
		$success=settings_box.find('#success'), 

		$back = settings_box.find('.back');

	var win_timer = null 
		,reback_timer = false
		,mark_code = 0

	/**
	 * 头像设置页面事件初始化
	 * @author yaoyao
	 */
	var setAvatar = function() {
		var imgPreviewSelect = require('app/imgPreviewSelect');
		var opts = {
			width: 400,
			pre_w: 200,
			pre_h: 200,
			aspectRatio: '1:1',
			parent: '.setAvatar'
		};
		imgPreviewSelect('.img_submit_in', {}, opts, function() {
			$pic_msg.show();
			$crop_out.show();
			$thumbn.show();
			$original.hide();
			$set_submit.show();
			$preview_pic.show();
		});
	};
	/**
	 * 同步绑定页事件初始化
	 * @author yaoyao
	 */
	var sync = function() {
		settings_box.find('#setPasswordForm').on('submit', function() {
			var data = {},
				_check = settings_box.find('#setPasswordForm input'),
				url = '/settings/set/syncSub',
				callback = function(msg) {
					if (msg.status == 1) {
						alert('保存成功');
						location.reload(0);
					} else {
						alert('保存失败');
					}
				};
			for (var i = 0; i < _check.length; i++) {
				if (_check.eq(i).attr('checked')) {
					data[_check.eq(i).attr('name')] = parseInt(_check.eq(i).val());
				} else {
					data[_check.eq(i).attr('name')] = data[_check.eq(i).attr('name')] || 0;
				}
			};
			$.post(url, data, callback, 'json');
		});
		settings_box.find('#setPasswordForm input[type=checkbox]').click(function(){
			var data = {},
				_check = settings_box.find('#setPasswordForm input'),
				url = '/settings/set/syncSub',
				callback = function(msg) {
					// if (msg.status == 1) {
					// 	alert('保存成功');
					// 	location.reload(0);
					// } else {
					// 	alert('保存失败');
					// }
				};
			for (var i = 0; i < _check.length; i++) {
				if (_check.eq(i).attr('checked')) {
					data[_check.eq(i).attr('name')] = parseInt(_check.eq(i).val());
				} else {
					data[_check.eq(i).attr('name')] = data[_check.eq(i).attr('name')] || 0;
				}
			};
			$.post(url, data, callback, 'json');
		})
	};
	/**
	 * 收货信息页事件初始化
	 * @author yaoyao
	 */
	var set_addr = function() {
		$add_mark.on('focus', function() {
			showTuanHintInfo(50, 380, '地址格式如：XX省XX市XX县（区）XXXXXXX', 'regNotice');
			hideTuanHintInfo('regWarning');
		}).on('blur', function() {
			hideTuanHintInfo('regNotice');
			if (!regCheck(/^[\s\S]{0,1000}$/g, $(this).val())) {
				showTuanHintInfo(50, 380, '地址长度不符合规定，请重新输入', 'regWarning', 1, $(this));
				setAddrCheck[1] = 0;
			} else {
				hideTuanHintInfo('regWarning');
				setAddrCheck[1] = 1;
				$(this).next().html('');
			}
		});
		$tel_phone.on('focus', function() {
			showTuanHintInfo(130, 380, '手机号码是我们联系你的最重要的联系方式', 'regNotice');
			hideTuanHintInfo('regWarning');
		}).on('blur', function() {
			hideTuanHintInfo('regNotice');
			if (!regCheck(/(^(\d{11})$|^((\d{7,8})|(\d{4}|\d{3})-(\d{7,8})|(\d{4}|\d{3})-(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1})｜(\d{7,8})-(\d{4}|\d{3}|\d{2}|\d{1}))$)/g, $(this).val())) {
				showTuanHintInfo(130, 380, '手机号码输入有误，请重新输入', 'regWarning', 1, $(this));
				setAddrCheck[3] = 0;
			} else {
				hideTuanHintInfo('regWarning');
				setAddrCheck[3] = 1;
				$(this).next().html('');
			}

		});
		$qq_num.on('blur', function() {
			if (!regCheck(/^[\d]{5,10}$/g, $(this).val()) && $(this).val() != '') {
				showTuanHintInfo(175, 380, 'QQ号码输入有误，请重新输入', 'regWarning', 1, $(this));
				setAddrCheck[4] = 0;
			} else {
				hideTuanHintInfo('regWarning');
				setAddrCheck[4] = 1;
				$(this).next().html('');
			}
		});
		$msn_num.on('blur', function() {
			if (!regCheck(/^[\s\S]{0,32}$/g, $(this).val()) && $(this).val() != '') {
				showTuanHintInfo(215, 380, 'MSN号码输入有误，请重新输入', 'regWarning', 1, $(this));
				setAddrCheck[5] = 0;
			} else {
				hideTuanHintInfo('regWarning');
				setAddrCheck[5] = 1;
				$(this).next().html('');
			}
		});
		$zip_code.on('blur', function() {
			if (!regCheck(/^\d{6}(?!\d)$/g, $(this).val())) {
				showTuanHintInfo(90, 380, '邮政编码格式输入有误，请重新输入', 'regWarning', 1, $(this));
				setAddrCheck[2] = 0;
			} else {
				hideTuanHintInfo('regWarning');
				setAddrCheck[2] = 1;
				$(this).next().html('');
			}
		});
		$t_name.on('blur', function() {
			if (!regCheck(/^[(\u4e00-\u9fa5)a-zA-Z0-9\_]{1,20}$/g, $(this).val())) {
				showTuanHintInfo(5, 380, '姓名长度不符合规定，请重新输入', 'regWarning', 1, $(this));
				setAddrCheck[0] = 0;
			} else {
				hideTuanHintInfo('regWarning');
				setAddrCheck[0] = 1;
				$(this).next().html('');
			}
		});
		$('#setaddr').on('submit', function() {
			var data = {
					realname: settings_box.find('#t_name').val(),
					shipping_address: $add_mark.val(),
					post_code: settings_box.find('#zip_code').val(),
					mobile: $tel_phone.val(),
					qq: settings_box.find('#qq_num').val(),
					msn: settings_box.find('#msn_num').val()
				},
				url = '/settings/set/saveAddr',
				callback = function(msg) {
					if (msg.info == true) {
						settings_box.find('.setting_success').html('修改成功').css('color', '#0f3').show();
					} else {
						settings_box.find('.setting_success').html('修改失败').css('color', '#f69').show();
					}
				};
			if (checkAddr()) {
				$.get(url, data, callback, 'json');
			}
		});
	};
	/**
	 * 个人信息页事件初始化
	 * @author yaoyao
	 */
	var setPersonal = function() {
		var province = settings_box.find('#provinceid');
		onChangeProvince();
		$true_name.on('focus', function() {
			msgHidden($(this));
			msgShow($(this), '请填写您的真实姓名');
		}).on('blur', function() {
			msgHidden($(this));
			if (!regCheck(/^[(\u4e00-\u9fa5)a-zA-Z0-9\_]{1,20}$/g, $(this).val())) {
				if ($(this).val() == '') {
					setPersonalCheck[0] = 1;
				} else {
					msgShow($(this), '请填写您的真实姓名');
					setPersonalCheck[0] = 0;
				}
			} else {
				setPersonalCheck[0] = 1;
			}
		});
		$nickname.on('focus', function() {
			msgHidden($(this), 1);
			if ($(this).val() == '') {
				msgShow($(this), '请填写您的昵称');
			} else {
				msgShow($(this), '请更改您的昵称');
			}
		}).on('blur', function() {
			msgHidden($(this));
			if (emptyCheck($(this), '请填写您的昵称')) {
				if (Meilishuo.config.user_nickname != $(this).val()) {
					checkNickName();
				} else {
					setPersonalCheck[1] = 1;
				}
			}
		});
		$beauty.on('focus', function() {
			msgHidden($(this), 1);
		}).on('blur', function() {
			msgHidden($(this));
			if ($(this).val().length >= 40) {
				msgShow($(this), '您填写的超过了40字');
				setPersonalCheck[2] = 0;
			} else {
				checkAbout($(this));
			}
		});
		$province.on('change', function() {
			onChangeProvince();
		});
		settings_box.find('#setPersonForm').on('submit', function() {
			var data = {
					'realname': $true_name.val(),
					'nickname': $nickname.val(),
					'gender': settings_box.find('.passChange input:checked').val(),
					'birthday': settings_box.find('#birthday').val(),
					'province_id': settings_box.find('#provinceid').val(),
					'city_id': settings_box.find('#provinceid').next().val(),
					'school': settings_box.find('#school_id').val(),
					'workplace': settings_box.find('#work_place').val(),
					'industry': settings_box.find('#occupation').val(),
					'hobby': settings_box.find('#hobby').val(),
					'weibo_url': settings_box.find('#weibo_add').val(),
					'about_me': settings_box.find('#beauty').val()
				},
				url = '/settings/set/savePersonal',
				callback = function(msg) {
					if (msg.info == true) {
						settings_box.find('.setting_success').html('修改成功').css('color', '#0c3').show();
					} else {
						settings_box.find('.setting_success').html('修改失败').css('color', '#f69').show();
					}
				};
			if (checkPersonal()) {
				$.get(url, data, callback, 'json');
			} else {
				settings_box.find('.setting_success').html('修改失败').css('color', '#f69').show();
			}
		});
	};
	/**
	 * 收货信息提示信息展示
	 * @author yaoyao
	 * @param  {Num} _top  提示信息top值
	 * @param  {Num} _left 提示信息left值
	 * @param {String} msg 提示信息内容
	 * @param {String} _dom 提示信息浮层id
	 * @return {Void}
	 */
	var showTuanHintInfo = function(_top, _left, msg, _dom, _index, $this) {
			var _this = settings_box.find('#' + _dom);
			if (_index) {
				$this.next().html(msg);
			} else {
				_this.css('left', _left).css('top', _top).show();
				_this.find('p').html(msg);
			}
		}
		/**
		 * 收货信息提示信息隐藏
		 * @author yaoyao
		 * @param {String} dom 隐藏的dom节点
		 * @return {Void}
		 */
	var hideTuanHintInfo = function(dom) {
		settings_box.find('#' + dom).hide();
	}
	var setPassword = function() {
		//表单操作
		formValidate(function() {
			setPass('#new_password', '#confirm_password');
			// checkPwd('#new_password','#confirm_password');

		});

		$('#new_password').on('input propertychange', function() {
			checkPwd(this.value);
		})
	};
	/**
	 * 省市级联响应事件
	 * @author yaoyao
	 * @return {Void}
	 */
	var onChangeProvince = function() {
		var data = {},
			url = '/settings/set/findCity';
		data.province_id = $('#provinceid').val();
		if (data.province_id != 0) {
			$.get(url, data, function(msg) {
				var newCityArray = '',
					_this = $('#provinceid');
				for (var i = 0; i < msg.length - 1; i++) {
					newCityArray += '<option value="' + msg[i].city_id + '">' + msg[i].city_name + '</option>';
					if (true) {
						newCityArray += ' selected="selected" '
					};
				};
				for (i in msg) {
					if (i != 'current_city') {
						newCityArray += '<option ';
						if (msg[i].city_id == msg.current_city) {
							newCityArray += ' selected="selected" '
						};
						newCityArray += 'value="' + msg[i].city_id + '">' + msg[i].city_name + '</option>'
					}
				}
				_this.parent().find('select:eq(1)').html(newCityArray);
			}, 'json');
		} else {
			$('#provinceid').parent().find('select:eq(1)').html('<option value="0">所在城市</option>');
		}
	};
	/**
	 * 信息提示
	 * @author yaoyao
	 * @param {Object} _this 当前激活事件对象
	 * @param  {String} val 提示字符串内容
	 * @return {Void}
	 */
	var msgShow = function(_this, val) {
			_this.next().html(val).show();
		}
		/**
		 * 隐藏信息提示
		 * @author yaoyao
		 * @param {Object} _this 当前激活事件对象
		 * @param {Num} _index 是否需要隐藏图片层,等于2时显示回调结果
		 * @return {Void}
		 */
	var msgHidden = function(_this, _index, msg) {
			var warnningnickname = settings_box.find('#setting_box_warnningnickname');
			_this.next().hide();
			warnningnickname.hide();
			if (_index) {
				_this.next().next().hide();
			}
			if (_index == 2) {
				warnningnickname.find('p').html(msg);
				warnningnickname.show();
			}
		}
		/**
		 * 空校验
		 * @author yaoyao
		 * @param {Object} _this 当前激活事件对象
		 * @return {[Boolen} 是否为空，false为空
		 */
	var emptyCheck = function(_this, _str) {
		if (_this.val() != '') {
			return true;
		} else {
			msgShow(_this, _str);
			return false;
		}
	};
	/**
	 * 正则匹配校验
	 * @param  {RegExp} reg 正则规则
	 * @param  {String} str 需要验证的字符串
	 * @return {Boolean}     验证结果
	 */
	var regCheck = function(reg, str) {
		return str.match(reg) ? true : false;
	};
	/**
	 * 检测昵称能否使用
	 * @author yaoyao
	 * @return {Void}
	 */
	var checkNickName = function() {
		var data = {};
		data.type = 'nickname';
		data.data = settings_box.find('#nickname').val();
		$.get('/settings/set/personalValidate', data, function(msg) {
			if (msg == 0) {
				var _this = settings_box.find('#nickname');
				msgHidden(_this);
				_this.next().next().show().removeClass('visit_red').addClass('visit_green');
				setPersonalCheck[1] = 1;
			} else if (msg == -1) {
				msgHidden(settings_box.find('#nickname'), 2, '已经有人用了，换一个吧');
				setPersonalCheck[1] = 0;
			} else if (msg == -2) {
				msgHidden(settings_box.find('#nickname'), 2, '昵称只支持中英文、数字、下划线、限长10个汉字');
				setPersonalCheck[1] = 0;
			} else if (msg == -3) {
				msgHidden(settings_box.find('#nickname'), 2, '昵称中带有屏蔽词');
				setPersonalCheck[1] = 0;
			} else if (msg == -4) {
				msgHidden(settings_box.find('#nickname'), 2, '昵称中不得超过8个数字');
				setPersonalCheck[1] = 0;
			} else if (msg == -6) {
				msgHidden(settings_box.find('#nickname'), 2, '昵称为空');
				setPersonalCheck[1] = 0;
			};
		}, 'json');
	};
	/**
	 * 检测美丽宣言能否使用
	 * @author yaoyao
	 * @return {Void}
	 */
	var checkAbout = function(this_t) {
		var data = {},
			$This = this_t;
		data.type = 'about_me';
		data.data = settings_box.find('#beauty').val();
		$.get('/settings/set/personalValidate', data, function(msg) {
			if (msg == 0) {
				var _this = settings_box.find('#beauty');
				msgHidden(_this);
				_this.next().next().show().removeClass('visit_red').addClass('visit_green');
				setPersonalCheck[2] = 1;
			} else if (msg == -5) {
				msgShow($This, '该网站暂不支持添加，如有问题，请<br><a href="http://www.meilishuo.com/help/feedback" target="_blank" class="red_f">联系我们</a>');
				setPersonalCheck[2] = 0;
			} else if (msg == -7) {
				msgShow($This, '您发布的内容涉及违规内容，请修改后再发布，如有问题，请联系我们。<br><a href="http://www.meilishuo.com/help/feedback" target="_blank" class="red_f">问题反馈</a>');
				setPersonalCheck[2] = 0;
			} else if (msg == -5) {
				msgShow($This, '美丽宣言不得超过40个字，请修改后再发布。');
				setPersonalCheck[2] = 0;
			}
		}, 'json');
	};
	/**
	 * 收货信息校验函数
	 * @author yaoyao
	 * @return {[Boolen} 校验是否成功
	 */
	var checkAddr = function() {
		for (var i = 0; i < setAddrCheck.length; i++) {
			if (!setAddrCheck[i]) {
				settings_box.find('#setaddr p input:eq(' + i + ')').blur();
			}
		}
		if (!setAddrCheck.toString().match(/0/)) {
			return true;
		}
		return false;
	};
	/**
	 * 个人信息校验函数
	 * @author yaoyao
	 * @return {[Boolen} 校验是否成功
	 */
	var checkPersonal = function() {
		var $setPersonal = $('#setPersonForm'),
			_input = $setPersonal.find('input'),
			_textarea = $setPersonal.find('textarea');
		_input.eq(1).blur();
		_input.eq(2).blur();
		_textarea.blur();
		if (!setPersonalCheck.toString().match(/0/)) {
			return true;
		}
		return false;
	};
	var setPass = function(new_pass, confirm_pass) {
		var url = '/settings/set/password';
		var data = {
			'new_password': $(new_pass).val(),
			'confirm_password': $(confirm_pass).val()
		};
		if (email[0]) data.email = email.val();
		if (old_pass[0]) data.old_password = old_pass.val();
		var info = {
			'0': '<span class="success">密码保存成功！</span>',
			'1': '空密码。',
			'2': '两次密码不相符。',
			'3': '邮箱格式错误。',
			'4': '邮箱已存在。',
			'5': '当前密码错误。',
			'6': '密码长度错误。',
			'7': '未知错误。',
			'8': '操作太频繁，请稍后再试。',
			'9': '登录密码不能与支付密码相同。'
		};
		var callback = function(r) {
			$info.html(info[r])
		}
		$.post(url, data, callback, 'json');
	};
	/**
	 * 设置邮箱函数
	 * @author qinayun
	 */
	var setEmail = function() {
		checkEmail(function() {
			getEmailOk();
		});
	};
	var getEmailOk = function() {
		var url = '/aj/setEmail/';
		var data = {
			'email': new_email.val()
		};
		var callback = function(res) {
			if (res.info) {
				window.location.href = '/settings/emailSend';
			} else {
				var callbackMsg = '';
				switch (res.error_code) {
					case -1:
						callbackMsg = '没有邮箱地址';
						break;
					case -2:
						callbackMsg = '邮箱格式有误';
						break;
					case -3:
						callbackMsg = '邮箱地址已经被占用';
						break;
					case -4:
						callbackMsg = '该邮箱处于封禁状态';
						break;
					default:
						callbackMsg = res.message;
				}
				$info.html(callbackMsg);
				new_email.val('').siblings('strong').removeClass();
				new_email.focus();
			}
		}
		ajax.aj(url, data, callback);
	};
	var checkEmail = function(submitfn) {
		if (new_email[0]) {
			var formName = 'setEmailForm',
				validateRules = {
					'email': {
						'req=电子邮箱': '你还没有填写电子邮箱哦。',
						'email': '电子邮箱格式有误，请重输！',
						'canEmail=yahoo': '由于雅虎邮箱即将下线，暂不支持yahoo邮箱注册，推荐使用QQ邮箱'
					}
				},
				showStyle = {
					'showmsgbyline=setPasswordErrorMessage': '',
					'showmsgforsubmit=confirm_submit': submitfn
				},
				opts = {
					'success': 'strong=good',
					'error': 'strong=bad',
					'isExist': {
						'email': function(cbk) {
							var url = '/user/reg/validate';
							var data = {
								rule: 'email',
								data: new_email.val()
							};
							var callback = function(res) {
								if (res == 1) cbk('邮箱已经存在。');
								else if (res == 3) cbk('邮箱格式错误。');
								else cbk('');
							};
							$.post(url, data, callback, 'json');
						}
					}
				};
			validate.validate(formName, validateRules, showStyle, opts);
		}
	};
	//表单操作
	var formValidate = function(cbk) {
		var formName = 'setPasswordForm',
			validateRules = {
				'new_password': {
					'minlen=6': '输入密码需在6位到32位间。',
					'maxlen=32': '输入密码需在6位到32位间。'
				},
				'confirm_password': {
					'compare=new_password': '两次密码输入不一致，请重新输入。',
					'minlen=6': '输入确认密码需在6位到32位间。'
				}
			},
			showStyle = {},
			opts = {};
		if (email[0]) {
			validateRules.email = {
				'minlen=1': '你还没有填写电子邮箱哦。',
				'email': '电子邮箱格式有误，请重输！',
				'canEmail=yahoo': '由于雅虎邮箱即将下线，暂不支持yahoo邮箱注册，推荐使用QQ邮箱'
			};
			showStyle = {
				'showmsgbyline=setPasswordErrorMessage': '',
				'showmsgforsubmit=ext_submit': cbk
			};
			opts = {
				'success': 'strong=good',
				'error': 'strong=bad',
				'isExist': {
					'email': function(cbk) {
						var url = '/user/reg/validate';
						var data = {
							rule: 'email',
							data: email.val()
						};
						var callback = function(res) {
							if (res == 1) cbk('邮箱已经存在。');
							else if (res == 3) cbk('邮箱格式错误。');
							else cbk('');
						};
						$.post(url, data, callback, 'json');
					}
				}
			}
		}
		if (old_pass[0]) {
			validateRules.old_password = {
				'minlen=1': '请输入密码。'
			};
			showStyle = {
				'showmsgbyone=ext_submit.setPasswordErrorMessageLine': cbk
			}
		}
		validate.validate(formName, validateRules, showStyle, opts);
	};

	/**
	 * 绑定手机号页初始化
	 * @author zhengke
	 */
	var bindMobile = function() {
		$send_code.bind('click', sendCode);
		$send_bind.bind('click', sendBind);
		
		$s_code.bind('click', sCode);
		$s_code2.bind('click',sCode2);
		$send_next.bind('click', sBind);

		$change_bind.bind('click',changeBind);

		$back.bind('click', function() {
			storage.setCookie('tip_close', new Date().getTime(), {
				'duration': 3 * 86400
			});
		});
	};
	/**
	 * 发送绑定
	 * @author liuxueqi
	 */
	
	
	var sBind = function() {		
		var $message = $(".bindErrorMessage"),
			$button = $(this),
			url = '/aj/sBind/',
			data = {
				'captcha': $.trim($code.val()),
				'smsType':'change_bind_mobile_captcha',
				'frm': 'bindok'
			},
			mobileRe = /^\d{11}$/,
			codeRe = /^[0-9]{6}$/,
			orgUrl = $('#org_url').val()

		mark_code = data.captcha;
		if (data.captcha == '') {
			$message.html("验证码为空").show();
			return;
		}
		if (!codeRe.test(data.captcha)) {
			$message.html("验证码填写有误，请重新输入").show();
			return;
		}

		$button.val("下一步....");

		var callback = function(r) {
			switch (r.code) {
				case 0:
					$message.html('').hide();
					$(".pro").next().removeClass("no-on").addClass('on');
					$("#protel").html("新手机号:");
					$s_code.hide();
					$s_code2.show();

					if($mobile){
						$mobile.removeAttr("disabled");
						$mobile.val("");
						$code.val("");
					}
					$send_next.hide();
					$change_bind.show();
					reback_timer = true;
					break;
				case -1:
					updateStatus(r);
					break;
				default:
					$message.html(r.message).show();
					alert(r.message)
					break;
			}
		}
		$.post(url, data, callback, 'json');
		var updateStatus = function(r) {
			setTimeout(function() {
				$button.val("立即绑定");
				$message.html(r.message).show();
			}, 2000);
		}
	};
	/**
	 * 发送验证码
	 * @author liuxueqi
	 */


	 var sCode2 = function(){
	 	var $message = $(".bindErrorMessage"),
			time = 60,
			_this = this,
			url = '/aj/sCode2/',
	 	data = {

				'mobile': $.trim($mobile.val()),
				'smsType':'change_bind_mobile_captcha',
				'frm': 'post_bind'
			}
	 	var callback = function(r) {
	 			if(r.code==0){
				    start();
					$message.html('').hide();
				}else{
					$message.html(r.message).show();
				}
		}

		$.get(url, data, callback, 'json');

		var start = function() {
			timeDown(time, function(times) {
				if (!times) {
					reback_timer = false;
					$(_this).removeAttr("disabled");
					$(_this).val("发送验证码");
				} else {
					$(_this).attr("disabled", "disabled");
					$(_this).val("重新发送 (" + times + "秒)");

				}
			});
		}


	 }


	var sCode = function() {

		var $message = $(".bindErrorMessage"),
			time = 60,
			_this = this,
			url = '/aj/sCode/',
			mobileVal=$mobile.val(),
			data = {
				'smsType':'change_bind_mobile_captcha',
				'frm': 'post_bind'
			}
		var callback = function(r) {
			if(r.code==0){
				start();
					$message.html('').hide();
				}else{
					$message.html(r.message).show();
				}
		/*	switch (r.code) {
				case 0:
					
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case -1:
					$message.html(r.message).show();
					break;
				case -6:
					$message.html(r.message).show();
					break;
				default:
					break;
			}*/
		}

		$.get(url, data, callback, 'json');

		var start = function() {
			timeDown(time, function(times) {
				if (!times) {
					reback_timer = false;
					$(_this).removeAttr("disabled");
					$(_this).val("发送验证码");
				} else {
					$(_this).attr("disabled", "disabled");
					$(_this).val("重新发送 (" + times + "秒)");

				}
			});
		}
	};

	/**
	 * 倒计时
	 * @author zhengke
	 */
	var timeDown = function(times, cbk) {
		win_timer = window.setTimeout(function() {
			if (!times) {
				return;
			} else if(reback_timer){
				cbk(0);
			}else {
				times--;
				cbk(times);
				timeDown(times, cbk);
			}
		}, 1000);
	};
	

	/*
		******换绑手机号   @liuxueqi
		*
	 */
	var changeBind = function(){
		var $message = $(".bindErrorMessage"),
			$button = $(this),
			url = '/aj/changeBind/',
			data = {
				'mobile': $.trim($mobile.val()),
				'captcha': $.trim($code.val()),
				'pre_captcha':mark_code,
				'smsType': 'change_bind_mobile_captcha'
			},
			mobileRe = /^\d{11}$/,
			codeRe = /^[0-9]{6}$/,
			orgUrl = $('#org_url').val()

		if (data.mobile == '') {
			$message.html("手机号为空").show();
			return;
		}
		if (data.captcha == '') {
			$message.html("验证码为空").show();
			return;
		}
		if (!mobileRe.test(data.mobile)) {
			$message.html("手机号格式有误，请填写正确的11位手机号").show();
			return;
		}
		if (!codeRe.test(data.captcha)) {
			$message.html("验证码填写有误，请重新输入").show();
			return;
		}

		$button.val("绑定中…");
		$button.attr("disabled", "disabled");
		var callback = function(r) {
				if(r.code==0){
				$message.html('').hide();
					$button.val("更换成功");
					$success.removeClass("no-on").addClass('on');
					setTimeout(function(){
						location.href = '/settings/bindMobile'
					}, 2000);
				}else{
					updateStatus(r);
					
				}

		}
		$.post(url, data, callback, 'json');


		var updateStatus = function(r) {
			setTimeout(function() {
				$button.removeAttr("disabled");
				$button.val("重新绑定");
				$message.html(r.message).show();
			}, 2000);
		}

	}


	/*=======================================*/

	/**
	 * 发送绑定请求
	 * @author zhengke
	 */
	var sendBind = function() {
		var $message = $(".bindErrorMessage"),
			$button = $(this),
			url = '/aj/sendBind/',
			data = {
				'mobile': $.trim($mobile.val()),
				'active_code': $.trim($code.val()),
				'frm': 'bindok'
			},
			mobileRe = /^\d{11}$/,
			codeRe = /^[0-9]{6}$/,
			orgUrl = $('#org_url').val()

		if (data.mobile == '') {
			$message.html("手机号为空").show();
			return;
		}
		if (data.active_code == '') {
			$message.html("验证码为空").show();
			return;
		}
		if (!mobileRe.test(data.mobile)) {
			$message.html("手机号格式有误，请填写正确的11位手机号").show();
			return;
		}
		if (!codeRe.test(data.active_code)) {
			$message.html("验证码填写有误，请重新输入").show();
			return;
		}

		$button.val("绑定中…");
		$button.attr("disabled", "disabled");

		var callback = function(r) {
			switch (r.code) {
				case 0:
					$message.html('').hide();
					$button.val("绑定成功");
					setTimeout("window.location.href='"+orgUrl+"?frm=bind_ready'",2000);
					
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case -1:
					updateStatus(r);
					break;
				default:
					break;
			}
		}
		$.post(url, data, callback, 'json');

		var updateStatus = function(r) {
			setTimeout(function() {
				$button.removeAttr("disabled");
				$button.val("立即绑定");
				$message.html(r.message).show();
			}, 2000);
		}
	};
	/**
	 * 发送验证码
	 * @author zhengke
	 */
	var sendCode = function() {
		var $message = $(".bindErrorMessage"),
			time = 60,
			_this = this,
			url = '/aj/sendCode/',
			data = {
				'mobile': $.trim($mobile.val()),
				'frm': 'post_bind'
			},
			mobileRe = /^\d{11}$/

		if (data.mobile == '') {
			$message.html("手机号为空").show();
			return;
		}
		if (!mobileRe.test(data.mobile)) {
			$message.html("手机号格式有误，请填写正确的11位手机号").show();
			return;
		}

		var callback = function(r) {
			switch (r.code) {
				case 0:
					start();
					$message.html('').hide();
					break;
				case 1:
				case 2:
				case 3:
				case 4:
				case 5:
				case -1:
					$message.html(r.message).show();
					break;
				default:
					break;
			}
		}

		$.post(url, data, callback, 'json');

		var start = function() {
			timeDown(time, function(times) {
				if (!times) {
					$(_this).removeAttr("disabled");
					$(_this).val("发送验证码");
				} else {
					$(_this).attr("disabled", "disabled");
					$(_this).val("重新发送 (" + times + "秒)");
				}
			});
		}
	};
	/*==================安全强度==============================*/
	function checkPwd(val) {
		if (!val) return;

		var l = val.length,
			s = 0;


		var $pwSafe = $('.pw_safe');

		/* 显示隐藏密码强度 */
		if (l < 6 || l > 32) {
			$pwSafe.hide();
			return;
		}

		$pwSafe.show();

		/* 计算密码强度 */
		if (l > 8) s += 2;
		else s += 1; /*位数*/
		if (val.match(/[a-z]/)) s += 1; /*小写字母*/
		if (val.match(/[A-Z]/)) s += 1; /*大写字母*/
		if (val.match(/[0-9]/)) s += 1; /*数字*/
		if (val.match(/[!,@#$%^&*?_~]/)) s += 1; /*特殊字符*/

		if (s >= 2 && s < 4) {
			$('.strength_l').addClass('pw_strength_color');
			$('.strength_m').removeClass('pw_strength_color');
		} else if (s >= 4 && s < 6) {
			$('.strength_m').addClass('pw_strength_color');
			$('.strength_h').removeClass('pw_strength_color');
		} else if (s == 6) {
			$('.strength_h').addClass('pw_strength_color');
		}
	}

	/*================================================*/

	//收货信息校验数组，全1为通过
	var setAddrCheck = [0, 0, 0, 0, 0, 0];
	//个人信息校验数组，全1为通过
	var setPersonalCheck = [0, 0, 1];
	exports.sync = sync;
	exports.set_addr = set_addr;
	exports.setPassword = setPassword;
	exports.setPersonal = setPersonal;
	exports.setAvatar = setAvatar;
	exports.setEmail = setEmail;
	exports.bindMobile = bindMobile;



 });
fml.use(['jquery', 'app/checkLogin', 'ui/alert', 'page/club/newTopic_ok', 'page/club/newTopic_ie','wap/component/shareTmp'], function(){
	var $ = this.jquery;
	var newTopic_ok = this.newTopic_ok;
	var newTopic_ie = this.newTopic_ie;


	var check = this.checkLogin;
	var alertT = this.alert;
	//调整容器为article_post
	var $article_con = $('.article_post');
	var page = 0;
	var	shareTmp = this.shareTmp;
	var alertTip = function(content) {
		new alertT({
			content: content,
			width: 420
		});
		$('.maga_suc').css('width', '420px');
	};
	
	// 固定上传的宝贝和图片总数
	window.canPostNum = 8;
	// 图片上传,newTopic_ok兼容ie6、7，newTopic_ie使用plupload插件
	var overMax_msg = '亲，晒单图片总数最多为8个 ：）'
	$('.add_pic').on('click' , function(){
		if (!check()) return false;
		if(canPostNum <= 0){ alertTip(overMax_msg);return false; }
	});
	var userAgent = window.navigator.userAgent.toLowerCase();
	var msie7 = $.browser.msie && /msie 7\.0/i.test(userAgent);
	var msie6 = !$.browser.msie8 && !$.browser.msie7 && $.browser.msie && /msie 6\.0/i.test(userAgent);
	var is_badie = msie7 || msie6;
	if(is_badie){
		this.newTopic_ok.tool();
	} else {
		this.newTopic_ie.tool();
	}



	/**
	 * 我的举报页面
	 */
	var viewDetails = $('.viewDetails')
		,details = $('.details')
		,closeIcon = $('.closeIcon')
		,detailsContain = $('.detailsContain')
		,remarkText = $('.remarkText')
		,reportSub = $('.reportSub')
		,reportId = $('.reportId')
		,detailInfo = $('.detailInfo')
		,idNum
	function showDetails(details){
		var status = details.css('display');
		if(status == 'none'){
			details.css('display','block');
			detailInfo.css('display','block')
		}else{
			details.css('display','none');
			detailInfo.css('display','none')

		}
	}
	viewDetails.on('click',function(event) {
		detailInfo.css('display','block');
		details.css('display','block');
		detailInfo.empty();
		details.css('border-radius','5px');
		idNum = $(this).data('id');
		var data ={
			'id':idNum
		};
		$.post('/aj/reportGoods/reply',data,function(res){
			if(res){
				$('.detailInfo').append(shareTmp('details',{'res':res}));	
				
				if(is_badie){
					newTopic_ok.tool();
				} else {
					newTopic_ie.tool();
				}
	
			}else{
				alert("麻烦您再点击一次吧~~")
			}
		},'json');
	});
	detailInfo.on('click','.closeIcon',function(event){
		showDetails(detailInfo);
	});
	detailInfo.on('click','.detailsContain',function(event){
		showDetails($('.detailsContain'));
		event.stopPropagation();
	})
	detailInfo.on('click', '.reportSub' ,function(event){
		var imgsrc = $('.item').find('img'),
			imgUrl = new Array(),
			pid = new Array(),
			desc = $('.remarkText').val();
			ignoreChoice = $('.ignoreChoice'),
		ignoreChoice.empty();
		for(var j= 0;j<imgsrc.length;j++){
			imgUrl[j] = imgsrc[j].src;//图片地址
			pid[j] = imgsrc[j].getAttribute('pid');//图片pid
		}
		var data = {
			'pid':pid,
			'desc':desc,
			'id':idNum
		}
		if(desc.length>500){
			ignoreChoice.css('display','block');
			ignoreChoice.append('备注说明字数上限为500字，您已超出限制，不能提交。');
		}else if( desc.length != 0){
			$.post('/aj/reportGoods/update',data,function(res){
				detailInfo.css('display','none');
			},'json');
		}else{
			ignoreChoice.css('display','block');
			ignoreChoice.append('备注说明不能为空哦。');
		}
	});
});
