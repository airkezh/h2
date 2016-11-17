fml.define('wap/app/qaGame', ['component/shareTmp', 'wap/app/tracking', 'wap/app/shareTo', 'wap/zepto', 'wap/zepto/touch'] , function(require , exports){
	var shareTmp = require('component/shareTmp');
	var share = require('wap/app/shareTo');
	var logTrack = require('wap/app/tracking');
	var canvas = $('#canvas')
	return function(qaData, shareData){
		var qalen = qaData.answer.length
			, num = 0
			, no = 0
		var step = function(){
			no++;
			canvas.html(shareTmp('question' , { 'no':no , 'choose':qaData.choose[no-1] }));
			test(qaData.answer[no - 1]);
		}
		var test = function(r){
			$('#chooseBtn').children('span').on('tap', function(){
				var choose = $(this).attr('choose')
					, tf = 'f'
				if(choose == r){
					num++;
					tf = 't'
				}
				canvas.html(shareTmp('answer' , { 'no':no , 'tf' : tf }));
				if(no == qalen)
					$('#nextBtn').on('tap', result)
				else
					$('#nextBtn').on('tap', step)
			})
		}
		var result = function(){
			logTrack.cr('wap_activity_bge_result')
			canvas.html(shareTmp('result' , { 'result':num }));
			$('#shareBtn').on('tap', function(){
				logTrack.cr('wap_activity_bge_shareToWeibo')
				var data = {
					'ru' : shareData.ru
					, 'rt' : shareData.rt
					, 'tp' : shareData.tp ? (shareData.tp.length != 0 ? shareData.tp[num] : $('#shareImage').attr('src')) : ''
					, 'ntitle' : shareData.ntitle ? shareData.ntitle[num] : ''
					, 'skipshow' : shareData.skipshow ? 1 : 0
					, 'backurl' : shareData.backurl ? shareData.backurl : ''
				}
				share.shareToWeibo(data)
			})
		}
		$('#startBtn').on('tap', function(){
			logTrack.cr('wap_activity_bge_start')
			step();
		})
	}
});
