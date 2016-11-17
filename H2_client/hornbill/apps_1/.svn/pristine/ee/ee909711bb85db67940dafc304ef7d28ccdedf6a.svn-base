fml.define('app/huodong/lc' , ['wap/jquery'] , function(require , exports){
	return function(){
		var _wrap = $('.wrap'),
			_h = _wrap.find('.j-hour'),
			_m = _wrap.find('.j-min'),
			_s = _wrap.find('.j-second');
		var _t = setInterval(function(){
			if (_s.html() === '00') {
				if (_m.html() === '00') {
					if (_h.html() === '0') {
						$('.wrap p').hide();
						clearTimeout(_t);
					}else{
						_h.html(_h.html() - 1);
						_m.html('59');
						_s.html('59');
					}
				}else{
					_m.html() > 10 ? _m.html(_m.html() - 1) : _m.html('0' + (_m.html() - 1));
					_s.html('59');
				}
			}else{
				_s.html() > 10 ? _s.html(_s.html() - 1) : _s.html('0' + (_s.html() - 1));
			}
		},1000)
	}
});
