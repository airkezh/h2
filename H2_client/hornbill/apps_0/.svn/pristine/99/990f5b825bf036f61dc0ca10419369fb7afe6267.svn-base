fml.use(['jquery'] , function(){
	var $ = this.jquery;
	var pop = $('#spread_con');
	var textarea = pop.find('textarea');
	var hidePop = function(){
		textarea.val('');
		pop.hide();
		$(document).unbind('click',hidePop);
	}
	$('.sort_goods , .sp_goods').change(function(){
		$(this).parents('form').submit();
	});
	$('.spread').on('click',function(e){
		var self = $(this),
			link = self.attr('data-link'),
			offset = self.offset(),
			w = self.outerWidth(),
			h = self.outerHeight();

		
		pop.css({
			left:w + offset.left - pop.outerWidth() + 'px',
			top: h + offset.top + 'px'
		}).show();
		textarea.val(link).select().focus();
		$(document).bind('click',hidePop);
		e.stopPropagation();
		e.preventDefault();
	});
	$('#close').click(hidePop);
	pop.click(function(e){
		e.stopPropagation();
		e.preventDefault();
	});
});

fml.define('lm/page/proManage' , [] , function(){});