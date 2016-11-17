fml.define('wap/app/page' , ['component/shareTmp' , 'wap/app/getComment'] , function(require , exports){
	var shareTmp = require('component/shareTmp');
	var getComment = require('wap/app/getComment');
	var pageNum = 0;
	function formartPage(data, $pageNav){
		data = data || {};
		var totalNum = data.totalNum || 0;	
		var pageSize = data.pageSize || 8;

		var pageLen = Math.ceil(totalNum / pageSize);
	
		function pluComment(){
			return	getComment.getAjaxComment(data.tid || fml.vars.twitter_id , data)
		}

		//var pageLen = 10
		if(pageLen <= 1){ 
			$pageNav.html('')
			return pluComment()
		};
		data['pageLen'] = pageLen;
		pageNum = data.page;
		pluComment()
		var pageNav = shareTmp('pagingNav' , data);
		$pageNav.html(pageNav);
	}

	return function(data){
		data = data || {};

		data.page = pageNum;
		var $pageNav = data.pageNav || $('#showPagingNav');
		data.page = 0
		formartPage(data, $pageNav);	
		if ($pageNav.attr('binded')) return
		$pageNav.attr('binded' , true) 
		$pageNav.on('tap' , '.pageNav1 .pageitem' , function(){
			if(pageNum == $(this).attr('index')) return;
			data.page = $(this).attr('index');
			formartPage(data, $pageNav);	
		});
		$pageNav.on('tap' , '.pageNav1 .pageNext , .pageNav1 .pagePrev' , function(){
			data.page = +pageNum + (+$(this).attr('index'));
			formartPage(data, $pageNav);		
		});

	}
});
