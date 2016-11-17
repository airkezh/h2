;(function(){'use strict';
// Source: _transTpl/passport.js
!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.passport = Passport
window.MLSPassport.content = {}

function Passport(opts){
	this.init(opts)
}

Passport.prototype.init = function(opts){
	opts = opts || {};
	this.opts = opts
	this.app_id = opts.app_id

	this.getBridge(opts)

	this.defaultCSS = this.opts.defaultCSS|0
	if(this.defaultCSS)
		this.bridge.loadCssFile("/css/passport.css")
}

Passport.prototype.getLogin = function(opts){
	var login = new Login($.extend({},{},opts), this)
	return login
}

Passport.prototype.getLogout = function(opts){
	var logout = new Logout($.extend({},{},opts), this)
	return logout
}

Passport.prototype.getRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'pic'},opts), this)
	return risk
}
Passport.prototype.getPicRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'pic'},opts), this)
	return risk
}
Passport.prototype.getSMSRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'sms'},opts), this)
	return risk
}
Passport.prototype.getReactiveRisk = function(opts){
	var risk = new Risk($.extend({},{risk_type:'reactive'},opts), this)
	return risk
}

Passport.prototype.getMobile = function(opts){
	var mobile = new Mobile($.extend({},{},opts), this)
	return mobile
}


Passport.prototype.getMobileAndSMSRisk = function(opts){
	var mSelf = this
	return {
		mobile:mSelf.getMobile(opts)
		,risk:mSelf.getSMSRisk($.extend({},{append:true},opts))
	}
}

Passport.prototype.getMobileAndReactiveRisk = function(opts){
	var mSelf = this
	return {
		mobile:mSelf.getMobile(opts)
		,risk:mSelf.getReactiveRisk($.extend({},{append:true},opts))
	}
}

Passport.prototype.getBridge = function(opts){
	this.bridge = new Bridge($.extend({},{},opts), this)
	this.bridge.init(opts)
	return this.bridge
}
Passport.prototype.setName = function(tag){
	this.name = tag + (new Date()).valueOf()
	window.MLSPassport.content[this.name] = this
}


// Source: _transTpl/etic.js
Passport.prototype.etic = function(tpl, data){
	tpl = tpl 
		.replace(/[\r\t\n]/g, " ")
		.split("<\?").join("\t")
		.replace(/((^|\?>)[^\t]*)'/g, "$1\r")
		.replace(/\t=(.*?)\?>/g, "',$1,'")
		.split("\t").join("');")
		.split("\?>").join("p.push('")
		.split("\r").join("\\'")

	try{
		var fn = new Function("",
			"var p=[];p.push('" + tpl + "');return p.join('');");
	}catch(e){
		if (console){
			console.log(e)
			console.log(tpl)
		}
	}

	if (data){
		try{
			return fn.apply( data )
		}catch(e){
			if (console){
				console.log(e)
				console.log(data)
				}
			}
	}else
		return fn
};

// Source: _transTpl/shareTmp.js
Passport.prototype.shareTmp = function(obj, data){
	data = data || Object;
	try{
		var shareTpl = this.etic(obj,data); 
	}catch(e){
		fml.debug(e);	
	}
	return shareTpl;
}

// Source: _transTpl/validate.js
function Validate(){
/*******************
*data 2012-03-23
*author chudongjie
*email dongjiechu@meilishuo.com
********************/
return {
	/*参数：
	----表单id;
	----规则集:{表单元素id1:{验证规则1=规则参数1:错误提示信息1，
		验证规则2=规则参数2:错误提示信息2, ...}, ...};		//注: email没有参数
	----验证结果样式:{结果样式=显示错误提示css class:cbk};		//注: showmsgbyline多个class参数用空格分开,showmsgforsubmit传入要绑定click的className, cbk为回调函数, showmsgbyone传入要绑定click的className和特定提示位置的className，用'.'隔开
	----可选扩展(options):{'success':elementType=成功css class, 'isExist':{表单元素id1:function(cbk){...}, ...};
	eg: validate('myform',
				{'username':{'req=用户名':'用户名不能为空', 'email':'邮箱不匹配'}},
				{'showmsgbyline=messageBox':'','showmsgforsubmit=submitClass':function(){...}}
				{'success':span=success_class, 'error':span=error_class, 'isExist':{'username':function(cbk){...}, ...}}
				);
	*/
	validate : function(formName, validateRules, showStyle, options){
		var formObj = document.forms[formName];
		if (!formObj) {
			alert('不存在这个表单:'+formName);
			return;
		}
		//验证规则集合
		var ruleSet = {'req':validateRequired,			//必填项			参数: req=表单元素的默认值
					'maxlen':validateMaxLen,			//最大长度			参数: maxlen=长度值
					'minlen':validateMinLen,			//最小长度			参数: minlen=长度值
					'email':validateEmail,				//验证邮箱			参数: email
					'canEmail':validateSupportEmail,	//验证是否支持邮箱	参数: canEmail='yahoo'
					'mobile':validateMobile,			//验证手机			参数: mobile
					'tel':validateTel,					//验证座机			参数: tel
					'phone':validatePhone,				//验证电话			参数: phone
					'postcode':validatePostcode,		//验证邮政编码		参数: postcode
					'compare':validateCompare,			//验证是否相等		参数: compare=被比较元素name
					'selectmax':validateSelectMax,		//radio最多选几项
					'selectmin':validateSelectMin,		//radio最少选几项
					'selectradio':validateSelectRadio,	//radio必选项
					'contact':validatePhoneOrMobile		//手机或者座机
					};	
		//验证结果样式集合
		var styleSet = {'showmsgbyline':showMsgByLine,		//onblur逐行验证并返回结果
					'showmsgforsubmit':showMsgForSubmit,	//提交表单时一次总验证并返回第一个错
					'showmsgbyone':showMsgByOne};			//一次总验证并在特定位置显示错误信息	showmsgbyone=obj1.obj2
		var msgTipBox = '';
		var formElements = formObj.elements,
			callbacks = [],	//总验证回调队列
			index = 0, //总验证回调队列索引
			itemSetForLine = {};	//用于逐行验证的中间数组

		/*	showStyleFun,			//错误提示的显示方式
			messageItem,			//一次验证的错误信息提示divId, 或者逐行验证的错误提示的class(用于自定义样式)
			stylePos = showStyle.indexOf('=');
		if (stylePos != -1) {
			showStyleFun = styleSet[showStyle.substring(0, stylePos)];
			messageItem = showStyle.substring(stylePos + 1);
		} else {
			showStyleFun = styleSet[showStyle];
		}*/

		if (typeof validateRules!='object') {
			alert('错误, validateRules参数错误... ');
			return;
		}

		for (var itemName in validateRules) {
			var rules = validateRules[itemName],
				itemObj = formElements[itemName];
				itemSetForLine[itemName] = [];
			for (var rule in rules) {
				var pos,
					arg,				//验证规则参数
					err = rules[rule];	//错误提示
				if ((pos=rule.indexOf('='))!=-1) {
					arg = rule.substring(pos+1);
					rule = rule.substring(0, pos);	//update rule
				}
				var ruleFun = ruleSet[rule];
				if (!ruleFun) {
					alert('错误, 不存在这个验证规则');
					return;
				}
				itemSetForLine[itemName][rule] = [ruleFun, arg, err];
			}
		}
		for (var style in showStyle) {
			var s = style.split('=');
			if (s[0] == 'showmsgbyline') msgTipBox = s[1];
			if(s[0] == 'showmsgforsubmit') addSubmit(showStyle[style]);

			styleSet[s[0]](itemSetForLine, s[1], showStyle[style]);	//show error tips
		}


		function addValidate(rules,hideline){
			if(typeof rules !== 'object') return;
			var validObj = {};
			for (var key in rules) {
				if(!itemSetForLine[key]){
					itemSetForLine[key] = [];

					var rule = rules[key];
					for (var item in rule) {
						var infoArr = item.split('=');
						itemSetForLine[key][infoArr[0]] = [ruleSet[infoArr[0]], infoArr[1], rule[item]];
					}
					validObj[key] = itemSetForLine[key];
				}
			};
			if(!hideline){
				showMsgByLine(validObj);
			}
		}

		function addSubmit(fn,end){
			if(end)
				callbacks.splice(0,0,fn);
			else
				callbacks.push(fn);

			resetSubmit()
		}
		function resetSubmit(){
			index = callbacks.length
		}

		//显示成功ICON提示
		function showSuccessIcon(itemObj) {
			if (!options.success) return;
			var suc = options.success.split('=');
			var ele = itemObj.parentNode.getElementsByTagName(suc[0])[0];
			if(ele){
				ele.className = suc[1];
			}
		}
		//显示错误ICON提示
		function showErrorIcon(itemObj) {
			if (!options.error) return;
			var err = options.error.split('=');
			var ele = itemObj.parentNode.getElementsByTagName(err[0])[0];
			if(ele){
				ele.className = err[1];
			}
		}
		function resetItemAll(){
			for (var itemName in itemSetForLine) {
				var itemObj = formElements[itemName];
				resetItem(itemObj)
				}
			}
		function resetItem(itemObj){
			var e = document.getElementById('msg'+itemObj.name);
			e && e.parentNode.removeChild(e);
			if (options.success){
				var suc = options.success.split('=');
				itemObj.parentNode.getElementsByTagName(suc[0])[0].className = '';
				}
			if (options.error){
				var err = options.error.split('=');
				itemObj.parentNode.getElementsByTagName(err[0])[0].className = '';
				}
			}
		function checkItem(itemSet, itemObj, msgItemClass) {
			if (msgTipBox)  msgItemClass = msgTipBox;
			var itemValidate = itemSet[itemObj.name];
			for (var k in itemValidate) {
				var e = document.getElementById('msg'+itemObj.name);
				e && e.parentNode.removeChild(e);
				if (k == 'indexOf') continue; //hack for ie6
				if (!itemValidate[k][0](itemObj, itemValidate[k][1])) {
					showMsgOnLine(itemObj, itemValidate[k][2], msgItemClass);
					return false;
				}
			}
			if (options.isExist && options.isExist[itemObj.name]) {
				valiedateIsExist(itemObj, msgItemClass, options.isExist[itemObj.name]);
			} else {
				showSuccessIcon(itemObj);
			}
			return true;
		}
		//逐行显示验证错误信息
		function showMsgByLine(itemSet, msgItemClass, cbk) {
			for (var itemName in itemSet) {
				var itemObj = formElements[itemName];
				itemObj.onblur = function(){
					checkItem(itemSet, this, msgItemClass)
				};
				if (itemObj.type === 'checkbox') {
					itemObj.onclick = function() {
						checkItem(itemSet, this, msgItemClass)
					};
				}
			}
			typeof cbk == 'function' && cbk();
		}
		//在targetEl节点后面插入newEl节点
		function insertAfter(newEl, targetEl) {
			cleanWhitespace(formObj);
			var parentEl = targetEl.parentNode;
		//	parentEl.lastChild == targetEl ? parentEl.appendChild(newEl) : parentEl.insertBefore(newEl, targetEl.nextSibling);
			parentEl.appendChild(newEl);
		}
		//清理空白节点--for firefox
		function cleanWhitespace(oEelement) {
			for(var i=0;i<oEelement.childNodes.length;i++) {
				var node=oEelement.childNodes[i];
				if(node.nodeType==3 && !/\S/.test(node.nodeValue)) {
					node.parentNode.removeChild(node);
				}
			}
		}
		//插入错误提示
		function insertTip(itemObj, errTip, msgItemClass) {
			if (typeof errTip != 'string') return;
			if (errTip === '') {
				showSuccessIcon(itemObj);
				return;
			}
			showErrorIcon(itemObj);
			var tips = getElementsByClass(msgItemClass);
			// for (var i=0,len=tips.length; i<len; i++) {
			// 	tips[i].parentNode.removeChild(tips[i]);
			// }
			var messageBox = document.createElement('div');
			messageBox.setAttribute('id', 'msg'+itemObj.name);
			messageBox.className = msgItemClass;
			messageBox.innerHTML = '<span></span>' + errTip;
			insertAfter(messageBox, itemObj);
		}
		//在表单元素右侧显示错误提示信息----在itemObj节点的父节点div后面插入错误提示
		function showMsgOnLine(itemObj, err, msgItemClass) {
			var insertTips = function(errTip){
				insertTip(itemObj, errTip, msgItemClass);
			}
			if (typeof err == 'function') {
				err(insertTips);
				return;
			}
			insertTips(err);
		}
		//只在特定位置显示一条错误提示信息
		function showMsgByOne(itemSet, msgItemClass, cbk) {
			var msgClass = msgItemClass.split('.');
			var msgItem = getElementsByClass(msgClass[0], formObj)[0];
			msgItem.onclick = function() {
				for (var itemName in itemSet) {
					var itemObj = formElements[itemName];
					var itemValidate = itemSet[itemObj.name];
					for (var k in itemValidate) {
						if (k == 'indexOf') continue; //hack for ie6, Array prototype
						if (!itemValidate[k][0](itemObj, itemValidate[k][1])) {
							getElementsByClass(msgClass[1], formObj)[0].innerHTML = itemValidate[k][2];
							return;
						}
					}
				}
				typeof cbk === 'function' && cbk();
			}
		}

		function next(){
			if(index == 0) return;

			var cbk = callbacks[--index]
			typeof cbk === 'function' && cbk();
		}

		var timeoutID;
		//提交表单时的总验证————msgItemClass add click event
		function showMsgForSubmit(itemSet, msgItemClass) {
			var msgItem = getElementsByClass(msgItemClass)[0];
			msgItem.onclick = function() {
				for (var itemName in itemSet) {
					var itemObj = formElements[itemName];
		//			var suc = options.success.split('=');
		//			var sucIcon = itemObj.parentNode.getElementsByTagName(suc[0])[0];
		//			if (sucIcon && sucIcon.className == suc[1]) continue;	//not to validate success item
					if(!itemObj.getAttribute('novalid')){
						if (!checkItem(itemSet, itemObj, msgItemClass)) return;
					}
				}


				clearTimeout(timeoutID);
				//to prevent submit function
				timeoutID = setTimeout(function(){
					for (var itemName in itemSet) {
						var itemObj = formElements[itemName];
						var err = options.error.split('=');
						var errIcon = itemObj.parentNode.getElementsByTagName(err[0])[0];
						if (errIcon && (errIcon.className == err[1] || errIcon.className == '')) return;
					}
					resetSubmit()
					next()
				}, 500);
			}
		}
		//
		function getElementsByClass(searchClass, domNode, tagName) {
			if (domNode == null) domNode = document;
			if (tagName == null) tagName = '*';
			var el = new Array();
			var tags = domNode.getElementsByTagName(tagName);
			var tcl = " "+searchClass+" ";
			for(var i=0,j=0; i<tags.length; i++) {
				var test = " " + tags[i].className + " ";
				if (test.indexOf(tcl) != -1)
					el[j++] = tags[i];
			}
			return el;
		}
		/*********验证规则集***********/
		
		function validateRequired(itemObj, defaultVal) {
			var itemVal = itemObj.value;
			return (itemVal!=''&&itemVal!=defaultVal);
		}
		function validateMaxLen(itemObj, maxLen){
		   return (itemObj.value.length <= maxLen);
		}
		function validateMinLen(itemObj, minLen){
			return (itemObj.value.length >= minLen);
		}
		function validateEmail(itemObj){
		//	var re = /\S+@\S+\.\S+/;
			var re = /^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
			return re.test(itemObj.value);
		}
		function validateMobile(itemObj){
			// var re = /^(1(([3458][0-9])|(76)))\d{8}$/;
			var re = /^\d{11}$/;
			return re.test(itemObj.value)
		}
		function validateTel(itemObj){
			var re = /^(([0\+]\d{2,3}-)?(0\d{2,3}-?)|400|800)(\d{7,8})(-(\d+))?$/;
			return re.test(itemObj.value)
		}
		function validatePhone(itemObj){
			return (validateMobile(itemObj) || validateTel(itemObj))
		}
		function validatePostcode(itemObj){
			var re =/^[0-9]{6}$/;
			return re.test(itemObj.value)
		}
		function validateSupportEmail(itemObj, emailName) {
			var emails = {
				'yahoo' : ['@yahoo', '@ymail']
			}
			if (!(emailName in emails)) return true;
			var flag = true;
			var email = emails[emailName];
			for (var i = email.length; i--; ) {
				if (itemObj.value.indexOf(email[i]) > -1) {
					flag = false;
					break;
				}
			}
			return flag;
		}
		function validateCompare(itemObj, compareItem) {
			var comparedItemVal = document.forms[formName].elements[compareItem].value;
			if(comparedItemVal == '' || itemObj.value == '') return true;
			return (itemObj.value === comparedItemVal);
		}
		function validateSelectMax(itemObj, maxNum) {
			var num = 0;
			for (var r in itemObj) {
				itemObj[r].checked && num++;
			}
			return (num < maxNum);
		}
		function validateSelectMin(itemObj, minNum) {
			var num = 0;
			for (var r in itemObj) {
				itemObj[r].checked && num++;
			}
			return (num > minNum);
		}
		function validateSelectRadio(itemObj) {
			return itemObj.checked;
		}
		/********扩展********/
		function valiedateIsExist(itemObj, msgItemClass, cbk) {
			cbk(function(errTip){
				insertTip(itemObj, errTip, msgItemClass);
			});
		}
		function validatePhoneOrMobile(itemObj){
			return validatePhone(itemObj) || validateMobile(itemObj);
		}

		return {
			resetForm :resetItemAll,
			next:next,
			addValidate : addValidate,
			addSubmit : addSubmit
		}
	}//end validate()
};//end return
}

// Source: _transTpl/bridge.js
!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.bridge = Bridge

function Bridge(opts){
	this.bridge_domain = 'meilishuo.com'
}

Bridge.prototype.send = function(params){
	var mSelf = this
	var url = window.location.href
	params = this.getParams(params || url)

	var action = params.action ||''
		, action_type = action.split('|')[0]

	switch(action_type){
		case 'ajax' :
			var cbk = window.top.MLSPassport.callbacks[params.action]
			cbk && cbk(params.res)

			break;

		case 'cookie' :
			mSelf.setCookie(params.cookie)
			
			break;

		default:
			break;
	}

	return this;
}

Bridge.prototype.setDomain = function(){
	document.domain = this.bridge_domain
	return this;
}

Bridge.prototype.setCookie = function(cookie){
	this.cookie.set(cookie.key, cookie.value, {
		domain:cookie.domain
		,duration:cookie.expire
	})
}


// Source: _transTpl/cookie.js
Bridge.prototype.cookie = (function(){
//for cookie
//args:opts---domain,path,duration,secure
//eg: setCookie('key','value',{path:'/', duration:'100'})
var Cookie = {
	cookieArr : {},
	options : {'domain':'.meilishuo.com', 'path':'/'},
	setCookie : function(key, value, opts) {
		opts = opts || {};
		var line = key + '=' + encodeURIComponent(value); 
		opts.domain || (opts.domain = this.options.domain);
		opts.path || (opts.path = this.options.path);
		line += '; domain=' + opts.domain;
		if (opts.path) {
			line += '; path=' + opts.path;
		}
		if (opts.duration) {
			var expires = new Date;
			expires.setTime(expires.getTime() + opts.duration * 1000);
			line += '; expires=' + expires.toGMTString();
		}
		if (opts.secure) {
			line += '; secure';
		}
		return document.cookie = line + ';';
	},
	getCookie : function(key) {
		this.cookieArr[key] = this.cookieArr[key] || (function(){
			var arr = window.document.cookie.match('(?:^|;)\\s*' + key.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1') + '=([^;]*)');
			return arr ? decodeURIComponent(arr[1]) : undefined;
		})();
		return this.cookieArr[key];
	},
	removeCookie : function(key) {
		return this.setCookie(key, '', {duration: -1});
	}
};

return {
	set : function(key, value, opts) {
		return Cookie.setCookie(key, value, opts);
	},
	get : function(key) {
		return Cookie.getCookie(key);
	},
	remove : function(key) {
		return Cookie.removeCookie(key);
	}
};
})();


// Source: _transTpl/params.js
Bridge.prototype.getParams = function(url){
	if(url == '') return '';
	var options = {};
	var name,value,i;
	var paramsStart = url.indexOf('?')+1;
	var paramsEnd = url.indexOf('#')==-1?url.length:url.indexOf('#');
	var str = url.slice(paramsStart, paramsEnd);
	//var str = url.substr(params + 1);
	var arrtmp = str.split('&');
	for(var i=0 , len = arrtmp.length;i < len;i++){
		var paramCount = arrtmp[i].indexOf('=');
		if(paramCount > 0){
			name = arrtmp[i].substring(0 , paramCount);
			value = arrtmp[i].substr(paramCount + 1);
			try{
			if (value.indexOf('+') > -1) value= value.replace(/\+/g,' ')
			options[name] = decodeURIComponent(value);
			}catch(exp){}
		}
	}
	delete options['frm'];
	return options;
}


// Source: _transTpl/bridge2.js
Bridge.prototype._iframes = {}
Bridge.prototype._callbacks = {}
Bridge.prototype._loadedCssFiles = {}

Bridge.prototype.init = function(opts){
	var mSelf = this
	this.opts = opts ||{}
	this.proxy = this.opts.proxy //代理 https等
	this.protocol = this.proxy ? 'http://' : document.location.protocol + '//' //当前协议
	this.domain = this.getUrl(document.location.href) //当前域名

	var _hosts = {
		"https://":{
			"jcstatic":this.fixUrl(this.opts.jcstatic || 'account.meilishuo.com')//静态域名
			,"domain":this.fixUrl(this.opts.domain || 'account.meilishuo.com')//passport接口域名
			,"captcha":this.fixUrl(this.opts.captcha || 'account.meilishuo.com') + "/Register/Captcha?token=asde39ad9"
		}
		,"http://":{
			"jcstatic":this.fixUrl(this.opts.jcstatic || 's.meilishuo.net')
			,"domain":this.fixUrl(this.opts.domain || 'www.meilishuo.com')
			,"captcha":this.fixUrl(this.opts.captcha || 'captcha.meilishuo.com') + "/Register/Captcha?token=asde39ad9"
		}
	}
	this.hosts = _hosts[this.protocol] || _hosts['http://']

	if(this.proxy){
		for(var i in this.hosts){
			this.hosts[i] = this.proxy + encodeURIComponent(this.hosts[i])
		}	
	}

	this.blank = this.opts.blank

/*
	if(this.protocol == 'https://')
		this.bridge_type = 0

	else */if(this.fixUrl(this.domain.hostDomain) == this.hosts.domain)
		this.bridge_type = 0

	else if(this.domain.rootDomain == this.bridge_domain)
		this.bridge_type = 1

	else
		this.bridge_type = 2

//console.log(this.domain.rootDomain, this.bridge_domain)
//alert(this.bridge_domain)
//alert(this.bridge_type)

	window.MLSPassport.callbacks = mSelf._callbacks ||{}
}

Bridge.prototype.loadCssFile = function(url,cbk){
	var url = this.hosts.jcstatic + url
	if(!this._loadedCssFiles[url]){
		this._loadedCssFiles[url]=true;
		var link=document.createElement("link");
		link.rel="stylesheet";
		link.type="text/css";
		link.href=url;
		cbk && (link.onload = cbk)
		document.getElementsByTagName("head")[0].appendChild(link)

	}else{
		cbk && cbk()	
	}
	return this;
}

Bridge.prototype.setCookies = function(cookies){
	var mSelf = this
	for(var i = 0; i < cookies.length; i++){
		var cookie = cookies[i]	

		if('.'+this.bridge_domain == cookie.domain){
			mSelf.setCookie(cookie)

		}else{
			var action = 'cookie|'+cookie.domain
			var src = this.blank + '?' + this.http_build_query({
					action:action
					, cookie : this.http_build_query(cookie)
				})

			this.addIframe(action,src)
		}
	}
}

Bridge.prototype.addWatch = function(fn){
	!this.watchs && (this.watchs = [])
	this.watchs.push(fn)

	return this;
}
Bridge.prototype.watch = function(res){
	!this.watchs && (this.watchs = [])
	var len = this.watchs.length

//	console.log('all', this.watchs, len);
	for(var i = 0; i < len; i++){
		//console.log('watching',i, len,this.watchs[i]);
		this.watchs[i](res)
	}	
	return this;
}


// Source: _transTpl/iframe.js
Bridge.prototype.addIframe = function(action,src,opts){
	var ifr = this._iframes[action]
	var opts = opts||{}

	var data = opts.data || {}
	data.timestamp = (new Date()).valueOf()

	src+=(/\?/.test(src)?'&':'?')+this.http_build_query(data)

	if(ifr){
		ifr.src = src

	}else{
		ifr = document.createElement('iframe');
		ifr.style.display = 'none';
		ifr.src = src
		document.body.appendChild(ifr);

	}
	this._iframes[action] = ifr

	opts.callback && (this._callbacks[action] = opts.callback)

}

Bridge.prototype.removeIframe = function(action){
	var ifr = this._iframes[action]
	if(ifr){
		document.body.removeChild(this._iframes[action])
		delete this._iframes[action]
	}
}

// Source: _transTpl/url.js
Bridge.prototype.getUrl = function(url){
	if(!url) return '';
	if(url == '') return '';
	var options = {
	};
	options = this.getParams(url);
	var tag = document.createElement('A');
	tag.href = url;
	options.hostDomain = tag.host.split(':')[0];
	var rstr = options.hostDomain.replace(/\.(com|cn|net|org)/g,'');
	rstr = rstr.substr(rstr.lastIndexOf('.')+1);
	options.rootDomain = options.hostDomain.substr(options.hostDomain.indexOf(rstr));
	//options.rootDomain = options.hostDomain.substring(options.hostDomain.length , options.hostDomain.indexOf('.') + 1);

//	alert(options.hostDomain)
//	alert(options.rootDomain)

	return options;
}


Bridge.prototype.http_build_query = function(formdata, numeric_prefix, arg_separator){
  // http://kevin.vanzonneveld.net
  // *     example 1: http_build_query({foo: 'bar', php: 'hypertext processor', baz: 'boom', cow: 'milk'}, '', '&amp;');
  // *     returns 1: 'foo=bar&amp;php=hypertext+processor&amp;baz=boom&amp;cow=milk'
  // *     example 2: http_build_query({'php': 'hypertext processor', 0: 'foo', 1: 'bar', 2: 'baz', 3: 'boom', 'cow': 'milk'}, 'myvar_');
  // *     returns 2: 'php=hypertext+processor&myvar_0=foo&myvar_1=bar&myvar_2=baz&myvar_3=boom&cow=milk'
  var value, key, tmp = [];

  var _http_build_query_helper = function (key, val, arg_separator) {
	var k, tmp = [];
	if (val === true) {
	  val = "1";
	} else if (val === false) {
	  val = "0";
	}
	if (val != null) {
	  if(typeof val === "object") {
		for (k in val) {
		  if (val[k] != null) {
			tmp.push(_http_build_query_helper(key + "[" + k + "]", val[k], arg_separator));
		  }
		}
		return tmp.join(arg_separator);
	  } else if (typeof val !== "function") {
		return encodeURIComponent(key) + "=" + encodeURIComponent(val);
	  } else {
		throw new Error('There was an error processing for http_build_query().');
	  }
	} else {
	  return '';
	}
  };

  if (!arg_separator) {
	arg_separator = "&";
  }
  for (key in formdata) {
	value = formdata[key];
	if (numeric_prefix && !isNaN(key)) {
	  key = String(numeric_prefix) + key;
	}
	var query=_http_build_query_helper(key, value, arg_separator);
	if(query !== '') {
	  tmp.push(query);
	}
  }

  return tmp.join(arg_separator);
}

Bridge.prototype.redirect = function(url){
	var isIe = /MSIE (\d+\.\d+);/.test(navigator.userAgent);
	if(!url) location.href = location.href;
	if(isIe){
		var referLink = document.createElement('a');
		referLink.href = url;
		document.body.appendChild(referLink);
		referLink.click();
	}else{
		location.href = url;
	}
}

Bridge.prototype.fixUrl = function(url){
	return this.protocol + url.replace(/^http(s)?:\/\/|\/$/g,'')
}


// Source: _transTpl/ajax.js
Bridge.prototype.ajax = function(url,data,callback,targe){
	var mSelf = this
	var action = 'ajax|'+url+'|'+(new Date()).valueOf()

//	console.log('bridge', mSelf)

	var cbk = function(res){
		mSelf.removeIframe(action)

		if('string' == typeof res)
			try{
				res = $.parseJSON(res) || {}
			}catch(e){
				console.log(e)
			}

		callback(res)
		mSelf.watch.call(targe, res)
	}

	switch(mSelf.bridge_type){
		case 0:
			$.post(mSelf.hosts.domain+'/passport/aw' + url, data, cbk)
			break;

		case 1:
			mSelf.setDomain()

		case 2:

			var src = mSelf.hosts.domain + '/passport/blank'+url
		//	console.log(src)

			data.jcstatic = mSelf.hosts.jcstatic
			data.bridge_type = mSelf.bridge_type
			data.bridge_src = mSelf.blank
			data.action = action

		//	console.log(data)

			mSelf.addIframe(action, src, {data:data, callback:cbk})
			break;

		default:
			break;
	}

	return this;
};


// Source: _transTpl/mobile.js
!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.mobile = Mobile

function Mobile(opts, passport){
	var mSelf = this
	opts = opts || {};
	this.opts = opts
    this.passport = passport || new Passport(opts)

	this.mobile = this.opts.mobile || '0'

	this.passport.setName.call(this, 'mobile')

	this.opts.parents && (this.parents = this.opts.parents)

//	this.opts.watch && this.addWatch(this.opts.watch)

    this.dom = {}

	this.initDom()

	this.doMobile()
	this.setValidate(function(){mSelf.doMobile()});
}

Mobile.prototype.initDom = function(){
	var mSelf = this
	var passport = this.passport
	var tpl = '<div class=\"passport-form-inner\"><form class=\"passport-form\" id=\"mobileForm\" method=\"post\" onsubmit=\"return false\" action=\"\"><?if(this.mobile && this.mobile !== \'0\'){?><div class=\"passport-form-list\"><p class=\"passport-form-item\"><span><?= this.mobile ?></span><input style=\"display:none;\" class=\"passport-form-input\" id=\"mobile\" name=\"mobile\" type=\"text\" value=\"<?= this.mobile ?>\"/></p></div><?}else{?><div class=\"passport-form-list\"><p class=\"passport-form-item\"><input class=\"passport-form-input\" id=\"mobile\" name=\"mobile\" type=\"text\" placeholder=\"<?= this.mobilePlaceholder ?>\" maxlength=\"11\"/><span></span><label for=\"mobile\" class=\"icon-code\"><?= this.mobileLabelText || \'\'?></label></p></div><?}?><div class=\"passport-form-message\"></div><div class=\"sendSMSArea\"><div class=\"passport-form-submit mobileBtn\"><input type=\"submit\" value=\"<?= this.submitBtnText || \'发送验证码\' ?>\"/></div><div class=\"waitBox\"><b></b>秒后可重新发送</div></div></form></div>'

	var ui = {
		mobilePlaceholder:'手机号'
		,name:mSelf.name
		,mobile:mSelf.mobile
	}

	if(this.parents){
		ui.simple = 1	
		this.ui = $.extend({},ui,this.parents.ui)
	}else{
		this.ui = ui	
	}

	var html = this.passport.shareTmp(tpl, this.ui)
	this.dom.outer = $(this.opts.outer || '#mobileBox')
	this.opts.append ? this.dom.outer.append(html) : this.dom.outer.html(html)

	this.dom.inner = this.dom.outer.find('.passport-form-inner')
	this.dom.sendSMSArea = this.dom.outer.find('.sendSMSArea')
	this.dom.mobileBtn = this.dom.sendSMSArea.find('.mobileBtn')
	this.dom.waitBox = this.dom.sendSMSArea.find('.waitBox')
	this.dom.waitNum = this.dom.waitBox.find('b')

	if(this.parents){
		this.dom.msgArea = this.parents.dom.msgArea
	}else{
		this.dom.msgArea = this.opts.append ? this.dom.inner.find('.passport-form-message') : this.dom.outer.find('.passport-form-message')
	}

}

//表单操作
Mobile.prototype.setValidate = function(cbk){
	var validateRules = {}

	if(this.mobile && this.mobile !== '0'){
		
	}else{
		validateRules = {
			'mobile' : {}
		}
		validateRules.mobile['req=' + this.ui.mobilePlaceholder] = '请输入手机号'
		validateRules.mobile['mobile'] = '手机号格式有误'
	}

	var formName = 'mobileForm'
	var showStyle = {
		'showmsgbyline=msg_error' : '',
		'showmsgforsubmit=mobileBtn':cbk
	}
	var opts = {
		'success' : 'span=msg_ok',
		'error': 'span=msg_err'
	}

	this.validate = new Validate().validate(formName, validateRules, showStyle, opts)
}

Mobile.prototype.doMobile = function (){
	var mSelf = this
	var passport = this.passport

	var data = {
		smstype:'active_sm_captcha'
	};

	if(this.dom.sendSMSArea.is('.waiting'))
		return;

	passport.bridge.ajax('/sendsms', data , function(res){
		mSelf.dom.msgArea.html(res.message).show()

		switch(res.error_code){
			case 0 : 
				mSelf.wait(60)
				break;

			default:
				break;
		}

	}, this);
}

Mobile.prototype.wait = function (time){
	var mSelf = this
	mSelf.dom.sendSMSArea.addClass('waiting')

	time = time || 60

	function down(){
		if(time < 0){
			mSelf.dom.sendSMSArea.removeClass('waiting')
			return;
		}

		mSelf.dom.waitNum.text(time--)
		setTimeout(down, 1000)
	}

	down()
}

Mobile.prototype.addWatch = function(watch){
	this.passport.bridge.addWatch.call(this, watch)
}


// Source: _transTpl/risk.js
!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.risk = Risk

function Risk(opts, passport){
	var mSelf = this
	opts = opts || {};
	this.opts = opts
    this.passport = passport || new Passport(opts)

	this.risk_type = this.opts.risk_type || 'pic'
	this.passport.setName.call(this, 'risk'+this.risk_type)
	this.ruleid = this.opts.ruleid

	this.opts.parents && (this.parents = this.opts.parents)
	this.opts.success && (this.success = function(){mSelf.opts.success()})

//	this.opts.watch && this.addWatch(this.opts.watch)

    this.dom = {}

	this.initDom()
	this.initInput()
	this.setValidate(function(){mSelf.doRisk()});

	this.updateCaptcha();
}

Risk.prototype.initDom = function(){
	var mSelf = this

	var ui = {
		captchaPlaceholder:'验证码'
		,risk_type:this.risk_type
		,name:this.name
	}

	if(this.parents){
		ui.simple = 1	
		this.ui = $.extend({},ui,this.parents.ui)
	}else{
		this.ui = ui	
	}

	var tpl = '<div class=\"passport-form-inner\"><?if(this.simple !== 1){?><form class=\"passport-form\" id=\"risk<?= this.risk_type ?>Form\" method=\"post\" onsubmit=\"return false\" action=\"\"><?}?><?if(this.risk_type == \'sms\' || this.risk_type == \'reactive\'){?><div class=\"passport-form-list\"><p class=\"passport-form-item\"><input class=\"passport-form-input\" id=\"captcha\" name=\"captcha\" type=\"text\" placeholder=\"<?= this.captchaPlaceholder ?>\" maxlength=\"6\"/><span></span><label for=\"captcha\" class=\"icon-code\"><?= this.captchaLabelText || \'\'?></label></p></div><?}?><?if(this.risk_type == \'pic\'){?><div class=\"passport-form-list captchaArea\"><div class=\"passport-form-item\"><input class=\"passport-form-input\" id=\"captcha\" name=\"captcha\" type=\"text\" placeholder=\"<?= this.captchaPlaceholder ?>\" maxlength=\"4\" /><span></span><label for=\"captcha\" class=\"icon-code\"><?= this.captchaLabelText || \'\'?></label><div class=\"captchaImage\" onselectstart=\"return false;\"><img width=\"90\" height=\"36\" src=\"http://i.meilishuo.net/css/images/register/blank.jpg\"><span class=\"icon-refresh\"></span></div></div></div><?}?><?if(this.simple !== 1){?><div class=\"passport-form-message\"></div><div class=\"passport-form-submit passport-form-submit-<?= this.name?>\"><input type=\"submit\" value=\"<?= this.submitBtnText || \'立即验证\' ?>\"/></div></form><?}?></div>'
	var html = this.passport.shareTmp(tpl, this.ui)
	this.dom.outer = $(this.opts.outer || '#risk'+this.risk_type+'Box')
	this.opts.append ? this.dom.outer.append(html) : this.dom.outer.html(html)

	this.dom.inner = this.dom.outer.find('.passport-form-inner')
	this.dom.captchaArea = this.dom.outer.find('.captchaArea')
	this.dom.captchaImage = this.dom.captchaArea.find('img')

	if(this.parents){
		this.dom.msgArea = this.parents.dom.msgArea
	}else{
		this.dom.msgArea = this.opts.append ? this.dom.inner.find('.passport-form-message') : this.dom.outer.find('.passport-form-message')
	}

	var isDelay;
	this.dom.captchaArea.on('click', '.captchaImage', function(){
		if(isDelay) return;

		mSelf.updateCaptcha();

		isDelay = 1;
		setTimeout(function(){
			isDelay = 0;
		},500);
	});

}

Risk.prototype.initInput = function(){
	var inputList = ['captcha']
	for(var i = 0; i < inputList.length; i++){
		var inputname = inputList[i]
		this.dom[inputname] = this.dom.outer.find('#'+inputname)
	}
}

//表单操作
Risk.prototype.setValidate = function(cbk){
	var parents = this.parents

	var validateRules = {
		'captcha' : {}
	}
	validateRules.captcha['req=' + this.ui.captchaPlaceholder] = '请输入验证码'

	var formName = 'risk' + this.risk_type +'Form'
	var showStyle = {
		'showmsgbyline=msg_error' : ''
	}
	var opts = {
		'success' : 'span=msg_ok',
		'error': 'span=msg_err'
	}

	if(parents){
		if(parents.validate){
			parents.validate.addValidate(validateRules)
			parents.validate.addSubmit(cbk)

		}else{
			showStyle['showmsgforsubmit=passport-form-submit-' + parents.name] = cbk
			this.validate = new Validate().validate(formName, validateRules, showStyle, opts)
		}

	}else{
		showStyle['showmsgforsubmit=passport-form-submit-' + this.name] = cbk
		this.validate = new Validate().validate(formName, validateRules, showStyle, opts)
	}

}

Risk.prototype.doRisk = function (){
	var mSelf = this
	var validate = this.parents ? this.parents.validate : this.validate

	var data = {
		'app_id' : mSelf.passport.app_id,
		'ruleid' : mSelf.ruleid,
		'captcha': mSelf.dom.captcha.val()
	};

	this.passport.bridge.ajax('/risk'+this.risk_type, data , function(res){
		mSelf.dom.msgArea.html(res.message).show()

		if(res.error_code == 0){
			
			mSelf.success && mSelf.success()

			validate && validate.next()

		}else{
			mSelf.updateCaptcha();
		}

	}, this);
}

Risk.prototype.updateCaptcha = function (callback){
	this.dom.captchaImage.attr('src', this.passport.bridge.hosts.captcha + '&session='+(new Date()).valueOf());
	callback && callback();
}

Risk.prototype.addWatch = function(watch){
	//console.log(this,watch)
	this.passport.bridge.addWatch.call(this, watch)
}


// Source: _transTpl/login.js
!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.login = Login

function Login(opts, passport){

	//location.href = 'http://xhdev.meilishuo.com/passport/cookies/'

	var mSelf = this
	opts = opts || {};
	this.opts = opts
	this.passport = passport || new Passport(opts)

	this.passport.setName.call(this, 'login')
	this.risk_sms_custom = this.opts.risk_sms_custom|0
	this.risk_reactive_custom = this.opts.risk_reactive_custom|0

	this.opts.watch && this.addWatch(this.opts.watch)

	this.dom = {}

	this.passport.bridge.cookie.set('LOGON_FROM' ,  document.referrer);

	this.loginStart = function(){
		mSelf.initDom()
		mSelf.initInput()
		mSelf.setValidate(function(){mSelf.doLogin()});
	}

	this.loginDone = this.opts.loginDone || function(){
	}

	this.checkLogin()
}

Login.prototype.initDom = function(){
	var passport = this.passport

	this.ui = $.extend({},{
			usernamePlaceholder:'邮箱/手机号/昵称'
			,passwordPlaceholder:'密码'
			,name:this.name
		},this.opts.ui)

	var tpl = '<div class=\"passport-form-inner\"><form class=\"passport-form\" id=\"<?= this.name ?>\" method=\"post\" onsubmit=\"return false\" action=\"\"><?if(this.formTitleShow !== 0){?><h3><?= this.formTitleText || \'登录美丽说\' ?></h3><?}?><div class=\"passport-form-list\"><p class=\"passport-form-item\"><input class=\"passport-form-input\" id=\"username\" name=\"username\" type=\"text\" placeholder=\"<?= this.usernamePlaceholder ?>\" /><span></span><label for=\"username\" class=\"icon-user\"><?= this.usernameLabelText || \'\'?></label></p></div><div class=\"passport-form-list\"><p class=\"passport-form-item\"><input class=\"passport-form-input\" id=\"password\" name=\"password\" type=\"password\" placeholder=\"<?= this.passwordPlaceholder ?>\" /><span></span><label for=\"password\" class=\"icon-pwd\"><?= this.passwordLabelText || \'\'?></label></p></div><div id=\"riskpicBox\"></div><div class=\"passport-form-message\"></div><div class=\"passport-form-submit passport-form-submit-<?= this.name?>\"><input type=\"submit\" value=\"<?= this.submitBtnText || \'立即登录\' ?>\"/></div><?if(this.rememberBtnShow !== 0){?><div class=\"btn-remember\"><input type=\"checkbox\" name=\"remember\" id=\"remember\" checked=\"checked\" /><label for=\"remember\"><?= this.rememberBtnText || \'记住我\' ?></label></div><?}?><?if(this.findBtnShow !== 0){?><div class=\"btn-find\"><a href=\"https://account.meilishuo.com/user/findPwd\" target=\"_blank\"><?= this.findBtnText || \'忘记密码？\'?></a></div><?}?><?if(this.registerBtnShow !== 0){?><div class=\"btn-register\"><a href=\"https://account.meilishuo.com/user/register\"><?= this.registerBtnText || \'注册\' ?></a></div><?}?></form></div>'
	this.dom.outer = $(this.opts.outer || '#loginBox').html(passport.shareTmp(tpl, this.ui))
	this.dom.inner = this.dom.outer.find('.passport-form-inner')
	this.dom.msgArea = this.dom.outer.find('.passport-form-message')
}

Login.prototype.initInput = function(){
	var inputList = ['username','password','remember']

	for(var i = 0; i < inputList.length; i++){
		var inputname = inputList[i]
		this.dom[inputname] = this.dom.outer.find('#'+inputname)
	}
}

//表单操作
Login.prototype.setValidate = function(cbk){
	var validateRules = {
		'username' : {},
		'password' : {}
	}

	validateRules.username['req=' + this.ui.usernamePlaceholder] = '请输入您的用户名或注册邮箱'
	validateRules.password['req=' + this.ui.passwordPlaceholder] = '请输入密码'
	validateRules.password['minlen=' + 6] = '输入密码需在6位到32位间'
	validateRules.password['maxlen=' + 32] = '输入密码需在6位到32位间'

	var formName = this.name
	var opts = {
		'success' : 'span=msg_ok',
		'error': 'span=msg_err'
	}
	var showStyle = {
		'showmsgbyline=msg_error' : ''
	}

	showStyle['showmsgforsubmit=passport-form-submit-' + this.name] = cbk

	this.validate = new Validate().validate(formName, validateRules, showStyle, opts)
}

Login.prototype.doLogin = function (){
	var mSelf = this
	var passport = this.passport
	var data = {
		'app_id' : passport.app_id,
		'username' : mSelf.dom.username.val(),
		'password' : mSelf.dom.password.val(),
		'remember' : mSelf.dom.remember[0].checked ? 1 : 0
	};
	console.log('doLogin')

	passport.bridge.ajax('/login', data , function(res){

		mSelf.dom.msgArea.html(res.message).show()

		switch(res.error_code){
			case 0 : 
				console.log('session',res.data.session)
				res.data.session && passport.bridge.setCookies(res.data.session)

				console.log('redirect',res.data.redirect)
				res.data.redirect && passport.bridge.redirect(res.data.redirect)
				
				break;

			case 1004 : 
				mSelf.ruleid = res.data.ruleid

				if(!mSelf.risk_sms_custom){
					if(res.data.mobile && res.data.mobile !== '0'){
						if(!mSelf.mobileAndSMSRisk){
							mSelf.mobileAndSMSRisk = passport.getMobileAndSMSRisk({
								ruleid:mSelf.ruleid
								,mobile:res.data.mobile
							})
						}
					}
				}

				break;

			case 1005 : 
				mSelf.ruleid = res.data.ruleid

				if(!mSelf.riskpic){

					mSelf.riskpic = passport.getPicRisk({
						ruleid:mSelf.ruleid
						, parents:mSelf
					})

				}

				mSelf.riskpic.updateCaptcha()

				break;

			case 1007 : 
				if(!mSelf.risk_reactive_custom){
					if(!mSelf.mobileAndReactiveRisk){
						mSelf.mobileAndReactiveRisk = passport.getMobileAndReactiveRisk({
							ruleid:mSelf.ruleid
							,mobile:res.data.mobile
						})
					}
				}

				break;

			default :
				break;
		}

	}, this);
}

Login.prototype.checkLogin = function(callbacks){
	var mSelf = this
	var passport = this.passport
	passport.bridge.ajax('/init', {app_id:passport.app_id} , function(res){

		mSelf.ruleid = res.data.ruleid

		if(typeof callbacks == 'function'){
			callbacks(res)

		}else{

			switch(res.error_code){
				case 0:
					mSelf.loginDone && mSelf.loginDone(res)
					break;

				case 10001:
					mSelf.loginStart && mSelf.loginStart(res)
					break;

				default:
					break;
			}
		}
	}, this);
}

Login.prototype.addWatch = function(watch){
	this.passport.bridge.addWatch.call(this, watch)
}


// Source: _transTpl/logout.js
!window.MLSPassport && (window.MLSPassport = {});
window.MLSPassport.logout = Logout

function Logout(opts, passport){
	var mSelf = this
	opts = opts || {};
	this.opts = opts
	this.passport = passport || new Passport(opts)

	this.passport.setName.call(this, 'logout')

	this.opts.watch && this.addWatch(this.opts.watch)

	this.dom = {}
	this.dom.outer = $(this.opts.outer || '#logoutBox')

	this.dom.outer.on('click', function(){mSelf.doLogout()})
}

Logout.prototype.doLogout = function (){
	var mSelf = this
	var passport = this.passport
	var data = {
		'app_id' : passport.app_id
	};

	passport.bridge.ajax('/logout', data , function(res){
	}, this);
}

Logout.prototype.addWatch = function(watch){
	this.passport.bridge.addWatch.call(this, watch)
}

})();