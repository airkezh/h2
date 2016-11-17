fml.define('page/help/survey',['jquery','app/login','ui/alert'],function (require){
	var $ = require('jquery');
	var login = require('app/login');
	var Alert = require('ui/alert');


  	// 登录
	$("#login").on("click",function(){
		if(Meilishuo.config.user_id == 0){
			login.showLoginWin();
			return false;
		}
		var html = shareTmp("loginTpl");
	});
	

	

	//submib
	$('#btn').click(function() {
		var pageId = $('#pageId').val();
		var items  = $('#box').find('div.list'); //总题目数
		var result = {}, type, errMsg=[];
		$.each(items, function(i, item) {
			type = $(item).find('input:first').attr('type');

			if(type == 'radio'){
				var radioChecked = $(item).find('input:radio:checked'),
					radioOther   = radioChecked.parent('span').find('input:text');
					console.log(radioChecked);
					if (radioChecked.size() > 0) {
						//先push选项
						result[radioChecked.attr('name')] = radioChecked.val();
						//如果选了其他，再push其他的值
						if (radioOther.size() && radioOther.val()) {
							result[radioOther.attr('name')] = radioOther.val();
						}
						// console.log(radioOther.size());
						if (radioOther.val() == ''){
							errMsg.push(i+1);
						}
					} else {
						errMsg.push(i+1);
					}			
			}else if(type == 'checkbox' ){
				var checkboxVal = [], checkboxOther,
					checkboxs   = $(item).find('input:checkbox:checked');
					if (checkboxs.size() > 0) {
						$.each(checkboxs, function(i, checkboxChecked) {
							checkboxVal.push($(checkboxChecked).val());
							//下一个是否是text
							checkboxOther = $(checkboxChecked).parent('span').find('input:text');
							if (checkboxOther.size() && checkboxOther.val()) {
								result[checkboxOther.attr('name')] = checkboxOther.val();
							}

						});
						result[checkboxs.attr('name')] = checkboxVal;
						if (checkboxOther.val() == ''){
								errMsg.push(i+1);	
							}
					} else {
						errMsg.push(i+1);
					}
			
			}else{
				var textarea = $(item).find('textarea');
					if (textarea.val()|| textarea.attr('data-empty') == 1) {
						result[textarea.attr('name')] = textarea.val();
					} else {
						
						errMsg.push(i+1);
					}
			}


			
		});

		// console.log(errMsg);
		if (errMsg.length) {
			var errStr = '';
			$.each(errMsg, function(i, n) {
				// console.log();
				errStr = '您的第'+errMsg[0]+'题未作答呦';
			});
			alert(errStr);
			return false;
		}
		
		var json = JSON.stringify(result);
		var data = {
			'page_snapshot_id': pageId,
			'data': json
		}
		$.post('/aj/robot/survey' , data ,function (res){
			new Alert({
				title: '',
				content:'<h3><img src="http://d03.res.meilishuo.net/pic/_o/a5/34/a135d55e21332da612d76fdc6cd2_27_27.cf.gif"/>提交成功</h3><p class="txt_btn">非常感谢您的参与,我们将认真查看您的反馈并对不足之处进行改进,感谢您对美丽说的支持。</p>',
				width:370
			}).onSure( function() {
                window.location.href = '/helpcenter/?frm=top_to_help';
            });

		})

	});

	// $.each($('#box').find('div.list'), function(i, item) {
	// 	var type  = $(item).find('input:first').attr('type');
	// 	var other = $(item).find('input[name^=other_]');
	// 	if (other.size() && (type=='radio') || (type=='checkbox') ){
	// 		other.hide();
	// 		var options = $(item).find('input:'+type);
	// 		if(type == 'checkbox'){
	// 			options.click(function(e) {
	// 				if (options.last()[0].checked) {
	// 					$(item).find('input[name^=other_]').show();
	// 				} else {
	// 					$(item).find('input[name^=other_]').hide();
	// 				}
	// 			});
	// 		}
	// 		if(type == 'radio'){
	// 			options.click(function(e){
	// 				var radioItem = $(this);				
	// 				if (radioItem[0].checked) {
	// 					other = radioItem.parent('span').find('input[name^=other_]');
	// 					other.size() && other.show();
	// 					console.log(other);
	// 				} else {
	// 					other = radioItem.parent('span').find('input[name^=other_]');
	// 					other.size() && other.hide();
	// 				}
	// 			});
	// 		}
	// 	}
	// });




	

});