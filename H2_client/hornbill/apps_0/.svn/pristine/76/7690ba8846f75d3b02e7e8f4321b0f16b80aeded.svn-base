function book(){
	return this;
}
var controlFns = {
	'index' : function(catalogid){
		this.new_show(catalogid);
	},
	'new_show' : function(catalogid) {
		var php = {
			'poster0' : '/dict/Show_dict_m/' + catalogid
			, 'bdZhiShu' : '/dict/OptimizeBaidu'
			, 'down_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_download_set&$'
		};

		var mSelf = this;

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){

			data.bookid = catalogid;
			var poster0 = data.poster0;
			var keywords = poster0.wordname;

			data.pageTitle = keywords + '【多图】-' + keywords + '新款女装价格，品牌服饰购买及搭配图片-美丽说';
			data.keywords = keywords+'，'+keywords + '新款,'+keywords + '女装,'+keywords + '搭配,'+ '图片,'+ keywords + '购买,'+keywords + '淘宝,'+keywords+'价格';
			data.meta_description = keywords+'是当前流行的服饰搭配元素，想要把'+keywords + '元素搭得美丽，来美丽说购买让千万时尚MM心水的当季最流行的'+keywords+'单品、看'+keywords+'最佳搭配、购买评价、购物晒单';

			data.search_words = keywords;

			data.page_tag = 'book';
			data.use_rem_screen = '640_mate';
			data._CSSLinks = ['new_book'];
			mSelf.render('new_book.html', data);
		});
	}
};

exports.__create = controller.__create(book , controlFns);
