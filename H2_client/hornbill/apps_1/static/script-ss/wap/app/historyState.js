/*common*/
require('m/zepto/touch')

var data = {}
	, backFn = {}
	, title

var bind = function(dom, clickFn, Fn){
	$('body').on('click', dom,function (event) {
		var url = $(this).attr('href')
		title = url
		backFn[title] = Fn

		!data[title] && (data[title] = {})

		event.preventDefault();
		data[title].url = url 
		history.pushState(data[title], title, event.target.href);

		clickFn && clickFn()
	})
}

$(window).on('popstate', function (event) {
  title && backFn[title] && backFn[title]()
  title = null
});


exports.bind = bind


/*
bind('a', function(){
	console.log(11111111111)
})
*/


