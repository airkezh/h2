fml.use(['jquery' , 'app/personWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = { 
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'user_id' : fml.vars.user_id || 0,
		'totalNum' : fml.vars.totalNum || 0,
		'type' : query.type,
		'newFocusShop' : fml.vars.newFocusShop
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.personWall(opts , '/aj/getMagazine/');
});
fml.use(['jquery' , 'app/checkLogin'] , function(){
	var $ = this.jquery;	
	var check = this.checkLogin;
	$('#mymedal').live('click' , function(){
		if(check()){
			location.href = '/medal/u/' + Meilishuo.config.user_id;
		}
	});
});
fml.use('app/beautyDecl' , function(){
	this();
});
fml.use('app/deletePoster_guang' , function(del){
	del.deleteTrigger();
	del.deleteLike();
});
fml.use('app/personFollow' , function(){
	this();	
});
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
/*
fml.use('app/showMedal' , function(){
	this();
});
*/
fml.use('app/label' , function(){
	this();	
});
fml.use('app/letter' , function(){
	this('#sendPrivateLetter');	
});
fml.use('app/adPoster' , function(){
	this.adBanner('bottom', 'person');
});
fml.use('app/eventHover' , function(){
	this.hoverShow('.showChangeHead' , '.change');  
});

fml.define('page/person' , [] , function(){});
