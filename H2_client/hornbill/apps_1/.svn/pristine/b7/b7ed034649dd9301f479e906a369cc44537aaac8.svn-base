fml.define('app/easyScroll', ['jquery'], function(require, exports){
	/**
	 * 简单轮播
	 * @author yaoyao
	 * @param  {Obj}
		opt {
			this:轮播移动区域,
			left:左移标签,
			right:右移标签,
			width:小图宽度,
			len:展示帧数,
			time:移动时间间隔,
			turn:是否自动轮播(1为自动轮播),
			time2:自动轮播间隔
		}
	 * @return {Void}
	 * @example
	 * var opt = {
	 	 'this':'.in-mz div',
	 	 'left':'.left-mz',
	 	 'right':'.right-mz',
	 	 'width':'904',
	 	 'len':'3',
	 	 'time':1000,
	 	 'turn':1,
	 	 'time2':3000
	 * }
	 * this(opt);
	 */
	return function(opt){
		'use strict';
		var turn = function(opt){
			var _this =  $(opt.this),
				_type = opt.type,
				_left = parseInt(_this.css('left')),
				_fun = function(){};
			if(_left % opt.width) return;
			if(exports.timer){
				_fun = function(){
					auto();
				}
				clearTimeout(exports.timer);
			}
			_type ?
			(_left === - (opt.width * (opt.len - 1)) && _this.animate({'left' : 0} , opt.time , _fun)) || _this.animate({'left' : _left - opt.width} , opt.time , _fun) :
			(_left === 0 && _this.animate({'left' : - (opt.width * (opt.len - 1))} , opt.time , _fun)) || _this.animate({'left' : _left + opt.width} , opt.time , _fun);
		}
		var auto = function(){
			timer = setTimeout(function(){
				opt.type = 1;
				turn(opt);
			},opt.time2);
		}
		$(opt.left).click(function(){
			opt.type = 0;
			turn(opt);
		});
		$(opt.right).click(function(){
			opt.type = 1;
			turn(opt);
		});
		var timer = 0;
		opt.turn && auto();
	}
});