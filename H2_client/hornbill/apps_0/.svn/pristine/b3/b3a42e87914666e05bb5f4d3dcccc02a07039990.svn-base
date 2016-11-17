fml.define('wap/core/polyfill' , [] , function(){
	Object.defineProperties(Object, {
		'extend': {
			'configurable': true,
			'enumerable': false,
			'value': function extend(what, wit) {
				var extObj, witKeys = Object.keys(wit);

				extObj = Object.keys(what).length ? Object.clone(what) : {};

				witKeys.forEach(function (key) {
					Object.defineProperty(extObj, key, Object.getOwnPropertyDescriptor(wit, key));
					});

				return extObj;
				},
			'writable': true
		},
		'clone': {
			'configurable': true,
			'enumerable': false,
			'value': function clone(obj) {
				return Object.extend({}, obj);
			},
			'writable': true
		}
	});	
	
	})
