fml.define('wap/app/select' , ['wap/app/dialog','wap/zepto/fastclick'] , function(require,exports){
	return function(opts){
		var defaults = {
			dialogContent : '',
			dialogTitle : '',
			selectWrap : 'select_wrap',
			showHeader : false,
			toCenter : false,
			noScroll : false,
			selectedId : 0,
			store : [],
			dialogWidth : '100%',
			onClose : function(){}
		}
		var opts = $.extend({}, defaults, opts);
		
		var wrap = $('<ul></ul>').addClass(opts.selectWrap)
		var selTpl = ''
			, str = ''
			, store = opts.store
		if(store.length > 0) {
			for(var i=0; i<store.length;i++){
				str += '<li lid='+ store[i].id+ '><span></span>'+ store[i].value +'</li>'
			}
		}
		selTpl = wrap.append(str); 
		
		opts.dialogContent = selTpl;
		var dialog = $.fn.dialog(opts);
		var item = $(wrap).find('li');
		if(item && item.length > 0) {
			item.on('click', function(e) {
				$(this).siblings().children().removeClass('checkState');
				$(this).children('span').addClass('checkState');
				setTimeout(function(){ dialog.close() }, 300);
				if(opts.onClose) opts.onClose(this);
			});
			$(item).each(function(i, data) {
				if(opts.selectedId && opts.selectedId == $(this).attr('lid')){
					$(this).children('span').addClass('checkState');
					return;
				}
			});
		}
	}
});