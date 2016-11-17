fml.define('order_pc/common/tab', ['jquery'], function(require, exports) {
	var $ = require('jquery')
	exports.bind = function(opt) {
		var pnl = $(opt.tagPnl)
		var _index = opt.index || 0
		var contents, tabs

		function markInd() {
			$(opt.tabTag, pnl).each(function(k, i) {
				$(i).data('tabI', k)
			})
			contents = $(opt.contents)
			tabs = $(opt.tabTag, pnl)
		}
		markInd()


		pnl.on(opt.actType || 'click', opt.tabTag, function() {

			var ele = $(this)
			var index = ele.data('tabI')

			if (opt.onActive) {
				opt.onActive(_index, index)
			} else {
				tabs.eq(_index).removeClass(opt.activeTagClass)
				ele.addClass(opt.activeTagClass)

				contents.eq(_index).hide()
				contents.eq(index).show()
			}
			opt.onShowed && opt.onShowed(contents.eq(index), _index, index)
			_index = index
			return false

		})
		return {
			'markInd': markInd
		}

	}



})
