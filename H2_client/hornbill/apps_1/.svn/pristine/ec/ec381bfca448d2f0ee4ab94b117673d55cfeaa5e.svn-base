/*common*/
var $ = require('jquery')

var check_attrs = ['required' , 'maxLength', 'min' ,'max','format','compareTo']

var fmtReg = {
	'email': /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
	,'qq': /^\d{5,15}$/
	, 'url':/^(http(s)?:)?\/\/([0-9a-z\-\_]+\.)+[a-z]{2,4}(\/)?/
	, 'tel': /^(([0\+]\d{2,3}-)?(0\d{2,3}-)|400|800)(\d{7,8})(-(\d+))?$/
	,'mobile' : /^0?(13[0-9]|15[012356789]|18[0123456789]|14[57])[0-9]{8}$/
	}

function validor(form , opt) {
	this._rules = {}
	this._opts = {}
	this._errors = {}
	this._formOpt = opt || {}

	this._formOpt.defaultErrTip = '输入错误'
	form && bindForm.call(this, $(form)[0])
	}
function addRule (name , rule ,opt ){
	if (!this._form) bindForm.call(this,$('[name='+name+']')[0].form)
		//console.log(arguments)
	if (!rule){
		// scan input  attributes while rule is null
		var input = $('[name='+name+']' , this._form)
		var rule = {}
		var type = input.attr('type')
		switch (type ) {
			case 'email':
			case 'tel':
			case 'url':
			case 'qq':
				rule.format = type
			}
		for (var i = 0 , j = check_attrs.length ; i < j ; i++){
			var attrName = check_attrs[i]
			var attr = input.attr(attrName)
			if (attr) rule[attrName] = attr
			}
		}

	if (opt && opt.on){
		//bind blur|input event
		var vSelf = this
		this._form.on(opt.on , '[name='+name+']' , function(){
			vSelf.check(this)
			})
		delete opt.on
		}


	this._rules[name] = rule  
	if (opt) this._opts[name] = opt
	}

function bindForm(form){
	if (this._form) return

	this._form = $(form)
	var vSelf = this
	this._form.bind('submit' , function(){
		var formValid = true

		for (var i in vSelf._errors){
			formValid = false
			break
			}
		//console.log(vSelf._errors)
		if (false === formValid) {
			vSelf.onFail && vSelf.onFail(vSelf._errors)
		} else {
			var itemNum = 0
			for (var name in vSelf._rules){
				itemNum++ 
				vSelf.check(name , function(pass,failOn, name){
					window.setTimeout(function(){
						// console.log(itemNum)
						itemNum--
						if (itemNum <= 0) {
							for (var i in vSelf._errors){
								vSelf.onFail(vSelf._errors)
								return
							}
							if (vSelf.onSucc) 
								vSelf.onSucc(vSelf._form)
							else
								vSelf._form.submit()
						}
					})
				})	
			}
		}
		return false
		})	
	
	}

var validFn = validor.prototype

validFn.check = function(input , cbk){
	// console.log(input , cbk);
	var name,val
	var _form = this._form
	if ('string' == typeof input){
		name = input
		input = $('[name='+name+']:visible', this._form) 
	}else{
		input = $(input)
		name = input.attr('name')
		}
		
	var rule = this._rules[name]
		,errors = this._errors
	var vSelf = this
	if(!input.length){
		return checked(true)
	}
	val = input.val()
	
	function checked(pass,failOn){
		if (!pass){
			errors[name] = failOn 
			//if tip div exists ,show it
		}else {
			delete errors[name]
			}
		vSelf.prompt(name , failOn , pass )
		cbk && cbk(pass ,failOn, name , val , rule , input)
		return pass 
		}	
	//console.log(name , val , rule , input)
	if (rule.required && ('' === val)) {
		return checked(false ,'required')
		} 

	if (rule.compareTo && (val != $(rule.compareTo , this._form))) { 
			return checked(false ,'compareTo')
		}

	if (rule.maxLength && (val.length > rule.maxLength)){
		return checked(false , 'maxLength') 
		}
	if (rule.minLength && (val.length < rule.minLength)){
		return checked(false , 'minLength') 
		}
	var reg = []
	if (rule.reg) reg.push(rule.reg)	
	if (rule.format) {

		if (fmtReg[rule.format]) reg.push(fmtReg[rule.format])
		else {
			switch (rule.format){
				case 'phone':
					reg.push(fmtReg.mobile)
					reg.push(fmtReg.tel)
					break
				}
			}
	}else{
		if (rule.min && (val*1 < rule.min*1)) {
			return checked(false , 'min') 
			}
		if (rule.max && (val*1 > rule.max*1)) {
			return checked(false , 'max') 
			}
		}
	if (reg.length){
		for (var i = 0 , j = reg.length; i < j ;i++){
			if (! reg[i].test(val)) return checked(false , rule.format)
			}	
		
		}
	if (rule.check) {
	//user define check function
		rule.check(name ,val ,function(pass){
			return checked(pass , rule.format)
			})	
	}else if (rule.back){
		var param = {}
		param[name] = val
		$.get(rule.back ,param , function(res){
			checked(res ,'ajax')	
			},'json')
		.error(function(){
			checked(false ,'ajax')	
			}) 
	}else{
		return checked(true)
		}
	
	}

validFn.prompt = function (name , failOn , pass ) {
	var opt = this._opts[name] || {}
	if (opt.noTip) return
	var errDiv ,succDiv
	var input = $('[name='+name+']' , form)
	var findMyTip = opt.findMyTip || this._formOpt.findMyTip
	if (findMyTip){
		errDiv = findMyTip(name , 'err' , input ,pass, failOn)
		succDiv = findMyTip(name , 'succ', input , pass, failOn)
	}else{
		var form = $(this._form)
		errDiv = errDiv || opt.errTip || opt.tip || '.'+ name + '_err'
		errDiv = $(errDiv , form)
		if (0 == errDiv.length && !(opt.errTip || opt.tip)){
			//auto create one
			errDiv = $('<span class="'+(opt.tipClassErr || opt.tipClass || '') + ' '+name +'_err" />').insertAfter(input)
			}

		succDiv = succDiv || opt.succTip || opt.tip || '.'+ name + '_succ'
		succDiv = $(succDiv , form)
	}
	if (pass) {
		errDiv && errDiv.hide()	
		succDiv && succDiv.show()
	}else{
		succDiv && succDiv.hide()
		var userErr = opt.errs || {}
		var errMsg = userErr[failOn] || (userErr.define && userErr.define(failOn,name))|| this._formOpt.defaultErrTip
		errDiv && errDiv.html(errMsg).show()
		}
		
	}
//reset input tips
validFn.reset = function(name){
	delete this._errors[name]
	this.prompt(name , null , true)
	}

validFn.adds = function(){
	if (0 == arguments.length){
		var vSelf = this
		$('input,textarea,select' ,this._form).each(function(){
			addRule.call(vSelf,this.name)
			})
	}else {
		for (var i=0,j = arguments.length;i <j ; i++) addRule.call(this,arguments[i] )
		}
	}
/*
rule required | email |compareTo | back
opt {on : blur | input
	,findMyTip(name ,err| succ)
	,errs :
	,errTip :
	,tip:
	,noTip:}
	
*/


validFn.add = function(input , rule ,opt, errors){
	//forEach it if arguments[0] is array
	if ('string' == typeof input){
		if (errors){
			if (opt) opt.errs = errors
			else opt = {errs : errors}
				
			}
		addRule.call(this,input , rule && (rule.rule || rule) , opt || (rule && rule.opt))
	}else{
		for (var name in input){
			var opt = input[name]
			addRule.call(this,name , opt.rule || opt , opt.opt)
			}
		}
	return this
	
	} 

//print binded rule & option & error
validFn.console = function(name , gather){
	//todo
	var log = {
		'rule' : name ? this._rules[name] : this._rules 
		,'opt' : name ? this._opts[name] : this._opts
		,'error' :  name ? this._errors[name] : this._errors
		}
	console.log(log[gather] || log )
	}


validFn.onSucc = function(onSucc){
	this.onSucc = onSucc
	return this
	}

validFn.onFail = function(onFail){
	this.onFail = onFail
	return this
	}

exports.create = function(form , opt){
	return new validor(form , opt)
	}
