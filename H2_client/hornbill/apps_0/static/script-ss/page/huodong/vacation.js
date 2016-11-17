fml.define('page/huodong/vacation' , ['app/checkLogin', 'component/iStorage'] , function(require, exports){
	var check = require('app/checkLogin');
	var storage = require('component/iStorage');
	fml.vars.vacation = {};
	var isclick = 0;
	$('.shareBtn').bind('click', function(){
		var groupId = $(this).attr('gid'),
			groupName = $(this).attr('gname');
		fml.vars.groupId = groupId;
		fml.vars.groupName = groupName;
		if(Meilishuo.config.user_id == 0) storage.set('groupId', groupId);
		if(check()){
			var isfollowed = fml.vars.vacation[groupName] || false;
			if(isfollowed){
				$('#shareMeiliDialog').click();
			}else{
				var data = {
					groupid : groupId, 
					ajax : 1
				};
				var url = '/group/'+ data.groupid +'/follow';  
				$.post(url , data , function(){
					fml.vars.vacation[groupName] = true;
					$('#shareMeiliDialog').click();
				}); 
			}
		}
	});
	storage.get('groupId', function(v){
		if(v) isclick = v;	
		if(isclick != 0 && Meilishuo.config.user_id != 0){
			$('[gid=' + isclick + ']').click();
			storage.remove('groupId');
		}
	});
});

