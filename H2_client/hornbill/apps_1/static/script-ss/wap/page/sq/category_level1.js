/*common*/

require('wap/zepto')
require('wap/zepto/touch')

var $navItems       = $('.nav_item')
var $toggleContents = $('.toggle_content')

$navItems.on('tap', function (){
	var $me = $(this)

	if( $me.hasClass('active') ) return

	$navItems.toggleClass('active')
	$toggleContents.toggle()
})