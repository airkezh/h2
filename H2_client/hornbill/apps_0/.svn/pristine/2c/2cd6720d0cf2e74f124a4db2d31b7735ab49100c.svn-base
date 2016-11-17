fml.define('order_pc/common/address', ['jquery', 'order_pc/common/validate', 'component/shareTmp', 'ui/dialog', 'ui/confirm', 'ui/alert'], function(require, exports) {
	var $ = require('jquery');
	var validate = require('order_pc/common/validate');
	var shareTmp = require('component/shareTmp');
	var dialog = require('ui/dialog');
	var confirm = require('ui/confirm');
	var alert = require('ui/alert');

	/**
	 * 对外开放的对象 用法  new address()....
	 * @param  {Function} cb           [表单提交后的回调]
	 * @param  {[type]}   h            [ajax请求的host]
	 * @param  {[type]}   setDefaultCb [没什么用]
	 * @param  {[type]}   events       [初始化时要绑定的事件，默认是都绑定的]
	 * @return {[type]}                [formVa:一般是表单要不要resetForm]
	 * @reference	order_pc/address/index.js
	 */
	var Address = function(cb, h, setDefaultCb, events, frm) {

		//他是个单例,只要new了这个对象，默认会执行initDefault方法。
		if (Address.__unique !== undefined) {
			return Address.__unique;
		}

		this.initDefault(h, setDefaultCb, frm);

		//如果第一个参数是delay，则不直接init,要手动去调init
		if (typeof cb === 'string' && cb === 'delay') {
			return this;
		}

		this.initBusiness(cb, h, setDefaultCb, events, frm);

		Address.__unique = this;
	}

	/**
	 * new 完对象后就要执行的方法
	 */
	Address.prototype.initDefault = function(h, setDefaultCb, frm) {
		this.frm = frm || 'my_address';
		this.host = h || '/aj/doota';
		this.deleteFn();
		this.setDefault(setDefaultCb);
	}

	Address.prototype.initBusiness = function(cb, h, setDefaultCb, events) {
		this.formName = 'addressForm';
		this.form = $('#' + this.formName);
		this.f_nickname = this.form.find('[name=nickname]');
		this.f_phone = this.form.find('[name=phone]');
		this.f_pid = this.form.find('[name=pid]');
		this.f_cid = this.form.find('[name=cid]');
		this.f_did = this.form.find('[name=did]');
		this.f_sid = this.form.find('[name=sid]');
		this.f_street = this.form.find('[name=street]');
		this.f_postcode = this.form.find('[name=postcode]');
		this.f_is_default = this.form.find('[name=is_default]');
		this.cid = null;
		this.did = null;
		this.sid = null;
		this.list;
		this.is_default;
		this.needStreet = $('#need-street');
		this.formVa;

		events = events || {
			editFn: true,
			updateFn: true
		}

		if (events.editFn) {
			this.editFn();
		}
		if (events.updateFn) {
			this.updateFn();
		}
		this.formFn(cb);
		this.selectFn();

	}

	Address.prototype.formFn = function(cb) {
		var me = this;
		cb = cb || function() {
			window.location.reload();
		}
		//表单提交
		var submitAddress = function() {
			/////////////////////////如果收货地址超过10条，弹框提示
			var data = {
				name: me.f_nickname.val(),
				phone: me.f_phone.val(),
				pid: me.f_pid.val(),
				cid: me.f_cid.val(),
				did: me.f_did.val(),
				sid: me.f_sid.val(),
				street: me.f_street.val(),
				postcode: me.f_postcode.val(),
				type: 'add',
				set_default: me.f_is_default.attr('checked') ? 1 : 0,
				pname: $('[name=pid] option:selected').html(),
				dname: $('[name=did] option:selected').html(),
				cname: $('[name=cid] option:selected').html(),
				sname: $('[name=sid] option:selected').html()
			},
				addr_id = me.f_is_default.val();
			if (addr_id) {
				data.addr_id = addr_id;
				data.type = 'edit';
				me.formpost(me.host, data);
			} else {
				if ($('.address_list').find('tbody tr').length < 10) {
					me.formpost(me.host, data);
				} else {
					var html = shareTmp('Address_add_warnwin');
					var close = new dialog({
						title: '提示',
						width: 409,
						content: html
					});
					$('.savebtn').click(function() {
						me.formpost(me.host, data);
					});

					$('.cancelbtn').click(function() {
						close.destory();
					})
				}

			}
		};
		var createSense = function(data) {
			var me = this;
			var data = $.extend({
				address_id: '',
				type: 'add',
				frm: 'my_address',
				is_4: 1
			}, data);
			var base_url = 'http://sense.meilishuo.com/cr/address_add';
			new Image().src = base_url + '?address_id=' + data.address_id + '&type=' + data.type + '&frm=' + data.frm + '&is_4=' + data.is_4;
		};
		Address.prototype.formpost = function(host, data) {
			var me = this;
			$.post(host + '/address_add', data, function(res) {
				if (res.code == '0') {
					createSense({
						address_id: res.addr_id,
						type: data.type,
						frm: me.frm,
						is_4: me.hasSid ? 1 : 0
					})
					cb(res.detail);
				} else {
					new alert({
						content: res.msg,
						width: 370
					});
				}
			}, 'json').error(function() {
				/* Act on the event */
			});

		}
		//表单操作
		var validateRules = {
			'nickname': {
				'req=收货人姓名': '你还没有填写收货人姓名哦。'
			},
			'phone': {
				'req=联系电话': '你还没有填写联系电话哦。',
				'contact': '联系电话格式不正确。'
			},
			'street': {
				'req=街道地址': '你还没有填写街道地址哦。'
			},
			'sid': {
				'req=街道': '请补充乡镇街道地址。'
			}
			//, 'postcode' : {'req=邮政编码' : '你还没有填写邮政编码哦。', 'postcode' : '邮政编码格式不正确。'}
		},
			showStyle = {
				'showmsgbyline=addressErrorMessage': '',
				'showmsgforsubmit=addressBtn': submitAddress
			},
			opts = {
				'success': 'strong=good',
				'error': 'strong=bad',
				'isExist': {
					'nickname': function(cbk) {
						var data = {
							type: 'name',
							data: me.f_nickname.val()
						};
						$.get(me.host + '/address_validate', data, function(res) {
							if (res.code != '0') cbk(res.msg);
							else cbk('');
						}, 'json');
					},
					'phone': function(cbk) {
						var data = {
							type: 'phone',
							data: me.f_phone.val()
						};
						$.get(me.host + '/address_validate', data, function(res) {
							if (res.code != '0') cbk(res.msg);
							else cbk('');
						}, 'json');
					},
					'sid': function(cbk) {
						var data = {
							data: me.f_sid.val()
						}

						if (me.hasSid && data.data == "0") {
							cbk('请补充乡镇街道地址。');
						} else {
							cbk('');
						}
					}
					/*
				'postcode' : function(cbk){
					var data = {
						type : 'postcode',
						data : f_postcode.val()
					};
					$.get(host+'/address_validate' , data , function(res){
						if(res.code != '0') cbk(res.msg);
						else cbk('');
					} ,'json');
				}
				*/
				}
			};
		me.formVa = validate.validate(me.formName, validateRules, showStyle, opts);
	}

	Address.prototype.setDefault = function(cb) {
		var me = this;
		$('.set_default').on('click', function() {
			var addr_id = $(this).parents('.adrl_list').attr('addr_id');
			$.post(me.host + '/address_default', {
				'addr_id': addr_id
			}, function(res) {
				if (res.code == '0') {
					if (cb) {
						cb(addr_id);
						return;
					}
					window.location.reload();
				} else {
					new alert({
						content: res.msg,
						width: 370
					});
				}
			}, 'json')
		})
	}

	Address.prototype.deleteFn = function() {
		var me = this;
		$('.adrl_delete').on('click', function() {
			var addr_id = $(this).parents('.adrl_list').attr('addr_id');
			var confirmPanel = new confirm({
				width: 380,
				content: '删除收货地址？',
				discover: true
			});
			confirmPanel.onSure(function() {
				$.post(me.host + '/address_delete', {
					addr_id: addr_id
				}, function(res) {
					if (res.code == 0) {
						var a = new alert({
							content: '删除成功！',
							width: 370
						});
						a.onSure(function() {
							window.location.reload();
						});
					}
				}, 'json')
			});
		})
	}

	//点击修改/更新时的业务
	Address.prototype.editBusiness = function($target) {
		var me = this;
		this.list = $target.parents('.adrl_list');
		this.cid = this.list.attr('cid');
		this.did = this.list.attr('did');
		this.sid = this.list.attr('sid');
		this.is_default = this.list.attr('is_default') | 0;

		this.f_nickname.val(this.list.find('.adrl_nickname').text());
		this.f_phone.val(this.list.find('.adrl_phone').text());
		this.f_street.val(this.list.attr('street'));
		this.f_postcode.val(this.list.find('.adrl_postcode').text());
		this.f_pid.val(this.list.attr('pid')).change();

		this.f_is_default.val(this.list.attr('addr_id'))
			.attr('checked', !! (this.is_default));

		//电话号码要清空
		this.f_phone.val('');
	}

	//点击修改时的业务
	Address.prototype.editFn = function() {
		var me = this;
		this.f_is_default.live('click', function(e) {
			if (me.f_is_default.val() && me.is_default) {
				e.preventDefault();
			}
		})
		$('.adrl_edit').live('click', function() {
			me.formVa.resetForm();
			me.editBusiness($(this));
			var formTop = me.form.offset().top;
			$(window).scrollTop(formTop - 30);
		})
	}

	//点击更新时的业务
	Address.prototype.updateFn = function() {
		var me = this;
		$('.adrl_update').live('click', function() {
			me.formVa.resetForm();
			me.editBusiness($(this));
			var formTop = me.form.offset().top;
			$(window).scrollTop(formTop - 30);
		})
	}

	//选择框业务
	Address.prototype.selectFn = function() {
		var me = this;
		me.f_pid.on('change', function() {

			$.get(me.host + '/address_select', {
				pid: me.f_pid.val()
			}, function(res) {
				if (me.f_pid.val() == '0') {
					me.f_cid.html(shareTmp('address_select'))
				} else {
					me.f_cid.html(shareTmp('address_select_city', res.data))
				}

				me.f_did.html(shareTmp('address_select'));
				me.f_sid.html(shareTmp('address_select'));

				if (res.data.district[0].did == '0') {
					me.f_did.hide();
				}

				if (me.cid) {
					me.f_cid.val(me.list.attr('cid')).change();
					me.cid = null
				}
			}, 'json');
		});
		me.f_cid.on('change', function() {

			$.get(me.host + '/address_select', {
				pid: me.f_pid.val(),
				cid: me.f_cid.val()
			}, function(res) {
				me.f_did.html(shareTmp('address_select'))

				if (res.data.district[0].did == '0'){
					me.f_did.hide();
					me.f_sid.hide();
				}
				else{
					me.f_did.append(shareTmp('address_select_district', res.data)).show();
					me.f_sid.show();	
				}

				if (me.did) {
					me.f_did.val(me.list.attr('did')).change();
					me.did = null
				}
			}, 'json');
		});
		me.f_did.on('change', function() {

			$.get(me.host + '/address_select', {
				pid: me.f_pid.val(),
				cid: me.f_cid.val(),
				did: me.f_did.val()
			}, function(res) {
				me.f_sid.html(shareTmp('address_select'))

				if (res.data.street && (res.data.street[0].sid == undefined || res.data.street[0].sid == '0')) {
					me.f_sid.hide();
					me.hasSid = false;
				} else {
					me.hasSid = true;
					me.f_sid.append(shareTmp('address_select_street', res.data)).show();
				}

				if(!me.hasSid){
					me.f_sid.focus().blur();
				}

				if (me.sid) {
					me.f_sid.val(me.list.attr('sid')).change()
					me.sid = null
				}

			}, 'json');
		})
	}

	return Address;
});