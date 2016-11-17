/*common*/
/**
 * web app
 * @desc: 测试之后在IOS表现不错
 * @todo:
 * 		2、测试稳定性
 * 		3、添加进度条
 * 		4、添加【添加到主屏幕】文案提示
 * 		5、添加【使用用户】GA埋点
 * 		7、下拉刷新
 *
 * @done:
 * 		1、a tag 添加xr参数
 * 		6、控制域名，只有m.meilishuo.com的才展示web app
 */

var $ = require('wap/zepto')

if(window.navigator.standalone){
	var __get_r = window.__get_r || function(a){ return a; }

	$('body').on('click', 'a', function(e){
		if(/^https?\:\/\/(.*fedevot|m|mapp|account)\.meilishuo/.test(this.href)){
			e.preventDefault()
			window.location.href = __get_r($(this).attr('href'), $(this).attr('xr'))
		}
	})
}
