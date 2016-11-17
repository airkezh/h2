/*common*/
function KeyStatus(){
	var isKeyDown = false;
	this.on = function(){return isKeyDown=true;}
	this.off = function(){isKeyDown=false;}
	this.isOn = function(){return isKeyDown;}
}
function getCbCode(e){
	return ['cb',e.ctrlKey|0,e.altKey|0,e.shiftKey|0].join('')
}

var bindPress = function(fn){
	/*
	回调命名方式 cb + (ctrl + alt + shift的状态码1/0)
	例如没有任何功能键的回调就是cb000，只按ctrl的是cb100
	fn:{
		keyCode : 38
		,cb000 : function($parent,event){} //cb example
		,parent : '.class' //默认body
		,runDefault : true/false //是否运行按键默认事件，默认false
		,name : '' //event name
	}
	*/
	initFn();
	var s = new KeyStatus(); //key down status
	$(document).on('keydown'+fn.name, fn.parent, function(e) {
		if(isNoKey()) return true;
		if(e.keyCode==fn.keyCode){
			var cbCode = getCbCode(e);
			if(fn[cbCode]){
				if(!fn.runDefault) e.preventDefault();
				if(s.isOn()) return;
				s.on() && fn[cbCode]($(this),e);
				return false;
			}
		}
	}).on('keyup'+fn.name, fn.parent, function(event) {
		s.off();
	});
	function initFn(){
		fn.parent = fn.parent || 'body'; //default parent
		fn.name = fn.name ?  '.'+fn.name:''
	}
	return this;
}
function isNoKey(){
	return fml.vars.saveItem	
}
exports.bindFirstPress = function(fn){
	bindPress(fn)
	var events = $._data(document,'events')
	_sort('keydown')
	_sort('keyup')

	function _sort(eventName){
		if(events && events[eventName]){
			var lastItem = events[eventName].pop()
			events[eventName].splice(0,0,lastItem)
		}
	}
	return this;
}
exports.unbindPress = function(name){
	$(document).unbind('.'+name)
	return this;
}
exports.bindKeyPress = bindPress