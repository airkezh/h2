/*common*/
/**
 * @fileoverview 美妆微信凑单活动
 * @author yunqian@meilishuo.com
 * @date 2015-02-11
 */
require('wap/zepto')
require('wap/zepto/fastclick')
var query = require('component/urlHandle')
var Scroll = require('wap/component/windowScroll')
var shareTmp = require('wap/component/shareTmp')

query = query.getParams(window.location.href.toString())

$('.js_support').one('click', function(){
	if(checkLogIn()) return false

	$self = $(this)
	var support_r = +$('.js_support').eq(0).data('support')
	var support_y = +$('.js_support').eq(1).data('support')
	var total = support_r + support_y + 1
	var index = $self.parents('.choose_mass').index()

	var mass_r = $('.choose_mass').eq(0)
	var mass_y = $('.choose_mass').eq(1)

	var url = '/aj/promote/pk_vote_add'
	var data = {
		'pk_id' : query.pk_id
		, 'product_id' : $self.data('id')
	}
	$.post(url, data, function(res){
		if(res.message){
			alert(res.message)
		} else {
			if(index != 1){
				support_y++
				$('.choose_mass').eq(1).find('.num').html(support_y + '人')
			} else {
				support_r++
				$('.choose_mass').eq(0).find('.num').html(support_r + '人')
			}

			var per_r = support_r / total * 100
			var per_y = support_y / total * 100

			mass_r.find('.pro_in').css('width', per_r + '%')
			mass_y.find('.pro_in').css('width', per_y + '%')

			$self.removeClass('js_support').addClass('has_choose').html('已支持')
			$self.parents('.choose_mass').siblings('.choose_mass').find('.js_support').remove()

		}
	}, 'json')
})

$('.comment input').on('focus', function(){
	if(checkLogIn()) return false
})

$('.js_submit_btn').on('click', function(){
	if(checkLogIn()) return false

	var url = '/aj/promote/pk_comment_add'
	var data = {
		'pk_id' : query.pk_id
		, 'content' : $('.comment input').val()
	}
	$.post(url, data, function(res){
		if(res.message){
			alert(res.message)
		} else {
			$('.pk_msg').prepend(shareTmp('user_msgs', {content : data.content}))
			$('.comment input').val('')
			alert('发表成功')
		}
	}, 'json')
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

function checkLogIn() {
	if(!fml.vars.user_id){
		if(Meilishuo.config.os.mlsApp){
			window.MLS = {
				didLogin : function() {
					window.location.reload()
				}
			}
			window.location.href = "meilishuo://login.meilishuo/"
		} else {
			alert('请使用app登录美丽说，访问美妆频道参加本活动～')
		}
		return true
	}
	return false
}

$('.join_cricle').on('click', function(e){
	e.preventDefault()
	if(checkLogIn()) return false

	var url = $(this).attr('href')
	$.get('/aj/circle/member_join', {'circle_id':fml.vars.circle_id}, function(res){
		window.location.href = url
	}, 'json')
})
