function ps(){
	return this;	
}
var controlFns = {
	'lati' : function(){
		if (!this.readData('mlssign', this.req.__post,'') ){
			return this.errorPage()
			}
		this.ajaxTo('/goods/lati_record')
		},
	'group' : function(tid){
		this.req.__get.tid = tid;
		var php = {
			'group_shopping' : '/goods/share_group_shopping'
		}
		var callback = this.req.__get.callback;
		var mSelf = this;
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.res.end(callback + '('+ JSON.stringify(data.group_shopping) +')');
		});	
	},
	'like' : function(tid){
		this.req.__get.tid = tid;
		var php = {
			'like_shopping' : '/goods/share_shopping'
		}
		var callback = this.req.__get.callback;
		var mSelf = this;
		this.bridgeMuch(php);
		this.listenOver(function(data){
			mSelf.res.end(callback + '('+ JSON.stringify(data.like_shopping) +')');
		});	
	}
};
exports.__create = controller.__create(ps , controlFns);


