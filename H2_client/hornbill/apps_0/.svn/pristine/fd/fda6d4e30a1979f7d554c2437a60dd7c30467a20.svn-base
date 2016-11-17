fml.define('app/izoom', ['jquery'], function(require, exports) {
	var $ = require('jquery')

	var _imgData = {}

	function toCenter(img, imgWidth, imgHeight, cw, ch) {
		var img_css = {
			'left': imgWidth > cw ? -(imgWidth - cw) / 2 : 0,
			'top': imgHeight > ch ? -(imgHeight - ch) / 2 : 0
		}

		_imgData.minLeft = cw - imgWidth
		_imgData.minTop = ch - imgHeight

		img.css(img_css)

	}

	function setZoom(container, img, imgWidth, imgHeight) {
		var cw = container.width(),
			ch = container.height();

		img.css('position', 'absolute')
		toCenter(img, imgWidth, imgHeight, cw, ch)
	}

	function clearBar(container, img) {
		container.find('.bar').remove();
		container.find('.slip').remove();
		img.css({
			'width': 'auto',
			'height': 'auto'
		});
	}

	function enableDrag(obj, proper, callback, callOnDrag) {
		var doc = $(document)

		obj.bind('mousedown', function(evt) {
			var _x = evt.clientX,
				_y = evt.clientY;
			var styleX = parseInt(obj.css('left')),
				styleY = parseInt(obj.css('top'));

			var _left = proper.minLeft || 0,
				_top = proper.minTop || 0,
				_right = proper.maxLeft || 0,
				_bot = proper.maxTop || 0;
			doc.bind('mousemove', onMove).bind('mouseup', endMove)

			callOnDrag && 　callOnDrag(styleX, styleY)

			function endMove() {
				doc.unbind('mousemove', onMove).unbind('mouseup', endMove)
			}

			function onMove(evt) {
				if(_left != _right) {
					styleX += evt.clientX - _x

					_x = evt.clientX
					if(styleX < _left) styleX = _left
					else if(styleX > _right) styleX = _right
				}

				if(_top != _bot) {
					styleY += evt.clientY - _y
					_y = evt.clientY
					if(styleY < _top) styleY = _top
					else if(styleY > _bot) styleY = _bot
				}
				obj.css({
					'left': styleX,
					'top': styleY
				})

				callback && callback(styleX, styleY)

				return false;

			}
			return false
		}).css('cursor', 'move')

	}

	function enableResize(container, img, imgWidth, imgHeight) {

		var cw = container.width(),
			ch = container.height()
			var maxScale = 3
		var bw = container.width() - 10 * 2
		var bar = $('<div class="bar" style="position:absolute;left:10px;width:' + bw + 'px;top:10px; z-index:10;"> \
						<div style="position:absolute;left:0;width:100%;background:#ccc;height:8px;border:1px solid #999;"></div> \
					</div>').appendTo(container)
		var init_pos = (bw - 10) / 2
		var slip = $('<div class="slip" style="position:absolute;left:' + init_pos + 'px;cursor:pointer;width:18px;height:18px;border:1px solid #999;top:-4px;background:#ccc"></div>').appendTo(bar)

		var styleX, styleY



		enableDrag(slip, {
			maxLeft: bw - 10
		}, function(pos) {
			var scale = 1;
			if(pos > init_pos) {
				scale = 1 + (pos - init_pos) / (bw / 2) * maxScale
			} else if(pos < init_pos) {
				scale = 1 - (init_pos - pos) / (bw / 2)
				if (imgHeight * scale < ch) {
					scale = ch / imgHeight;
				}
			}
			var niw = imgWidth * scale,
				nih = imgHeight * scale;
			if(niw < cw) {
				niw = cw
				nih = cw * (imgHeight / imgWidth)
			}
//			if(nih < ch) {
//				niw = ch * (imgWidth / imgHeight)
//				nih = ch
//			}

			img.width(niw)
			//toCenter(img , niw ,nih , cw , ch)
			_imgData.minLeft = cw - niw
			_imgData.minTop = ch - nih
			if(_imgData.minLeft > 0) _imgData.minLeft = 0
			if(_imgData.minTop > 0) _imgData.minTop = 0

			if(styleX < _imgData.minLeft) img.css('left', _imgData.minLeft)
			if(styleY < _imgData.minTop) img.css('top', _imgData.minTop)
		}, function(x, y) {
			styleX = parseInt(img.css('left')), styleY = parseInt(img.css('top'))

		})

		slip.css('cursor','pointer')

	}

	exports.init = function(container, imgId) {
		imgId = imgId || ''
		var container = $(container).css('position', 'absolute')
		var img = $('img' + imgId, container).eq(0)
		var t = new Image
		t.onload = function() {
			clearBar(container, img)
			setZoom(container, img, this.width, this.height)
			enableDrag(img, _imgData)
			enableResize(container, img, this.width, this.height)
		}
		t.src = img[0].src

	}

})
