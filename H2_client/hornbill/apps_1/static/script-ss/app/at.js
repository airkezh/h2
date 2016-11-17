fml.define('app/at' , ['jquery' , 'app/insertAtCaret' , 'component/cursorPostion' , 'component/shareTmp'] , function(require , exports){
	var $ = require('jquery');
	var cursorPostion = require('component/cursorPostion');
	var shareTmp = require('component/shareTmp');
	var insert = require('app/insertAtCaret');
	var index = 0;
	var cache = {};
	var textArea = null;
	var sucS = '';
	var sectionBefore = '';
	var sectionAfter = '';
	var isAjax = true;
	var once = true;
	// 
	return function(obj , oth){
		obj = obj || '#forwardContent';
		oth = oth || '.atDiv';
		// return false with up & down & enter
		$("body").on('keydown' , obj , function(event){
			if(event.keyCode == 38 || event.keyCode == 40) return false;
			if(event.keyCode == 13 && $('.atSearch').length > 0) return false;
		});
		// 监听文本域 @
		$(document).on('keyup click' , obj , function(event){
			//console.log(cursorPostion.getSelection('#atArea') , event.keyCode)	
			var keyCode = event.keyCode
			if(keyCode == 224 ) return false;

			var area  = $(this);
			var val = area.val();
			var pos = cursorPostion.getSelection(this);
			var fontSize = +area.css('font-size').replace('px' , '') + 5;
			var beforeStr = val.substring(0 , pos.end - 1);
			var keyWord = val.substring(pos.start , pos.end - 1);
			var afterStr = val.substring(beforeStr.length + 1 , val.length);
//			regStr.getStringLength()
			//console.log(beforeStr , keyWord , afterStr)
				var hackWidth = $.browser.msie || $.browser.chrome? 0 : 5;
				$(oth).css({
					height : area.height(),
					width : area.width() - hackWidth,
					top : area.offset().top,
					left : area.offset().left,
					lineHeight : area.css('line-height'),
					fontSize : area.css('font-size'),
					fontWeight : area.css('font-weight'),
					fontFamily : area.css('font-family'),
					zIndex : -1000,
					padding : area.css('paddingLeft'),
					border : 'solid 1px'
				});
			var atFlag = $(oth).find('.flag'); 
			$(oth).find('.before').html(beforeStr.replace(/ /g , '<span style="white-space:pre-wrap;"> </span>').replace(/\r\n/g , '<br />').replace(/\n/g , '<br />'));
			atFlag.html(keyWord);
			$(oth).find('.after').html(afterStr.replace(/ /g , '<span style="white-space:pre-wrap;"> </span>').replace(/\r\n/g , '<br />').replace(/\n/g , '<br />'));
			var flagTop = atFlag.offset().top; 
			var flagLeft = atFlag.offset().left;
			$('.atSearch').remove();
			textArea = this;
			$(oth).scrollTop(area.scrollTop());
			if(keyWord == '@'){
				getNickName('' , flagTop + fontSize , flagLeft);
				sectionBefore = '';	
				sectionAfter = '';

			}else{
				//console.log(beforeStr)
				var len = val.substring(0 , pos.end).length;
				var beforeS = '';
				if(val.indexOf('@') != -1){
					var arr = val.substring(0 , pos.end).split('');
					for(var i = len - 1; i >= 0; i--){
						if(arr[i] == '\n' || arr[i] == '\r\n' || arr[i] == ' ' || beforeS.length >= 20) break;
						if(arr[i] == '@'){
							sucS = beforeS.split("").reverse().join("");
							getNickName(sucS, flagTop + fontSize , flagLeft);
	//						console.log(pos.end - i)
							sectionPos = pos.end ;
							sectionBefore = val.substring(0 , pos.end - (pos.end - i - 1));
							sectionAfter = val.substring(pos.end , val.length);
							break;
						}
						beforeS += arr[i];	
					}
				}
			}
			keyCode == 38 || keyCode == 40 || keyCode == 13 ? index = index : index = 0;
			selectName.call(this , event)
		});
		// focus blur 
		$(document).on('blur' , obj , function(event){
			window.setTimeout(function(){
				$('.atSearch').remove();
			} , 200)
		});
		// click select
		$(document).on('click' , '.atNameItem' , function(){
			if(sectionBefore =='' && sectionAfter ==''){
				insert($(textArea) , $(this).text() + ' ');		
			}else{
				$(textArea).val(sectionBefore + $(this).text() + ' ' + sectionAfter);
				cursorPostion.setCaretPosition(textArea , sectionPos + $(this).text().length);
			}
			window.setTimeout(function(){
				$('.atSearch').remove();
			} , 100);
		});
		// mouseover select
		$(document).on('mouseover' , '.atNameItem' , function(){
			var item = $('.atNameItem');	
			item.removeClass('search_bg');
			$(this).addClass('search_bg');
			index = $(this).index() - 1;
			return false;
		});
		// contorl @ select up & down & enter
		function selectName(event){
			var keyCode = event.keyCode;
			var item = $('.atNameItem');
			var itemcount = item.size() - 1;
			if(keyCode == 38 || keyCode == 40){
				index += keyCode - 39;	
				index < 0 ? index = itemcount : (index > itemcount ? index = 0 : index);
				item.removeClass('search_bg').eq(index).addClass('search_bg');
			}
			if(keyCode == 13 && item.eq(index).text() != ''){
				if(sectionBefore =='' && sectionAfter ==''){
					insert($(textArea) , item.eq(index).text() + ' ');		
				}else{
					$(textArea).val(sectionBefore + item.eq(index).text() + ' ' + sectionAfter);
					cursorPostion.setCaretPosition(textArea , sectionPos + item.eq(index).text().length);
				}
				$('.atSearch').remove();
			}
		}
		// ajax get @ list
		function getNickName(word , flagTop , flagLeft){
			var url = '/aj/getNick/';	
			var data = {
				word : word
			}
			var callback = function(response){
				cache[word] = response;
				isAjax = true;
				var atSearch = shareTmp('atSearchKey');
				$('body').append(atSearch);
				$('.atSearch').css({'top' : flagTop , 'left' : flagLeft});
				if(response.length == 0){
					$('.atTitle').html('轻敲空格完成输入');	
				}else{
					$('.atTitle').html('选择昵称或轻敲空格完成输入');
				}
				var atNameItem = '';
				$.each(response , function(index , data){
					atNameItem += '<li class="atNameItem" style="padding:5px 10px;white-space:nowrap;">'+ data +'</li>';
				});
				$('.atNameItem').remove();
				$('.atSearch').append(atNameItem);
				$('.atNameItem').eq(0).addClass('search_bg');
			}
			if(cache[word]){
				callback(cache[word]);	
			}else{
				if(isAjax){
					$.get(url , data , callback , 'json');
					isAjax = false;
				}
			}
		}
	}
});
