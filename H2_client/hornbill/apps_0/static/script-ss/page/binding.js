fml.use(['app/binding'] , function(){

	this.binding();
	// switch(Meilishuo.config.controller){
	// 	case 'register_form':
	// 		$('#login_more').bind('click',function(){
	// 			$(this).hide().nextAll('a').show();	
	// 		});
	// 		this.binding();
	// 		break;
	// 	case 'register_success':
	// 		this.registerLike.success();
	// 		break;
	// 	case 'register_step3':
	// 		this.registerLike.selectStyle();
	// 		break;
	// 	case 'register_step4':
	// 		this.registerLike.selectGroup();
	// 		break;
	// 	default:
	// 		break;
	// }
});
fml.use('app/cleanMsg' , function(mod){
	mod.msgFunc();
});
fml.use('app/setting' , function(){});

fml.define('page/binding' , [] , function(){});
