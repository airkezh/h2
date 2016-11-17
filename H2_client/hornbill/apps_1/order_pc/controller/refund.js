function refund() {
	return this;
}

var controlFns = {
	index: function(params) {
		var refund_id = this.req.__get.refund_id;
		if (!refund_id) {
			return this.errorPage();
		};
		var php = {
			'refund': 'doota::/refund/refund_detail'
			,'company_list' : 'doota::/express/company_list'
		};

		this.setDefaultData(php);
		this.bridgeMuch(php);
		var mSelf = this;
		this.listenOver(function(data){
			if(!data.userInfo.user_id) return mSelf.redirectTo(data.DOMAIN.www+'/user/login' ,true);
			if (!data.refund) return mSelf.errorPage();
			data.refund_id = mSelf.req.__get.refund_id;
			data._CSSLinks = ['order_pc/refund/index'];
			data.topbanner = false;
			data.pageTitle = data.type=='goods' ? '退货详情 - 美丽说':'退款详情 - 美丽说';

			mSelf.render("refund/index.html", data);
		});
	},
	list: function() {
		var refund_status = this.req.__get.refund_status;
		var order_id = this.req.__get.order_id;
		var refund_id = this.req.__get.refund_id;
		var php = {
			'refund': 'doota::/refund/list_before_confirm',
			'status': 'doota::/refund/refund_status'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		var self = this;
		this.listenOver(function(data) {
			if (!data.refund) return self.errorPage();
			var page = self.req.__get.page || 0;
			data.groupPg = {};
			data.groupPg.total_num = data.refund.info.total_num;
			data.groupPg.page_size = 20;
			data.groupPg.current_page = page;
			data.refund_status = refund_status;
			data.order_id = order_id;
			data.refund_id = refund_id;
			data._CSSLinks = ['order_pc/refund/list'];
			data.pageTitle = '退款/退货 列表 - 美丽说';
			data.type = 'refund';
			data.topbanner = false;
			this.render("refund/list.html", data);
		});
	},
	service_list: function() {
		var refund_status = this.req.__get.refund_status;
		var order_id = this.req.__get.order_id;
		var refund_id = this.req.__get.refund_id;
		var php = {
			'refund': 'doota::/refund/list_after_confirm',
			'status': 'doota::/refund/refund_status'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		var self = this;
		this.listenOver(function(data) {
			if (!data.refund) return self.errorPage();
			var page = self.req.__get.page || 0;
			data.groupPg = {};
			data.groupPg.total_num = data.refund.info.total_num;
			data.groupPg.page_size = 20;
			data.groupPg.current_page = page;
			data.refund_status = refund_status;
			data.order_id = order_id;
			data.refund_id = refund_id;
			data._CSSLinks = ['order_pc/refund/service_list'];
			data.pageTitle = '售后列表 - 美丽说';
			data.is_service = true;
			data.topbanner = false;
			data.type = "service";
			this.render("refund/serviceList.html", data);
		});
	},
	add: function() {
		this.ajaxTo('doota::/refund/refund_apply');
	},
	success: function() {
		var order_id = this.req.__get.order_id;
		var php = {
			'refund': 'doota::/refund/refund_list'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);

		var mSelf = this;
		this.listenOver(function(data) {
			if (!data.userInfo.user_id) return mSelf.redirectTo(data.DOMAIN.www + '/user/login', true);
			data._CSSLinks = ['order_pc/refund/index'];
			data.pageTitle = '退款申请 - 美丽说';
			data.refundList = [
				'您要退货的订单编号为：' + order_id,
				'退款申请成功后，您将得到全额退款：' + data.refund.refund_fee
			];
			data.topbanner = false;
			this.render("refund/success.html", data);
		});
	},
	add_express: function() {
		this.ajaxTo('doota::/refund/refund_express');
	},
	compute: function() {
		this.ajaxTo('doota::/refund/refund_compute');
	},
	add_reason: function() {
		this.ajaxTo('doota::/refund/refund_apply');
	},
	service: function() {
		var php = {
			'refund': 'doota::/refund/refund_init'
		};

		var self = this;
		var order_id = this.req.__get.order_id;
		var mid = this.req.__get.mid;
		var refund_id = this.req.__get.refund_id;
		if (!order_id || !mid) {
			return this.errorPage();
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);

		this.listenOver(function(data) {
			if (!data.userInfo.user_id) {
				return self.redirectTo('/user/login', true)
			};
			if (!data.refund) return this.errorPage();
			data.order_id = order_id;
			data.mid = mid;
			data.refund_id = refund_id;
			data.refund_info = data.refund.info;

			if (data.refund.info.send_goods) {
				data.pageTitle = '退款/退货申请 - 美丽说';
				data._CSSLinks = ['order_pc/refund/serviceGoods'];
				return this.render("refund/serviceGoods.html", data);
			} else {
				data._CSSLinks = ['order_pc/refund/serviceApply'];
				data.pageTitle = '退款申请 - 美丽说';
				this.render("refund/serviceApply.html", data);
			}
		});
	},
	type_select: function() {
		var php = {
			"refund": "doota::/refund/refund_init"
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			if (!data.userInfo.user_id) {
				return this.redirectTo(data.DOMAIN.www + '/user/login', true)
			};
			if (!data.refund) return this.errorPage();
			data._CSSLinks = ['order_pc/refund/serviceSelect'];
			data.pageTitle = '退款类型选择 - 美丽说';
			this.render("refund/type_select.html", data);
		});
	}
};

exports.__create = controller.__create(refund, controlFns);