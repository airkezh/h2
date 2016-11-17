var encrypt = require('./encrypt.js');

/**
 * 用来拿cookie里面的字段，拼凑成zhifu需要的字段
 * access_token: cookies.app_access_token
 * 8969aa337fed045d452e41e0667faac5"
 */
exports.getWrap = function(cookies) {
	var env = /iphone/.test(cookies.mlsApps) ? 2 : 1;
	return {
		source: env + '-5.2',
		access_token: cookies.app_access_token
	}
}

/**
 * 用来将pojo转换成zhifu-rd需要的加密后的字符串形式
 */
exports.getZhifu = function(constant) {

	//发现有空的就删掉
	for(var i in constant){
		if (!constant[i]) {
			delete constant[i];
		}
		if(i == 'modFilePath'){
			delete constant[i];
		}
	}

	var cloneObject = _clone(constant),
		encryptData = encrypt.encryptData(cloneObject);
	return _attachParams(encryptData).substring(1);
}

var _clone = function(constant) {
	var result = {};
	for (var i in constant) {
		result[i] = constant[i];
	}
	return result;
};

var _attachParams = function(constant) {
	var str = '';
	for (var i in constant) {
		str = str + '&' + i + '=' + encodeURIComponent(constant[i])
	}
	return str;
};
