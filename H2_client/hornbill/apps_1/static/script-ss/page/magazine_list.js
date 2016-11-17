fml.use('app/magaCommon', function(){});
fml.use('app/publishor',function(){});
fml.use('app/follow' , function(){
	this('.addGroupFollow' , '.removeGroupFollow' , '.removeGroupFollow' , 'red_follow' , 'pink_follow');
});
fml.use('app/newMagazine', function(){
	this.newMeiliMagazine('.create_mag > .new_mag', true);
})
fml.use('app/replyBox', function(){});
fml.define('page/magazine_list',[],function(){});
