fml.define('app/huodong/520slider',['jquery'],function(require,exports){
	function slider(opt){
		var con = $(opt.con)
			, unit = $(opt.unit) || opt.con.children
			, left_handler = opt.left_handler
			, right_handler = opt.right_handler
			, fluid = opt.fluid || false
			, auto_scroll = opt.auto_scroll === undefined ? opt.auto_scroll : true
			, w = unit.find(':first').outerWidth()
			, content_width = con.outerWidth()
			, num = opt.num
			, timer = null
			, current = 0 
			, prev = 0
			, next = 1
			, force_set_first = false
			, force_set_last = false
			, min_loop = 0
			, reverse = null
			, auto_calculate = false;

		setDefaultCss();
		assembleDom();
		timer = setTimeout(scroll,5000);
		function setDefaultCss(){
			con.css({
				overflow:'hidden'
				, height:unit.outerHeight()+'px'
			}); 
		} 
		function assembleDom(){
			if(num >= unit.length){
				scroll = function(){};
				return ;
			}   
			if(unit.length % num === 0){ 
				min_loop = parseInt(unit.length/num);
			}else{
				min_loop = unit.length; 
			}   
			prev = min_loop;
			var f = document.createDocumentFragment()
			for(var i = 0; i < min_loop; i++){
				var d = document.createElement('div');
				for(var j = 0 ; j < num ; j ++){
					d.appendChild(unit[(i*num+j)%unit.length].cloneNode(true));
				}   
				f.appendChild(d);
				$(d).css({
					left:content_width*i+'px',
					height:unit.outerHeight(),
					position:'absolute'
				}); 
			}
			con.css({
				width:content_width*(min_loop+1)
			})
			con.empty().append(f).append(con.children(':first').clone(true).css({
				left:content_width*min_loop+'px'
			}));
		}
		function scroll(step){
			clearTimeout(timer);
			if(step != -1){
				if(force_set_first){
					con.css({ left:0 });
				}
				con.stop().animate({
					left:-(next)*content_width + 'px'
				});
				current=next;
			}else{
				if(force_set_last){
					con.css({
						left:-min_loop*content_width +'px'
					})
				}
				con.stop().animate({
					left:-(prev)*content_width + 'px'
				});
				current=prev;
			}
			_calculate_next();
			timer = setTimeout(scroll,5000);
		}
		function _calculate_next(){
			force_set_last = false;
			force_set_first = false;
			if(current == 0){
				next = 1;
				prev = min_loop-1;
				force_set_last = true;
			}else if(current == min_loop){
				next = 1;
				prev = current-1;
				current = 0;
				force_set_first = true;
			}else{
				next = current+1;
				prev = current-1;
			}
		}
		function move_left(){
			scroll(-1);	
		}
		function move_right(){
			scroll();
		}
		left_handler.on('click',move_left);
		right_handler.on('click',move_right);
	}
	exports.slider = slider;
});
