function beauty(){
	return this;
}
var controlFns = {
	'index' : function(){
		var mSelf = this;
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var php = {
			'attr_word' : '/navigate/navigate_right?type=text_pic-simplify'
			, 'poster0' : '/cosmetic/catalog_poster?cata_id=8000000000000&frame=0&__get_r=1'
			// , 'down_info' : '/customactivity/CustomActivity_common_tool_single?id=wap_download_set&$?__get_r=1'
			, 'banner' : 'cosmetic::/cosmetic/Cosmetic_wap_top_banner?__get_r=1'
			, 'classify' : '/customactivity/CustomActivity_common_tool_single?id=beauty_classify&cid=16803'
			, 'spike' : 'cosmetic::/cosmetic/Cosmetic_wap_spike?__get_r=1'
			, 'brand' : 'cosmetic::/cosmetic/Cosmetic_wap_brand_tuan?__get_r=1'
		};

		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = '640_mate';
			data.page_tag = 'beauty';
			data.pageTitle = '美妆';
			data._CSSLinks = ['beauty/beauty'];
			mSelf.render('beauty/beauty.html', data);
		});
	},
	'brand' : function(keyword){
		var mSelf = this;
		var php = {
			'brand' : 'cosmetic::/cosmetic/Cosmetic_wap_brand?__get_r=1'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			data.XR = true;
			data.use_rem_screen = '640_mate';
			data.page_tag = 'beauty';
			data.pageTitle = '美妆品牌';
			data._CSSLinks = ['beauty/brand'];
			mSelf.render('beauty/brand.html', data);
		});
	},
	'effect' : function(keyword){
		// this.debugSnake({'target': 'maoanli.rdlab'});
		var mSelf = this;
		var php = {
			'effect' : '/cosmetic/Cosmetic_childnav?nid=561'
		};
		this.setMDefault(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			// data.XR = true;
			data.use_rem_screen = '640_mate';
			data.page_tag = 'beauty';
			data.pageTitle = '美妆分类';
			data._CSSLinks = ['beauty/effect'];
			mSelf.render('beauty/effect.html', data);
		});
	}

};

exports.__create = controller.__create(beauty , controlFns);
