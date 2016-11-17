fml.define('order_app/common/app/dialog' , ['order_app/common/zepto' , 'order_app/common/zepto/touch'] , function(require,exports){
(function($){
	$.extend($.fn , {
		dialog : function(options){
			var defaults = {
				maskId : "maskLayer",
				dialogId : "dialogLayer",
				dialogTitle : "我是标题",
				dialogContent : "",
				dialogWidth : 270,
				dialogHeight : 0,
				showHeader : true,
				toCenter : true,
				noScroll : true,
				onStart : function(){},
				onLoad : function(){},
				onClose : function(){}
			};
			var opts = $.extend({} , defaults , options);
			var noscroll = function(event){
			    event.preventDefault();
			}
			var initDialog = function(){
				$('#'+opts.maskId).remove();
				$('#'+opts.dialogId).remove();
				$(window).off('touchmove' , noscroll);
				opts.onStart(opts);
				mask();
				dialog();
				opts.onLoad(opts);
			};
			var mask = function(){
				var maskLayer = $('<div id="'+opts.maskId+'"></div>');
				$('body').append(maskLayer);
				var width = $(document).width();
				//var height = $(document).height();
				var height = ($(document).height() > $(window).height() ? $(document).height() : $(window).height());
				maskLayer.css({"width":width , "height":height});
			};
			var dialog = function(){
				var dialogTitleStr = '';
				if(opts.showHeader)
					dialogTitleStr = '<div class="dialogTitle"><span class="closeDialog close">关闭</span><span class="dialogTitleText">'+ opts.dialogTitle +'</span></div>';
				
				var dialogLayer = $('<div style="width:'+ opts.dialogWidth +'px" id="'+ opts.dialogId +'" >'+ dialogTitleStr +'<div id="dialogContent" ></div></div>');
				$('body').append(dialogLayer);
				$('#dialogContent').append(opts.dialogContent);
				if(opts.toCenter) 
					toCenter();
				if(opts.noScroll)
					toFixed();
				$('.closeDialog').on('touchstart touchend',function(event){
					event.preventDefault();
				}).on('tap' , function(event){
					event.preventDefault();
					closeDialog();	
				});
			};
			var toCenter = function(){
				var obj = $('#'+opts.dialogId);
				var top = ($(window).height() - obj.height())/2 + $(window).scrollTop();
				var left = ($(window).width() - obj.width())/2;
				obj.css({"top":top , "left":left});
			};
			var toFixed = function(){
				$(window).on('touchmove' , noscroll);
			};
			var closeDialog = function(){
				$('#'+opts.maskId).remove();
				$('#'+opts.dialogId).remove();
				$(window).off('touchmove' , noscroll);
				opts.onClose(opts);
			};
			initDialog();
			return {
				close : function(){
					$('#'+opts.maskId).remove();
					$('#'+opts.dialogId).remove();
					$(window).off('touchmove' , noscroll);
					//closeDialog();
					return this;
				}
			}

		}	
	});
})(Zepto)
});
