/*common*/
/**
 * @fileoverview 美妆微信凑单活动
 * @author yunqian@meilishuo.com
 * @date 2015-03-26
	http://gitlab.fexot.meiliworks.com/refactor/egret/tree/master/documents/danmu
 * @todo
 	1.弹出框采用系统组件
 	2.弹幕滚出部分停止
 */
require('wap/zepto')
require('wap/zepto/fastclick')
var query = require('component/urlHandle')
var Scroll = require('wap/component/windowScroll')
var shareTmp = require('wap/component/shareTmp')
var Danmu = require('wap/component/danmu/index')

var DEFAULT_FAKEDATAS = ['大家high起来~', '唔啦啦啦~~', '支持~~']

query = query.getParams(window.location.href.toString())

/**
 * 弹幕部分
 */
var DANMU_HEIGHT = $('.bullet_wrap').offset().height/4
var danmu_init = function(danmu_id, fakeDatas){
	var i = 0
	return Danmu({
		el: danmu_id,
		bulletClass: 'bullet',
		initChannel: {
			offset: 20,
			height: DANMU_HEIGHT,
			size: 4
		},
		initBullet: function() {
			this.bullet.speed = -.1

			if ( this.type == 'mine' ) {
				this.bullet.speed = -.1
				this.bullet.els.el.className = 'bullet bullet_mine';
				this.bullet.els.content.innerHTML = this.content;
			}
		},
		getMessage: function() {
			i == fakeDatas.length && ( i = 0 )
			return fakeDatas[ i++ ]
		}
	})
}
var danmuF = []

$('.pk_defences').each(function(index, item){
	$item = $(item)

	$.get('/aj/promote/pk_barrage_get', {pk_id: query.pk_id, product_id: $item.data('id')}, function(res){
		var fakeDatas = [];
		if(res.comment.length){
			res.comment.forEach(function(data){
				fakeDatas.push(data.content)
			})
			danmuF[index] = danmu_init('#stage_' + (index+1), fakeDatas)
		} else {
			danmuF[index] = danmu_init('#stage_' + (index+1), DEFAULT_FAKEDATAS)
		}
	}, 'json')
})

$('.js_biubiu').on('click', function(){
	if(checkLogIn()) return false

	var $self = $(this)
	var $parent = $self.parents('.pk_defences')
	var content = $parent.find('.plant_bullet input').val()
	var vote_num = (+$self.data('danmu') ? fml.vars.yellow_num : fml.vars.red_num ) + 1
	var total = fml.vars.red_num + fml.vars.yellow_num + 1
	var vote_pro = vote_num / total * 100
	if(content){
		var danmu = danmuF[$self.data('danmu')]
		if(danmu){
			danmu.load(function() {
				this.type = 'mine'
				this.content = content
			})
		}
		$parent.find('.plant_bullet input').val('')

		$.post('/aj/promote/Pk_barrage_add', {pk_id: query.pk_id, product_id: $self.data('id'), content: content}, function(res){
			if(!res.status){
				return alert(res.message)
			}

			if(res.status == 1){
				if(vote_num > 7){
					$parent.find('.normal').last().remove()
				} else if(vote_num == 7){
					$parent.find('.last').show()
				}
				$parent.find('.user_title span').html(vote_num)
				$parent.find('.pro_in').css('width', vote_pro + '%')
				$parent.find('.user_pics').prepend(shareTmp('user_image'))
			}
		}, 'json')
	} else {
		alert('没有理由不能发弹幕哦~')
	}
})

/**
 * 底部交叉bannar动画
 */
var win_h = $(window).height()

function scrollPoster(pos,isDown){
	if(isDown){
		pullUp_top = $('.line')[0].getBoundingClientRect().top
		if(pullUp_top - win_h < 20){
			$('.line').css('position', 'fixed')
		}
	}
}
Scroll.bind(scrollPoster, 'scrollPoster')

/**
 * 检查用户是否登录
 */
function checkLogIn() {
	if(!fml.vars.user_id){
		if(Meilishuo.config.os.mlsApp){
			window.location.href = "meilishuo://login.meilishuo/"
		} else {
			alert('请使用app登录美丽说，访问美妆频道参加本活动～')
		}
		return true
	}
	return false
}
window.MLS = {
	didLogin : function() {
		window.location.reload()
	}
}

/**
 * 加入群圈并跳转
 * 加 setTimeout 防止ajax失败
 */

// ajaxBack 防止两次跳转到群圈
var ajaxBack = false
$('.join_cricle').on('click', function(e){
	e.preventDefault()
	if(checkLogIn()) return false

	var url = $(this).attr('href')
	$.get('/aj/circle/member_join', {'circle_id':fml.vars.circle_id}, function(res){
		window.location.href = url
		ajaxBack = true
	}, 'json')
	setTimeout(function(){
		if(!ajaxBack) window.location.href = url
	}, 3000)
})
