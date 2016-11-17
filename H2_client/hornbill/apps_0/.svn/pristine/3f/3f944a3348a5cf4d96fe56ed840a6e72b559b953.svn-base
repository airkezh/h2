function search(){
	return this;
}
var controlFns = {
	'index' : function(keyword){
		var keyword = keyword? keyword: this.readData('keyword')
		var mSelf = this;
		var tag_word = keyword;
		var php = {
			'attr_word' : '/navigate/navigate_right?type=text_pic-simplify'
			, 'poster0' : '/search/search_tag_poster?frame=0'
			, 'down_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_download_set&$'
		};
		if(tag_word){
			php['attr_intro'] = '/search/search_tag_header?tag_word=' + encodeURIComponent(tag_word);
		}

		this.req.__get.tag_word = keyword;

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = '640_mate';
			data.tag_word = tag_word;
			data.page_tag = 'search';

			data.pageTitle = '【多图】' + tag_word + ' - 2015新款' + tag_word + '，' + tag_word + '搭配，价格，折扣，款式 - 美丽说.higo冠名跑男3';
			data.keywords = tag_word + '，新款' + tag_word + '，' + tag_word + '搭配，' + tag_word + '价格，' + tag_word + '折扣，' + tag_word + '款式';
			data.meta_description = tag_word + '是当前流行的服饰搭配元素，想要把' + tag_word + '搭得美丽，来看美丽说.higo百万时尚网友精心挑选出的当季最流行的' + tag_word + '单品、最佳搭配、购买心得、折扣信息。';

			data._CSSLinks = ['guang/new'];
			mSelf.render('guang/new.html', data);
		});
	}
};

exports.__create = controller.__create(search , controlFns);
