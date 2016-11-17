var crypto = require('crypto');
var JSEncrypt = require('./jsencrypt.js');

var SHA_1 = function(source){
  var shasum = crypto.createHash('sha1');
  shasum.update(new Buffer(source));
  return shasum.digest('base64');
};

var _3DES = {
  generate: function(len){
    len = len || 32;
    var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = chars.length;
    var pwd = '';
    for (i = 0; i < len; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  },
  genkey: function(key, start, end){
    return _3DES.pad(key.slice(start, end));
  },
  pad: function(key){
    for (var i = key.length; i<24; i++){
      key+="0";
    }
    return key;
  },
  encrypt: function(key, input){
    var genKey = _3DES.genkey(key, 0, 24);
    var iv = '12345678';
    var encrypted = "";
    var cip = crypto.createCipheriv('des3', genKey, iv);
    encrypted += cip.update(new Buffer(input), 'binary', 'base64');
    encrypted += cip.final('base64');
    return encrypted;
  }
};

exports.encryptData = function(params, encryptArr){
  if(params && (typeof params).toLowerCase() == 'object'){
    var RSA_PUB_KEY   = 'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQChDzcjw/rWgFwnxunbKp7/4e8w\n/UmXx2jk6qEEn69t6N2R1i/LmcyDT1xr/T2AHGOiXNQ5V8W4iCaaeNawi7aJaRht\nVx1uOH/2U378fscEESEG8XDqll0GCfB1/TjKI2aitVSzXOtRs8kYgGU78f7VmDNg\nXIlk3gdhnzh+uoEQywIDAQAB';
    var encryptArr    = encryptArr || [],
    dataString    = '',
    dataArr       = {} ,
    Arr           = [] ,
    rsaCrypt      = new JSEncrypt(),//实例化RSA加密算法
    _3DES_KEY     = _3DES.generate(24);//生成3DES KEY

    var isInArray = function(item,arr){
      for(var i = 0;i<arr.length;i++){
        if(item == arr[i]){
          return true;
        }
      }
      return false;
    }

    //加密需要加密的字段
    for(var item in params){
      Arr.push(item);
      if(isInArray(item,encryptArr)){
        params[item] = params[item] || '';
        dataArr[item] = _3DES.encrypt(_3DES_KEY, params[item].toString());
      }else{
        params[item] = params[item] || '';
        dataArr[item] = params[item].toString();
      }
    }
    //将字段按照ASC码排序,并生成校验串
    Arr.sort();
    for(var i =0; i < Arr.length; i++){
      dataString += Arr[i] + '=' + dataArr[Arr[i]].toString() + (i==Arr.length-1?'':'&');
    }
console.log('-------::::',dataString)
    try{
      rsaCrypt.setPublicKey(RSA_PUB_KEY);//设置RSA公钥
      dataArr.key  = rsaCrypt.encrypt(_3DES_KEY);//使用RSA加密3DES KEY
//      console.log('_3DES_KEY:'+_3DES_KEY+'  ','key:'+dataArr.key);
    }catch(err){
//      console.log(err.toString());
    }

    //生成SHA-1签名，并取前16位
    dataArr.sign = SHA_1(dataString + _3DES_KEY).substr(0,16);

//    console.log('sign:'+dataArr.sign+'\n');
    return dataArr;
  }
}
