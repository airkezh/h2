fml.define('component/regString',[],function(require , exports){
    var selectRequestDataShare = null;
	var getStringLengthArr = function(s , len){
		var w = 0;
		var time = 0;
		for(var length = s.length; time<length;){
			var str = '';
		//	if($.browser.msie && $.browser.version == '6.0'){
				str = s.charAt(time);
		//	}else{
		//		str = s[time];
		//	}
			if(/[^\x00-\xff]/.test(str)){
				w+=2;
			}else{
				w+=1;
			}
			time++;
			if(w >= (len*2)){
				break;
			}
		}
		return time;
	};
    return {
        //校验url
        isUrl : function(str_url){
            this.trim(str_url);
            var strRegex = '((^http)|(^https)|(^ftp)):\/\/[-\\w]+\\.(\\w)+';
            var re=new RegExp(strRegex);
            if ( re.test(str_url) ){
                return (true);
            }else{
                return (false);
            }
        },
        //清除字符串首位空格
        trim : function(str){
            return str.trim ? str.trim() : str.replace(/^\s+/ , '').replace(/\s+$/ , '');
        },
        //获取字符串长度 汉字 += 1 字母 += 0.5
        GetStringLength : function(s){
            var w = 0; 
            for (var i=0; i<s.length; i++) {
                var c = s.charCodeAt(i);
                if ((c >= 0x0001 && c <= 0x007e) || (0xff60<=c && c<=0xff9f)) {
                    w += 0.5; 
                }
                else {
                    w += 1;
                }
            };    
            return w;
        },
		getStringLength : function(s){
			return s.replace(/[^\x00-\xff]/g,"**").length / 2;
		},
        //检查字符串长度限制 s = string n = max number
        WidthCheck : function(s, n){ 
            if ( this.GetStringLength(s) > n) {
                return false;
            }
            return true;
        },
        //截取字符串最大限制--效果和node的一样
        cutstrX : function(str , len , pad){
			 if (!str || 0 == str.length) return ''; 
			 if (undefined == pad ) pad = '...';
			 len = getStringLengthArr(str , len);
			 return str.substr( 0 , len) + ((pad && str.length> len) ? pad : '');
		},
        //截取字符串最大限制
        cutstr : function(str , len , pad){
             var str_length = 0; 
             var str_len = 0; 
             str_cut = ''; 
             str_len = str.length; 
			 if (undefined == pad ) pad = '...';
             for(var i = 0; i < str_len; i++){ 
                 a = str.charAt(i); 
                 str_length++; 
                 if(escape(a).length > 4){ 
                     //中文字符的长度经编码之后大于4 
                     str_length++; 
                 } 
                 str_cut = str_cut + a; 
                 if(str_length > len){ 
                     str_cut = str_cut + pad; 
                     return str_cut; 
				} 
             } 
             //如果给定字符串小于指定长度，则返回源字符串； 
             if(str_length <= len){ 
                 return  str; 
             } 
        },
		//替换转义标签
		escapeString : function(s){
			if(!s || s == '') return '';
			return s.replace(/</g , '&lt;').replace(/>/g , '&gt;').replace(/"/g , '&quot;');	
		}
    }
});
