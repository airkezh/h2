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
fml.use('app/showMedal' , function(){
	this();
});
fml.use('app/label' , function(){
	this();	
});
fml.use('app/letter' , function(){
	this(".sendPrivateLetter");	
});
fml.use('app/eventHover' , function(){
	this.hoverShow('.showChangeHead' , '.change');  
});
fml.use('app/deleteMsg' , function(){
	this();	
});
fml.use('app/eventHover' , function(){
	this.hoverShow('#msgList>li' , '.close');	
});


fml.define('page/msg' , [] , function(){});
