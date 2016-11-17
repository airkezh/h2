/*common*/
require('wap/zepto/fastclick');

var posterWall = require('wap/app/posterWalls5')
	, onscroll = require('wap/component/windowScroll')

/*   poster   */
var urlData = {'frame' : 0},
	pullUpAction = function(){
		posterWall.ajaxPoster('/aj/special_goods/list');
	};

posterWall.testPoster0(urlData, pullUpAction);
posterWall.scrollPoster(true);


/*gotop*/
$('.gotop').on("click", function(e) {
	document.body.scrollTop = 0
});
onscroll.bind(gotop, 'gotop');

function gotop(pos, isDown) {
	if (pos < 30) {
		$('.gotop').hide()
	} else {
		$('.gotop').show()
	}
}





