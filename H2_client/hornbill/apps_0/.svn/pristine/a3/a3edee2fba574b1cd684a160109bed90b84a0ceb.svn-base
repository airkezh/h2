fml.define('app/judgeRefer' , ['app/referrer'] , function(require , exports){
	var session = require('app/referrer');
	return function(){
		var nag = $("#nag")[0];
		if (!nag) return;
		if(session == 'weibo'){
			nag.className = 'nagPo nagFromWeibo';
		}else if(session == 'gdt.qq'){
			nag.className = 'nagPo nagFromQQ';
		}else if(session == 'renren'){
			nag.className = 'nagPo nagFromRenren';
		}
	}	
});
