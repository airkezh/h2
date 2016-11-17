fml.define('app/personFollow' , ['app/userFollow' , 'app/userApi' , 'component/checkedAll' , 'ui/prompt' , 'jquery' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');
	var userFollow = require('app/userFollow');
	var Prompt = require('ui/prompt');
	var shareTmp = require('component/shareTmp');
	var checkedAll = require('component/checkedAll');
	var userApi = require('app/userApi').userApi;
	return function(isShowPromt){
		userFollow('.addUserFollow' , '.removeUserFollow' , '.removeUserFollow', 'red_follow' , 'pink_follow' , function(){
			if($(this).is('.pink_follow')){ 
			}else{
				if(isShowPromt){

				}else{
				//	var obj = this;
					var obj = $('.removeUserFollow')[0];		//hack for #3216
					var url = '/aj/recommend/rec_block';
					var data = { 
						user_id : $(this).attr('fuid')
					}
					var callback = function(response){
						var data = {fol_user  : response}
						var html = shareTmp('recommendUser' , data)
						var prompt = new Prompt({
							target : obj,
							content : html,
							width : 606,
							position : ['right']
						});
						prompt.sync();
						checkedAll('#selectall' , '.sel_box');
						var followArr = [];
						$('#afterFollow').bind('click' , function(){
							$.each($('.sel_box:checked') , function(){
								followArr.push($(this).attr('usrid'));	
							});
							if (followArr.length == 0) {
								location.href= '/';
								return;
							}
							var data = {
								fuid : followArr.join(':')	
							}
							var callback = function(){
								location.href = '/';	
							}
							userApi('follow', data, callback);
						});
					}
					$.post(url , data , callback , 'json');
				}
			}
		});
	}
});
