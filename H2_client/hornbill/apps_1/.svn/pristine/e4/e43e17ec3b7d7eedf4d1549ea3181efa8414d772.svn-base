fml.define('wap/app/fallAdd', ['component/shareTmp', 'component/callApi', 'wap/zepto/fastclick'], function(require, exports){
	var api = require('component/callApi');
	var shareTmp = require('component/shareTmp');

	var formartPage = function(btn, opt){
		var url = opt.url || '/aj/getComment/'
			, box = $(opt.box)
			, btn = box.find('.more')
			, con = box.find('ul')
			, data = {
				'page' : opt.page
			}

		if(opt.tid)
			data.tid = opt.tid
		if(opt['status'])
			data['status'] = opt['status']
		if(opt.aid)
			data.aid = opt.aid

		var tmpId = opt.tmpId || 'twitter_comment'

		var callback = function(response){	
			opt.page++


			if (opt.processData){
				var list = opt.processData(response)	
			}else {
				var list = {'item' : response}
			}
			// console.log(list);
			// console.log(list.totalNum);
			if (list.totalNum == 0 || list.item.length == 0) btn.hide()
			else btn.show()

			if (!list) return
			var commentItem = shareTmp(tmpId , list);
			commentItem && con.append(commentItem);
			
			if (opt.cbk)
				opt.cbk(response)

		}

		//$.get(url, data, callback, 'json');

		//兼容定福庄机房改造
		if (opt.api_read) {
			api.read({'url': url}, data, callback);
		} else {
			$.get(url, data, callback, 'json');
		}
	}

	return function(data){
		var box = $(data.box)
			, btn = box.find('.more')

		if(box.attr('binded')) return

		box.attr('binded', true)

		if(data.firstView)
			data.page++;
		else
			formartPage(btn, data);

		/*btn
			.on('touchstart touchend', function(event){
				event.preventDefault();	
			})
			.on('tap', function(event){
				event.preventDefault();	
				formartPage(btn, data);
			})*/

		btn.off('click').on('click',function(){
			formartPage(btn, data);
		});
	}
});
