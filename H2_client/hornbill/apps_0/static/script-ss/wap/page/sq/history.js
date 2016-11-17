/*common*/

require('wap/zepto')

var RenderTpl = require('wap/component/shareTmp')

if(fml.vars.main && fml.vars.main.data.length > 0){
	var Waterfall = require('circle/component/waterfall')
	var Lazy      = require('m/component/lazyLoad')
	
	var LazyLoad  = Lazy.init({ xpath: '.js-goods-image' })

	LazyLoad.scroll()

	Waterfall.init({
		el: '.js-goods-container',
		tmpl: 'js-goods-tpl',
		url: '/aj/sq/interfaces/history',
		data : { limit: 15 },
		dataName: 'data',
		colNum: 2,
		colGap : '10 4',
		dataFilter: function (data){
			var config      = this._config
			var gData       = data[config.dataName]
			return gData
		},
		onFetchSuccess: function (data){
			var f = this._config.data.frame
			var l = data.length

			if(l === 0 || (f === 0 && l == this.totalNum)){
				$('.js-pull-up').data('status','stop')
				this.destroy()
			}
		},
		onLayoutFinished: function (data, textStatus){
			LazyLoad.load()
		}
	}).start(fml.vars.main)
}else{
	var renderData = {
		jumpBtnText : '快去体验吧',
		prompt: '您还没有浏览记录',
		img : false
	}
	var tplId = 'js-empty-page-tpl'

	$('.js-wrapper').empty()
					.css({ 
						'background-color' : '#f1f1f1',
						'overflow' : 'hidden'
					})
					.append(RenderTpl(tplId, renderData))
}
