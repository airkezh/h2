function wbapp(){
	return this;	
}
var controlFns = {
	'index' : function(args){
		if(args == 'haibao') this.haibao();
	},
	'haibao' : function(args){
		var php = {
			haibaopk : '/famous/famous_act_list'	
		};
		var mSelf = this;
		if(args == 'pk'){
			var limit = mSelf.readData('limit',this.req.__get, 0);
			var page = mSelf.readData('page',this.req.__get, 0)|0;

			mSelf.setDefaultData(php);
			mSelf.bridgeMuch(php);
			mSelf.listenOver(function(data){
				data._CSSLinks = ['app/haibaopk'];
				data.pageTitle = '美丽说 达人签约季';
				data.haibaopk.isend = true;

				if(limit == 0)
					data.headTag = 'haibaopk_index';
				if(limit == 1){
					data.headTag = 'haibaopk_detail';
					data.groupPg = {}; 
					data.groupPg.total_num = data.haibaopk.totalNum;
					data.groupPg.current_page = page; 
					data.groupPg.page_size = 25;
				}
	//			base.var_dump(data , false , 5);

				mSelf.render('app/haibaopk/contract.html' , data);
			});
		}else if(args == 'vote'){
			this.ajaxTo('/famous/vote_famous_activity');	
		}
	}
}
exports.__create = controller.__create(wbapp , controlFns);
