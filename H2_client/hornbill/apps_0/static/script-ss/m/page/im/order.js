/*common*/
fml.use(['m/component/append'] , function(){
	var data = {
		url : '/www/aj/recent_order'
		, data : {page:0, to:fml.vars.im.toid, limit:2, fields:'address'} 
		, frame : 'page'
		, box : ".order"
		, filter : function(res){
			return res.data.datas
		}
		, tmp : 'im_order_item'
	}
	this.append.init(data);
	this.append.append(data);
	this.append.scroll(data);
});
