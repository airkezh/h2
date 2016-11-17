fml.use('app/smile', function(){
	this.showSmile('.reply_block' , '.share_smileys' , 'recom_publish');
});

fml.define('app/nexus' , ['jquery','ui/dialog','component/shareTmp','app/letter','app/label' , 'app/beautyDecl' ,'app/eventHover' ,'app/userApi', 'app/login', 'app/shareTo', 'ui/confirm' ,'ui/alert','app/twitterApi', 'app/twitter_comment'] , function(require , exports){
	var Confirm = require('ui/confirm')
		,Alert = require('ui/alert')
		,twitterApi = require('app/twitterApi').twitterApi
		,check = require('app/checkLogin')
		,dialog = require('ui/dialog')
		,shareTmp = require('component/shareTmp');

	var alertTip = function(content) {
		new Alert({
			content: content,
			width: 370
		});
	};


	var follow = function(){
		attr();
		allShare();
		delMsg();
		transmitMsg();
		replyMsg();
		//var $comments = $('.comments');  //item_reply

	}

	var replyMsg = function(){
		var options = {};
		var $reply_list = $('.show-list');
		$reply_list.on('click', '.comment_btn', function(){
			if (!check()) return false;
			$('.reply_btn').html('立即回复');
			var $reply_block = $('.reply_block');
			var reply_item = $(this).closest('.reply_item');
			var isInThis = reply_item.find('.reply_block');
			if (!isInThis.length) {
				reply_item.append($reply_block);
				$reply_block.show().find('textarea').focus().val(''); //清空回复
				$('.reply_btn').attr('stid',$(this).attr('stid'));
			} else if($reply_block.is(':hidden')) {
				$reply_block.show().find('textarea').focus().val('');
			} else {
				$reply_block.hide();
			}
		});

		//submit
		var isAjax = false;
		$('.reply_btn').on('click',function(){
			if(!check()) return false;
			if(isAjax) return;
			isAjax = true;
			options.tContent = $.trim($('.reply_sg').val());
			if(options.tContent == '' && !options.type){isAjax = false;return alertTip('还没有输入回复哦');}

			$('.reply_btn').html('回复中...');
			if (!options.type) options.type = 4;
			var stid = $(this).attr('stid');
			var data = {
					'stid' : stid,
					'type' : options.type,
					'tContent' : options.tContent
			}

			var callback = function(response){
				if (!response) {
					alertTip('系统暂时无法响应，请稍后再试');
					return false;
				} else if (response.code && response.msg) {
					alertTip(response.msg);
					return false;
				}else if(response.code == 0){
					$('.reply_btn').html('回复成功');
					location.href = location.href;
				}
			}

			twitterApi('create', data, callback);
		});
	}

	/**
	*  转发atme msg type=8
	**/
	var transmitMsg = function(){
		$('.transmitMsg').bind('click', function() {
			if(!check()) return;
			var self = $(this);
			var list_con = self.closest('.list-content').find('.list-content-top');

			var con = ' // @' + $.trim(list_con.text()).replace(/\s+/g,"");
			var html = shareTmp("tranMsg_ui", {'data': con});
			var share_atme = new dialog({title : "转发给关注我的人" , width : 370 , content : html });

			$('.cancelBtn').on('click',function(){
				$('#closeDialog').trigger('click');
			});

			$('.transmitBtn').on('click',function(){
				var options = {};
				var stid = self.closest('.list-content-bottom').find('.comment_btn').attr('stid');
				options.tContent = $.trim($(this).closest('.dialog_member').find('.twitter_txt').val());
				if(options.tContent == '' && !options.type){return alertTip('还没有输入内容哦');}
				options.type = 8;
				var data = {
						'stid' : stid,
						'type' : options.type,
						'tContent' : options.tContent
				}
				var callback = function(response){
					if (!response) {
						alertTip('系统暂时无法响应，请稍后再试');
						return false;
					} else if (response.code && response.msg) {
						alertTip(response.msg);
						return false;
					}else if(response.code == 0){
						//alertTip('转发成功');
						// $('#closeDialog').trigger('click');
						location.href = location.href;
					}
				}

				twitterApi('create', data, callback);
			});
		});
	}

	/**
	*  删除atme msg
	**/

	var delMsg = function(){
		$('.deleteMsg').bind('click' , function(){
			var self = $(this);
			var closest = self.closest('.comments');
			var handle = new Confirm({
				transparent : true,
				content : '确认删除此信息?',
				width : 370
			});

			handle.onSure(function(){
				var url = '/aw/twitter/destroy';
				var data = {
					twitter_id : self.attr('tid')
				};
				var callback = function(response){
					if (!response.code) {
						closest.hide();
						//location.href = location.href;
						//location.reload(true);
					} else{
						alertTip(response.message);
					};
				}
				$.post(url , data , callback , 'json');
			});

		});
	}

	/**
	 * 关注样式功能绑定
	 * @author yaoyao
	 * @return {Void}
	 */
	var attr = function(){
		var login = require('app/login');
		$('.main-content').delegate('.followed,.removeUserFollow','mouseover',function(){
			$(this).html("取消关注");
		}).delegate('.followed,.removeUserFollow','mouseout',function(){
			$(this).html("已关注");
		}).delegate('.followed,.removeUserFollow','click',function(){
			if(Meilishuo.config.user_id == 0){
				login.showLoginWin();
				return false;
			}
			ajaxSend(0, $(this).attr('fuid'), $(this));
			var str,_str = $(this).hasClass('followed') ? 'followed' : 'removeUserFollow';
		}).delegate('.list-right .btn,.addUserFollow','click',function(){
			if(Meilishuo.config.user_id == 0){
				login.showLoginWin();
				return false;
			}
			var str,_str = $(this).hasClass('btn') ? 'btn' : 'addUserFollow';
			ajaxSend(1, $(this).attr('fuid'), $(this));
		})
	}
	var allShare = function(){
		var url = '',
			desc = '',
			title = '美丽说杂志是爱美丽们的时尚聚集地，无论你是哪种女孩儿，无论你有什么小癖好，在美丽说杂志，你都能正确归队。和你的喜好尽情的拥抱吧，和姐妹们痛快的分享吧~',
			pic = '',
			shareParam = function(_this, _type){
				var _thisParent = _this.closest('.list-content')
				//url = 'http://www.meilishuo.com/' + _thisParent.find('.mid-left').attr('href') + '?frm=huiliu_' + _type + '（分享自 @美丽说）'
				url = 'http://www.meilishuo.com' + _thisParent.find('.mid-left').attr('href') + '?frm=huiliu_' + _type + '（分享自 @美丽说）';
				desc = '推荐 【' + _thisParent.find('.block :eq(0)').html() + '】';
				pic = _thisParent.find('.mid-left img').attr('src');
			};

		$('.my_i_qzone').on('click',function(){
			shareParam($(this), 'shareqzone');
			share.shareToQzone(url , desc, title, ' ' , pic);
		});
		$('.my_i_sina').on('click',function(){
			shareParam($(this), 'shareweibo');
			share.shareToWeibo(url , desc , pic);
		});
		$('.my_i_tx').on('click',function(){
			shareParam($(this), 'sharetqq');
			share.shareToQQ(url , desc , pic);
		});
	}
	/**
	 * ajax数据请求封装
	 * @param  {Num} _index 0为个人页模块点击，1为粉丝关注页模块点击
	 * @param  {Num} _fuid  关注或解除关注对象uid
	 * @param  {Object} _this  当前dom对象上下问环境
	 * @return {Void}
	 */
	var ajaxSend = function(_index, _fuid, _this){
		var userAttr = require('app/userApi'),
			userIndex = _index ? 'follow' : 'unfollow',
			cbk = function(msg){
				var $this = _this,
					str,
					_str,
					_html;
				if (msg.code == 0) {
					if ($this.hasClass('followed')) {
						str = 'followed';
						_str = 'btn';
						_html = '+加关注';

					}else if($this.hasClass('removeUserFollow')){
						str = 'pink_follow removeUserFollow';
						_str = 'red_follow addUserFollow';
						_html = '+加关注';
					}else if($this.hasClass('btn')) {
						str = 'btn';
						_str = 'followed';
						_html = '已关注';
					}else if($this.hasClass('addUserFollow')){
						str = 'red_follow addUserFollow';
						_str = 'pink_follow removeUserFollow';
						_html = '已关注';
					}
					_this.removeClass(str).addClass(_str).html(_html);
				};
			};
		userAttr.userApi(userIndex,{fuid:_fuid},cbk);
	};(function(){
		this('#sendPrivateLetter');
		this('.personal-msg');
	}).call(require('app/letter'));
var share = require('app/shareTo');
	require('app/label')();
	require('app/beautyDecl')();
	require('app/eventHover').hoverShow('.showChangeHead' , '.change');
	exports.follow = follow;
});
