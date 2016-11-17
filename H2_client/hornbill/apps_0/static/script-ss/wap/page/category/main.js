/*common*/

require('wap/zepto')
var timedown = require('wap/app/doota/timedown')

var end_time = 0
	, start_time = (new Date()).valueOf()/1000
	, skckill_time = fml.vars.seckill_time
	, i = 0
	, k = skckill_time.length

for(; i < k; i++){
	if(skckill_time[i].start_time < start_time && start_time < skckill_time[i].end_time){
		end_time = skckill_time[i].end_time - start_time
		break
	}
}

var sec_1 = $('#sec_1')
	, sec_2 = $('#sec_2')
	, minu_1 = $('#minu_1')
	, minu_2 = $('#minu_2')
	, hour_1 = $('#hour_1')
	, hour_2 = $('#hour_2')

var start_timedown = function(){
	timedown.down('.seckill_timing', +end_time, '0d-0h-0i-0s')
	.onAction(function(t) {
		if(t.s < 10){
			t.s = '0' + t.s
		} else {
			t.s += ' '
		}
		sec_1.html(t.s.slice(0, 1))
		sec_2.html(t.s.slice(1, 2))

		if(t.i){
			if(t.i < 10){
				t.i = '0' + t.i
			} else {
				t.i += ' '
			}
			minu_1.html(t.i.slice(0, 1))
			minu_2.html(t.i.slice(1, 2))
		}

		if(t.h){
			if(t.h < 10){
				t.h = '0' + t.h
			} else {
				t.h += ' '
			}
			hour_1.html(t.h.slice(0, 1))
			hour_2.html(t.h.slice(1, 2))
		}

	})
	.onTimeOver(function(){
		i += 1
		end_time = skckill_time[i].end_time - ((new Date()).valueOf() / 1000)
		if(end_time) start_timedown()
	})
}

start_timedown()
