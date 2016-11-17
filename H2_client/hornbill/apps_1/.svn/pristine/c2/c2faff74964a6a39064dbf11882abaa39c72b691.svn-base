
	fml.use(['m/app/posterWall', 'm/app/posterPa', 'm/component/lazyLoad'] , function(){
		var poster = this.posterPa
			, lazyLoad = this.lazyLoad

		poster.set({colNum:2});
		var data = {
			url : '/aj/wx/normal_goods?page_name=' + fml.vars.poster.pageName 
			, poster : poster
			, lazyLoad : lazyLoad.init({xpath:'.pic_load'})
		}

		if(Meilishuo.config.controller != 'goods'){
			var idObj = {
				'catalog' : 'nid'	
				, 'attr' : 'attr_id'
				, 'search' : 'keyword'
				, 'group' : 'group_id'
			}
			if (fml.vars.poster.ptype && idObj[fml.vars.poster.ptype] ) data.url +=('&' + idObj[fml.vars.poster.ptype] + '=' + fml.vars.poster.pid) 
		}

		this.posterWall.scroll(data);
	});	

fml.define('wap/page/wx/mall', [ /*'wap/app/tracking',*/'wap/component/urlHandle', 'wap/zepto/touch','wap/app/posterWalls1','wap/component/shareTmp'], function(require) {
	var urlHandle = require('wap/component/urlHandle')

	var btn_box = $('.buy_btn').on('tap', function() {
		var goodsArea = $(this).parents('.goodsArea')
		var ret = {
			'source': '8-0.0.8',
			'goods_pid': goodsArea.attr('pid'), 
			'goods_id': goodsArea.attr('goods_id'),
			'twitter_id': goodsArea.attr('goods_twitter'),
			'color' : goodsArea.attr('prop_color'),
	//		'seckill' : 1,
			'amount': 1 
		}

		var orderedInfo = ret
		orderedInfo['_cd'] = Meilishuo.config.nt
		orderedInfo['ori'] = 'share'
		var query = urlHandle.http_build_query(orderedInfo)
		window.location.href = '/wx/orderconfirm?' + query
	})

})
