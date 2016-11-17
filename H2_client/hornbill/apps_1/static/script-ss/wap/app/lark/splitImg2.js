/*common*/
/**
 * @author   yetaozhang
 * @param {opt}
 * @example
 * var ex = require("wap/app/lark/splitImg");
 * var opt = {
 *     "file" : 'base64'
 *     "split" : 3,//切分成3*3的图
 *     "cbk" : function(code , arr){//code为错误码，为1时表示处理错误，arr为空。为0时表示处理正确
 *         alert(arr)
 *     }//回调函数
 * }
 * ex(opt);
 */



return function(opt){

	 
	opt.split = opt.split || 3;
	opt.cbk = opt.cbk || function(arr){
		window._arr = arr;
	}

	var canvas = document.createElement('canvas')

	canvas.style.display = "none";
	document.body.appendChild(canvas);

	var context = canvas.getContext('2d');

	var _img = document.createElement('img');

	_img.onload = function(){

		var _this = this,
            _width = _this.width,
            _height = _this.height,
            _canvas = canvas;

        _width = _width - _width % opt.split;
        _height = _height - _height % opt.split;
        _width > _height ? _width = _height : _height = _width;
        _canvas.setAttribute('width' , _width / opt.split);
        _canvas.setAttribute('height' , _width / opt.split);

        var scale = _width / opt.split,
        	arr = [],_num;

        context.drawImage(_img, 0 , 0);
        for (var i = 0; i < opt.split * opt.split; i++) {
        	_num = i % opt.split;
        	context.clearRect(0,0,_canvas.getAttribute('width') , _canvas.getAttribute('height'));
        	context.drawImage(_img,-(_num)*scale , -((i - _num) / opt.split)*scale);
        	arr.push( _canvas.toDataURL() );
        };
        //console.log(arr);
        opt.cbk(0,arr);
	}

	_img.onerror = function(){
		opt.cbk(1,[]);
	};

	_img.src = opt.file;
}