fml.define('app/like' , ['jquery' , 'app/twitterApi', 'app/checkLogin' , 'component/shareTmp' , 'component/tips'] , function(require , exports){
	var $ = require('jquery');	
	var check = require('app/checkLogin')
	var shareTmp = require('component/shareTmp');
	var tips = require('component/tips');	
	var twitterApi = require('app/twitterApi').twitterApi;
	exports.posterLike = function(target , obj){
		mouseLike(target , obj);
		$(target).on('click' , obj , function(){
			if(!check()) return;	
			var btn = $(this)
			if('0'== btn.attr('isshowlike') || btn.attr('s_uid') == Meilishuo.config.user_id) return;
			var poster = btn.closest('.poster_grid');
			var tid = poster.attr('like_twitter_id');

			ajaxLike.call(this , tid , function(){})
			var isNew = true	
			if (poster.is('.retsop')){ 
				var likes_btn = poster.find('.like_merge .like_status')
					,isLiked = likes_btn.is('.lm_liked') 
			}else{
				isNew = false
				var likes_btn = poster.find('.poster_likes')
					,isLiked = likes_btn.is('.liked') 
				}

			var poster_like_num = poster.find('.comm_num .poster_like_num')
				,likes_status = poster.find('.comm_num .likes_status')
			var num = poster_like_num.data('num') || poster_like_num.html() 
			num = num *1 + (isLiked?-1:1)
			if (num < 0 ) num = 0 
			poster_like_num.html(num ).data('num' , num)
			if (isNew){
				if (isLiked) {
					likes_btn.removeClass('lm_liked').addClass('lm_like')
					likes_status.html('<i class="lm_love2">&nbsp;</i>喜欢')
				}else{
					likes_btn.removeClass('lm_like').addClass('lm_liked')
					likes_status.html('已喜欢')
					}
			}else{
				if (isLiked) {
					likes_btn.removeClass('liked')
					likes_status.html('<i class="lm_love2">&nbsp;</i>喜欢')
				}else{
					likes_btn.addClass('liked')
					likes_status.html('已喜欢')
					}
				}
		});
	}
	exports.posternewLike = function(target , obj){
		mouseLike(target , obj);
		$(target).on('click' , obj , function(){
			if(!check()) return;	
			var btn = $(this)
			if('0'== btn.attr('isshowlike') || btn.attr('s_uid') == Meilishuo.config.user_id) return;
			var poster = btn.closest('.poster_grid');
			var tid = poster.attr('like_twitter_id');

			ajaxLike.call(this , tid , function(){})
			var likes_btn = poster.find('.posternew_likes')
				,isLiked = likes_btn.is('.liked') 

			if (isLiked) {
				likes_btn.removeClass('liked')
				likes_btn.html('<i class="lm_love2">&nbsp;</i>喜欢')
			}else{
				likes_btn.addClass('liked')
				likes_btn.html('已喜欢')
			}
		});
	}
	exports.twitterLike = function(target , obj ,cbk , opt){
		opt = opt || {}
		if (!opt.noHover) mouseLike(target , obj , opt.hoverOn , opt.hoverOff);
		$(target).on('click' , obj , function(){
			if(!check()) return;	
			if(!+$(this).attr('isshowlike')) return;
			var tid = $(this).attr('like_twitter_id');
			ajaxLike.call(this , tid , cbk);
		});
	}
	function mouseLike(target , obj , hoverOn , hoverOff){
		$(target).on('mouseenter' , obj , hoverOn || function(){
			if(!+$(this).attr('isshowlike') || $(this).attr('s_uid') == Meilishuo.config.user_id){
				var poster = $(this).closest('.twiiter_box');
				poster.find('.love_pro').show();	
			}
		}).on('mouseleave' , obj , hoverOff || function(){
			if(!+$(this).attr('isshowlike') || $(this).attr('s_uid') == Meilishuo.config.user_id){
				var poster = $(this).closest('.twiiter_box');
				poster.find('.love_pro').hide();	
			}
		});
	}
	function ajaxLike(tid , callback){
		var data = {'stid' : tid};
		if (!callback) {
		
			if($(this).is(".liked")){
				$(this).find('.likes_status').html('<i class="lm_love2">&nbsp;</i>喜欢');
				//$(this).find('.likes_status').html('<i class="lm_like">&nbsp;</i>');		
				var num = $(this).find('.poster_like_num').text();
				$(this).find('.poster_like_num').html(+num - 1)
				$(this).removeClass('liked')
			}else{
				var num = $(this).find('.poster_like_num').text();
				$(this).find('.poster_like_num').html(+num + 1)
				$(this).addClass("liked");	
				$(this).find('.likes_status').html('已喜欢');
				//$(this).find('.likes_status').html('<i class="lm_liked">&nbsp;</i>');
			}	
			callback = function(){}
		}
		twitterApi('like', data, callback);
	}
});
