fml.define('app/pricefilter' , ['jquery', 'component/urlHandle'] , function(require , exports){
	var query = require('component/urlHandle');
	query = query.getParams(window.location.href.toString());
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
