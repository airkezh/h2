function act_goodsdetail(){
	return this;	
}
var controlFns = {
	detail : function(){
		var mSelf = this;	
		var goods_id = this.readData('goods_id' , this.req.__get , '');
		var php = {
			'act_goodsdetail' : '/wapactivity/Activity_goods_detail?goods_id='+goods_id

		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.render("act_goodsdetail.html" , data);
		});
	}
};
exports.__create = controller.__create(act_goodsdetail , controlFns); 
