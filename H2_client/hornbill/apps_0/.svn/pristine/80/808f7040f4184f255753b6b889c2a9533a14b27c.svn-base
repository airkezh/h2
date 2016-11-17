fml.define('wap/app/search40' , ['wap/jquery'] , function(require , exports){
	var search = $('#search')
		, $keyword = search.find('input[name="keyword"]')

	var check = function(){
		search.submit(function(event){
			event.preventDefault();
			var keyword = $.trim($keyword.val())
			if(!keyword)
				return false;
			else{
				window.location.href = '/search/?keyword=' + encodeURIComponent(keyword);	
			}
		})
	}
	exports.check = check;
});
