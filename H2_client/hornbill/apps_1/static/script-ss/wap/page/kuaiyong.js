fml.use(['wap/app/kuaiyong'] , function(){
	var kuaiyong = this.kuaiyong;
	switch(Meilishuo.config.controller){
		case 'result':
			kuaiyong.result();
			break;
		case 'regist':
			kuaiyong.regist();
			break;
		default:
			kuaiyong.regist();
			break;
	}
});
fml.define('wap/page/kuaiyong' , [] , function(){});
