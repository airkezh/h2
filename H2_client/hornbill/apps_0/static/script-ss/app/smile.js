fml.define('app/smile' , ['jquery' , 'component/shareTmp' , 'app/insertAtCaret', 'app/emoji'] , function(require , exports){
    var $ = require('jquery');    
    var shareTmp = require('component/shareTmp');
	var insertAtCaret = require('app/insertAtCaret');
    var $smileysbox = $('.smileysbox');

	var emoji = require('app/emoji')
	var data = {smileys : emoji.data}

    var faceSmileys = function(callback){
		var toCreateOne = $smileysbox.size() == 0;
        if(toCreateOne){
            var tpl = shareTmp("loginSmile" , data); 
			$('body').append(tpl);
			$smileysbox = $(".smileysbox");
			$smileysbox.on('click' ,'.smiley img',function(){
				toInsert.call(this);
			});
        }
		callback($smileysbox);
    }
	var toInsert = function(){};
	/*对页面加上一个type=recom_publish,吸取了publish的功能和twitter的样式，可优化*/
	var showSmile = function(parentObj , btn , type){
		var activeClass = 'smileys_active';
		if (type == 'publish' || type == 'im') activeClass = 'active';
		if (type != 'publish' && type != 'twitter') {
			$(document).bind('click' , function(){
				$(btn).removeClass(activeClass).removeData("isAddClass");
				$(".share_smileys").removeData("isAddClass");
				$smileysbox.hide();
			});
		}
		objs = $(parentObj);
		objs.on('click' , btn , function(event){
			event.stopPropagation()
			$(btn).removeClass(activeClass);
			var obj = $(this);
			var offset = obj.offset();
			faceSmileys(function($smileysbox){
				toInsert = function(){
					if(type == 'share'){
						if($("#forwardContent").val() == '写点什么,评论一下'){
							$("#forwardContent").val('');
							insertAtCaret($("#forwardContent") , $(this).attr('emotion'));
						}else{
							insertAtCaret($("#forwardContent") , $(this).attr('emotion'));
						}	
					}else if(type == 'im'){
						insertAtCaret(obj.parents('.im_inputbox').find('textarea') , $(this).attr('emotion'));
					}
					else if(type == 'comment'){
						var poster_textarea = obj.closest('.poster_wall').find('.poster_textarea');	
						insertAtCaret(poster_textarea , $(this).attr('emotion'));
					}
					else if(type == 'twitter'){
						insertAtCaret(obj.parents('.reply_box').find('.comment_textarea') , $(this).attr('emotion'));		
					}
					else if(type == 'publish' || type == 'recom_publish'){
						insertAtCaret($(parentObj).find('.editor'), $(this).attr('emotion'));
					}
					obj.removeClass(activeClass);
					obj.removeData("isAddClass");
					$smileysbox.hide();
				}
			});
			//表情zindex值根据不同位置而变换莫测
			if( type == 'share'){
				$smileysbox.css('zIndex' , 815)
			} else if(type == 'comment'){
				$smileysbox.css('zIndex' , 380)
				$(".share_smileys").css('zIndex' , 390)
			}

			if(!obj.data("isAddClass")){
				obj.addClass(activeClass);
				obj.data("isAddClass","true");
				$smileysbox.show();
				var left = offset.left - 264;
				var top = offset.top + obj.height() + 4;
				if(left < 0) {
					left = 0;	
					$smileysbox.find('.line').css({'left' : '177px'});
				}else{
					$smileysbox.find('.line').css({'left' : '264px'});	
				}
				if(type == 'publish'){
					left = offset.left, top = top - 4;
					$smileysbox.find('.line').css({'left': '0px', 'width':'54px'});
				} else if (type == 'twitter' || type == 'recom_publish') {
					left = offset.left;
					$smileysbox.find('.line').css({'left': '0px'});
				}else if(type == 'im'){
					left = offset.left
					top = offset.top - $smileysbox.outerHeight()// - 2
					$smileysbox.find('.line').hide();	
				}
				$smileysbox.css({"top" : top, "left" : left});
			}else{
				obj.removeClass(activeClass);
				obj.removeData("isAddClass");
				$smileysbox.hide();
			}   
		});
	}
    exports.showSmile = showSmile;
});
