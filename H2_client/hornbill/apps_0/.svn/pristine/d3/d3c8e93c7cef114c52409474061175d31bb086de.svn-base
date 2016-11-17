fml.define('app/getComment' , ['jquery' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');
	var shareTmp = require('component/shareTmp');
	var url = '/aj/getComment/';	

	if(fml.vars.newShare){
		url = '/aj/getComment/newShare'
		var commTop = $('.pcBox')
	}

	var getAjaxComment = function(tid  ,opt){
		opt = opt || {}

		var page = opt.page || 0
			,$parentObj = opt.pObj
			,$commentList
		var data = opt.param || {}
		
		data.tid =  tid
		data.page = page

		if (opt.commentPnl){
			$commentList = opt.commentPnl
		}else{
			if ($parentObj) $commentList = $parentObj.find('#twitter_comment_list')
			else $commentList = $('#twitter_comment_list');
		}

		var tmpId = opt.tmpId || 'twitter_comment'

		var callback = function(response){	
			if (opt.processData){
				var list = opt.processData(response)	
			}else {
				var list = {'item' : response}
			}
			if (!list) return
			var commentItem = shareTmp(tmpId , list);
			commentItem && $commentList.html(commentItem);
			if (opt.cbk) {
                /**
                 * modified by sunzhidong
                 * 我需要这个 response 来处理翻页，详见 script-ss/page/doota/sale.js
                 */
                opt.cbk(response)
            } else if(fml.vars.newShare && page != 0 && commTop && commTop.length)
				$(window).scrollTop(commTop.offset().top - 30);
			

		}
		$.get(opt.url || url , data , callback , 'json');
	}	

	exports.getAjaxComment = getAjaxComment;
});
