fml.use('component/poster' , function(){
	this.posterWall();
});
fml.use(['jquery','app/posterWall' , 'component/urlHandle'] , function(){
	var query = this.urlHandle.getParams(window.location.href.toString());
	var urlData = {
		'frame' : query.frame || 0,
		'page' : query.page || 0,
		'view' : '1',
		'group_id' : Meilishuo.config.groupId
	};
	var opts = this.jquery.extend({}, urlData, query);
	this.posterWall(opts, '/aj/getGoods/magazinePoster', {'frame_size':7});
});
fml.use('app/deletePoster' , function(del){
	del.deleteTrigger();
}); 
fml.use(['jquery', 'app/sharePost', 'app/checkLogin'], function(){
	var $ = this.jquery;
	var ds = this.sharePost.dialogShow;
	var check = this.checkLogin;
	$('.gd_join').click(function(){
		if(!check()) return false;
		ds.sharMeiliPic();
		$('.share_pic').click();
	});
	fml.vars.groupName = '女生爱搭配';
	fml.vars.groupId = Meilishuo.config.groupId;
	fml.vars.newMagazineList = '<option role="0" id="'+ fml.vars.groupId +'" value="'+ fml.vars.groupName +'" >'+ fml.vars.groupName +'</option>';
})
fml.define('page/huodong/girlday', [], function(){});
