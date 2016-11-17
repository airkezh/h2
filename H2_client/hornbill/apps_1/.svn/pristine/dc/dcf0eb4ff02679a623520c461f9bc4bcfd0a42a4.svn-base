/*common*/	
require('wap/zepto/fastclick')
require('wap/app/dialog')
var  shareTmp = require('wap/component/shareTmp')
	, Alert = require('wap/ui/alert');

var cid = location.search.substr(1).split('&')[0].split('=')[1]
	, selectedLen = null
	, questionNum = $('.qstn_list').length 
	, allRight = true;

//Alert
var a = function(msg){
	return new Alert({
		content : msg
	})
}

/*登陆成功后的回掉函数*/
window.MLS = {
    didLogin : function() {
        // 成功登录，跳转到下一步
        window.location.reload();
    }
};

//答案选择
$('.qstn li').on('click',function(){
	var $this = $(this)
		, normal = $this.children('.normal')
	if(normal.attr('isSelected') == '0') {
		normal.attr('isSelected', '1')
		normal.addClass('selected')
		$this.siblings().children('.normal').removeClass('selected').attr('isSelected', '0')
		
	}
})	

//弹窗
var dialogFn = function(id){
	var tpl = shareTmp(id);
    $.fn.dialog({dialogContent : tpl , dialogTitle : ''});
	$('.dialog_box').on('click' , function(){
		setTimeout(function(){
			$('.closeDialog').trigger('tap');
		} , 500);
	});
}

var data = {
	'cid' : cid
}

$.get('/aj/exoCart/list', data, function(res){
	if(res.code == '-5'){
		a(res.msg)
	}else if(res.code == '-4'){
		dialogFn('noRemain')
	}
	if(res.code != '1'){
		$('.cartNum span').text(res.last)
	}
},'json');
//cartBtn
$('.cartBtn').on('click',function(){
	//是否登录
	if(fml.vars.isLogin == '0') {
	    window.location.href = "meilishuo://login.meilishuo/";
	    return;
	}
	//问题是否都已经回答
	selectedLen = $('body').find('.selected').length
	if(selectedLen != questionNum) {
		a('亲，请先答完题再提交哦！')
		return;
	}
	//是否都答对
	$('.selected').each(function(index,item){
		if(!$(item).prev().attr('isright')){
			allRight = false;
			return;
		}
	})
	if(!allRight){
		dialogFn('Wrong');
		allRight = true;
		return;
	}

	if(allRight) {
		$.get('/aj/exoCart/list', data, function(res){
			var code = res.code
			if(code == '0') {
				window.location.href = '/activity/exo/userInfo/?cid=' + cid
			} else if(code == '-5'){
				a(res.msg)
			} else if(code == '-2'){
				dialogFn('haveGet')
			} else if(code == '-3'){
				dialogFn('noBuy')
			} else if(code == '-1'){
				window.location.href = "meilishuo://login.meilishuo/";
	    		return;
			} else if(code == '-4'){
				dialogFn('noRemain')
			} else {
				a('申请人太多，请稍等！')
			}
		},'json');
	}
})
