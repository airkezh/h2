fml.define('app/huodong/dragline' , ['jquery'] , function(require , exports){
	$ = require('jquery');
	/**
	 * 拖动条方法
	 * @author yaoyao
	 * @param  {[Object]} opt   分割数组，对象数组表示不同的拖动条，内部数组表示每个拖动点需要传出的数值
	 * @param  {[String]} url   发出请求的url
	 * @param  {[Function]} fun   回调函数
	 * @param  {[String]} out   外层元素class名
	 * @param  {[String]} inner 内层拖动条class名
	 * @return {[Void]}
	 * @example
	 * init({0:[
        'type',
        1,
        'haha',
        'all'
    ],1:[
        'type',
        1,
        'haha',
        'all'
    ],2:[
        'type',
        1,
        'haha',
        'all'
    ]},'www.baidu.com',function(){
        alert(123);
    },'out','inner');
	 */
	var init = function(opt,url,fun,out,inner){
	    $('.' + inner).on('mousedown',function(){
	        var _this = $(this).parents('.' + out);
	        _this.on('mousemove',_move);
	    });
	    $('.joinbox').on('mouseup',function(e){
	        var n = -1;
	        for(var i in opt[$('.' + out).index($(this))]){
	            n++;
	        }
	        n = Math.round($('.' + out).width() - $('.' + inner).width()) / n;
	        var _this = $('.' + out);
	        var _len = e.pageX - _this.offset().left - _this.find('.' + inner).width() / 2;
	        _len = _len > (_this.offset().left + _this.width()) ? (_this.offset().left + _this.width()) : _len;
	        var _num = Math.round(_len / n);
	        _this.off('mousemove',_move);
	        var data = {};
	        var _type = {0 : 'scale', 1 : 'bright', 2 : 'degree'};
	        for (var i = 0; i < 3; i++) {
	            var all = $('.' + inner).eq(i);
	            data[_type[i]] = opt[i][Math.round(parseInt(all.position().left) / ((all.parent('div').width() - all.width()) / (opt[i].length - 1)))];
	        };
	        data.t = +(new Date());
	        data.src = Meilishuo.config.mbl_pic;
	        $.get(url,data, fun , 'json');
	    })
	    var _move = function(e){
	        var n = -1;
	        for(var i in opt[$('.' + out).index($(this))]){
	            n++;
	        }
	        n = Math.round($('.' + out).width() - $('.' + inner).width()) / n;
	        var _this = $(this).find('.' + inner),
	            _num = Math.round((e.pageX - _this.parents('.' + out).offset().left - _this.width() / 2) / n);
			var left = _num * n;
			if(left<=208) _this.css('left', left + 'px');

	    }
	    var _show = function(num){
	        alert(opt[num])
	    }
	};

	exports.init = init;
});
