/*common*/
require('m/zepto')
require('component/snap_svg')

var drawPie = function(opt){
	var defaultOpt = {
		data : [[1,'pc'],[2,'无线']]
		,selector : ''
		,x : 100 //pie的圆心位置
		,y : 100
		,radius : 50
		,innerSize : 0
		,bgColors : ['#f69','#FFDCE7','red','orange']
		,absX : 0 //整个pie包含提示文本全部居中的x
	}
	opt = $.extend({},defaultOpt,opt)
	
	
	var txtMl = 18 //文字说明距离pie的左边距离
		,txtW = 32 //文字说明foreignobj的宽度
		,txtH = 32 //文字说明foreignobj的高度
		,pieW = opt.radius*2 //pie的宽度
		,totalW = pieW+txtMl+txtW
		,maxW = totalW

	if(opt.selector){
		var svg = Snap(opt.selector)
		maxW = $(opt.selector).parent().offset().width //android手机svg取不到width和height
	} else {
		var svgH = pieW>2*txtH?pieW:2*txtH
		var svg = Snap(totalW,svgH)
	}
	/*---居中显示，重新计算pie的圆心位置---*/
	if(opt.absX){
		opt.x = function(){
			if(maxW<=totalW) return opt.radius
			return (maxW-totalW)/2 + opt.radius
		}()
	}
	/*---------------------------------*/
	
	var totalNum = 0
		,currSumNum = 0
		,data = opt.data
		,radianG = svg.paper.g()
		,tipG = svg.paper.g()
		,txtX = opt.x + opt.radius + txtMl
		,txtY = opt.y - opt.radius

	for (var i = 0; i < data.length; i++) {
		totalNum += data[i][0]
	}
	for (var i = 0; i < data.length; i++) {
		drawSector(svg,{x:opt.x,y:opt.y},opt.radius,2*Math.PI*data[i][0]/totalNum,360*currSumNum/totalNum,opt.bgColors[i],opt.innerSize)
		currSumNum += data[i][0]
		drawPieTip(txtX,txtY,'<p class="text_title">'+data[i][1]+'</p>'+'<p class="text_percent">'+ ((100*data[i][0]/totalNum).toFixed(0))+'%</p>' ,opt.bgColors[i])

		txtY +=(txtH+10)
	}
	function drawSector(svg,center,radius,radian,offset,bgColor,innerSize){
		var radius1 = radius //for animate
		radius = 1 //for animate
	    center = center||{
	        x:0,
	        y:0
	    };
	    innerSize = innerSize || 0
	    outerSize = radius - innerSize
	    var tag = radian > Math.PI ? 1 : 0;
	    var p = _getPath(center.x,center.y,radius,radian,radius-innerSize,innerSize)
	    var path = svg.paper.path(p).attr({
	        // 'stroke-width':1,
	        // 'stroke':'#f2f2f0',
	        'fill' :  bgColor,
	        // 'transform':'rotate('+offset+','+center.x+','+center.y+')'
	    });
	    var t = 500
	    Snap.animate([0,0], [offset,radius1], function(v) {
	        // 旋转
	        path.transform(new Snap.Matrix().rotate(v[0],center.x,center.y))
	        var r = v[1]
	        var p = _getPath(center.x,center.y,r,radian,r-innerSize,innerSize)
	    	path.attr('d', p);
	    }, t)

	    radianG.add(path)
	    function _getPath(cx,cy,radius,radian,outerSize,innerSize){
	    	return 'M'+cx+','+cy
	    		+' m0,'+(0-innerSize)
	    		+' l'+'0,'+(0-outerSize) 
	    		+' a'+radius+','+radius+' 0 '+tag+' 1 '+radius*Math.sin(radian) + ',' + (radius-radius*Math.cos(radian))
	    		+' l'+(0-outerSize*Math.sin(radian))+','+outerSize*Math.cos(radian)
	    		+' a'+innerSize+','+innerSize+' 0 '+tag+' 0'+' '+(0-innerSize*Math.sin(radian))+','+(0-innerSize*(1-Math.cos(radian)))
	    }
	}
	function drawPieTip(x,y,txt,color){
		var g = svg.paper.g();
		var rectWidth = 12
		// var circle = svg.paper.circle(x,y,6).attr({'fill':color})
		var rect = svg.paper.rect(x,y,rectWidth,rectWidth,3,3).attr({'fill':color})
		var txtHtml = '<foreignObject width="'+txtW+'" height="'+txtH+'" x="'+(x+rectWidth+10)+'" y="'+y+'">'+txt+'</foreignObject>'
		var txt = Snap.parse(txtHtml)
		// var txt = svg.paper.text(x+12, y+6, txt).attr({
		// 	style: 'font-size:14px;'
		// 	// ,direction : 'rtl'
		// })
		// g.add(circle, txt)
		g.add(rect, txt)
		tipG.add(g)
	}
}

exports.drawPie = drawPie
