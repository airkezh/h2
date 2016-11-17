fml.define('app/checkStatusCode' , [] , function(require , exports){
	return function(response , callback){
		var uploadstatus = { 
			'-2' : '您发布的内容含有屏蔽词，请修改后重新发送',
			'99' : '您发布的链接不符合规范，请修改后重新发送',
			'98' : '您发布的时间间隔太短了，休息一下再发布吧',
			'97' : '您发布的时间间隔太短了，休息一下再发布吧',
			'96' : '您创建杂志过多，休息一会吧',
			'95' : '你@的人太多了，请修改后再发送'
		}
		if(uploadstatus[response]){
			if(!callback){
				alert(uploadstatus[response]);
			}else{
				callback();
			}
			return true;
		}else{
			return false;
		}
		return true;
	}
});
