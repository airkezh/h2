/*common*/
var $ = require('jquery')
	, shareTmp = require('component/shareTmp')
	, uiAlert = require('ui/alert')
	, message = require('app/im/message')
	, key = require('app/im/key')

function Alert(msg){new uiAlert({content:msg, width:370}) }

var init = function(btn, data, socket){
	var $pal = $(shareTmp("fastReplyPal" , {list : data}))

	function _init(){
		//mouse events
		mouseModel.init();

		//key events
		keyModel.init();

		socket.on('changeUserPush', function (data) {
			palFn.hidePal()
			keyModel.closeFn()
		})
		
	}

	var mouseModel = new (function(){
		this.init = function(){
			$pal.appendTo('body').hide()
			//btn mouse events
			$(document).on('mouseenter click', btn, function(event) {
				palFn.showPal()

			}).on('mouseleave', btn, function(event){
				palFn.hidePal()
				keyModel.closeFn()
			})
			//pal mouse events
			$pal.on('mouseenter', function(event) {
				palFn.showPal()

			}).on('mouseleave', function(event){
				palFn.hidePal()
				keyModel.closeFn()

			}).on('mouseenter', '.replyList li', function(event){
				replyFn.selectItem.call(this)

			}).on('mouseleave', '.replyList li', function(event){
				replyFn.unselectItem.call(this)

			}).on('click', '.replyList li', function(event){
				event.stopPropagation()
				if(!replyFn.canSend()) return;
				replyFn.sendMsg.call(this)
				$('.im_inputbox_input:visible').focus()
				palFn.hidePal(0)
				keyModel.closeFn()

			}).on('click', '.addReplyBox .addBtn', function(event){
				event.stopPropagation()
				replyFn.addReply.call(this)
				palFn.openAlwaysShow()
				keyModel.closeFn()

			}).on('click', '.addReplyBox .addSureBtn', function(event){
				event.stopPropagation()
				replyFn.addSure.call(this)
				palFn.closeAlwaysShow()
				keyModel.closeFn()

			}).on('click', '.replyList li .deleteBtn', function(event){
				event.stopPropagation()
				replyFn.deleteItem.call(this)
				keyModel.closeFn()

			}).on('click', '.replyList li .editBtn', function(event){
				event.stopPropagation()
				replyFn.editItem.call(this)
				palFn.openAlwaysShow()
				keyModel.closeFn()

			}).on('click', '.replyList li .editSureBtn', function(event){
				event.stopPropagation()
				replyFn.editSure.call(this)
				palFn.closeAlwaysShow()
				keyModel.closeFn()

			})
		}
	})()

	var keyModel = new (function(){

		var init = function(){
			bindCallReplyPal()
			bindAddKey()
			bindEditKey()
		}

		var bindCallReplyPal = function(){
			// console.log('bindCallReplyPal')
			unBindCallReplyPal()
			key.bindKeyPress({
				keyCode : 192
				,name : 'callReplyPal'
				,cb100 : function(){
					if(fml.vars.im.toid && $('.fastReply:visible').length){
						openFn()
						callReplyPal()
						blurInput()
					}
				}
			})
		}
		var unBindCallReplyPal = function(){
			// console.log('unBindCallReplyPal')
			key.unbindPress('callReplyPal')
		}
		var callReplyPal = function($target){
			palFn.showPal()
			var $firstLi = $pal.find('li:first')
			replyFn.selectItem.call($firstLi)
			$firstLi[0].scrollIntoView();
		}
		var openFn = function(){
			closeFn()
			// console.log('openFn')
			unBindCallReplyPal()
			key.bindFirstPress({
				keyCode : 40
				,name : 'openFn'
				,cb000 : function($target){
					var $nextLi = $pal.find('li.act').next('li')
					if($nextLi.length)
						replyFn.selectItem.call($nextLi,true)
				}
			}).bindFirstPress({
				keyCode : 38
				,name : 'openFn'
				,cb000 : function($target){
					var $prevLi = $pal.find('li.act').prev('li')
					if($prevLi.length)
						replyFn.selectItem.call($prevLi,true)
				}
			}).bindFirstPress({
				keyCode : 13
				,name : 'openFn'
				,cb000 : function($target){
					if(!replyFn.canSend()) return;
					var $li = $pal.find('li.act')
					replyFn.sendMsg.call($li)
					closeFn()
					palFn.hidePal(0)
					focusInput()
				}
			}).bindFirstPress({
				keyCode : 192
				,name : 'openFn'
				,cb100 : function($target){
					closeFn()
					palFn.hidePal(0)
					focusInput()
				}
			})
		}
		function focusInput(){$('.im_inputbox_input:visible').focus()}
		function blurInput(){$('.im_inputbox_input:visible').blur()}

		var closeFn = function(){
			// console.log('closeFn')
			bindCallReplyPal()
			key.unbindPress('openFn')
		}
		var bindEditKey = function(){
			key.bindKeyPress({
				keyCode : 13
				,name : 'replyEdit'
				,parent : '.replyList input:text'
				,cb000 : function($target){
					replyFn.editSure.call($target)
					palFn.closeAlwaysShow()
				}
			}).bindKeyPress({
				keyCode : 27
				,name : 'replyEdit'
				,parent : '.replyList input:text'
				,cb000 : function($target){
					replyFn.cancelEdit()
					palFn.closeAlwaysShow()
				}
			})
		}
		var bindAddKey = function(){
			key.bindKeyPress({
				keyCode : 13
				,name : 'replyAdd'
				,parent : '.addReplyBox input:text'
				,cb000 : function($target){
					replyFn.addSure.call($target)
					palFn.closeAlwaysShow()
				}
			}).bindKeyPress({
				keyCode : 27
				,name : 'replyAdd'
				,parent : '.addReplyBox input:text'
				,cb000 : function($target){
					replyFn.cancelAdd()
					palFn.closeAlwaysShow()
				}
			})
		}

		this.init = init
		this.closeFn = closeFn

	})()

	var palFn = new (function(){
		var timer = null
			,showAlways = 0

		this.showPal = function(){
			clearTimeout(timer)
			_showPal();
			function _showPal(){
				$pal.show();
				setPalPosition();
			}
		}

		this.hidePal = function(delay){
			if(showAlways) return;
			if(delay<10)
				return _hidePal()
			delay = delay || 300
			clearTimeout(timer)
			timer = setTimeout(_hidePal, delay)
			
			function _hidePal(){
				$pal.hide();
			}
		}

		this.openAlwaysShow = function(){showAlways = 1}
		this.closeAlwaysShow = function(){showAlways = 0}

		function setPalPosition($btn){
			$btn = $btn || $(btn+':visible')
			var btnOffset = $btn.offset()
			$pal.offset({
				top : btnOffset.top - $pal.outerHeight()
				,left : btnOffset.left + $btn.outerWidth() - $pal.outerWidth()
			})
		}
	})();

	var replyFn = new (function(){
		var can_send = 1

		this.sendMsg = function(){
			if(!can_send) return;
			var im_mainbox = userListObj[fml.vars.im.toid].mainBox
			var dialogBox = im_mainbox.find('.im_dialog')
				,toid = dialogBox.attr('uid')
				,black = (userListObj[toid].black) | 0
			var content = $(this).find('.reply_content').text()
			var im_inputbox_input = im_mainbox.find('.im_inputbox_input')
			im_inputbox_input.append(content)

			/*message.send({
				type : 'text'
				, content : content 
				, black : black
				, dialogBox : dialogBox
			})*/
		}
		this.selectItem = function(autoShow){
			clearAllSelect()
			$(this).addClass('act')
			if(autoShow)
				$(this)[0].scrollIntoView();
		}
		function clearAllSelect(){$pal.find('li').removeClass('act')}
		this.unselectItem = function(){
			$(this).removeClass('act')
		}
		this.addReply = function(){
			clearEditStatus()
			var $box = $(this).parents('.addReplyBox')
			$box.addClass('act').children('input').focus()
			closeSend()
		}
		this.addSure = function(txt){
			var $box = $(this).parents('.addReplyBox')
				,$input = $box.children('input')
				,txt = $.trim($input.val())
			if(!txt) return clearEditStatus();
			$.get('/www/aj/udrAdd', {
				content : txt
			}, function(res){			
				var $tmp = $(shareTmp("fastReplyPalItem" , 
					{
						v:{
							reply_id:res.reply_id, 
							content:$input.val(), 
							index:$pal.children('.replyList').find('>li').length+1
						}
					}))
				$tmp.appendTo($pal.children('.replyList'))
				$tmp[0].scrollIntoView()
				$input.val('')
				$input.blur()
				clearEditStatus()
			}, 'json')
		}
		this.cancelAdd = function(){
			clearEditStatus()
		}
		this.editItem = function(){
			clearEditStatus()
			var $li = $(this).parents('li')
				,content = $li.find('.reply_content').text()
				,$input
			if($li.find('input').length)
				$input = $li.find('input').val(content)
			else 
				$input = $('<input value="' + content + '"/>').insertAfter($li.find('p'))
			showEdit($li)
			closeSend()
			$input.show().focus()
		}
		this.editSure = function(){
			var $li = $(this).parents('li')
				,$contentWrap = $li.find('.reply_content')
				,$input = $li.find('input')
				,oldTxt = $contentWrap.text()
				,newTxt = $input.val()
			if(!(oldTxt==newTxt || $.trim(newTxt)=='')){
				$.get('/www/aj/udrUpdate', {
					content : newTxt
					, reply_id : $li.attr('rid')

				}, function(res){
					if(res.successful==0){
						Alert(res.message)
					} else {
						_editSure($contentWrap,newTxt)
						
					}
				}, 'json')
			}
			hideEdit($li);
			openSend();

			function _editSure($wrap,txt){
				$wrap.text(txt)
			}
		}
		this.cancelEdit = function(){
			clearEditStatus()
		}
		this.deleteItem = function(){
			var $li = $(this).parents('li')
			$.get('/www/aj/udrDelete', {
				reply_id : $li.attr('rid')

			}, function(data){
				
				if(data.successful == 0){
					Alert(data.message)
				}else{
					_del()
				}

			}, 'json')

			function _del(){
				$li.slideUp(200,function(){
					var idx = $li.index()
					$li.remove()
					refreshReplyNum(idx)
				})
			}
		}

		this.canSend = function(){return can_send;}

		function openSend(){can_send = 1;}
		function closeSend(){can_send = 0;}
		function clearEditStatus(){
			$pal.find('li.editor').removeClass('editor')
			$pal.find('.addReplyBox').removeClass('act')
			openSend();
		}
		function hideEdit($li){
			$li.removeClass('editor')
			
		}
		function showEdit($li){
			$li.addClass('editor')
			
		}
		function refreshReplyNum(from){
			from = from || 0
			var $lis = $pal.children('.replyList').find('>li')
			for (var i = from; i < $lis.length; i++) {
				$($lis[i]).find('.reply_num').html(i+1+'、')
			};
		}
	})();

	_init();
}
exports.init = init;