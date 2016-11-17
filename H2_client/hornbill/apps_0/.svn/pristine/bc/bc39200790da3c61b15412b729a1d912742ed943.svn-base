function prom(){
	return this;
}
var controlFns = {
	'item' : function(tid){
		var mSelf = this,
			page = this.readData('page',this.req.__get, 0);
		this.req.__get.twitter_id = tid*1||0; // 2415868341
		var php  = {
			'goods_info_cosmetic' : '/share/share_cosmetic'
			,'may_like' : '/share/other_items?mz=1'
			,'service' : '/share/service_guarantee'
			,'brower' : '/share/brower_behavior'
			,'format' : '/share/goods_specifications'
			,'fame_count' : '/goods/koubei_count?tid='+tid

			,'goods_info' : '/share/share_main'
			,'details' : '/share/goods_details'
			
			,'shop_dis' : '/goods/comment_list?tid='+tid+'&filter=1&$'
			,'shop_dis_all' : '/goods/comment_list?tid='+tid+'&filter=0&$'
			,'shop_deal' : '/goods/sale_record_list?tid=' + tid
			,'shop_com' : '/shop/shop_points?tid='+tid
			,'shopping_show' : '/club/goods_show_list?tid='+tid

			,'koubei_list' : '/goods/koubei_list?tid='+tid
		}
		this.setDefaultData(php);
		this.bridgeMuch(php);
		this.listenOver(function(data){
			if (!data.goods_info_cosmetic.is_cosmetic) return this.errorPage()
			if (data.goods_info_cosmetic.is_jump) {
				this.req.__get.d_r = data.goods_info_cosmetic.d_r
				return this.redirectTo(data.goods_info_cosmetic.twitter_source_tid ,true)
				}
			var prop = data.goods_info_cosmetic.prop
			if (prop) data.goods_info_cosmetic.prop = {
				'size': prop[1]
				,'color':  prop[0]
			}

            /**
             * @TODO
             * prom 页实际上不需要调用 goods_info 接口
             * 临时 hack 一下，prom 页不需要出现买手推荐
             * @modified by sunzhidong
             */
            if(data.goods_info.goods_comment) {
                data.goods_info.goods_comment = null;
            }
			prop = null
			data.share_info = {};
			data.share_info.comment = '美丽说是爱美丽们的时尚聚集地，无论你是哪种女孩儿，无论你有什么小癖好，在美丽说，你都能正确归队。和你的喜好尽情的拥抱吧，和姐妹们痛快的分享吧~';
			data.share_info.promo = '>>分享自美丽说特卖\"' + data.goods_info_cosmetic.promo + '\"';
			data.share_info.desc = '我在美丽说上看到了\"'+ data.goods_info_cosmetic.goods_title + data.goods_info_cosmetic.price +'元\"，更多流行单品正在热卖，快来抢吧！'; 
			data.share_info.descQQ = '我在美丽说上看到了\"'+ data.goods_info_cosmetic.goods_title + data.goods_info_cosmetic.price +'元\"，更多流行单品正在热卖，快来抢吧！'; 
			data.share_info.text = '我在美丽说上看到了\"'+ data.goods_info_cosmetic.goods_title + data.goods_info_cosmetic.price +'元\"，更多流行单品正在热卖，快来抢吧！';

			//data._serviceqq = data.goods_info_cosmetic.qq;
			// data.goods_info_cosmetic.im.tid =  tid
			data._serviceIM = data.goods_info_cosmetic.im

			data._shopid = data.goods_info_cosmetic.shop_id;

			//base.var_dump(data.goods_info.prop, false , 5);
			//base.var_dump(data.goods_info, false , 5);
			if(data.koubei_list && data.koubei_list.pages && data.shop_dis_all.levelsNum){
				var koubei_num = data.koubei_list.pages.totalNum > 5 ? 5 : data.koubei_list.pages.totalNum
				data.shop_dis_all.levelsNum[0] += koubei_num;
				data.goods_info.comment.totalUser += koubei_num;
			}

			data.isSale = true;
			data.SaleChannel = true;
			data.isTopcart = true;
			data._CSSLinks = ['doota/beauty'];
			data.winTitle = data.goods_info.goods_title
			data.pageTitle = data.winTitle +' - 美丽说';
			if (data.format && data.format.length){
				data.meta_description = data.format.join(' ').replace(/,/g,':') 
			}
			data.secondNavHold = true
			mSelf.render('doota/beauty.html' , data);
		});

	}

}
exports.__create = controller.__create(prom , controlFns);
