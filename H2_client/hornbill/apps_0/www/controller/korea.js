function korea() {
	return this;
}
/**
 * 这个文件是从 /www/controller/guang.js 中的 attr 方法复制过来
 * 『40479』就是韩国馆下的商品
 * demingxu改版  2015-12-28
 */
var controlFns = {
	index: function(args) {
		args = (args in controlFns) ? args : 'new'
		this[args]()
	},
	old: function() {
		return this.redirectTo('/guang/new', true)
	},
	new: function() {
		// this.debugSnake({
		// 	'target': 'qinzhewu.rdlab'
		// });
		var page = this.readData('page', this.req.__get, 0) | 0;
		var php = {
			'poster0': '/Koreahall/Pc_Korea_list?page=0&frame=0&sort=0&cata=0',
			'banner': '/Koreahall/Pc_Korea_list_banner_info',
			'shop': '/customactivity/CustomActivity_common_tool_single?id=korea-shop-pc',
			'brand': '/customactivity/CustomActivity_common_tool_single?id=korea-brand-pc',
			'tag': '/customactivity/CustomActivity_common_tool_single?id=korea-tag-pc'
		};
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data) {
			//获取分页总数
			data.groupPg = {};
			data.groupPg.page_size = data.poster0 && data.poster0.page_size;
			data.groupPg.total_num = data.poster0 && data.poster0.totalNum;
			data.groupPg.current_page = page;
			data.groupPg.hash = '#postwallTitle';
			data.cata = this.req.__get.cata || 0;
			data.sort = this.req.__get.sort || 0;
			// data.sortKind = this.req.__get.sortKind || 0;
			data.pageTitle = '韩国馆';
			data._CSSLinks = ['korea/new'];
			this.render('korea/new.html', data);
		});
	},
};

exports.__create = controller.__create(korea, controlFns);