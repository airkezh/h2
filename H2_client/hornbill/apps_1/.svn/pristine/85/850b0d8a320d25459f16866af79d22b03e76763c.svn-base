/*
*	2014.8.1 黄宗哲根据网上资料整理获得
*/

fml.define('order_pc/common/idValidate',['order_pc/common/areaCode'],function(require, exports){
	var Wi = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2, 1 ];    // 加权因子
	var ValideCode = [ 1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2 ];            // 身份证验证位值.10代表X
	var validate18 = '身份证格式不正确';	//返回的是否符合加权,不能返回bool
	var validate15 = '身份证格式不正确';

	//调用IdCardValidate即可
	var IdCardValidate = function(idCard){
		//去掉首尾空格
		idCard = trim(idCard.replace(/ /g, ""));

		if(idCard.length == 15){
			return isValidateBirthdayBy15IdCard(idCard);
		}else if(idCard.length == 18){
			//得到身份证数组
			var a_idCard = idCard.split("");
			if( isValidateBirthdayBy18IdCard(idCard) &&
			isTrueValidateCodeBy18IdCard(a_idCard) ){
				return true;
			}else{
				return validate18;
			}
		}else{
			return "身份证格式不正确";
		}
	}

	//验证18位最后的验证码是否正确
	//@param a_idCard 身份证号码数组
	var isTrueValidateCodeBy18IdCard = function(a_idCard){
		var sum = 0;
		if(a_idCard[17].toLowerCase() == 'x'){
			a_idCard[17] = 10; //最后一位x存为10，对应valideCode
		}

		for( var i = 0; i < 17; i++){
			//加权求和
			sum += Wi[i] * a_idCard[i];
		}

		var valCodePosition = sum % 11;
		if( a_idCard[17] == ValideCode[valCodePosition] ){

			return true;
		}else{
			return false;
		}
	}

	//验证18位生日是否是有效生日
	//@param idCard18 18位身份证
	var isValidateBirthdayBy18IdCard = function(idCard18){
		//下标是6  取[6, 10)
		var year = idCard18.substring(6,10);
		var month = idCard18.substring(10,12);
		var day = idCard18.substring(12,14);
		//干掉千年虫,用fullyear取年份
		var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
		if(temp_date.getFullYear() != parseFloat(year) 
			|| temp_date.getMonth() != parseFloat(month) - 1
			|| temp_date.getDate() != parseFloat(day) ){
			return false;
		}else{
			return true;
		}
	}

	//验证15位身份证是否有效
	//@param idCard15 15位身份证
	var isValidateBirthdayBy15IdCard = function(idCard15) {
		var year = idCard15.substring(6, 8);
		var month = idCard15.substring(8, 10);
		var day = idCard15.substring(10, 12);
		var temp_date = new Date(year, parseFloat(month) - 1, parseFloat(day));
		// 对于老身份证中的你年龄则不需考虑千年虫问题而使用getYear()方法   
		if (temp_date.getYear() != parseFloat(year) 
			|| temp_date.getMonth() != parseFloat(month) - 1 
			|| temp_date.getDate() != parseFloat(day)) {
			return validate15;
		} else {
			return true;
		}
	}

	//去掉首尾空格
	var trim = function(str){
		return str.replace( /(^\s*)|(\s*$)/g  ,"");
	}

	//判断男女
	var maleOrFemalByIdCard = function(idCard) {
		idCard = trim(idCard.replace(/ /g, ""));  
		if (idCard.length == 15) {
			if (idCard.substring(14, 15) % 2 == 0) {
				return 'female';
			} else {
				return 'male';
			}
		} else if (idCard.length == 18) {
			if (idCard.substring(14, 17) % 2 == 0) {
				return 'female';
			} else {
				return 'male';
			}
		} else {
			return null;
		}
	}

	var getDetailArea = function(idCard){
		var areaCode = require('component/areaCode');
		var code = areaCode.getAreaCode();

		var sixId = idCard.substring(0, 6);
		var tempSID = '';
		var tempCode = '';
		for( var i = 0, j = code.length; i < j; i++ ){
			tempSID = code[i].areaCode;
			if(sixId == tempSID){
				return {
					"province":code[i].province,
					"city":code[i].city
				}
			}else{
				return "查无此地";
			}
		}

	}
	exports.IdCardValidate = IdCardValidate;
	exports.trim = trim;
	exports.maleOrFemalByIdCard = maleOrFemalByIdCard;
	exports.getDetailArea = getDetailArea;

});//define end