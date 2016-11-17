fml.define('component/dragdrop',['jquery'],function(require){
	var $ = require('jquery');
	var d = $(document);
	$.fn.draggable = function(opt){
		// set mark draggable
		var self = $(this).data('draggable','1');
		// temp variables
		var parent = null;
		var pos = null;
		var offset = null;
		var ori_css = null;
		var dragging = false;
		if($(opt.appendTo).length){
			opt.appendTo = $(opt.appendTo);
		}else{
			opt.appendTo = self.parent();
		}
		function start(e){
			if($(e.target).closest(opt.except).length == 1) return;
			if(dragging) return;
			dragging = true;
			d.on('mousemove',move);
			d.on('mouseup',stop);
			self.data('dragging',1);
			typeof opt.start == 'function' && opt.start.call(self,e);
			parent = self.parent();
			offset = self.offset();
			ori_css = {
				position:self.css('position'),
				top:self.css('top'),
				left:self.css('left')
			};
			pos = {
				x:e.clientX + $(document).scrollLeft(),
				y:e.clientY + $(document).scrollTop()
			};
			if(opt.replace){
				$(opt.replace).insertBefore(self).show();
				for(var i = 0 ; i < opt.replace_css.length ; i ++) {
					var css = opt.replace_css[i];
					$(opt.replace).css(css,self.css(css));
				}
			}
			self.appendTo(opt.appendTo).css({
				position:"absolute",
				top:offset.top +'px',
				left:offset.left + 'px'
			});
		}
		function stop(e){
			if(!self.data('dragging')) return ;
			self.data('dragging',0);
			d.unbind('mousemove',move);
			d.unbind('mouseup',stop);
			typeof opt.stop == 'function' && opt.stop.call(self,e);
			if(opt.replace){
				$(opt.replace).hide();
			}
			!opt.do_not_restore && ori_css && self.css(ori_css);
			dragging = false;
		}
		function move(e){
			if(typeof opt.move == 'function')opt.move.call(self,e);
			if(opt.axis == 'y'){
				self.css({
					top: offset.top + e.clientY + d.scrollTop() - pos.y + 'px'
				});
			}else if(opt.axis == 'x'){
				self.css({
					left:offset.left  + e.clientX + d.scrollLeft() - pos.x + 'px'
				});
			}else{
				self.css({
					left:offset.left  + e.clientX + d.scrollLeft() - pos.x + 'px',
					top: offset.top + e.clientY + d.scrollTop() - pos.y + 'px'
				});
			}
		};
		var el = opt.handle ? self.find(opt.handle) : self;

		el.on('mousedown',$.proxy(start,self));
	};
});
