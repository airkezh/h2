fml.define('component/pwdStrength' , ['jquery'] , function(require , exports){
	var $ = require('jquery');
	var defaults = {
		$input : $('#password')
	   ,$strength : $('.pw_safe')
	   ,cbk : null
	};

	function init(options){
		var opts = $.extend({}, defaults, options);
		var $input = opts.$input
		   ,$strength = opts.$strength

		$input.on('input propertychange', function(){
			calculate($input.val(), $strength, opts);
		});
	}

	function calculate(val, $strength, opts){
		if(!val) return;
		var l = val.length
		   ,s = 0

		/* 显示隐藏密码强度 */
		if(l < 6) { /*小于六位不显示密码强度*/
			$strength.css('visibility','hidden');
			return;
		} else {
			$strength.css('visibility','visible');
		}

		if(l > 8) s += 2; else s += 1; /*位数*/
		if(val.match(/[a-z]/)) s += 1; /*小写字母*/
		if(val.match(/[A-Z]/)) s += 1; /*大写字母*/
		if(val.match(/[0-9]/)) s += 1; /*数字*/
		if(val.match(/[!,@#$%^&*?_~]/)) s +=1; /*特殊字符*/

		if(opts.cbk){
			opts.cbk(s);
		} else {
			if(s >= 2 && s < 4){
			$('.strength_l').addClass('pw_strength_color');
			$('.strength_m').removeClass('pw_strength_color');
			}
			else if(s >= 4 && s < 6){
				$('.strength_m').addClass('pw_strength_color');
				$('.strength_h').removeClass('pw_strength_color');
			}
			else if(s == 6){
				$('.strength_h').addClass('pw_strength_color');
			}
		}
	}

	exports.init = init;
});