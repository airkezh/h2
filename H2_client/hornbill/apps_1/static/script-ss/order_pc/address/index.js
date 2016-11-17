fml.define('order_pc/address/index', ['order_pc/common/address', 'jquery', 'ui/dialog'], function(require) {
	var $ = require('jquery'),
		address = require('order_pc/common/address'),
		dialog = require('ui/dialog');

	var $new = $('#btn-new'), //触发新增地址的按钮
		$edit = $('.adrl_edit'), //触发修改的按钮
		$update = $('.adrl_update'), //触发更新的按钮
		addressWrap = new address('delay', '', function() {
			window.location.reload();
		}, '', 'my_address');

	var business = {
		openDialog: function(config) {
			var config = $.extend({
				title: '新增地址',
				html: $('#address_content').html(),
				edit: false
			}, config);
			var close = new dialog({
				title: config.title,
				width: 620,
				content: config.html
			});

			var $cancel = $('.cancelBtn');

			var dialogEvents = function() {
				$cancel.on('click', function() {
					close.destory();
				})
			};

			dialogEvents();

			//将校验搬过来
			addressWrap.initBusiness(function() {
				close.destory();
				window.location.reload();
			}, '', $.noop, {
				deleteFn: true,
				updateFn: false,
				editFn: false
			});

			if (config.edit) {
				addressWrap.editBusiness(config.target);
			} else {
				addressWrap.formVa.resetForm();
			}
		}
	}

	var addEvents = function() {
		$new.on('click', function() {
			business.openDialog();
		})
		$update.on('click', function() {
			business.openDialog({
				edit: true,
				title: '更新地址',
				target: $(this)
			});
		})
		$edit.on('click', function() {
			business.openDialog({
				edit: true,
				title: '修改地址',
				target: $(this)
			});
		})
	}

	addEvents();
});