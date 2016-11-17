/*common*/
var $ = require( 'wap/zepto' )
	, Danmu = require( 'wap/component/danmu/index' )
	, shareTmp = require('wap/component/shareTmp')
require('wap/zepto/fastclick')

var danmuDataPreset = fml.vars.barrage_get || []

var isLoadingDanmu = false
function getDanmu(){
	if(isLoadingDanmu) return;
	isLoadingDanmu = true;
	$.ajax({
		url: '/aj/running_man/barrage/get',
		type: 'get',
		dataType: 'json',
		success: function(res) {
			res = res || [];
			[].push.apply(danmuDataPreset, res)
		},
		complete: function() {
			isLoadingDanmu = false;
		}
	})
}

var defaultDatas = [
	"想念宝宝，包包…永远支持你",
	"准时守候",
	"0-0 你们次饭了吗",
	"卧槽！！！美丽说独家冠名的？？？？",
	"怎么视频还没出- -",
	"我早已为你种下九百九十九颗玫瑰",
	"围观……围观……围观……围观……",
	"突然好想回到九几年天天玩街机的那时候",
	"前排～～～～～～～～～～～～～～",
	"昨天孙俪接受采访时说邓超有邀请啊",
	"期待23号",
	"鹿晗的加入直接提高了颜值！",
	"真的有鹿晗，都是有颜值的，好开心啊",
	"太棒了！快点开始吧 - -",
	"陈赤赤怎么你了",
	"会不会有晨鹿组合？",
	"不是说跑男3 9号播吗 怎么现在还没放啊",
	"谁是新一届捡漏王",
	"鹿饭感谢大家对鹿晗的照顾.",
	"怎么没人投鹿晗",
	"是郑恺，宝宝没有回来，这次是鹿晗",
	"鹿晗是个好孩子",
	"鹿晗的票数不给力！不给力",
	"一共17期 貌似",
	"陈赫竟然第一！",
	"阑尾兄弟又来了",
	"第一期据说在洛阳录制的！！",
	"啦啦啦，我是卖报的小行家～",
	"明天西安还有一期，是ELLA,柳岩和冯绍峰",
	"ab又不是十全十美，不喜欢她，",
	"看了视频，快被超哥和祖蓝笑死了",
	"这是什么东西",
	"给小鹿拉票阿阿阿阿阿！",
	"召集鹿饭～～～",
	"大家快投鹿晗阿",
	"看来鹿晗要到第一了",
	"第三季最期待哪对CP",
	"陈赤赤加油",
	"前排",
	"超哥这好逗啊",
	"我测测手速。。。。。。。 。。。",
	"这么给力的奖品！！！！",
	"孙俪不会来的。",
	"同晨粉，期待奔跑团更精彩的表现",
	"郑恺和陈赫的关系是什么？",
	"你们真无聊～。。。。。。。",
	"孙俪会来吗？？",
	"为什么像EXO的舞蹈",
	"我不希望跑男o游戏太幼稚，好没意思。",
	"还有好几天呢，我都快等不及了嘤嘤嘤",
	"这个瘦不拉叽的是谁",
	"不要让陈赤赤拿第一！！",
	"0 0一万票了，，，，",
	"有种硬挤进又挤不进去的感觉！",
	"第二季就差这种感觉",
	"。。。。比较担心鹿晗会变黑的事。。。。",
	"阿阿阿阿阿阿阿阿阿阿阿阿阿阿",
	"你站在风口，我的世界满是你的味道。",
	"晗晗竟然排第二",
	"哪有exo的风格",
	"浙江台星期五晚上九点过",
	"期待播出",
	"赫颖，主要还是薄荷糖，baby是粉转路吧",
	"Angelababy还会继续来第三季吗？",
	"不知道,周五晚21:10分 浙江卫视播出",
	"(。・`ω´・)卧槽.......",
	"马桶狗速度来集合啦",
	"欢迎鹿晗加入跑男团，WE ARE 伐木累",
	"激动，以前不喜欢鹿晗的，快被他圈粉了",
	"大家帮我晨晨拉票～～～",
	"他已经去芒果台录制爸爸3了",
	"一直以为鹿晗很高",
	"弱弱的问一下第三季跑男一共有几期",
	"还要等好久。。静静等待。。不过快了",
	"喜欢ab的请投给她～",
	"大喊三遍我是恺赫党！",
	"( *・ω・)& 17期！！"
	];

var danmuWrapperHeight = $('#stage').height()
var danmu = Danmu( {
    el: '#stage',
    mode: 'auto',
    bulletHeight: danmuWrapperHeight/5,
    bulletTmpl: '<div class="bullet"><span data-name="content"></span></div>',
    initChannel: {
        offset: 10,
        height: danmuWrapperHeight/5,
        size: 5
    },

    getMessage: function(){
    	if(danmuDataPreset.length<50){
    		getDanmu()
    	}
    	return (danmuDataPreset.shift() || defaultDatas[(defaultDatas.length*Math.random())|0]).replace(/</g,'&lt;').replace(/</g,'&gt;')
    },

    initBullet: function() {
        var bullet = this.bullet,
            els    = this.bullet.els

        bullet.speed = -.12

        if ( this.type == 'mine' ) {
            els.content.innerHTML = this.content.replace(/</g,'&lt;').replace(/</g,'&gt;')
            els.el.className += ' bullet-m'
        }

        // if(danmuDataPreset.length===0){
        // 	danmu && danmu.shutdown()
        // }

    }
} )

function sendDanmu(con, danmu){
	if(!con) return;
	setTimeout(function(){
		danmu.load(function() {
	        this.type = 'mine'
	        this.content = con;
	    })
	}, 1000)
}

$('.send_danmu_form').on('submit', function(event) {
	event.preventDefault();
	if(isLogin()===false) return;
	var val = $('[name="danmu_content"]').val().trim()
	if(!val) return;
	if(val.length<5) return alert('请输入至少5个字');
	this.reset()
	sendDanmu(val, danmu)
	$.ajax({
	 	url: '/aj/running_man/barrage/store',
	 	type: 'get',
	 	dataType: 'json',
	 	data:{
	 		barrage:val
	 	},
	 	success: function(res){}
	 })
});

$('.rank_wrapper').on('click', '.tab_btn', function(event) {
	event.preventDefault();
	var _index = $(this).index()
	$(this).addClass('act').siblings().removeClass('act')
	$('.rank_wrapper').find('.content').eq(_index).addClass('act').siblings().removeClass('act')
}).find('.tab_btn').eq(0).trigger('click')

window.MLS = {
	didLogin : function() {
		window.location.reload();
	}
};

function isLogin(){
	if(Meilishuo.config.user_id) return true;
	if(Meilishuo.config.os.mlsApp){
		location.href = 'meilishuo://login.meilishuo/'
		return false;
	}
	location.href = '/user/login'
	return false;
}

$('.vote_to_btn').on('click', function(event) {
	//投票
	event.preventDefault();
	if(isLogin()===false) return;
	var $btn = $(this)
	var runnerId = $(this).data('id')
	$.ajax({
	 	url: '/aj/running_man/vote/store',
	 	type: 'get',
	 	dataType: 'json',
	 	data: {
	 		voteId:runnerId
	 	},
	 	success: function(res){
	 		if(res.error_code==0){
	 			addOne(runnerId)
	 			$btn.after(shareTmp('voted_btn_tmp'))
	 			$btn.parents('table').find('.vote_to_btn').remove()
	 			$(shareTmp('success_pop_tmp')).appendTo('body')
	 			disableScroll()
	 		} else {
	 			alert(res.message)
	 		}
	 	}
	 })
});

function addOne(id){
	var $num = $('.vote_num[data-id='+id+']')
		,num = $num.html()|0
	$num.html(num+1)
}

function disableScroll(){
	$(document).on('touchmove.popWin', function(event) {
		event.preventDefault();
	});
}

function activeScroll(){
	$(document).off('touchmove.popWin');
}

$('body').on('click', '.pop_win .close_btn', function(event) {
	event.preventDefault();
	$(this).parents('.pop_win').trigger('closeCb').trigger('closeWin')
}).on('click', '.share_btn', function(event) {
	event.preventDefault();
	$(this).parents('.pop_win').trigger('closeWin')
	$(shareTmp('share_tip_tmp')).appendTo($('body'))
	disableScroll()
}).on('click','.weixin_timeline_btn',function(){
	var param = {
		type:'weixin_timeline'
		,text: fml.vars.share_info.content || '跑男第三季拉票'
		,url:location.href
		,thumb_url:fml.vars.share_info.img
		,title : fml.vars.share_info.title || '跑男第三季拉票'
		,message_type:'webpage'
	}
	location.href = 'meilishuo://share.meilishuo/?json_params='+encodeURIComponent(JSON.stringify(param))
}).on('click','.weixin_btn',function(){
	var param = {
		type:'weixin'
		,text: fml.vars.share_info.content || '跑男第三季拉票'
		,url:location.href
		,thumb_url:fml.vars.share_info.img
		,title : fml.vars.share_info.title || '跑男第三季拉票'
		,message_type:'webpage'
	}
	location.href = 'meilishuo://share.meilishuo/?json_params='+encodeURIComponent(JSON.stringify(param))
}).on('click', '.more_phone', function(event) {
	event.preventDefault();
	$(this).hide().siblings('.phone_input_wrapper').show()
}).on('submit', '.submit_phone_form', function(event) {
	event.preventDefault();
	var $form = $(this)
	$.ajax({
		url: '/aj/running_man/vote/phone',
		type: 'get',
		dataType: 'json',
		data:  $(this).serialize(),
		success: function(res){
			if(res.error_code==0){
				$('.phone_input_tip').html('恭喜您！填写成功！分享到朋友圈可提高获奖几率哦～')
				$form.hide()
			} else {
				$('.phone_input_tip').html(res.message)
			}
		}
	})
}).on('closeWin', '.pop_win', function(event) {
	$(this).remove()
	activeScroll()
}).on('click', '.share_tip_pop', function(event) {
	event.preventDefault();
	$(this).trigger('closeWin')
}).on('blur', '.phone_input', function(event) {
	var popWinTop = $(this).parents('.pop_win').offset().top
	$('body').scrollTop(popWinTop)
}).on('input', '.phone_input', function(){
	var val = $(this).val()
	if(val.length>11){
		event.preventDefault();
		$(this).val(val.substr(0,11))
	}
}).on('input', '[name="danmu_content"]', function(event) {
	var val = $(this).val()
	var length = val.replace(/[^\x00-\xff]/g,"xx").length;
	if(length>40){
		event.preventDefault();
		$(this).val(val.slice(0,-1))
	}
});

if(Meilishuo.config.os.weixinBrowser){
	var signWX = require('wx/sign')//认证签名
	var shareWX = require('wx/share')//分享
	signWX()
	if(fml.vars.share_info){
		shareWX.bind({
		    "desc":fml.vars.share_info.content,
		    "imgUrl":fml.vars.share_info.img,
		    "title":fml.vars.share_info.title
		});
	}
}

if(Meilishuo.config.os.mlsApp && fml.vars.appShare){
	var appShare = require('wap/app/appShare');
    appShare(fml.vars.params, ['weixin', 'weixin_timeline'], 'image');
}