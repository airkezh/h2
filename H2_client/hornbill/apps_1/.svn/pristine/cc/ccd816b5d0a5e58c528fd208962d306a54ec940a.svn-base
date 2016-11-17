/*common*/
var shareTmp = require('wap/component/shareTmp');
var timedown = require('wap/app/doota/timedown');
var $ = require('wap/zepto');
var score = 0 // 当前答对题目数
	, startTime = null // 开始答题时间
	, list = []	// 题目备份
	, questionTimer = null // 每个题十秒倒计时timer
	, countDown = null // 刷新当前所用时间的timer
	, limit = null
	, winHeight = $(window).height()
	, answers = $('ol.answers');

$("#answer").height(winHeight);
// 从头开始答题
function start(){
	// 重置变量，timer
	score = 0;
	startTime = new Date();
	list = $.extend(true,[],fml.vars.list);
	// 开始答题并计时
	startCountDown();
	next();
	$(".top_timmer").html("00:00");
}

// 辅助函数，选下个题目
function selectQuestion(list){
	var count = list.length;
	return Math.ceil(Math.random()*count)-1;
}

function fail(){
	stopQuestionCountDown();
	stopCountDown();
	passData();
}

answers.delegate('li', 'click', function(){
	//防止重复点击和在换下一道题之前点击其他答案
	var click = answers.find("li").data("click");
	if(click){
			answers.find("li").data("click",false);
			var self = $(this);
			if(self.hasClass('correct')){
				stopQuestionCountDown();
				self.addClass('right');
				// 将答对的题目从题库里删除
				list.splice(current,1);
				// 得分+1
				score++;
				setTimeout(next,500);
			}else{
				stopQuestionCountDown();
				self.addClass('wrong');
				setTimeout(fail,500);
			}
		}
});

function next(){
	answers.find("li").data("click",true);
	if(!list.length) {
		finish();
	}
	else {
		// 选题
		current = selectQuestion(list);
		// 显示下一道题
		$(".num").html(score+1);
		$(".limit_timer").html("20");
		$("#answer .pic img").attr("src",list[current].img);
		$(".question span").html(list[current].title);
		var options = list[current].options;
		var l = options.length - $('ol.answers li').length;
		for(var i = 0 ; i < l ; i++){
			answers.append($('ol.answers li').eq(0).clone());
		}
		answers.find('li').hide().filter(function(i){
			return i < options.length;
		}).show();

		options.forEach(function(option,i){
			var code = String.fromCharCode(65+i); // 从A开始
			$('ol.answers li').eq(i).html("<span class='code'>"+code+"</span>"+option);
		});

		// 设置正确答案
		$('ol.answers li')
			.removeClass('correct wrong right')
			.eq(parseInt(list[current].correct) - 1)
			.addClass('correct');
			questionCountDown();
	}

}

function questionCountDown(){
	clearTimeout(questionTimer);
	clearInterval(limit);
	var second = 20;
	limit = setInterval(function(){
		second--;
		$(".limit_timer").html(second);
		if(second == 0) fail();
	},1000);
}

function stopQuestionCountDown(){
	clearTimeout(questionTimer);
	clearInterval(limit);
}
function startCountDown(){
	clearInterval(countDown);
	countDown = setInterval(function(){
		var m = parseInt((new Date()- startTime)/1000/60);
		var s = parseInt((new Date()- startTime)/1000) - m*60;
		m=checkTime(m);
		s=checkTime(s);
		$(".top_timmer").html(m+":"+s);
	},1000);
}
function stopCountDown(){
	clearInterval(countDown);
}

function finish(){
	stopCountDown();
	stopQuestionCountDown();
	passData();
}

//答题局结束（失败或通关）后将答题后的信息抛出去
function passData(){
	$(window.parent.document).trigger('qa_end',{
		score:score,
		cost_time:parseInt((new Date()-startTime)/1000)
	});
}

//时间补0
function checkTime(i)
{
	if (i<10) {
		i="0" + i
	}
	  return i
}

$(document).on('start',function(){
	start();
	// stopCountDown();
	// stopQuestionCountDown();
});
