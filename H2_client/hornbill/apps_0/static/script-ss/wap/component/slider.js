/*common*/

require('wap/zepto')

return function(){
	var slider_item = $('.image_item')
		, slider_wrap = $('.slider_wrap')
		, slider_l = slider_item.length
		, slider_w = slider_item.eq(0).width()
		, slider_btn_timer = ''
		, activi_num = 0

	$('.swipe-wrap').width((slider_l * (4.9 + .3) + .75) + 'rem')
	slider_item.eq(0).css('opacity', '1')

	$('.right_btn_wrap').on('click', function(){
		move(1)
	})
	$('.left_btn_wrap').on('click', function(){
		move(-1)
	})

	var startX = 0
		, startY  = 0
		, moveX = 0
		, moveY = 0
		, disableSlider = false

	$('.slider_wrap').on('touchstart', function(event){
		var touch = event.touches[0]
		startX = touch.pageX
		startY = touch.pageY
		moveX = 0
	}).on('touchmove', function(event){
		moveX = event.touches[0].pageX - startX
		moveY = event.touches[0].pageY - startY

		if(Math.abs(moveY) > Math.abs(moveX)){
			disableSlider = true
		} else {
			return false
		}
	}).on('touchend touchcancel', function(event){
		if(!disableSlider){
			if(moveX > 10){
				move(-1)
			} else if(moveX < -10){
				move(1)
			}
			startX = 0
		}
		disableSlider = false
	})

	function start_timer(){
		clearTimeout(slider_btn_timer)

		$('.slider_btn').css('opacity', .7)
		slider_btn_timer = setTimeout(function(){
			$('.slider_btn').css('opacity', .3)
		}, 1400)
	}

	function check_num(num){
		var activi_num_tmp = activi_num + num

		if(activi_num_tmp < 0 || activi_num_tmp > slider_l-1) return false
		if(activi_num_tmp > slider_l-2){
			$('.right_btn_wrap').hide()
		} else {
			$('.right_btn_wrap').show()
		}
		if(activi_num_tmp < 1){
			$('.left_btn_wrap').hide()
		} else {
			$('.left_btn_wrap').show()
		}

		return true
	}

	function move(num){
		if(!check_num(num)) return

		activi_num += num
		start_timer()

		$('.swipe-wrap').animate({
			translateX: '-' + (5.2 * activi_num) + 'rem'
		}, 'ease-out')
		slider_item.eq(activi_num).animate({opacity: 1}, 'ease-out')
		slider_item.eq(activi_num - num).animate({opacity: .5}, 'ease-in')

		end_move()
	}

	function get_pos(){
		return activi_num
	}

	function get_all_slides(){
		return slider_l
	}

	function end_move(){
		if(get_pos() == get_all_slides() - 1){
			start_detail()
		} else {
			end_detail()
		}
	}
	var start_touch = false
	function start_detail(){
		start_touch = true
	}
	function end_detail(){
		start_touch = false
	}
	var dX = 0
		, mX = 0
		, mY = 0
		, dY = 0
		, disableTouch = false
		, firstTouch = false

	end_move()

	$('.swipe-wrap').on('touchstart', function(event){
		dX = event.touches[0].pageX
		dY = event.touches[0].pageY
		mX = 0
		mY = 0
		firstTouch = false
		disableTouch = false
	}).on('touchmove', function(event){
		if(!start_touch) return ''

		mX = event.touches[0].pageX - dX
		mY = event.touches[0].pageY - dY

		if((!firstTouch || disableTouch) && Math.abs(mY) > Math.abs(mX)){
			disableTouch = true
			return true
		}
		firstTouch = true
		event.preventDefault()

		if(!disableTouch){

			if(mX < 0 && mX > -60){
				slider_wrap.css('transform', 'translateX(' + mX/3.2 + 'px)')
				$('.top_detail_enter_text').html('点击进入宝贝详情')
			} else if(mX <= -60){
				slider_wrap.css('transform', 'translateX(' + mX/3.2 + 'px)')
				$('.top_detail_enter_text').html('释放进入宝贝详情')
			} else {
				slider_wrap.css('transform', 'translateX(0)')
				$('.top_detail_enter_text').html('点击进入宝贝详情')
			}
		}

	}).on('touchend touchcancel', function(){
		if(!start_touch) return ''

		slider_wrap.animate({'transform': 'translateX(0)'}, 400)
		$('.top_detail_enter_text').html('点击进入宝贝详情')
		if(!disableTouch && mX < -60){
			setTimeout(function(){
				window.location.href = $('.top_detail_enter').data('href')
			}, 400)
		}
	})
}
