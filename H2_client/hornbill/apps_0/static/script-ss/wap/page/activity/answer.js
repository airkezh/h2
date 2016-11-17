/*common*/

var $ = require('wap/zepto');
var signWX = require('wx/sign');
var	shareWX = require('wx/share');
var params = require('component/urlHandle').getParams(location.href);

var totalScore = 100;
var totalCount = $('.question .item').length;
var perScore = parseInt(totalScore / totalCount);
var curScore = 0;
var curAnswer = 1;
var homeShare = fml.vars.homeShare;
var resultLink = fml.vars.resultLink || '/activity/answer/result/';
var audioInfo = fml.vars.audioInfo;

var isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

function delay(cb,time){
	setTimeout(cb,time||200);
}

function audioPlay(){
	if(audioInfo && audioInfo.link){
		var autoPlay = !!audioInfo.autoPlay;

		var audio = new Audio;
		// audio.autoplay = true;
		audio.loop = true;
		audio.preload = "auto";
		audio.autobuffer = true;
		audio.src = audioInfo.link;

		$('.music').click(function(){
			if($(this).hasClass('on')){
				$(this).removeClass('on');

				audio.pause();
			}else{
				$(this).addClass('on');
				audio.play();
			}
		});
		

		if(autoPlay){
			if(isiOS){
				$(document).one('touchstart',function(){
					$('.music').click();
				});
			}else{
				$('.music').click();
			}
		}
	}
}

function init() {

	audioPlay();

	$('.start').click(function(){
		$('.home').hide();
		$('.question').show();
	})

	$('.question .cont').delegate('li','click',function(){

		if($(this).data('correct')){
			curScore += perScore;
		}

		var $this = $(this);
		$this.addClass('selected');

		delay(function(){
			if(curAnswer == totalCount){
				location.href = resultLink + '?cid=' + params.cid + '&score=' + curScore;
			}else{
				curAnswer++;
				$this.closest('.item').hide().next().show();
			}
		});
	})

	$('.banner').click(function(){
		var link = $(this).data('link');
		if(link){
			link = '/goto/open/?appUrl=' + encodeURIComponent(link) + '&bg=' + encodeURIComponent(link);
			location.href = link;
		}
	});


	signWX(); 
	shareWX.bind({
	    'desc':homeShare.desc,
	    'imgUrl':homeShare.imgUrl,
	    'title':homeShare.title,
	    'link': homeShare.link
	});
}

init();


