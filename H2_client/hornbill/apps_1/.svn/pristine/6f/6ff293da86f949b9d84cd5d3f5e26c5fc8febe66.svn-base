fml.define('wap/app/frame9', ['wap/zepto/touch'] , function(require , exports){
	var navTop = $('#navTop')
		, navCon = navTop.find('ul')
		, n_type = navTop.attr('status')
		, openClosedBtn = navTop.find('.openClosed')
		, navBread = $('#navBread')

	var search = $('#search')
		, searchBtn = $('#searchBtn')
		, cancelBtn = $('#cancelBtn')
		, keyword = search.find('.input')
		, keyword0 = keyword.find('input[name="keyword"]')

	var layout = $('#layout')
		, wrapper = $('#wrapper_main')
		, header = $('#header')

	var catalog = {
		 nav : $('#navRoute')
		, btn : $('#navRouteBtn')
		, scrtop : 0
		, show : function(){
			this.nav.attr('status','show')
			this.btn.attr('status','action')
			this.scrtop = $(window).scrollTop()
	//		wrapper.addClass('eventnone')
			searchBtn.addClass('eventnone')
			keyword0.blur()
		}
		, hide : function(){
			this.nav.attr('status','normal')
			this.btn.attr('status','normal')
			var t = setTimeout(function(){
		//		wrapper.removeClass('eventnone')
				searchBtn.removeClass('eventnone')
			}, 200);
		}
		, bind : function(btn){
			if(btn.attr('status') == 'normal') this.show();
			else this.hide()
		}
	}
	exports.catalog = function(){
		catalog.btn
			.on('tap', function(event){
				event.preventDefault();
				catalog.bind($(this))
			})
	}

	var open = function(){
	//	wrapper.addClass('eventnone')
		navTop.attr('status','open').css({'height':navCon.height()})
		openClosedBtn.attr('status','open')
	}
	var closed = function(type){
		navTop.attr('status',type).css({'height':''})
		openClosedBtn.attr('status','closed')
	}
	var ta = null
		, tn = null;

	var active = function(){
	//	wrapper.addClass('eventnone')
		navTop.addClass('eventnone')
		closed('search')
		searchBtn.attr('status','active')
		search.show()
		var t = setTimeout(function(){
			search.attr('status','active')
		}, 1)

		ta = setTimeout(function(){
			search.removeClass('eventnone')
			ta = null;
		}, 600)
	}
	var normal = function(){
		keyword0.blur()

		navTop.attr('status',n_type)
		openClosedBtn.attr('status',n_type)

		search.attr('status','normal')
		search.addClass('eventnone')
		searchBtn.attr('status','normal')

		tn = setTimeout(function(){
	//		wrapper.removeClass('eventnone')
			navTop.removeClass('eventnone')
			search.hide()
			tn = null;
		}, 600)
	}

	exports.openClosedFn = function(){
		openClosedBtn
			.on('touchstart', function(event){
				event.preventDefault();
			})
			.on('tap', function(event){
				event.preventDefault();
				if($(this).attr('status') == 'closed') open()
				else{
					closed('closed')
			//		var t = setTimeout(function(){
	//					wrapper.removeClass('eventnone')
			//		}, 600)
				}
			})
	}
	exports.searchFn = function(){
		searchBtn
			.on('touchstart', function(event){
				event.preventDefault();
			})
			.on('tap', function(event){
				if($(this).attr('status') == 'normal'){
					if(!tn)
						active()
				}else{
					if(!ta)
						normal();
				}
			})

		cancelBtn
			.on('touchstart', function(event){
				event.preventDefault();
			})
			.on('tap', function(event){
				if(!ta)
					normal();
			})
	}
});
