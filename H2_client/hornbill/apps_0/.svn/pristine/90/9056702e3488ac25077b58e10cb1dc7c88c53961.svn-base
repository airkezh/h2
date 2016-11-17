/*common*/

//var zepto = require('wap/zepto');

/**
 * @author   yetaozhang
 * @param {opt}
 * @example
 * var fr = require("wap/component/lark/fileReader");
 * fr('loadFileInput');
 */

/*
参考：
http://blog.csdn.net/zk437092645/article/details/8745647
http://blog.csdn.net/jackfrued/article/details/8967667
http://www.uedsc.com/html5-file-api-2.html
http://www.cnblogs.com/xiaoheimao2008/archive/2012/09/14/2684400.html
http://hushicai.com/2014/03/29/html5-du-qu-ben-di-wen-jian.html
http://www.html5rocks.com/en/tutorials/file/dndfiles/
http://blog.csdn.net/fdipzone/article/details/37974511
*/

function fileReader(id){
	return new selector(id)
};

function selector(id){
	this.length = 1;
	this[0] = document.getElementById(id);
}

//onchange
selector.prototype.change = function(fn){  
    //this[0].onchange = fn;
    this[0].addEventListener('change',fn,false)
}

//检查是否是图片类型
selector.prototype.checkImg = function(){  
    var file = this[0].files[0];  
	return /image\/\w+/i.test(file.type) ? true : false
}

//将文件以Data URL形式读入
selector.prototype.readAsDataURL = function(fn){
	var file = this[0].files[0],
    	reader = new FileReader(); 
    
    reader.readAsDataURL(file); 
    reader.onload=function(e){  
        if(fn){ fn(this.result); }
        //return this.result;
    }
}

//将文件以Data Text形式读入
selector.prototype.readAsText =  function(fn){  
	var file = this[0].files[0],
    	reader = new FileReader();  

    reader.readAsText(file);  
    reader.onload=function(e){  
        if(fn){ fn(this.result); }
        //return this.result;
    }
}

//将文件以二进制形式形式读入
selector.prototype.readAsBinaryString = function(fn){  
	var file = this[0].files[0],
    	reader = new FileReader();  

    reader.readAsBinaryString(file);  
    reader.onload=function(e){  
        if(fn){ fn(this.result); }
        //return this.result;
    }
} 

return fileReader;



