fml.define('app/sizer' , ['jquery', 'component/urlHandle'] , function(require , exports){
	var query = require('component/urlHandle');
	query = query.getParams(window.location.href.toString());

	/*更多按钮是否显示只能在js端控制了*/
	$('.row').each(function(i){
		var self = $(this);
		if(self.find('.items').height() > self.height()){
			self.find('.right_selector .more').show();
		}
		if(i > 3){
			self.addClass('moresizer');
		}
	})

	$('.sort_box .p_submit').on('click', function(){
		var startprice = $('.sort_box .start').val().trim();
		startprice = startprice.length && !isNaN(startprice) ? parseFloat(startprice, 2) : 0;
		var endprice = $('.sort_box .end').val().trim();
		endprice = endprice && !isNaN(endprice) ? parseFloat(endprice, 2) : 0;

		location.href = addUrlParams({'fl_rg_price' : startprice + '~' + endprice , 'page': '0'}, query);
	})
	$('.byother .tag').on('click', function(){
		if($(this).hasClass('selected')){
			$(this).attr('href',removeUrlParams([$(this).data('filterkey')], query));
		}
		return true;
	})
	$('.row .togglebtn').on('click', function(){
		var self = $(this);
		var rowobj = self.parents('.row');

		if(self.hasClass('more')){
			if(!self.is(':hidden')){
				self.hide().parent().find('.retract').css('display', 'inline');
			}
			self.parents('.row').addClass('expended').siblings('.expended').find('.retract').trigger('click');
			
			if(rowobj.hasClass('mulcheck')){
				rowobj.find('.operate_btns').css('display', 'block');
			}else{
				rowobj.find('.operate_btns').hide();
			}
		}else{
			rowobj.find('.items_wraper')[0].scrollTop = 0;
			if(!self.is(':hidden')){
				self.hide().parent().find('.more').show();
			}
			self.parents('.row').removeClass('expended').find('.operate_btns').hide();
			rowobj.removeClass('mulcheck').find('.multiply').show();
		}
	})
	$('.row .multiply').on('click', function(){
		var rowobj = $(this).parents('.row');
		rowobj.addClass('mulcheck').find('.more').trigger('click');
		$(this).hide();
	})

	$('.box_expend span').on('click', function(){
		$(this).hide().siblings().show();
		if($(this).hasClass('more')){
			$('.group_box').find('.moresizer').show();
		}else{
			$('.group_box').find('.moresizer').hide();
		}
	})

	$('.row').find('.items a').on('click',function(){
		var self = $(this);
		var rowobj = self.parents('.row');
		if(rowobj.hasClass('mulcheck')){
			if(!self.hasClass('selected')){ 
				self.addClass('selected');
			}else{
				self.removeClass('selected');
			}
			if(self.parent().find('.selected').length){
				rowobj.find('.operate_btns .mbtn').removeClass('enable').addClass('submit');
			}else{
				rowobj.find('.operate_btns .mbtn').removeClass('submit').addClass('enable');
			}
		}else{
			location.href = addUrlParams(getDynamicObj($(this).parent().data('key'), self.data('value')), query);
		}
	})
	$('.row .mbtn').on('click', function(){
		var self = $(this); 
		if(!self.hasClass('submit')) return;
		var valarr = [];
		self.parents('.row').find('.items a').each(function(){
			if($(this).hasClass('selected')){
				valarr.push($(this).data('value'));
			}
		})
		if(!valarr.length) return false;
		location.href = addUrlParams(getDynamicObj(self.parents('.row').find('.items').data('key'), valarr.join(',')), query);
	})

	$('.row .calloff').on('click', function(){
		$(this).parents('.row').find('.retract').trigger('click');
	})

	$('.filter_wrap').find('.js_delete').on('click', function(){
		location.href = removeUrlParams([$(this).data('key')], query);
	})

	function getDynamicObj(key, value){
		var paramsobj = {'page' : 0};
		paramsobj[key] = value;
		return paramsobj;
	}

	function addUrlParams(obj, query){
		obj = obj || {};
		query = query || {};
		var url = [];
		delete query['frm'];
		for (var k in query){
			if(k in obj) continue;
			url.push( k + '=' + encodeURIComponent(query[k]));
			}

		for(var x in obj){
			if(obj[x] === null) continue;
			url.push( x + '=' + encodeURIComponent(obj[x]) );
		}	

		return '?' + url.join('&');
	}
	function removeUrlParams(obj, query){
		obj = obj || [];
		query = query || {};
		var url = [];
		for (var k in query){
			var isexit = false;
			for(var i=0; i < obj.length; i++){
				if(k==obj[i]){
					isexit = true;
					break;
				}
			}
			if(!isexit){
				url.push( k + '=' + encodeURIComponent(query[k]));
			}
		}
		return '?' + url.join('&');
	}
});
