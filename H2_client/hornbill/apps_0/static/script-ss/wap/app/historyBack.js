/*common*/

require('wap/zepto')

/**
 * @function 页面回退（-1），默认页面为首页
 * @param [zepto 对象] dom [事件绑定元素]
 * @todo 回退的时候，页面不是meilishuo域下的链接
 * @bug 回退后在前进，页面刷新到welcome页
 */
exports.historyBack = function(dom){
	dom.on('click', function(){
		window.history.back()
		setTimeout(function(){
			window.location.href = "/welcome"
		}, 2000)
	})
}

/**
 * 默认事件触发按钮
 *
 */
var $back_btn = $('#back_btn')
if($back_btn){
	exports.historyBack($back_btn)
}




