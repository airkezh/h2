/*common*/

var carts = require('wap/app/doota/shopping_carts')
	, sticky = require('wap/component/sticky')

carts.readShopsCount()
sticky.init('.tab_tle', {'infinity': true})

/*
 * 喜欢
 *
 */

 $('#js_love_btn').on('click' ,function(){
 	var $this = $(this)
 		, tid = fml.vars.twitter_id
 		, data = {'stid' : tid}
 		, url = '/aw/twitter/like';

 	if(Meilishuo.config.user_id == '0')
     	window.location.href = '/user/login'

    if($this.hasClass('love_show')) {
    	$this.removeClass('love_show')
    } else {
    	$this.addClass('love_show')
    }

 	$.post(url, data, function(res){
		if(res.data){
			$this.addClass('love_show')
		} else {
			$this.removeClass('love_show')
		}
	}, 'json');

 })
