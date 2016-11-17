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
