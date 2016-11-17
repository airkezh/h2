fml.define('order_pc/common/shop_new' , ['jquery'] , function(require , exports){
	var $ = require('jquery')
	//auto nav
	var allUl = $('#catagory_list .c_list')
	if(!allUl.length) return;
	var otherUl = $('#cateOthersList')
		,items = allUl.children(':not(:last)')
		,otherItem = allUl.children(':last')
		,allWidth = 0
		,maxWidth = $('#catagory_list').width()
		,otherItemWidth = otherItem.outerWidth(true)

	for (var i = 0; i < items.length; i++) {
		allWidth += items.eq(i).outerWidth(true);
	}
	if(allWidth <= maxWidth){
		otherItem.remove();
	} else {
		allWidth += otherItemWidth;
		while(allWidth>maxWidth){
			var item = allUl.children(':not(:last)').last()
			allWidth -= item.outerWidth(true);
			item.removeClass('c_item')
				.insertBefore(otherItem.find('.arrow'));
		}
	}
	$('#catagory_list').css({
		visibility: 'visible'
	});

})
