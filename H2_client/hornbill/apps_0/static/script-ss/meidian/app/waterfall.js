fml.define('meidian/app/waterfall',['wap/zepto'],function(require , exports){
	var _settings = {
			  'colWidth' : 295
			 ,'containerId' : '.goods_wall'
			 ,'cornerId' :'.corner_notic'
			 ,'offset' : {x : 5 ,y : 8}
			 ,'winH' : $(window).height()
			 ,'autoHeight' : false
		}	
		,container
		,box
		,_data = {
			'totalColNum' : -1 
			,'minHeight' : 0
			,'colWidth' : _settings.colWidth
			,'colsHeight' : []
		} 
		,fragment = document.createDocumentFragment()
		,$pin

	function _dataInit(){
		_data.minHeight = 0
		_data.colsHeight = []
		for (var i = 0 ;i < _data.totalColNum;i++){
			_data.colsHeight[i] = 0
		}
		_preLayout()
	}	
	function _preLayout(){
		var corner = $(_settings.cornerId).eq(0)
		if (!corner[0] ) return

		_data.colsHeight[0] = corner.height() + _settings.offset.y

		corner.css({
			'width' : _data.colWidth + 'px'
			, 'top' : _settings.offset.y
		}).attr('status','show')

		var h = _data.colsHeight[0] < _settings.winH ? _settings.winH : _data.colsHeight[0]
		container.height(h)
	}

	function onLayed(pin, putTo){
		container.append(fragment)
		_data.colsHeight[putTo] += (pin.offsetHeight | 0) + _settings.offset.y
		_data.minHeight = Math.min.apply(Math , _data.colsHeight)
		_data.maxHeight = Math.max.apply(Math , _data.colsHeight)
		var h = _data.maxHeight < _settings.winH ? _settings.winH : _data.maxHeight		
		container.height(h)
	}
	function layout (index , pin , putTo){
		if (!pin || 1 != pin.nodeType) return

		for (var i = 0 ;i < _data.totalColNum;i++ ) {
			if (_data.colsHeight[i] <= _data.minHeight){
				putTo = i
				break
			}	
		}

		pin.setAttribute('col',putTo)
		pin.style.top = _data.colsHeight[putTo] + _settings.offset.y + 'px'
		pin.style.left = putTo * _data.colWidth + 'px'
		fragment.appendChild(pin);
		//_data.colsHeight[putTo] += (pin.attributes['poster_height'].nodeValue | 0) + _settings.offset.y
		//_data.minHeight = Math.min.apply(Math , _data.colsHeight)

		onLayed(pin, putTo)
	}
	var append = function(elems){
		if ($.trim(elems) == '' || _data.totalColNum < 1) return this
		//	console.log(elems)
		$(elems).each(layout)
		//console.log($(elems).find('.list_info').height())
		//console.log(pin[0].offsetHeight)
	}
	var init = function(settings){
		$.extend(_settings , settings)

		container = $(_settings.containerId).eq(0)
		container.width(_settings.containerWidth || $(window).innerWidth)

		_data.totalColNum = fml.vars.poster.totalColNum;

		_data.colWidth = container.width() / _data.totalColNum - 5;
		_data.scale = (_data.colWidth - _settings.offset.x) / (_settings.colWidth - _settings.offset.x)

		_dataInit()

		return this
	}
	var getAttr = function(attr){
		return _data[attr]
	}

	exports.init = init
	exports.append = append
	exports.getAttr = getAttr
})
