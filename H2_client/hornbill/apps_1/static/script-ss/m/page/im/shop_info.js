/*common*/
require('m/zepto')
var drawSvg = require('m/component/drawSvg')
drawSvg.drawPie({
	data : [[$('[name=pcOrder]').text()*1,'无线'],[$('[name=mobOrder]').text()*1,'PC']]
	,selector : '#chart_svg'
	,absX : $('#chart_wrapper').offset().width/2
	,y : $('#chart_wrapper').offset().height/2
	,radius : 35
	,innerSize : 18
})
