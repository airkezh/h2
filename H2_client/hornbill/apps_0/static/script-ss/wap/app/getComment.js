fml.define('wap/app/getComment' , ['component/shareTmp'] , function(require , exports){
	var shareTmp = require('component/shareTmp');
	var url = '/aj/getComment/';	

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
			
			if (opt.cbk)
				opt.cbk()

		}
		$.get(opt.url || url , data , callback , 'json');
	}	

	exports.getAjaxComment = getAjaxComment;
});
