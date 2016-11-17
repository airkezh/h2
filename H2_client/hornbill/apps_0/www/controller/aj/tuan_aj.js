function tuan_aj() {
    return this;
}

var controlFns = {
    tuan : function(params){
    	var php = {
			'rushlist' : 'groupon::/miaosha/Miaosha_Pc_Activity_goods_list'
		}
		this.ajaxTo(php[params]);
    },
    clearance : function(params){
    	var php = {
			'list' : 'groupon::/qingcang/Qingcang_Pc'
		}
		this.ajaxTo(php[params]);
    }
}
exports.__create = controller.__create(tuan_aj, controlFns);