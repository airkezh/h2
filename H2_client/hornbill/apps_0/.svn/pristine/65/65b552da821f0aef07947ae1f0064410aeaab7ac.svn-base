function comment(){
	return this;	
}
/* 个人中心 */
var wapMod = base.loadModel('wap/tools.js');
var controlFns = {
	comment : function (){
		var interfaces = {
			orderDetail : 'doota::/order/detail'    //@require order_id
		}

		this.setMDefault(interfaces)
		this.bridgeMuch(interfaces)
		this.listenOver(function (data){
			wapMod.connectWX(this, data)
			data.use_rem_screen = true;
			data.useRemToFitWindowSize = true
			data.pageTitle = '商品评价'
			data._CSSLinks = ['wx_new/comment']
			this.render('wx_new/comment.html', data)
		})
	}
};
exports.__create = controller.__create(comment , controlFns);
