fml.define('wap/page/biz/beauty_sale', ['wap/zepto/touch', 'wap/component/lazyLoad', 'wap/component/shareTmp', 'wap/app/tracking', 'wap/app/doota/timedown'], function(require, exports){
	var shareTmp = require('wap/component/shareTmp');
	var posLoad = require('wap/component/lazyLoad');
	var logTrack = require('wap/app/tracking');
	window.timedown = require('wap/app/doota/timedown');

	$('.tab_prev').on('touchstart touchend', function(event){
		event.preventDefault();
	}).on('tap', function(){
		var prev_num = $(this).attr('data');
		if(prev_num == 2) $(this).hide();
		if(prev_num < 2) $('.tab_next').show();
		$(this).attr('data', +prev_num+1);
		$('.tab_next').attr('data', 3-prev_num);
		$('.seckill_inner').css('margin-left', '-' + (2-prev_num)*100 + '%');
	});
	$('.tab_next').on('touchstart touchend', function(event){
		event.preventDefault();
	}).on('tap', function(){
		var next_num = $(this).attr('data');
		if(next_num == 2) $(this).hide();
		if(next_num > 0) $('.tab_prev').show();
		$(this).attr('data', +next_num+1);
		$('.tab_prev').attr('data', 3-next_num)
		$('.seckill_inner').css('margin-left', '-' + next_num*100 + '%');
	});

	var $poster = $('.poster'),
		pullUp = $('.pullUp');

	var fragment = {
		'fragment0' : document.createDocumentFragment(),
		'fragment1' : document.createDocumentFragment(),
		'fragment2' : document.createDocumentFragment()
	};

	if(fml.vars.poster0 && fml.vars.poster0.data){
		fml.vars.poster0.r = fml.vars.r+'.mask';
		var tpl = shareTmp('posterWall', fml.vars.poster0);
		pullUp.hide();
		$poster.append(tpl);
		posLoad.load($poster.find('.bs_load_img'), 'asrc');
	}
	$('.poster_tab div').on('tap', function(){
		var $goods_units = $('.goods_units');
		var act_num = $('.p_tab_active').attr('data_id');
		var num = $(this).attr('data_id');
		$('.poster_tab .p_tab_active').removeClass('p_tab_active');
		$(this).addClass('p_tab_active');
		$('.tab_bwrap .tab_choosed').attr('class', 'tab_choosed tab'+num);

		logTrack.cr('beauty_sale820', {'frm': $(this).attr('data_name')});

		if(fragment['fragment'+num].childNodes.length != 0){
			fragment['fragment'+act_num].appendChild($goods_units[0]);
			$poster.append(fragment['fragment'+num]);
		} else {
			fragment['fragment'+act_num].appendChild($goods_units[0]);
			pullUp.show();
			var data = {'tab' : $(this).attr('data_name')};
			var poster_r = fml.vars.r + '.' + $(this).attr('data_name');
			$.get('/aj/promote/activity_item_list_916', data, function(data){
				if(data.data){
					data.r = poster_r;
					var tpl = shareTmp('posterWall', data);
					pullUp.hide();
					$poster.append(tpl);
					posLoad.load($poster.find('.bs_load_img'), 'asrc');
				}
			}, 'json');
		}
	});

	$('.timeStamp_wrap').each(function(){
		var self = this;
		timedown.down(self, $(self).attr('time'), '0d-0h-0i-0s', ['%v', '%v', '%v', '%v']).onAction(function(t){
			if(t.d != undefined) $(self).find('.day').html(t.d<10 ? '0'+t.d : t.d);
			if(t.h != undefined) $(self).find('.hour').html(t.h<10 ? '0'+t.h : t.h);
			if(t.i != undefined) $(self).find('.sec').html(t.i<10 ? '0'+t.i : t.i);
			$(self).find('.min').html(t.s<10 ? '0'+t.s : t.s);
		}).onTimeOver(function(){
			$(self).html('正在抢购中');
		}).correct();
	});
});
