fml.use(['jquery','app/posterWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var magazine_id = $("#magazne_id").val() || 0;
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'group_id' : magazine_id
	};  
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(opts , '/aj/getGoods/magazinePoster');
});
fml.use('component/poster' , function(){
	this.posterWall();	
});
fml.use('component/menu' , function(){
	this('.show_edit' , 'edit_magazine' , function(obj){
		return {
			left : $(obj).offset().left,
			top : $(obj).offset().top + $(obj).height() - 10
		}	
	});
});
fml.use('jquery' , function(){
	var $ = this;
	if($(".notesText").height() > 19){
		$(".putUp").show(); 
	}
	$(".putUp").bind("click" , function(){
		$(".notes").stop(true , true).animate({'height' : $('.notesText').height()});
		$(this).hide();
		$(".putDown").show();
	});
	$(".putDown").bind("click" , function(){
		$(".notes").stop(true , true).animate({'height' : 19});
		$(this).hide();
		$(".putUp").show();
	}); 
	$('.putUp').click();
});
fml.use('app/followMagazine' , function(){
	this();	
});
fml.use('app/adPoster' , function(){
	this.adBanner('bottom', 'group');
});
fml.define('page/huodong' , ['component/iStorage' , 'app/checkLogin'] , function(require, exports){
	if (location.href.indexOf('16169578') > -1){
		var check = require('app/checkLogin');
		$('.g_pic , .notes pre a').click(function(){
		     return check();
		})
		var storage = require('component/iStorage');
		storage.set('magazineName','美宝莲潮妆学院热分享');
		storage.set('magazineId','16169578');
	}

});
