fml.define('wap/component/svgBox' , [] , function(require , exports){
	var supportsSVG = (function () {
		return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
      })()
	var w_w = document.documentElement.offsetWidth //window.innerWidth
	if (!supportsSVG){
			var heightSum = 0
		}
	var viewToScreen = supportsSVG ? 
		function(svg){
			var w_c = svg.getAttribute('viewBox').split(' ')
				, h = w_c[3] / w_c[2] * w_w
			svg.setAttribute('height' , h + 'px')
		}: function (svg) {
			var htmlBox = svg.getElementsByTagName('foreignObject')[0]
			
			var htmlEles = htmlBox.childNodes
			var newBox = document.createElement('div')
			newBox.style.cssText = svg.style.cssText
			while (htmlEles.length){
				newBox.appendChild(htmlEles[0])
				}

			var w_c = svg.getAttribute('viewBox').split(' ')
			newBox.style.width = w_c[2] + 'px'
			newBox.style.height =  w_c[3] + 'px'
			svg.parentNode.insertBefore(newBox , svg)
			svg.parentNode.removeChild(svg)
			var s = w_w / w_c[2] 
			var ol = (s-1) * w_c[2]  /2 
			var oh = (s-1) * w_c[3] /2

			newBox.style.transform = 'translate('+ol+'px,'+oh+'px) scale('+s+') '
			newBox.style['-webkit-transform'] = 'translate('+ol+'px,'+oh+'px) scale('+s+') '
			newBox.style['-o-transform'] = 'translate('+ol+'px,'+oh+'px) scale('+s+') '

			newBox.style.position = 'absolute'
			newBox.style.top = heightSum + 'px'
			heightSum += s * w_c[3]
		}
	window.setTimeout(function(){
		var svgs = document.querySelectorAll('svg') 
		for(var i = 0 , j =  svgs.length  ; i<j  ;i++ ){
			viewToScreen(svgs[i])
			}
		
		} , 0)
	return viewToScreen
})
