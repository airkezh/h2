/*common*/
var $ = require('wap/zepto');
var click_count = 0;
var SCORE_PER_CLICK = 177;
var click_timer = null;
var TOTAL_TIME = 30;
var ShareTo = require('wap/app/shareTo');
var is_weixin = !!navigator.userAgent.toLowerCase().match(/micromessenger/);
try{
	var shareWX = require('wx/share');

	shareWX.bind({
		'link': location.href,
		'desc':'美丽说全球代言人鹿晗加油专属通道',
		'imgUrl':Meilishuo.config.picture_url+'images/luhan/luhan.jpg',
		'title': 'ceshi'
	});
}catch(e){}

var time_config = [
	{
		name:'hongkong',
		time: new Date('2015/04/17 08:00:00')
	},
	{
		name:'tokoyo',
		time: new Date('2015/04/17 09:00:00')
	},
	{
		name:'paris',
		time: new Date('2015/04/17 14:00:00')
	},
	{
		name:'beijing',
		time: new Date('2015/04/17 16:30:00')
	},
	{
		name:'shanghai',
		time: new Date('2015/04/17 19:00:00')
	},
	{
		name:'london',
		time: new Date('2015/04/17 20:00:00')
	},
	{
		name:'new-york',
		time: new Date('2015/04/18 00:00:00')
	}
];

var city = 'default_city',now = new Date();
time_config.forEach(function(cfg){
	if(now > cfg.time){
		city = cfg.name;
	}
});
$('.cities').append('<img src="'+Meilishuo.config.picture_url+'images/luhan/'+city+'3.png"/>');

$('#share').on('click',function(){

	if(is_weixin){
		$('.cover').show();
	}else{
		opt = {
			'text' : '美丽说全球代言人鹿晗加油专属通道',
			'title' : '美丽说全球代言人鹿晗加油专属通道',
			'pic' : Meilishuo.config.picture_url+'images/luhan/luhan.jpg',
			'url' : 'http://'+location.host+'/luhan/'
		}
		ShareTo.shareToPengYouQuan(opt);
	}

});

$('.cover').on('click',function(){
	$(this).hide();
})

$('#start_play,#replay').on('click',start_click);
$('#get_help').on('click',get_help);



function start_click(){
	$('#start').remove();
	$('#click').show();
	$('#calculating').hide();
	switch_page('play');
	$('#click').on('touchstart',function(e){
		$('#score').val((click_count++)*SCORE_PER_CLICK);
		e.stopPropagation();
		e.preventDefault();
	});
	start_time = new Date().getTime();
	click_timer = setInterval(function(){
		var current_time = new Date().getTime()
			,remainSeconds = TOTAL_TIME - parseInt((current_time - start_time)/1000);

		if(remainSeconds > 0){
			$('#remain_time').val( remainSeconds );
		}else{
			stop();
		}

	},1000);
}

function stop(){
	$('#click').hide();
	$('#calculating').show().css('display','block');
	var final_score = Math.max(parseInt($('#score').val()) , 0) || 0;
	var final_rank = calculate_rank(final_score);
	$('#result_score').html(final_score);
	$('#result_rank').html(final_rank);
	setTimeout(function(){
		switch_page('final');
		$('#remain_time').val('0');
		$('#score').val(0);
	},2000);
	clearInterval(click_timer);
	click_count = 0;
	start_time = null;
	$('#click').unbind('touchstart');
}


function calculate_rank(score){
	return Math.max(9999 - parseInt(score/30),1);
};

function switch_page(page){
	$('#final').hide();
	$('#' + page).show();
}

function get_help(){
}

