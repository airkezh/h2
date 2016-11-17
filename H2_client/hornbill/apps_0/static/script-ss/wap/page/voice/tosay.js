/*common*/
require('wap/zepto');
var iStorage = require('component/iStorage');

var defConf = {
	lan : 'zh',
	tok : iStorage.getCookie('yy_token'),
	ctp : 1,
	cuid : 'test',
	vol : 9
}
var AudioManger = {
	_uri : 'http://tsn.baidu.com/text2audio',
	_opt : { },
	_ins : null,
	getUri : function(){
		return this._uri + '?' + $.param(this._opt);
	},
	getIns : function(){
		if(!this._ins){
			this._ins = new Audio;
			this._ins.volume = 1.0;
			this._ins.autoplay = false;
		}
		return this._ins;
	},
	setOption : function(conf){
		$.extend(this._opt,defConf,conf);
		return this;
	},	
	play : function(){
		var audio = this.getIns();
		audio.src = this.getUri();
		audio.play();
		return this;
	}
}

$('.start').click(function(){
	var tex = $.trim($('.message').val());
	AudioManger.setOption({
		tex : tex
	}).play();
});




          