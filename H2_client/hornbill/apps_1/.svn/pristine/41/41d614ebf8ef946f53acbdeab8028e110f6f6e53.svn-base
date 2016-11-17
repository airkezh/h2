fml.define('wap/page/biz/beauty_sale820', ['wap/zepto/touch', 'wap/component/lazyLoad', 'wap/component/shareTmp', 'wap/app/tracking', 'wap/app/doota/timedown'], function(require, exports){
	var shareTmp = require('wap/component/shareTmp');
	var posLoad = require('wap/component/lazyLoad');
	var logTrack = require('wap/app/tracking');
	window.timedown = require('wap/app/doota/timedown');
	var $poster = $('.poster');

	var fragment = {
		'fragment0' : document.createDocumentFragment(),
		'fragment1' : document.createDocumentFragment(),
		'fragment2' : document.createDocumentFragment(),
		'fragment3' : document.createDocumentFragment()
	};

	if(fml.vars.poster0 && fml.vars.poster0.tInfo){
		fml.vars.poster0.r = fml.vars.r+'.classics';
		var tpl = shareTmp('posterWall', fml.vars.poster0);
		$poster.append(tpl);
		posLoad.load($poster.find('.bs_load_img'), 'asrc');
	}
	$('.poster_tab a').on('tap', function(){
		var $goods_units = $('.goods_units');
		var act_num = $('.active').attr('data_id');
		var num = $(this).attr('data_id');
		$('.poster_tab .active').removeClass('active');
		$(this).addClass('active');
		$('.tab_bwrap .tab_choosed').attr('class', 'tab_choosed tab'+num);

		logTrack.cr('beauty_sale820', {'frm': $(this).attr('data_name')});

		if(fragment['fragment'+num].childNodes.length != 0){
			fragment['fragment'+act_num].appendChild($goods_units[0]);
			$poster.html(fragment['fragment'+num]);
		} else {
			var data = {'page_size' : 100, 'type' : 'mob', 'pid' : $(this).attr('data_pid')};
			var poster_r = fml.vars.r + '.' + $(this).attr('data_name');
			$.post('/aj/activity/carnival_list', data, function(data){
				if(data.tInfo){
					data.r = poster_r;
					var tpl = shareTmp('posterWall', data);
					fragment['fragment'+act_num].appendChild($goods_units[0]);
					$poster.html(tpl);
					posLoad.load($poster.find('.bs_load_img'), 'asrc');
				}
			}, 'json');
		}
	});

	$('.timeStamp_wrap').each(function(){
		var self = this;
		timedown.down(self, $(self).attr('time'), '0d-0h-0i-0s',['<b class="none_f">%v</b>','%v: ','%v: ','%v']).onAction(function(t){
			if(t.h != undefined) $(self).find('.hour').html(t.h<10 ? '0'+t.h : t.h);
			if(t.i != undefined) $(self).find('.sec').html(t.i<10 ? '0'+t.i : t.i);
			$(self).find('.min').html(t.s<10 ? '0'+t.s : t.s);
		}).onTimeOver(function(){
			$(self).html('正在抢购中');
		}).correct();
	});

});
