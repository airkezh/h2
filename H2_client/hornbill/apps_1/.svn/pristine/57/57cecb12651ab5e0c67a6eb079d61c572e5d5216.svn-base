/*common*/

/**
 * @usefor 动态设置html元素的 font-size ，
 *         使用 rem 适配元素高度
 */

;(function(doc, wd) {
	var docEl = doc.documentElement

	if(!docEl.addEventListener)return

	var resizeEvent = function (){
		var w = docEl.clientWidth

		if(!w) return

		/* keep font-size greater than 12px, for android */
		docEl.style.fontSize = 100 * w/640 + 'px'

		/* force relayout */
		docEl.clientWidth
	}

	var p = doc.createElement('p')
	p.setAttribute('style', 'font-size: 1rem;')

	if(p.style.fontSize != '1rem')return

	wd.addEventListener('resize', resizeEvent, false)

	/* DOMContentLoaded execute */
	resizeEvent()
})(document, window)
