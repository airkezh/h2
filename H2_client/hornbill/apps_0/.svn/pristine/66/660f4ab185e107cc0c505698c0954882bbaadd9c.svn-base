fml.define('page/huodong/free_pc', ['jquery'], function(require, exports) {
	$ = require('jquery');
	$(".masters").on("click",function(){
		var index=$(".masters").index(this);
		if(!$(this).hasClass("check_master")){
			$(this).siblings().removeClass("check_master");
			$(this).addClass("check_master");
			$("#master_wrap").attr("src","http://i.meilishuo.net/css//images/huodong/free_pc/free_pc_desc"+(Number(index)+1)+".png")
		}
	});
});