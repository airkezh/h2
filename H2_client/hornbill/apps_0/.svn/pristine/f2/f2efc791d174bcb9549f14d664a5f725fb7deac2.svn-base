/*common*/
var $ = require('jquery')
	,inputValidor = require('component/inputValidor')
	,shareTmp = require('component/shareTmp')

var $login_form = $('#login_form')
	,$username = $login_form.find('[name=username]')
	,$password = $login_form.find('[name=password]')
	,$checkcode = $login_form.find('[name=checkcode]')
	,$isSave = $login_form.find('[name=is_save]')
	,$autoLogin = $login_form.find('[name=auto_login]')
	,$inputWrapper = $('.input_wrapper')
	,$onLogin = $('.on_login')
	,$onTimeout = $('.on_timeout')
	,$logo = $('.logo_wrapper .logo')
	,$userAvatar = $('.logo_wrapper .user_avatar')
	


function clearWarn(wrapper){
	if(wrapper)
		wrapper.removeClass('warn')
	else
		$('.warn').removeClass('warn')
}

var $login_form = $('#login_form')
var loginStatus = new function(){
	var $subBtn = $login_form.find('[type=submit]')
		,loginAid = 0
		,$disableList = $subBtn.add($username).add($password).add($checkcode).add($isSave).add($autoLogin)
	function clearLogin(){
		window.clearTimeout(loginAid)
		loginAid = 0
	}
	this.off = function(){
		// console.log('off')
		$subBtn.css('cursor','none')
		$disableList.attr('disabled','true')
		return this
	}
	this.on = function(){
		// console.log('on')
		$subBtn.css('cursor','pointer')
		$disableList.removeAttr('disabled')
		return this
	}
	this.onLoading = function(){
		// console.log('onLoading')
		this.off()
		loginAid = setTimeout(function(){
			loginStatus.onTimeout()
			// $('#cancelLogin').trigger('click')
		}, 15000)
		showOnLogin()
		return this
	}
	this.offLoading = function(){
		// console.log('offLoading')
		this.on()
		clearLogin()
		showInputWrapper()
		return this
	}
	this.onTimeout = function(){
		showOnTimeout()
		try{
			window.c_cancelLogin()
		}catch(e){
			console.log('has no c_cancelLogin')
		}
		return this
	}
	function showInputWrapper(){
		$onLogin.add($onTimeout).hide()
		$inputWrapper.show()
		$('.ani_border').hide()
		checkCodeOpts.fresh().clear()
	}
	function showOnLogin(){
		$inputWrapper.add($onTimeout).hide()
		$onLogin.show()
		$('.ani_border').show()
	}
	function showOnTimeout(){
		$inputWrapper.add($onLogin).hide()
		$onTimeout.show()
		$('.ani_border').hide()
	}
}()

var form = inputValidor.create($('#login_form'),{
		"findMyTip" : function(name,type,$input,pass,failOn){
			// console.log(name,type,$input,pass,failOn)
			if(pass) {
				clearWarn($input.parent())
			} else {
				$input.parent().addClass('warn')
			}
			if(type=='err'){
				// $('[name='+name+']').focus()
				return $('.error_txt')
			} else if(type=='succ') {

			}
		}
	})
form.add('username' , {'required':true}, {'on':'blur'},{"required":"用户名不能为空"})
	.add('password' , {'required':true}, {'on':'blur'},{"required":"密码不能为空"})
	.add('checkcode' , {'required':true, 'minLength':4}, {'on':'blur'},{"required":"验证码不能为空",'minLength':'验证码长度必须为4位'})
	.onSucc(function(){
        console.log('check pass',arguments)
        var param = {
        	username:$username.val()
        	,password:$password.val()
        	,checkcode:$checkcode.val()
        	,is_save:$isSave.is(':checked')|0
        	,auto_login:$autoLogin.is(':checked')|0
        }
        console.log(param)
        loginStatus.onLoading()
        try{
			window.c_login(JSON.stringify(param))
		}catch(e){
			console.log('has no c_login function')
		}
        
    })
    .onFail(function(errors){
        console.log('check fail', errors)
        loginStatus.offLoading()
        $('[name='+Object.keys(errors)[0]+']').focus()
    })

var checkCodeOpts = {
	fresh : function(){
		function _getCheckCodeUrl(){
			return '/Register/Captcha?token=asde39ad9&session='+Math.random()
		}
		$('.check_code_wrapper img').attr('src',_getCheckCodeUrl())
		return this
	}
	,show : function(){
		$checkcode.parent('.checkcode_wrap').fadeIn()
		return this
	}
	,hide : function(){
		$checkcode.parent('.checkcode_wrap').fadeOut()
		return this
	}
	,clear : function(){
		$checkcode.val('')
		return this
	}
	,focus : function(){
		$checkcode.focus()
		return this
	}
}

var serverError = function(r){
	var str = ''
	//达到输入错误上线，显示验证码
	if(r.need_captcha == 1){
		checkCodeOpts.show().focus()
	}
	switch(r.status){
		case 1 :
			//GetCookie?
			break
		case 6 :
			str = '请正确输入验证码'
			break
		case -1 : 
			str = '账号或密码错误，请重新输入'	
			break
		case -3 :
			str = '账户还在审核中'
			break;
		case -4 :
			str = '账号已被删除'
			break;
		case -21:
			// window.location.reload();
			break;
		case -11 :
			str = '密码输入错误10次，回忆一下，30分钟后再来试试'
			break;
		case -12 :
			str = '账号或密码错误，您还可尝试' + r.remain + '次'
			break;
		case -13 :
			str = '休息一下~一会儿继续'
			break;
		case -16:
		case -17:
			str = r.message || '验证错误'
			break;
		default :
			break;
	}
	return str
}

function initExportFn(){
	MLS.checkCodeOpt = function(data){
		var type = data.type || 'hide'
		if(type==='hide'){
			checkCodeOpts.hide()
		} else if(type==='show'){
			checkCodeOpts.show()
		}
	}
	MLS.initInfo = function(data){
		var userlist = data.userlist || []
			,defaultIndex = data.defaultIndex || 0
			,resultHtml = ''
		if(!userlist.length) return
		userlist.forEach(function(item,index){
			if(index>=5) return //暂时只显示5条 后期优化
			resultHtml += shareTmp('user_list_option_tmp',{data:item})
		})
		$('.userlist_btn').show()
		$('#user_list').html(resultHtml)
		$username.val($('#user_list li:eq('+defaultIndex+')').attr('data-name')).trigger('input')
	}
	MLS.loginCallback = function(data){
		
		switch(data.status){
			case 'succ':
				setTimeout(function(){loginStatus.offLoading()}, 1000)
				break;
			case 'sfail':
				loginStatus.offLoading()
				// checkCodeOpts.fresh().clear()
				// $password.val('').parent().addClass('warn')
				$('.error_txt').text(serverError(data.server_data)).show()
				break;
			case 'cfail':
				loginStatus.offLoading()
				// checkCodeOpts.fresh().clear()
				// $password.val('').parent().addClass('warn')
				$('.error_txt').text(data.client_data.err_text).show()
				break;
			default:
				break;
		}
	}
}

//自动填充登陆表单
$username.on('input',function(){
	var val = $(this).val()
		,$data = $('#user_list').find('[data-name="'+val+'"]')
	//reset
	$isSave.removeAttr('checked')
	$autoLogin.removeAttr('checked')
	$password.val('')
	$userAvatar.hide()
	$logo.show()
	$userAvatar.find('img').attr('src','')
	if($data.length){
		if($data.attr('data-save')*1){
			$password.val($data.attr('data-pass'))
			$isSave.attr('checked','true')
			if($data.attr('data-auto')==1){
				$autoLogin.attr('checked','true')
				$login_form.submit()
			}
		}
		if($data.attr('data-avatar')){
			$userAvatar.find('img').attr('src',$data.attr('data-avatar'))
			$logo.hide()
			$userAvatar.show()
		}
	}
})

$autoLogin.on('change', function(event) {
	if($(this).is(':checked')){
		$isSave.attr('checked', 'true')
	}
})

$checkcode.on('input', function(event) {
	var val = $(this).val()
	if(val.length>4)
		$(this).val(val.substr(0,4))
})

$('.fresh_check_code').on('click', checkCodeOpts.fresh)

//取消登录
$('#cancelLogin').on('click', function(event) {
	loginStatus.offLoading()
	try{
		window.c_cancelLogin()
	}catch(e){
		console.log('has no c_cancelLogin')
	}
});
//重新登录
$('#reLogin').on('click', function(event) {
	loginStatus.offLoading()
});

//初始化userList
function initUserList(){
	var userOffset = $('.username_wrap').offset()
	var left = userOffset.left
		,top = userOffset.top + $('.username_wrap').outerHeight() + 1
	$('#user_list').css({
		left:left +'px'
		,top:top +'px'
	})
}
$('body').on('click', '.userlist_btn', function(event) {
	event.stopPropagation()
	$('#user_list').toggle()
}).on('click', function(event) {
	$('#user_list').hide()
})
$('#user_list').on('click', 'li', function(event) {
	event.stopPropagation()
	var name = $(this).attr('data-name')
	$username.val(name).trigger('input')
	$('#user_list').hide()
}).on('click', '.del_btn', function(event) {
	event.stopPropagation()
	var username = $(this).parents('li').attr('data-name')
	$(this).parents('li').remove()
	try{
		window.c_delUser(username)
	}catch(e){
		console.log('has no fn window.c_delUser')
	}
	if($('#user_list').children('li').length==0){
		$('.userlist_btn').hide()
		$('#user_list').hide()
	}
})

//init
;(function(){
	checkCodeOpts.fresh()
	initExportFn()
	try{
		initUserList()
		window.c_initUserList()
	}catch(e){
		console.log('has no c_initUserList function')
	}
}())


